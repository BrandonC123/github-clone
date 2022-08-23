import AvatarEditor from "react-avatar-editor";

const ProfileImageEditor = ({ display }) => {
    return (
        display && (
            <AvatarEditor
                image="/img/lock-icon.svg"
                width={250}
                height={250}
                border={10}
                borderRadius={125}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={1.2}
                rotate={0}
            />
        )
    );
};

export default ProfileImageEditor;
