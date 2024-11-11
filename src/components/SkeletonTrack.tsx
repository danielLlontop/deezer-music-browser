import { AspectRatio, Card, Skeleton, Typography } from "@mui/joy";
import { Grid2 } from "@mui/material";

export function SkeletonTrack () {
    return (
        <Grid2 size={{lg: 5,md: 5, sm: 4, xs: 6}} >
            <Card variant="plain" sx={{width: '100%',}}>
             <AspectRatio ratio="1" > 
                <Skeleton variant="overlay">
                    <img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="/>
                </Skeleton>
             </AspectRatio>
             
             <Typography>
                <Skeleton>
                Lorem ipsum is placeholder text commonly
                </Skeleton>
             </Typography>

            </Card>
        </Grid2>
    )
}