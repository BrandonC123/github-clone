import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { getStorage } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import RepositoryService from "../services/RepositoryService";

const CreateRepository = () => {
    const navigate = useNavigate();
    const storage = getStorage();
    const user = useContext(UserContext);
    const [name, setName] = useState("");
    const [repoList, setRepoList] = useState([]);
    const [description, setDescription] = useState("");
    const [readMeStatus, setReadMeStatus] = useState(false);

    useEffect(() => {
        if (user) {
            RepositoryService.getRepoList(user.displayName).then((list) => {
                if (list) {
                    setRepoList(list);
                }
            });
        }
    }, [user]);

    // TODO: ability to create private repo
    return (
        <main className="create-repo-page">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (repoList.includes(name)) {
                        console.log("dupe");
                    } else {
                        RepositoryService.createRepo(
                            user.displayName,
                            name,
                            repoList,
                            readMeStatus
                        );
                        navigate(`/${user.displayName}/${name}`);
                    }
                }}
                action=""
                className="create-repo-form column"
            >
                <div className="create-repo-input-container">
                    <h1 className="title">Create a new repository</h1>
                    <small className="secondary-text">
                        A repository contains all project files, including the
                        revision history. Already have a project repository
                        elsewhere? <br />
                    </small>
                    <a href="#" className="blue-accent-text">
                        Import a repository.
                    </a>
                </div>
                <div className="create-repo-input-container">
                    <div className="row">
                        <div className="create-repo-input column">
                            <label htmlFor="repo-name">Owner*</label>
                            <select name="repository-owner" id="repo-owner">
                                <option value="Brandon">
                                    {user.displayName}
                                </option>
                            </select>
                        </div>
                        <div className="create-repo-input column repo-name">
                            <label htmlFor="repo-name">Repository Name*</label>
                            <input
                                onChange={(e) => {
                                    // Replace spaces with hyphen
                                    setName(
                                        e.target.value
                                            .trim()
                                            .replace(/\s+/g, "-")
                                    );
                                }}
                                required
                                type="text"
                                name="repository-name"
                                id="repo-name"
                            />
                        </div>
                    </div>
                    <div className="create-repo-input">
                        <label htmlFor="repo-description">
                            Description{" "}
                            <small className="secondary-text">(optional)</small>
                        </label>
                        <textarea
                            name="repository-description"
                            id="repo-description"
                        ></textarea>
                    </div>
                </div>
                <div className="create-repo-input-container">
                    <div className="create-repo-input vertical-center">
                        <input type="radio" name="repo-visibility" />
                        <svg
                            fill="#8b949e"
                            height="24"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            width="24"
                            data-view-component="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 2.75A2.75 2.75 0 015.75 0h14.5a.75.75 0 01.75.75v20.5a.75.75 0 01-.75.75h-6a.75.75 0 010-1.5h5.25v-4H6A1.5 1.5 0 004.5 18v.75c0 .716.43 1.334 1.05 1.605a.75.75 0 01-.6 1.374A3.25 3.25 0 013 18.75v-16zM19.5 1.5V15H6c-.546 0-1.059.146-1.5.401V2.75c0-.69.56-1.25 1.25-1.25H19.5z"
                            ></path>
                            <path d="M7 18.25a.25.25 0 01.25-.25h5a.25.25 0 01.25.25v5.01a.25.25 0 01-.397.201l-2.206-1.604a.25.25 0 00-.294 0L7.397 23.46a.25.25 0 01-.397-.2v-5.01z"></path>
                        </svg>
                        <p>
                            Public <br />{" "}
                            <small className="secondary-text">
                                Anyone on the internet can see this repository.
                                You choose who can commit.
                            </small>
                        </p>
                    </div>
                    <div className="create-repo-input vertical-center">
                        <input type="radio" name="repo-visibility" />
                        <svg
                            fill="#8b949e"
                            height="24"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            width="24"
                            data-view-component="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M6 9V7.25C6 3.845 8.503 1 12 1s6 2.845 6 6.25V9h.5a2.5 2.5 0 012.5 2.5v8a2.5 2.5 0 01-2.5 2.5h-13A2.5 2.5 0 013 19.5v-8A2.5 2.5 0 015.5 9H6zm1.5-1.75C7.5 4.58 9.422 2.5 12 2.5c2.578 0 4.5 2.08 4.5 4.75V9h-9V7.25zm-3 4.25a1 1 0 011-1h13a1 1 0 011 1v8a1 1 0 01-1 1h-13a1 1 0 01-1-1v-8z"
                            ></path>
                        </svg>
                        <p>
                            Private <br />{" "}
                            <small className="secondary-text">
                                You choose who can see and commit to this
                                repository.
                            </small>
                        </p>
                    </div>
                </div>
                <div className="create-repo-input-container">
                    <p>
                        Initialize this repository with: <br />
                        <small className="secondary-text">
                            Skip this step if you're importing an existing
                            repository
                        </small>
                    </p>
                    <div className="create-repo-input vertical-center">
                        <input
                            onChange={(e) => {
                                setReadMeStatus(e.target.checked);
                            }}
                            type="checkbox"
                            name="add-readme"
                            style={{ backgroundColor: "#3b3b3b" }}
                        />
                        <p>
                            Add a README file
                            <br />{" "}
                            <small className="secondary-text">
                                This is where you can write a long description
                                for your project. Learn more.
                            </small>
                        </p>
                    </div>
                </div>
                <button disabled className="green-action-btn btn">
                    Create repository
                </button>
            </form>
        </main>
    );
};

export default CreateRepository;
