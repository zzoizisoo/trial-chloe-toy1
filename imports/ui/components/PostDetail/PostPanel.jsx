import React, { useState, useEffect } from 'react';

import { Button } from "@mui/joy";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import ProfileImg from '../ProfileImg';
import FavoriteButton from './FavoriteButton';


export default () => {
    const postId = FlowRouter.getParam("pid")
    const [post, setPost] = useState({
        title: '',
        description: '',
        imageUrl: '',
        content: '',
        createdBy: ''
    })

    const [author, setAuthor] = useState({
        profileImgUrl: '',
        name: '',
    })

    useEffect(() => {
        Meteor.callAsync('getPost', postId).then(post => {
            setPost(post)
            Meteor.callAsync('getUserInfo', post.createdBy).then(user => {
                setAuthor({
                    profileImgUrl: user.profile.profileImgUrl,
                    name: user.profile.name
                })
            })
        })
    }, [])


    return <div style={{position: 'relative'}}>
        <h1>{post.title}</h1>

        <FavoriteButton />

        <p>{post.description}</p>
        {post.imageUrl && <img style={{ width: '100%' }} src={post.imageUrl} />}

        <p>{post.content}</p>

        {post.createdBy === Meteor.userId() && <Button>Post Edit</Button>}

        <div>
            <ProfileImg src={author.profileImgUrl} />
            <div>{author.name}</div>
        </div>
    </div>
}

