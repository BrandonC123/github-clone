import {
    getByLabelText,
    render,
    screen,
    cleanup,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Signup from "./components/Signup";

// TODO: tests
describe("Signup page", () => {
    afterEach(() => {
        cleanup();
    });

    test("Does not let user continue till input is valid", () => {
        render(<Signup signedIn={false} />, { wrapper: MemoryRouter });
        const continueBtn = screen.getAllByRole("button", { name: "Continue" });
        const input = screen.getByLabelText("Enter your email *");

        userEvent.type(input, "brandoc");
        expect(continueBtn[0].classList.contains("inactive-btn")).toBe(true);

        input.textContent = "";
        userEvent.type(input, "brandoc@gmail.com");
        expect(continueBtn[0].classList.contains("inactive-btn")).toBe(false);
    });
    test("Validates all inputs", () => {
        render(<Signup signedIn={false} />, { wrapper: MemoryRouter });
        const continueBtn = screen.getAllByRole("button", { name: "Continue" });

        const emailInput = screen.getByLabelText("Enter your email *");
        userEvent.type(emailInput, "brandoc@gmail.com");
        expect(continueBtn[0].classList.contains("inactive-btn")).toBe(false);
        userEvent.click(continueBtn[0]);

        const pwdInput = screen.getByLabelText(
            "Create a password (Must contain at least 8 characters, 1 capital letter, 1 number, and 1 special character) *"
        );
        userEvent.type(pwdInput, "testerPassowrd!23");
        expect(continueBtn[1].classList.contains("inactive-btn")).toBe(false);
        userEvent.click(continueBtn[1]);

        const usernameInput = screen.getByLabelText("Create a username *");
        userEvent.type(usernameInput, "bchu318");
        expect(continueBtn[2].classList.contains("inactive-btn")).toBe(false);
        userEvent.click(continueBtn[2]);

        const choiceInput = screen.getByLabelText(
            `Would you like to receive product updates and announcements via email? Type "y" for yes or "n" for no *`
        );
        userEvent.type(choiceInput, "n");
        expect(continueBtn[3].classList.contains("inactive-btn")).toBe(false);
    });
});
