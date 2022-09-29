import { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import ProfileInformation from "./ProfileInformation";
import ProfileNav from "./ProfileNav";
import RepositoryService from "../services/RepositoryService";
import ViewRepositoryListDropdown from "./ViewRepositoryListDropdown";
import useDebounce from "./useDebounce";
import RepositoryListing from "./RepositoryListing";
import db from "..";

const ViewRepositoryList = () => {
    const user = useContext(UserContext);
    const navigate = useNavigate();
    const { username } = useParams();
    const [sortType, setSortType] = useState("");
    // Repo list that is updated to tell webpage to render which sorted array
    const [repoList, setRepoList] = useState([]);
    const [lastUpdatedList, setLastUpdatedList] = useState([]);
    const [nameSortList, setNameSortList] = useState([]);
    const [starSortList, setStarSortList] = useState([]);
    const [starredRepoList, setStarredRepoList] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    // Debounce search to make searching less intensive
    const debouncedSearch = useDebounce(searchTerm, 500);

    useEffect(() => {
        // Use username from Params to allow for viewing other user's repos
        RepositoryService.getRepoList(username).then((serviceRepoList) => {
            if (serviceRepoList) {
                updateAllLists(serviceRepoList);
            }
        });
        if (user) {
            onSnapshot(doc(db, "users", `${user.displayName}`), (doc) => {
                setStarredRepoList(doc.data().starredRepoList);
                updateAllLists(doc.data().repoList);
            });
        }
    }, [username]);
    // TODO: save which way it was sorted
    useEffect(() => {
        if (debouncedSearch) {
            let tempRepoList = Array.from(lastUpdatedList);
            tempRepoList = tempRepoList.filter((repo) =>
                repo.repoName.includes(searchTerm)
            );
            setRepoList(tempRepoList);
        } else {
            setRepoList(lastUpdatedList);
        }
    }, [debouncedSearch]);
    function updateAllLists(list) {
        sortByLastUpdated(list);
        sortByName(list);
        sortByStar(list);
    }
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
    function sortByStar(repoList) {
        let tempStarSort = Array.from(repoList);
        tempStarSort
            .sort((repo1, repo2) => {
                return repo1.starCount - repo2.starCount;
            })
            .reverse();
        setStarSortList(tempStarSort);
    }
    // Update repo list to display current sort by selection
    function toggleRepoList(sortType) {
        switch (sortType.toLowerCase()) {
            case "last updated":
                setSortType("last updated");
                setRepoList(lastUpdatedList);
                break;
            case "name":
                setSortType("name");
                setRepoList(nameSortList);
                break;
            case "stars":
                setSortType("stars");
                setRepoList(starSortList);
                break;
            default:
                return;
        }
    }
    function displayRepoList() {
        return repoList.map((repo) => {
            return (
                <RepositoryListing
                    key={repo.repoName}
                    username={username}
                    repo={repo}
                    starredRepoList={starredRepoList}
                    inputRepoList={lastUpdatedList}
                />
            );
        });
    }
    return (
        <div className="profile-page page">
            <ProfileInformation username={username} />
            <main className="profile-repo-list">
                <ProfileNav username={username} />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.5em",
                    }}
                >
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
                    {user && user.displayName === username && (
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
