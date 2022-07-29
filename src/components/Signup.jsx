import { useEffect, useState } from "react";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassowrd] = useState("");
    const [username, setUsername] = useState("");
    const [choice, setChoice] = useState("");
    const [errorText, setErrorText] = useState("");
    function toggleContinueButton(e) {
        const button = e.target.parentElement.parentElement.lastElementChild;
        if (e.target.checkValidity()) {
            button.classList.remove("inactive-btn");
            button.classList.add("active-btn");
            // Remove invalid border and error message below input
            e.target.classList.remove("invalid-input");
            e.target.nextSibling.textContent = "";
        } else {
            button.classList.add("inactive-btn");
            button.classList.remove("active-btn");
        }
    }
    function displayButton() {
        return (
            <button
                onClick={(e) => {
                    e.target.parentElement.nextSibling.classList.toggle("hide");
                    e.target.classList.toggle("hide");
                }}
                type="button"
                className="inactive-btn btn"
            >
                Continue
            </button>
        );
    }
    function showError(input) {
        input.classList.add("invalid-input");
        if (input.validity.valueMissing) {
            console.log("missing");
            return "This field cannot be empty.\n";
        }
        if (input.validity.tooShort) {
            console.log("short");
            return (
                "Field must be at least " +
                input.minLength +
                " characters long.\n"
            );
        }
        if (input.validity.typeMismatch) {
            console.log("type");
            return "Please enter a valid email address. ex: brandon@gmail.com\n";
        }
        if (input.validity.patternMismatch) {
            return "Please follow the required format."
        }
    }
    useEffect(() => {
        console.log(errorText);
    }, [errorText]);
    function checkError() {
        const formInputs = document.querySelectorAll(".signup-input");
        const errorSpan = document.querySelectorAll(".signup-input-error");
        formInputs.forEach((input, index) => {
            if (!input.validity.valid) {
                errorSpan[index].textContent = showError(input);
            }
        });
    }
    return (
        <div className="signup-page">
            <header className="signup-header">
                <div className="signup-header-content container row">
                    <img src="/img/gh-logo.svg" alt="Github logo" />
                    <p>
                        Already have an account?{" "}
                        <a className="signin-link" href="#">
                            Sign in
                        </a>
                    </p>
                </div>
            </header>
            <div className="signup-content-container">
                <p className="signup-greeting">
                    Welcome to GitHub! <br /> Lets begin the adventure
                </p>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        checkError();
                    }}
                    noValidate
                    className="signup-form column"
                >
                    <div className={"input-container row"}>
                        <div className="input column">
                            <label
                                htmlFor={"signup-email"}
                                className="signup-accent-text"
                            >
                                Enter your email *
                            </label>
                            <input
                                required
                                minLength={5}
                                onChange={(e) => {
                                    toggleContinueButton(e);
                                    setEmail(e.target.value);
                                }}
                                type={"email"}
                                id={"signup-email"}
                                className="signup-input"
                            />
                            <span className="signup-input-error"></span>
                        </div>
                        {displayButton()}
                    </div>

                    <div className={"input-container row hide"}>
                        <div className="input column">
                            <label
                                htmlFor={"signup-password"}
                                className="signup-accent-text "
                            >
                                Create a password (Must contain at least 8
                                characters, 1 capital letter, 1 number, and 1
                                special character) *
                            </label>
                            <input
                                required
                                onChange={(e) => {
                                    toggleContinueButton(e);
                                    setPassowrd(e.target.value);
                                }}
                                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                                type={"password"}
                                id={"signup-password"}
                                className="signup-input"
                            />
                            <span className="signup-input-error"></span>
                        </div>
                        {displayButton()}
                    </div>

                    <div className={"input-container row hide"}>
                        <div className="input column">
                            <label
                                htmlFor={"signup-username"}
                                className="signup-accent-text "
                            >
                                Create a username *
                            </label>
                            <input
                                required
                                minLength={5}
                                onChange={(e) => {
                                    toggleContinueButton(e);
                                    setUsername(e.target.value);
                                }}
                                type={"text"}
                                id={"signup-username"}
                                className="signup-input"
                            />
                            <span className="signup-input-error"></span>
                        </div>
                        {displayButton()}
                    </div>

                    <div className={"input-container row hide"}>
                        <div className="input column">
                            <label
                                htmlFor={"signup-announcement"}
                                className="signup-accent-text "
                            >
                                Would you like to receive product updates and
                                announcements via email? Type "y" for yes or "n"
                                for no *
                            </label>
                            <input
                                required
                                maxLength={1}
                                onChange={(e) => {
                                    toggleContinueButton(e);
                                    setChoice(e.target.value);
                                }}
                                type={"text"}
                                id={"signup-announcement"}
                                className="signup-input"
                            />
                            <span className="signup-input-error"></span>
                        </div>
                        {displayButton()}
                    </div>
                    <button
                        onClick={() => setErrorText("")}
                        className="active-btn btn hide"
                    >
                        Create Account
                    </button>
                </form>
            </div>
            <span className="error-message">{errorText}</span>
        </div>
    );
};

export default Signup;
