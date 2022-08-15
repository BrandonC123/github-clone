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
    getRepoContent(uid, repoName) {
        const storage = getStorage();
        const listRef = ref(storage, `/${uid}/repos/${repoName}`);
        let tempFolderList = [];
        let tempItemList = [];
        let content = listAll(listRef)
            .then((res) => {
                res.prefixes.forEach((folderRef) => {
                    tempFolderList.push(folderRef.name);
                });
                res.items.forEach((item) => {
                    tempItemList.push(item.name);
                });
                return { tempFolderList, tempItemList };
            })
            .catch((error) => {
                console.error(error);
                return {};
            });
        return content;
    }
}

export default new RepositoryService();
