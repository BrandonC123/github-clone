import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext, useEffect, useState } from "react";
import RepositoryService from "../services/RepositoryService";

const Sidebar = () => {
    const navigate = useNavigate();
    const [repoList, setRepoList] = useState([]);
    const user = useContext(UserContext);
    useEffect(() => {
        RepositoryService.getRepoList(user.displayName).then(
            (serviceRepoList) => {
                setRepoList(serviceRepoList.slice(-7));
            }
        );
    }, [user]);
    function displayRepoList() {
        return repoList.map((repo) => {
            return (
                <li key={repo.repoName}>
                    <Link
                        to={`/${user.displayName}/${repo.repoName}`}
                        className="repo-item hover-underline"
                    >
                        {user.displayName}/{repo.repoName}
                    </Link>
                </li>
            );
        });
    }
    return (
        <aside className="sidebar-container">
            <p className="border-divider-dark vertical-center">
                <img
                    src={user.photoURL}
                    alt="Profile icon"
                    className="round-profile-img profile-icon"
                />
                {user.displayName}
            </p>
            <div className="sidebar-repo-container border-divider-dark">
                <p className="vertical-center">
                    Recent Repositories{" "}
                    <button
                        onClick={() => {
                            navigate("/new");
                        }}
                        className="green-action-btn btn vertical-center"
                    >
                        <img
                            src={require("../img/repo-icon.svg").default}
                            width={"15px"}
                            alt="Repository icon"
                        />
                        New
                    </button>
                </p>
                <ul className="sidebar-repo-list">{displayRepoList()}</ul>
            </div>
            <h5>Recent Activity</h5>
            <span className="secondary-text">
                When you take actions across GitHub, we’ll provide links to that
                activity here.
            </span>
        </aside>
    );
};

export default Sidebar;
