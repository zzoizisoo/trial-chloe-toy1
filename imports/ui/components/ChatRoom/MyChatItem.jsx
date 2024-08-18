import React from "react"
import ProfileImg from "../ProfileImg"

export default ({ chat }) => {
    return <div style={{ display:'flex', alignSelf: 'flex-end' }}>
        <div>
            {chat.content}
        </div>
        <div>
            <ProfileImg size={30} userId={chat.createdBy}/> 
        </div>
    </div>
}