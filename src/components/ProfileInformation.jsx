import { useContext, useState } from "react";
import EditProfile from "./EditProfile";
import { UserContext } from "./UserContext";

const ProfileInformation = () => {
    const user = useContext(UserContext);
    const [display, setDisplay] = useState(false);
    function toggleForm(e) {
        e.target.classList.toggle("hide");
        setDisplay(!display);
    }
    return (
        <div className="profile-information-column">
            <img src="/img/default-profile-pic.png" alt="" />
            <h1></h1>
            <h2>{user.displayName}</h2>
            <button
                onClick={(e) => {
                    toggleForm(e);
                }}
            >
                Edit profile
            </button>
            <EditProfile display={display} toggleForm={toggleForm}/>
        </div>
    );
};

export default ProfileInformation;
