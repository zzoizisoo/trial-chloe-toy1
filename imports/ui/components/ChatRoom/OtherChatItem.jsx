import React from "react"
import ProfileImg from "../ProfileImg"

export default ({chat, imgUrl}) =>{ 
    const date = new Date(chat.createdAt);

    return <div style={{display:'flex', alignSelf: 'flex-start'}}>        
        <div>
            <ProfileImg size={30} src={imgUrl}/> 
        </div>
        <div>
            {chat.content}
        </div>
        <div>
         {`${date.toLocaleString('ko-kr')}`}
        </div>
    </div>
}