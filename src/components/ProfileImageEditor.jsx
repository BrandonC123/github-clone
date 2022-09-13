import React, { useState } from "react";
import AvatarEditor from "react-avatar-editor";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import image from "../img/default-profile-pic.png";
import test from "../img/test.jpeg";

class ProfileImageEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newImgSrc: "",
        };
    }

    setEditorRef = (editor) => {
        if (editor) {
            this.editor = editor;
            const canvasScaled = this.editor.getImageScaledToCanvas();
            canvasScaled.toBlob((blob) => {
                console.log(blob);
                const url = URL.createObjectURL(blob);
                console.log(url);
                this.setState({
                    newImgSrc: url,
                });
            });
        }
    };
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
                <img id="image" src={this.state.newImgSrc} alt="" />
                <button
                    onClick={() => {
                        this.setEditorRef(this.editor);
                    }}
                >
                    Upload
                </button>
            </>
        );
    }
}

export default ProfileImageEditor;
