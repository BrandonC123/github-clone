import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import ProfileInformation from "./ProfileInformation";
import ProfileNav from "./ProfileNav";
import RepositoryService from "../services/RepositoryService";
import { subDays } from "date-fns";
import NotFound from "./NotFound";

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

const ViewProfile = () => {
    // TODO: Create option to pin repos
    const [display, setDisplay] = useState(null);
    const user = useContext(UserContext);
    const { username } = useParams();
    const [repoList, setRepoList] = useState([]);
    const [contributionArray, setContributionArray] = useState([]);
    const [totalContributionCount, setTotalContributionCount] = useState(0);
    const navigate = useNavigate();

    function displayRepos() {
        return repoList.map((repo) => {
            return (
                <div key={repo.repoName} className="profile-repo-card">
                    <div className="repo-content vertical-center">
                        <svg
                            fill="#6b737c"
                            height="24"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            width="17"
                            data-view-component="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 2.75A2.75 2.75 0 015.75 0h14.5a.75.75 0 01.75.75v20.5a.75.75 0 01-.75.75h-6a.75.75 0 010-1.5h5.25v-4H6A1.5 1.5 0 004.5 18v.75c0 .716.43 1.334 1.05 1.605a.75.75 0 01-.6 1.374A3.25 3.25 0 013 18.75v-16zM19.5 1.5V15H6c-.546 0-1.059.146-1.5.401V2.75c0-.69.56-1.25 1.25-1.25H19.5z"
                            ></path>
                            <path d="M7 18.25a.25.25 0 01.25-.25h5a.25.25 0 01.25.25v5.01a.25.25 0 01-.397.201l-2.206-1.604a.25.25 0 00-.294 0L7.397 23.46a.25.25 0 01-.397-.2v-5.01z"></path>
                        </svg>
                        <Link
                            to={`/${username}/${repo.repoName}`}
                            className="repo-list-link hover-underline"
                        >
                            {repo.repoName}
                        </Link>
                    </div>
                    <small className="secondary-text">JavaScript</small>
                </div>
            );
        });
    }
    useEffect(() => {
        RepositoryService.getRepoList(username).then((list) => {
            if (list) {
                // Only get 6 most recently created repos
                setRepoList(list.slice(-6));
                setDisplay(true);
            } else if (!list && !user) {
                // If list comes back null no user exists display not found
                setDisplay(false);
            } else {
                setDisplay(true);
            }
        });
        RepositoryService.getContributionArray(username).then((list) => {
            setContributionArray(list);
        });
    }, [username]);
    // Return hex code for shade of green based on contribution count
    function getShadeOfGreen(count) {
        // #0e4429 (4) #006d32 (6) #26a641 (8) #39d353 (10)
        if (count >= 10) {
            return "#39d353";
        } else if (count >= 8) {
            return "#26a641";
        } else if (count >= 5) {
            return "#006d32";
        } else if (count <= 4 && count >= 1) {
            return "#0e4429";
        } else {
            return "#161b22";
        }
    }
    const defaultGridSize = 15;
    function displayContributionsCalendar() {
        const columns = [];
        let count = 0;
        let tempTotalCount = 0;
        const currentDate = new Date();
        let tempContributionArray = contributionArray
            ? Array.from(contributionArray)
            : [];
        for (let i = 0; i < 52; i++) {
            for (let j = 6; j >= 0; j--) {
                let color = "#161b22";
                let contributionCount = 0;
                const date = subDays(currentDate, count);
                if (tempContributionArray.length !== 0) {
                    var tempContribution =
                        tempContributionArray[tempContributionArray.length - 1];
                    var compareDate = new Date(
                        tempContribution.day.seconds * 1000
                    ).toDateString();
                }
                if (compareDate === date.toDateString()) {
                    color = getShadeOfGreen(tempContribution.contributionCount);
                    // Splice entry out after displaying contribution
                    tempContributionArray.pop();
                    contributionCount = tempContribution.contributionCount;
                    tempTotalCount += contributionCount;
                }
                columns.push(
                    <rect
                        key={count}
                        x={i * (defaultGridSize + 2)}
                        y={j * (defaultGridSize + 2)}
                        width={defaultGridSize}
                        height={defaultGridSize}
                        style={{ fill: color }}
                        rx={"2"}
                    >
                        <title className="hover-text">
                            {`${contributionCount} contributions on ${
                                months[date.getMonth()]
                            } ${date.getDate()}, ${date.getFullYear()}`}
                        </title>
                    </rect>
                );
                count++;
            }
        }
        if (tempTotalCount !== totalContributionCount) {
            setTotalContributionCount(tempTotalCount);
        }
        return <>{columns}</>;
    }
    return (
        <>
            {display === false && <NotFound />}
            <div className="profile-page page">
                {display && (
                    <>
                        <ProfileInformation username={username} />
                        <main className="profile-repo-content">
                            <ProfileNav username={username} />
                            <div className="row space-between">
                                <span>Recent Repositories:</span>
                                <span className="secondary-text">
                                    Customize your pins
                                </span>
                            </div>
                            <div className="view-six-repo">
                                {displayRepos()}
                            </div>
                            <p>
                                {totalContributionCount} contributions in the
                                last year
                            </p>
                            <div className="contributions-container">
                                <svg
                                    className="contributions-svg"
                                    width={"100%"}
                                    height={(defaultGridSize + 2) * 7}
                                    transform={"scale(-1 1)"}
                                >
                                    {displayContributionsCalendar()}
                                </svg>
                                <div>
                                    <small className="vertical-center">
                                        Less{" "}
                                        <svg height={"15px"} width={"85"}>
                                            <rect
                                                x={0}
                                                y={0}
                                                width={15}
                                                height={15}
                                                style={{ fill: "#161b22" }}
                                                rx={"2"}
                                            />
                                            <rect
                                                x={17}
                                                y={0}
                                                width={15}
                                                height={15}
                                                style={{ fill: "#0e4429" }}
                                                rx={"2"}
                                            />
                                            <rect
                                                x={34}
                                                y={0}
                                                width={15}
                                                height={15}
                                                style={{ fill: "#006d32" }}
                                                rx={"2"}
                                            />
                                            <rect
                                                x={51}
                                                y={0}
                                                width={15}
                                                height={15}
                                                style={{ fill: "#26a641" }}
                                                rx={"2"}
                                            />
                                            <rect
                                                x={68}
                                                y={0}
                                                width={15}
                                                height={15}
                                                style={{ fill: "#39d353" }}
                                                rx={"2"}
                                            />
                                        </svg>
                                        More
                                    </small>
                                </div>
                            </div>
                        </main>
                    </>
                )}
            </div>
        </>
    );
};

export default ViewProfile;
