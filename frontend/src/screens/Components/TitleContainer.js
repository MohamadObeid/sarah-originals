import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

export const TitleContainer = React.memo(({ box, styles }) => {
    const dispatch = useDispatch()
    const defaultStyles = useSelector(state => state.styles.find(styles => styles.name === 'Default Desktop Title Styles'))

    if (defaultStyles) {
        const _id = box._id
        const Title = box.title || { title: 'no title' }
        const design = styles.design || defaultStyles.design
        const title = styles.title || defaultStyles.title
        const defaultTitle = defaultStyles.title

        //
        const fishTitleStyle = {
            fontSize: title.fontSize || defaultTitle.fontSize,
            backgroundColor: title.color || defaultStyles.color,
        }
        const fishTitleBorderStyle = { backgroundColor: title.color || defaultTitle.color }
        const color = { color: title.color || defaultTitle.color }
        //

        var titleWrapStyle = styles || defaultStyles
        Object.entries(defaultStyles).map(([key, value]) => {
            titleWrapStyle = { ...titleWrapStyle, [key]: titleWrapStyle[key] || value }
        })
        titleWrapStyle.backgroundColor = titleWrapStyle.beforeBackgroundColor

        var titleStyle = titleWrapStyle.title
        Object.entries(defaultStyles.title).map(([key, value]) => {
            titleStyle = { ...titleStyle, [key]: titleStyle[key] || value }
        })
        titleStyle.color = titleStyle.beforeColor

        var titleBorder = titleStyle.textBorder
        Object.entries(defaultStyles.title.textBorder).map(([key, value]) => {
            titleBorder = { ...titleBorder, [key]: titleBorder[key] || value }
        })
        titleBorder.backgroundColor = titleBorder.beforeBackgroundColor

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

        var titleWrapper, titleElement
        useEffect(() => {
            titleWrapper = document.getElementsByClassName('title-wrap-' + _id)[0]
            titleElement = titleWrapper.getElementsByClassName('classic-title')[0]
        }, [])

        const controlHandler = () => (dispatch, getState) => {
            const { actions: { [action]: actionExist } } = getState()
            if (!actionExist)
                dispatch({
                    type: 'UPDATE_ACTIONS', payload: {
                        [action]: { title: control.title, collections: control.collections }
                    }
                })
        }

        const cancelControl = () => {
            dispatch({ type: 'REMOVE_FROM_ACTIONS', payload: action })
        }

        if (design === 'Fish') {
            return (
                <div className={'fish-title-design title-wrap-' + _id}>
                    <div className='fish-title-border' style={fishTitleBorderStyle} />
                    <div className='fish-title-cont'>
                        <div className='fish-title-left-border' style={color} />
                        <div className='fish-title' style={fishTitleStyle}>{Title.title}</div>
                        <div className='fish-title-right-border' style={color} />
                    </div>
                </div>
            )
        } else if (design === 'Classic') {
            return (
                <div className={'classic-title-wrap title-wrap-' + _id}
                    style={titleWrapStyle}
                    onClick={(e) => { event === 'Click' && dispatch(controlHandler()); e.preventDefault() }}
                    onMouseEnter={(e) => { event === 'Hover' && dispatch(controlHandler()); e.preventDefault() }}
                    onMouseLeave={(e) => { event === 'Hover' && cancelControl(); e.preventDefault() }}>
                    {/* Title */}
                    <div className='classic-title' style={titleStyle}
                        onMouseEnter={(e) => e.target.style.color = titleStyle.afterColor}
                        onMouseLeave={(e) => e.target.style.color = titleStyle.beforeColor}>
                        {Title.title}
                        {/* border */}
                        <div className='title-border' style={titleBorder}
                            onMouseEnter={(e) => e.target.style.backgroundColor = titleBorder.afterBackgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = titleBorder.beforeBackgroundColor} />
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
            /*} else if (design === 'Stunning') {
                return (
                    <div className='stunning-wrap'>
                        <div className='stunning-img-wrap'>
                            <img src={url('../../images/stunning.png')} className='stunning-img' />
                        </div>
                    </div>
                )
            } else return <></>*/
        } else return <></>
    }
})