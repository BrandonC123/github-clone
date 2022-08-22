import { differenceInCalendarDays } from "date-fns";

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

const RepositoryCard = ({ repoDetails }) => {
    const username = repoDetails.username;
    const repoName = repoDetails.repoName;
    const currentDate = new Date();
    const created = new Date(repoDetails.created.seconds * 1000);
    const differnce = differenceInCalendarDays(currentDate, created);
    const lastUpdated = new Date(repoDetails.lastUpdated.seconds * 1000);

    console.log(repoDetails);
    return (
        <div className="repo-card-container border-divider">
            <p>
                {username} created a repository {username}/{repoName}
                <small className="secondary-text"> {differnce} days ago</small>
            </p>
            <div className="home-repo-card">
                <div>
                    <h4>
                        {username}/{repoName}
                    </h4>
                    <small className="secondary-text">
                        Updated {months[lastUpdated.getMonth()]}{" "}
                        {lastUpdated.getDate()}
                    </small>
                </div>
                <button className="secondary-gray-btn btn vertical-center">
                    <img src="/img/star-icon.svg" alt="Star icon for button" />
                    Star
                </button>
            </div>
        </div>
    );
};

export default RepositoryCard;
