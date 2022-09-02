import star from "../img/star-icon.svg";
import filledStar from "../img/filled-star-icon.svg";
import RepositoryService from "../services/RepositoryService";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const StarButton = ({ repo, repoList }) => {
    const user = useContext(UserContext);
    const starred = repo.starred;
    function toggleStarBtn(btn) {
        let btnText = btn.lastChild.textContent;
        if (btnText === "Star") {
            btn.lastChild.textContent = "Starred";
            btn.firstChild.src = filledStar;
        } else {
            btn.lastChild.textContent = "Star";
            btn.firstChild.src = star;
        }
    }
    function displayStarBtn() {
        const starSrc = starred ? filledStar : star;
        const btnText = starred ? "Starred" : "Star";
        return (
            <button
                onClick={(e) => {
                    // RepositoryService.starRepo(
                    //     user.displayName,
                    //     repo.repoName,
                    //     repoList
                    // );
                    // Make sure target is the button not img/span
                    const btn =
                        e.target === e.currentTarget
                            ? e.target
                            : e.target.parentNode;
                    toggleStarBtn(btn);
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
