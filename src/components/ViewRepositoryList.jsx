import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import ProfileInformation from "./ProfileInformation";
import ProfileNav from "./ProfileNav";
import RepositoryService from "../services/RepositoryService";
import ViewRepositoryListDropdown from "./ViewRepositoryListDropdown";
import star from "../img/star-icon.svg";
import filledStar from "../img/filled-star-icon.svg";
import StarButton from "./StarButton";
import useDebounce from "./useDebounce";
import RepositoryListing from "./RepositoryListing";

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
    // Debounce search to make searching less intensive
    const debouncedSearch = useDebounce(searchTerm, 500);

    useEffect(() => {
        // Use username from Params to allow for viewing other user's repos
        RepositoryService.getRepoList(username).then((serviceRepoList) => {
            if (serviceRepoList) {
                sortByLastUpdated(serviceRepoList);
                sortByName(serviceRepoList);
            }
        });
        RepositoryService.getAllStarredRepoList(username).then(
            (starRepoList) => {
                if (starRepoList) {
                    setStarSortList(starRepoList);
                }
            }
        );
    }, [username]);
    // TODO: save which way it was sorted
    useEffect(() => {
        if (debouncedSearch) {
            let tempRepoList = Array.from(lastUpdatedList);
            tempRepoList = tempRepoList.filter((repo) =>
                repo.repoName.includes(searchTerm)
            );
            // console.log(tempRepoList);
            setRepoList(tempRepoList);
        } else {
            setRepoList(lastUpdatedList);
        }
    }, [debouncedSearch]);
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
    function displayRepoList() {
        return repoList.map((repo) => {
            // Skip repositories that do not belong to user
            if (repo.id && repo.id.split("-")[0] !== username) {
                return null;
            }
            return (
                <RepositoryListing
                    username={username}
                    repo={repo}
                    starredRepoList={starSortList}
                />
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
