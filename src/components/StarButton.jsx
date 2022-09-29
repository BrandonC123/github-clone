import star from "../img/star-icon.svg";
import filledStar from "../img/filled-star-icon.svg";
import RepositoryService from "../services/RepositoryService";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { useParams } from "react-router-dom";
import { useState } from "react";

const StarButton = ({ repo, starredRepoList, inputRepoList }) => {
    const user = useContext(UserContext);
    const [repoList, setRepoList] = useState(null);
    const { repoName } = useParams();
    const username = repo.id.split("-")[0];
    const id = repo.id ? repo.id : `${username}-${repo.repoName}`;
    const [btnText, setBtnText] = useState("");
    const starred = starredRepoList
        .map(({ id }) => {
            return id;
        })
        .includes(id);

    useEffect(() => {
        let text = starred ? "Starred" : "Star";
        setBtnText(text);
        if (repoName) {
            // Display star count inside button if viewing individual repository
            setBtnText(text + ` ${repo.starCount}`);
        }
    }, [repo, starredRepoList]);
    async function getRepoList() {
        // Only get repoList once and if it is not passed in props
        if (!inputRepoList && !repoList) {
            return await RepositoryService.getRepoList(username);
        } else if (inputRepoList) {
            return inputRepoList;
        } else {
            return repoList;
        }
    }

    function toggleStarBtn(btn, add) {
        if (add) {
            btn.firstChild.src = filledStar;
        } else {
            btn.firstChild.src = star;
        }
    }
    function delayButtonClick(btn) {
        btn.style.pointerEvents = "none";
        setTimeout(() => {
            btn.style.removeProperty("pointer-events");
        }, 500);
    }
    function displayStarBtn() {
        const starSrc = starred ? filledStar : star;
        return (
            <button
                onClick={async function (e) {
                    // Make sure target is the button not img/span
                    let currentTarget = e.currentTarget;
                    const btn =
                        e.target === currentTarget
                            ? e.target
                            : e.target.parentNode;
                    delayButtonClick(btn);
                    const repoList = await getRepoList();
                    RepositoryService.starRepo(
                        user.displayName,
                        repo,
                        starredRepoList,
                        repoList
                    ).then((add) => {
                        toggleStarBtn(btn, add);
                    });
                }}
                disabled={user ? false : true}
                className="secondary-gray-btn btn vertical-center"
            >
                <img src={starSrc} alt="Star icon" />
                <span>{btnText}</span>
            </button>
        );
    }
    return <>{displayStarBtn()}</>;
};

export default StarButton;
