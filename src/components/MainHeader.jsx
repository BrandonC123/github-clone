import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MainHeader = ({ username }) => {
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
        if (e.target.tagName.toLowerCase() !== "button") {
            dropdownRef.classList.add("hide");
            document.removeEventListener("click", removeDrop);
        }
    }

    return (
        <header className="header">
            <div className="header-container container row">
                <div className="header-left-container row align-center">
                    <Link to={"/"}>
                        <img src="/img/gh-logo.svg" alt="Github logo" />
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
                <div className="header-right-column align-center row">
                    <img src="/img/bell-icon.svg" alt="" width={"25px"} />+
                    <div className="header-user-dropdown-container">
                        {username}
                        <button
                            onClick={(e) => {
                                const dropdown = e.target.nextSibling;
                                toggleDropdown(dropdown);
                            }}
                        >
                            Dropdown
                        </button>
                        <div className="dropdown hide">
                            <p>entry</p>
                            <p>entry</p>
                            <p>entry</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default MainHeader;
