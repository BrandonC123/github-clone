import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import ProfileInformation from "./ProfileInformation";
import ProfileNav from "./ProfileNav";
import RepositoryService from "../services/RepositoryService";
import { addDays, subDays } from "date-fns";

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
    const user = useContext(UserContext);
    const { username } = useParams();
    const [repoList, setRepoList] = useState([]);

    function displayRepos() {
        return repoList.map((repo) => {
            return (
                <div key={repo.repoName} className="profile-repo-card">
                    <div className="repo-content row">
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
                            className="repo-list-link"
                        >
                            {repo.repoName}
                        </Link>
                        <button>drag</button>
                    </div>
                    javascript
                </div>
            );
        });
    }
    useEffect(() => {
        RepositoryService.getRepoList(username).then((list) => {
            if (list) {
                setRepoList(list);
            }
        });
    }, [user]);
    function displayContributionsCalendar() {
        const columns = [];
        let count = 0;
        const defaultSize = 15;
        const currentDate = new Date();
        for (let i = 0; i < 56; i++) {
            for (let j = 6; j >= 0; j--) {
                let date = subDays(currentDate, count);
                columns.push(
                    <rect
                        key={count}
                        x={i * (defaultSize + 2)}
                        y={j * (defaultSize + 2)}
                        width={defaultSize}
                        height={defaultSize}
                        style={{ fill: "#161b22" }}
                        rx={"2"}
                    >
                        <title className="hover-text">
                            {`${
                                months[date.getMonth()]
                            } ${date.getDate()}, ${date.getFullYear()}`}
                        </title>
                    </rect>
                );
                count++;
            }
        }
        return <>{columns}</>;
    }

    return (
        <div className="profile-page page">
            <ProfileInformation username={username} />
            <main className="profile-repo-content">
                <ProfileNav username={username} />
                <div className="view-six-repo">{displayRepos()}</div>
                <div className="contributions-container">
                    <svg
                        className="contributions-svg"
                        width={"100%"}
                        height={"100%"}
                        overflow={"scroll"}
                        transform={"scale(-1 1)"}
                    >
                        {displayContributionsCalendar()}
                    </svg>
                </div>
            </main>
        </div>
    );
};

export default ViewProfile;
