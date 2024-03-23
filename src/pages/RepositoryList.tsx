import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Grid } from "@mui/material"
import toast from "react-hot-toast"


import { IUserInfo } from "../types/UserInteface";
import { IRepoInfo } from "../types/RepoInterface";
import { IConnection } from "../types/GitHubApi";

import RepoService from "../services/api/repositories";

import UserDataComponent from "../components/userData/UserDataComponent";
import RepoFilterComponent from "../components/repoFilter/RepoFilterComponent";
import InfinityScrollComponent from "../components/infinityScroll/InfinityScrollComponent";
import imageLogo from "../assets/imageLogo.png"
import LogoComponent from "../components/logo/LogoComponent";



interface IQueryInfo {
    query: string,
    language: string
}

function RepositoryList() {
    const [repoResponse, setRepoResponse] = useState<IRepoInfo[]>([])
    const [user, setUser] = useState<IUserInfo>()
    const [connectionInfo, setConnectionInfo] = useState<IConnection<IRepoInfo>>()
    const [query, setQuery] = useState<IQueryInfo>({ query: "", language: "all" })
    const [availableLanguage, setAvailableLanguage] = useState<string[]>([])

    useEffect(
        () => { getRepositories(); }
        , [user])

    function getRepositories() {
        if (user?.login) {
            const _query = `user:${user.login}`
            setQuery({
                query: _query,
                language: "all"
            })
            getRepos(_query, "all", true)
        }
    }

    function onQueryChanged(newQuery: IQueryInfo) {
        if (user) {
            setQuery(newQuery)
            getRepos(newQuery.query, newQuery.language, true)
        }
    }

    function fetchData() {
        getRepos(query.query, query.language, false, connectionInfo?.pageInfo.endCursor);
    }

    async function getRepos(query: string, language: string, override: boolean = false, cursor?: string) {
        const condition = `${query ? query : `user:${user?.login}`} ${language !== "all" ? `language:${language}` : ""}`
        const connection = await RepoService.queryRepo(condition, cursor);

        // this get languages from returned repos and filter them if language is null
        const languages = connection?.nodes.map(repo => repo.primaryLanguage?.name).filter(lang => lang) ?? [];
        if (!override) {
            //concat new languages w/ existing ones, converting to set to remove duplicated languages and then converted to an array
            setAvailableLanguage(language => Array.from(new Set(language?.concat(languages))))
            setRepoResponse(currentRepos => [...currentRepos, ...connection?.nodes ?? []]);
        } else {
            if (!(connection?.nodes.length))
                toast.error("Repository not found")
            setAvailableLanguage(Array.from(new Set(languages)));
            setRepoResponse(connection?.nodes ?? [])
        }

        setConnectionInfo(connection);
    }

    return (
        <>
            <Grid container justifyContent="start">
                <Grid item>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <LogoComponent />
                    </Link>
                </Grid>
            </Grid>
            <Grid container justifyContent="center">
                <Grid container spacing={2} alignItems="top" >
                    <Grid item>
                        <UserDataComponent onUserLoaded={setUser} />
                    </Grid>
                    <Grid item xs>
                        <RepoFilterComponent availableLanguages={availableLanguage} user={user} onQueryChanged={onQueryChanged} />
                        <InfinityScrollComponent connectionInfo={connectionInfo} fetchData={fetchData} repositories={repoResponse} />
                    </Grid>
                </Grid>
            </Grid>
        </>
    )

}

export default RepositoryList;