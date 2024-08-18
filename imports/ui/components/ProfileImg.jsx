import React from "react"

export default ({userId, size})=> {
    return <img 
            style={{display: "inline-block", width:size || 30, height: size || 30}}
            src={`https://${Meteor.settings.public.S3_BUCKET}.s3.ap-northeast-2.amazonaws.com/userProfileImg/${userId}.png`}
            />
    
}