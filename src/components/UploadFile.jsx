import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RepositoryService from "../services/RepositoryService";
import DragDrop from "./DragDrop";
import { UserContext } from "./UserContext";

const UploadFile = () => {
    const { repoName } = useParams();
    const user = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <div>
            <input multiple className="upload" type="file" />
            <button
                onClick={() => {
                    const files = document.querySelector(".upload").files;
                    console.log(files);
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
