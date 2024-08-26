import { Mongo } from 'meteor/mongo';
import { Button } from "@mui/joy";
import React, { useState } from "react";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { UploadObject } from '../../../s3'
import { v4 as uuidv4 } from 'uuid';


export default () => {
    const [post, setPost] = useState({
        title: "",
        description: "",
    })
    const [postImage, setPostImage] = useState(undefined)
    const [content, setContent] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value })
    }

    const handleImageChange = (e) => {
        setPostImage(e.target.files[0]);
    }

    const handleContentChange = (e) => {
        setContent(e.target.value)
    }

    const handleSubmit = async () => {
        // TODOS:restrict image resolution, size
        if (!Meteor.user()) return;
        if (!post.title || !post.description || !content) return;

        try {
            let result;
            // TODOS: 이미지 업로드를 나중에..? 
            if (postImage) {
                const { _str: postId } = new Mongo.ObjectID();
                const fileId = uuidv4();
                const imageUrl = await UploadObject(`postImg/${postId}/${fileId}.png`, postImage);
                result = await Meteor.callAsync('addPost', {
                    // _id: postId,
                    title: post.title,
                    description: post.description,
                    content: content,
                    imageUrl
                })
            } else {
                result = await Meteor.callAsync('addPost', {
                    title: post.title,
                    description: post.description,
                    content: content,
                })
            }
            FlowRouter.go(`/post/${result}`)
        } catch (err) {
            console.error(err)
        }
    }
    
    return <>
        <h1> Post Write Page</h1>

        <form>
            <div>
                <label htmlFor="title">Title</label>
                <input name="title" value={post.title} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <input name="description" value={post.description} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="postImage">Image</label>
                <input name="postImage" type="file" accept="image/*" onChange={handleImageChange} />
            </div>

            <div>
                <label htmlFor="content">Content</label>
                <textarea name="content" value={content} onChange={handleContentChange} />
            </div>

            <Button> Cancel </Button>
            <Button onClick={handleSubmit}> Save </Button>
        </form>
    </>
}