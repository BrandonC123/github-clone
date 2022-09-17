import { differenceInCalendarDays } from "date-fns";
import { updateProfile } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import db from "..";
import RepositoryService from "../services/RepositoryService";
import UserService from "../services/UserService";
import RepositoryCard from "./RepositoryCard";
import Sidebar from "./Sidebar";
import { UserContext } from "./UserContext";

const Home = () => {
    const user = useContext(UserContext);
    const [profileSrcList, setProfileSrcList] = useState([]);
    const [allRepoList, setAllRepoList] = useState([]);
    const [repoDisplayList, setRepoDisplayList] = useState([]);
    const [starredRepoList, setStarredRepoList] = useState([]);

    useEffect(() => {
        if (user) {
            initializeFollowRepos();
            onSnapshot(doc(db, "users", `${user.displayName}`), (doc) => {
                setStarredRepoList(doc.data().starredRepoList);
            });
        }
    }, [user]);
    async function initializeFollowRepos() {
        UserService.updateUserProfile(user.displayName, {
            profileImgSrc: user.photoURL,
        });
        const currentDate = new Date();
        // Get repositories of followed users
        const serviceFollowList = await UserService.getFollowList(
            user.displayName
        );
        let tempAllRepoList = [];
        let tempDisplayList = [];
        let tempProfileSrcList = [];
        // Get repositories created in last 30 days to display
        serviceFollowList.forEach(async function (username) {
            const userDetail = await UserService.getUserDetails(user, username);
            const serviceRepoList = userDetail.repoList;
            console.log(userDetail);
            tempAllRepoList.push({
                username,
                repoList: serviceRepoList,
            });
            serviceRepoList.forEach(async function (repo) {
                if (
                    differenceInCalendarDays(
                        currentDate,
                        new Date(repo.created.seconds * 1000)
                    ) <= 30
                ) {
                    tempDisplayList.push({
                        ...repo,
                        id: `${username}-${repo.repoName}`,
                    });
                    tempProfileSrcList.push({
                        lastUpdated: repo.lastUpdated,
                        profileImcSrc: userDetail.profileImgSrc,
                    });
                }
            });
            setProfileSrcList(sortByCreated(tempProfileSrcList));
            setRepoDisplayList(sortByCreated(tempDisplayList));
            setAllRepoList(tempAllRepoList);
        });
    }
    function getRepoList(username) {
        const index = allRepoList
            .map(({ username }) => username)
            .indexOf(username);
        return allRepoList[index].repoList;
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
        return repoDisplayList.map((repo, index) => {
            return (
                <RepositoryCard
                    key={repo.id}
                    profileImgSrc={profileSrcList[index].profileImcSrc}
                    repo={repo}
                    starredRepoList={starredRepoList}
                    getRepoList={getRepoList}
                />
            );
        });
    }
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
                            experience for enterprise users, we are adding
                            non-essential web cookies to certain subdomains that
                            specifically market our products to businesses. This
                            change is only on subdomains that reach enterprise
                            customers, and all other GitHub subdomains will
                            continue to operate as-is.
                        </small>
                        <button className="secondary-gray-btn btn">
                            Learn More
                        </button>
                    </div>
                    <div className="home-misc-text column">
                        <h4>Welcome to GitHub Global Campus!</h4>
                        <small>
                            Prepare for a career in tech by joining GitHub
                            Global Campus. Global Campus will help you get the
                            practical industry knowledge you need by giving you
                            access to industry tools, events, learning resources
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
};

export default Home;
