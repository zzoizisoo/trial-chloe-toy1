import React from "react"
import ProfileImg from "../ProfileImg"

export default ({ chat,imgUrl }) => {
    return <div style={{ display:'flex', alignSelf: 'flex-end' }}>
        <div>
            {`${new Date(chat.createdAt)}`}
        </div>
        <div>
            {chat.content}
        </div>
        <div>
            <ProfileImg size={30} src={imgUrl}/> 
        </div>
        
    </div>
}