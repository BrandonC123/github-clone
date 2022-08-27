import { Link } from "react-router-dom";

const AccountSettingsSidebar = () => {
    return (
        <nav className="account-settings-sidebar">
            <div className="border-divider column">
                <Link to={"/account"}>Public profile</Link>
                <Link to={"/account"}>Account</Link>
                <Link to={"/account"}>Appearance</Link>
                <Link to={"/account"}>Accessibility</Link>
                <Link to={"/account"}>Notifications</Link>
            </div>

            <div className="border-divider column">
                <small className="secondary-text">Acesss</small>
                <Link to={"/account"}>Billing and plans</Link>
                <Link to={"/account"}> Emails</Link>
                <Link to={"/account"}>Password and authentication</Link>
                <Link to={"/account"}>SSH and GPG keys</Link>
                <Link to={"/account"}>Organizations</Link>
                <Link to={"/account"}>Moderation</Link>
            </div>

            <div className="border-divider column">
                <small className="secondary-text">
                    Code, planning, and automation
                </small>
                <Link to={"/account"}>Repositories</Link>
                <Link to={"/account"}>Packages</Link>
                <Link to={"/account"}>Github Copilot</Link>
                <Link to={"/account"}>Pages</Link>
                <Link to={"/account"}>Saved replies</Link>
            </div>
            <div className="border-divider column">
                <small className="secondary-text">Security</small>
                <Link to={"/account"}>Code security and analysis</Link>
            </div>
            <div className="border-divider column">
                <Link to={"/account"}>Applications</Link>
                <Link to={"/account"}>Scheduled reminders</Link>
            </div>
            <Link to={"/account"}></Link>
        </nav>
    );
};

export default AccountSettingsSidebar;
