import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { getSlides } from '../../actions/slidesActions'
import { FilterOutlined } from '@ant-design/icons'
import _ from 'lodash'

export const TitleContainer = React.memo(({ box, styles }) => {
    /////////////////////////// Get styles from server ////////////////////////////

    const dispatch = useDispatch()
    const defaultStyles = useSelector(state => state.styles.find(styles => styles.name === 'Default Desktop Title Styles'))

    if (defaultStyles) {

        /////////////////////////// Consts & Vars ////////////////////////////

        const _id = box._id
        const Title = box.title || { title: '' }
        const control = box.control
        const action = box.action || 'none'
        const controllable = box.controllable
        const controller = box.controller
        const event = controller && control && control.event || 'none'

        var titleWrapper, titleElement, titleText, icon, titleBorder, secondBorder,
            titleStroke, showAllWrapper, showAllText, showAllBorder, chevron
        var openBox, changeEffects = true, onHold = false, mounted = false

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
                var chevronElement = e.currentTarget.getElementsByClassName('faChevronRight')[0]
                if (!boxOpenned) {
                    var newOpenBox = []
                    if (openBox) newOpenBox = openBox
                    dispatch({ type: 'UPDATE_ACTIONS', payload: { openBox: [...newOpenBox, _id] } })
                    chevronElement.style["transform"] = `rotate(${parseInt(chevronStyle.transform.replace(/[^\d.]/g, '')) * (-1)}deg)`
                } else {
                    dispatch({ type: 'UPDATE_ACTIONS', payload: { openBox: openBox.filter(box_id => box_id !== _id) } })
                    chevronElement.style["transform"] = chevronStyle.transform
                }
                return
            }
        }

        const eventStyles = (apply, actionType) => {

            if (changeEffects && !onHold) { // remove hover/click styles

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

            if (apply && !mounted) {

                if (controller && event === actionType) {
                    onHold = true
                    dispatch(getSlides(control, action))
                }

            } //else dispatch({ type: 'REMOVE_FROM_ACTIONS', payload: action })
        }

        const showAllEventStylesy = (apply, actionType) => {

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

        /////////////////////////// Hooks ////////////////////////////

        useSelector(state => {
            if (state.actions.openBox)
                openBox = state.actions.openBox

            if (controllable)
                if (state.actions[action] && state.actions[action].title)
                    titleElement.innerHTML = state.actions[action].title

            if (controller) {

                if (state.actions[action]) {
                    const slidesExist = _.isEqual(state.actions[action].collections, control.collections)

                    if (slidesExist && !mounted) {
                        mounted = true
                        if (changeEffects)
                            eventStyles(true, event)
                        changeEffects = false
                        onHold = false

                    } else if (!slidesExist && !changeEffects) {
                        changeEffects = true
                        mounted = false
                        eventStyles(false, event)
                    }

                }
            }
        })

        useEffect(() => {
            titleWrapper = document.getElementsByClassName('title-wrap-' + _id)[0]
            titleElement = titleWrapper.getElementsByClassName('classic-title')[0]
            icon = titleElement.getElementsByClassName('icon')[0]
            titleText = titleElement.getElementsByClassName('title-text')[0]
            titleBorder = titleElement.getElementsByClassName('title-border')[0]
            secondBorder = titleElement.getElementsByClassName('second-border')[0]
        }, [])

        /////////////////////////// JSX ////////////////////////////

        return (
            <div className={'classic-title-wrap title-wrap-' + _id}
                style={titleWrapStyle}
                onClick={e => eventStyles(true, 'click')}
                onMouseEnter={e => eventStyles(true, 'hover')}
                onMouseLeave={e => eventStyles(false, 'hover')}>
                {/* Title */}
                <div className='classic-title' style={titleStyle}>
                    {/* 1st border */}
                    <div className='title-border' style={titleBorderStyle} />
                    {/* Icon */}
                    {iconStyle.name === 'Filter' && <FilterOutlined style={iconStyle} className='icon' />}
                    {/* title */}
                    <div className='title-text' style={titleTextStyle}>
                        {Title.title}</div>
                    {/* 2nd border */}
                    <div className='second-border' style={secondBorderStyle} />
                </div>
                {/* Middle Stroke */}
                <div className='title-stroke' style={titleStrokeStyles} />
                {/* showAll wrapper */}
                <div className='classic-showall-wrap' style={showAllWrapStyle}>
                    {/* border */}
                    <div className='show-all-border' style={showAllBorderStyles}
                        onMouseEnter={(e) => showAllEventStylesy(true, 'hover')}
                        onMouseLeave={(e) => showAllEventStylesy(false, 'hover')} />
                    {/* text */}
                    <div style={showAllTextStyles}
                        className='classic-showall'
                        onClick={e => showMore(e)}>

                        {showAllTextStyles.text === 'none' ? '' : showAllTextStyles.text}
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            style={chevronStyle}
                            className='faChevronRight' />
                    </div>
                </div>
            </div>
        )
    }
})