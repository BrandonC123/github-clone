import { Route, Routes } from "react-router-dom";
import CreateRepository from "./CreateRepository";
import MainHeader from "./MainHeader";
import { UserContext } from "./UserContext";
import Home from "./Home";
import ViewProfile from "./ViewProfile";
import ViewRepositoryList from "./ViewRepositoryList";
import ViewStarredRepositories from "./ViewStarredRepositories";
import ViewRepository from "./ViewRepository";
import ProfileSettings from "./ProfileSettings";
import UploadFile from "./UploadFile";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

const AuthenticateRoutes = ({ loading }) => {
    const user = useContext(UserContext);
    const [username, setUsername] = useState("");

    useEffect(() => {
        if (user) {
            setUsername(user.displayName);
        }
    }, [user]);
    return (
        !loading && (
            <>
                <MainHeader username={username} loading={loading} />
                <Routes>
                    {user && (
                        <>
                            <Route path="/" element={<Home />} />
                            <Route
                                path={`/${username}/:repoName/upload`}
                                element={<UploadFile />}
                            />
                            <Route path="/new" element={<CreateRepository />} />
                            <Route
                                path="/settings/profile"
                                element={<ProfileSettings />}
                            />
                        </>
                    )}
                    <Route path={"/:username"} element={<ViewProfile />} />
                    <Route
                        path="/:username/repositories"
                        element={<ViewRepositoryList />}
                    />
                    <Route
                        path="/:username/:repoName"
                        element={<ViewRepository />}
                    />
                    <Route
                        path="/:username/stars"
                        element={<ViewStarredRepositories />}
                    />
                </Routes>
            </>
        )
    );
};

export default AuthenticateRoutes;
