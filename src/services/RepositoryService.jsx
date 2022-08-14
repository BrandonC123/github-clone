import { getStorage, ref, listAll, list } from "firebase/storage";

class RepositoryService {
    async getRepos(count) {
        const storage = getStorage();
        const repoRef = ref(storage, `RqMP96M7PuQwDp0JSM20etBzNKs2/repos`);
        const repos = await list(repoRef, { maxResults: count });
        let tempArray = [];
        repos.prefixes.forEach((ref) => {
            tempArray.push(ref.name);
        });
        return tempArray;
    }
}

export default new RepositoryService();
