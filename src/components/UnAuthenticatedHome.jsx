import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UnAuthenticatedHome = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    return (
        <div className="unauth-home-page">
            <header className="unauth-header">
                <div className="vertical-center">
                    <Link to={"/"}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#fff"
                            width="34"
                            height="34"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </Link>
                    <button className="button-link">Product</button>
                    <button className="button-link">Solutions</button>
                    <button className="button-link">Open Source</button>
                    <Link to={"#"} className="button-link">
                        Pricing
                    </Link>
                </div>
                <div className="vertical-center">
                    <input
                        type="search"
                        placeholder="Search GitHub"
                        className="search-bar"
                    />
                    <Link to={"/signin"} className="unauth-sign-link">
                        Sign in
                    </Link>
                    <Link
                        to={"/signup"}
                        style={{
                            padding: ".25em .5em",
                            border: "1px solid #d3d3d3",
                            borderRadius: ".5em",
                        }}
                        className="unauth-sign-link"
                    >
                        Sign up
                    </Link>
                </div>
            </header>
            <div className="unauth-content-container border-divider">
                <div className="unauth-text-content">
                    <h1 style={{ fontWeight: "4rem" }}>
                        Let's build from here, together
                    </h1>
                    <h3 className="secondary-text">
                        The complete developer platform to build, scale, and
                        deliver secure software.
                    </h3>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            navigate(`/signup/${email}`);
                        }}
                        className="row"
                    >
                        <input
                            type="email"
                            placeholder="Email address"
                            name="email"
                            id="email"
                            style={{
                                border: "none",
                                padding: "0 1em",
                                borderRadius: ".5em",
                                marginRight: ".5em",
                            }}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <button
                            style={{
                                backgroundColor: "#32b357",
                                color: "#fbfafb",
                                fontWeight: "900",
                            }}
                            className="btn"
                        >
                            Sign up for GitHub
                        </button>
                    </form>
                </div>
                <img
                    src={require("../img/code-animation.gif")}
                    alt="Code animation gif"
                    className="img-shadow"
                />
            </div>
            <div className="unauth-misc-stats">
                <p className="column">
                    <span className="misc-stat">56+ million </span>
                    <small className="secondary-text">Developers</small>
                </p>
                <p className="column">
                    <span className="misc-stat">3+ million </span>
                    <small className="secondary-text">Organizations</small>
                </p>
                <p className="column">
                    <span className="misc-stat">100+ million </span>
                    <small className="secondary-text">Repositories</small>
                </p>
                <p className="column">
                    <span className="misc-stat">72% </span>
                    <small className="secondary-text">Fortune 50</small>
                </p>
            </div>
        </div>
    );
};

export default UnAuthenticatedHome;
