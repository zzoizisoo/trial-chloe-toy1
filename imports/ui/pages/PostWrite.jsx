import { Button } from "@mui/joy";
import React, {useState} from "react";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import {UploadObject} from '../../../s3'

export default () => { 
    const [post, setPost] = useState({ 
        title:"",
        description:"",
    })
    const [image, setImage] = useState(undefined)
    const [content, setContent] = useState('')

    const handleChange =(e) => {
        const {name, value} = e.target;
        setPost({...post, [name]: value})
    }

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    }

    const handleContentChange = (e) => { 
        setContent(e.target.value)
    }

    const handleSubmit = async () => { 
        // TODOS: image upload 
        // if(!Meteor.user()) return;
        // if(!post.title || !post.description || !post.content) return;
        
        console.log('handlesubmit, ', post, content)

        const result = await Meteor.callAsync('addPost', {
            title: post.title,
            description: post.description,
            content: content
        })
        console.log(result)
        FlowRouter.go(`/post/${result}`)
    }

    return <>
        <h1> Post Write Page</h1>

        <form>
            <div>
                <label htmlFor="title">Title</label>
                <input name="title" value={post.title} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <input name="description" value={post.description} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="image">Image</label>

                <input name="image" type="file" accept="image/*" onChange={handleImageChange}/>
            </div>
            
            <div>
                <label htmlFor="content">Content</label>
                <textarea name="content" value={content} onChange={handleContentChange}/>
            </div>

            <Button> Cancel </Button>
            <Button onClick={handleSubmit}> Save </Button>
        </form>
    </>
}