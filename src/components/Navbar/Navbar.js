import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs, faTimes, } from '@fortawesome/free-solid-svg-icons'

import NavButtons from './NavButtons'

function Navbar({ handleSetSettingsView }) {
    const styleNavbar = {
        backgroundColor: '#181818',
        color: '#ddd',
        position: 'fixed',
        top: '0',
        left: '0',
        height: '3em',
        width: '100vw',
        borderBottom: '2px solid black',
        display: 'flex',
        alignItems: 'center',
        zIndex: '99999',
        justifyContent: state && !state.settingsView
            ? 'space-between'
            : 'flex-end',

    }

    const state = useSelector(state => state)
    const dispatch = useDispatch()

    const fun = () => {
        dispatch({ type: 'TOGGLE_SETTINGS_VIEW' })
        handleSetSettingsView()
    }

    return <div style={{ ...styleNavbar, }}>
        {!state.settingsView && <NavButtons />}
        <div
            style={{
                cursor: 'pointer',
                marginRight: '1em',
                display: 'block',
            }}
            onClick={fun}
        >
            <FontAwesomeIcon
                icon={!state.settingsView ? faCogs : faTimes}
                size='2x'
                color='gray'
            />
        </div>
    </div>
}

export default Navbar