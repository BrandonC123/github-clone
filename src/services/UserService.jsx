import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
    uploadString,
} from "firebase/storage";
import db from "..";

class UserService {
    async getUserDetails(user, username) {
        const ref = doc(db, "users", `${username}`);
        const userDetailDb = await getDoc(ref);
        if (userDetailDb.exists()) {
            return userDetailDb.data();

            /* Only run "else if" when a user is viewing their own profile and is
            logged in which allows other profiles to be viewed when not logged in. */
        } else if (user && user.displayName === username) {
            /* If user does not currently exist in database create a new
             user with empty fields */
            const emptyUser = {
                profileImgSrc: user.photoURL,
                username: user.displayName,
                name: "",
                bio: "",
                company: "",
                location: "",
                email: "",
                website: "",
                twitterUsername: "",
                repoList: [],
                followList: [],
                contributionArray: [],
                starredRepoList: [],
            };
            await setDoc(doc(db, "users", `${username}`), emptyUser);
            return emptyUser;
        }
        return {};
    }
    async updateUserProfile(username, updatedUserObject) {
        await updateDoc(doc(db, "users", username), updatedUserObject);
    }
    async uploadProfileImg(username, img) {
        const storage = getStorage();
        const storageRef = ref(storage, `/${username}/profile-pic`);
        return await uploadString(storageRef, img, "data_url");
    }
    async getProfileImg(username) {
        const storage = getStorage();
        const profileRef = ref(storage, `/${username}/profile-pic`);
        const url = await getDownloadURL(profileRef);
        return url;
    }
    async getFollowList(username) {
        const response = await getDoc(doc(db, "users", `${username}`));
        if (response.exists()) {
            return response.data().followList;
        } else {
            return [];
        }
    }
    async followUser(username, followUsername, followList) {
        await updateDoc(doc(db, "users", `${username}`), {
            followList: [...followList, followUsername],
        });
    }
    async unfollowUser(username, followUsername, followList) {
        await updateDoc(doc(db, "users", `${username}`), {
            followList: followList.filter(
                (username) => username !== followUsername
            ),
        });
    }
}

export default new UserService();
