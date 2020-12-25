import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { url } from '../../constants/defaultImages'

export const SlideBox = React.memo(({ slideBox, mobileScreen, touchScreen }) => {
    const mobile = slideBox.mobile
    const slides = slideBox.slides || []

    const slidesOverlayStyle = !mobileScreen
        ? {
            display: slideBox.display,
            width: slideBox.width,
            height: slideBox.height,
        } : {
            display: mobile.display,
            width: mobile.width,
            height: mobile.height,
        }

    const slidesWrapperStyle = {
        width: 'inherit',
        height: 'inherit',
    }

    const [swiperBox, setSwiperBox] = useState({})
    const [rightChevronWrapperBackgound, setRightChevronWrapperBackgound] = useState()
    const [leftChevronWrapperBackgound, setleftChevronWrapperBackgound] = useState()

    const slideWrapperStyle = !mobileScreen
        ? {
            height: slideBox.slideHeight,
            minWidth: slideBox.slideWidth,
            borderRadius: slideBox.slideBorderRadius,
            border: slideBox.slideBorder,
            backgroundColor: slideBox.slideBackgroundColor,
        } : {
            height: mobile.slideHeight,
            minWidth: mobile.slideWidth,
            borderRadius: mobile.slideBorderRadius,
            border: mobile.slideBorder,
            backgroundColor: mobile.slideBackgroundColor,
        }

    const imageStyle = !mobileScreen
        ? {
            height: slideBox.slideTitle.display !== 'none'
                ? `calc(${slideBox.imgHeight} - ${slideBox.slideTitle.height})`
                : slideBox.imgHeight,
            borderRadius: slideBox.imgBorderRadius,
            transform: !slideBox.imgAnimation && 'unset',
            width: slideBox.imgWidth
        } : {
            height: mobile.slideTitle.display !== 'none'
                ? `calc(${mobile.imgHeight} - ${mobile.slideTitle.height})`
                : mobile.imgHeight,
            borderRadius: mobile.imgBorderRadius,
            transform: !mobile.imgAnimation && 'unset',
            width: mobile.imgWidth
        }

    const slideTitleStyle = !mobileScreen
        ? {
            display: slideBox.slideTitle.display,
            backgroundColor: slideBox.slideTitle.backgroundColor,
            color: slideBox.slideTitle.color,
            fontSize: slideBox.slideTitle.fontSize,
            height: slideBox.slideTitle.height,
        } : {
            display: mobile.slideTitle.display,
            backgroundColor: mobile.slideTitle.backgroundColor,
            color: mobile.slideTitle.color,
            fontSize: mobile.slideTitle.fontSize,
            height: mobile.slideTitle.height,
        }

    const chevronWrapperStyle = !mobileScreen
        ? {
            display: slideBox.swiper.chevrons.display,
            height: slideBox.swiper.chevrons.height,
            width: slideBox.swiper.chevrons.width,
            hoverBackgroundColor: slideBox.swiper.chevrons.hoverBackgroundColor,
            initialBackgroundColor: slideBox.swiper.chevrons.backgroundColor,
            boxShadow: slideBox.swiper.chevrons.backgroundColor === '#00000000' && 'none'
        } : {
            display: mobile.swiper.chevrons.display,
            height: mobile.swiper.chevrons.height,
            width: mobile.swiper.chevrons.width,
            hoverBackgroundColor: mobile.swiper.chevrons.hoverBackgroundColor,
            initialBackgroundColor: mobile.swiper.chevrons.backgroundColor,
            boxShadow: mobile.swiper.chevrons.backgroundColor === '#00000000' && 'none'
        }

    const leftChevronWrapper = !mobileScreen
        ? (
            slideBox.swiper.direction === 'X'
                ? {
                    top: `calc(50% - ${parseFloat(slideBox.swiper.chevrons.height) / 2 + 'rem'})`,
                    left: '0',
                    transform: 'rotate(0)',
                } : {
                    top: `calc(-${parseFloat(slideBox.swiper.chevrons.width) / 2 + 'rem'})`,
                    left: `calc(50% - ${parseFloat(slideBox.swiper.chevrons.width) / 2 + 'rem'})`,
                    transform: 'rotate(90deg)',
                }
        ) : (
            slideBox.swiper.direction === 'X'
                ? {
                    top: `calc(50% - ${parseFloat(mobile.swiper.chevrons.height) / 2 + 'rem'})`,
                    left: '0',
                    transform: 'rotate(0)',
                } : {
                    top: `calc(-${parseFloat(mobile.swiper.chevrons.width) / 2 + 'rem'})`,
                    left: `calc(50% - ${parseFloat(mobile.swiper.chevrons.width) / 2 + 'rem'})`,
                    transform: 'rotate(90deg)',
                }
        )

    const rightChevronWrapper = !mobileScreen
        ? (
            slideBox.swiper.direction === 'X'
                ? {
                    top: `calc(50% - ${parseFloat(slideBox.swiper.chevrons.height) / 2 + 'rem'})`,
                    right: '0',
                    transform: 'rotate(0)',
                } : {
                    bottom: `calc(-${parseFloat(slideBox.swiper.chevrons.width) / 2 + 'rem'})`,
                    right: `calc(50% - ${parseFloat(slideBox.swiper.chevrons.width) / 2 + 'rem'})`,
                    transform: 'rotate(90deg)',
                }
        ) : (
            slideBox.swiper.direction === 'X'
                ? {
                    top: `calc(50% - ${parseFloat(mobile.swiper.chevrons.height) / 2 + 'rem'})`,
                    right: '0',
                    transform: 'rotate(0)',
                } : {
                    bottom: `calc(-${parseFloat(mobile.swiper.chevrons.width) / 2 + 'rem'})`,
                    right: `calc(50% - ${parseFloat(mobile.swiper.chevrons.width) / 2 + 'rem'})`,
                    transform: 'rotate(90deg)',
                }
        )

    const swiperChevronsStyle = !mobileScreen
        ? { color: slideBox.swiper.chevrons.color }
        : { color: mobile.swiper.chevrons.color }


    const circleRightChevronStyle = { color: slideBox.showMore.color }

    const linkSlide = (e, src) => { }

    const [showMoreText, setShowMoreText] = useState(slideBox.showMore.moreText)
    const [pageYOffset, setPageYOffset] = useState()
    const [chevronsStyle, setChevronStyle] = useState({ color: slideBox.showMore.color })

    const showMore = e => {
        e.preventDefault()
        if (!swiperBox.visible) {
            setSwiperBox({ ...swiperBox, maxHeight: '2000px', visible: true })
            setShowMoreText(slideBox.showMore.lessText)
            setChevronStyle({ ...chevronsStyle, transform: 'rotate(180deg)' })
            setPageYOffset(document.documentElement.scrollTop)

        } else {
            setSwiperBox(!mobileScreen ?
                { ...swiperBox, maxHeight: slideBox.slideHeight, visible: false }
                : { ...swiperBox, maxHeight: mobile.slideHeight, visible: false })
            setShowMoreText(slideBox.showMore.moreText)
            setChevronStyle({ ...chevronsStyle, transform: 'unset' })
            document.documentElement.scrollTop = pageYOffset
        }
    }

    ///////////////////// Swiper Functions //////////////////////

    var drag = false
    var clientX = 0
    var prevClientX = 0
    var clientY = 0
    var prevClientY = 0
    var scrollLeft = 0
    var scrollTop = 0
    var scrollWidth = 0
    var scrollHeight = 0

    const scrollBehavior = (!mobileScreen
        ? slideBox.swiper.scroll.behavior
        : mobile.swiper.scroll.behavior) || 'auto'

    var gapWidth = !mobileScreen
        ? slideBox.paddingBetween
        : mobile.paddingBetween

    const slideWidthInit = !mobileScreen // init slideWidth
        ? slideBox.slideWidth : mobile.slideWidth

    const slideHeightInit = !mobileScreen
        ? slideBox.slideHeight : mobile.slideHeight

    const [slideWidth, setSlideWidth] = useState()
    const [slideHeight, setSlideHeight] = useState()

    if (gapWidth.includes('rem')) gapWidth = parseFloat(gapWidth) * 10
    else gapWidth = parseFloat(gapWidth)

    var skip = (!mobileScreen
        ? slideBox.swiper.chevrons.skip
        : mobile.swiper.chevrons.skip) || 1

    var widthSlideSkipper = (slideWidth + gapWidth) * skip
    var heightSlideSkipper = (slideHeight + gapWidth) * skip

    const duration = !mobileScreen
        ? slideBox.swiper.autoPlay.duration
        : mobile.swiper.autoPlay.duration

    const autoPlay = !mobileScreen
        ? slideBox.swiper.autoPlay.run
        : mobile.swiper.autoPlay.run

    const overflowY = !mobileScreen
        ? slideBox.overflowY
        : mobile.overflowY

    const scrollAutoToggle = !mobileScreen
        ? slideBox.swiper.scroll.autoToggle
        : mobile.swiper.scroll.autoToggle

    const verticalSwiper = !mobileScreen
        ? (slideBox.swiper.direction === 'Y' && true)
        : (mobile.swiper.direction === 'Y' && true)

    const [swiperWrapper, setSwiperWrapper] = useState()
    const [leftChevron, setLeftChevron] = useState()
    const [rightChevron, setRightChevron] = useState()
    const [topChevron, setTopChevron] = useState()
    const [bottomChevron, setBottomChevron] = useState()
    const [timeOut, setTimeOut] = useState()

    useEffect(() => {

        if (swiperWrapper && !slideWidth) { // ex. slideWidth = 100%
            ToggleChevrons()
            // set sLideWidth value
            if (slideWidthInit.includes('%')) {
                const percentage = parseFloat(slideWidthInit) * 0.01
                setSlideWidth(swiperWrapper.clientWidth * percentage)
            } else if (slideWidthInit.includes('rem'))
                setSlideWidth(parseFloat(slideWidthInit) * 10)
            else setSlideWidth(parseFloat(slideWidthInit))
        }

        if (swiperWrapper && !slideHeight) {
            ToggleChevrons()
            // set slideHeight value
            if (slideHeightInit.includes('%')) {
                const percentage = parseFloat(slideHeightInit) * 0.01
                setSlideHeight(swiperWrapper.clientWidth * percentage)
            } else if (slideHeightInit.includes('rem'))
                setSlideHeight(parseFloat(slideHeightInit) * 10)
            else setSlideHeight(parseFloat(slideHeightInit))
        }

        if (slideWidth && !timeOut && autoPlay) // run autoPlay
            setTimeOut(setInterval(() => chevronRight(), duration))

        /*if (slideHeight && !timeOut && autoPlay) // run autoPlay
            setTimeOut(setInterval(() => chevronBottom(), duration))*/

    }, [swiperWrapper, slideWidth])

    const mouseDownHandler = e => {
        e.preventDefault()
        swiperWrapper.style.scrollBehavior = 'auto'
        drag = true

        clientX = e.clientX || e.touches[0].clientX
        clientY = e.clientY || e.touches[0].clientY
        prevClientX = e.clientX || e.touches[0].clientX
        prevClientY = e.clientY || e.touches[0].clientY

        scrollLeft = e.currentTarget.scrollLeft
        scrollTop = e.currentTarget.scrollTop
        scrollWidth = e.currentTarget.scrollWidth - e.currentTarget.clientWidth
        scrollHeight = e.currentTarget.scrollHeight - e.currentTarget.clientHeight

        window.addEventListener('mousemove', mouseMoveHandler)
        window.addEventListener('mouseup', mouseUpHandler)
        window.addEventListener('touchend', mouseUpHandler)

        clearTimeout(timeOut)
    }

    const mouseUpHandler = (e) => {
        swiperWrapper.style.scrollBehavior = scrollBehavior
        ToggleScroll(e)
        drag = false
        clientX = 0
        clientY = 0
        prevClientX = 0
        prevClientY = 0
        window.removeEventListener('mousemove', mouseMoveHandler)
        window.removeEventListener('mouseup', mouseUpHandler)
        window.removeEventListener('touchend', mouseUpHandler)

        autoPlay && setTimeOut(setInterval(() => chevronRight(), duration))
    }

    const mouseMoveHandler = (e) => {
        if (drag) {
            if (e.clientX > clientX && swiperWrapper.scrollLeft === 0) {// case scroll is 0
                scrollLeft = 0
                clientX = e.clientX
            }
            if (e.clientY > clientY && swiperWrapper.scrollTop === 0) {// case scroll is 0
                scrollTop = 0
                clientY = e.clientY
            }
            swiperWrapper.scrollLeft = scrollLeft - (e.clientX - clientX)
            swiperWrapper.scrollTop = scrollTop - (e.clientY - clientY)

            if (swiperWrapper.scrollLeft === scrollWidth) {// case scroll is maximum
                scrollLeft = swiperWrapper.scrollLeft
                clientX = e.clientX
            }
            if (swiperWrapper.scrollTop === scrollHeight) {// case scroll is maximum
                scrollTop = swiperWrapper.scrollTop
                clientY = e.clientY
            }
        }
    }

    const touchStartHandler = e => {
        mouseDownHandler(e)
    }

    const chevronRight = e => {
        if (swiperWrapper) {
            if (verticalSwiper) {
                chevronBottom(e)
                return
            }

            swiperWrapper.style.scrollBehavior = 'smooth'
            var visibleWidthofSlide = (swiperWrapper.clientWidth + swiperWrapper.scrollLeft) % (slideWidth + gapWidth)
            scrollLeft = swiperWrapper.scrollLeft
            if (swiperWrapper.scrollWidth === (swiperWrapper.clientWidth + swiperWrapper.scrollLeft)
                || swiperWrapper.scrollWidth === (swiperWrapper.clientWidth + swiperWrapper.scrollLeft) + 1)
                swiperWrapper.scrollLeft = 0
            else if (visibleWidthofSlide === slideWidth) scrollLeft += widthSlideSkipper
            else scrollLeft += slideWidth - visibleWidthofSlide + (widthSlideSkipper - (slideWidth + gapWidth))
            swiperWrapper.scrollLeft = scrollLeft
        }
    }

    const chevronLeft = e => {
        if (swiperWrapper) {
            if (verticalSwiper) {
                chevronTop(e)
                return
            }
            swiperWrapper.style.scrollBehavior = 'smooth'
            var visibleWidthofSlide = swiperWrapper.scrollLeft % (slideWidth + gapWidth)
            scrollLeft = swiperWrapper.scrollLeft
            if (swiperWrapper.scrollLeft === 0) scrollLeft = swiperWrapper.scrollWidth
            else if (visibleWidthofSlide === 0) scrollLeft += - widthSlideSkipper
            else if (visibleWidthofSlide === 1) scrollLeft += - widthSlideSkipper - 1
            else scrollLeft += - visibleWidthofSlide - (widthSlideSkipper - (slideWidth + gapWidth))
            swiperWrapper.scrollLeft = scrollLeft
        }
    }

    const chevronBottom = e => {
        if (swiperWrapper) {
            swiperWrapper.style.scrollBehavior = 'smooth'
            var visibleHeightofSlide = (swiperWrapper.clientHeight + swiperWrapper.scrollTop) % (slideHeight + gapWidth)
            scrollTop = swiperWrapper.scrollTop
            if (swiperWrapper.scrollHeight === (swiperWrapper.clientHeight + swiperWrapper.scrollTop)
                || swiperWrapper.scrollHeight === (swiperWrapper.clientHeight + swiperWrapper.scrollTop) + 1)
                swiperWrapper.scrollTop = 0
            else if (visibleHeightofSlide === slideHeight) scrollTop += heightSlideSkipper
            else scrollTop += slideHeight - visibleHeightofSlide + (heightSlideSkipper - (slideHeight + gapWidth))
            swiperWrapper.scrollTop = scrollTop
        }
    }

    const chevronTop = e => {
        if (swiperWrapper) {
            swiperWrapper.style.scrollBehavior = 'smooth'
            var visibleHeightofSlide = swiperWrapper.scrollTop % (slideHeight + gapWidth)
            scrollTop = swiperWrapper.scrollTop
            if (swiperWrapper.scrollTop === 0) scrollTop = swiperWrapper.scrollHeight
            else if (visibleHeightofSlide === 0) scrollTop += - heightSlideSkipper
            else if (visibleHeightofSlide === 1) scrollTop += - heightSlideSkipper - 1
            else scrollTop += - visibleHeightofSlide - (heightSlideSkipper - (slideHeight + gapWidth))
            swiperWrapper.scrollTop = scrollTop
        }
    }

    const ToggleChevrons = () => {
        const autoToggle = !mobileScreen
            ? slideBox.swiper.chevrons.autoToggle
            : mobile.swiper.chevrons.autoToggle

        const chevronsVisible = !mobileScreen
            ? slideBox.swiper.chevrons.display
            : mobile.swiper.chevrons.display

        if (!isNaN(scrollLeft) && autoToggle && chevronsVisible !== 'none') {
            //console.log(swiperWrapper.scrollLeft, swiperWrapper.scrollWidth - swiperWrapper.clientWidth)
            if (verticalSwiper
                ? swiperWrapper.scrollTop + swiperWrapper.clientHeight === swiperWrapper.scrollHeight
                : swiperWrapper.scrollLeft + swiperWrapper.clientWidth === swiperWrapper.scrollWidth) // maximum right
                rightChevron.style.display = 'none'
            else rightChevron.style.display = 'flex'

            if (verticalSwiper
                ? swiperWrapper.scrollTop === 0
                : swiperWrapper.scrollLeft === 0) // maximum left
                leftChevron.style.display = 'none'
            else leftChevron.style.display = 'flex'
        }
    }

    const ToggleScroll = e => {

        if (scrollBehavior === 'smooth') {
            if (e.clientX < clientX) chevronRight(e)
            else if (e.clientX > clientX) chevronLeft(e)
            if (e.changedTouches) {
                if (e.changedTouches[0].clientX < clientX) chevronRight(e)
                else if (e.changedTouches[0].clientX > clientX) chevronLeft(e)
            }

            if (e.clientY < clientY) chevronBottom(e)
            else if (e.clientY > clientY) chevronTop(e)
            if (!e.clientY) {
                if (e.changedTouches[0].clientY < clientY) chevronBottom(e)
                else if (e.changedTouches[0].clientY > clientY) chevronTop(e)
            }
        }

        if (scrollAutoToggle)
            if (!verticalSwiper && e.clientX !== prevClientX) {
                if (swiperWrapper.scrollLeft === 0) chevronLeft(e)
                else if (scrollWidth === swiperWrapper.scrollLeft) chevronRight(e)

            } else if (verticalSwiper && e.clientY !== prevClientY) {
                if (swiperWrapper.scrollTop === 0) chevronTop(e)
                else if (scrollHeight === swiperWrapper.scrollTop) chevronBottom(e)

            }
    }

    /////////////////////////// Show more ////////////////////////////

    const ShowMore = React.memo(() => {
        const showMoreStyle = !mobileScreen
            ? {
                display: slideBox.showMore.display,
                fontSize: slideBox.showMore.fontSize,
            } : {
                display: mobile.showMore.display,
                fontSize: mobile.showMore.fontSize,
            }

        const [showMoreTextColor, setShowMoreTextColor] = useState('#707070')

        if (slideBox.showMore.design === 'Classic' && !mobileScreen || mobile.showMore.design === 'Classic' && mobileScreen) {
            return (
                <div className='show-more-submain' style={showMoreStyle}
                    onClick={e => showMore(e)}>
                    <div style={{ color: showMoreTextColor }}
                        onMouseEnter={() => setShowMoreTextColor(slideBox.showMore.color)}
                        onMouseLeave={() => setShowMoreTextColor('#707070')}>{showMoreText}
                    </div>
                    <div className='chevron-wrapper'>
                        <FontAwesomeIcon icon={faChevronRight}
                            className='DoubleRightOutlined' style={chevronsStyle} />
                    </div>
                </div>
            )
        } else if (slideBox.showMore.design === 'Bullet' && !mobileScreen || mobile.showMore.design === 'Bullet' && mobileScreen) {
            return (
                <div className='showMore-wrapper' onClick={e => showMore(e)}
                    style={showMoreStyle}>
                    <img src='' style={{ display: 'none' }} />
                    <FontAwesomeIcon icon={faChevronRight} style={chevronsStyle} />
                </div>
            )
        }
    })

    useEffect(() => {
        setSwiperBox(!mobileScreen
            ? {
                height: slideBox.height,
                display: slideBox.display,
                flexWrap: slideBox.flexWrap,
                padding: slideBox.paddingAround,
                justifyContent: slideBox.justifyContent,
                backgroundColor: slideBox.backgroundColor,
                gridColumnGap: slideBox.paddingBetween,
                gridRowGap: slideBox.paddingBetween,
                gridTemplateColumns: `repeat(auto-fit, minmax(${slideBox.slideWidth}, 1fr))`,
                borderRadius: slideBox.slideBorderRadius,
                maxHeight: slideBox.showMore.display === 'none' ? '2000px' : slideBox.slideHeight,
                touchAction: autoPlay && slideBox.slideWidth === '100%' && 'none',
                overflowY: slideBox.overflowY
            } : {
                height: mobile.height,
                display: mobile.display,
                flexWrap: mobile.flexWrap,
                padding: mobile.paddingAround,
                justifyContent: mobile.justifyContent,
                backgroundColor: mobile.backgroundColor,
                gridColumnGap: mobile.paddingBetween,
                gridRowGap: mobile.paddingBetween,
                gridTemplateColumns: `repeat(auto-fit, minmax(${mobile.slideWidth}, 1fr))`,
                borderRadius: mobile.slideBorderRadius,
                maxHeight: mobile.showMore.display === 'none' ? '2000px' : mobile.slideHeight,
                touchAction: autoPlay && mobile.slideWidth === '100%' && 'none',
                overflowY: mobile.overflowY,
            })

        setRightChevronWrapperBackgound(!mobileScreen
            ? { backgroundColor: slideBox.swiper.chevrons.backgroundColor }
            : { backgroundColor: mobile.swiper.chevrons.backgroundColor })

        setleftChevronWrapperBackgound(!mobileScreen
            ? { backgroundColor: slideBox.swiper.chevrons.backgroundColor }
            : { backgroundColor: mobile.swiper.chevrons.backgroundColor })

    }, [mobileScreen])

    return (
        <div className='slides-overlay' style={slidesOverlayStyle}>
            <div className='flex-slides-wrapper'>
                <div className='fixed-slides-wrapper' style={slidesWrapperStyle}>

                    {/*/////////////////// Chevrons //////////////////*/}

                    <div className='left-chevron-wrap' onClick={e => {
                        clearTimeout(timeOut)
                        chevronLeft(e)
                        autoPlay && setTimeOut(setInterval(() => chevronRight(), duration))
                    }}
                        style={{ ...chevronWrapperStyle, ...leftChevronWrapperBackgound, ...leftChevronWrapper }}
                        onError={e => setLeftChevron(e.currentTarget)}
                        onMouseEnter={e => setleftChevronWrapperBackgound({ backgroundColor: chevronWrapperStyle.hoverBackgroundColor })}
                        onMouseLeave={e => setleftChevronWrapperBackgound({ backgroundColor: chevronWrapperStyle.initialBackgroundColor })}>
                        <img src='' style={{ display: 'none' }} />
                        <FontAwesomeIcon icon={faChevronLeft} style={swiperChevronsStyle} />
                    </div>
                    <div className='right-chevron-wrap' onClick={e => {
                        clearTimeout(timeOut)
                        chevronRight(e)
                        autoPlay && setTimeOut(setInterval(() => chevronRight(), duration))
                    }}
                        style={{ ...chevronWrapperStyle, ...rightChevronWrapperBackgound, ...rightChevronWrapper }}
                        onError={e => setRightChevron(e.currentTarget)}
                        onMouseEnter={e => setRightChevronWrapperBackgound({ backgroundColor: chevronWrapperStyle.hoverBackgroundColor })}
                        onMouseLeave={e => setRightChevronWrapperBackgound({ backgroundColor: chevronWrapperStyle.initialBackgroundColor })}>
                        <img src='' style={{ display: 'none' }} />
                        <FontAwesomeIcon icon={faChevronRight} style={swiperChevronsStyle} />
                    </div>

                    {/*////////////////////// Swiper ///////////////////////*/}
                    <div className="hero-banner-submain" style={swiperBox}
                        onMouseDown={e => mouseDownHandler(e)}
                        onTouchStart={e => touchStartHandler(e)}
                        onError={e => setSwiperWrapper(e.currentTarget)}
                        onScroll={ToggleChevrons}>
                        <img src='' style={{ display: 'none' }} />
                        {slides.length > 0 && slides.map(slide =>
                            <div className='slide-wrapper' style={slideWrapperStyle} key={slides.indexOf(slide)}>
                                <img src={/*imageUrl + slide.src*/url(slide.src)}
                                    className="hero-submain-img"
                                    style={imageStyle}
                                    onClick={e => linkSlide(e, slide.link)}>
                                </img>
                                <div className='slide-title' style={slideTitleStyle}>
                                    {slide.title}
                                    {!mobileScreen && <FontAwesomeIcon icon={faChevronCircleRight} style={circleRightChevronStyle} />}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/*////////////////////// Show more ////////////////////////*/}
                <ShowMore />
            </div>
        </div>
    )
})