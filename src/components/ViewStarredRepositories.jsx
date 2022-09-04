import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import RepositoryService from "../services/RepositoryService";
import ProfileInformation from "./ProfileInformation";
import ProfileNav from "./ProfileNav";
import RepositoryListing from "./RepositoryListing";
import { UserContext } from "./UserContext";

const ViewStarredRepositories = ({}) => {
    const user = useContext(UserContext);
    const [starredRepoList, setStarredRepoList] = useState([]);
    // Includes own repositories and followed users
    useEffect(() => {
        if (user) {
            RepositoryService.getAllStarredRepoList(user.displayName).then(
                (repos) => {
                    setStarredRepoList(repos);
                    console.log(repos);
                }
            );
        }
    }, [user]);
    // TODO: View stars page
    function displayList() {
        // if list === 0
        return (
            <>
                <img
                    src={require("../img/star-icon.svg").default}
                    width={25}
                    alt="Star icon"
                />
                <h3>Create your first list</h3>
                <small>
                    Lists make it easier to organize and curate repositories
                    that you have starred.{" "}
                    <summary>Create your first list</summary>
                </small>
            </>
        );
    }
    function displayStarredRepos() {
        return starredRepoList.map((repo) => {
            return (
                <RepositoryListing
                    repo={repo}
                    starredRepoList={starredRepoList}
                />
            );
        });
    }
    return (
        <div className="view-star-page page two-column">
            <ProfileInformation username={user.displayName} />
            <main className="view-star-content">
                <ProfileNav username={user.displayName} />
                <div className="row space-between">
                    <h2>Lists</h2>
                    <div className="divider">
                        <button className="btn">Sort</button>
                        <button className="green-action-btn btn">
                            Create List
                        </button>
                    </div>
                </div>
                <div className="star-list-container">{displayList()}</div>
                <div className="star-repos">{displayStarredRepos()}</div>
            </main>
        </div>
    );
};

export default ViewStarredRepositories;
