import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import { getStorage, ref, listAll } from "firebase/storage";
import RepositoryNav from "./RepositoryNav";
import RepositoryService from "../services/RepositoryService";

const ViewRepository = () => {
    const user = useContext(UserContext);
    const { repoName } = useParams();
    const [repoFolders, setRepoFolders] = useState([]);
    const [repoItems, setRepoItems] = useState([]);

    useEffect(() => {
        RepositoryService.getRepoContent(user.uid, repoName).then((res) => {
            // Only update if data differs
            if (repoFolders.length !== res.tempFolderList.length) {
                setRepoFolders(res.tempFolderList);
            }
            if (repoItems.length !== res.tempItemList.length) {
                setRepoItems(res.tempItemList);
            }
        });
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
        <div className="view-repo-page page container">
            <div className="view-repo-head">
                <div className="view-repo-title row align-center">
                    <h1>
                        <Link to={`/${user.displayName}`}>
                            {user.displayName}
                        </Link>
                        /{repoName}
                    </h1>
                    <button className="secondary-gray-btn btn">Unpin</button>
                    <button className="secondary-gray-btn btn">Unwatch</button>
                    <button className="secondary-gray-btn btn">Fork</button>
                    <button className="secondary-gray-btn btn">Star</button>
                </div>
                <RepositoryNav />
            </div>
            <div className="view-repo-content-container row">
                <section className="left-repo-column">
                    <div className="row align-center">
                        <button className="secondary-gray-btn btn">main</button>
                        <p>2 branches</p>
                        <p>0 tags</p>
                        <button className="secondary-gray-btn btn">
                            Go to file
                        </button>
                        <button className="secondary-gray-btn btn">
                            Add file
                        </button>
                        <button className="green-action-btn btn">Code</button>
                    </div>
                    <div className="view-repo-content">
                        {displayFolders()}
                        {displayItems()}
                    </div>
                </section>
                <div className="view-repo-side-content right-repo-column">
                    <div>
                        <h4>About</h4>
                        <p className="about-entry">Readme</p>
                        <p className="about-entry">0 stars</p>
                        <p className="about-entry">1 watching</p>
                        <p className="about-entry">0 Forks</p>
                    </div>
                    <div>
                        <h4>Releases</h4>
                    </div>
                    <div>
                        <h4>Packages</h4>
                    </div>
                    <div>
                        <h4>Environments</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewRepository;
