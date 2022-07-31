import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <aside className="sidebar-container">
            <p>BrandonC123</p>
            <div className="sidebar-repo-container">
                <p>
                    Recent Repositories{" "}
                    <button
                        onClick={() => {
                            navigate("/new");
                        }}
                        className="create-repo-btn btn"
                    >
                        New
                    </button>
                </p>
                <ul className="sidebar-repo-list"></ul>
            </div>
            <h5>Recent Activity</h5>
            <span>
                When you take actions across GitHub, we’ll provide links to that
                activity here.
            </span>
        </aside>
    );
};

export default Sidebar;
