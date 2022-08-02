import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import { getStorage, ref, listAll } from "firebase/storage";

const ViewRepository = () => {
    const user = useContext(UserContext);
    const { repoName } = useParams();
    const [repoFolders, setRepoFolders] = useState([]);
    const [repoItems, setRepoItems] = useState([]);
    const storage = getStorage();

    function getRepoContent() {
        const listRef = ref(storage, `/${user.uid}/repos/${repoName}`);
        let tempFolderList = [];
        let tempItemList = [];
        listAll(listRef)
            .then((res) => {
                if (res.prefixes.length !== repoFolders.length) {
                    res.prefixes.forEach((folderRef) => {
                        tempFolderList.push(folderRef.name);
                    });
                    setRepoFolders(tempFolderList);
                }
                if (res.items.length !== repoItems.length) {
                    res.items.forEach((item) => {
                        tempItemList.push(item.name);
                    });
                    setRepoItems(tempItemList);
                }
            })
            .catch((error) => {
                console.error(error);
            });
        console.log(repoFolders);
    }
    useEffect(() => {
        getRepoContent();
    }, [user]);
    function displayFolders() {
        return repoFolders.map((folder) => {
            return <div className="view-repo-folder">{folder}</div>;
        });
    }
    function displayItems() {
        return repoItems.map((item) => {
            return <div className="view-repo-item">{item}</div>;
        });
    }

    return (
        <div className="view-repo-page container">
            <div className="view-repo-title">
                <h1>
                    <Link to={`/${user.displayName}`}>{user.displayName}</Link>/
                    {repoName}
                </h1>
            </div>
            <section className="view-repo-content-container">
                <div className="view-repo-content-head"></div>
                <div className="view-repo-content">
                    {displayFolders()}
                    {displayItems()}
                </div>
            </section>
        </div>
    );
};

export default ViewRepository;
