import React from 'react'

export default ({justify, align, direction, children, gap, className,style}) => { 
    const styles = {
        display: 'flex',
        justifyContent: justify || "inherit",
        alignItems: align || "inherit",
        flexDirection: direction || "row",
        gap: gap || "inherit"
    }

    return <div className={className || ""} style={{...styles, ...style}}>
        {children}
    </div>
}