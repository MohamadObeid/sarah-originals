import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { getSlides } from '../../actions/slidesActions'
import { FilterOutlined } from '@ant-design/icons'

export const TitleContainer = React.memo(({ box, styles }) => {
    const dispatch = useDispatch()
    const defaultStyles = useSelector(state => state.styles.find(styles => styles.name === 'Default Desktop Title Styles'))

    if (defaultStyles) {
        const _id = box._id
        const Title = box.title || { title: '' }

        var titleWrapStyle = styles || defaultStyles
        Object.entries(defaultStyles).map(([key, value]) => {
            titleWrapStyle = { ...titleWrapStyle, [key]: titleWrapStyle[key] || value }
        })
        if (titleWrapStyle.beforeBackgroundColor)
            titleWrapStyle.backgroundColor = titleWrapStyle.beforeBackgroundColor

        var titleStyle = titleWrapStyle.title
        Object.entries(defaultStyles.title).map(([key, value]) => {
            titleStyle = { ...titleStyle, [key]: titleStyle[key] || value }
        })
        if (titleStyle.beforeBackgroundColor)
            titleStyle.backgroundColor = titleStyle.beforeBackgroundColor

        var iconStyle = titleStyle.icon || {}
        defaultStyles.title.icon &&
            Object.entries(defaultStyles.title.icon).map(([key, value]) => {
                iconStyle = { ...iconStyle, [key]: iconStyle[key] || value }
            })

        var titleTextStyle = titleStyle.text
        Object.entries(defaultStyles.title.text).map(([key, value]) => {
            titleTextStyle = { ...titleTextStyle, [key]: titleTextStyle[key] || value }
        })
        titleTextStyle.color = titleTextStyle.beforeColor
        titleTextStyle.cursor = 'pointer'

        var secondBorderStyle = titleStyle.secondBorder
        Object.entries(defaultStyles.title.secondBorder).map(([key, value]) => {
            secondBorderStyle = { ...secondBorderStyle, [key]: secondBorderStyle[key] || value }
        })
        secondBorderStyle.backgroundColor = secondBorderStyle.beforeBackgroundColor

        var titleBorderStyle = titleStyle.textBorder
        Object.entries(defaultStyles.title.textBorder).map(([key, value]) => {
            titleBorderStyle = { ...titleBorderStyle, [key]: titleBorderStyle[key] || value }
        })
        titleBorderStyle.backgroundColor = titleBorderStyle.beforeBackgroundColor
        //titleBorderStyle.width = '0'

        var titleStroke = titleWrapStyle.strokeLine
        Object.entries(defaultStyles.strokeLine).map(([key, value]) => {
            titleStroke = { ...titleStroke, [key]: titleStroke[key] || value }
        })

        var showAllWrapStyle = titleWrapStyle.showAll
        Object.entries(defaultStyles.showAll).map(([key, value]) => {
            showAllWrapStyle = { ...showAllWrapStyle, [key]: showAllWrapStyle[key] || value }
        })

        var showAllText = showAllWrapStyle.text
        Object.entries(defaultStyles.showAll.text).map(([key, value]) => {
            showAllText = { ...showAllText, [key]: showAllText[key] || value }
        })
        showAllText.color = showAllText.beforeColor

        var showAllBorder = showAllWrapStyle.textBorder
        Object.entries(defaultStyles.showAll.textBorder).map(([key, value]) => {
            showAllBorder = { ...showAllBorder, [key]: showAllBorder[key] || value }
        })
        showAllBorder.backgroundColor = showAllBorder.beforeBackgroundColor

        var chevronStyle = showAllWrapStyle.chevron
        Object.entries(defaultStyles.showAll.chevron).map(([key, value]) => {
            chevronStyle = { ...chevronStyle, [key]: chevronStyle[key] || value }
        })

        /////////////////////////// Show more ////////////////////////////

        const control = box.control
        const action = box.action || 'none'
        const controllable = box.controllable
        const controller = box.controller
        const event = controller && control && control.event || 'none'

        var openBox
        useSelector(state => {
            if (state.actions.openBox)
                openBox = state.actions.openBox

            if (controllable)
                if (state.actions[action] && state.actions[action].title)
                    titleElement.innerHTML = state.actions[action].title
        })

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

        var titleWrapper, titleElement, titleBorder, secondBorder, titleText, icon
        useEffect(() => {
            titleWrapper = document.getElementsByClassName('title-wrap-' + _id)[0]
            titleElement = titleWrapper.getElementsByClassName('classic-title')[0]
            icon = titleElement.getElementsByClassName('icon')[0]
            titleText = titleElement.getElementsByClassName('title-text')[0]
            titleBorder = titleElement.getElementsByClassName('title-border')[0]
            secondBorder = titleElement.getElementsByClassName('second-border')[0]
        }, [])

        const mouseClickHandler = () => {
            if (event === 'Click' && controller) {
                dispatch(getSlides(control, action))
            }
        }

        const cancelControl = () => {
            dispatch({ type: 'REMOVE_FROM_ACTIONS', payload: action })
        }

        const mouseEnterHandler = (e) => {
            e.preventDefault()
            event === 'Hover' && mouseClickHandler()
            titleWrapper.style.backgroundColor = titleWrapStyle.afterBackgroundColor
        }

        const mouseLeaveHandler = (e) => {
            e.preventDefault()
            event === 'Hover' && cancelControl()
            titleWrapper.style.backgroundColor = titleWrapStyle.beforeBackgroundColor
        }

        const titleMouseEnter = (e) => {
            titleBorder.style.backgroundColor = titleBorderStyle.afterBackgroundColor
            //titleBorder.style.width = '100%'
            if (titleTextStyle.hoverFontWeight)
                titleText.style.fontWeight = titleTextStyle.hoverFontWeight
            if (icon) icon.style.color = iconStyle.hoverColor
            titleText.style.color = titleTextStyle.afterColor
            secondBorder.style.backgroundColor = titleBorderStyle.afterBackgroundColor
            titleElement.style.backgroundColor = titleStyle.afterBackgroundColor
        }

        const titleMouseLeave = (e) => {
            titleBorder.style.backgroundColor = titleBorderStyle.beforeBackgroundColor
            //itleBorder.style.width = '0%'
            titleText.style.fontWeight = titleTextStyle.fontWeight
            if (icon) icon.style.color = iconStyle.color
            titleText.style.color = titleTextStyle.beforeColor
            secondBorder.style.backgroundColor = titleBorderStyle.beforeBackgroundColor
            titleElement.style.backgroundColor = titleStyle.beforeBackgroundColor
        }

        return (
            <div className={'classic-title-wrap title-wrap-' + _id}
                style={titleWrapStyle}
                onClick={mouseClickHandler}
                onMouseEnter={mouseEnterHandler}
                onMouseLeave={mouseLeaveHandler}>
                {/* Title */}
                <div className='classic-title' style={titleStyle}
                    onMouseEnter={titleMouseEnter} onMouseLeave={titleMouseLeave}>
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
                <div className='title-stroke' style={titleStroke} />
                {/* showAll wrapper */}
                <div className='classic-showall-wrap' style={showAllWrapStyle}>
                    {/* border */}
                    <div className='show-all-border' style={showAllBorder}
                        onMouseEnter={(e) => e.target.style.backgroundColor = showAllBorder.afterBackgroundColor}
                        onMouseLeave={(e) => e.target.style.backgroundColor = showAllBorder.beforeBackgroundColor} />
                    {/* text */}
                    <div style={showAllText}
                        className='classic-showall'
                        onClick={e => showMore(e)}
                        onMouseEnter={(e) => e.currentTarget.style.color = showAllText.afterColor}
                        onMouseLeave={(e) => e.currentTarget.style.color = showAllText.beforeColor}>
                        {showAllText.text === 'none' ? '' : showAllText.text}
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