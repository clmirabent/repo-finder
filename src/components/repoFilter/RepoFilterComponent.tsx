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

function RepoFilterComponent(props: RepoFilterComponentProp) {
    const [queryInfo, setQueryInfo] = useState<IQueryInfo>({
        query: ``,
        language: "all"
    })

    useEffect(() => {
        props.onQueryChanged(queryInfo)
    }, [queryInfo])

    function onSearchSubmit(input: string) {
        let newQuery = ""
        if (input)
            newQuery = `repo:${props.user?.login}/${input}`
        setQueryInfo(_query => ({ ..._query, query: newQuery }))
    }

    function onChangeLanguage(newLanguage: SelectChangeEvent<string>) {
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