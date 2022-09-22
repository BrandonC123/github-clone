import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = ({ signedIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassowrd] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (signedIn) {
            navigate("/");
        }
    }, [signedIn]);
    function signInUser() {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                console.error(error.message);
                setErrorMessage("Wrong email or password.");
            });
    }
    return (
        !signedIn && (
            <div className="signin-page">
                <div className="logo-container">
                    <Link to={"/"}>
                        <img
                            className="signin-logo"
                            src={require("../img/gh-logo.svg").default}
                            alt="Github logo"
                            width={"55px"}
                        />{" "}
                    </Link>
                    <h1 className="title">Sign in to GitHub</h1>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        signInUser();
                    }}
                    className="signin-form signin-page-container"
                >
                    <div className="input-container column">
                        <label
                            htmlFor="signin-email"
                            className="signin-page-label"
                        >
                            Email address
                        </label>
                        <input
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            type="email"
                            id="signin-email"
                            className="signin-input"
                        />
                    </div>
                    <div className="input-container column">
                        <div
                            htmlFor="signin-password"
                            style={{ width: "100%" }}
                            className="signin-page-label row space-between"
                        >
                            Password
                            <Link to={"#"} className="signin-page-forget">
                                Forgot password?
                            </Link>
                        </div>
                        <input
                            onChange={(e) => {
                                setPassowrd(e.target.value);
                            }}
                            type="password"
                            id="signin-password"
                            className="signin-input"
                            autoComplete="on"
                        />
                    </div>
                    <span>{errorMessage}</span>
                    <button
                        style={{ width: "100%" }}
                        className="green-action-btn btn"
                    >
                        Sign in
                    </button>
                </form>
                <div className="create-account-container signin-page-container">
                    New to Github? <Link to={"/signup"}>Create an account</Link>
                </div>
                <div className="external-links row justify-center">
                    <Link to={"#"}>Terms</Link>
                    <Link to={"#"}>Privacy</Link>
                    <Link to={"#"}>Security</Link>
                    <Link to={"#"}>Contact Github</Link>
                </div>
            </div>
        )
    );
};

export default Signin;
