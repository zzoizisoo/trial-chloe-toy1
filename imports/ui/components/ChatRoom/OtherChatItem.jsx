import React from "react"

export default ({chat}) =>{ 
    return <div style={{display:'flex', alignSelf: 'flex-start'}}>
        <div>
            <img
                style={{ width: 30, height: 30 }}
                src={`https://${Meteor.settings.public.S3_BUCKET}.s3.ap-northeast-2.amazonaws.com/userProfileImg/${chat.createdBy}.png`
                    || 'https://cdn.vectorstock.com/i/2000v/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.avif'}
                alt="" />
        </div>
        <div>
            {chat.content}
        </div>
        
    </div>
}