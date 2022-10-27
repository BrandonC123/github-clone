import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useParams } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import ViewProfile from "../components/ViewProfile";
import RepositoryService from "../services/RepositoryService";
import UserService from "../services/UserService";

const mockUser = {
    displayName: "Brandon",
    photoURL: "../img/404.png",
};

const emptyUser = {
    profileImgSrc: "../img/404.png",
    name: "Brandon Chu",
    username: "Brandon",
    bio: "my name is brandon",
    website: "google.com",
    repoList: [
        {
            created: { seconds: 1664593773, nanoseconds: 247000000 },
            lastUpdated: { seconds: 1664593773, nanoseconds: 247000000 },
            repoName: "Battleship",
            starCount: 0,
        },
    ],
    followList: [],
};

jest.mock("../services//RepositoryService.jsx");

jest.mock("../services/UserService.jsx");

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({
        username: "Brandon",
    }),
}));

function intializeProfileMocks() {
    const repoList = jest.spyOn(RepositoryService, "getRepoList");
    repoList.mockImplementation(() =>
        Promise.resolve([
            {
                created: { seconds: 1664593773, nanoseconds: 247000000 },
                lastUpdated: { seconds: 1664593773, nanoseconds: 247000000 },
                repoName: "Battleship",
                starCount: 0,
            },
        ])
    );

    const contributionArray = jest.spyOn(
        RepositoryService,
        "getContributionArray"
    );
    contributionArray.mockImplementation(() => Promise.resolve([]));

    const userDetails = jest.spyOn(UserService, "getUserDetails");
    userDetails.mockImplementation(() => Promise.resolve(emptyUser));

    const followList = jest.spyOn(UserService, "getFollowList");
    followList.mockImplementation(() => Promise.resolve(["brandon"]));
}

describe("View profile route", () => {
    afterEach(() => {
        cleanup();
    });
    test("Profile information column loads", async function () {
        intializeProfileMocks();
        render(
            <UserContext.Provider value={mockUser}>
                <ViewProfile />
            </UserContext.Provider>,
            { wrapper: MemoryRouter }
        );
        expect(await screen.findByText("Brandon")).toBeInTheDocument();
        expect(
            await screen.findByText("my name is brandon")
        ).toBeInTheDocument();
    });
    test("Repositories loads", async function () {
        intializeProfileMocks();
        render(
            <UserContext.Provider value={mockUser}>
                <ViewProfile />
            </UserContext.Provider>,
            { wrapper: MemoryRouter }
        );
        expect(await screen.findByText("Battleship")).toBeInTheDocument();
    });
    test("Edit profile form displays", async function () {
        intializeProfileMocks();
        render(
            <UserContext.Provider value={mockUser}>
                <ViewProfile />
            </UserContext.Provider>,
            { wrapper: MemoryRouter }
        );
        userEvent.click(await screen.findByText("Edit Profile"));
        expect(await screen.findByLabelText("Name")).toBeVisible();
        expect(await screen.findByLabelText("Bio")).toBeVisible();
    });
    test("Profile changes are displayed", async function () {
        intializeProfileMocks();
        render(
            <UserContext.Provider value={mockUser}>
                <ViewProfile />
            </UserContext.Provider>,
            { wrapper: MemoryRouter }
        );
        userEvent.click(await screen.findByText("Edit Profile"));

        const nameInput = await screen.findByLabelText("Name");
        userEvent.type(nameInput, "John Doe");

        expect(screen.getByText("Brandon Chu")).toBeInTheDocument();

        const saveBtn = await screen.findByText("Save");
        userEvent.click(saveBtn);

        expect(screen.queryByText("Brandon Chu")).not.toBeInTheDocument();
        expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
    test("Follow button is displayed when not on own account", async function () {
        intializeProfileMocks();
        render(
            <UserContext.Provider
                value={{
                    displayName: "johnSmith",
                    photoURL: "../img/404.png",
                }}
            >
                <ViewProfile />
            </UserContext.Provider>,
            { wrapper: MemoryRouter }
        );
        const followBtn = await screen.findByText("Follow");
        expect(followBtn).toBeInTheDocument();
    });
    
});
