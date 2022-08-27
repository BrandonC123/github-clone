import { useContext } from "react";
import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import AccountSettingsSidebar from "./AccountSettingsSidebar";
import ProfileImageEditor from "./ProfileImageEditor";
import { UserContext } from "./UserContext";

const ProfileSettings = ({}) => {
    // TODO: Profile image selector/cropper
    const user = useContext(UserContext);
    const [display, setDisplay] = useState(true);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [twitterUsername, setTwitterUsername] = useState("");
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        if (user) {
            UserService.getUserDetails(user.displayName).then((detail) => {
                setName(detail.name);
                setBio(detail.bio);
                setCompany(detail.company);
                setLocation(detail.location);
                setEmail(detail.email);
                setWebsite(detail.website);
                setTwitterUsername(detail.twitterUsername);
            });
        }
    }, [user]);
    return (
        <div className="profile-settings-page row">
            <AccountSettingsSidebar />
            <section className="profile-settings-content">
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
                    <ProfileImageEditor
                        display={display}
                        profileImage={profileImage}
                    />
                    <input
                        onChange={(e) => {
                            setProfileImage(e.target.files[0]);
                        }}
                        type="file"
                    />
                </div>
            </section>
        </div>
    );
};

export default ProfileSettings;
