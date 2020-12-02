import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import Swiper from 'react-id-swiper';
import { TitleContainer } from './TitleContainer'

export const SlideRibbon = (controls) => {
    const imageUrl = window.location.origin + '/api/uploads/image/'

    const swiper = {
        shortSwipes: true,
        slidesOffsetAfter: 0,
        freeMode: true,
        freeModeMomentumRatio: 1,
        grabCursor: true,
        slidesPerView: 'auto',
    }

    //////////////////////////////////// Props ///////////////////////////////////

    const slideRibbon = controls.slideRibbon[0]
    const slideBorder = slideRibbon.slide.border + ' solid #f9f9f9'
    const slideBackgroundColor = slideRibbon.slide.backgroundColor
    const slideFlexDirection = slideRibbon.slide.flexDirection
    const slideTitleJustify = slideRibbon.slide.title.justifyContent
    const slideTitleDisplay = slideRibbon.slide.title.display

    const ribbonWidth = window.innerWidth > 700
        ? slideRibbon.ribbon.width
        : slideRibbon.mobile.ribbon.width

    const slideWidth = window.innerWidth > 700
        ? slideRibbon.slide.width
        : slideRibbon.mobile.slide.width

    const imgHeight = window.innerWidth > 700
        ? slideRibbon.image.maxHeight
        : slideRibbon.mobile.image.maxHeight

    const imgWidth = window.innerWidth > 700
        ? slideRibbon.image.maxWidth
        : slideRibbon.mobile.image.maxWidth

    const imgContWidth = window.innerWidth > 700
        ? slideRibbon.image.containerWidth
        : slideRibbon.mobile.image.containerWidth

    const imgContHeight = window.innerWidth > 700
        ? slideRibbon.image.containerHeight
        : slideRibbon.mobile.image.containerHeight


    ////////////////////////////////Styles/////////////////////////////////////

    const RibbonContStyle = { width: ribbonWidth }
    const slideSwiperContStyle = { maxWidth: ribbonWidth, minWidth: ribbonWidth }
    const slideContStyle = { maxWidth: slideWidth, minWidth: slideWidth, border: slideBorder, backgroundColor: slideBackgroundColor, flexDirection: slideFlexDirection }
    const imgContStyle = { width: imgContWidth, height: imgContHeight }
    const imgStyle = { maxWidth: imgWidth, maxHeight: imgHeight }
    const slideTitleContStyle = { justifyContent: slideTitleJustify, display: slideTitleDisplay }

    return (
        <>
            <div className='product-ribbon-overlay'>
                <div className='product-ribbon-container'
                    style={RibbonContStyle}>
                    {TitleContainer(slideRibbon)}
                    <div className='product-swiper-container' style={slideSwiperContStyle}>
                        {slideRibbon.slides &&
                            (window.innerWidth > 700 ?
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
                                </div>)}
                    </div>
                </div>
            </div>
        </>
    )
}