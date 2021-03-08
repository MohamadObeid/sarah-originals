import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// components
import { Slider } from './Slider';
import { Title } from './Title'
// actions
import { search } from '../../actions/searchActions';
// plugins
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const MagicBox = React.memo(({ styles, defaultStyles, magicBox, touchScreen }) => {

    ////////////////////////// Variables & Constants //////////////////////////

    const _id = magicBox._id
    const action = magicBox.action
    const controllable = magicBox.controllable
    const controller = magicBox.controller
    const controls = magicBox.controls

    var timerBar, viewWrapper, viewOverlay, timeOut, width, height, DOMLoaded,
        controllableStateAction, controllerStateAction, mounted = false

    ////////////////////////// Hooks //////////////////////////

    const dispatch = useDispatch()
    const stateAction = useRef({})

    useSelector(state => {

        if (DOMLoaded) {

            // controllable
            if (controllable)
                if (state.actions[action]) {
                    controllableStateAction = state.actions[action]

                    // set action mount
                    if (controllableStateAction.mount !== stateAction.current.mount) {
                        stateAction.current = controllableStateAction

                        // show Box
                        hideBox()
                        showBox()
                    }
                }

            // controller
            if (controller)
                controls.map(controls => {
                    if (state.actions[controls.action]) {
                        controllerStateAction = state.actions[controls.action]

                        // set action stateAction.current.mount
                        if (controllerStateAction.mount !== stateAction.current.mount) {
                            stateAction.current.mount = controllerStateAction.mount
                        }
                    }
                })
        }
    })

    useEffect(() => {

        // set dom elements
        viewOverlay = document.getElementsByClassName('view-overlay-' + _id)[0]
        viewWrapper = viewOverlay.getElementsByClassName('view-wrapper')[0]
        timerBar = viewWrapper.getElementsByClassName('timer-bar')[0]
        DOMLoaded = true

        // search slides
        magicBox.slider.map(slider => {
            // search(_id, controls)
            dispatch(search({
                title: slider.title,
                search: slider.search,
                action: slider._id,
                slides: slider.slide,
            }))
        })

    }, [])

    /////////////////////// styles /////////////////////////

    var viewOverlayStyle = styles.overlay || defaultStyles.overlay
    defaultStyles.overlay &&
        Object.entries(defaultStyles.overlay).map(([key, value]) => {
            viewOverlayStyle = { ...viewOverlayStyle, [key]: viewOverlayStyle[key] || value }
        })

    const viewWrapStyles = {
        boxShadow: styles.boxShadow || defaultStyles.boxShadow,
        position: styles.position || defaultStyles.position,
        after: styles.after || defaultStyles.after,
        borderRadius: styles.borderRadius || defaultStyles.borderRadius,
        backgroundColor: styles.backgroundColor || defaultStyles.backgroundColor,
        flexDirection: styles.flexDirection || defaultStyles.flexDirection,
        width: styles.width || defaultStyles.width,
        maxWidth: styles.maxWidth || defaultStyles.maxWidth,
        minWidth: styles.minWidth || defaultStyles.minWidth,
        canHide: styles.canHide || defaultStyles.canHide,
        border: styles.border || defaultStyles.border,
    }

    const background = typeof styles.background === 'object'
        ? {
            src: styles.background.src || defaultStyles.background.src,
            isImage: styles.background.isImage || defaultStyles.background.isImage,
        } : {
            src: defaultStyles.background.src,
            isImage: defaultStyles.background.isImage,
        }

    const sliderWrapper = {
        borderRadius: styles.borderRadius || defaultStyles.borderRadius,
        gridColumnGap: styles.paddingBetween || defaultStyles.paddingBetween,
        flexDirection: styles.flexDirection || defaultStyles.flexDirection,
        gridRowGap: styles.paddingBetween || defaultStyles.paddingBetween,
        padding: styles.paddingAround || defaultStyles.paddingAround,
    }

    var timerBarStyle = styles.timerBar || defaultStyles.timerBar
    Object.entries(defaultStyles.timerBar).map(([key, value]) => {
        timerBarStyle = { ...timerBarStyle, [key]: timerBarStyle[key] || value }
    })
    timerBarStyle.width = '0'

    var closeBtnStyles = styles.closeBtn || defaultStyles.closeBtn
    Object.entries(defaultStyles.closeBtn).map(([key, value]) => {
        closeBtnStyles = { ...closeBtnStyles, [key]: closeBtnStyles[key] || value }
    })

    //////////////////////// Functions /////////////////////////

    const showTimer = () => {
        if (timerBarStyle.display !== 'none') {
            if (viewWrapStyles.canHide)
                timeOut = setTimeout(() => { hideBox() }, 5000)

            setTimeout(() => {
                timerBar.style.width = '100%'
                timerBar.style.transition = timerBarStyle.after.transition
            }, 50)
        }
    }

    const showBox = () => {
        showTimer()

        width = viewOverlay.offsetWidth
        height = viewOverlay.offsetHeight

        // toggle wrapper styles
        viewOverlay.style.left = `calc((100vw - ${width + 'px'}) / 2)`
        viewOverlay.style.transform = viewOverlayStyle.after.transform
        viewWrapper.style.boxShadow = viewOverlayStyle.after.boxShadow
    }

    const hideTimer = () => {
        if (timerBarStyle.display !== 'none') {

            if (viewWrapStyles.canHide)
                clearTimeout(timeOut)

            timerBar.style.width = '0'
            timerBar.style.transition = 'unset'
        }
    }

    const hideBox = () => {
        // toggle wrapper styles
        viewOverlay.style.transform = viewOverlayStyle.transform
        viewWrapper.style.boxShadow = viewWrapStyles.boxShadow

        hideTimer()
    }

    ////////////////////////// DOM ///////////////////////////

    return (
        <div className={'view-overlay-' + _id}
            style={viewOverlayStyle}
            onMouseEnter={hideTimer}
            onMouseLeave={showTimer}>

            {/* View wrapper */}
            <div style={viewWrapStyles} className='view-wrapper'>

                {/* Timer bar */}
                <div className='timer-bar' style={timerBarStyle} />

                {/* Close Btn */}
                <FontAwesomeIcon icon={faTimes}
                    onClick={hideBox}
                    className='faTimes-box'
                    style={closeBtnStyles} />

                {/* Background */}
                {background.isImage &&
                    <img src={background.src} className='box-background-image' />}

                {/* Title */}
                {styles.title && styles.title.display !== 'none' &&
                    <Title
                        styles={styles.title}
                        defaultStyles={defaultStyles.title}
                        box={magicBox} />}

                {/* Slide Box */}
                {magicBox.slider && magicBox.slider.length > 0 &&
                    <div className='slider-wrapper' style={sliderWrapper}>
                        {magicBox.slider.map((slider, index) =>
                            <Slider
                                key={index}
                                styles={styles.slider[index]}
                                defaultStyles={defaultStyles.slider[0]}
                                slider={slider}
                                touchScreen={touchScreen} />
                        )}
                    </div>}
            </div>
        </div>
    )
})