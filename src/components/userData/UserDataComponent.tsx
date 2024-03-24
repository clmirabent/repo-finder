import { Box, CardActionArea, Card, CardContent, CardMedia, Typography } from "@mui/material"


import { IUserInfo } from "../../types/UserInteface";

interface UserDataComponentProp {
    user?: IUserInfo
}

/**
 ** Component that displays user data.
 * @param {UserDataComponentProp} props - The props for this component.
 */

function UserDataComponent(props: UserDataComponentProp) {

    return <Box display="flex" alignItems={"flex-start"} flexDirection={"column"}>
        <Card sx={{ maxWidth: 345 }} onClick={() => open(props.user?.url)}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="auto"
                    image={props.user?.avatarUrl ? props.user.avatarUrl : ""}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" >
                        {props.user?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.user?.login}
                    </Typography>
                    {props.user?.bioHTML && <div dangerouslySetInnerHTML={{ __html: props.user.bioHTML }} />}
                </CardContent>
            </CardActionArea>
        </Card>

    </Box >

}



export default UserDataComponent