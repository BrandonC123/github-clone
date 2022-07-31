import { Link } from "react-router-dom";

const MainHeader = () => {
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
                <div className="header-right-column align-center">
                    {/*Profile content*/}
                    <img src="/img/bell-icon.svg" alt="" width={"25px"} />+
                </div>
            </div>
        </header>
    );
};

export default MainHeader;
