import { Route, Routes } from "react-router-dom";
import CreateRepository from "./CreateRepository";
import Home from "./Home";
import MainHeader from "./MainHeader";

const AuthenticateRoutes = () => {
    return (
        <>
            <MainHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/new" element={<CreateRepository />} />
            </Routes>
        </>
    );
};

export default AuthenticateRoutes;
