import React from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF", "txt", "pdf"];

const DragDrop = ({ addFileToList }) => {
    const handleChange = (file) => {
        addFileToList(file);
    };
    return (
        <div className="drag-drop-parent">
            <FileUploader
                handleChange={handleChange}
                name="file"
                types={fileTypes}
                multiple={true}
            />
        </div>
    );
};

export default DragDrop;
