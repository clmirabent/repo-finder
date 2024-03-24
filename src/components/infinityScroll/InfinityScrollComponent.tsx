import InfiniteScroll from 'react-infinite-scroll-component';
import { Box, Chip, Stack, Typography, List, ListItem, Grid, Divider } from "@mui/material"

import { IConnection } from '../../types/GitHubApi';
import { IRepoInfo } from "../../types/RepoInterface";


interface InfinityScrollPropsComponent {
    connectionInfo?: IConnection<IRepoInfo>,
    repositories: IRepoInfo[],
    fetchData: () => void
}

/*
 * Component for infinity scroll through repositories. Using the infinite scroll library
 */

function InfinityScrollComponent(props: InfinityScrollPropsComponent) {
    return <Box display={"flex"} alignItems={"flex-start"} flexDirection={"column"}>
        <Box padding={"10px"}>
            <Typography variant="subtitle2" >
                This user have {props.connectionInfo?.totalCount} repositories
            </Typography>
        </Box>
        {
            props.connectionInfo &&
            <Box id="reposContainer" sx={{ p: 2 }} maxHeight={400} overflow="auto" width="100%">
                <InfiniteScroll

                    dataLength={props.repositories.length}
                    scrollableTarget="reposContainer"
                    next={props.fetchData}
                    hasMore={props.connectionInfo.pageInfo.hasNextPage}
                    loader={<p>Loading...</p>}
                >
                    <List>
                        {props.repositories?.map((repository) =>
                            <Box key={repository.id}>
                                <ListItem onClick={() => open(repository.url)} sx={{ cursor: "pointer" }}>
                                    <Grid container width="100%">
                                        <Grid item xs={12}>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {repository.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div dangerouslySetInnerHTML={{ __html: repository.descriptionHTML }}>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Stack direction="row" gap={1} flexWrap="wrap">
                                                {repository.languages.nodes.map(lang =>
                                                    <Chip style={{ backgroundColor: lang.color }} key={lang.color} label={lang.name} size="small" />
                                                )}
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider variant="middle" component="li" />
                            </Box>
                        )}


                    </List>
                </InfiniteScroll>
            </Box>
        }
    </Box >

}

export default InfinityScrollComponent