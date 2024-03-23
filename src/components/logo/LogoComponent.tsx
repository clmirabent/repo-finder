import { Grid, Box, Typography } from "@mui/material"
import RepoLogo from "../../assets/github.png"


function LogoComponent() {
    return <Grid container paddingBottom={1} justifyContent="center" alignItems="center" gap={2}>
        <Box sx={{ backgroundColor: "white", borderRadius: "8px", borderColor: "white", borderWidth: 4, borderStyle: "solid" }} height={78}>
            <img src={RepoLogo} height={70} />
        </Box>
        <Typography variant="h3" color="white" fontWeight="bold">Repo Finder</Typography>
    </Grid>
}

export default LogoComponent;