import { useContext } from "react";
import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import AccountSettingsSidebar from "./AccountSettingsSidebar";
import ProfileImageEditor from "./ProfileImageEditor";
import { UserContext } from "./UserContext";

const ProfileSettings = ({}) => {
    const user = useContext(UserContext);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [twitterUsername, setTwitterUsername] = useState("");
    const [profileImgSrc, setProfileImgSrc] = useState("");
    const [newProfile, setNewProfile] = useState("");

    useEffect(() => {
        if (user) {
            UserService.getUserDetails(user, user.displayName).then(
                (detail) => {
                    setName(detail.name);
                    setBio(detail.bio);
                    setCompany(detail.company);
                    setLocation(detail.location);
                    setEmail(detail.email);
                    setWebsite(detail.website);
                    setTwitterUsername(detail.twitterUsername);
                    setProfileImgSrc(detail.profileImgSrc);
                }
            );
        }
    }, [user]);
    return (
        <div className="profile-settings-page row">
            <AccountSettingsSidebar />
            <section className="profile-settings-content">
                <div className="message-content">
                    Profile updated refresh to see changes
                </div>
                <div>
                    <h1>Public Profile</h1>
                    <form
                        onSubmit={() => {
                            UserService.updateUserProfile(user.displayName, {
                                name: name,
                                bio: bio,
                                company: company,
                                location: location,
                                email: email,
                                website: website,
                                twitterUsername: twitterUsername,
                            });
                        }}
                        className="column"
                    >
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                defaultValue={name}
                                type="text"
                                name="name"
                                id="name"
                                className="input"
                            />
                            <small className="secondary-text">
                                Your name may appear around GitHub where you
                                contribute or are mentioned. You can remove it
                                at any time.
                            </small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="public-email">Public Email</label>
                            <select
                                name="public-email"
                                id="public-email"
                            ></select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="bio">Bio</label>
                            <textarea
                                onChange={(e) => {
                                    setBio(e.target.value);
                                }}
                                defaultValue={bio}
                                name="bio"
                                id="bio"
                                cols="30"
                                rows="5"
                                placeholder="Tell us a little bit about yourself"
                                className="input"
                            ></textarea>
                            <small className="secondary-text">
                                You can @mention other users and organizations
                                to link to them.
                            </small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="URL">URL</label>
                            <input
                                onChange={(e) => {
                                    setWebsite(e.target.value);
                                }}
                                defaultValue={website}
                                type="text"
                                name="url"
                                id="url"
                                className="input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="twitter-username">
                                Twitter username
                            </label>
                            <input
                                onChange={(e) => {
                                    setTwitterUsername(e.target.value);
                                }}
                                defaultValue={twitterUsername}
                                type="text"
                                name="twitter-username"
                                id="twitter-username"
                                className="input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="company">Company</label>
                            <input
                                onChange={(e) => {
                                    setCompany(e.target.value);
                                }}
                                defaultValue={company}
                                type="text"
                                name="company"
                                id="company"
                                className="input"
                            />
                            <small className="secondary-text">
                                You can @mention your company’s GitHub
                                organization to link it.
                            </small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Location</label>
                            <input
                                onChange={(e) => {
                                    setLocation(e.target.value);
                                }}
                                defaultValue={location}
                                type="text"
                                name="location"
                                id="location"
                                className="input"
                            />
                        </div>
                        <small className="secondary-text">
                            All of the fields on this page are optional and can
                            be deleted at any time, and by filling them out,
                            you're giving us consent to share this data wherever
                            your user profile appears. Please see our privacy
                            statement to learn more about how we use this
                            information.
                        </small>
                        <button type="submit" className="green-action-btn btn">
                            Update Profile
                        </button>
                    </form>
                </div>
                <div>
                    <img
                        src={profileImgSrc}
                        alt="Profile icon"
                        className="round-profile-img"
                    />
                    <input
                        onChange={(e) => {
                            setNewProfile(e.target.files[0]);
                            e.target.nextSibling.classList.toggle("hide");
                        }}
                        type="file"
                    />
                    <ProfileImageEditor
                        username={user.displayName}
                        src={newProfile}
                    />
                </div>
            </section>
        </div>
    );
};

export default ProfileSettings;
