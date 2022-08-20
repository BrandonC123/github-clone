import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { getStorage, ref, updateMetadata, uploadBytes } from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "..";
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
        RepositoryService.getRepoList(user.displayName).then((list) => {
            if (list) {
                setRepoList(list);
            }
        });
    }, [user]);

    const repoObj = {
        name: name,
        description: description,
    };

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
                        // navigate(`/${uid}/${repoName}`);
                    }
                }}
                action=""
                className="create-repo-form column"
            >
                <div className="border-divider">
                    <h1 className="title">Create a new repository</h1>
                    <span className="secondary-text">
                        A repository contains all project files, including the
                        revision history. Already have a project repository
                        elsewhere? <br />
                    </span>
                    <a href="#">Import a repository.</a>
                </div>
                <div className="repo-info-container border-divider">
                    <div className="row">
                        <li className="create-repo-input">
                            <label htmlFor="repo-name">Owner*</label>
                            <select name="repository-owner" id="repo-owner">
                                <option value="Brandon">Brandon</option>
                            </select>
                        </li>
                        <li className="create-repo-input repo-name">
                            <label htmlFor="repo-name">Repository Name*</label>
                            <input
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                required
                                type="text"
                                name="repository-name"
                                id="repo-name"
                            />
                        </li>
                    </div>
                    <li className="create-repo-input">
                        <label htmlFor="repo-description">
                            Description (optional)
                        </label>
                        <textarea
                            name="repository-description"
                            id="repo-description"
                        ></textarea>
                    </li>
                </div>
                <div className="repo-visibility-container border-divider">
                    <li className="create-repo-input row">
                        <input type="radio" name="repo-visibility" />
                        <img src="/img/repo-icon.svg" alt="Repository icon" />
                        <p>
                            Public <br />{" "}
                            <span className="secondary-text">
                                Anyone on the internet can see this repository.
                                You choose who can commit.
                            </span>
                        </p>
                    </li>
                    <li className="create-repo-input row">
                        <input type="radio" name="repo-visibility" />
                        <img src="/img/lock-icon.svg" alt="Lock icon" />
                        <p>
                            Private <br />{" "}
                            <span className="secondary-text">
                                You choose who can see and commit to this
                                repository.
                            </span>
                        </p>
                    </li>
                </div>
                <div className="repo-intialization-container border-divider">
                    <p>
                        Initialize this repositroy with: <br />
                        <span className="secondary-text">
                            Skip this step if you're importing an existing
                            repository
                        </span>
                    </p>
                    <li className="create-repo-input row">
                        <input
                            onChange={(e) => {
                                setReadMeStatus(e.target.checked);
                            }}
                            type="checkbox"
                            name="add-readme"
                        />
                        <p>
                            Add a README file
                            <br />{" "}
                            <span className="secondary-text">
                                This is where you can write a long description
                                for your project. Learn more.
                            </span>
                        </p>
                    </li>
                    <li className="create-repo-input column">
                        <p>
                            Add .gitignore
                            <br />{" "}
                            <span className="secondary-text">
                                This is where you can write a long description
                                for your project. Learn more.
                            </span>
                        </p>
                        <select name="repository-owner" id="repo-owner">
                            <option value="Brandon">Brandon</option>
                        </select>
                    </li>
                    <li className="create-repo-input column">
                        <p>
                            Choose a license
                            <br />{" "}
                            <span className="secondary-text">
                                This is where you can write a long description
                                for your project. Learn more.
                            </span>
                        </p>
                        <select name="repository-owner" id="repo-owner">
                            <option value="Brandon">Brandon</option>
                        </select>
                    </li>
                </div>
                <button className="green-action-btn btn">
                    Create repository
                </button>
            </form>
        </main>
    );
};

export default CreateRepository;
