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
                // console.log(res);
                res.prefixes.forEach((folderRef) => {
                    tempList.push(folderRef.name);
                });
                setRepoList(tempList);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    function displayRepoList() {
        return repoList.map((repo) => {
            return (
                <li className="repo-item">
                    <Link to={`/${user.displayName}/${repo}`}>{repo}</Link>
                </li>
            );
        });
    }
    return (
        <aside className="sidebar-container">
            <p>BrandonC123</p>
            <div className="sidebar-repo-container">
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
                            width={"20px"}
                            alt="Repository icon"
                        />
                        New
                    </button>
                </p>
                <ul className="sidebar-repo-list">{displayRepoList()}</ul>
            </div>
            <h5>Recent Activity</h5>
            <span>
                When you take actions across GitHub, we’ll provide links to that
                activity here.
            </span>
        </aside>
    );
};

export default Sidebar;
