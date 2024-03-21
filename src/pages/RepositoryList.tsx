import { useEffect, useState } from "react";
import UserService from "../services/api/user";
import { useLocation } from "react-router-dom";
import { IUserInfo, IUserRequestResponse } from "../types/UserInteface";
import { SearchBarComponent } from "../components/searchBar/SearchBarComponent";
import RepoService from "../services/api/repositories"
import { IRepoInfo } from "../types/RepoInterface";


function RepositoryList() {
    const location = useLocation()

    const [repoResponse, setRepoResponse] = useState<IRepoInfo[]>()
    const [user, setUser] = useState<IUserInfo>()

    useEffect(
        () => {
            setUser(location.state["user"]);
        }, [location])

    useEffect(
        () => { getRepositories(); }
        , [user])

    async function getRepositories() {
        if (user?.login) {
            const allRepos = await UserService.getAllRepo(user.login);
            setRepoResponse(allRepos?.user.repositories.nodes);
        }
    }


    async function onSearchSubmit(repositoryName: string) {
        const userName = user?.login
        if (userName) {
            const repo = await RepoService.getByRepo(userName, repositoryName);
            if (repo) {
                setRepoResponse([repo.repository])
            } else {
                alert("Not found")
            }
        }
    }


    return (
        <>
            <div>
                {user?.avatarUrl && <img src={user.avatarUrl} />}
                <br />
                {user?.name}
                <br />
                {user?.login}
                <br />
                {user?.bioHTML && <div dangerouslySetInnerHTML={{ __html: user.bioHTML }} />}
            </div>
            <SearchBarComponent placeholder="Enter repository name..." onSearch={onSearchSubmit} />
            <div>
                <ul>
                    {repoResponse?.map((repository) =>
                        <li key={repository.id}>
                            <div>
                                {repository.name}
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: repository.descriptionHTML }}>
                            </div>
                            <div>
                                {repository.languages.nodes.map((lang) => <span style={{ backgroundColor: lang.color }}>{lang.name}</span>)}
                            </div>
                        </li>)}

                </ul>
            </div>
        </>
    )
}

export default RepositoryList