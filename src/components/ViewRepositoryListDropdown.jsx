import { useEffect } from "react";
import { useState } from "react";

const ViewRepositoryListDropdown = ({ toggleRepoList }) => {
    const [prevSort, setPrevSort] = useState(null);
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
        if (e.target.nextSibling !== dropdownRef) {
            dropdownRef.classList.add("hide");
            document.removeEventListener("click", removeDrop);
        }
    }
    useEffect(() => {
        // Initialize default sort once webpage is loaded
        setPrevSort(document.querySelector(".default-sort"));
    }, []);
    function chooseSort(option) {
        console.log(prevSort);
        if (prevSort) {
            prevSort.firstChild.classList.add("hidden");
            console.log(prevSort);
        }
        toggleRepoList(option.textContent);
        option.firstChild.classList.remove("hidden");
        setPrevSort(option);
    }
    return (
        <>
            <div>
                <button className="secondary-gray-btn btn">Type ▾</button>
                <div className="dropdown hide">
                    <p onClick={() => toggleRepoList()}>Last updated</p>
                    <p onClick={() => toggleRepoList()}>Name</p>
                    <p onClick={() => toggleRepoList()}>Stars</p>
                </div>
            </div>
            <div>
                <button className="secondary-gray-btn btn">Language ▾</button>
                <div className="dropdown hide">
                    <p onClick={() => toggleRepoList()}>Last updated</p>
                    <p onClick={() => toggleRepoList()}>Name</p>
                    <p onClick={() => toggleRepoList()}>Stars</p>
                </div>
            </div>
            <div className="relative">
                <button
                    onClick={(e) => {
                        const dropdown = e.target.nextSibling;
                        toggleDropdown(dropdown);
                    }}
                    className="secondary-gray-btn btn"
                >
                    Sort ▾
                </button>
                <div className="dropdown view-repo-dropdown hide">
                    Select Order
                    <label
                        onClick={(e) => chooseSort(e.target)}
                        className="view-repo-dropdown-item vertical-center default-sort"
                    >
                        <svg
                            fill="#c9d1d9"
                            aria-hidden="true"
                            height="16"
                            viewBox="0 0 16 16"
                            version="1.1"
                            width="16"
                            data-view-component="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
                            ></path>
                        </svg>
                        Last updated
                    </label>
                    <label
                        onClick={(e) => chooseSort(e.target)}
                        className="view-repo-dropdown-item vertical-center"
                    >
                        <svg
                            fill="#c9d1d9"
                            aria-hidden="true"
                            height="16"
                            viewBox="0 0 16 16"
                            version="1.1"
                            width="16"
                            data-view-component="true"
                            className="hidden"
                        >
                            <path
                                fillRule="evenodd"
                                d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
                            ></path>
                        </svg>
                        Name
                    </label>
                    <label
                        onClick={(e) => chooseSort(e.target)}
                        className="view-repo-dropdown-item vertical-center"
                    >
                        <svg
                            fill="#c9d1d9"
                            aria-hidden="true"
                            height="16"
                            viewBox="0 0 16 16"
                            version="1.1"
                            width="16"
                            data-view-component="true"
                            className="hidden"
                        >
                            <path
                                fillRule="evenodd"
                                d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
                            ></path>
                        </svg>
                        Stars
                    </label>
                </div>
            </div>
        </>
    );
};

export default ViewRepositoryListDropdown;
