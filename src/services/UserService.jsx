import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import db from "..";

class UserService {
    async getUserDetails(username) {
        const ref = doc(db, "users", `${username}`);
        const userDetailDb = await getDoc(ref);
        if (userDetailDb.exists()) {
            return userDetailDb.data();
        } else {
            // If user does not currently exist in database create a new
            // user with empty fields
            const emptyUser = {
                name: "",
                bio: "",
                company: "",
                location: "",
                email: "",
                website: "",
                twitterUsername: "",
                repoList: [],
                followList: [],
            };
            await setDoc(doc(db, "users", `${username}`), emptyUser);
            return emptyUser;
        }
    }
    async updateUserProfile(username, updatedUserObject) {
        await updateDoc(doc(db, "users", username), updatedUserObject);
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
        const index = followList.indexOf(followUsername);
        await updateDoc(doc(db, "users", `${username}`), {
            followList: followList.splice(index, 1),
        });
    }
}

export default new UserService();
