import { Link } from "react-router-dom";

const RepositoryNav = ({ username, repoName }) => {
    return (
        <div className="view-repo-head">
            <div className="view-repo-title row align-center space-between">
                <h1>
                    <Link to={`/${username}`}>{username}</Link>/{repoName}
                </h1>
                <div className="divider">
                    <button className="secondary-gray-btn btn">Unpin</button>
                    <button className="secondary-gray-btn btn">Unwatch</button>
                    <button className="secondary-gray-btn btn">Fork</button>
                    <button className="secondary-gray-btn btn">Star</button>
                </div>
            </div>
            <nav className="secondary-nav row">
                <Link to={`/${username}`} className="vertical-center">
                    <img src="/img/repo-header-icons/code.svg" alt="" />
                    Code
                </Link>
                <Link
                    to={`/${username}/repositories`}
                    className="vertical-center"
                >
                    <img src="/img/repo-header-icons/issues.svg" alt="" />
                    Issues
                </Link>
                <Link to={"/projects"} className="vertical-center">
                    <img src="/img/repo-header-icons/pull.svg" alt="" />
                    Pull Requests
                </Link>
                <Link to={"/packages"} className="vertical-center">
                    <img src="/img/repo-header-icons/packages.svg" alt="" />
                    Actions
                </Link>
                <Link to={"/stars"} className="vertical-center">
                    <img src="/img/repo-header-icons/projects.svg" alt="" />
                    Projects
                </Link>
                <Link to={"/stars"} className="vertical-center">
                    <img src="/img/repo-header-icons/wiki.svg" alt="" />
                    Wiki
                </Link>
                <Link to={"/stars"} className="vertical-center">
                    <img src="/img/repo-header-icons/security.svg" alt="" />
                    Security
                </Link>
                <Link to={"/stars"} className="vertical-center">
                    <img src="/img/repo-header-icons/insights.svg" alt="" />
                    Insights
                </Link>
                <Link to={"/stars"} className="vertical-center">
                    <img src="/img/repo-header-icons/settings.svg" alt="" />
                    Settings
                </Link>
            </nav>
        </div>
    );
};

export default RepositoryNav;
