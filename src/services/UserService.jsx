import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import db from "..";

class UserService {
    async getUserDetails(user, username) {
        const ref = doc(db, "users", `${username}`);
        const userDetailDb = await getDoc(ref);
        if (userDetailDb.exists()) {
            return userDetailDb.data();

            /* Only run else if when a user is viewing their own profile and is
            logged in which allows other profiles to be viewed when not logged in. */
        } else if (user && user.displayName === username) {
            /* If user does not currently exist in database create a new
             user with empty fields */
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
        return {};
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
