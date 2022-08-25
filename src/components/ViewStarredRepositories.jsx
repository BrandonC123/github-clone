import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import RepositoryService from "../services/RepositoryService";
import { UserContext } from "./UserContext";

const ViewStarredRepositories = ({}) => {
    const user = useContext(UserContext);
    const [starredRepoList, setStarredRepoList] = useState([]);

    useEffect(() => {
        if (user) {
            RepositoryService.getStarredRepoList(user.displayName).then(
                (repos) => {
                    setStarredRepoList(repos);
                    console.log(repos);
                }
            );
        }
    }, [user]);
    return <div>star</div>;
};

export default ViewStarredRepositories;
