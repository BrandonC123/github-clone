import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getStorage, ref, listAll } from "firebase/storage";
import { UserContext } from "./UserContext";
import ProfileInformation from "./ProfileInformation";
import ProfileNav from "./ProfileNav";
import RepositoryService from "../services/RepositoryService";

const ViewRepositoryList = () => {
    const user = useContext(UserContext);
    const { username } = useParams();
    const [repoList, setRepoList] = useState([]);
    const storage = getStorage();
    useEffect(() => {
        // Need to use username from Params to allow for viewing other user's repos
        RepositoryService.getRepoList(username).then((data) => {
            if (data) {
                setRepoList(data);
            }
        });
    }, [user]);
    function displayRepoList() {
        return repoList
            .map((repo) => {
                return (
                    <div className="repo-list-container border-divider row">
                        <div className="profile-repo-info column">
                            <Link
                                to={`/${username}/${repo.repoName}`}
                                className="repo-list-link"
                            >
                                {repo.repoName}
                            </Link>
                            <span>Updated on {repo.lastUpdated}</span>
                        </div>
                        <div className="profile-repo-actions">
                            <button className="secondary-gray-btn btn">
                                Star
                            </button>
                        </div>
                    </div>
                );
            })
            .reverse();
    }
    return (
        <div className="profile-page page">
            <ProfileInformation username={username} />
            <main className="profile-repo-list">
                <ProfileNav username={username} />
                {displayRepoList()}
            </main>
        </div>
    );
};

export default ViewRepositoryList;
