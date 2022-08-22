import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "..";

class UserService {
    async getFollowList(username) {
        const response = await getDoc(doc(db, "users", `${username}`));
        if (response.exists()) {
            return response.data().followList;
        } else {
            return [];
        }
    }
    async followUser(username, followUsername, followList) {
        console.log("follow");
        await updateDoc(doc(db, "users", `${username}`), {
            followList: [...followList, followUsername],
        });
    }
    async unfollowUser(username, followUsername, followList) {
        console.log("unfollow");
        const index = followList.indexOf(followUsername);
        await updateDoc(doc(db, "users", `${username}`), {
            followList: followList.splice(index, 1),
        });
    }
}

export default new UserService();
