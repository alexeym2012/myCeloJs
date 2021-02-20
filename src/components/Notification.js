import React from 'react'

function Notification({text, style}) {
    return <div style={{
        display: 'inline-block',
        color: '#ddd',
        backgroundColor: 'black',
        borderRadius: '0.2em',
        padding: '0 0.2em',
        margin: '0 0 0 0.2em',
        ...style,
    }}>{text}</div>
}

export default Notification