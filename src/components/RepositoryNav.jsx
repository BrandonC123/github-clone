import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import db from "..";
import RepositoryService from "../services/RepositoryService";
import StarButton from "./StarButton";
import { UserContext } from "./UserContext";

const RepositoryNav = ({ username, repoName }) => {
    const user = useContext(UserContext);
    const [repo, setRepo] = useState(null);
    const [repoList, setRepoList] = useState([]);
    const [starredRepoList, setStarredRepoList] = useState([]);

    useEffect(() => {
        let index;
        RepositoryService.getRepoList(username).then((serviceRepoList) => {
            if (serviceRepoList) {
                setRepoList(serviceRepoList);
                index = serviceRepoList
                    .map(({ repoName }) => repoName)
                    .indexOf(repoName);
                let tempRepo = serviceRepoList[index];
                setRepo({
                    ...tempRepo,
                    id: `${username}-${tempRepo.repoName}`,
                });
            }
        });
        // Listen to changes to update starred repositories and star count
        onSnapshot(doc(db, "users", `${user.displayName}`), (doc) => {
            console.log(doc.data().starredRepoList);
            setStarredRepoList(doc.data().starredRepoList);
            setRepoList(doc.data().repoList);
            const tempRepo = doc.data().repoList[index];
            setRepo({ ...tempRepo, id: `${username}-${tempRepo.repoName}` });
        });
    }, [user]);
    return (
        <div className="view-repo-head">
            <div className="view-repo-title row align-center space-between">
                <h1>
                    <Link to={`/${username}`} className="blue-accent-text">
                        {username}
                    </Link>
                    /
                    <Link
                        to={`/${username}/${repoName}`}
                        className="blue-accent-text"
                    >
                        {repoName}
                    </Link>
                </h1>
                <div className="divider">
                    <button className="secondary-gray-btn btn">Pin</button>
                    <button className="secondary-gray-btn btn">Unwatch</button>
                    <button className="secondary-gray-btn btn">Fork</button>
                    {repo && (
                        <StarButton
                            repo={repo}
                            starredRepoList={starredRepoList}
                            repoList={repoList}
                        />
                    )}
                </div>
            </div>
            <nav className="secondary-nav row">
                <Link
                    to={`/${username}/${repoName}`}
                    className="vertical-center"
                >
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
                <Link to={"#"} className="vertical-center">
                    <img src="/img/repo-header-icons/actions.svg" alt="" />
                    Actions
                </Link>
                <Link to={"#"} className="vertical-center">
                    <img src="/img/repo-header-icons/projects.svg" alt="" />
                    Projects
                </Link>
                <Link to={"#"} className="vertical-center">
                    <img src="/img/repo-header-icons/wiki.svg" alt="" />
                    Wiki
                </Link>
                <Link to={"#"} className="vertical-center">
                    <img src="/img/repo-header-icons/security.svg" alt="" />
                    Security
                </Link>
                <Link to={"#"} className="vertical-center">
                    <img src="/img/repo-header-icons/insights.svg" alt="" />
                    Insights
                </Link>
                {user.displayName === username && (
                    <Link to={"#"} className="vertical-center">
                        <img src="/img/repo-header-icons/settings.svg" alt="" />
                        Settings
                    </Link>
                )}
            </nav>
        </div>
    );
};

export default RepositoryNav;
