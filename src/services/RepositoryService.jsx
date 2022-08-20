import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, listAll, list, uploadBytes } from "firebase/storage";
import db from "..";

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

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
        const month = months[date.getMonth()];
        const day = date.getDate();
        await updateDoc(doc(db, "users", `${username}`), {
            repoList: [
                ...repoList,
                {
                    repoName: repoName,
                    lastUpdated: `${month} ${day}`,
                },
            ],
        });
    }
    async getRepoList(username) {
        if (username) {
            const response = await getDoc(doc(db, "users", `${username}`));
            if (response) {
                return response.data().repoList;
            }
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
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }
}

export default new RepositoryService();
