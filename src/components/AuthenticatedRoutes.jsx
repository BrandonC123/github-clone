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
import { useContext } from "react";

const AuthenticateRoutes = () => {
    const user = useContext(UserContext);

    return (
        user && (
            <>
                <MainHeader username={user.displayName} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path={`/${user.displayName}/:repoName/upload`}
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
            </>
        )
    );
};

export default AuthenticateRoutes;
