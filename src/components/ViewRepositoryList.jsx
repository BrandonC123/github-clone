import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import ProfileInformation from "./ProfileInformation";
import ProfileNav from "./ProfileNav";
import RepositoryService from "../services/RepositoryService";

const ViewRepositoryList = () => {
    // TODO: Add functionality to star repos
    const user = useContext(UserContext);
    const { username } = useParams();
    const [repoList, setRepoList] = useState([]);
    useEffect(() => {
        // Use username from Params to allow for viewing other user's repos
        RepositoryService.getRepoList(username).then((data) => {
            if (data) {
                setRepoList(data);
            }
        });
    }, [user]);
    function toggleStarBtn(btn) {
        let starIcon = btn.firstChild;
        let btnText = btn.lastChild.textContent;
        if (btnText === "Star") {
            btn.lastChild.textContent = "Starred";
            // btn.firstChild.innerHtml =
        } else {
            btn.lastChild.textContent = "Star";
            btn.firstChild.src = "/img/star-icon.svg";
        }
    }
    // TODO: Sort by last updated default. Add Sort by button and header
    function displayRepoList() {
        return repoList
            .map((repo) => {
                const date = new Date(repo.lastUpdated.seconds * 1000);
                return (
                    <div className="repo-list-container border-divider row">
                        <div className="profile-repo-info column">
                            <Link
                                to={`/${username}/${repo.repoName}`}
                                className="repo-list-link"
                            >
                                {repo.repoName}
                            </Link>
                            <span>
                                Updated on {date.getMonth()} {date.getDate()}
                            </span>
                        </div>
                        <div className="profile-repo-actions">
                            <button
                                onClick={(e) => {
                                    // RepositoryService.starRepo(
                                    //     user.displayName,
                                    //     repo.repoName,
                                    //     repoList
                                    // );
                                    toggleStarBtn(e.target);
                                }}
                                className="secondary-gray-btn btn vertical-center"
                            >
                                <svg
                                    fill="#8b949e"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    version="1.1"
                                    width="16"
                                    data-view-component="true"
                                    class="octicon octicon-star mr-1"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
                                    ></path>
                                </svg>

                                <span>Star</span>
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
