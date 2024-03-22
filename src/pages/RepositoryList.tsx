import { useEffect, useState, ChangeEvent } from "react";
import { useLocation } from "react-router-dom";

import InfiniteScroll from 'react-infinite-scroll-component';

import { IUserInfo } from "../types/UserInteface";
import { IRepoInfo } from "../types/RepoInterface";

import RepoService from "../services/api/repositories";

import { SearchBarComponent } from "../components/searchBar/SearchBarComponent";
import { IConnection } from "../types/GitHubApi";


interface IQueryInfo {
    query: string,
    language: string
}

function RepositoryList() {
    const location = useLocation()

    const [repoResponse, setRepoResponse] = useState<IRepoInfo[]>([])
    const [user, setUser] = useState<IUserInfo>()
    const [connectionInfo, setConnectionInfo] = useState<IConnection<IRepoInfo>>()
    const [query, setQuery] = useState<IQueryInfo>({ query: "", language: "" })
    const [availableLanguage, setAvailableLanguage] = useState<string[]>()

    useEffect(
        () => {
            setUser(location.state["user"]);
        }, [location])

    useEffect(
        () => { getRepositories(); }
        , [user])

    function getRepositories() {
        if (user?.login) {
            const _query = `user:${user.login}`
            setQuery({
                query: _query,
                language: ""
            })
            getRepos(_query, "")
        }
    }


    function onSearchSubmit(repositoryName: string) {
        const userName = user?.login
        if (userName) {
            const _query = `repo:${userName}/${repositoryName}`
            setQuery(currentQuery => ({
                ...currentQuery,
                query: _query
            }))
            getRepos(_query, query.language, true)
        }
    }

    function changeLanguage(event: ChangeEvent<HTMLSelectElement>): void {
        const newLanguage = event.currentTarget.value
        setQuery(currentQuery => ({ ...currentQuery, language: newLanguage }));
        getRepos(query.query, newLanguage, true);
    }

    function fetchData() {
        getRepos(query.query, query.language, false, connectionInfo?.pageInfo.endCursor);
    }

    async function getRepos(query: string, language: string, override: boolean = false, cursor?: string) {
        const condition = `${query} ${language ? `language:${language}` : ""}`
        const connection = await RepoService.queryRepo(condition, cursor);

        // this get languages from returned repos and filter them if language is null
        const languages = connection?.nodes.map(repo => repo.primaryLanguage?.name).filter(lang => lang) ?? [];
        if (!override) {
            //concat new languages w/ existing ones, converting to set to remove duplicated languages and then converted to an array
            setAvailableLanguage(language => Array.from(new Set(language?.concat(languages))))
            setRepoResponse(currentRepos => [...currentRepos, ...connection?.nodes ?? []]);
        } else {
            setAvailableLanguage(Array.from(new Set(languages)));
            setRepoResponse(connection?.nodes ?? [])
        }

        setConnectionInfo(connection);
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
            <select onChange={changeLanguage}>
                <option value="">All</option>
                {availableLanguage?.map(lang => <option key={lang} value={lang}>{lang}</option>)}
            </select>
            {
                connectionInfo &&
                <div>
                    <div> <span> Tiene </span>{connectionInfo?.totalCount} repositorios </div>
                    <InfiniteScroll
                        dataLength={repoResponse.length}
                        next={fetchData}
                        hasMore={connectionInfo.pageInfo.hasNextPage}
                        loader={<p>Loading...</p>}
                    >
                        <ul>
                            {repoResponse?.map((repository) =>
                                <li key={repository.id}>
                                    <div>
                                        {repository.name}
                                    </div>
                                    <div dangerouslySetInnerHTML={{ __html: repository.descriptionHTML }}>
                                    </div>
                                    <div>
                                        {repository.languages.nodes.map((lang) => <span style={{ backgroundColor: lang.color }} key={lang.name}>{lang.name}</span>)}
                                    </div>
                                </li>)}
                        </ul>

                    </InfiniteScroll>
                </div>
            }
        </>
    )
}

export default RepositoryList