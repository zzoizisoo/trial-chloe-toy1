import React, {useState, useEffect} from 'react';
import { Button, Grid } from "@mui/joy";
import { PostPanel, CommentsPanel } from '../components';

export default ({postId}) =>{  

    useEffect(()=>{
        if(Meteor.user()) {Meteor.callAsync('increaseViewCount', postId)}
    }, [postId, Meteor.user()])
    
    return <Grid container spacing={2}>
        <Grid xs={12} md={6}>
            <PostPanel/>
        </Grid>
        <Grid xs={12} md={6}>
            <CommentsPanel />
        </Grid>
    </Grid>
}