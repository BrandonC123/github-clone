import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const CreateRepository = () => {
    const storage = getStorage();
    const user = useContext(UserContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [readMeStatus, setReadMeStatus] = useState(false);

    function createRepo() {
        console.log(user);
        const testRef = ref(storage, ".git");
        const testFolderRef = ref(storage, `/${user.uid}/repos/${name}/.git`);

        uploadBytes(testFolderRef, testRef)
            .then((snapshot) => {
                console.log("uploaded");
            })
            .catch((error) => {
                console.log(error);
            });
    }
    function addReadme() {}
    const repoObj = {
        name: name,
        description: description,
    };

    return (
        <main className="create-repo-page">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    createRepo();
                }}
                action=""
                className="create-repo-form column"
            >
                <div className="repo-info-container ">
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
                <div className="repo-visibility-container">
                    <li className="create-repo-input row">
                        <input type="radio" name="repo-visibility" />
                        <p>
                            Public <br />{" "}
                            <span>
                                Anyone on the internet can see this repository.
                                You choose who can commit.
                            </span>
                        </p>
                    </li>
                    <li className="create-repo-input row">
                        <input type="radio" name="repo-visibility" />
                        <p>
                            Private <br />{" "}
                            <span>
                                You choose who can see and commit to this
                                repository.
                            </span>
                        </p>
                    </li>
                </div>
                <div className="repo-intialization-container">
                    <p>
                        Initialize this repositroy with: <br />
                        <span>
                            Skip this step if you're importing an existing
                            repository
                        </span>
                    </p>
                    <li className="create-repo-input row">
                        <input type="checkbox" name="add-readme" />
                        <p>
                            Add a README file
                            <br />{" "}
                            <span>
                                This is where you can write a long description
                                for your project. Learn more.
                            </span>
                        </p>
                    </li>
                    <li className="create-repo-input column">
                        <p>
                            Add .gitignore
                            <br />{" "}
                            <span>
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
                            <span>
                                This is where you can write a long description
                                for your project. Learn more.
                            </span>
                        </p>
                        <select name="repository-owner" id="repo-owner">
                            <option value="Brandon">Brandon</option>
                        </select>
                    </li>
                </div>
                <button className="create-repo-btn btn">
                    Create repository
                </button>
            </form>
        </main>
    );
};

export default CreateRepository;
