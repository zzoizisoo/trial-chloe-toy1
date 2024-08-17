import React from "react"

export default ({chat}) =>{ 
    return <div style={{alignSelf:'flex-end'}}>
        {chat.content}
    </div>
}