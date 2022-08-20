import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import CreateRepository from "./CreateRepository";
import Home from "./Home";
import MainHeader from "./MainHeader";
import { UserContext } from "./UserContext";
import ViewRepository from "./ViewRepository";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ViewProfile from "./ViewProfile";
import ViewRepositoryList from "./ViewRepositoryList";
import UploadFile from "./UploadFile";
import { useEffect } from "react";

const AuthenticateRoutes = () => {
    const auth = getAuth();
    const [user, setUser] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        auth.onAuthStateChanged((tempUser) => {
            if (!tempUser) {
                navigate("/signin");
            }
            setUser(tempUser);
        });
    });

    return (
        <>
            <UserContext.Provider value={user}>
                <MainHeader username={user.displayName} />
                <Routes>
                    <Route path="/" element={<Home />} />
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
                        path="/:username/:repoName/upload"
                        element={<UploadFile />}
                    />
                </Routes>
            </UserContext.Provider>
        </>
    );
};

export default AuthenticateRoutes;
