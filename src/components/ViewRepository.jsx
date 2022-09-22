import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import RepositoryNav from "./RepositoryNav";
import RepositoryService from "../services/RepositoryService";
import Dropdown from "./Dropdown";

const ViewRepository = () => {
    // TODO: Make sure repository exists before displaying
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
                <div key={folder} className="view-repo-folder">
                    <svg
                        fill="#8b949e"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-label="Directory"
                        aria-hidden="true"
                        height="16"
                        viewBox="0 0 16 16"
                        version="1.1"
                        width="16"
                        data-view-component="true"
                        className="margin-right"
                    >
                        <path d="M1.75 1A1.75 1.75 0 000 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0016 13.25v-8.5A1.75 1.75 0 0014.25 3H7.5a.25.25 0 01-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75z"></path>
                    </svg>
                    {folder}
                </div>
            );
        });
    }
    function displayItems() {
        return repoItems.map((item) => {
            return (
                <div key={item} className="view-repo-item">
                    <svg
                        fill="#8b949e"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-label="File"
                        aria-hidden="true"
                        height="16"
                        viewBox="0 0 16 16"
                        version="1.1"
                        width="16"
                        data-view-component="true"
                        className="margin-right"
                    >
                        <path
                            fill="#8b949e"
                            fillRule="evenodd"
                            d="M3.75 1.5a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 00.25-.25V6h-2.75A1.75 1.75 0 019 4.25V1.5H3.75zm6.75.062V4.25c0 .138.112.25.25.25h2.688a.252.252 0 00-.011-.013l-2.914-2.914a.272.272 0 00-.013-.011zM2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0113.25 16h-9.5A1.75 1.75 0 012 14.25V1.75z"
                        ></path>
                    </svg>
                    {item}
                </div>
            );
        });
    }
    return (
        <div className="view-repo-page page container">
            <RepositoryNav username={username} repoName={repoName} />
            <div className="view-repo-content-container row">
                <section className="left-repo-column">
                    <div className="row align-center space-between">
                        <div className="vertical-center">
                            <button className="secondary-gray-btn btn">
                                main ▾
                            </button>
                            <p>2 branches</p>
                            <p>0 tags</p>
                        </div>
                        <div className="divider row">
                            <button className="secondary-gray-btn btn">
                                Go to file
                            </button>
                            {/* Display button only if user is signed in */}
                            {user && user.displayName === username && (
                                <Dropdown
                                    btnName={"Add File ▾"}
                                    dropdownContent={[
                                        {
                                            url: `/${username}/${repoName}/upload`,
                                            title: "Upload Files",
                                        },
                                    ]}
                                />
                            )}
                            <button className="green-action-btn btn">
                                Code
                            </button>
                        </div>
                    </div>
                    <div className="view-repo-content">
                        <div
                            className="view-repo-item border-divider"
                            style={{ backgroundColor: "rgb(22,27,34)" }}
                        >
                            {username}
                        </div>
                        {displayFolders()}
                        {displayItems()}
                    </div>
                </section>
                <div className="view-repo-side-content right-repo-column">
                    <div>
                        <h4>About</h4>
                        <p className="about-entry vertical-center">
                            <svg
                                fill="#8b949e"
                                aria-hidden="true"
                                height="16"
                                viewBox="0 0 16 16"
                                version="1.1"
                                width="16"
                                data-view-component="true"
                                className="margin-right"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M0 1.75A.75.75 0 01.75 1h4.253c1.227 0 2.317.59 3 1.501A3.744 3.744 0 0111.006 1h4.245a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75h-4.507a2.25 2.25 0 00-1.591.659l-.622.621a.75.75 0 01-1.06 0l-.622-.621A2.25 2.25 0 005.258 13H.75a.75.75 0 01-.75-.75V1.75zm8.755 3a2.25 2.25 0 012.25-2.25H14.5v9h-3.757c-.71 0-1.4.201-1.992.572l.004-7.322zm-1.504 7.324l.004-5.073-.002-2.253A2.25 2.25 0 005.003 2.5H1.5v9h3.757a3.75 3.75 0 011.994.574z"
                                ></path>
                            </svg>{" "}
                            Readme
                        </p>
                        <p className="about-entry vertical-center">
                            <svg
                                fill="#8b949e"
                                aria-hidden="true"
                                height="16"
                                viewBox="0 0 16 16"
                                version="1.1"
                                width="16"
                                data-view-component="true"
                                className="margin-right"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
                                ></path>
                            </svg>{" "}
                            0 stars
                        </p>
                        <p className="about-entry vertical-center">
                            <svg
                                fill="#8b949e"
                                aria-hidden="true"
                                height="16"
                                viewBox="0 0 16 16"
                                version="1.1"
                                width="16"
                                data-view-component="true"
                                className="margin-right"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M1.679 7.932c.412-.621 1.242-1.75 2.366-2.717C5.175 4.242 6.527 3.5 8 3.5c1.473 0 2.824.742 3.955 1.715 1.124.967 1.954 2.096 2.366 2.717a.119.119 0 010 .136c-.412.621-1.242 1.75-2.366 2.717C10.825 11.758 9.473 12.5 8 12.5c-1.473 0-2.824-.742-3.955-1.715C2.92 9.818 2.09 8.69 1.679 8.068a.119.119 0 010-.136zM8 2c-1.981 0-3.67.992-4.933 2.078C1.797 5.169.88 6.423.43 7.1a1.619 1.619 0 000 1.798c.45.678 1.367 1.932 2.637 3.024C4.329 13.008 6.019 14 8 14c1.981 0 3.67-.992 4.933-2.078 1.27-1.091 2.187-2.345 2.637-3.023a1.619 1.619 0 000-1.798c-.45-.678-1.367-1.932-2.637-3.023C11.671 2.992 9.981 2 8 2zm0 8a2 2 0 100-4 2 2 0 000 4z"
                                ></path>
                            </svg>{" "}
                            1 watching
                        </p>
                        <p className="about-entry vertical-center">
                            <svg
                                fill="#8b949e"
                                aria-hidden="true"
                                height="16"
                                viewBox="0 0 16 16"
                                version="1.1"
                                width="16"
                                data-view-component="true"
                                className="margin-right"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                ></path>
                            </svg>{" "}
                            0 Forks
                        </p>
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
