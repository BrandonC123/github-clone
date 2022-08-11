import { Link } from "react-router-dom";

const ProfileNav = ({ username }) => {
    return (
        <nav className="profile-nav">
            <Link to={`/${username}`}>Overview</Link>
            <Link to={`/${username}/repositories`}>Repositories</Link>
            <Link to={"/projects"}>Projects</Link>
            <Link to={"/packages"}>Packages</Link>
            <Link to={"/stars"}>Stars</Link>
        </nav>
    );
};

export default ProfileNav;
