import React, {useState, useEffect} from "react";
import PostsList from "../components/PostsList";

export default () => { 
    const [posts, setPosts] = useState([])
    useEffect(()=>{ 
        Meteor.callAsync("getFavoritePosts").then((res)=>setPosts(res));
    },[])
    
    return <>
        <h1>Favorite</h1>
        <PostsList posts={posts} />
    </>
}