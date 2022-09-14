import {
    getBlob,
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
} from "firebase/storage";
import React, { useState } from "react";
import AvatarEditor from "react-avatar-editor";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import image from "../img/default-profile-pic.png";
import test from "../img/test.jpeg";
import UserService from "../services/UserService";

class ProfileImageEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newImgSrc: "",
            blob: null,
        };
    }

    setEditorRef = (editor) => {
        if (editor) {
            this.editor = editor;
        }
    };
    uploadProfile() {
        const canvasScaled = this.editor.getImageScaledToCanvas();
        canvasScaled.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            this.setState({
                newImgSrc: url,
            });
            UserService.uploadProfileImg(this.props.username, blob);
        });
    }
    render() {
        const { src } = this.props;
        return (
            <>
                <AvatarEditor
                    ref={this.setEditorRef}
                    image={src}
                    width={250}
                    height={250}
                    border={20}
                    borderRadius={125}
                    color={[0, 0, 0, 0.6]} // RGBA
                />
                <img
                    src={this.state.newImgSrc}
                    alt=""
                    className="round-profile-img"
                />
                <button
                    onClick={() => {
                        this.setEditorRef(this.editor);
                        // Upload image to firebase storage for displaying
                        this.uploadProfile();
                    }}
                >
                    Upload
                </button>
            </>
        );
    }
}

export default ProfileImageEditor;
