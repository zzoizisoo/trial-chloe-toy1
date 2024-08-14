import React from 'react'
import { AspectRatio, Typography, Card, Grid } from '@mui/joy';

export default ({
    title,
    description,
    imageUrl,
    // likesCount,
    // commentsCount,
    viewCount,
})=>{
    return (
    <Grid xs={5} md={1}>
        <Card
            orientation="vertical"
            size="sm"
            variant="soft"
        >

            <img
                src={imageUrl}
                //??? srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
                loading="lazy"
                alt=""
            />
        
            <Typography level="title-lg">{title}</Typography>
            <Typography level="body-sm">{description}</Typography>

            {viewCount}
        </Card>
    </Grid>
)}