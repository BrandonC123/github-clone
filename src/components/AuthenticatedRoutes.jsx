import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import CreateRepository from "./CreateRepository";
import Home from "./Home";
import MainHeader from "./MainHeader";
import { UserContext } from "./UserContext";
import ViewRepository from "./ViewRepository";
import { getAuth } from "firebase/auth";
import ViewProfile from "./ViewProfile";
import ViewRepositoryList from "./ViewRepositoryList";
import ProfileSettings from "./ProfileSettings";
import ViewStarredRepositories from "./ViewStarredRepositories";
import UploadFile from "./UploadFile";

const AuthenticateRoutes = () => {
    const auth = getAuth();
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        auth.onAuthStateChanged((tempUser) => {
            if (tempUser) {
                setUser(tempUser);
                setUsername(tempUser.displayName);
            }
            // Once sign in status is established set loading to false to allow
            // home page to display accordingly
            setLoading(false);
        });
    });

    return (
        <>
            <UserContext.Provider value={user}>
                <MainHeader username={username} />
                <Routes>
                    <Route path="/" element={<Home loading={loading} />} />
                    <Route
                        path="/:username/:repoName/upload"
                        element={<UploadFile />}
                    />
                    <Route path={"/:username"} element={<ViewProfile />} />
                    <Route
                        path="/:username/repositories"
                        element={<ViewRepositoryList />}
                    />
                    <Route path="/new" element={<CreateRepository />} />
                    <Route
                        path="/:username/:repoName"
                        element={<ViewRepository />}
                    />
                    <Route
                        path="/settings/profile"
                        element={<ProfileSettings />}
                    />
                    <Route
                        path="/:username/stars"
                        element={<ViewStarredRepositories />}
                    />
                </Routes>
            </UserContext.Provider>
        </>
    );
};

export default AuthenticateRoutes;
