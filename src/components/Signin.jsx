import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassowrd] = useState("");

    function signInUser() {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential.user);
            })
            .catch((error) => {
                console.error(error.message);
            });
    }
    return (
        <div className="signin-page">
            <div className="logo-container column align-center">
                <img
                    className="signin-logo"
                    src="/img/gh-logo.svg"
                    alt="Github logo"
                    width={"55px"}
                />{" "}
                <h1 className="title">Sign in to Github</h1>
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    signInUser();
                }}
                className="signin-form signin-page-container"
            >
                <div className="input-container column">
                    <label htmlFor="signin-email" className="signin-page-label">
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
                    <label
                        htmlFor="signin-password"
                        className="signin-page-label"
                    >
                        Password
                        <a href="#" className="signin-page-forget">
                            Forgot password?
                        </a>
                    </label>
                    <input
                        onChange={(e) => {
                            setPassowrd(e.target.value);
                        }}
                        type="password"
                        id="signin-password"
                        className="signin-input"
                    />
                </div>
                <button className="signin-btn btn">Sign in</button>
            </form>
            <div className="create-account-container signin-page-container">
                New to Github? <Link to={"/signup"}>Create an account</Link>
            </div>
            <div className="external-links row justify-center">
                <a href="#">Terms</a>
                <a href="#">Privacy</a>
                <a href="#">Security</a>
                <a href="#">Contact Github</a>
            </div>
        </div>
    );
};

export default Signin;