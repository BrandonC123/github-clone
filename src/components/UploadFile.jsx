import { useEffect } from "react";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RepositoryService from "../services/RepositoryService";
import DragDrop from "./DragDrop";
import { UserContext } from "./UserContext";

const UploadFile = () => {
    const { repoName } = useParams();
    const user = useContext(UserContext);
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);

    function displayFiles() {
        return Array.from(files).map((file) => {
            return <div className="row align-center">
                <p>{file.name}</p>
                <button>x</button>
            </div>;
        });
    }
    function addFileToList(file) {
        setFiles(files.concat(Array.from(file)));
    }
    useEffect(() => {
        console.log(files);
    }, [files]);

    return (
        <div>
            <div className="upload-file-container container">
                <DragDrop addFileToList={addFileToList} />
            </div>
            <div className="uploaded-files">{displayFiles()}</div>
            <button
                onClick={() => {
                    RepositoryService.uploadFileToRepo(
                        user.uid,
                        repoName,
                        files
                    );
                }}
            >
                Upload
            </button>
        </div>
    );
};

export default UploadFile;
