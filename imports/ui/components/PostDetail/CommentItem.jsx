import React from 'react';

export default ({comment}) =>{ 
    console.log(comment)

    return <div style={{display:'flex'}}>

        <div> author profile image goes here</div>

        <div>
            <div>author nickname goes here, and createdAt as well</div>

            <div>{comment.content}</div>
        </div>

    </div>
}