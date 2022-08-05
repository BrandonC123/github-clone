const EditProfile = ({ display, toggleForm }) => {
    return (
        display && (
            <form className="edit-profile-form">
                <li className="edit-profile-input column">
                    <label htmlFor="full-name">Name</label>
                    <input type="text" placeholder="Name" id="full-name" />
                </li>
                <li className="edit-profile-input column">
                    <label htmlFor="profile-bio">Bio</label>
                    <textarea
                        name=""
                        cols="30"
                        rows="5"
                        placeholder="Add a bio"
                        id="profile-bio"
                    ></textarea>
                </li>
                <li className="edit-profile-input">
                    <input type="text" placeholder="Company" id="company" />
                </li>
                <li className="edit-profile-input">
                    <input type="text" placeholder="Location" id="location" />
                </li>
                <li className="edit-profile-input">
                    <input type="email" id="email" />
                </li>
                <li className="edit-profile-input">
                    <input type="text" placeholder="Website" id="website" />
                </li>
                <li className="edit-profile-input">
                    <input
                        type="text"
                        placeholder="Twitter username"
                        id="twitter-username"
                    />
                </li>
                <button
                    onClick={() => {
                        toggleForm();
                    }}
                >
                    Save
                </button>
                <button>Cancel</button>
            </form>
        )
    );
};

export default EditProfile;
