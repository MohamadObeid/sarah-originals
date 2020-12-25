import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

export const TitleContainer = React.memo(({ imageBox, mobileScreen }) => {
    const mobile = imageBox.mobile
    const title = !mobileScreen ? imageBox.title.title : mobile.title.title

    const fishTitleStyle = !mobileScreen
        ? {
            fontSize: imageBox.title.fontSize,
            backgroundColor: imageBox.title.backgroundColor,
        } : {
            fontSize: mobile.title.fontSize,
            backgroundColor: mobile.title.backgroundColor,
        }

    const fishTitleBorderStyle = !mobileScreen
        ? { backgroundColor: imageBox.title.backgroundColor }
        : { backgroundColor: mobile.title.backgroundColor }

    const color = !mobileScreen
        ? { color: imageBox.title.backgroundColor }
        : { color: mobile.title.backgroundColor }

    const titleDesignStyle = !mobileScreen
        ? { display: imageBox.title.display }
        : { display: mobile.title.display }

    if (imageBox.title.design === 'Fish') {
        return (
            <div className='fish-title-design' style={titleDesignStyle}>
                <div className='fish-title-border' style={fishTitleBorderStyle} />
                <div className='fish-title-cont'>
                    <div className='fish-title-left-border' style={color} />
                    <div className='fish-title' style={fishTitleStyle}>{title}</div>
                    <div className='fish-title-right-border' style={color} />
                </div>
            </div>
        )
    } else if (imageBox.title.design === 'show-all') {
        return (
            <div className='slider-container-title-line' style={titleDesignStyle}>
                <div className='slider-container-title'>{title}</div>
                <div className='slider-container-show-all'>show all
                        <FontAwesomeIcon icon={faChevronRight} className='faChevronRight' />
                </div>
            </div>
        )
    } else if (imageBox.title.design === 'Classic') {
        return (
            <div className='classic-title-cont'>
                <div className='classic-title-border' />
                <div className='classic-title'>{title}</div>
            </div>
        )
    } else return (<></>)
})