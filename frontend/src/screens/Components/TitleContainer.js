import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { url } from '../../constants/defaultImages';

export const TitleContainer = React.memo(({ _id, Title, styles }) => {
    const dispatch = useDispatch()
    const defaultStyles = useSelector(state => state.styles.find(styles => styles.name === 'Default Desktop Title Styles'))

    const defaultShowAll = defaultStyles.showAll || {}
    const defaultChevron = defaultStyles.chevron || {}
    const defaultTitle = defaultStyles.title || {}
    const defaultStrokeLine = defaultStyles.strokeLine || {}
    const defaultDesign = defaultStyles.design || {}

    const design = styles.design || defaultDesign
    const showAll = styles.showAll || defaultShowAll
    const chevron = styles.chevron || defaultChevron
    const title = styles.title || defaultTitle
    const strokeLine = styles.strokeLine || defaultStrokeLine

    const fishTitleStyle = {
        fontSize: title.fontSize || defaultTitle.fontSize,
        backgroundColor: title.color || defaultTitle.color,
    }

    const fishTitleBorderStyle = { backgroundColor: title.color || defaultTitle.color }
    const color = { color: title.color || defaultTitle.color }
    const border = (side, border) => (
        border !== '0' ?
            (side === 'Around' ? { border }
                : side === 'Top' ? { borderTop: border }
                    : side === 'Bottom' ? { borderBottom: border }
                        : side === 'Left' ? { borderLeft: border }
                            : side === 'Right' && { borderRight: border })
            : {}
    )

    const classicTitleWrap = {
        display: styles.display || defaultStyles.display,
        padding: styles.padding || defaultStyles.padding,
        margin: styles.margin || defaultStyles.margin,
        ...border(styles.borderSide || defaultStyles.borderSide, styles.border || defaultStyles.border),
        backgroundColor: styles.backgroundColor || defaultStyles.backgroundColor,
        alignItems: styles.alignItems || defaultStyles.alignItems,
        justifyContent: styles.justifyContent || defaultStyles.justifyContent,
        borderRadius: styles.borderRadius || defaultStyles.borderRadius,
        width: styles.width || defaultStyles.width,
        flexDirection: styles.flexDirection || defaultStyles.flexDirection,
    }

    const titleStyle = {
        fontSize: title.fontSize || defaultTitle.fontSize,
        color: title.color || defaultTitle.color,
        borderBottom: title.border || defaultTitle.border,
        padding: title.padding || defaultTitle.padding,
        margin: title.margin || defaultTitle.margin,
        position: title.position || defaultTitle.position,
    }

    const strokeStyle = {
        display: strokeLine.display || defaultStrokeLine.display,
        backgroundColor: strokeLine.color || defaultStrokeLine.color,
        height: strokeLine.height || defaultStrokeLine.height,
        width: strokeLine.width || defaultStrokeLine.width,
    }

    const showAllWrapStyle = {
        display: showAll.display || defaultShowAll.display,
        position: showAll.position || defaultShowAll.position,
        padding: showAll.padding || defaultShowAll.padding,
        margin: showAll.margin || defaultShowAll.margin,
    }

    const showAllStyle = {
        fontSize: showAll.fontSize || defaultShowAll.fontSize,
        color: showAll.color || defaultShowAll.color,
        border: showAll.border || defaultShowAll.border,
    }

    const chevronStyle = {
        display: chevron.display || defaultChevron.display,
        color: chevron.color || defaultChevron.color,
        fontSize: chevron.fontSize || defaultChevron.fontSize,
        transform: chevron.transform || defaultChevron.transform,
    }

    /////////////////////////// Show more ////////////////////////////

    var openBox
    useSelector(state => {
        if (state.actions.openBox)
            openBox = state.actions.openBox
    })

    const showMore = e => {
        e.preventDefault()
        if (chevronStyle.transform) {
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

    if (design === 'Fish') {
        return (
            <div className='fish-title-design'>
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
            <div className='classic-title-wrap' style={classicTitleWrap}>
                <div className='classic-title' style={titleStyle}>{Title ? Title.title : 'Container Title'}</div>
                <div className='classic-title-stroke' style={strokeStyle} />
                <div className='classic-showall-wrap' style={showAllWrapStyle}>
                    <div style={showAllStyle} className='classic-showall' onClick={e => showMore(e)}>
                        {showAll.text !== undefined ? showAll.text : defaultShowAll.text}
                        <FontAwesomeIcon icon={faChevronRight} style={chevronStyle} className='faChevronRight' />
                    </div>
                </div>
            </div>
        )
    } else if (design === 'Stunning') {
        return (
            <div className='stunning-wrap'>
                <div className='stunning-img-wrap'>
                    <img src={url('../../images/stunning.png')} className='stunning-img' />
                </div>
                {/*<div className='stunning-show-all-wrap'>
                        <div className='stunning-show-all'>show all
                        <FontAwesomeIcon icon={faChevronRight} className='faChevronRight' />
                        </div>
                    </div>*/}
            </div>
        )
    } else return (<></>)
})