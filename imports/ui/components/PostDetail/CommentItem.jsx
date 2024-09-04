import React from 'react';
import ProfileImg from '../ProfileImg';

export default ({comment}) =>{ 
    const createdAtInLocaleString = new Date(comment.createdAt).toLocaleString('ko-kr')

    return <div style={{display:'flex'}}>

        <div> <ProfileImg src={comment.user.profile.profileImgUrl}/></div>
        <div>          
            <div>{comment.user.profile.name} {createdAtInLocaleString}</div>
            <div>{comment.content}</div>
        </div>

    </div>
}