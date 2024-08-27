import React, {useState, useEffect} from 'react'
import Grid from '@mui/joy/Grid';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { PostCard } from '../components';


export default () => {
    const [posts, setPosts] = useState([])
    useEffect(()=>{ 
        Meteor.callAsync("getPosts").then((res)=>setPosts(res));
    },[])

    const onPostClick = (p) => { 
        if(!Meteor.user()) return;
        FlowRouter.go(`/post/${p._id}`)
    }

    return <Grid container columns={5}>
        {posts && posts.map(p =>
            <PostCard
                key={p._id}
                title={p.title}
                description={p.description}
                imageUrl={p.imageUrl}
                onClick={() => onPostClick(p)}
            />
        )}
    </Grid>
}