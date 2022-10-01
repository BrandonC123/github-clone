import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import db from "..";
import RepositoryService from "../services/RepositoryService";
import ProfileInformation from "./ProfileInformation";
import ProfileNav from "./ProfileNav";
import RepositoryListing from "./RepositoryListing";
import { UserContext } from "./UserContext";

const ViewStarredRepositories = () => {
    const user = useContext(UserContext);
    const [unStarredRepo, setUnStarredRepo] = useState(null);
    const [unStarredText, setUnStarredText] = useState("");
    const [starredRepoList, setStarredRepoList] = useState([]);
    // Includes own repositories and followed users
    useEffect(() => {
        if (user) {
            const q = query(
                collection(db, "users"),
                where("username", "==", `${user.displayName}`)
            );
            let prevList = [];
            onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    const tempStarList = change.doc.data().starredRepoList;
                    if (change.type === "modified") {
                        toggleUnStar(prevList, tempStarList);
                    }
                    prevList = tempStarList;
                    setStarredRepoList(tempStarList);
                });
            });
        }
    }, [user]);
    function toggleUnStar(prevList, currentList) {
        if (currentList.length < prevList.length) {
            const tempPrev = prevList.map(({ id }) => id);
            const tempCur = currentList.map(({ id }) => id);
            let repoIndex;
            tempPrev.forEach((id, index) => {
                if (tempCur.indexOf(id) === -1) {
                    repoIndex = index;
                }
            });
            const tempUnStarred = prevList[repoIndex];
            setUnStarredRepo(tempUnStarred);
            setUnStarredText(`${tempUnStarred.id} has been unstarred.`);
            toggleSlideIn();
        }
    }
    // Toggle slide in animation and add pointer events to allow user to hover
    // over the message to keep it from disappearing
    function toggleSlideIn() {
        const message = document.querySelector(".view-star-message");
        message.classList.add("slidein");
        message.style.pointerEvents = "all";
        message.addEventListener("mouseleave", () => {
            message.classList.remove("slidein");
            message.style.pointerEvents = "none";
            setUnStarredText("");
        });
        setTimeout(() => {
            message.classList.remove("slidein");
        }, 5000);
    }

    async function undoStar() {
        const username = unStarredRepo.id.split("-")[0];
        const repoList = await RepositoryService.getRepoList(username);
        unStarredRepo.starCount--;
        RepositoryService.starRepo(
            user.displayName,
            unStarredRepo,
            starredRepoList,
            repoList
        );
    }
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
            const username = repo.id.split("-")[0];
            return (
                <RepositoryListing
                    key={repo.id}
                    username={username}
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
                <p className="view-star-message">
                    {unStarredText}{" "}
                    <button
                        onClick={() => {
                            undoStar();
                        }}
                        className="undo-button-link"
                    >
                        Undo?
                    </button>
                </p>
                <ProfileNav username={user.displayName} />
                <div className="row space-between">
                    <h2>Lists</h2>
                    <div style={{ marginBottom: "0.5em" }} className="divider">
                        <button className="secondary-gray-btn btn">Sort</button>
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
