import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, listAll, list, uploadBytes } from "firebase/storage";
import db from "..";

class RepositoryService {
    createRepo(username, repoName, repoList, readMeStatus) {
        const storage = getStorage();
        const fileRef = ref(storage, ".git");
        const folderRef = ref(storage, `/${username}/repos/${repoName}/.git`);

        uploadBytes(folderRef, fileRef)
            .then(() => {
                console.log("uploaded");
                if (readMeStatus) {
                    // Create README if checked
                    const readmeRef = ref(storage, "README.md");
                    const readmeFolderRef = ref(
                        storage,
                        `/${username}/repos/${repoName}/README.md`
                    );
                    uploadBytes(readmeFolderRef, readmeRef);
                }
                this.addRepoToFirestore(username, repoName, repoList);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    // Add repository details to firestore database to store name and misc data
    async addRepoToFirestore(username, repoName, repoList) {
        const date = new Date();
        await updateDoc(doc(db, "users", `${username}`), {
            repoList: [
                ...repoList,
                {
                    repoName: repoName,
                    lastUpdated: date,
                    created: date,
                    starred: false,
                },
            ],
        });
    }
    async getRepoList(username) {
        const response = await getDoc(doc(db, "users", `${username}`));
        if (response.exists()) {
            return response.data().repoList;
        } else {
            return [];
        }
    }
    getRepoContent(username, repoName) {
        const storage = getStorage();
        const listRef = ref(storage, `/${username}/repos/${repoName}`);
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
    uploadFileToRepo(username, repoName, files) {
        Array.from(files).forEach((file) => {
            const storage = getStorage();
            const testFolderRef = ref(
                storage,
                `/${username}/repos/${repoName}/${file.name}`
            );
            uploadBytes(testFolderRef, file)
                .then((snapshot) => {
                    console.log(snapshot);
                    this.updateLastUpdated(username, repoName);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }
    // Update when the repository was last updated
    async updateLastUpdated(username, repoName) {
        const repoList = await this.getRepoList(username);
        const index = repoList.map((repo) => repo.repoName).indexOf(repoName);
        let tempRepoList = Array.from(repoList);
        tempRepoList[index].lastUpdated = new Date();
        await updateDoc(doc(db, "users", `${username}`), {
            repoList: tempRepoList,
        });
    }
    async starRepo(username, repoName, repoList) {
        console.log(repoList);
        const index = repoList.map((repo) => repo.repoName).indexOf(repoName);
        let tempRepoList = Array.from(repoList);
        tempRepoList[index].starred = !tempRepoList[index].starred;
        console.log(tempRepoList);
        await updateDoc(doc(db, "users", `${username}`), {
            repoList: tempRepoList,
        });
    }
    async getStarredRepoList(username) {
        const repoList = await this.getRepoList(username);
        let tempList = [];
        repoList.forEach((repo) => {
            if (repo.starred) {
                tempList.push(repo);
            }
        });
        return tempList;
    }
    // TODO: sorting algs for repoList
}

export default new RepositoryService();
