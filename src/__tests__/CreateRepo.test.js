import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { wait } from "@testing-library/user-event/dist/utils";
import React from "react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import CreateRepository from "../components/CreateRepository";
import { UserContext } from "../components/UserContext";
import RepositoryService from "../services/RepositoryService";

const mockUser = {
    displayName: "Brandon",
    photoURL: "../img/404.png",
};

jest.mock("../services/RepositoryService");

jest.mock("../components/useDebounce", () => ({
    useDebounce: function () {
        return { debounedValue: "testRepo" };
    },
}));

describe("Create repository page", () => {
    afterEach(() => {
        cleanup();
    });
    test("Create repository button enables", async function () {
        const repoList = jest.spyOn(RepositoryService, "getRepoList");
        repoList.mockImplementation(() => {
            return Promise.resolve([]);
        });
        render(
            <UserContext.Provider value={mockUser}>
                <CreateRepository />;
            </UserContext.Provider>,
            { wrapper: MemoryRouter }
        );
        const repoInput = screen.getByLabelText("Repository Name*", {
            exact: false,
        });
        userEvent.type(repoInput, "testRepo");
        await waitFor(() => {
            expect(screen.getByText("Create repository").disabled).toBe(false);
        });
    });
    test("Detects when there is duplicate repository name", async function () {
        const repoList = jest.spyOn(RepositoryService, "getRepoList");
        await waitFor(() => {
            repoList.mockImplementation(() => {
                return Promise.resolve([{ repoName: "testRepo" }]);
            });
        });
        render(
            <UserContext.Provider value={mockUser}>
                <CreateRepository />;
            </UserContext.Provider>,
            { wrapper: MemoryRouter }
        );
        const repoInput = screen.getByLabelText("Repository Name*", {
            exact: false,
        });
        userEvent.type(repoInput, "testRepo");

        const errorText = await screen.findByText("Already in use");
        await waitFor(async function () {
            expect(errorText).toBeVisible();
        });
    });
    test("Public and private radio buttons work", () => {});
});
