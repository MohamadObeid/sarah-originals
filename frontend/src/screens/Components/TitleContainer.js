import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { url } from '../../constants/defaultImages';

export const TitleContainer = React.memo(({ slideBox, mobileScreen, imageBox }) => {
    const dispatch = useDispatch()

    const mobile = slideBox ? slideBox.mobile : imageBox.mobile
    const styles = !mobileScreen
        ? (slideBox ? slideBox.title : imageBox.title)
        : mobile.title

    const verticalScroll = styles.showAll.direction === 'Y' ? true : false

    const fishTitleStyle = {
        fontSize: styles.title.fontSize,
        backgroundColor: styles.title.color,
    }

    const fishTitleBorderStyle = { backgroundColor: styles.title.color }

    const color = { color: styles.title.color }

    const classicTitleWrap = {
        display: styles.display,
        padding: styles.paddingAround,
        borderBottom: styles.border,
        backgroundColor: styles.backgroundColor,
        alignItems: styles.alignItems,
        justifyContent: styles.justifyContent
    }

    const titleStyle = {
        fontSize: styles.title.fontSize,
        color: styles.title.color,
        borderBottom: styles.title.border,
        padding: styles.title.padding,
        margin: styles.title.margin,
        position: styles.title.position,
    }

    const strokeStyle = {
        display: styles.strokeLine.display,
        backgroundColor: styles.strokeLine.color,
        height: styles.strokeLine.height,
        width: styles.strokeLine.width,
    }

    const showAllWrapStyle = {
        display: styles.showAll.display,
        position: styles.showAll.position,
        padding: styles.showAll.padding,
    }

    const showAllStyle = {
        fontSize: styles.showAll.fontSize,
        color: styles.showAll.color,
        border: styles.showAll.border,
    }

    const chevronStyle = {
        display: styles.chevron.display,
        color: styles.chevron.color,
        fontSize: styles.chevron.fontSize,
        transform: verticalScroll && 'rotate(90deg)'
    }

    /////////////////////////// Show more ////////////////////////////

    const _id = verticalScroll && (slideBox
        ? slideBox._id
        : imageBox.slideBox.find(box => box.swiper.direction === 'Y')._id)
        || false

    var openBox
    useSelector(state => {
        if (state.actions.openBox) {
            openBox = state.actions.openBox
        }
    })

    const showMore = e => {
        e.preventDefault()
        if (verticalScroll) {
            const boxOpenned = openBox && openBox.find(box_id => box_id == _id)
            if (!boxOpenned) {
                var newOpenBox = []
                if (openBox) newOpenBox = openBox
                dispatch({ type: 'UPDATE_ACTIONS', payload: { openBox: [...newOpenBox, _id] } })
                e.currentTarget.getElementsByClassName('faChevronRight')[0].style["transform"] = 'rotate(-90deg)'
            } else {
                dispatch({ type: 'UPDATE_ACTIONS', payload: { openBox: openBox.filter(box_id => box_id !== _id)/*, update: 'openBox' */ } })
                e.currentTarget.getElementsByClassName('faChevronRight')[0].style["transform"] = 'rotate(90deg)'
            }
            return
        }
    }

    if (styles.display !== 'none') {
        if (styles.design === 'Fish') {
            return (
                <div className='fish-title-design'>
                    <div className='fish-title-border' style={fishTitleBorderStyle} />
                    <div className='fish-title-cont'>
                        <div className='fish-title-left-border' style={color} />
                        <div className='fish-title' style={fishTitleStyle}>{styles.title.text}</div>
                        <div className='fish-title-right-border' style={color} />
                    </div>
                </div>
            )
        } else if (styles.design === 'Classic') {
            return (
                <div className='classic-title-wrap' style={classicTitleWrap}>
                    <div className='classic-title' style={titleStyle}>{styles.title.text}</div>
                    <div className='classic-title-stroke' style={strokeStyle} />
                    <div className='classic-showall-wrap' style={showAllWrapStyle}>
                        <div style={showAllStyle} className='classic-showall' onClick={e => showMore(e)}>
                            {styles.showAll.text}
                            <FontAwesomeIcon icon={faChevronRight} style={chevronStyle} className='faChevronRight' />
                        </div>
                    </div>
                </div>
            )
        } else if (styles.design === 'Stunning') {
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
    } else return (<></>)
})