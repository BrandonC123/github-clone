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
    const [btnText, setBtnText] = useState("");

    async function getUserDetail() {
        if (user) {
            // If user has not made changes to profile previously
            // user details would not be in database
            const ref = doc(db, "users", `${username}`);
            const userDetailDb = await getDoc(ref);
            if (userDetailDb.exists()) {
                setUserDetails(userDetailDb.data());
            } else {
                const emptyUser = {
                    name: "",
                    bio: "",
                    company: "",
                    location: "",
                    email: "",
                    website: "",
                    twitterUsername: "",
                    repoList: [],
                    followList: [],
                };
                setUserDetails(emptyUser);
                await setDoc(doc(db, "users", `${username}`), emptyUser);
            }
        }
    }
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
                        onClick={() => {
                            UserService.followOrUnfollowUser(
                                username,
                                followList
                            );
                        }}
                        className="btn"
                    >
                        {followList.includes(username) ? "Unfollow" : "Follow"}
                    </button>
                </>
            );
        }
    }
    useEffect(() => {
        getUserDetail();
    }, [user]);

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
