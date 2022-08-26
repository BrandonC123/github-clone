import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import ProfileInformation from "./ProfileInformation";
import ProfileNav from "./ProfileNav";
import RepositoryService from "../services/RepositoryService";
import ViewRepositoryListDropdown from "./ViewRepositoryListDropdown";

const ViewRepositoryList = () => {
    // TODO: Add functionality to star repos
    const user = useContext(UserContext);
    const navigate = useNavigate();
    const { username } = useParams();
    // Repo list that is updated to tell webpage to render which sorted array
    const [repoList, setRepoList] = useState([]);
    const [lastUpdatedList, setLastUpdatedList] = useState([]);
    const [nameSortList, setNameSortList] = useState([]);
    const [starSortList, setStarSortList] = useState([]);

    useEffect(() => {
        // Use username from Params to allow for viewing other user's repos
        RepositoryService.getRepoList(username).then((serviceRepoList) => {
            if (serviceRepoList) {
                sortByLastUpdated(serviceRepoList);
                sortByName(serviceRepoList);
            }
        });
        RepositoryService.getStarredRepoList(username).then((starRepoList) => {
            if (starRepoList) {
                setStarSortList(starRepoList);
            }
        });
    }, [user]);
    function sortByLastUpdated(repoList) {
        let tempLastUpdated = Array.from(repoList);
        tempLastUpdated
            .sort((repo1, repo2) => {
                return repo1.lastUpdated - repo2.lastUpdated;
            })
            .reverse();
        setLastUpdatedList(tempLastUpdated);
        // Default display is sort by last updated
        setRepoList(tempLastUpdated);
    }
    function sortByName(repoList) {
        let tempNameSort = Array.from(repoList);
        tempNameSort.sort((repo1, repo2) => {
            return repo1.repoName.localeCompare(repo2.repoName);
        });
        setNameSortList(tempNameSort);
    }
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
    // Update repo list to display current sort by selection
    function toggleRepoList(sortType) {
        switch (sortType.toLowerCase()) {
            case "last updated":
                setRepoList(lastUpdatedList);
                break;
            case "name":
                setRepoList(nameSortList);
                break;
            case "stars":
                setRepoList(starSortList);
                break;
            default:
                return;
        }
    }
    // TODO: Sort by last updated default. Add Sort by button and header
    function displayRepoList() {
        return repoList.map((repo) => {
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
                        <small className="secondary-text">
                            Updated on {date.getMonth()} {date.getDate()}
                            {/* {date.toUTCString()} */}
                        </small>
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
        });
    }
    return (
        <div className="profile-page page">
            <ProfileInformation username={username} />
            <main className="profile-repo-list">
                <ProfileNav username={username} />
                <div className="row space-between align-center">
                    <input
                        type="search"
                        placeholder="Find a repository..."
                        className="search-bar"
                    />
                    <div className="divider row">
                        <ViewRepositoryListDropdown
                            toggleRepoList={toggleRepoList}
                        />
                    </div>
                    <button
                        onClick={() => {
                            navigate("/new");
                        }}
                        className="green-action-btn btn vertical-center"
                    >
                        <img
                            width={"15px"}
                            src="/img/repo-icon.svg"
                            alt="Repository icon"
                        />
                        New
                    </button>
                </div>
                {displayRepoList()}
            </main>
        </div>
    );
};

export default ViewRepositoryList;
