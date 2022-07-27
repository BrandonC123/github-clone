const Signup = () => {
    function toggleContinueButton(e) {
        const button = e.target.parentElement.parentElement.lastElementChild;
        if (e.target.checkValidity()) {
            button.classList.remove("inactive-btn");
            button.classList.add("active-btn");
        } else {
            button.classList.add("inactive-btn");
            button.classList.remove("active-btn");
        }
    }
    function displayButton() {
        return (
            <button
                onClick={(e) => {
                    console.log(e.target.parentElement.nextSibling);
                    e.target.parentElement.nextSibling.classList.toggle("hide");
                }}
                type="button"
                className="inactive-btn btn"
            >
                Continue
            </button>
        );
    }
    return (
        <div className="signup-page">
            <header className="signup-header">
                <div className="signup-header-content container row">
                    <img src="/img/gh-logo.svg" alt="Github logo" />
                    <p>
                        Already have an account? <a href="#">Sign in</a>
                    </p>
                </div>
            </header>
            <div className="signup-content-container">
                <p className="signup-greeting">
                    Welcome to GitHub! <br /> Lets begin the adventure
                </p>
                <form action="" className="signup-form">
                    <div className={"input-container row"}>
                        <div className="input column">
                            <label
                                htmlFor={`signup-email`}
                                className="signup-accent-text "
                            >
                                Enter your email
                            </label>
                            <input
                                required
                                minLength={5}
                                onChange={(e) => {
                                    toggleContinueButton(e);
                                }}
                                type={"email"}
                                id={`signup-email`}
                            />
                        </div>
                        {displayButton()}
                    </div>

                    <div className={"input-container row hide"}>
                        <div className="input column">
                            <label
                                htmlFor={`signup-password`}
                                className="signup-accent-text "
                            >
                                Create a password
                            </label>
                            <input
                                required
                                minLength={5}
                                onChange={(e) => {
                                    toggleContinueButton(e);
                                }}
                                type={"password"}
                                id={`signup-password`}
                            />
                        </div>
                        {displayButton()}
                    </div>

                    <div className={"input-container row hide"}>
                        <div className="input column">
                            <label
                                htmlFor={`signup-username`}
                                className="signup-accent-text "
                            >
                                Create a username
                            </label>
                            <input
                                required
                                minLength={5}
                                onChange={(e) => {
                                    toggleContinueButton(e);
                                }}
                                type={"text"}
                                id={`signup-username`}
                            />
                        </div>
                        {displayButton()}
                    </div>

                    <div className={"input-container row hide"}>
                        <div className="input column">
                            <label
                                htmlFor={`signup-announcement`}
                                className="signup-accent-text "
                            >
                                Would you like to receive product updates and
                                announcements via email? Type "y" for yes or "n"
                                for no
                            </label>
                            <input
                                required
                                minLength={1}
                                onChange={(e) => {
                                    toggleContinueButton(e);
                                }}
                                type={"text"}
                                id={`signup-announcement`}
                            />
                        </div>
                        {displayButton()}
                    </div>

                    <button className="active-btn btn hide">
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
