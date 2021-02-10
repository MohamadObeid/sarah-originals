import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Slider } from './Slider';
import { TitleContainer } from './TitleContainer'

export const MagicBox = React.memo(({ styles, touchScreen, magicBox }) => {

    // AddToCart default styles
    const defaultAddToCartStyles = useSelector(state =>
        state.styles.find(styles => styles.name === 'Default Desktop AddToCart Styles'))

    // Slider default styles
    const defaultStyles = useSelector(state => state.styles.find(styles =>
        styles.name === 'Default Desktop MagicBox Styles'))

    if (defaultStyles && defaultAddToCartStyles) {
        const dispatch = useDispatch()
        // Send AddToCart styles within styles
        if (defaultAddToCartStyles)
            defaultStyles.slider[0].product.addToCart = defaultAddToCartStyles

        const _id = magicBox._id

        const viewOverlayStyle = {
            position: styles.position || defaultStyles.position,
            top: styles.top || defaultStyles.top,
            right: styles.right || defaultStyles.right,
            bottom: styles.bottom || defaultStyles.bottom,
            left: styles.left || defaultStyles.left,
            transform: styles.beforeTransform || defaultStyles.beforeTransform,
            afterTransform: styles.afterTransform || defaultStyles.afterTransform,
            beforeTransform: styles.beforeTransform || defaultStyles.beforeTransform,
            transition: styles.transition || defaultStyles.transition,
            padding: styles.overlayPadding || defaultStyles.overlayPadding,
            zIndex: styles.zIndex || defaultStyles.zIndex,
            maxWidth: '100vw'
        }

        const viewWrapStyles = {
            boxShadow: styles.beforeBoxShadow || defaultStyles.beforeBoxShadow,
            beforeBoxShadow: styles.beforeBoxShadow || defaultStyles.beforeBoxShadow,
            afterBoxShadow: styles.afterBoxShadow || defaultStyles.afterBoxShadow,
            borderRadius: styles.borderRadius || defaultStyles.borderRadius,
            backgroundColor: styles.backgroundColor || defaultStyles.backgroundColor,
            flexDirection: styles.flexDirection || defaultStyles.flexDirection,
            width: styles.flexDirection || defaultStyles.flexDirection,
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
        timerBarStyle.afterTransition = timerBarStyle.transition
        timerBarStyle.transition = 'unset'
        timerBarStyle.width = '0'

        var closeBtnStyles = styles.closeBtn || defaultStyles.closeBtn
        Object.entries(defaultStyles.closeBtn).map(([key, value]) => {
            closeBtnStyles = { ...closeBtnStyles, [key]: closeBtnStyles[key] || value }
        })

        ///////////////////// hide-show Box //////////////////////

        const action = magicBox.action || 'none'
        const controllable = magicBox.controllable
        var timerBar, viewWrapper, viewOverlay, timeOut, height, width, checkSelector

        const showTimer = () => {
            if (viewWrapStyles.canHide)
                timeOut = setTimeout(() => { hideBox() }, 5000)

            if (timerBarStyle.display !== 'none') {
                setTimeout(() => {
                    timerBar.style.width = '100%'
                    timerBar.style.transition = timerBarStyle.afterTransition
                }, 50)
            }
        }

        const showBox = () => {
            showTimer()

            width = viewOverlay.offsetWidth
            height = viewOverlay.offsetHeight

            // toggle wrapper styles
            viewOverlay.style.left = `calc((100vw - ${width + 'px'}) / 2)`
            viewOverlay.style.transform = viewOverlayStyle.afterTransform
            viewWrapper.style.boxShadow = viewWrapStyles.afterBoxShadow
        }

        const hideTimer = () => {
            if (viewWrapStyles.canHide)
                clearTimeout(timeOut)

            if (timerBarStyle.display !== 'none') {
                timerBar.style.width = '0'
                timerBar.style.transition = 'unset'
            }
        }

        const hideBox = () => {
            // toggle wrapper styles
            viewOverlay.style.transform = viewOverlayStyle.beforeTransform
            viewWrapper.style.boxShadow = viewWrapStyles.beforeBoxShadow

            hideTimer()
        }

        useSelector(state => {
            if (state.actions[action] && controllable)
                if (state.actions[action].title && checkSelector) {
                    dispatch({ type: 'REMOVE_ACTION', payload: action })
                    hideBox()
                    showBox()
                }
        })

        useEffect(() => {
            viewOverlay = document.getElementsByClassName('view-overlay-' + _id)[0]
            viewWrapper = viewOverlay.getElementsByClassName('view-wrapper')[0]
            timerBar = viewWrapper.getElementsByClassName('timer-bar')[0]
            checkSelector = true
        }, [])

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
                        <TitleContainer styles={styles.title} box={magicBox} />}

                    {/* Slide Box */}
                    {magicBox.slider.length > 0 &&
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
    } else return <></>
})