import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight, faChevronLeft, faChevronRight, faCircle, faStar } from '@fortawesome/free-solid-svg-icons';
import { url } from '../../constants/defaultImages'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';

export const SlideBox = React.memo(({ slideBox, mobileScreen, touchScreen, products }) => {
    const dispatch = useDispatch()
    const mobile = slideBox.mobile
    const slides = products ? [...slideBox.slides, ...products] : slideBox.slides || []
    const skeleton = !mobileScreen ? slideBox.skeleton : mobile.skeleton

    const scrollBehavior = (!mobileScreen
        ? slideBox.swiper.scroll.behavior
        : mobile.swiper.scroll.behavior) || 'auto'

    const slidesOverlayStyle = !mobileScreen
        ? {
            display: slideBox.display,
            width: slideBox.width,
            height: slideBox.height,
            position: 'relative',
            overflow: 'hidden',
        } : {
            display: mobile.display,
            width: mobile.width,
            height: mobile.height,
            position: 'relative',
            overflow: 'hidden',
        }

    const slidesWrapperStyle = {
        width: '100%',
        height: '100%',
        padding: !mobileScreen ? slideBox.paddingAround : mobile.paddingAround,
        borderRadius: !mobileScreen ? slideBox.borderRadius : mobile.borderRadius
    }

    const [swiperBox, setSwiperBox] = useState(!mobileScreen
        ? {
            height: slideBox.height,
            display: slideBox.display,
            flexWrap: slideBox.flexWrap,
            backgroundColor: slideBox.backgroundColor,
            gridColumnGap: slideBox.paddingBetween,
            gridRowGap: slideBox.paddingBetween,
            gridTemplateColumns: `repeat(auto-fit, minmax(${slideBox.slideWidth}, 1fr))`,
            borderRadius: slideBox.slideBorderRadius,
            maxHeight: slideBox.showMore.display === 'none' ? '2000px' : slideBox.slideHeight,
            overflow: scrollBehavior === 'auto' ? 'auto' : 'hidden'
        } : {
            height: mobile.height,
            display: mobile.display,
            flexWrap: mobile.flexWrap,
            backgroundColor: mobile.backgroundColor,
            gridColumnGap: mobile.paddingBetween,
            gridRowGap: mobile.paddingBetween,
            gridTemplateColumns: `repeat(auto-fit, minmax(${mobile.slideWidth}, 1fr))`,
            borderRadius: mobile.slideBorderRadius,
            maxHeight: mobile.showMore.display === 'none' ? '2000px' : mobile.slideHeight,
            overflow: scrollBehavior === 'auto' ? 'auto' : 'hidden'
        })

    const [rightChevronWrapperBackgound, setRightChevronWrapperBackgound] = useState(!mobileScreen
        ? { backgroundColor: slideBox.swiper.chevrons.backgroundColor }
        : { backgroundColor: mobile.swiper.chevrons.backgroundColor })

    const [leftChevronWrapperBackgound, setleftChevronWrapperBackgound] = useState(!mobileScreen
        ? { backgroundColor: slideBox.swiper.chevrons.backgroundColor }
        : { backgroundColor: mobile.swiper.chevrons.backgroundColor })

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

    const imageWrapStyle = !mobileScreen
        ? {
            height: slideBox.slideTitle.display !== 'none'
                ? `calc(${slideBox.imgHeight} - ${slideBox.slideTitle.height})`
                : slideBox.imgHeight,
            borderRadius: slideBox.imgBorderRadius,
            width: slideBox.imgForceWidth && slideBox.imgWidth,
            maxWidth: slideBox.imgWidth
        } : {
            height: mobile.slideTitle.display !== 'none'
                ? `calc(${mobile.imgHeight} - ${mobile.slideTitle.height})`
                : mobile.imgHeight,
            borderRadius: mobile.imgBorderRadius,
            width: mobile.imgForceWidth && mobile.imgWidth,
            maxWidth: mobile.imgWidth
        }

    const imageStyle = !mobileScreen
        ? {
            height: slideBox.imgForceWidth && slideBox.imgHeight,
            maxHeight: slideBox.imgHeight,
            borderRadius: slideBox.imgBorderRadius,
            transform: !slideBox.imgAnimation && 'unset',
            width: slideBox.imgForceWidth && slideBox.imgWidth,
            maxWidth: slideBox.imgWidth
        } : {
            height: mobile.imgForceWidth && mobile.imgHeight,
            maxHeight: mobile.imgHeight,
            borderRadius: mobile.imgBorderRadius,
            transform: !mobile.imgAnimation && 'unset',
            width: mobile.imgForceWidth && mobile.imgWidth,
            maxWidth: mobile.imgWidth
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
            boxShadow: !slideBox.swiper.chevrons.boxShadow && 'none'
        } : {
            display: mobile.swiper.chevrons.display,
            height: mobile.swiper.chevrons.height,
            width: mobile.swiper.chevrons.width,
            hoverBackgroundColor: mobile.swiper.chevrons.hoverBackgroundColor,
            initialBackgroundColor: mobile.swiper.chevrons.backgroundColor,
            boxShadow: !mobile.swiper.chevrons.boxShadow && 'none'
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

    const linkSlide = (e, src) => {
        //handleQuickView({})
    }

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

    var gapWidth = !mobileScreen
        ? slideBox.paddingBetween
        : mobile.paddingBetween

    const [slideWidth, setSlideWidth] = useState()
    const [slideHeight, setSlideHeight] = useState()
    const [bulletWidth, setBulletWidth] = useState()

    if (gapWidth.includes('rem')) gapWidth = parseFloat(gapWidth) * 10
    else gapWidth = parseFloat(gapWidth)

    var skip = (!mobileScreen
        ? slideBox.swiper.skip
        : mobile.swiper.skip) || 1

    var widthSlideSkipper = slideWidth
        ? (slideWidth + gapWidth) * skip
        : slideWidth * skip

    var heightSlideSkipper = (slideHeight + gapWidth) * skip

    const duration = !mobileScreen
        ? slideBox.swiper.autoPlay.duration
        : mobile.swiper.autoPlay.duration

    const autoPlay = !mobileScreen
        ? slideBox.swiper.autoPlay.run
        : mobile.swiper.autoPlay.run

    const scrollAutoToggle = !mobileScreen
        ? slideBox.swiper.scroll.autoToggle
        : mobile.swiper.scroll.autoToggle

    const verticalSwiper = !mobileScreen
        ? (slideBox.swiper.direction === 'Y' ? true : false)
        : (mobile.swiper.direction === 'Y' ? true : false)

    const [swiperWrapper, setSwiperWrapper] = useState()
    const [bulletsWrapper, setBulletsWrapper] = useState()
    const [leftChevron, setLeftChevron] = useState()
    const [rightChevron, setRightChevron] = useState()
    const [timeOut, setTimeOut] = useState()
    const [slideIndex, setSlideIndex] = useState()

    const getSlideSize = (e) => {
        setSlideWidth(e.currentTarget.offsetWidth)
        setSlideHeight(e.currentTarget.offsetHeight)
    }

    useEffect(() => {
        if (slideWidth) widthSlideSkipper = (slideWidth + gapWidth) * skip
        if (slideHeight) heightSlideSkipper = (slideHeight + gapWidth) * skip

        if (slideWidth && !timeOut && autoPlay) // run autoPlay
            setTimeOut(setInterval(() => chevronRight(), duration))

    }, [slideWidth, slideHeight])

    const mouseDownHandler = (e) => {
        !touchScreen && e.preventDefault()
        swiperWrapper.style.scrollBehavior = 'auto'
        drag = true

        clientX = e.clientX || e.touches[0].clientX
        clientY = e.clientY || e.touches[0].clientY
        prevClientX = clientX
        prevClientY = clientY

        scrollLeft = e.currentTarget.scrollLeft
        scrollTop = e.currentTarget.scrollTop
        scrollWidth = e.currentTarget.scrollWidth - e.currentTarget.clientWidth
        scrollHeight = e.currentTarget.scrollHeight - e.currentTarget.clientHeight

        if (!touchScreen) {
            window.addEventListener('mousemove', mouseMoveHandler)
            window.addEventListener('mouseup', mouseUpHandler)
        } else {
            window.addEventListener('touchend', mouseUpHandler)
            window.addEventListener('touchmove', touchMoveHandler)
        }

        clearTimeout(timeOut)
    }

    const mouseUpHandler = (e) => {
        drag = false
        swiperWrapper.style.scrollBehavior = scrollBehavior
        ToggleScroll(e)
        window.removeEventListener('mousemove', mouseMoveHandler)
        window.removeEventListener('mouseup', mouseUpHandler)
        window.removeEventListener('touchend', mouseUpHandler)
        window.removeEventListener('touchmove', touchMoveHandler)

        autoPlay && setTimeOut(setInterval(() => chevronRight(), duration))
    }
    var lastClientX
    var mouseTravel
    const mouseMoveHandler = (e) => {
        if (drag) {
            if (verticalSwiper) {

                if (e.clientY > clientY && swiperWrapper.scrollTop === 0) {// case scroll is 0
                    scrollTop = 0
                    clientY = e.clientY
                }
                swiperWrapper.scrollTop = scrollTop - (e.clientY - clientY)
                if (swiperWrapper.scrollTop === scrollHeight) {// case scroll is maximum
                    scrollTop = swiperWrapper.scrollTop
                    clientY = e.clientY
                }
            } else {
                mouseTravel = Math.abs(lastClientX - e.clientX)
                lastClientX = e.clientX
                if (e.clientX > clientX && swiperWrapper.scrollLeft === 0) {// case scroll is 0
                    scrollLeft = 0
                    clientX = e.clientX
                }
                swiperWrapper.scrollLeft = scrollLeft - (e.clientX - clientX)
                if (swiperWrapper.scrollLeft === scrollWidth) {// case scroll is maximum
                    scrollLeft = swiperWrapper.scrollLeft
                    clientX = e.clientX
                }
            }
        }
    }

    const touchStartHandler = e => {
        mouseDownHandler(e)
    }

    const touchMoveHandler = e => {
        if (drag) {
            if (verticalSwiper) {

                if (e.touches[0].clientY > clientY && swiperWrapper.scrollTop === 0) {// case scroll is 0
                    scrollTop = 0
                    clientY = e.touches[0].clientY
                }
                swiperWrapper.scrollTop = scrollTop - (e.touches[0].clientY - clientY)
                if (swiperWrapper.scrollTop === scrollHeight) {// case scroll is maximum
                    scrollTop = swiperWrapper.scrollTop
                    clientY = e.touches[0].clientY
                }

            } else {

                if (e.touches[0].clientX > clientX && swiperWrapper.scrollLeft === 0) {// case scroll is 0
                    scrollLeft = 0
                    clientX = e.touches[0].clientX
                }
                swiperWrapper.scrollLeft = scrollLeft - (e.touches[0].clientX - clientX)

                if (swiperWrapper.scrollLeft === scrollWidth) {// case scroll is maximum
                    scrollLeft = swiperWrapper.scrollLeft
                    clientX = e.touches[0].clientX
                }
            }
        }
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
            if (swiperWrapper.scrollWidth === (swiperWrapper.clientWidth + swiperWrapper.scrollLeft))
                swiperWrapper.scrollLeft = 0
            else if (swiperWrapper.scrollWidth === (swiperWrapper.clientWidth + swiperWrapper.scrollLeft) + 1)
                swiperWrapper.scrollLeft = 0
            else if (visibleWidthofSlide === slideWidth) scrollLeft += widthSlideSkipper
            else if (visibleWidthofSlide === slideWidth - 1) scrollLeft += widthSlideSkipper
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
        if (!verticalSwiper) {
            var index = parseInt((swiperWrapper.scrollLeft + swiperWrapper.clientWidth + gapWidth) / (slideWidth + gapWidth) + 0.01) - 1
            if (slideIndex !== index) {
                //const bulletsWrapper = document.getElementsByClassName(slideBox._id)[0]
                setSlideIndex(index)
                //if ((slides.length - 1 - index) > 1 && index !== 0 && index !== 1)
                //bulletsWrapper.scrollLeft += 15
            }
        } else {
            var index = parseInt((swiperWrapper.scrollTop + swiperWrapper.clientHeight + gapWidth) / (slideHeight + gapWidth) + 0.01) - 1
            if (slideIndex !== index) {
                setSlideIndex(index)
                //bulletsWrapper.scrollLeft -= bulletWidth
            }
        }
    }

    const ToggleScroll = e => {
        const currClientX = !touchScreen ? e.clientX : e.changedTouches[0].clientX
        const currClientY = !touchScreen ? e.clientY : e.changedTouches[0].clientY
        const minScroll = !verticalSwiper ? swiperWrapper.scrollLeft === 0 : swiperWrapper.scrollTop === 0
        const maxScroll = !verticalSwiper ? scrollWidth === swiperWrapper.scrollLeft : scrollHeight === swiperWrapper.scrollTop

        if (scrollBehavior === 'smooth') { // auto scroll
            if (verticalSwiper) {
                if (currClientY < clientY && !maxScroll) chevronRight(e)
                else if (currClientY > clientY && !minScroll) chevronLeft(e)
            } else if (!verticalSwiper) {
                if (currClientX < clientX && !maxScroll) chevronRight(e)//swiperWrapper.scrollLeft += Math.pow(mouseTravel, 2)
                else if (currClientX > clientX && !minScroll) chevronLeft(e)//swiperWrapper.scrollLeft -= Math.pow(mouseTravel, 2)
            }
        }

        if (scrollAutoToggle) // toggle scroll if scroll on min or max
            if (!verticalSwiper && currClientX !== prevClientX) {
                if (minScroll) chevronLeft(e)
                else if (maxScroll) chevronRight(e)

            } else if (verticalSwiper && currClientY !== prevClientY) {
                if (minScroll) chevronTop(e)
                else if (maxScroll) chevronBottom(e)
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

    ////////////////////// Bullets ///////////////////////

    const Bullets = React.memo(() => {
        const bullets = !mobileScreen
            ? slideBox.swiper.bullets
            : mobile.swiper.bullets

        const bulletsCont = {
            display: bullets.display,
            bottom: bullets.bottom,
        }

        const bulletsWrap = {
            gridColumnGap: bullets.paddingBetween,
            gridRowGap: bullets.paddingBetween,
        }

        const bulletCont = {}
        const bulletWrap = {}

        const bullet = {
            fontSize: bullets.fontSize,
        }

        const setWrapWidth = e => {
            var gapWidth = bullets.paddingBetween
            if (gapWidth.includes('rem')) gapWidth = parseFloat(bullets.paddingBetween) * 10
            else gapWidth = parseFloat(bullets.paddingBetween)
            setBulletWidth(e.currentTarget.offsetWidth + gapWidth)
        }

        return (
            <div style={bulletsCont} className='bullets-cont'>
                <div style={bulletsWrap} className='bullets-wrap'>
                    {slides.map(slide =>
                        <div style={bulletCont} key={slides.indexOf(slide)} className='slide-wrapper'>
                            <div style={bulletWrap} onError={e => !bulletWidth && setWrapWidth(e)}>
                                <img src='' style={{ display: 'none' }} />
                                <FontAwesomeIcon style={{ ...bullet, color: slides.indexOf(slide) === slideIndex ? '#00bdd9' : '#eeeeee' }}
                                    icon={faCircle} />
                            </div>
                        </div>)}
                </div>
            </div>
        )
    })

    /////////////////////// Badges ///////////////////////

    //const badgesList = ['4%', '5%', '10%']
    const badges = (!mobileScreen ? slideBox.badges : mobile.badges) || {}

    const badgesWrap = {
        display: badges.display,
        top: badges.top,
        left: badges.left,
        gridRowGap: badges.paddingBetween,
        gridColumnGap: badges.paddingBetween,
        gridTemplateColumns: `repeat(auto-fit, minmax(${badges.badgeWidth}, 1fr))`,
    }
    const badgeWrap = {
        height: badges.badgeHeight,
        width: badges.badgeWidth,
        borderRadius: badges.borderRadius,
    }
    const badgeStyle = {
        color: badges.color,
        fontSize: badges.fontSize
    }

    /*const [badgeList, setBadgeList] = useState()
    useEffect(() => {
        if (badges && badgesList && !badgeList)
            setBadgeList([...badges.badges, ...badgesList])
    }, [badges, badgesList])*/

    const Badges = React.memo((discount) => {
        const disc = (discount.discount && discount.discount !== 0 && [discount.discount + '%']) || []
        const badgeList = [...badges.badges, ...disc]
        return (
            <div className='badges-wrap' style={badgesWrap}>
                {badgeList && badgeList.map(badge =>
                    <div className='badge-wrap'
                        style={{ ...badgeWrap, backgroundColor: badges.backgroundColors[badgeList.indexOf(badge)] }}>
                        <div style={badgeStyle}>{badge}</div>
                    </div>)}
            </div>
        )
    })

    // Product Quick View Handler
    const handleQuickView = (product) => {
        dispatch({ type: 'UPDATE_ACTIONS', payload: { quickView: { product } } })
        window.addEventListener('click', (e) => {
            const quickViewOverlay = document.querySelector('.quick-view-overlay')
            if (e.target === quickViewOverlay) {
                dispatch({ type: 'REMOVE_FROM_ACTIONS', payload: 'quickView' })
            }
        })
    }

    useEffect(() => {
        const element = document.getElementsByClassName(slideBox._id)[0]
        if (element) {
            const titleElements = [...element.getElementsByClassName('product-name')]
            var maxHeight = 0
            titleElements.map(e => {
                if (e.offsetHeight > maxHeight) maxHeight = e.offsetHeight
            })
            for (var i = 0, len = titleElements.length; i < len; i++) {
                titleElements[i].style["height"] = maxHeight + 'px';
            }
        }
    }, [])

    return (
        <div className={'slides-overlay ' + slideBox._id} style={slidesOverlayStyle}>
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
                    <div className="slideBox-wrapper" style={swiperBox}
                        onMouseDown={e => swiperWrapper && mouseDownHandler(e)}
                        onTouchStart={e => swiperWrapper && touchStartHandler(e)}
                        onError={e => setSwiperWrapper(e.currentTarget)}
                        onScroll={ToggleChevrons}>
                        <img src='' style={{ display: 'none' }} />
                        {slides.length > 0 && slides.map(slide =>
                            <div className='slide-wrapper' style={slideWrapperStyle} key={slides.indexOf(slide)}
                                onLoadCapture={getSlideSize}>
                                <Badges discount={slide.discount} />
                                <div className='image-wrap' style={imageWrapStyle}>
                                    {/*<div className='image-skeleton' style={skeleton}>Sarah Originals</div>*/}
                                    <img src={/*imageUrl + slide.src*/url(slide.src || slide.image)}
                                        className="hero-submain-img"
                                        style={imageStyle}
                                        onClick={e => linkSlide(e, slide.link)}
                                    //onLoad={e => { e.currentTarget.previousSibling.classList.add('hide') }}
                                    />
                                </div>
                                {!products
                                    ? <div className='data-container-0'>
                                        <div className='slide-title' style={slideTitleStyle}>
                                            {slide.title}
                                            {!mobileScreen && <FontAwesomeIcon icon={faChevronCircleRight} style={circleRightChevronStyle} />}
                                        </div>
                                    </div>
                                    : <div className='data-container'>
                                        <div className="product-name">
                                            <Link to={"/product/" + slide._id}>
                                                <div className='product-nameEn'>{slide.nameEn}</div>
                                            </Link>
                                        </div>
                                        {/*Done*/}
                                        <div className="product-brand">{slide.brand}</div>
                                        <div className="product-price">
                                            <div className={slide.discount > 0 ? 'before-discount' : ''}>${slide.priceUsd}</div>
                                            {slide.discount > 0 &&
                                                <div className='after-discount'>${Math.round(100 * (slide.priceUsd - slide.priceUsd * slide.discount / 100)) / 100}</div>
                                            }
                                            <div className='product-review-container'>
                                                <FontAwesomeIcon icon={faStar} className='faStar' />
                                                <div className='product-review'>4.5</div>
                                                <div className='product-review-qty'>(21)</div>
                                            </div>
                                        </div>
                                    </div>}
                            </div>
                        )}
                    </div>
                </div>
                <Bullets />
                <ShowMore />
            </div>
        </div>
    )
})