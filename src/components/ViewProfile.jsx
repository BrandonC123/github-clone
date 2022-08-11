import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStorage, ref, listAll } from "firebase/storage";
import { UserContext } from "./UserContext";
import ProfileInformation from "./ProfileInformation";
import ProfileNav from "./ProfileNav";

const ViewProfile = () => {
    const user = useContext(UserContext);
    return (
        <div className="profile-page page">
            <ProfileInformation />
            <main className="profile-repo-content">
                <ProfileNav username={user.displayName} />
                <div className="view-six-repo">
                    <div className="repo-card">
                        <div className="repo-content row">
                            <a className="repo-list-link">memory-card-game</a>
                            <button>drag</button>
                        </div>
                        javascript
                    </div>
                    <div className="repo-card">
                        <div className="repo-content row">
                            <a className="repo-list-link">memory-card-game</a>
                            <button>drag</button>
                        </div>
                        javascript
                    </div>
                    <div className="repo-card">
                        <div className="repo-content row">
                            <a className="repo-list-link">memory-card-game</a>
                            <button>drag</button>
                        </div>
                        javascript
                    </div>
                    <div className="repo-card">
                        <div className="repo-content row">
                            <a className="repo-list-link">memory-card-game</a>
                            <button>drag</button>
                        </div>
                        javascript
                    </div>
                    <div className="repo-card">
                        <div className="repo-content row">
                            <a className="repo-list-link">memory-card-game</a>
                            <button>drag</button>
                        </div>
                        javascript
                    </div>
                    <div className="repo-card">
                        <div className="repo-content row">
                            <a className="repo-list-link">memory-card-game</a>
                            <button>drag</button>
                        </div>
                        javascript
                    </div>
                </div>
                <div className="contributions-container">t</div>
            </main>
        </div>
    );
};

export default ViewProfile;
