import React from 'react'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const TitleContainer = (slideRibbon) => {

    const titleBackgroundColor = slideRibbon.title.backgroundColor
    const titleStyle = {
        color: { color: titleBackgroundColor },
        backgroundColor: { backgroundColor: titleBackgroundColor },
    }

    if (slideRibbon.title.design === 'fish') {
        return (
            <>
                <div className='fish-title-border' style={titleStyle.backgroundColor}></div>
                <div className='fish-title-cont'>
                    <div className='fish-title-left-border' style={titleStyle.color}></div>
                    <div className='fish-title' style={titleStyle.backgroundColor}>
                        {slideRibbon.title.title}
                    </div>
                    <div className='fish-title-right-border' style={titleStyle.color}></div>
                </div>
            </>
        )
    } else if (slideRibbon.title.design === 'show-all') {
        return (
            <div className='slider-container-title-line'>
                <div className='slider-container-title'>{slideRibbon.title.title} Products</div>
                <div className='slider-container-show-all'>show all
                    <FontAwesomeIcon icon={faChevronRight} className='faChevronRight' /></div>
            </div>
        )
    } else return (<></>)
}