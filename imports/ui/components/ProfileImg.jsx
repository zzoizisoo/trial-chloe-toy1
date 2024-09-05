import React from "react"

export default ({src, size})=> {
    return <img 
            style={{
                display: "inline-block", 
                width:size || 30, 
                height: size || 30,
                borderRadius: '50%'
            }}
            src={src || '/profile.png'}
            />
    
}