import { differenceInCalendarDays } from "date-fns";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import RepositoryService from "../services/RepositoryService";
import UserService from "../services/UserService";
import RepositoryCard from "./RepositoryCard";
import Sidebar from "./Sidebar";
import { UserContext } from "./UserContext";

const Home = () => {
    const user = useContext(UserContext);
    const [followList, setFollowList] = useState([]);
    const [repoDisplayList, setDisplayRepoList] = useState([]);
    const [starredRepoList, setStarredRepoList] = useState([]);

    useEffect(() => {
        if (user) {
            initializeFollowRepos();
            // TODO: figure out way to store other user's repo when starred
            // RepositoryService.getRepoList(username).then((list) => {
            //     setRepoList(list);
            // });
            RepositoryService.getAllStarredRepoList(user.displayName).then(
                (list) => {
                    setStarredRepoList(list);
                }
            );
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
                        new Date(repo.created.seconds * 1000)
                    ) <= 10
                ) {
                    tempDisplayList.push({
                        ...repo,
                        id: `${username}-${repo.repoName}`,
                    });
                    setDisplayRepoList(sortByCreated(tempDisplayList));
                }
            });
        });
    }
    function sortByCreated(list) {
        let tempLastCreated = Array.from(list);
        tempLastCreated
            .sort((repo1, repo2) => {
                return repo1.lastUpdated - repo2.lastUpdated;
            })
            .reverse();
        return tempLastCreated;
    }
    function displayFollowedRepos() {
        return repoDisplayList.map((repo) => {
            return <RepositoryCard repo={repo} starredRepoList={starredRepoList} />;
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
            // TODO: home page for non-signed in user
            return <div>no user</div>;
        }
    }
    return <>{displayHome()}</>;
};

export default Home;
