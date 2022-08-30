import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import ProfileInformation from "./ProfileInformation";
import ProfileNav from "./ProfileNav";
import RepositoryService from "../services/RepositoryService";
import ViewRepositoryListDropdown from "./ViewRepositoryListDropdown";
import star from "../img/star-icon.svg";
import filledStar from "../img/filled-star-icon.svg";

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
    const [searchTerm, setSearchTerm] = useState("");

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
    }, [username]);
    useEffect(() => {
        let tempRepoList = Array.from(repoList);
        tempRepoList = tempRepoList.filter((repo) =>
            repo.repoName.includes(searchTerm)
        );
        // console.log(tempRepoList);
        setRepoList(tempRepoList);
    }, [searchTerm]);
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
        let btnText = btn.lastChild.textContent;
        if (btnText === "Star") {
            btn.lastChild.textContent = "Starred";
            btn.firstChild.src = filledStar;
        } else {
            btn.lastChild.textContent = "Star";
            btn.firstChild.src = star;
        }
    }
    function displayStarBtn(repo, starred) {
        const starSrc = starred ? filledStar : star;
        const btnText = starred ? "Starred" : "Star";
        return (
            <button
                onClick={(e) => {
                    RepositoryService.starRepo(
                        user.displayName,
                        repo.repoName,
                        repoList
                    );
                    // Make sure target is the button not img/span
                    const btn =
                        e.target === e.currentNode
                            ? e.target
                            : e.target.parentNode;
                    toggleStarBtn(btn);
                }}
                className="secondary-gray-btn btn vertical-center"
            >
                <img src={starSrc} alt="Star icon" />
                <span>{btnText}</span>
            </button>
        );
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
                        {displayStarBtn(repo, repo.starred)}
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
                    {/* TODO: search bar */}
                    <input
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                        }}
                        type="search"
                        placeholder="Find a repository..."
                        className="search-bar"
                    />
                    <div className="divider row">
                        <ViewRepositoryListDropdown
                            toggleRepoList={toggleRepoList}
                        />
                    </div>
                    {user.displayName === username && (
                        <button
                            onClick={() => {
                                navigate("/new");
                            }}
                            className="green-action-btn btn vertical-center"
                        >
                            <img
                                width={"15px"}
                                src={require("../img/repo-icon.svg").default}
                                alt="Repository icon"
                            />
                            New
                        </button>
                    )}
                </div>
                {displayRepoList()}
            </main>
        </div>
    );
};

export default ViewRepositoryList;
