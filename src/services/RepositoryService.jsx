import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, listAll, list, uploadBytes } from "firebase/storage";
import db from "..";

class RepositoryService {
    // TODO: add to contribution after creating repo
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
                    // this.addToContributionArray(username, repoName, "README.md");
                }
                this.addRepoToFirestore(username, repoName, repoList);
                // this.addToContributionArray(username, repoName, ".git");
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
                    // id: `${username}-${repoName}`,
                    repoName: repoName,
                    lastUpdated: date,
                    created: date,
                    starCount: 0,
                },
            ],
        });
    }
    async getRepoList(username) {
        const response = await getDoc(doc(db, "users", `${username}`));
        if (response.exists()) {
            return response.data().repoList;
        } else {
            return null;
        }
    }
    // Get repositories of all users the user is following
    async getFollowedRepolist() {}
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
                    this.addToContributionArray(username, repoName, file.name);
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
    async starRepo(username, repo, starredRepoList, repoList) {
        /*
         If repo is already starred remove = true
         remove = true -> delete from starredRepoList return false 
         remove = false -> add to starredRepoList return true
         */
        const remove = starredRepoList
            .map(({ id }) => {
                return id;
            })
            .includes(repo.id);
        let tempRepoList = Array.from(starredRepoList);
        if (remove) {
            tempRepoList = tempRepoList.filter(({ id }) => id !== repo.id);
        } else {
            repo.starCount++;
            tempRepoList.push(repo);
        }
        this.updateStarCount(!remove, repo, repoList);
        await updateDoc(doc(db, "users", `${username}`), {
            starredRepoList: tempRepoList,
        });
        return !remove;
    }
    // TODO: other user starring repo does not update owner starCount
    async updateStarCount(add, repo, repoList) {
        const username = repo.id.split("-")[0];
        const index = repoList
            .map(({ repoName }) => {
                return repoName;
            })
            .indexOf(repo.repoName);
        let tempRepoList = Array.from(repoList);
        if (add) {
            tempRepoList[index].starCount++;
        } else {
            tempRepoList[index].starCount--;
        }
        await updateDoc(doc(db, "users", `${username}`), {
            repoList: tempRepoList,
        });
    }
    // Get all starred repos (only repos owned by user)
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
    // Get all starred repos including followed users
    async getAllStarredRepoList(username) {
        const response = await getDoc(doc(db, "users", `${username}`));
        if (response.exists()) {
            return response.data().starredRepoList;
        } else {
            return null;
        }
    }
    async getContributionArray(username) {
        const response = await getDoc(doc(db, "users", `${username}`));
        if (response.exists()) {
            return response.data().contributionArray;
        } else {
            return null;
        }
    }
    async addToContributionArray(username, repoName, fileName) {
        const currentDate = new Date();
        let tempContributionArray = Array.from(
            await this.getContributionArray(username)
        );
        const currentIndex = tempContributionArray.length - 1;
        const contributionObject = {
            repoName,
            fileName,
            time: currentDate,
        };
        /* 
        Get the current date and the date of last contribution to 
        determine whether or not a new entry needs to be made for that day.
        If a contribution has already been made for that day then update
        corresponding count and contribution details
        */
        const currentDay = new Date().toDateString();
        let compareDay = new Date(
            tempContributionArray[currentIndex].day.seconds * 1000
        ).toDateString();
        if (currentDay !== compareDay) {
            console.log("new entry");
            const newEntry = {
                day: currentDate,
                contributionCount: 1,
                contributions: [contributionObject],
            };
            tempContributionArray.push(newEntry);
        } else {
            console.log("repo already made");
            tempContributionArray[currentIndex].contributionCount++;
            tempContributionArray[currentIndex].contributions.push(
                contributionObject
            );
        }

        await updateDoc(doc(db, "users", `${username}`), {
            contributionArray: tempContributionArray,
        });
    }
}

export default new RepositoryService();
