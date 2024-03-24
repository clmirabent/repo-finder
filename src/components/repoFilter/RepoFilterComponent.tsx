import { useState, useEffect } from "react";
import SearchBarComponent, { SearchBarSize } from "../searchBar/SearchBarComponent";


import { IUserInfo } from "../../types/UserInteface";

import { InputLabel, FormControl, MenuItem, Grid } from "@mui/material"
import Select, { SelectChangeEvent } from '@mui/material/Select';


interface IQueryInfo {
    query: string,
    language: string
}

interface RepoFilterComponentProp {
    user?: IUserInfo,
    availableLanguages: string[],
    onQueryChanged: (query: IQueryInfo) => void
}

/*
 * Component for filtering repositories.
 ** @param {RepoFilterComponentProps} props - The props for RepoFilterComponent.
 */

function RepoFilterComponent(props: RepoFilterComponentProp) {

    // State for managing query and language filters:
    const [queryInfo, setQueryInfo] = useState<IQueryInfo>({
        query: ``,
        language: "all"
    })

    /**
    * Calls props.onQueryChanged with the updated queryInfo when the queryInfo changes. informing the parent component
    * of the updated query and language filters.
    */

    useEffect(() => {
        props.onQueryChanged(queryInfo)
    }, [queryInfo])

    /**
    * Updates the queryInfo state based on the input string.
    * @param {string} input - The input string for the search query*/
    function onSearchSubmit(input: string) {
        let newQuery = ""
        /** If input is not empty, it sets the new query to a string that is constructed to search for 
         * repositories on GitHub based on the user's username.*/
        if (input)
            newQuery = `repo:${props.user?.login}/${input}`
        setQueryInfo(_query => ({ ..._query, query: newQuery }))
    }

    /**
    * This function updates the language value in the queryInfo object  when the language selection is changed.
    * @param newLanguage - The new language selection object. */

    function onChangeLanguage(newLanguage: SelectChangeEvent<string>) {
        // Update the queryInfo state with the selected language:
        setQueryInfo(_query => ({ ..._query, language: newLanguage.target.value }))
    }

    return <Grid container spacing={2} alignItems="top">
        <Grid item xs={12} md>
            <SearchBarComponent placeholder="Find repository..." onSearch={onSearchSubmit} size={SearchBarSize.lg} />
        </Grid>
        <Grid item xs={12} md={3}>
            <FormControl fullWidth>
                <InputLabel id="language-label">Language</InputLabel>
                <Select
                    value={queryInfo.language}
                    label="Language"
                    onChange={onChangeLanguage}
                >
                    <MenuItem value="all" >All Languages</MenuItem>
                    {props.availableLanguages?.map(lang => <MenuItem key={lang} value={lang}>{lang}</MenuItem>)}
                </Select>
            </FormControl>
        </Grid>
    </Grid>


}


export default RepoFilterComponent;