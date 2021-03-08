import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { search } from '../../actions/searchActions'

export const Title = React.memo(({ type, box, styles, defaultStyles, slides }) => {

    /////////////////////////// Consts & Vars ////////////////////////////
    const [_id] = useState(Math.floor(Math.random() * 10000000000000))

    const controls = box.controls
    const action = box.action
    const controllable = box.controllable
    const controller = box.controller
    const title = box.title || { icon: {} }

    var openBox = [], controllableStateAction, controllerStateAction

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

    const controllerHandler = (controls) => {
        stateAction.current.mount = _id

        var searches = { collections: [], keyword: [] }

        if (controls.search.push) {

            const key = controls.search.push.key
            const className = controls.search.push.className

            // push to search
            className.map(className => {

                const value = DOM.current.titleContainer.getElementsByClassName(className)[0].innerHTML
                searches[key].push(value)

            })
        }

        dispatch({ type: 'REMOVE_ACTION', payload: controls.action })

        // written this way to stop controls reassigning
        dispatch(search({
            mount: _id,
            ...controls,
            title: controls.push.includes('title') && title,
            slides: (controls.push.includes('slide')) && slides,
            search: {
                ...controls.search,
                collections: [...controls.search.collections, ...searches.collections],
                keyword: [...controls.search.keyword, ...searches.keyword]
            },
        }))
    }

    const showMore = e => {
        e.preventDefault()

        if (showAllWrapStyle.direction === 'Y') {
            const boxOpenned = openBox.find(_id => _id === box._id)

            if (!boxOpenned) {
                openBox.push(box._id)
                DOM.current.chevron.style.transform = `rotate(${parseInt(chevronStyle.transform.replace(/[^\d.]/g, '')) * (-1)}deg)`
                dispatch({ type: 'UPDATE_ACTIONS', payload: { openBox } })

            } else {
                openBox = openBox.filter(_id => _id !== box._id)
                DOM.current.chevron.style.transform = chevronStyle.transform
                dispatch({ type: 'UPDATE_ACTIONS', payload: { openBox } })
            }
        }
    }

    const eventStyles = (apply, actionType) => {

        if (DOM.current)
            if (stateAction.current.mount !== _id) {


                titleWrapStyle[actionType] &&
                    Object.entries(titleWrapStyle[actionType]).map(([key, value]) => {
                        DOM.current.titleContainer.style[key] = apply ? value : titleWrapStyle[key]
                    })

                titleStyle[actionType] &&
                    Object.entries(titleStyle[actionType]).map(([key, value]) => {
                        DOM.current.titleWrapper.style[key] = apply ? value : titleStyle[key]
                    })

                titleBorderStyle[actionType] &&
                    Object.entries(titleBorderStyle[actionType]).map(([key, value]) => {
                        DOM.current.titleBorder.style[key] = apply ? value : titleBorderStyle[key]
                    })

                titleTextStyle[actionType] &&
                    Object.entries(titleTextStyle[actionType]).map(([key, value]) => {
                        DOM.current.titleText.style[key] = apply ? value : titleTextStyle[key]
                    })

                if (DOM.current.icon)
                    iconStyle[actionType] &&
                        Object.entries(iconStyle[actionType]).map(([key, value]) => {
                            DOM.current.icon.style[key] = apply ? value : iconStyle[key]
                        })

                secondBorderStyle[actionType] &&
                    Object.entries(secondBorderStyle[actionType]).map(([key, value]) => {
                        DOM.current.secondBorder.style[key] = apply ? value : secondBorderStyle[key]
                    })
            }
    }

    const showAllEventStyles = (apply, actionType) => {

        if (DOM.current)
            if (stateAction.current.mount !== _id) {

                showAllWrapStyle[actionType] &&
                    Object.entries(showAllWrapStyle[actionType]).map(([key, value]) => {
                        DOM.current.showAllWrapper.style[key] = apply ? value : showAllWrapStyle[key]
                    })

                showAllTextStyles[actionType] &&
                    Object.entries(showAllTextStyles[actionType]).map(([key, value]) => {
                        DOM.current.showAllText.style[key] = apply ? value : showAllTextStyles[key]
                    })

                showAllBorderStyles[actionType] &&
                    Object.entries(showAllBorderStyles[actionType]).map(([key, value]) => {
                        DOM.current.showAllBorder.style[key] = apply ? value : showAllBorderStyles[key]
                    })

                chevronStyle[actionType] &&
                    Object.entries(chevronStyle[actionType]).map(([key, value]) => {
                        DOM.current.chevron.style[key] = apply ? value : chevronStyle[key]
                    })
            }
    }

    /////////////////////////// Hooks ////////////////////////////

    const DOM = useRef(false)
    const stateAction = useRef({})
    const dispatch = useDispatch()

    action === 'addToCart' && console.log('here')
    useSelector(state => {

        if (DOM.current) {
            openBox = state.actions.openBox || []

            // controllable
            if (controllable)
                if (state.actions[action]) {
                    controllableStateAction = state.actions[action]

                    // set action mount
                    if (controllableStateAction.mount !== stateAction.current.mount) {
                        stateAction.current = controllableStateAction

                        // mount title && styles
                        DOM.current.titleText.innerHTML = controllableStateAction.title

                        // clear styles
                        eventStyles(false, 'after')
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

                            // clear styles
                            eventStyles(false, controllerStateAction.event)
                        }
                    }
                })
        }
    })

    useEffect(() => {

        const titleContainer = document.getElementsByClassName(_id)[0]
        const titleWrapper = titleContainer.getElementsByClassName('title-wrapper')[0]
        const icon = titleWrapper.getElementsByClassName('icon')[0]
        const titleText = titleWrapper.getElementsByClassName('title-text')[0]
        const titleBorder = titleWrapper.getElementsByClassName('title-border')[0]
        const secondBorder = titleWrapper.getElementsByClassName('second-border')[0]
        const chevron = titleContainer.getElementsByClassName('showall-faChevronRight')[0]

        DOM.current = {
            titleContainer,
            titleWrapper,
            icon,
            titleText,
            titleBorder,
            secondBorder,
            chevron
        }

        // add conrtroller handler on event to specified triggers
        if (controller)
            controls.map(controls => {
                // check supplier slide or slider
                if (controls.trigger.type === type) {

                    // hover event: mouseenter
                    if (controls.event === 'hover')
                        controls.trigger.className.map(className => {

                            if (className.includes('title') || className.includes('showall')) {

                                DOM.current.titleContainer.getElementsByClassName(className)[0]
                                    .addEventListener('mouseenter', () => {

                                        className.includes('title') && eventStyles(true, 'hover')
                                        className.includes('showall') && showAllEventStyles(true, 'hover')

                                        controllerHandler(controls)
                                    })
                            }
                        })

                    // click event: mousedown
                    else if (controls.event === 'click')
                        controls.trigger.className.map(className => {

                            if (className.includes('title') || className.includes('showall')) {
                                DOM.current.titleContainer.getElementsByClassName(className)[0]
                                    .addEventListener('mousedown', () => {

                                        className.includes('title') && eventStyles(true, 'click')
                                        className.includes('showall') && showAllEventStyles(true, 'click')

                                        controllerHandler(controls)
                                    })
                            }
                        })
                }
            })
    }, [])

    /////////////////////////// DOM ////////////////////////////

    return (
        <div className={'title-container ' + _id} style={titleWrapStyle}>
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