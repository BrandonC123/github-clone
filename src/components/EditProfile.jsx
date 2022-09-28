import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import UserService from "../services/UserService";

const EditProfile = ({ display, toggleForm, userDetails, setUserDetails }) => {
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [twitterUsername, setTwitterUsername] = useState("");
    useEffect(() => {
        if (userDetails) {
            setName(userDetails.name);
            setBio(userDetails.bio);
            setCompany(userDetails.company);
            setLocation(userDetails.location);
            setEmail(userDetails.email);
            setWebsite(userDetails.website);
            setTwitterUsername(userDetails.twitterUsername);
        }
    }, [userDetails]);

    const user = useContext(UserContext);
    function writeUserData() {
        const updatedUserObject = {
            name: name,
            bio: bio,
            company: company,
            location: location,
            email: email,
            website: website,
            twitterUsername: twitterUsername,
        };
        setUserDetails(updatedUserObject);
        UserService.updateUserProfile(user.displayName, updatedUserObject);
    }
    return (
        display && (
            <form className="edit-profile-form column">
                <div className="edit-profile-input">
                    <label htmlFor="full-name">Name</label>
                    <input
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        defaultValue={name}
                        type="text"
                        placeholder="Name"
                        id="full-name"
                    />
                </div>
                <div className="edit-profile-input">
                    <label htmlFor="profile-bio">Bio</label>
                    <textarea
                        onChange={(e) => {
                            setBio(e.target.value);
                        }}
                        defaultValue={bio}
                        name=""
                        cols="30"
                        rows="5"
                        placeholder="Add a bio"
                        id="profile-bio"
                    ></textarea>
                </div>
                <div className="edit-profile-input horizontal-form-group horizontal-form-group">
                    <svg
                        fill="#6b737c"
                        aria-hidden="true"
                        height="16"
                        viewBox="0 0 16 16"
                        version="1.1"
                        width="16"
                        data-view-component="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M1.5 14.25c0 .138.112.25.25.25H4v-1.25a.75.75 0 01.75-.75h2.5a.75.75 0 01.75.75v1.25h2.25a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25h-8.5a.25.25 0 00-.25.25v12.5zM1.75 16A1.75 1.75 0 010 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 00.25-.25V8.285a.25.25 0 00-.111-.208l-1.055-.703a.75.75 0 11.832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0114.25 16h-3.5a.75.75 0 01-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 01-.75-.75V14h-1v1.25a.75.75 0 01-.75.75h-3zM3 3.75A.75.75 0 013.75 3h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 3.75zM3.75 6a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM3 9.75A.75.75 0 013.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 9.75zM7.75 9a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM7 6.75A.75.75 0 017.75 6h.5a.75.75 0 010 1.5h-.5A.75.75 0 017 6.75zM7.75 3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z"
                        ></path>
                    </svg>
                    <input
                        onChange={(e) => {
                            setCompany(e.target.value);
                        }}
                        defaultValue={company}
                        type="text"
                        placeholder="Company"
                        id="company"
                    />
                </div>
                <div className="edit-profile-input horizontal-form-group">
                    <svg
                        fill="#6b737c"
                        aria-hidden="true"
                        height="16"
                        viewBox="0 0 16 16"
                        version="1.1"
                        width="16"
                        data-view-component="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z"
                        ></path>
                    </svg>
                    <input
                        onChange={(e) => {
                            setLocation(e.target.value);
                        }}
                        defaultValue={location}
                        type="text"
                        placeholder="Location"
                        id="location"
                    />
                </div>
                <div className="edit-profile-input horizontal-form-group">
                    <svg
                        fill="#6b737c"
                        aria-hidden="true"
                        height="16"
                        viewBox="0 0 16 16"
                        version="1.1"
                        width="16"
                        data-view-component="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M1.75 2A1.75 1.75 0 000 3.75v.736a.75.75 0 000 .027v7.737C0 13.216.784 14 1.75 14h12.5A1.75 1.75 0 0016 12.25v-8.5A1.75 1.75 0 0014.25 2H1.75zM14.5 4.07v-.32a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25v.32L8 7.88l6.5-3.81zm-13 1.74v6.441c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V5.809L8.38 9.397a.75.75 0 01-.76 0L1.5 5.809z"
                        ></path>
                    </svg>
                    <input
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        defaultValue={email}
                        type="email"
                        placeholder="Email"
                        id="email"
                    />
                </div>
                <div className="edit-profile-input horizontal-form-group">
                    <svg
                        fill="#6b737c"
                        aria-hidden="true"
                        height="16"
                        viewBox="0 0 16 16"
                        version="1.1"
                        width="16"
                        data-view-component="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"
                        ></path>
                    </svg>
                    <input
                        onChange={(e) => {
                            setWebsite(e.target.value);
                        }}
                        defaultValue={website}
                        type="url"
                        placeholder="Website"
                        id="website"
                    />
                </div>
                <div className="edit-profile-input horizontal-form-group">
                    <svg
                        fill="#6b737c"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 273.5 222.3"
                        height="16"
                        width="16"
                    >
                        <title>Twitter</title>
                        <path
                            d="M273.5 26.3a109.77 109.77 0 0 1-32.2 8.8 56.07 56.07 0 0 0 24.7-31 113.39 113.39 0 0 1-35.7 13.6 56.1 56.1 0 0 0-97 38.4 54 54 0 0 0 1.5 12.8A159.68 159.68 0 0 1 19.1 10.3a56.12 56.12 0 0 0 17.4 74.9 56.06 56.06 0 0 1-25.4-7v.7a56.11 56.11 0 0 0 45 55 55.65 55.65 0 0 1-14.8 2 62.39 62.39 0 0 1-10.6-1 56.24 56.24 0 0 0 52.4 39 112.87 112.87 0 0 1-69.7 24 119 119 0 0 1-13.4-.8 158.83 158.83 0 0 0 86 25.2c103.2 0 159.6-85.5 159.6-159.6 0-2.4-.1-4.9-.2-7.3a114.25 114.25 0 0 0 28.1-29.1"
                            fill="currentColor"
                        ></path>
                    </svg>
                    <input
                        onChange={(e) => {
                            setTwitterUsername(e.target.value);
                        }}
                        defaultValue={twitterUsername}
                        type="text"
                        placeholder="Twitter username"
                        id="twitter-username"
                    />
                </div>
                <div className="edit-profile-action divider">
                    <button
                        onClick={() => {
                            writeUserData();
                            toggleForm();
                        }}
                        type="button"
                        className="green-action-btn btn"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => {
                            toggleForm();
                        }}
                        type="button"
                        className="secondary-gray-btn btn"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        )
    );
};

export default EditProfile;
