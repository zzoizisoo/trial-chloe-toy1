import React from "react"
import ProfileImg from "../ProfileImg"

export default ({chat}) =>{ 
    return <div style={{display:'flex', alignSelf: 'flex-start'}}>
        <div>
            <ProfileImg size={30} userId={chat.createdBy}/> 
        </div>
        <div>
            {chat.content}
        </div>
        
    </div>
}