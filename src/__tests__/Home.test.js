import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import * as router from "react-router";
import App from "../App";
import Home from "../components/Home";
import Signin from "../components/Signin";
import { UserContext } from "../components/UserContext";

const navigate = jest.fn();

describe("Home page", () => {
    beforeEach(() => {
        jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
    });
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
});
