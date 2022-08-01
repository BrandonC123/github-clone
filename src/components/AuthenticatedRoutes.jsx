import { Route, Routes } from "react-router-dom";
import { AuthenticateUser } from "./AuthenticateUser";
import CreateRepository from "./CreateRepository";
import Home from "./Home";
import MainHeader from "./MainHeader";
import { UserContext } from "./UserContext";

const AuthenticateRoutes = () => {
    const user = AuthenticateUser();
    return (
        <>
            <UserContext.Provider value={user}>
                <MainHeader userName={user.displayName} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/new" element={<CreateRepository />} />
                </Routes>
            </UserContext.Provider>
        </>
    );
};

export default AuthenticateRoutes;
