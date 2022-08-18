import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF", "txt", "pdf"];

const DragDrop = ({ addFileToList }) => {
    const handleChange = (file) => {
        addFileToList(file);
    };
    return (
        <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            multiple={true}
        />
    );
};

export default DragDrop;
