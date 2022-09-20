import { useEffect } from "react";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RepositoryService from "../services/RepositoryService";
import DragDrop from "./DragDrop";
import RepositoryNav from "./RepositoryNav";
import { UserContext } from "./UserContext";

const UploadFile = () => {
    // TODO: Styling and reroute after uploading
    const { repoName } = useParams();
    const user = useContext(UserContext);
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);

    function displayFiles() {
        return files.map((file, index) => {
            return (
                <div className="file-item">
                    <div className="vertical-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            aria-label="File"
                            aria-hidden="true"
                            height="16"
                            viewBox="0 0 16 16"
                            version="1.1"
                            width="16"
                            data-view-component="true"
                            class="octicon octicon-file color-fg-muted"
                        >
                            <path
                                fill="#c9d1d9"
                                fillRule="evenodd"
                                d="M3.75 1.5a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 00.25-.25V6h-2.75A1.75 1.75 0 019 4.25V1.5H3.75zm6.75.062V4.25c0 .138.112.25.25.25h2.688a.252.252 0 00-.011-.013l-2.914-2.914a.272.272 0 00-.013-.011zM2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0113.25 16h-9.5A1.75 1.75 0 012 14.25V1.75z"
                            ></path>
                        </svg>
                        <p>{file.name}</p>
                    </div>
                    <svg
                        onClick={() => {
                            deleteFileFromList(index);
                        }}
                        style={{ cursor: "pointer" }}
                        aria-hidden="true"
                        height="16"
                        viewBox="0 0 16 16"
                        version="1.1"
                        width="16"
                        data-view-component="true"
                        class="octicon octicon-x"
                    >
                        <path
                            fill="#c9d1d9"
                            fillRule="evenodd"
                            d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"
                        ></path>
                    </svg>
                </div>
            );
        });
    }
    function addFileToList(file) {
        setFiles(files.concat(Array.from(file)));
    }
    function deleteFileFromList(index) {
        let tempArray = Array.from(files);
        tempArray.splice(index, 1);
        setFiles(tempArray);
    }

    return (
        <div className="page container">
            <RepositoryNav username={user.displayName} repoName={repoName} />
            <div className="upload-file-container">
                <DragDrop id={"test"} addFileToList={addFileToList} />
                <div className="uploaded-files">{displayFiles()}</div>
                <button
                    onClick={() => {
                        RepositoryService.uploadFileToRepo(
                            user.displayName,
                            repoName,
                            files
                        );
                        setFiles([]);
                    }}
                    className="green-action-btn btn"
                >
                    Commit Changes
                </button>
                <button
                    onClick={() => {
                        navigate(-1);
                    }}
                    style={{ color: "#f84739" }}
                    className="secondary-gray-btn btn"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default UploadFile;
