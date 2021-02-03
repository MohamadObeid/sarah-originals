import { faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export const LiteBox = React.memo(({ styles, liteBox }) => {
    // Slider default styles
    const defaultStyles = useSelector(state => state.styles.find(styles =>
        styles.name === 'Default Desktop LiteBox Styles'))

    if (defaultStyles) {

        var timeOut, liteBoxWrapper, timerBar, titleWrapper, title, width, height, newTitle,
            titleBorderStyles, titleStyles
        const controlAction = liteBox.controlAction
        const defaultTimerBar = defaultStyles.timerBar
        const defaultCloseBtn = defaultStyles.closeBtn
        const defaultTitleStyles = defaultStyles.title
        const defaultTitleBorderStyles = defaultTitleStyles.textBorder

        /////////////////////// Styles //////////////////////////

        var liteBoxWrapStyles, timerBarStyles, titleWrapperStyles, closeBtnStyles
        liteBoxWrapStyles = {
            position: styles.position || defaultStyles.position,
            top: styles.top || defaultStyles.top,
            right: styles.right || defaultStyles.right,
            bottom: styles.bottom || defaultStyles.bottom,
            left: styles.left || defaultStyles.left,
            flexDirection: styles.flexDirection || defaultStyles.flexDirection,
            justifytitleWrapper: styles.justifytitleWrapper || defaultStyles.justifytitleWrapper,
            alignItems: styles.alignItems || defaultStyles.alignItems,
            backgroundColor: styles.backgroundColor || defaultStyles.backgroundColor,
            border: styles.border || defaultStyles.border,
            borderRadius: styles.borderRadius || defaultStyles.borderRadius,
            //
            boxShadow: styles.beforeBoxShadow || defaultStyles.beforeBoxShadow,
            beforeBoxShadow: styles.beforeBoxShadow || defaultStyles.beforeBoxShadow,
            afterBoxShadow: styles.afterBoxShadow || defaultStyles.afterBoxShadow,
            transform: styles.beforeTransform || defaultStyles.beforeTransform,
            beforeTransform: styles.beforeTransform || defaultStyles.beforeTransform,
            afterTransform: styles.afterTransform || defaultStyles.afterTransform,
            //
            padding: styles.padding || defaultStyles.padding,
            maxWidth: styles.maxWidth || defaultStyles.maxWidth,
            minWidth: styles.minWidth || defaultStyles.minWidth,
            transition: styles.transition || defaultStyles.transition,
            zIndex: styles.zIndex || defaultStyles.zIndex,
            event: styles.event || defaultStyles.event,
        }

        timerBarStyles = styles.timerBar || defaultTimerBar
        timerBarStyles = {
            backgroundColor: timerBarStyles.backgroundColor || defaultTimerBar.backgroundColor,
            height: timerBarStyles.height || defaultTimerBar.height,
            position: timerBarStyles.position || defaultTimerBar.position,
            top: timerBarStyles.top || defaultTimerBar.top,
            right: timerBarStyles.right || defaultTimerBar.right,
            bottom: timerBarStyles.bottom || defaultTimerBar.bottom,
            left: timerBarStyles.left || defaultTimerBar.left,
            transition: 'initial',
            afterTransition: timerBarStyles.transition || defaultTimerBar.transition,
        }

        titleWrapperStyles = styles.title || defaultTitleStyles
        titleWrapperStyles = {
            //
            color: titleWrapperStyles.beforeColor || defaultTitleStyles.beforeColor,
            beforeColor: titleWrapperStyles.beforeColor || defaultTitleStyles.beforeColor,
            afterColor: titleWrapperStyles.afterColor || defaultTitleStyles.afterColor,
            backgroundColor: titleWrapperStyles.backgroundColor || defaultTitleStyles.backgroundColor,
            beforeBackgroundColor: titleWrapperStyles.beforeBackgroundColor || defaultTitleStyles.beforeBackgroundColor,
            afterBackgroundColor: titleWrapperStyles.afterBackgroundColor || defaultTitleStyles.afterBackgroundColor,
            //
            fontSize: titleWrapperStyles.fontSize || defaultTitleStyles.fontSize,
            padding: titleWrapperStyles.padding || defaultTitleStyles.padding,
            margin: titleWrapperStyles.margin || defaultTitleStyles.margin,
            flexDirection: titleWrapperStyles.flexDirection || defaultTitleStyles.flexDirection,
            alignItems: titleWrapperStyles.alignItems || defaultTitleStyles.alignItems,
            justifyContent: titleWrapperStyles.justifyContent || defaultTitleStyles.justifyContent,
            border: titleWrapperStyles.border || defaultTitleStyles.border,
            borderRadius: titleWrapperStyles.borderRadius || defaultTitleStyles.borderRadius,
            transition: titleWrapperStyles.transition || defaultTitleStyles.transition,
            event: titleWrapperStyles.event || defaultTitleStyles.event,
            textBorder: titleWrapperStyles.textBorder || defaultTitleStyles.textBorder,
        }

        titleBorderStyles = titleWrapperStyles.textBorder
        titleBorderStyles = {
            fontSize: titleBorderStyles.fontSize || defaultTitleBorderStyles.fontSize,

        }

        closeBtnStyles = styles.closeBtn || defaultCloseBtn
        closeBtnStyles = {
            fontSize: closeBtnStyles.fontSize || defaultCloseBtn.fontSize,
            color: closeBtnStyles.color || defaultCloseBtn.color,
            top: closeBtnStyles.top || defaultCloseBtn.top,
            right: closeBtnStyles.right || defaultCloseBtn.right,
            bottom: closeBtnStyles.bottom || defaultCloseBtn.bottom,
            left: closeBtnStyles.left || defaultCloseBtn.left,
        }

        /////////////////////////////////////////////////////////////////

        const hideLiteBox = () => {
            // toggle wrapper styles
            liteBoxWrapper.style.transform = liteBoxWrapStyles.beforeTransform
            liteBoxWrapper.style.boxShadow = liteBoxWrapStyles.beforeBoxShadow

            hideTimer()
        }

        const showLiteBox = () => {
            showTimer()

            titleWrapper.innerHTML = newTitle
            width = liteBoxWrapper.offsetWidth
            height = liteBoxWrapper.offsetHeight

            // toggle wrapper styles
            liteBoxWrapper.style.left = `calc((100vw - ${width + 'px'}) / 2)`
            liteBoxWrapper.style.transform = liteBoxWrapStyles.afterTransform
            liteBoxWrapper.style.boxShadow = liteBoxWrapStyles.afterBoxShadow
        }

        const hideTimer = () => {
            clearTimeout(timeOut)
            timerBar.style.width = '0'
            timerBar.style.transition = 'unset'
        }

        const showTimer = () => {
            timeOut = setTimeout(() => { hideLiteBox() }, 5000)
            setTimeout(() => {
                timerBar.style.width = '100%'
                timerBar.style.transition = timerBarStyles.afterTransition
            }, 50)
        }

        const titleEnter = (e) => { }
        const titleLeave = (e) => { }
        const titleDown = (e) => { }
        const titleUp = (e) => { }

        useSelector(state => {
            if (liteBox.controllable && liteBoxWrapper)
                if (state.actions[controlAction]) {
                    newTitle = state.actions[controlAction].title
                    hideLiteBox()
                    showLiteBox()
                }
        })

        useEffect(() => {
            liteBoxWrapper = document.getElementsByClassName('lite-box-wrap')[0]
            timerBar = liteBoxWrapper.getElementsByClassName('lite-box-timerBar')[0]
            titleWrapper = liteBoxWrapper.getElementsByClassName('lite-box-title-wrapper')[0]
            title = liteBoxWrapper.getElementsByClassName('lite-box-title')[0]
        }, [])

        return <div className="lite-box-wrap"
            onMouseEnter={liteBoxWrapStyles.event === 'Hover' && hideTimer}
            onMouseLeave={liteBoxWrapStyles.event === 'Hover' && showTimer}
            onMouseDown={liteBoxWrapStyles.event === 'Click' && hideTimer}
            onMouseUp={liteBoxWrapStyles.event === 'Click' && showTimer}
            style={liteBoxWrapStyles}>

            {/* Timer Bar */}
            <div className='lite-box-timerBar' style={timerBarStyles} />

            {/* Title */}
            <div className='lite-box-title-wrapper'
                onMouseEnter={titleWrapperStyles.event === 'Hover' && titleEnter}
                onMouseLeave={titleWrapperStyles.event === 'Hover' && titleLeave}
                onMouseDown={titleWrapperStyles.event === 'Click' && titleDown}
                onMouseUp={titleWrapperStyles.event === 'Click' && titleUp}
                style={titleWrapperStyles}>

                <div className='lite-box-title-border' style={titleBorderStyles} />
                <div className='lite-box-title' style={titleStyles} />
                <FontAwesomeIcon icon={faChevronRight}
                    className='faTimes-lite-box'
                    style={titleBtnStyles} />
            </div>

            {/* Close Icon */}
            <FontAwesomeIcon icon={faTimes} onClick={hideLiteBox}
                className='faTimes-lite-box'
                style={closeBtnStyles} />
        </div>

    } else return <></>
})