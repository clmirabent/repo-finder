import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Box, CardActionArea, Card, CardContent, CardMedia, Typography } from "@mui/material"


import { IUserInfo } from "../../types/UserInteface";

interface UserDataComponentProp {
    onUserLoaded?: (userInfo: IUserInfo) => void
}

/**
 ** Component that displays user data.
 * @param {UserDataComponentProp} props - The props for this component.
 */

function UserDataComponent(props: UserDataComponentProp) {

    // Access the current route information:
    const location = useLocation()

    const [user, setUser] = useState<IUserInfo>()

    useEffect(
        () => {
            // Get the user info from the route state and notify parent component.
            const userInfo = location.state["user"];
            setUser(userInfo);
            // Inform parent component if user data is available and onUserLoaded prop is provided:
            if (userInfo && props.onUserLoaded) {
                props.onUserLoaded(userInfo)
            }
        }, [location]
    )


    return <Box display="flex" alignItems={"flex-start"} flexDirection={"column"}>
        <Card sx={{ maxWidth: 345 }} onClick={() => open(user?.url)}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="auto"
                    image={user?.avatarUrl ? user.avatarUrl : ""}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" >
                        {user?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {user?.login}
                    </Typography>
                    {user?.bioHTML && <div dangerouslySetInnerHTML={{ __html: user.bioHTML }} />}
                </CardContent>
            </CardActionArea>
        </Card>

    </Box >

}



export default UserDataComponent