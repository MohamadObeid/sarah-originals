import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react'
import Swiper from 'react-id-swiper';
//import { TitleContainer } from './TitleContainer'

export const SlideRibbon = React.memo(props => {

    const {
        slideRibbon, imageUrl, RibbonContStyle, slideSwiperContStyle, slideContStyle,
        imgContStyle, imgStyle, slideTitleContStyle, swiper, titleStyle, mobileScreen
    } = props.slideRibbonProps

    const TitleContainer = () => {

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

    return (
        <>
            <div className='product-ribbon-overlay'>
                <div className='product-ribbon-container'
                    style={RibbonContStyle}>
                    {TitleContainer(slideRibbon)}
                    <div className='product-swiper-container' style={slideSwiperContStyle}>
                        {slideRibbon.slides &&
                            (!mobileScreen ?
                                <Swiper {...swiper}>
                                    {slideRibbon.slides.map(product => (
                                        <div className='slide-ribbon-container' style={slideContStyle}
                                            key={slideRibbon.slides.indexOf(product)}>
                                            <div className='product-ribbon-image-container' style={imgContStyle}>
                                                <img src={imageUrl + product.image} alt={product.nameEn} style={imgStyle} />
                                            </div>
                                            <div className='product-title-cont-in-ribbon-slide' style={slideTitleContStyle}>
                                                <div className='product-title-in-ribbon-slide'>{product.title}</div>
                                                <FontAwesomeIcon icon={faChevronRight} name={faChevronRight}
                                                    className='faChevronRight-slide-title' />
                                            </div>
                                        </div>
                                    ))}
                                </Swiper>
                                : <div className='mobile-swiper-container'>
                                    {slideRibbon.slides.map(product => (
                                        <div className='slide-ribbon-container' style={slideContStyle}
                                            key={slideRibbon.slides.indexOf(product)}>
                                            <div className='product-ribbon-image-container' style={imgContStyle}>
                                                <img src={imageUrl + product.image} alt={product.title} style={imgStyle} />
                                            </div>
                                            <div className='product-title-cont-in-ribbon-slide' style={slideTitleContStyle}>
                                                <div className='product-title-in-ribbon-slide'>{product.title}</div>
                                                <FontAwesomeIcon icon={faChevronRight} name={faChevronRight} className='faChevronRight-slide-title' />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </>
    )
})