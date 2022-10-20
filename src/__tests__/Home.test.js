import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/Home";
import { UserContext } from "../components/UserContext";
import UserService from "../services/UserService";

jest.mock("../services/UserService");

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
    followList: ["brandon"],
    contributionArray: [],
    starredRepoList: [],
};

describe("Home page", () => {
    afterEach(() => {
        cleanup();
    });
    test("UnAuthenticated home component loads if no user is signed in", async function () {
        render(<App />);
        const homeTitle = await screen.findByText(
            "Let's build from here, together"
        );
        expect(homeTitle).toBeInTheDocument();

        const signUpBtn = await screen.findByText("Sign up for GitHub");
        expect(signUpBtn).toBeInTheDocument();
    });
    test("Properly loads authenticated home component when signed in", async function () {
        const mockUser = {
            displayName: "Brandon",
            photoURL: "../img/404.png",
        };
        render(
            <UserContext.Provider value={mockUser}>
                <Home />{" "}
            </UserContext.Provider>,
            { wrapper: MemoryRouter }
        );
        const sidebar = screen.getByTestId("sidebar");
        expect(sidebar).toBeInTheDocument();
    });
    test.only("Followed user repositories displays in home", async function () {
        const mockUser = {
            displayName: "Brandon",
            photoURL: "../img/404.png",
        };
        const followList = jest.spyOn(UserService, "getFollowList");
        followList.mockImplementation(() => Promise.resolve(["brandon"]));

        const userDetails = jest.spyOn(UserService, "getUserDetails");
        userDetails.mockImplementation(() => Promise.resolve(emptyUser));

        render(
            <UserContext.Provider value={mockUser}>
                <Home />;
            </UserContext.Provider>,
            { wrapper: MemoryRouter }
        );
        await waitFor(() => {
            const followContainer = screen.getByText("Following");
            expect(
                followContainer.querySelectorAll(".home-repo-card-container")
                    .length
            ).toBe(1);
        });
    });
});
