import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthenticateUser } from "./AuthenticateUser";
import Sidebar from "./Sidebar";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const Home = () => {
    const storage = getStorage();
    const navigate = useNavigate();
    const user = AuthenticateUser();
    useEffect(() => {
        // if (!user) {
        //     navigate("/signin");
        // }
    });
    function createRepo() {
        const testRef = ref(storage, "text.txt");
        const testFolderRef = ref(storage, "/uid1/repos/");

        uploadBytes(testFolderRef, testRef)
            .then((snapshot) => {
                console.log("uploaded");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        // user && (
        <div className="home-page page">
            <Sidebar />
            <section className="home-page-section">
                <div className="home-page-content">
                    {" "}
                    <Link to={"/signin"}>Sign in</Link>
                    <Link to={"/signup"}>Sign up</Link>
                    logged in
                </div>
                <div className="home-page-misc"></div>
            </section>
        </div>
        // )
    );
};

export default Home;
