import { getAuth } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

const MainHeader = ({ loading }) => {
    const user = useContext(UserContext);
    const [username, setUsername] = useState("");
    useEffect(() => {
        if (user) {
            setUsername(user.displayName);
        }
    }, [user]);
    const dropdownItemList1 = [
        { title: "Your profile", url: `/${username}` },
        { title: "Your repositories", url: `/${username}/repositories` },
        { title: "Your codespaces", url: "#" },
        { title: "Your organizations", url: "#" },
        { title: "Your projects", url: "#" },
        { title: "Your stars", url: `/${username}/stars` },
        { title: "Your gists", url: "#" },
    ];
    const dropdownItemList2 = [
        { title: "Upgrade", url: "#" },
        { title: "Feature preview", url: "#" },
        { title: "Help", url: "#" },
        { title: "Settings", url: "/settings/profile" },
    ];
    function fillDropdown() {
        return (
            <>
                <div style={{ borderBottom: "1px solid #30363d" }}>
                    {dropdownItemList1.map((item) => {
                        return (
                            <Link
                                key={item.title}
                                to={`${item.url}`}
                                className="dropdown-item blue-hover"
                            >
                                {item.title}
                            </Link>
                        );
                    })}
                </div>
                <div style={{ borderBottom: "1px solid #30363d" }}>
                    {dropdownItemList2.map((item) => {
                        return (
                            <Link
                                key={item.title}
                                to={`${item.url}`}
                                className="dropdown-item blue-hover"
                            >
                                {item.title}
                            </Link>
                        );
                    })}
                </div>
            </>
        );
    }
    function displaySignOrUser() {
        if (user) {
            console.log(user);
            return (
                <div className="header-right-column align-center row">
                    <div className="relative">
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                color: "#f0f6fc",
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                const dropdown =
                                    document.querySelector(".header-dropdown");
                                toggleDropdown(dropdown);
                            }}
                        >
                            <img
                                src={user.photoURL}
                                alt="Profile icon"
                                className="dropdown-btn round-profile-img profile-icon"
                            />
                            <span>▾</span>
                        </div>
                        <div className="header-dropdown dropdown hide">
                            <div
                                style={{
                                    padding: "0 .5em .5em",
                                    borderBottom: "1px solid #30363d",
                                }}
                            >
                                Signed in as {user.displayName}
                            </div>
                            {fillDropdown()}
                            <Link
                                onClick={() => {
                                    auth.signOut();
                                }}
                                to={"/signin"}
                                className="dropdown-item blue-hover"
                            >
                                Sign out
                            </Link>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="vertical-center">
                    <Link className="main-header-link" to={"/signin"}>
                        Sign in
                    </Link>
                    <Link className="main-header-link" to={"/signup"}>
                        Sign up
                    </Link>
                </div>
            );
        }
    }
    const auth = getAuth();
    let dropdownRef = null;
    function toggleDropdown(dropdown) {
        if (dropdown.classList.contains("hide")) {
            document.addEventListener("click", removeDrop);
        } else {
            document.removeEventListener("click", removeDrop);
        }
        dropdown.classList.toggle("hide");
        dropdownRef = dropdown;
    }
    function removeDrop(e) {
        if (e.target.parentNode.nextSibling !== dropdownRef) {
            dropdownRef.classList.add("hide");
            document.removeEventListener("click", removeDrop);
        }
    }

    return (
        <header className="header">
            <div className="header-container container row">
                <div className="header-left-container row align-center">
                    <Link to={"/"}>
                        <img
                            src={require("../img/gh-logo.svg").default}
                            alt="Github logo"
                        />
                    </Link>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        className="search-bar"
                        placeholder="Search or jump to..."
                    />
                    <nav className="header-nav row">
                        <li>
                            <Link to={"#"} className="header-link">
                                Pull requests
                            </Link>
                        </li>
                        <li>
                            <Link to={"#"} className="header-link">
                                Issues
                            </Link>
                        </li>
                        <li>
                            <Link to={"#"} className="header-link">
                                Marketplace
                            </Link>
                        </li>
                        <li>
                            <Link to={"#"} className="header-link">
                                Explore
                            </Link>
                        </li>
                    </nav>
                </div>
                {!loading && displaySignOrUser()}
            </div>
        </header>
    );
};

export default MainHeader;
