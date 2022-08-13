import { Link } from "react-router-dom";

const RepositoryNav = ({ username }) => {
    return (
        <nav className="secondary-nav">
            <Link to={`/${username}`}>
                <img src="/img/repo-header-icons/code.svg" alt="" />
                Code
            </Link>
            <Link to={`/${username}/repositories`}>Issues</Link>
            <Link to={"/projects"}>Pull Requests</Link>
            <Link to={"/packages"}>Actions</Link>
            <Link to={"/stars"}>Projects</Link>
            <Link to={"/stars"}>Wiki</Link>
            <Link to={"/stars"}>Security</Link>
            <Link to={"/stars"}>Insights</Link>
            <Link to={"/stars"}>Settings</Link>
        </nav>
    );
};

export default RepositoryNav;
