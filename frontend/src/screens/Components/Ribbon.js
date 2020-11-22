import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

function Ribbon() {
    const [ribbonVisible, setRibbonVisible] = useState()
    const { controls } = useSelector(state => state.controls)
    const [ribbonTextStyle, setRibbonTextStyle] = useState({})
    const [ribbonContainerStyle, setRibbonContainerStyle] = useState({})
    const [ribbonText, setRibbonText] = useState('')

    const dispatch = useDispatch()
    useEffect(() => {
        if (controls && controls.topRibbonVisible) {
            setRibbonSettings()
            dispatch({ type: 'TOP_RIBBON_VISIBLE', payload: true })
        }
    }, [controls])

    const setRibbonSettings = () => {
        setRibbonVisible(controls.topRibbonVisible)
        var x = window.matchMedia("(max-width: 700px)")
        if (x.matches) {
            setRibbonTextStyle({
                text: controls.topRibbon.text,
                fontSize: controls.topRibbon.mobile.fontSize,
            })
        } else
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
            {ribbonVisible &&
                <div className='top-ribbon-overlay'>
                    <div className='top-ribbon-container' style={{ ...ribbonContainerStyle }}>
                        <div className='top-ribbon'>
                            <FontAwesomeIcon icon={faTimes} className='faTimes' onClick={e => {
                                setRibbonVisible(false)
                                dispatch({ type: 'TOP_RIBBON_VISIBLE', payload: false })
                            }} />
                            <div className='top-ribbon-icon-container'>
                                <FontAwesomeIcon icon={faGift} className='faGifts fa-2x' />
                            </div>
                            <div className='top-ribbon-text' style={{ ...ribbonTextStyle }}>{ribbonText}</div>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default Ribbon