import { differenceInCalendarDays } from "date-fns";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import RepositoryService from "../services/RepositoryService";
import UserService from "../services/UserService";
import StarButton from "./StarButton";

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const RepositoryCard = ({
    profileImgSrc,
    repo,
    starredRepoList,
    getRepoList,
}) => {
    const username = repo.id.split("-")[0];
    const repoName = repo.repoName;
    const repoList = getRepoList(username);
    const currentDate = new Date();
    const created = new Date(repo.created.seconds * 1000);
    const difference = differenceInCalendarDays(currentDate, created);
    const lastUpdated = new Date(repo.lastUpdated.seconds * 1000);

    function getTimeDifferenceString() {
        if (difference === 0) {
            return "today";
        } else if (difference === 1) {
            return "a day ago";
        } else {
            return `${difference} days ago`;
        }
    }
    return (
        <div className="home-repo-card-container border-divider-dark">
            <p className="vertical-center">
                <img
                    src={profileImgSrc}
                    alt="Profile icon"
                    className="round-profile-img profile-icon"
                />
                <span>
                    <Link to={`/${username}`} className="home-repo-card-link">
                        {username}
                    </Link>{" "}
                    created a repository{" "}
                    <Link
                        to={`/${username}/${repoName}`}
                        className="home-repo-card-link"
                    >
                        {username}/{repoName}
                    </Link>{" "}
                    <small className="secondary-text">
                        {getTimeDifferenceString()}
                    </small>
                </span>
            </p>
            <div className="home-repo-card">
                <div>
                    <h4>
                        <Link
                            to={`/${username}/${repoName}`}
                            className="home-repo-card-link"
                        >
                            {username}/{repoName}
                        </Link>
                    </h4>
                    <small className="secondary-text">
                        Updated {months[lastUpdated.getMonth()]}
                        {lastUpdated.getDate()}
                    </small>
                </div>
                <StarButton
                    repo={repo}
                    starredRepoList={starredRepoList}
                    inputRepoList={repoList}
                />
            </div>
        </div>
    );
};

export default RepositoryCard;
