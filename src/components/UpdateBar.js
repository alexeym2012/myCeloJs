import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import writeSettings from '../functions/writeSettings'

import axios from 'axios'

import electron from 'electron'
import styles from './UpdateBar.module.css'

const { clipboard, shell, app } = electron.remote

function UpdateBar() {
    const [update, setUpdate] = useState(null)
    const dispatch = useDispatch()
    const updateCheckDone = useSelector(state => state.updateCheckDone)
    const settings = useSelector(state => state.settings)
    const appVersion = app.getVersion()

    const isHigherVersion = (tag, current) => {
        let arrTag = tag.split('.')
        let arrCurrent = current.split('.')
        for (let i = 0; i < arrCurrent.length; i++) {
            if (arrTag[i] > arrCurrent[i]) {
                return true
            } else if (arrTag[i] < arrCurrent[i]) {
                return false
            }
        }
        return false
    }

    useEffect(() => {
        if (!updateCheckDone && settings) {
            console.log('CHECKING UPDATE')
            dispatch({
                type: 'UPDATE_CHECK_DONE',
            })


            let url = 'https://api.github.com/repos/sepi4/myCeloJs/releases/latest'
            axios.get(url)
                .then(x => {
                    if (x && x.data) {
                        let newTagName = x.data.tag_name
                        if (settings.ignoreUntil === newTagName) {
                            return
                        }
                        if (isHigherVersion(newTagName, appVersion)) {
                            const data = x.data
                            if (data.assets[0]) {
                                setUpdate({
                                    url: data.assets[0].browser_download_url,
                                    tagName: newTagName,
                                })
                            }
                        }
                    }
                })
        }

    }, [])


    const ignore = () => {
        const newSettings = {
            ...settings,
            ignoreUntil: update.tagName
        }
        setUpdate(null)
        writeSettings(newSettings, dispatch)
    }

    return <>
        {update
            ? <div className={styles.container}>
                <span>update to version {update.tagName}</span>

                <button
                    className={styles.btn}
                    onClick={() => {
                        shell.openExternal(update.url)
                    }}
                >download</button>

                <button
                    className={styles.btn}
                    onClick={() => {
                        clipboard.writeText(update.url)
                    }}
                >copy link</button>

                <button
                    className={styles.btn}
                    onClick={ignore}
                >ignore this version</button>
            </div>
            : null
        }
    </>
}

export default UpdateBar