import { Link } from "react-router-dom";

const Dropdown = ({ btnName, dropdownContent }) => {
    function fillDropdown() {
        return dropdownContent.map((item) => {
            return (
                <Link key={item.title} to={`${item.url}`} className="dropdown-item blue-hover">
                    {item.title}
                </Link>
            );
        });
    }
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
        if (e.target.nextSibling !== dropdownRef) {
            dropdownRef.classList.add("hide");
            document.removeEventListener("click", removeDrop);
        }
    }
    return (
        <div className="header-user-dropdown-container">
            <button
                onClick={(e) => {
                    const dropdown = e.target.nextSibling;
                    toggleDropdown(dropdown);
                }}
                className="dropdown-btn secondary-gray-btn btn"
            >
                {btnName}
            </button>
            <div className="general-dropdown dropdown hide">
                {fillDropdown()}
            </div>
        </div>
    );
};

export default Dropdown;
