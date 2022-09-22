import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import defaultProfile from "../img/default-profile-pic.png";
import UserService from "../services/UserService";

const Signup = ({ signedIn }) => {
    const { inputEmail } = useParams();
    const [email, setEmail] = useState("");
    const [password, setPassowrd] = useState("");
    const [username, setUsername] = useState("");
    const [choice, setChoice] = useState("");
    const [errorText, setErrorText] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (signedIn) {
            navigate("/");
        }
        if (inputEmail) {
            setEmail(inputEmail);
        }
        console.log(inputEmail);
    }, [signedIn]);
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
            return "Please follow the required format.";
        }
    }
    useEffect(() => {
        console.log(errorText);
    }, [errorText]);
    function checkError() {
        let valid = true;
        const formInputs = document.querySelectorAll(".signup-input");
        const errorSpan = document.querySelectorAll(".signup-input-error");
        formInputs.forEach((input, index) => {
            if (!input.validity.valid) {
                errorSpan[index].textContent = showError(input);
                valid = false;
            }
        });
        return valid;
    }
    function createUser() {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                UserService.uploadProfileImg(username, defaultProfile).then(
                    async function () {
                        const img = await UserService.getProfileImg(username);
                        console.log(img);
                        updateProfile(userCredential.user, {
                            displayName: username,
                            photoURL: img,
                        }).then(() => {
                            navigate(`/${username}`);
                        });
                    }
                );
            })
            .catch((error) => {
                console.log(error.message);
            });
    }
    return (
        !signedIn && (
            <div className="signup-page">
                <header className="signup-header">
                    <div className="signup-header-content container">
                        <Link to={"/"}>
                            <img
                                src={require("../img/gh-logo.svg").default}
                                alt="Github logo"
                            />
                        </Link>
                        <p>
                            Already have an account?{" "}
                            <Link to={"/signin"} className="signin-link">
                                Sign in
                            </Link>
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
                            if (checkError()) {
                                createUser();
                            }
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
                                    value={email}
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
                                    className="signup-accent-text"
                                >
                                    Create a password (Must contain at least 8
                                    characters, 1 capital letter, 1 number, and
                                    1 special character) *
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
                                    Would you like to receive product updates
                                    and announcements via email? Type "y" for
                                    yes or "n" for no *
                                </label>
                                <input
                                    required
                                    maxLength={1}
                                    onChange={(e) => {
                                        toggleContinueButton(e);
                                        setChoice(e.target.value);
                                        document.getElementById(
                                            "create-account-btn"
                                        ).disabled = false;
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
                            id="create-account-btn"
                            className="active-btn btn hide"
                            disabled={true}
                        >
                            Create Account
                        </button>
                    </form>
                </div>
                <span className="error-message">{errorText}</span>
            </div>
        )
    );
};

export default Signup;
