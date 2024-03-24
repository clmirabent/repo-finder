import { useState } from "react";
import { Box, TextField, Button, Grid, InputAdornment } from "@mui/material"
import { Search } from '@mui/icons-material';

enum SearchBarSize {
    md,
    lg
}

interface SearchBarComponentProp {
    onSearch?: (input: string) => void,
    placeholder: string,
    size?: SearchBarSize
}

/*
 * Component that allows users to input a search query and trigger a search action.
  @param props - The properties for the SearchBarComponent.
 */


function SearchBarComponent(props: SearchBarComponentProp) {
    const [input, setInput] = useState<string>("");

    // The size of the search bar. Defaults to medium if not specified in the props
    const size = props.size ?? SearchBarSize.md;

    /**
     * Triggers the search action if the onSearch prop is provided.
     */
    function onSearch() {
        if (props.onSearch)
            props.onSearch(input)
    }

    return <Box>
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            )
                        }}
                        variant="outlined"
                        onChange={(e) => setInput(e.currentTarget.value)} placeholder={props.placeholder}
                        fullWidth
                        size={size == SearchBarSize.lg ? "medium" : "small"}
                    />
                </Box>
            </Grid>
            <Grid item xs={12} sm="auto">
                <Button
                    onClick={onSearch}
                    variant="contained"
                    sx={{ width: "100%" }}
                    size={size == SearchBarSize.lg ? "large" : "medium"}
                >Search</Button>
            </Grid>
        </Grid>
    </Box>
}

export default SearchBarComponent;
export { SearchBarSize };