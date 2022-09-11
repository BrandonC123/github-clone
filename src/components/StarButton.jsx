import star from "../img/star-icon.svg";
import filledStar from "../img/filled-star-icon.svg";
import RepositoryService from "../services/RepositoryService";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { useParams } from "react-router-dom";
import { useState } from "react";

const StarButton = ({ repo, starredRepoList, repoList }) => {
    const user = useContext(UserContext);
    const username = repo.id.split("-")[0];
    const { repoName } = useParams();
    const id = repo.id ? repo.id : `${username}-${repo.repoName}`;
    const [btnText, setBtnText] = useState("");
    const starred = starredRepoList
        .map(({ id }) => {
            return id;
        })
        .includes(id);

    useEffect(() => {
        console.log(repo);
        let text = starred ? "Starred" : "Star";
        setBtnText(text);
        if (repoName) {
            // Display star count inside button if viewing individual repository
            setBtnText(text + ` ${repo.starCount}`);
        }
    }, [repo]);
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
        // TODO: disable button if no user is signed in
        return (
            <button
                onClick={(e) => {
                    let currentTarget = e.currentTarget;
                    const btn =
                        e.target === currentTarget
                            ? e.target
                            : e.target.parentNode;
                    delayButtonClick(btn);

                    RepositoryService.starRepo(
                        user.displayName,
                        repo,
                        starredRepoList,
                        repoList
                    ).then((add) => {
                        // Make sure target is the button not img/span
                        toggleStarBtn(btn, add);
                    });
                }}
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
