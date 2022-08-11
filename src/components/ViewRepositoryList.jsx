import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStorage, ref, listAll } from "firebase/storage";
import { UserContext } from "./UserContext";
import ProfileInformation from "./ProfileInformation";
import ProfileNav from "./ProfileNav";

const ViewRepositoryList = () => {
    const user = useContext(UserContext);
    const [repoList, setRepoList] = useState([]);
    const storage = getStorage();
    useEffect(() => {
        const listRef = ref(storage, `/${user.uid}/repos`);
        let tempList = [];
        listAll(listRef)
            .then((res) => {
                if (res.prefixes.length !== repoList.length) {
                    res.prefixes.forEach((folderRef) => {
                        tempList.push(folderRef.name);
                        console.log(folderRef);
                    });
                    setRepoList(tempList);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [user, storage]);
    function displayRepoList() {
        return repoList
            .map((repo) => {
                return (
                    <div className="repo-list-container border-divider row">
                        <div className="profile-repo-info column">
                            <Link
                                to={`/${user.displayName}/${repo}`}
                                className="repo-list-link"
                            >
                                {repo}
                            </Link>
                            {/* Save last updated in metadata? */}
                            <span>Updated today</span>
                        </div>
                        <div className="profile-repo-actions">
                            <button>Star</button>
                        </div>
                    </div>
                );
            })
            .reverse();
    }
    return (
        <div className="profile-page page">
            <ProfileInformation />
            <main className="profile-repo-list">
                <ProfileNav username={user.displayName} />
                {displayRepoList()}
            </main>
        </div>
    );
};

export default ViewRepositoryList;
