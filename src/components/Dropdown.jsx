import { Link } from "react-router-dom";

const Dropdown = ({ btnName, dropdownContent }) => {
    function fillDropdown() {
        return dropdownContent.map((item) => {
            return (
                <Link to={`${item.url}`} className="dropdown-item">
                    <li>{item.title}</li>
                </Link>
            );
        });
    }
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
        if (!e.target.className.toLowerCase().includes("dropdown-btn")) {
            console.log(e.target);
            console.log(dropdownRef);
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
            <div className="default-dropdown hide">{fillDropdown()}</div>
        </div>
    );
};

export default Dropdown;
