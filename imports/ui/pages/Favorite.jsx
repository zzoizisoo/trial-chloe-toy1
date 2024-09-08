import React, {useState, useEffect} from "react";
import PostsList from "../components/PostsList";
import { useFetch } from "../hooks";

export default () => { 
    const posts = useFetch('getFavoritePosts')
    return <>
        <h1>Favorite</h1>
        <PostsList posts={posts} />
    </>
}