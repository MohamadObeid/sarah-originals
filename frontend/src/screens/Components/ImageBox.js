import React, { useEffect, useState } from 'react';
import Swiper from 'react-id-swiper';
import img01 from '../../images/sample-1.jpg';
import img02 from '../../images/sample-2.jpg';
import img03 from '../../images/sample-3.jpg';
import img1 from '../../images/category-sample-1.jpg';
import img2 from '../../images/category-sample-2.jpg';
import img3 from '../../images/category-sample-3.jpg';
import img4 from '../../images/category-sample-4.jpg';
import img5 from '../../images/category-sample-5.jpg';
import img6 from '../../images/category-sample-6.png';
import img7 from '../../images/category-sample-7.jpg';
import img8 from '../../images/category-sample-8.jpg';
import img9 from '../../images/category-sample-9.png';
import img10 from '../../images/category-sample-10.png';
import img11 from '../../images/category-sample-11.png';
import img12 from '../../images/banner-sample-1.jpg';
import img13 from '../../images/banner-sample-2.jpg';
import img14 from '../../images/banner-sample-3.jpg';
import img15 from '../../images/banner-sample-4.jpg';
import img16 from '../../images/banner-sample-5.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { DoubleRightOutlined } from '@ant-design/icons'

export const ImageBox = React.memo(({ imageBox, mobileScreen }) => {
    console.log('rendering image box')

    const flexDirection = imageBox.flexDirection
    const overlayPadding = !mobileScreen ? imageBox.overlayPadding : imageBox.mobile.overlayPadding
    const paddingAround = !mobileScreen ? imageBox.paddingAround : imageBox.mobile.paddingAround
    const paddingBetween = imageBox.paddingBetween
    const backgroundColor = imageBox.backgroundColor
    const mainBanner = imageBox.swiper
    const submainBanner = imageBox.fixed
    const mobile = imageBox.mobile
    const swiperSlides = imageBox.swiperSlides || []
    const fixedSlides = imageBox.fixedSlides || []

    const imageBoxStyle = !mobileScreen
        ? {
            flexDirection,
            padding: paddingAround,
            backgroundColor
        } : {
            flexDirection: mobile.flexDirection,
            padding: mobile.paddingAround,
            backgroundColor
        }

    const mainimageBoxStyle = !mobileScreen
        ? {
            width: mainBanner.width,
            display: mainBanner.display,
            height: mainBanner.height,
            borderRadius: mainBanner.borderRadius
        } : {
            width: mobile.swiper.width,
            display: mobile.swiper.display,
            height: mobile.swiper.height,
            borderRadius: mobile.swiper.borderRadius
        }

    const bannerMarginStyle = !mobileScreen
        ? {
            display: imageBox.swiper.display === 'none' && 'none',
            minWidth: paddingBetween,
            maxWidth: paddingBetween,
            minHeight: paddingBetween,
            maxHeight: paddingBetween,
        } : {
            display: mobile.swiper.display === 'none' && 'none',
            minWidth: mobile.fixed.paddingBetween,
            maxWidth: mobile.fixed.paddingBetween,
            minHeight: mobile.fixed.paddingBetween,
            maxHeight: mobile.fixed.paddingBetween
        }

    const fixedSlidesWrapper = !mobileScreen
        ? {
            width: submainBanner.width,
        } : {
            width: mobile.fixed.width,
        }

    const [submainBoxStyle, setSubmainBoxStyle] = useState({})
    const [rightChevronWrapperBackgound, setRightChevronWrapperBackgound] = useState()
    const [leftChevronWrapperBackgound, setleftChevronWrapperBackgound] = useState()

    useEffect(() => {
        setSubmainBoxStyle(!mobileScreen
            ? {
                height: submainBanner.height,
                display: submainBanner.display,
                flexWrap: submainBanner.flexWrap,
                padding: submainBanner.paddingAround,
                justifyContent: submainBanner.justifyContent,
                backgroundColor: submainBanner.backgroundColor,
                gridColumnGap: submainBanner.paddingBetween,
                gridRowGap: submainBanner.paddingBetween,
                gridTemplateColumns: `repeat(auto-fit, minmax(${submainBanner.slideWidth}, 1fr))`,
                borderRadius: submainBanner.slideBorderRadius,
                maxHeight: imageBox.showMore.display === 'none' ? '2000px' : submainBanner.slideHeight,
            } : {
                height: mobile.fixed.height,
                display: mobile.fixed.display,
                flexWrap: mobile.fixed.flexWrap,
                padding: mobile.fixed.paddingAround,
                justifyContent: mobile.fixed.justifyContent,
                backgroundColor: mobile.fixed.backgroundColor,
                gridColumnGap: mobile.fixed.paddingBetween,
                gridRowGap: mobile.fixed.paddingBetween,
                gridTemplateColumns: `repeat(auto-fit, minmax(${mobile.fixed.slideWidth}, 1fr))`,
                borderRadius: mobile.fixed.slideBorderRadius,
                maxHeight: imageBox.showMore.display === 'none' ? '2000px' : mobile.fixed.slideHeight,
            })

        slideWidth = !mobileScreen ? submainBanner.slideWidth : mobile.fixed.slideWidth
        if (slideWidth.includes('rem')) slideWidth = parseInt(slideWidth) * 10 + 'px'

        setRightChevronWrapperBackgound(!mobileScreen
            ? {
                backgroundColor: submainBanner.swiper.chevrons.backgroundColor
            } : {
                backgroundColor: mobile.fixed.swiper.chevrons.backgroundColor
            })

        setleftChevronWrapperBackgound(!mobileScreen
            ? {
                backgroundColor: submainBanner.swiper.chevrons.backgroundColor
            } : {
                backgroundColor: mobile.fixed.swiper.chevrons.backgroundColor
            })
    }, [mobileScreen])

    const slideWrapperStyle = !mobileScreen
        ? {
            height: submainBanner.slideHeight,
            //width: submainBanner.slideWidth,
            borderRadius: submainBanner.slideBorderRadius,
            border: submainBanner.slideBorder,
            backgroundColor: submainBanner.slideBackgroundColor,
        } : {
            height: mobile.fixed.slideHeight,
            //width: mobile.fixed.slideWidth,
            borderRadius: mobile.fixed.slideBorderRadius,
            border: mobile.fixed.slideBorder,
            backgroundColor: mobile.fixed.slideBackgroundColor,
        }

    const heroSubmainImgStyle = !mobileScreen
        ? {
            height: imageBox.fixed.slideTitle.display !== 'none'
                ? `calc(${submainBanner.imgHeight} - ${imageBox.fixed.slideTitle.height})`
                : submainBanner.imgHeight,
            maxWidth: !submainBanner.swipable && submainBanner.imgWidth,
            borderRadius: submainBanner.imgBorderRadius,
            transform: !imageBox.animateImage && 'unset',
            width: submainBanner.swipable && submainBanner.slideWidth
        } : {
            height: imageBox.fixed.slideTitle.display !== 'none'
                ? `calc(${mobile.fixed.imgHeight} - ${imageBox.fixed.slideTitle.mobileHeight})`
                : mobile.fixed.imgHeight,
            maxWidth: !mobile.fixed.swipable && mobile.fixed.imgWidth,
            borderRadius: mobile.fixed.imgBorderRadius,
            transform: !imageBox.animateImage && 'unset',
            width: mobile.fixed.swipable && mobile.fixed.slideWidth
        }

    const showMoreStyle = {
        display: imageBox.showMore.display,
    }

    const [chevronsStyle, setChevronStyle] = useState({ color: imageBox.showMore.color })

    const slideTitleStyle = !mobileScreen
        ? {
            display: imageBox.fixed.slideTitle.display,
            backgroundColor: imageBox.fixed.slideTitle.backgroundColor,
            color: imageBox.fixed.slideTitle.color,
            fontSize: imageBox.fixed.slideTitle.fontSize,
            height: imageBox.fixed.slideTitle.height,
        } : {
            display: mobile.fixed.slideTitle.display,
            backgroundColor: mobile.fixed.slideTitle.backgroundColor,
            color: mobile.fixed.slideTitle.color,
            fontSize: mobile.fixed.slideTitle.fontSize,
            height: mobile.fixed.slideTitle.height,
        }

    const swiperChevrons = !mobileScreen
        ? {
        } : {

        }

    const chevronWrapperStyle = !mobileScreen
        ? {
            display: submainBanner.swiper.chevrons.display,
            color: submainBanner.swiper.chevrons.color,
            height: submainBanner.swiper.chevrons.height,
            width: submainBanner.swiper.chevrons.width,
            hoverBackgroundColor: submainBanner.swiper.chevrons.hoverBackgroundColor,
            initialBackgroundColor: submainBanner.swiper.chevrons.backgroundColor,
            top: `calc(50% - ${parseFloat(submainBanner.swiper.chevrons.height) / 2 + 'rem'})`
        } : {
            display: mobile.fixed.swiper.chevrons.display,
            color: mobile.fixed.swiper.chevrons.color,
            height: mobile.fixed.swiper.chevrons.height,
            width: mobile.fixed.swiper.chevrons.width,
            hoverBackgroundColor: mobile.fixed.swiper.chevrons.hoverBackgroundColor,
            initialBackgroundColor: mobile.fixed.swiper.chevrons.backgroundColor,
            top: `calc(50% - ${parseFloat(mobile.fixed.swiper.chevrons.height) / 2 + 'rem'})`
        }


    const swiper = {
        height: 200,
        slidesPerView: 1,
        spaceBetween: 10,
        grabCursor: true,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type: 'bullets',
            dynamicBullets: true,
        },
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
    }

    const circleRightChevronStyle = { color: imageBox.showMore.color }

    const linkSlide = (e, src) => { }

    const url = (src) => {
        return (
            src === '../../images/sample-1.jpg'
                ? img01
                : src === '../../images/sample-2.jpg'
                    ? img02
                    : src === '../../images/sample-3.jpg'
                        ? img03
                        : src === '../../images/category-sample-1.jpg'
                            ? img1
                            : src === '../../images/category-sample-2.jpg'
                                ? img2
                                : src === '../../images/category-sample-3.jpg'
                                    ? img3
                                    : src === '../../images/category-sample-4.jpg'
                                        ? img4
                                        : src === '../../images/category-sample-5.jpg'
                                            ? img5
                                            : src === '../../images/category-sample-6.png'
                                                ? img6
                                                : src === '../../images/category-sample-7.jpg'
                                                    ? img7
                                                    : src === '../../images/category-sample-8.jpg'
                                                        ? img8
                                                        : src === '../../images/category-sample-9.png'
                                                            ? img9
                                                            : src === '../../images/category-sample-10.png'
                                                                ? img10
                                                                : src === '../../images/category-sample-11.png'
                                                                    ? img11
                                                                    : src === '../../images/banner-sample-1.jpg'
                                                                        ? img12
                                                                        : src === '../../images/banner-sample-2.jpg'
                                                                            ? img13
                                                                            : src === '../../images/banner-sample-3.jpg'
                                                                                ? img14
                                                                                : src === '../../images/banner-sample-4.jpg'
                                                                                    ? img15
                                                                                    : src === '../../images/banner-sample-5.jpg'
                                                                                    && img16
        )
    }

    const TitleContainer = () => {
        const title = imageBox.title.title
        const fishTitleStyle = {
            fontSize: imageBox.title.fontSize,
            backgroundColor: imageBox.title.backgroundColor,
        }
        const fishTitleBorderStyle = {
            backgroundColor: imageBox.title.backgroundColor,
        }
        const color = { color: imageBox.title.backgroundColor }
        const titleDesignStyle = { display: imageBox.title.display }

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
    }

    const [showMoreText, setShowMoreText] = useState(imageBox.showMore.moreText)

    const showMore = e => {
        e.preventDefault()
        if (showMoreText === imageBox.showMore.moreText) {
            setSubmainBoxStyle({ ...submainBoxStyle, maxHeight: '2000px' })
            setShowMoreText(imageBox.showMore.lessText)
            setChevronStyle({ ...chevronsStyle, transform: 'rotate(-90deg)' })

        } else {
            setSubmainBoxStyle(!mobileScreen ?
                { ...submainBoxStyle, maxHeight: submainBanner.slideHeight }
                : { ...submainBoxStyle, maxHeight: mobile.fixed.slideHeight })

            setShowMoreText(imageBox.showMore.moreText)
            setChevronStyle({ ...chevronsStyle, transform: 'rotate(90deg)' })
        }
    }

    const [showMoreTextColor, setShowMoreTextColor] = useState('#707070')

    ///////////////////// Swiper //////////////////////

    var drag = false
    var clientX = 0
    var scrollLeft = 0
    var scrollWidth = 0
    var slideWidth = !mobileScreen ? submainBanner.slideWidth : mobile.fixed.slideWidth
    var gapWidth = !mobileScreen ? submainBanner.paddingBetween : mobile.fixed.paddingBetween

    if (slideWidth.includes('rem')) slideWidth = parseFloat(slideWidth) * 10
    else slideWidth = parseFloat(slideWidth)

    if (gapWidth.includes('rem')) gapWidth = parseFloat(gapWidth) * 10
    else gapWidth = parseFloat(gapWidth)

    var skip = 1
    var slideSkipper = (slideWidth + gapWidth) * skip

    const [swiperWrapper, setSwiperWrapper] = useState()
    const [leftChevron, setLeftChevron] = useState()
    const [rightChevron, setRightChevron] = useState()

    const mouseDownHandler = e => {
        e.preventDefault()
        swiperWrapper.style.scrollBehavior = 'auto'
        drag = true
        clientX = e.clientX
        scrollLeft = e.currentTarget.scrollLeft
        scrollWidth = e.currentTarget.scrollWidth - e.currentTarget.clientWidth
        window.addEventListener('mousemove', mouseMoveHandler)
        window.addEventListener('mouseup', mouseUpHandler)
    }

    const mouseUpHandler = () => {
        drag = false
        clientX = 0
        scrollLeft = swiperWrapper.scrollLeft
        window.removeEventListener('mousemove', mouseMoveHandler)
        window.removeEventListener('mouseup', mouseUpHandler)
    }

    const mouseMoveHandler = (e) => {
        if (drag) {
            if (e.clientX > clientX && swiperWrapper.scrollLeft === 0) { // case scroll is 0
                scrollLeft = 0
                clientX = e.clientX
            }
            swiperWrapper.scrollLeft = scrollLeft - (e.clientX - clientX) // scrollLeft is initial scroll
            if (swiperWrapper.scrollLeft === scrollWidth) { // case scroll is maximum
                clientX = e.clientX
                scrollLeft = swiperWrapper.scrollLeft
            }
        }
    }

    /*const mouseLeaveHandler = (e) => {
        drag = false
        scrollLeft = e.currentTarget.scrollLeft
        triggerChevrons(scrollLeft)
    }*/

    const chevronRight = e => {
        e.preventDefault()
        if (swiperWrapper) {
            swiperWrapper.style.scrollBehavior = 'smooth'
            var visibleWidthofSlide = (swiperWrapper.clientWidth + swiperWrapper.scrollLeft) % (slideWidth + gapWidth)
            scrollLeft = swiperWrapper.scrollLeft
            if (visibleWidthofSlide === slideWidth) scrollLeft += slideSkipper
            else scrollLeft += slideWidth - visibleWidthofSlide + (slideSkipper - (slideWidth + gapWidth))
            swiperWrapper.scrollLeft = scrollLeft
        }
    }
    const chevronLeft = e => {
        e.preventDefault()
        if (swiperWrapper) {
            swiperWrapper.style.scrollBehavior = 'smooth'
            var visibleWidthofSlide = swiperWrapper.scrollLeft % (slideWidth + gapWidth)
            scrollLeft = swiperWrapper.scrollLeft
            if (visibleWidthofSlide === 0) scrollLeft += - slideSkipper
            else scrollLeft += - visibleWidthofSlide - (slideSkipper - (slideWidth + gapWidth))
            swiperWrapper.scrollLeft = scrollLeft
        }
    }

    const triggerChevrons = () => {
        if (!isNaN(scrollLeft)) {

            if (swiperWrapper.scrollLeft >= swiperWrapper.scrollWidth - swiperWrapper.clientWidth) // maximum right
                rightChevron.style.backgroundColor = '#ffffff70'
            else rightChevron.style.backgroundColor = chevronWrapperStyle.initialBackgroundColor

            if (swiperWrapper.scrollLeft <= 0) // maximum left
                leftChevron.style.backgroundColor = '#ffffff70'
            else leftChevron.style.backgroundColor = chevronWrapperStyle.initialBackgroundColor
        }
    }

    return (
        <>
            <div style={{ padding: overlayPadding, width: '100vw' }}>
                <div className="hero-banners" style={imageBoxStyle}>
                    <TitleContainer />
                    <div className="hero-banner-main" style={mainimageBoxStyle}>
                        <Swiper {...swiper}>
                            {swiperSlides.length > 0 && swiperSlides.map(slide => (
                                <img src={/*imageUrl + slide.src*/url(slide.src)}
                                    className="hero-main-img"
                                    onClick={e => linkSlide(e, slide.link)}
                                    key={slide.title}>
                                </img>))}
                        </Swiper>
                    </div>
                    <div className='banner-margin' style={bannerMarginStyle}></div>
                    <div style={fixedSlidesWrapper} className='fixed-slides-wrapper'>
                        <div className='left-chevron-wrap' onClick={e => chevronLeft(e)}
                            style={{ ...chevronWrapperStyle, ...leftChevronWrapperBackgound }}
                            onError={e => setLeftChevron(e.currentTarget)}
                            onMouseEnter={e => setleftChevronWrapperBackgound({ backgroundColor: chevronWrapperStyle.hoverBackgroundColor })}
                            onMouseLeave={e => setleftChevronWrapperBackgound({ backgroundColor: chevronWrapperStyle.initialBackgroundColor })}>
                            <img src='' style={{ display: 'none' }} />
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </div>
                        <div className='right-chevron-wrap' onClick={e => chevronRight(e)}
                            style={{ ...chevronWrapperStyle, ...rightChevronWrapperBackgound }}
                            onError={e => setRightChevron(e.currentTarget)}
                            onMouseEnter={e => setRightChevronWrapperBackgound({ backgroundColor: chevronWrapperStyle.hoverBackgroundColor })}
                            onMouseLeave={e => setRightChevronWrapperBackgound({ backgroundColor: chevronWrapperStyle.initialBackgroundColor })}>
                            <img src='' style={{ display: 'none' }} />
                            <FontAwesomeIcon icon={faChevronRight} />
                        </div>
                        <div className="hero-banner-submain" style={submainBoxStyle}
                            onMouseDown={e => mouseDownHandler(e)}
                            onError={e => setSwiperWrapper(e.currentTarget)}
                            onScroll={triggerChevrons}>
                            <img src='' style={{ display: 'none' }} />
                            {fixedSlides.length > 0 && fixedSlides.map(slide => (
                                <div className='slide-wrapper' style={slideWrapperStyle} key={fixedSlides.indexOf(slide)}>
                                    <img src={/*imageUrl + slide.src*/url(slide.src)}
                                        className="hero-submain-img"
                                        style={heroSubmainImgStyle}
                                        onClick={e => linkSlide(e, slide.link)}>
                                    </img>
                                    <div className='slide-title' style={slideTitleStyle}>
                                        {slide.title}
                                        {!mobileScreen && <FontAwesomeIcon icon={faChevronCircleRight} style={circleRightChevronStyle} />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='show-more-submain' style={showMoreStyle} onClick={e => showMore(e)}>
                        <div style={{ color: showMoreTextColor }}
                            onMouseEnter={() => setShowMoreTextColor(imageBox.showMore.color)}
                            onMouseLeave={() => setShowMoreTextColor('#707070')}>{showMoreText}</div>
                        <DoubleRightOutlined className='DoubleRightOutlined' style={chevronsStyle} />
                    </div>
                </div>
            </div>
        </>
    )
})