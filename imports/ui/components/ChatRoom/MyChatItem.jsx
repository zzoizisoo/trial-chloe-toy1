import React from "react"
import ProfileImg from "../ProfileImg"

export default ({ chat,imgUrl }) => {
    const date = new Date(chat.createdAt);
    
    return <div style={{ display:'flex', alignSelf: 'flex-end' }}>
        <div>
            {`${date.toLocaleString('ko-kr')}`}
        </div>
        <div>
            {chat.content}
        </div>
        <div>
            <ProfileImg size={30} src={imgUrl}/> 
        </div>
        
    </div>
}