import { getDatabase, ref, set } from "firebase/database";
import { doc, setDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import db from "..";

const EditProfile = ({ display, toggleForm, userDetails, setUserDetails }) => {
    const [name, setName] = useState();
    const [bio, setBio] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [twitterUsername, setTwitterUsername] = useState("");
    useEffect(() => {
        console.log(userDetails);
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
    async function writeUserData() {
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
        await setDoc(doc(db, "users", user.uid), updatedUserObject);
    }
    return (
        display && (
            <form className="edit-profile-form column">
                <li className="edit-profile-input column">
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
                </li>
                <li className="edit-profile-input column">
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
                </li>
                <li className="edit-profile-input">
                    <input
                        onChange={(e) => {
                            setCompany(e.target.value);
                        }}
                        defaultValue={company}
                        type="text"
                        placeholder="Company"
                        id="company"
                    />
                </li>
                <li className="edit-profile-input">
                    <input
                        onChange={(e) => {
                            setLocation(e.target.value);
                        }}
                        defaultValue={location}
                        type="text"
                        placeholder="Location"
                        id="location"
                    />
                </li>
                <li className="edit-profile-input">
                    <input
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        defaultValue={email}
                        type="email"
                        placeholder="Email"
                        id="email"
                    />
                </li>
                <li className="edit-profile-input">
                    <input
                        onChange={(e) => {
                            setWebsite(e.target.value);
                        }}
                        defaultValue={website}
                        type="url"
                        placeholder="Website"
                        id="website"
                    />
                </li>
                <li className="edit-profile-input">
                    <input
                        onChange={(e) => {
                            setTwitterUsername(e.target.value);
                        }}
                        defaultValue={twitterUsername}
                        type="text"
                        placeholder="Twitter username"
                        id="twitter-username"
                    />
                </li>
                <div className="edit-profile-action">
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
                    >
                        Cancel
                    </button>
                </div>
            </form>
        )
    );
};

export default EditProfile;
