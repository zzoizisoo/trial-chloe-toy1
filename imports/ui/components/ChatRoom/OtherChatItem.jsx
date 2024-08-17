import React from "react"

export default ({chat}) =>{ 
    return <div style={{alignSelf: 'flex-start'}}>
        {chat.content}
    </div>
}