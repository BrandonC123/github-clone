import { differenceInCalendarDays } from "date-fns";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import RepositoryService from "../services/RepositoryService";
import UserService from "../services/UserService";
import Sidebar from "./Sidebar";
import { UserContext } from "./UserContext";

const Home = ({ loading }) => {
    const user = useContext(UserContext);
    const [followList, setFollowList] = useState([]);
    const [repoDisplayList, setDisplayRepoList] = useState([]);

    useEffect(() => {
        if (user) {
            initializeFollowRepos();
        }
    }, [user]);
    async function initializeFollowRepos() {
        const currentDate = new Date();
        // Get recent repositories of followed users
        const serviceFollowList = await UserService.getFollowList(
            user.displayName
        );
        setFollowList(serviceFollowList);
        let tempDisplayList = [];
        serviceFollowList.forEach(async function (username) {
            const serviceRepoList = await RepositoryService.getRepoList(
                username
            );
            serviceRepoList.forEach((repo) => {
                if (
                    differenceInCalendarDays(
                        currentDate,
                        new Date(repo.lastUpdated.seconds * 1000)
                    ) <= 10
                ) {
                    tempDisplayList.push({ ...repo, username });
                    setDisplayRepoList(tempDisplayList);
                }
            });
        });
    }
    function displayFollowedRepos() {
        return repoDisplayList.map((repo) => {
            return (
                <p>
                    {repo.username} {repo.repoName}
                </p>
            );
        });
    }
    function displayHome() {
        if (user) {
            return (
                <div className="home-page row">
                    <Sidebar />
                    <section className="home-page-section two-column">
                        <div className="home-page-content">
                            Following
                            <div className="followed-repos-container">
                                {displayFollowedRepos()}
                            </div>
                        </div>
                        <div className="home-page-misc">
                            <div className="home-misc-text column">
                                <h4>Adding web cookies for enterprise users</h4>
                                <small>
                                    In order to better reach and improve the web
                                    experience for enterprise users, we are
                                    adding non-essential web cookies to certain
                                    subdomains that specifically market our
                                    products to businesses. This change is only
                                    on subdomains that reach enterprise
                                    customers, and all other GitHub subdomains
                                    will continue to operate as-is.
                                </small>
                                <button className="secondary-gray-btn btn">
                                    Learn More
                                </button>
                            </div>
                            <div className="home-misc-text column">
                                <h4>Welcome to GitHub Global Campus!</h4>
                                <small>
                                    Prepare for a career in tech by joining
                                    GitHub Global Campus. Global Campus will
                                    help you get the practical industry
                                    knowledge you need by giving you access to
                                    industry tools, events, learning resources
                                    and a growing student community.
                                </small>
                                <button className="secondary-gray-btn btn">
                                    Go to Global Campus
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            );
        } else {
            return <div>no user</div>;
        }
    }
    return !loading && <>{displayHome()}</>;
};

export default Home;
