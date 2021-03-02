import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'

export const Title = React.memo(({ box, styles, defaultStyles }) => {

    /////////////////////////// Hooks ////////////////////////////

    const [_id] = useState(Math.floor(Math.random() * 10000000000000))
    const dispatch = useDispatch()

    useSelector(state => {

        if (DOMLoaded) {
            openBox = state.actions.openBox

            // controllable
            if (controllable)
                if (state.actions[action]) {
                    controllableStateAction = state.actions[action]

                    // set action mounted
                    if (!controllableStateAction.mounted.includes(_id)) {

                        controllableStateAction.mounted.push(_id)
                        dispatch({ type: 'UPDATE_ACTIONS', payload: controllableStateAction })

                        // mount title && styles
                        titleText.innerHTML = controllableStateAction.title
                        eventStyles(false, 'after')
                    }
                }

            // controller
            if (controller)
                controls.map(controls => {
                    if (state.actions[controls.action]) {
                        controllerStateAction = state.actions[controls.action]

                        // set action mounted
                        if (!controllerStateAction.mounted.includes(_id)) {

                            controllerStateAction.mounted.push(_id)
                            dispatch({ type: 'UPDATE_ACTIONS', payload: controllerStateAction })

                            // style controller
                            eventStyles(false, controllerStateAction.event) // false = clear styles
                        }
                    }
                })
        }
    })

    useEffect(() => {
        titleWrapper = document.getElementsByClassName('title-wrap-' + _id)[0]
        titleElement = titleWrapper.getElementsByClassName('title-wrapper')[0]
        icon = titleElement.getElementsByClassName('icon')[0]
        titleText = titleElement.getElementsByClassName('title-text')[0]
        titleBorder = titleElement.getElementsByClassName('title-border')[0]
        secondBorder = titleElement.getElementsByClassName('second-border')[0]
        chevron = titleWrapper.getElementsByClassName('showall-faChevronRight')[0]
        DOMLoaded = true
    }, [])

    /////////////////////////// Consts & Vars ////////////////////////////

    const controls = box.controls
    const action = box.action
    const controllable = box.controllable
    const controller = box.controller
    const title = box.title

    var titleWrapper, titleElement, titleText, icon, titleBorder, secondBorder,
        titleStroke, showAllWrapper, showAllText, showAllBorder, chevron,
        openBox, onHold = false, DOMLoaded, controllableStateAction, event,
        controllerStateAction

    /////////////////////////// Styles ////////////////////////////

    // wrapper styles
    var titleWrapStyle = styles || defaultStyles
    Object.entries(defaultStyles).map(([key, value]) => {
        titleWrapStyle = { ...titleWrapStyle, [key]: titleWrapStyle[key] || value }
    })

    // title wrapper styles
    var titleStyle = titleWrapStyle.title
    Object.entries(defaultStyles.title).map(([key, value]) => {
        titleStyle = { ...titleStyle, [key]: titleStyle[key] || value }
    })

    // icon styles
    var iconStyle = titleStyle.icon || {}
    defaultStyles.title.icon &&
        Object.entries(defaultStyles.title.icon).map(([key, value]) => {
            iconStyle = { ...iconStyle, [key]: iconStyle[key] || value }
        })

    // title text styles
    var titleTextStyle = titleStyle.text
    defaultStyles.title.text &&
        Object.entries(defaultStyles.title.text).map(([key, value]) => {
            titleTextStyle = { ...titleTextStyle, [key]: titleTextStyle[key] || value }
        })

    // second border styles
    var secondBorderStyle = titleStyle.secondBorder
    Object.entries(defaultStyles.title.secondBorder).map(([key, value]) => {
        secondBorderStyle = { ...secondBorderStyle, [key]: secondBorderStyle[key] || value }
    })

    // title border styles
    var titleBorderStyle = titleStyle.textBorder
    Object.entries(defaultStyles.title.textBorder).map(([key, value]) => {
        titleBorderStyle = { ...titleBorderStyle, [key]: titleBorderStyle[key] || value }
    })

    // title stroker styles
    var titleStrokeStyles = titleWrapStyle.strokeLine
    Object.entries(defaultStyles.strokeLine).map(([key, value]) => {
        titleStrokeStyles = { ...titleStrokeStyles, [key]: titleStrokeStyles[key] || value }
    })

    // show all wrapper styles
    var showAllWrapStyle = titleWrapStyle.showAll
    Object.entries(defaultStyles.showAll).map(([key, value]) => {
        showAllWrapStyle = { ...showAllWrapStyle, [key]: showAllWrapStyle[key] || value }
    })

    // show all text styles
    var showAllTextStyles = showAllWrapStyle.text
    Object.entries(defaultStyles.showAll.text).map(([key, value]) => {
        showAllTextStyles = { ...showAllTextStyles, [key]: showAllTextStyles[key] || value }
    })

    // show all border styles
    var showAllBorderStyles = showAllWrapStyle.textBorder
    Object.entries(defaultStyles.showAll.textBorder).map(([key, value]) => {
        showAllBorderStyles = { ...showAllBorderStyles, [key]: showAllBorderStyles[key] || value }
    })

    // chevron styles
    var chevronStyle = showAllWrapStyle.chevron
    Object.entries(defaultStyles.showAll.chevron).map(([key, value]) => {
        chevronStyle = { ...chevronStyle, [key]: chevronStyle[key] || value }
    })

    /////////////////////////// functions ////////////////////////////

    const showMore = e => {
        e.preventDefault()

        if (showAllWrapStyle.direction === 'Y') {
            const boxOpenned = openBox && openBox.find(box_id => box_id == _id)

            if (!boxOpenned) {
                var newOpenBox = []
                if (openBox) newOpenBox = openBox
                dispatch({ type: 'UPDATE_ACTIONS', payload: { openBox: [...newOpenBox, _id] } })
                chevron.style["transform"] = `rotate(${parseInt(chevronStyle.transform.replace(/[^\d.]/g, '')) * (-1)}deg)`

            } else {
                dispatch({ type: 'UPDATE_ACTIONS', payload: { openBox: openBox.filter(box_id => box_id !== _id) } })
                chevron.style["transform"] = chevronStyle.transform
            }

        }
    }

    const eventStyles = (apply, actionType) => {

        titleWrapStyle[actionType] &&
            Object.entries(titleWrapStyle[actionType]).map(([key, value]) => {
                titleWrapper.style[key] = apply ? value : titleWrapStyle[key]
            })

        titleStyle[actionType] &&
            Object.entries(titleStyle[actionType]).map(([key, value]) => {
                titleElement.style[key] = apply ? value : titleStyle[key]
            })

        titleBorderStyle[actionType] &&
            Object.entries(titleBorderStyle[actionType]).map(([key, value]) => {
                titleBorder.style[key] = apply ? value : titleBorderStyle[key]
            })

        titleTextStyle[actionType] &&
            Object.entries(titleTextStyle[actionType]).map(([key, value]) => {
                titleText.style[key] = apply ? value : titleTextStyle[key]
            })

        if (icon)
            iconStyle[actionType] &&
                Object.entries(iconStyle[actionType]).map(([key, value]) => {
                    icon.style[key] = apply ? value : iconStyle[key]
                })

        secondBorderStyle[actionType] &&
            Object.entries(secondBorderStyle[actionType]).map(([key, value]) => {
                secondBorder.style[key] = apply ? value : secondBorderStyle[key]
            })
    }

    const showAllEventStyles = (apply, actionType) => {

        showAllWrapStyle[actionType] &&
            Object.entries(showAllWrapStyle[actionType]).map(([key, value]) => {
                showAllWrapper.style[key] = apply ? value : showAllWrapStyle[key]
            })

        showAllTextStyles[actionType] &&
            Object.entries(showAllTextStyles[actionType]).map(([key, value]) => {
                showAllText.style[key] = apply ? value : showAllTextStyles[key]
            })

        showAllBorderStyles[actionType] &&
            Object.entries(showAllBorderStyles[actionType]).map(([key, value]) => {
                showAllBorder.style[key] = apply ? value : showAllBorderStyles[key]
            })

        chevronStyle[actionType] &&
            Object.entries(chevronStyle[actionType]).map(([key, value]) => {
                chevron.style[key] = apply ? value : chevronStyle[key]
            })
    }

    /////////////////////////// DOM ////////////////////////////

    return (
        <div className={'title-container title-wrap-' + _id}
            style={titleWrapStyle}>
            {/* Title */}
            <div className='title-wrapper' style={titleStyle}
                onClick={e => eventStyles(true, 'click')}
                onMouseEnter={e => eventStyles(true, 'hover')}
                onMouseLeave={e => eventStyles(false, 'hover')}>
                {/* 1st border */}
                <div className='title-border' style={titleBorderStyle} />
                {/* Icon */}
                {iconStyle.display === 'flex' && title.icon.name &&
                    <FontAwesomeIcon icon={[title.icon.code, title.icon.name]} style={iconStyle} />}
                {/* title */}
                <div className='title-text' style={titleTextStyle}>{title.title}</div>
                {/* 2nd border */}
                <div className='title-second-border' style={secondBorderStyle} />
            </div>
            {/* Middle Stroke */}
            <div className='title-stroke' style={titleStrokeStyles} />
            {/* showAll wrapper */}
            <div className='showall-wrapper' style={showAllWrapStyle}>
                {/* border */}
                <div className='showall-border' style={showAllBorderStyles}
                    onMouseEnter={(e) => showAllEventStyles(true, 'hover')}
                    onMouseLeave={(e) => showAllEventStyles(false, 'hover')} />
                {/* text */}
                <div style={showAllTextStyles}
                    className='showall-text'
                    onClick={e => showMore(e)}>
                    {showAllTextStyles.text === 'none' ? '' : showAllTextStyles.text}
                    <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        style={chevronStyle}
                        className='showall-faChevronRight' />
                </div>
            </div>
        </div>
    )
})