import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { getStorage, ref, listAll } from "firebase/storage";
import { useContext, useEffect, useState } from "react";
import RepositoryService from "../services/RepositoryService";

const Sidebar = () => {
    const navigate = useNavigate();
    const [repoList, setRepoList] = useState([]);
    const user = useContext(UserContext);
    useEffect(() => {
        RepositoryService.getRepoList(user.displayName).then(
            (serviceRepoList) => {
                setRepoList(serviceRepoList);
            }
        );
    }, [user]);
    function displayRepoList() {
        return repoList.map((repo) => {
            return (
                <li key={repo.repoName}>
                    <Link
                        to={`/${user.displayName}/${repo.repoName}`}
                        className="repo-item"
                    >
                        {user.displayName}/{repo.repoName}
                    </Link>
                </li>
            );
        });
    }
    return (
        <aside className="sidebar-container">
            <p className="border-divider">{user.displayName}</p>
            <div className="sidebar-repo-container border-divider">
                <p className="row">
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
