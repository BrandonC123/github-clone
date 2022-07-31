import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthenticateUser } from "./AuthenticateUser";

const Home = () => {
    const navigate = useNavigate();
    const user = AuthenticateUser();
    useEffect(() => {
        if (!user) {
            navigate("/signin");
        }
    });
    console.log(user);

    return (
        user && (
            <div>
                <Link to={"/signin"}>Sign in</Link>
                <Link to={"/signup"}>Sign up</Link>
                logged in
            </div>
        )
    );
};

export default Home;
