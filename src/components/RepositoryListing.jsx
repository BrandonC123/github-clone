import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import RepositoryService from "../services/RepositoryService";
import StarButton from "./StarButton";

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
];

const RepositoryListing = ({
    username,
    repo,
    starredRepoList,
    inputRepoList,
}) => {
    const [repoTitle, setRepoTitle] = useState("");
    const date = new Date(repo.lastUpdated.seconds * 1000);

    useEffect(() => {
        if (repo.id) {
            setRepoTitle(`${repo.id.split("-")[0]}/${repo.repoName}`);
        } else {
            setRepoTitle(repo.repoName);
        }
    }, [repo]);
    return (
        <div
            key={repo.repoName}
            className="repo-list-container border-divider-dark row"
        >
            <div className="profile-repo-info column">
                <Link
                    to={`/${username}/${repo.repoName}`}
                    className="repo-list-link"
                >
                    {repoTitle}
                </Link>
                <small className="secondary-text">
                    Updated on {months[date.getMonth()]} {date.getDate()}
                </small>
            </div>
            <div className="profile-repo-actions">
                <StarButton
                    repo={{ ...repo, id: `${username}-${repo.repoName}` }}
                    starredRepoList={starredRepoList}
                />
            </div>
        </div>
    );
};

export default RepositoryListing;
