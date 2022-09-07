import star from "../img/star-icon.svg";
import filledStar from "../img/filled-star-icon.svg";
import RepositoryService from "../services/RepositoryService";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { useParams } from "react-router-dom";

const StarButton = ({ repo, starredRepoList, repoList }) => {
    const user = useContext(UserContext);
    const { username } = useParams();
    const { repoName } = useParams();
    const id = repo.id ? repo.id : `${user.displayName}-${repo.repoName}`;
    const starred = starredRepoList
        .map(({ id }) => {
            return id;
        })
        .includes(id);
    function toggleStarBtn(btn, add) {
        let btnText = add ? "Starred" : "Star";
        if (repoName) {
            // Display star count inside button if viewing individual repository
            btnText += ` ${repo.starCount}`;
        }

        if (add) {
            // TODO: only display star count on view repo route
            btn.lastChild.textContent = btnText;
            btn.firstChild.src = filledStar;
        } else {
            btn.lastChild.textContent = btnText;
            btn.firstChild.src = star;
        }
    }
    function displayStarBtn() {
        const starSrc = starred ? filledStar : star;
        let btnText = starred ? "Starred" : "Star";
        if (repoName) {
            // Display star count inside button if viewing individual repository
            btnText += ` ${repo.starCount}`;
        }
        // TODO: star count does not work with other user's repo  ??
        return (
            <button
                onClick={(e) => {
                    let currentTarget = e.currentTarget;
                    RepositoryService.starRepo(
                        user.displayName,
                        repo,
                        starredRepoList
                    ).then((add) => {
                        // Make sure target is the button not img/span
                        const btn =
                            e.target === currentTarget
                                ? e.target
                                : e.target.parentNode;
                        toggleStarBtn(btn, add);
                        RepositoryService.updateStarCount(
                            username,
                            add,
                            repo,
                            repoList
                        );
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
