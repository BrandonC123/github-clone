import { doc, getDoc } from "firebase/firestore";
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
    followOrUnfollowUser(username) {}
}

export default new UserService();
