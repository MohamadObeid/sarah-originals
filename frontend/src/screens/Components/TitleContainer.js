import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import img1 from '../../images/stunning.png'

export const TitleContainer = React.memo(({ imageBox, mobileScreen }) => {
    const mobile = imageBox.mobile
    const title = !mobileScreen ? imageBox.title : mobile.title

    const fishTitleStyle = {
        fontSize: title.fontSize,
        backgroundColor: title.backgroundColor,
    }

    const fishTitleBorderStyle = { backgroundColor: title.backgroundColor }

    const color = { color: title.backgroundColor }

    const wrapperStyle = {
        display: title.display,
        padding: title.padding,
    }

    const titleStyle = {
        borderBottom: title.border,
        fontSize: title.fontSize,
    }

    const showAllStyle = {
        fontSize: title.showAll.fontSize,
        color: title.showAll.color,
        borderBottom: title.showAll.border,
        paddingTop: title.showAll.top
    }

    const iconStyle = {
        color: title.iconColor,
    }

    const buttonStyle = {
        border: title.showAll.button && '1px solid #00000020',
        padding: title.showAll.button && '0.5rem 4rem',
    }

    if (title.display !== 'none') {
        if (title.design === 'Fish') {
            return (
                <div className='fish-title-design'>
                    <div className='fish-title-border' style={fishTitleBorderStyle} />
                    <div className='fish-title-cont'>
                        <div className='fish-title-left-border' style={color} />
                        <div className='fish-title' style={fishTitleStyle}>{title.title}</div>
                        <div className='fish-title-right-border' style={color} />
                    </div>
                </div>
            )
        } else if (title.design === 'Classic') {
            return (
                <div className='classic-title-cont'>
                    <div className='classic-title-border' />
                    <div className='classic-title'>{title.title}</div>
                </div>
            )
        } else if (title.design === 'Classic-1') {
            return (
                <div className='classic-2-title-wrap' style={wrapperStyle}>
                    <div className='classic-2-title' style={titleStyle}>{title.title}</div>
                    <div className='classic-2-title-border' style={showAllStyle}>
                        <div style={buttonStyle} className='classic-title-button'>show all
                        <FontAwesomeIcon icon={faChevronRight} style={iconStyle} className='faChevronRight' />
                        </div>
                    </div>
                </div>
            )
        } else if (title.design === 'Stunning') {
            return (
                <div className='stunning-wrap'>
                    <div className='stunning-img-wrap'>
                        <img src={img1} className='stunning-img'></img>
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