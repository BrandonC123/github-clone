const Signup = () => {
    const inputArray = [
        { label: "Enter your email", type: "email", title: "email" },
        { label: "Create a password", type: "password", title: "password" },
        { label: "Enter a username", type: "text", title: "username" },
        {
            label: `Would you like to receive product updates and announcements via email? Type "y" for yes or "n" for no`,
            type: "text",
            title: "announcments",
        },
    ];
    function displayInputs() {
        return inputArray.map((input, index) => {
            return (
                <div className="input-container row">
                    <div className="input column">
                        <label
                            htmlFor={`signup-${input.title}`}
                            className="signup-accent-text "
                        >
                            {input.label}
                        </label>
                        <input type={input.type} id={`signup-${input.title}`} />
                    </div>
                    <button>Continue</button>
                </div>
            );
        });
    }
    return (
        <div className="signup-page">
            <header className="signup-header row">
                <img src="/img/gh-logo.svg" alt="Github logo" />
                <p>
                    Already have an account? <a href="#">Sign in</a>
                </p>
            </header>
            <div className="signup-content-container container">
                <p className="signup-greeting">
                    Welcome to GitHub! <br /> Lets begin the adventure
                </p>
                <form action="" className="signup-form">
                    {displayInputs()}
                </form>
            </div>
        </div>
    );
};

export default Signup;
