import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";

const MainHeader = ({ username }) => {
    const dropdownItemList1 = [
        { title: "Your profile", url: `/${username}` },
        { title: "Your repositories", url: `/${username}/repositories` },
        { title: "Your codespaces", url: "/settings/profile" },
        { title: "Your organizations", url: "/settings/profile" },
        { title: "Your projects", url: "/settings/profile" },
        { title: "Your stars", url: `/${username}/stars` },
        { title: "Your gists", url: "/settings/profile" },
    ];
    const dropdownItemList2 = [
        { title: "Upgrade", url: "/settings/profile" },
        { title: "Feature preview", url: "/settings/profile" },
        { title: "Help", url: "/settings/profile" },
        { title: "Settings", url: "/settings/profile" },
    ];
    function fillDropdown() {
        return (
            <>
                <div className="border-divider">
                    {dropdownItemList1.map((item) => {
                        return (
                            <Link
                                key={item.title}
                                to={`${item.url}`}
                                className="default-dropdown-item"
                            >
                                {item.title}
                            </Link>
                        );
                    })}
                </div>
                <div className="border-divider">
                    {dropdownItemList2.map((item) => {
                        return (
                            <Link
                                key={item.title}
                                to={`${item.url}`}
                                className="default-dropdown-item"
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
        if (username) {
            return (
                <div className="header-right-column align-center row">
                    <img
                        src={require("../img/bell-icon.svg").default}
                        alt="Notification bell icon"
                        width={"25px"}
                    />
                    +
                    <div className="header-user-dropdown-container">
                        <button
                            onClick={(e) => {
                                const dropdown = e.target.nextSibling;
                                toggleDropdown(dropdown);
                            }}
                            className="dropdown-btn"
                            to={`/${username}`}
                        >
                            {username}
                        </button>
                        <div className="header-dropdown hide">
                            Signed in as {username}
                            {fillDropdown()}
                            <Link
                                onClick={() => {
                                    auth.signOut();
                                }}
                                to={"/signin"}
                                className="header-dropdown-item"
                            >
                                Sign out
                            </Link>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <Link to={"/signin"}>Sign in</Link>
                    <Link to={"/signup"}>Sign up</Link>
                </div>
            );
        }
    }
    const auth = getAuth();
    let dropdownRef = null;
    function toggleDropdown(dropdown) {
        if (dropdown.classList.contains("hide")) {
            console.log("add");
            document.addEventListener("click", removeDrop);
        } else {
            console.log("remove");
            document.removeEventListener("click", removeDrop);
        }
        dropdown.classList.toggle("hide");
        dropdownRef = dropdown;
    }
    function removeDrop(e) {
        if (e.target.className.toLowerCase() !== "dropdown-btn") {
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
                        placeholder="Search or jump to..."
                    />
                    <nav className="header-nav row">
                        <li>
                            <Link to={"/pulls"} className="header-link">
                                Pull requests
                            </Link>
                        </li>
                        <li>
                            <Link to={"/issues"} className="header-link">
                                Issues
                            </Link>
                        </li>
                        <li>
                            <Link to={"/marketplace"} className="header-link">
                                Marketplace
                            </Link>
                        </li>
                        <li>
                            <Link to={"/explore"} className="header-link">
                                Explore
                            </Link>
                        </li>
                    </nav>
                </div>
                {displaySignOrUser()}
            </div>
        </header>
    );
};

export default MainHeader;
