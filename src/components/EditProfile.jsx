import { getDatabase, ref, set } from "firebase/database";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";

const EditProfile = ({ display, toggleForm }) => {
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [twitterUsername, setTwitterUsername] = useState("");

    const user = useContext(UserContext);
    const db = getDatabase();
    function writeUserData() {
        set(ref(db, "users/" + user.uid), {
            name: name,
            bio: bio,
            company: company,
            location: location,
            email: email,
            website: website,
            twitterUsername: twitterUsername,
        });
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
                        value={name}
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
                        value={bio}
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
                        value={company}
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
                        value={location}
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
                        value={email}
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
                        value={website}
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
                        value={twitterUsername}
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
