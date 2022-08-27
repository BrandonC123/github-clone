import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import { getStorage, ref, listAll, getMetadata } from "firebase/storage";
import RepositoryNav from "./RepositoryNav";
import RepositoryService from "../services/RepositoryService";
import Dropdown from "./Dropdown";

const ViewRepository = () => {
    const user = useContext(UserContext);
    const { username } = useParams();
    const { repoName } = useParams();
    const [repoFolders, setRepoFolders] = useState([]);
    const [repoItems, setRepoItems] = useState([]);

    useEffect(() => {
        RepositoryService.getRepoContent(username, repoName).then((res) => {
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
            return (
                <div className="view-repo-folder">
                    <img src="/img/folder-icon.svg" alt="" />
                    {folder}
                </div>
            );
        });
    }
    function displayItems() {
        return repoItems.map((item) => {
            return (
                <div className="view-repo-item">
                    <img src="/img/file-icon.svg" alt="" />
                    {item}
                </div>
            );
        });
    }

    return (
        <div className="view-repo-page page container">
            <RepositoryNav username={user.displayName} repoName={repoName} />
            <div className="view-repo-content-container row">
                <section className="left-repo-column">
                    <div className="row align-center space-between">
                        <div className="divider row">
                            <Dropdown
                                btnName="main ▾"
                                dropdownContent={[{ url: "/", title: "test" }]}
                            />
                            <p>2 branches</p>
                            <p>0 tags</p>
                        </div>
                        <div className="divider row">
                            <button className="secondary-gray-btn btn">
                                Go to file
                            </button>
                            <Dropdown
                                btnName={"Add File ▾"}
                                dropdownContent={[
                                    {
                                        url: `/${user.displayName}/${repoName}/upload`,
                                        title: "Upload Files",
                                    },
                                ]}
                            />
                            <button className="green-action-btn btn">
                                Code
                            </button>
                        </div>
                    </div>
                    <div className="view-repo-content">
                        <div
                            className="border-divider"
                            style={{ backgroundColor: "rgb(22,27,34)" }}
                        >
                            {user.displayName} Update Readme
                        </div>
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
