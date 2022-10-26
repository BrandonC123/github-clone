import { cleanup, render, screen, waitFor } from "@testing-library/react";
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
    username: "Brandon",
    repoList: [
        {
            created: { seconds: 1664593773, nanoseconds: 247000000 },
            lastUpdated: { seconds: 1664593773, nanoseconds: 247000000 },
            repoName: "Battleship",
            starCount: 0,
        },
    ],
    followList: [""],
};

jest.mock("../services//RepositoryService.jsx");

jest.mock("../services/UserService.jsx");

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({
        username: "Brandon",
    }),
}));

describe("View profile route", () => {
    afterEach(() => {
        cleanup();
    });
    test("Profile information column loads", async function () {
        const repoList = jest.spyOn(RepositoryService, "getRepoList");
        repoList.mockImplementation(() => Promise.resolve([]));

        const contributionArray = jest.spyOn(
            RepositoryService,
            "getContributionArray"
        );
        contributionArray.mockImplementation(() => Promise.resolve([]));

        const userDetails = jest.spyOn(UserService, "getUserDetails");
        userDetails.mockImplementation(() => Promise.resolve(emptyUser));

        const followList = jest.spyOn(UserService, "getFollowList");
        followList.mockImplementation(() => Promise.resolve(["brandon"]));

        render(
            <UserContext.Provider value={mockUser}>
                <ViewProfile />
            </UserContext.Provider>,
            { wrapper: MemoryRouter }
        );
        await waitFor(() => {
            const username = screen.getByText("Brandon");
            expect(username).toBeInTheDocument();
        });
    });
});
