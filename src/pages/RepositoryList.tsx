import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Grid } from "@mui/material"
import toast from "react-hot-toast"


import { IUserInfo } from "../types/UserInteface";
import { IRepoInfo } from "../types/RepoInterface";
import { IConnection } from "../types/GitHubApi";

import RepoService from "../services/api/repositoryService";

import UserDataComponent from "../components/userData/UserDataComponent";
import RepoFilterComponent from "../components/repoFilter/RepoFilterComponent";
import InfinityScrollComponent from "../components/infinityScroll/InfinityScrollComponent";
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

    // Get all reposities for the current user. This hook runs when the component mounts and whenever the 'user' dependency changes.
    useEffect(
        () => {
            if (user?.login) {
                // Construct the query state to fetch the username.
                const _query = `user:${user.login}`
                // Set the query state with the constructed query and language
                setQuery({
                    query: _query,
                    language: "all"
                })
                // Call the getRepos function to retrieve the repositories
                getRepos(_query, "all", true)
            }
        }
        , [user])

    /**
     ** Function to handle the change in query.
     * @param {IQueryInfo} newQuery - The new query information.
    */
    function onQueryChanged(newQuery: IQueryInfo) {
        // Check if user is logged in.
        if (user) {
            // Set the new query.
            setQuery(newQuery)
            // Get repos based on the new query.
            getRepos(newQuery.query, newQuery.language, true)
        }
    }

    /**
     ** Fetches additional data for repositories based on current query, language, and pagination information.
     * This function is for pagination purposes.
     */
    function fetchData() {
        // Calling the getRepos() function with specific arguments
        // query.query: The query value
        // query.language: The language value
        // false: A boolean value indicating whether to use connectionInfo or not (in this case, it is set to false)
        // connectionInfo?.pageInfo.endCursor: The value of pageInfo's endCursor property if connectionInfo exists, otherwise it is undefined
        getRepos(query.query, query.language, false, connectionInfo?.pageInfo.endCursor);
    }

    /**
** Retrieves repositories based on a query, language, override flag, and optional cursor.
* @param query - The search query for repositories. 
* @param language - The programming language to filter repositories by. If "all", includes repositories of any language.
* @param override - Indicates whether to override existing data. If True, overrides any existing repository data with the new results. Otherwise, appends to existing data.
* @param cursor - Pagination cursor for loading subsequent pages of results.
*/
    async function getRepos(query: string, language: string, override: boolean = false, cursor?: string) {
        const condition = `${query ? query : `user:${user?.login}`} ${language !== "all" ? `language:${language}` : ""}`

        // Fetch repositories from the external service using the constructed query and cursor (if provided).
        const connection = await RepoService.queryRepo(condition, cursor);

        // Extract unique programming languages from the retrieved repository nodes and filter them if language is null
        const languages = connection?.nodes.map(repo => repo.primaryLanguage?.name).filter(lang => lang) ?? [];
        if (!override) {
            //Concat new languages w/ existing ones, converting to set to remove duplicated languages and then converted to an array
            setAvailableLanguage(language => Array.from(new Set(language?.concat(languages))))
            // Append new repositories to existing results, ensuring data consistency.
            setRepoResponse(currentRepos => [...currentRepos, ...connection?.nodes ?? []]);
        }
        // Replace existing language and repository data with new results.
        else {
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