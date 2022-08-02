import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { getStorage, ref, listAll } from "firebase/storage";
import { useContext, useEffect, useState } from "react";

const Sidebar = () => {
    const navigate = useNavigate();
    const [repoList, setRepoList] = useState([]);
    const user = useContext(UserContext);
    const storage = getStorage();
    useEffect(() => {
        const listRef = ref(storage, `/${user.uid}/repos`);
        let tempList = [];
        listAll(listRef)
            .then((res) => {
                if (res.prefixes.length !== repoList.length) {
                    res.prefixes.forEach((folderRef) => {
                        tempList.push(folderRef.name);
                    });
                    setRepoList(tempList);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [user]);
    function displayRepoList() {
        return repoList.map((repo) => {
            return (
                <li>
                    <Link
                        to={`/${user.displayName}/${repo}`}
                        className="repo-item"
                    >
                        {user.displayName}/{repo}
                    </Link>
                </li>
            );
        });
    }
    return (
        <aside className="sidebar-container">
            <p className="border-divider">{user.displayName}</p>
            <div className="sidebar-repo-container border-divider">
                <p>
                    Recent Repositories{" "}
                    <button
                        onClick={() => {
                            navigate("/new");
                        }}
                        className="create-repo-btn btn"
                    >
                        <img
                            src="/img/repo-icon.svg"
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
