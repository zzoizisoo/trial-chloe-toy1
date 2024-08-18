import { Button } from "@mui/joy";
import React, { useState } from "react";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { S3 } from "../../../startup/client";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export default () => {
    const user = Meteor.user()
    let img;

    const handleImgChange = (e) => {
        img = e.target.files[0]
    }
    const onLogout = () => {
        Meteor.logout();
        FlowRouter.go('/')
    }


    const handleSubmit = async () => {
        const command = new PutObjectCommand({
            Bucket: Meteor.settings.public.S3_BUCKET,
            Key:`userProfileImg/${user._id}.png`,
            Body: img
        })

        try {
            const response = await S3.send(command);
            console.log('s3 response', response);
            const url = `https://${Meteor.settings.public.S3_BUCKET}.s3.ap-northeast-2.amazonaws.com/userProfileImg/${user._id}.png`
            Meteor.callAsync('updateUserProfileImg', url).then((res)=> console.log(res))

        } catch (err) {
            console.error('s3 error', err);
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