const CreateRepository = () => {
    return (
        <div className="create-repo-page">
            <form action="" className="create-repo-form">
                <div className="create-repo-input">
                    <label htmlFor="repo-name">Owner*</label>
                    <select name="repository-owner" id="repo-owner">
                        <option value="Brandon">Brandon</option>
                    </select>
                </div>
                <div className="create-repo-input">
                    <label htmlFor="repo-name">Repository Name*</label>
                    <input type="text" name="repository-name" id="repo-name" />
                </div>
                <div className="create-repo-input">
                    <input type="checkbox" />
                    <p>
                        Public <br />{" "}
                        <span>
                            Anyone on the internet can see this repository. You
                            choose who can commit.
                        </span>
                    </p>
                </div>
                <div className="create-repo-input">
                    <input type="checkbox" />
                    <p>
                        Private <br />{" "}
                        <span>
                            You choose who can see and commit to this
                            repository.
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default CreateRepository;
