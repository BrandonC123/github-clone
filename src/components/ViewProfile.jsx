import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import ProfileInformation from "./ProfileInformation";
import ProfileNav from "./ProfileNav";
import RepositoryService from "../services/RepositoryService";

const ViewProfile = () => {
    // !!! Check if user exists if viewing another person's profile
    const user = useContext(UserContext);
    const { username } = useParams();
    const [repoList, setRepoList] = useState([]);

    function displayRepos() {
        return repoList.map((repo) => {
            return (
                <div key={repo.repoName} className="repo-card">
                    <div className="repo-content row">
                        <Link
                            to={`/${username}/${repo.repoName}`}
                            className="repo-list-link"
                        >
                            {repo.repoName}
                        </Link>
                        <button>drag</button>
                    </div>
                    javascript
                </div>
            );
        });
    }

    useEffect(() => {
        RepositoryService.getRepoList(username).then((list) => {
            if (list) {
                setRepoList(list);
            }
        });
    }, [user]);
    return (
        <div className="profile-page page">
            <ProfileInformation username={username} />
            <main className="profile-repo-content">
                <ProfileNav username={username} />
                <div className="view-six-repo">{displayRepos()}</div>
                <div className="contributions-container"></div>
            </main>
        </div>
    );
};

export default ViewProfile;
