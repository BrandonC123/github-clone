import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStorage, ref, listAll } from "firebase/storage";
import { UserContext } from "./UserContext";

const ViewProfile = () => {
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
        return repoList.map((repo) => {
            return (
                <div className="profile-repo-container border-divider row">
                    <div className="profile-repo-info column">
                        <Link
                            to={`/${user.displayName}/${repo}`}
                            className="profile-repo-link"
                        >
                            {repo}
                        </Link>
                        <span>Updated today</span>
                    </div>
                    <div className="profile-repo-actions"><button>Star</button></div>
                </div>
            );
        });
    }
    return (
        <div className="profile-page page">
            <div className="profile-information-column">
                <img src="/img/default-profile-pic.png" alt="" />
                <h1></h1>
                <h2>{user.displayName}</h2>
                <button>Edit profile</button>
            </div>
            <main className="profile-repo-list">{displayRepoList()}</main>
        </div>
    );
};

export default ViewProfile;
