import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

export const Ribbon = React.memo(props => {
    const [ribbonTextStyle, setRibbonTextStyle] = useState({})
    const [ribbonContainerStyle, setRibbonContainerStyle] = useState({})
    const [ribbonText, setRibbonText] = useState('')

    const { controls } = useSelector(state => state.controls)
    const actions = useSelector(state => state.actions)

    useEffect(() => {
        const URL = window.location.href
        if (URL.includes('dashboard')) dispatch({ type: 'REMOVE_FROM_ACTIONS', payload: 'topRibbonVisible' })
        else dispatch({ type: 'UPDATE_ACTIONS', payload: { topRibbonVisible: true } })

    }, [window.location.href])

    const dispatch = useDispatch()
    useEffect(() => {
        if (controls && controls.topRibbonVisible) {
            setRibbonSettings()
            dispatch({ type: 'UPDATE_ACTIONS', payload: { topRibbonVisible: true } })
        }

    }, [controls])

    const setRibbonSettings = () => {
        var x = window.matchMedia("(max-width: 700px)")
        if (x.matches)
            setRibbonTextStyle({
                text: controls.topRibbon.text,
                fontSize: controls.topRibbon.mobile.fontSize,
            })
        else
            setRibbonTextStyle({
                text: controls.topRibbon.text,
                fontSize: controls.topRibbon.fontSize,
            })

        setRibbonContainerStyle({
            backgroundColor: controls.topRibbon.backgroundColor
        })
        setRibbonText(controls.topRibbon.text)
    }

    return (
        <div>
            {actions.topRibbonVisible &&
                <div className='top-ribbon-overlay'>
                    <div className='top-ribbon-container' style={{ ...ribbonContainerStyle }}>
                        <div className='top-ribbon'>
                            <FontAwesomeIcon icon={faTimes} className='faTimes' onClick={e =>
                                dispatch({ type: 'REMOVE_FROM_ACTIONS', payload: 'topRibbonVisible' })
                            } />
                            <div className='top-ribbon-icon-container'>
                                <FontAwesomeIcon icon={faGift} className='faGifts fa-2x' />
                            </div>
                            <div className='top-ribbon-text' style={{ ...ribbonTextStyle }}>{ribbonText}</div>
                        </div>
                    </div>
                </div>}
        </div>
    )
})