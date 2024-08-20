import React from "react"
import ProfileImg from "../ProfileImg"

export default ({chat, imgUrl}) =>{ 
    return <div style={{display:'flex', alignSelf: 'flex-start'}}>
        
        <div>
            <ProfileImg size={30} src={imgUrl}/> 
        </div>
        <div>
            {chat.content}
        </div>
        <div>
            {`${new Date(chat.createdAt)}`}
        </div>
    </div>
}