import React from 'react'

function RadioButton({ checked, handler, labelText }) {
    const id = Math.random().toString()
    return <span style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '1em',
    }} >
        <input
            style={{ marginRight: '.5em' }}
            type='radio'
            id={id}
            checked={checked}
            onChange={handler}
        />
        <label htmlFor={id}>{labelText}</label>
    </span>
}

export default RadioButton