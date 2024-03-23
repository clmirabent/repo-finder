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

function SearchBarComponent(props: SearchBarComponentProp) {
    const [input, setInput] = useState<string>("");

    const size = props.size ?? SearchBarSize.md;

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