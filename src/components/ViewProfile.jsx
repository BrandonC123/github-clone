import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import ProfileInformation from "./ProfileInformation";
import ProfileNav from "./ProfileNav";
import RepositoryService from "../services/RepositoryService";

const ViewProfile = () => {
    const user = useContext(UserContext);
    const [repoList, setRepoList] = useState([]);

    function displayRepos() {
        return repoList.map((repo) => {
            return (
                <div key={repo} className="repo-card">
                    <div className="repo-content row">
                        <Link
                            to={`/${user.displayName}/${repo}`}
                            className="repo-list-link"
                        >
                            {repo}
                        </Link>
                        <button>drag</button>
                    </div>
                    javascript
                </div>
            );
        });
    }

    useEffect(() => {
        RepositoryService.getRepoList(user.uid).then((list) => {
            if (list) {
                setRepoList(list);
            }
        });
    }, [user]);
    return (
        <div className="profile-page page">
            <ProfileInformation />
            <main className="profile-repo-content">
                <ProfileNav username={user.displayName} />
                <div className="view-six-repo">{displayRepos()}</div>
                <div className="contributions-container">t</div>
            </main>
        </div>
    );
};

export default ViewProfile;
