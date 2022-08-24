import { useContext, useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import { UserContext } from "./UserContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import db from "..";
import UserService from "../services/UserService";

const ProfileInformation = ({ username }) => {
    const user = useContext(UserContext);
    const [userDetails, setUserDetails] = useState("");
    const [followList, setFollowList] = useState([]);

    useEffect(() => {
        UserService.getUserDetails(user, username).then((detail) => {
            setUserDetails(detail);
        });
    }, [user]);
    function displayEditOrFollow() {
        if (user && user.displayName === username) {
            return (
                <>
                    <button
                        onClick={() => {
                            toggleForm();
                        }}
                        className="edit-profile-btn btn"
                    >
                        Edit Profile
                    </button>
                    <EditProfile
                        display={display}
                        toggleForm={toggleForm}
                        userDetails={userDetails}
                        setUserDetails={setUserDetails}
                    />
                </>
            );
        } else if (user) {
            UserService.getFollowList(user.displayName).then((data) => {
                if (data.length !== followList.length) {
                    setFollowList(data);
                }
            });
            return (
                <>
                    <button
                        onClick={(e) => {
                            if (
                                e.target.textContent.toLowerCase() === "follow"
                            ) {
                                UserService.followUser(
                                    user.displayName,
                                    username,
                                    followList
                                );
                                e.target.textContent = "Unfollow";
                            } else {
                                UserService.unfollowUser(
                                    user.displayName,
                                    username,
                                    followList
                                );
                                e.target.textContent = "Follow";
                            }
                        }}
                        className="btn"
                    >
                        {followList.includes(username) ? "Unfollow" : "Follow"}
                    </button>
                </>
            );
        }
    }

    const [display, setDisplay] = useState(false);
    function toggleForm() {
        document.querySelector(".edit-profile-btn").classList.toggle("hide");
        document.querySelector(".profile-information").classList.toggle("hide");
        setDisplay(!display);
    }

    return (
        <div className="profile-information-column">
            <img src="/img/default-profile-pic.png" alt="" />
            {displayEditOrFollow()}
            <div className="profile-information">
                <h1>{userDetails.name}</h1>
                <h2>{username}</h2>
                <p>{userDetails.bio}</p>
                <p>{userDetails.company}</p>
                <p>{userDetails.location}</p>
                <p>{userDetails.email}</p>
                <p>{userDetails.website}</p>
                <p>{userDetails.twitterUsername}</p>
            </div>
        </div>
    );
};

export default ProfileInformation;
