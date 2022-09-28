import { Link } from "react-router-dom";

const AccountSettingsSidebar = () => {
    return (
        <nav className="account-settings-sidebar">
            <div className="border-divider-dark column">
                <Link to={"#"}>Public profile</Link>
                <Link to={"#"}>Account</Link>
                <Link to={"#"}>Appearance</Link>
                <Link to={"#"}>Accessibility</Link>
                <Link to={"#"}>Notifications</Link>
            </div>

            <div className="border-divider-dark column">
                <small className="secondary-text">Acesss</small>
                <Link to={"#"}>Billing and plans</Link>
                <Link to={"#"}> Emails</Link>
                <Link to={"#"}>Password and authentication</Link>
                <Link to={"#"}>SSH and GPG keys</Link>
                <Link to={"#"}>Organizations</Link>
                <Link to={"#"}>Moderation</Link>
            </div>

            <div className="border-divider-dark column">
                <small className="secondary-text">
                    Code, planning, and automation
                </small>
                <Link to={"#"}>Repositories</Link>
                <Link to={"#"}>Packages</Link>
                <Link to={"#"}>Github Copilot</Link>
                <Link to={"#"}>Pages</Link>
                <Link to={"#"}>Saved replies</Link>
            </div>
            <div className="border-divider-dark column">
                <small className="secondary-text">Security</small>
                <Link to={"#"}>Code security and analysis</Link>
            </div>
            <div className="border-divider-dark column">
                <Link to={"#"}>Applications</Link>
                <Link to={"#"}>Scheduled reminders</Link>
            </div>
            <Link to={"/account"}></Link>
        </nav>
    );
};

export default AccountSettingsSidebar;
