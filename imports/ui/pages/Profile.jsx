import { Button } from "@mui/joy";
import React from "react";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { UploadObject } from "../../../s3";
import { useTracker } from 'meteor/react-meteor-data';

import { v4 as uuidv4 } from 'uuid';


export default () => {
    const user = useTracker(()=>Meteor.user())
    let img;

    const handleImgChange = (e) => {
        img = e.target.files[0]
    }
    const onLogout = () => {
        Meteor.logout();
        FlowRouter.go('/')
    }


    const handleSubmit = async () => {
        const fileId = uuidv4();
        try {
            await UploadObject(`userProfileImg/${fileId}.png`, img)
            const url = `https://${Meteor.settings.public.S3_BUCKET}.s3.ap-northeast-2.amazonaws.com/userProfileImg/${fileId}.png`
            Meteor.callAsync('updateUserProfileImg', url).then((res)=> console.log(res))

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <><h1> Profile</h1>
            <img 
                style={{width: 200, height:200}}
                src={user.profile?.profileImgUrl
                     || 'https://cdn.vectorstock.com/i/2000v/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.avif'} 
             alt=""/> 
            <input type="file" accept='image/*' onChange={handleImgChange} />
    
            <div>{user.profile.name}</div>
            <div>{user.emails && user.emails[0]?.address}</div>


            <div>
                <Button> Cancel </Button>
                <Button onClick={handleSubmit}> OK </Button></div>
            <Button onClick={onLogout}>Log out</Button>
        </>)
}