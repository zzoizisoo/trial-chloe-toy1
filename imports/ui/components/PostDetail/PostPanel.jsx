import React, {useState, useEffect} from 'react';
import { Button } from "@mui/joy";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';


export default () => {
    const postId = FlowRouter.getParam("pid")
    const [post, setPost] = useState({
        title:'',
        description:'',
        imageUrl: '',
        content: '',
        createdBy:''
    })

    const [author, setAuthor] = useState({ 
        profileImgUrl: '',
        name: '',
    })

    useEffect(()=>{ 
        Meteor.callAsync('getPost', postId).then(post=>{
            setPost(post)
            Meteor.callAsync('getUserInfo', post.createdBy).then(user => {
                setAuthor({
                    profileImgUrl: user.profile.profileImgUrl,
                    name: user.profile.name
                })
            })
        })
    },[])
    
    

    return <div>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        {post.imageUrl && <img style={{width:'100%'}} src={post.imageUrl} />}

        <p>{post.content}</p>

        {post.createdBy === Meteor.userId() && <Button>Post Edit</Button>}

        <div>
            <img src={author.profileImgUrl} />
            <div>{author.name}</div>
        </div>
    </div>
}