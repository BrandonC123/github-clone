import { doc, getDoc } from "firebase/firestore";
import { getStorage, ref, listAll, list } from "firebase/storage";
import db from "..";

class RepositoryService {
    async getRepoList(uid) {
        if (uid) {
            const response = await getDoc(doc(db, "users", `${uid}`));
            if (response) {
                return response.data().repoList;
            }
        }
    }
}

export default new RepositoryService();
