import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight, faChevronLeft, faChevronRight, faCircle, faStar } from '@fortawesome/free-solid-svg-icons'
import { url } from '../../constants/defaultImages'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { TitleContainer } from './TitleContainer'
import { showTimer } from '../../methods/methods'
import { Timer } from './SlideBoxComponents'

const SlideBox = ({ slideBox, mobileScreen, touchScreen, slideList }) => {
    const dispatch = useDispatch()
    var timeOut
    var swiperWrapper
    var leftChevron
    var rightChevron
    var slideWidth
    var slideHeight
    var boxOpenned
    var element
    var slideIndex
    var lastClientX

    useEffect(() => {
        element = document.getElementsByClassName('slide-box-' + slideBox._id)[0]
        swiperWrapper = element.getElementsByClassName('slideBox-wrapper')[0]
        leftChevron = element.getElementsByClassName('left-chevron-wrap')[0]
        rightChevron = element.getElementsByClassName('right-chevron-wrap')[0]

        const titleElements = [...element.getElementsByClassName('slide-wrapper')]
        var maxHeight = 0

        titleElements.map(e => {
            if (e.offsetHeight > maxHeight)
                maxHeight = e.offsetHeight

            // if slide have a product timer => align the timer to the end
            if (e.getElementsByClassName('product-timer-wrap') && e.getElementsByClassName('product-timer-wrap').length > 0)
                e.getElementsByClassName('product-details-wrap')[0].style.justifyContent = 'space-between'
        })
        for (var i = 0, len = titleElements.length; i < len; i++) {
            titleElements[i].style["height"] = maxHeight + 'px';
        }

        slideHeight = maxHeight
        slideWidth = element.getElementsByClassName('slide-wrapper')[0] && element.getElementsByClassName('slide-wrapper')[0].offsetWidth

        widthSlideSkipper = (slideWidth + gapWidth) * skip
        heightSlideSkipper = (slideHeight + gapWidth) * skip

        const currSwiperWidth = swiperWrapper.offsetWidth
        const lineCapacity = parseInt((currSwiperWidth + gapWidth) / (slideWidth + gapWidth))
        const lineNum = slides.length / lineCapacity
        if (lineNum % 1 === 0)
            swiperHeight = ((slideHeight + gapWidth) * lineNum - gapWidth) + 'px'
        else if (lineNum % 1 > 0)
            swiperHeight = ((slideHeight + gapWidth) * (parseInt(lineNum + 1)) - gapWidth) + 'px'

        if (autoPlay && !timeOut)
            timeOut = [setInterval(() => chevronRight(), duration)]

        if (styles.swiper.swipable) ToggleChevrons(true)

    }, [])

    const mobile = slideBox.mobile
    const styles = !mobileScreen ? slideBox : mobile
    const slides = slideList ? [...slideBox.slides, ...slideList] : slideBox.slides || []
    const skeleton = styles.skeleton
    const skipMore = styles.swiper.skipMore
    const index = slideBox.slide.length > 1 ? 1 : 0

    const scrollBehavior = styles.swiper.scroll.behavior || 'auto'
    const verticalSwiper = styles.swiper.direction === 'Y' ? true : false

    const slidesOverlayStyle = {
        display: styles.display,
        width: styles.width,
        backgroundColor: styles.backgroundColor,
        border: styles.border,
        borderRadius: styles.borderRadius
    }

    const slidesWrapperStyle = {
        padding: styles.paddingAround,
        borderRadius: styles.borderRadius
    }

    const swiperBox = {
        display: styles.display,
        gridColumnGap: styles.paddingBetween,
        gridRowGap: styles.paddingBetween,
        gridTemplateColumns: `repeat(auto-fit, minmax(${styles.slide[index].width}, 1fr))`,
        borderRadius: styles.slide[index].borderRadius,
        overflow: styles.overflow,
        height: styles.height
    }

    // calc swiper box height according to slide height => to open whole swiper box
    var swiperHeight

    const slideContainer = {
        height: styles.slide[index].height,
        minWidth: styles.slide[index].width,
        borderRadius: styles.slide[index].borderRadius,
        border: styles.slide[index].border,
    }

    const slideContainerZero = {
        height: styles.slide[0].height,
        minWidth: styles.slide[0].width,
        borderRadius: styles.slide[0].borderRadius,
        border: styles.slide[0].border,
    }

    const slideWrapperStyle = {
        height: '100%',
        width: '100%',
        borderRadius: styles.slide[index].borderRadius,
        border: styles.slide[index].border,
        backgroundColor: styles.slide[index].backgroundColor,
        justifyContent: styles.slide[index].justifyContent
    }

    const slideWrapperStyleZero = {
        height: '100%',
        width: '100%',
        borderRadius: styles.slide[0].borderRadius,
        border: styles.slide[0].border,
        backgroundColor: styles.slide[0].backgroundColor,
        justifyContent: styles.slide[0].justifyContent
    }

    const imageWrapStyle = {
        minHeight: styles.slide[index].image.height,
        borderRadius: styles.slide[index].image.borderRadius,
        width: styles.slide[index].image.forceWidth && styles.slide[index].image.width,
        maxWidth: !styles.slide[index].image.forceWidth && styles.slide[index].image.width
    }

    const imageStyle = {
        height: styles.slide[index].image.forceWidth && styles.slide[index].image.height,
        maxHeight: styles.slide[index].image.height,
        borderRadius: styles.slide[index].image.borderRadius,
        transform: !styles.slide[index].image.animation && 'unset',
        width: styles.slide[index].image.forceWidth && styles.slide[index].image.width,
        maxWidth: styles.slide[index].image.width
    }

    const imageWrapStyleZero = {
        minHeight: styles.slide[0].image.height,
        borderRadius: styles.slide[0].image.borderRadius,
        width: styles.slide[0].image.forceWidth && styles.slide[0].image.width,
        maxWidth: !styles.slide[0].image.forceWidth && styles.slide[0].image.width
    }

    const imageStyleZero = {
        height: styles.slide[0].image.forceWidth && styles.slide[0].image.height,
        maxHeight: styles.slide[0].image.height,
        borderRadius: styles.slide[0].image.borderRadius,
        transform: !styles.slide[0].image.animation && 'unset',
        width: styles.slide[0].image.forceWidth && styles.slide[0].image.width,
        maxWidth: styles.slide[0].image.width
    }

    const slideTitleStyle = {
        display: styles.slide[index].title.display,
        backgroundColor: styles.slide[index].title.backgroundColor,
        color: styles.slide[index].title.color,
        fontSize: styles.slide[index].title.fontSize,
        height: styles.slide[index].title.height,
        margin: styles.slide[index].title.margin,
        border: styles.slide[index].title.border,
        borderRadius: styles.slide[index].title.borderRadius,
        padding: styles.slide[index].title.padding,
    }

    const slideTitleStyleZero = {
        display: styles.slide[0].title.display,
        backgroundColor: styles.slide[0].title.backgroundColor,
        color: styles.slide[0].title.color,
        fontSize: styles.slide[0].title.fontSize,
        height: styles.slide[0].title.height,
        margin: styles.slide[0].title.margin,
        border: styles.slide[0].title.border,
        borderRadius: styles.slide[0].title.borderRadius,
        padding: styles.slide[0].title.padding,
    }

    const chevronWrapperStyle = {
        display: styles.swiper.chevrons.display,
        height: styles.swiper.chevrons.height,
        width: styles.swiper.chevrons.width,
        backgroundColor: styles.swiper.chevrons.backgroundColor,
        hoverBackgroundColor: styles.swiper.chevrons.hoverBackgroundColor,
        initialBackgroundColor: styles.swiper.chevrons.backgroundColor,
        boxShadow: !styles.swiper.chevrons.boxShadow && 'none'
    }

    const leftChevronWrapper = !verticalSwiper
        ? {
            top: `calc(50% - ${parseFloat(styles.swiper.chevrons.height) / 2 + 'rem'})`,
            left: '0',
            transform: 'rotate(0)',
        } : {
            top: `calc(-${parseFloat(styles.swiper.chevrons.width) / 2 + 'rem'})`,
            left: `calc(50% - ${parseFloat(styles.swiper.chevrons.width) / 2 + 'rem'})`,
            transform: 'rotate(90deg)',
        }

    const rightChevronWrapper = !verticalSwiper
        ? {
            top: `calc(50% - ${parseFloat(styles.swiper.chevrons.height) / 2 + 'rem'})`,
            right: '0',
            transform: 'rotate(0)',
        } : {
            bottom: `calc(-${parseFloat(styles.swiper.chevrons.width) / 2 + 'rem'})`,
            right: `calc(50% - ${parseFloat(styles.swiper.chevrons.width) / 2 + 'rem'})`,
            transform: 'rotate(90deg)',
        }

    const swiperChevronsStyle = { color: styles.swiper.chevrons.color }

    const timerBar = {
        display: styles.swiper.timerBar.display,
        margin: styles.swiper.timerBar.margin,
    }

    const stopOnHover = styles.swiper.autoPlay.stopOnHover

    const productWrap = {
        display: styles.product.display,
        justifyContent: styles.product.justifyContent,
        padding: styles.product.padding,
    }

    const productName = {
        fontSize: styles.product.name.fontSize,
        color: styles.product.name.color,
        //hoverColor: styles.product.name.hoverColor ,
        textAlign: styles.product.name.textAlign,
    }

    const productBrand = {
        display: styles.product.brand.display,
        fontSize: styles.product.brand.fontSize,
        color: styles.product.brand.color,
        //hoverColor: styles.product.name.hoverColor ,
    }

    const productPrice = {
        fontSize: styles.product.price.fontSize,
        color: styles.product.price.color,
        //hoverColor: styles.product.price.hoverColor ,
        textAlign: styles.product.price.textAlign,
    }

    const productPriceBeforeDiscount = {
        fontSize: styles.product.price.beforeDiscount.fontSize,
        color: styles.product.price.beforeDiscount.color,
    }

    const productPriceUnit = {
        fontSize: styles.product.price.unit.fontSize,
        color: styles.product.price.unit.color,
    }

    const productReviews = {
        fontSize: styles.product.reviews.fontSize,
        color: styles.product.reviews.color,
    }

    const productRating = {
        fontSize: styles.product.rating.fontSize,
        color: styles.product.rating.color,
    }

    const linkSlide = (e, src) => {
        //handleQuickView({})
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

    const mouseEnterHandler = e => {
        e.preventDefault()
        timeOut && timeOut.map(run => clearTimeout(run))
        showTimerBar(false)
    }

    const mouseLeaveHandler = e => {
        e.preventDefault()
        if (autoPlay) timeOut = [setInterval(() => chevronRight(), duration)]
        showTimerBar(true)
    }

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

        if (autoPlay) {
            timeOut && timeOut.map(run => clearTimeout(run))
            timeOut = []
        }
    }

    const mouseUpHandler = (e) => {
        drag = false
        swiperWrapper.style.scrollBehavior = scrollBehavior
        ToggleScroll(e)
        window.removeEventListener('mousemove', mouseMoveHandler)
        window.removeEventListener('mouseup', mouseUpHandler)
        window.removeEventListener('touchend', mouseUpHandler)
        window.removeEventListener('touchmove', touchMoveHandler)
        if (autoPlay && !stopOnHover) timeOut = [setInterval(() => chevronRight(), duration)]

    }

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
        !stopOnHover && mouseDownHandler(e)
        if (stopOnHover) {
            e.preventDefault()
            timeOut && timeOut.map(run => clearTimeout(run))
            showTimerBar(false)
        }
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
            scrollLeft = swiperWrapper.scrollLeft + skipMore
            if (swiperWrapper.scrollWidth - (swiperWrapper.clientWidth + swiperWrapper.scrollLeft) <= 2)
                swiperWrapper.scrollLeft = 0
            else if (visibleWidthofSlide === slideWidth) scrollLeft += widthSlideSkipper
            else if (slideWidth - visibleWidthofSlide <= 2) scrollLeft += widthSlideSkipper
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
            if (swiperWrapper.scrollHeight - (swiperWrapper.clientHeight + swiperWrapper.scrollTop) <= 2)
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

    const ToggleChevrons = e => {
        const autoToggle = styles.swiper.chevrons.autoToggle
        const chevronsVisible = styles.swiper.chevrons.display

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

        toggleBullets_TimeBar()
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

    ////////////////////// Open Box ///////////////////////////

    useSelector(state => {
        if (swiperWrapper) {
            const _idExist = state.actions.openBox &&
                state.actions.openBox.find(box_id => box_id == slideBox._id)

            if (_idExist && !boxOpenned) {
                boxOpenned = true
                timeOut && timeOut.map(run => clearTimeout(run))
                timeOut = []
                swiperWrapper.style.height = swiperHeight

            } else if (!_idExist && boxOpenned) {
                if (autoPlay) timeOut = [...timeOut, setInterval(() => chevronRight(), duration)]
                boxOpenned = false
                swiperWrapper.style.height = styles.height
            }
        }
    })

    ////////////////////// Bullets ///////////////////////
    const bullets = styles.swiper.bullets

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

    const Bullets = React.memo(() => {
        if (styles.swiper.swipable)
            return (
                <div style={bulletsCont} className='bullets-cont'>
                    <div style={bulletsWrap} className='bullets-wrap'>
                        {slides.map(slide =>
                            <div style={bulletCont} key={slides.indexOf(slide)}>
                                <div style={bulletWrap}>
                                    <FontAwesomeIcon className='bullet' style={bullet}
                                        icon={faCircle} />
                                </div>
                            </div>)}
                    </div>
                </div>
            )
    })


    ///////////////////////////// Timer Bar /////////////////////////////

    const showTimerBar = (state) => {
        if (timerBar.display !== 'none') {
            slideIndex = slideIndex || 0
            var i = slides.length - 1
            const timerBarElement = element.getElementsByClassName('timerBar')
            while (i >= 0) {
                timerBarElement[i].classList.remove('width-100')
                i--
            }
            if (state) timerBarElement[slideIndex].classList.add('width-100')
        }
    }

    const toggleBullets_TimeBar = () => {
        if (bullets.display !== 'none' || timerBar.display !== 'none') {// toggle bullets
            if (!verticalSwiper) {
                var index = parseInt((swiperWrapper.scrollLeft + swiperWrapper.clientWidth + gapWidth) / (slideWidth + gapWidth) + 0.01) - 1
                if (index < 0 || isNaN(index) || !index) index = 0

                if (slideIndex !== index && element) {
                    slideIndex = index
                    showTimerBar(true)
                    if (element.getElementsByClassName('bullet') &&
                        element.getElementsByClassName('bullet')[slideIndex].style.color !== '#00bdd9') {
                        var i = slides.length - 1
                        while (i >= 0) {
                            element.getElementsByClassName('bullet')[i].style.color = '#eeeeee'
                            i--
                        }
                        element.getElementsByClassName('bullet')[slideIndex].style.color = '#00bdd9'
                    }
                }
            } else {
                var index = parseInt((swiperWrapper.scrollTop + swiperWrapper.clientHeight + gapWidth) / (slideHeight + gapWidth) + 0.01) - 1
                if (index < 0 || isNaN(index) || !index) index = 0
                if (slideIndex !== index && element) {
                    slideIndex = index
                    showTimerBar(true)
                    if (element.getElementsByClassName('bullet') &&
                        element.getElementsByClassName('bullet')[slideIndex].style.color !== '#00bdd9') {
                        var i = slides.length - 1
                        while (i >= 0) {
                            element.getElementsByClassName('bullet')[i].style.color = '#eeeeee'
                            i--
                        }
                        element.getElementsByClassName('bullet')[slideIndex].style.color = '#00bdd9'
                    }
                }
            }
        }
    }

    /////////////////////// Badges ///////////////////////

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
        fontSize: badges.fontSize,
        fontWeight: '600'
    }

    const Badges = React.memo(({ slide }) => {
        var slash = false
        var upcoming = false
        var backgroundColor
        var disc = (slide.discount && slide.discount !== 0 && [{ type: 'discount', discount: slide.discount + '%' }]) || []
        if (slide.onSale && !showTimer(slide.onSale).ended) {
            disc.push({ type: 'onSale', discount: slide.onSale.amount + '%' })
            if (showTimer(slide.onSale).active) slash = true
            else {
                upcoming = true
                backgroundColor = '#cccccc'
            }
        }

        const badgeList = [...badges.badges, ...disc]
        return (
            <div className='badges-wrap' style={badgesWrap}>
                {badgeList && badgeList.map(badge =>
                    <div className='badge-wrap'
                        style={{ ...badgeWrap, backgroundColor: badge.type === 'onSale' && backgroundColor ? backgroundColor : badges.backgroundColors[badgeList.indexOf(badge)] }}>
                        {badge.type === 'discount' && slash && <div className='slash-over slash' />}
                        {badge.type === 'onSale' && upcoming && <div className='upcoming-badget'>coming soon</div>}
                        <div style={badgeStyle}>{badge.discount || badge}</div>
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

    ////////////////////////// Timer ////////////////////////////

    return (
        <div className={'slides-overlay slide-box-' + slideBox._id} style={slidesOverlayStyle}>
            {styles.title.display !== 'none' &&
                <TitleContainer slideBox={slideBox} mobileScreen={mobileScreen} />}
            <div className='flex-slides-wrapper'>
                <div className='fixed-slides-wrapper' style={slidesWrapperStyle}>

                    {/*/////////////////// Chevrons //////////////////*/}

                    <div className='left-chevron-wrap' onClick={e => {
                        timeOut && timeOut.map(run => clearTimeout(run))
                        chevronLeft(e)
                        var newTimeOut = []
                        if (autoPlay) timeOut = [...newTimeOut, setInterval(() => chevronRight(), duration)]
                    }}
                        style={{ ...chevronWrapperStyle, ...leftChevronWrapper }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = chevronWrapperStyle.hoverBackgroundColor }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = chevronWrapperStyle.initialBackgroundColor }}>
                        <FontAwesomeIcon icon={faChevronLeft} style={swiperChevronsStyle} />
                    </div>
                    <div className='right-chevron-wrap' onClick={e => {
                        timeOut && timeOut.map(run => clearTimeout(run))
                        chevronRight(e)
                        var newTimeOut = []
                        if (autoPlay) timeOut = [...newTimeOut, setInterval(() => chevronRight(), duration)]
                    }}
                        style={{ ...chevronWrapperStyle, ...rightChevronWrapper }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = chevronWrapperStyle.hoverBackgroundColor }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = chevronWrapperStyle.initialBackgroundColor }}>
                        <FontAwesomeIcon icon={faChevronRight} style={swiperChevronsStyle} />
                    </div>

                    {/*////////////////////// Swiper ///////////////////////*/}
                    <div className="slideBox-wrapper" style={swiperBox}
                        onMouseDown={e => { swiperWrapper && !stopOnHover && mouseDownHandler(e); e.preventDefault() }}
                        onMouseEnter={e => { swiperWrapper && stopOnHover && mouseEnterHandler(e); e.preventDefault() }}
                        onMouseLeave={e => { swiperWrapper && stopOnHover && mouseLeaveHandler(e) }}
                        onTouchStart={e => { swiperWrapper && touchStartHandler(e) }}
                        onTouchEnd={e => { swiperWrapper && stopOnHover && mouseLeaveHandler(e) }}
                        onScroll={e => styles.swiper.swipable && ToggleChevrons()}>
                        {slides.length > 0 && slides.map(slide =>
                            <div className='slide-container' style={slides.indexOf(slide) === 0 ? slideContainerZero : slideContainer}
                                key={slides.indexOf(slide)}>
                                <div className='timerBar' style={timerBar} />
                                <div className='slide-wrapper' style={slides.indexOf(slide) === 0 ? slideWrapperStyleZero : slideWrapperStyle}>
                                    <Badges slide={slide} />
                                    <div className='image-wrap' style={slides.indexOf(slide) === 0 ? imageWrapStyleZero : imageWrapStyle}>
                                        {/*<div className='image-skeleton' style={skeleton}>Sarah Originals</div>*/}
                                        <img src={/*imageUrl + slide.src*/url(slide.src || slide.image)}
                                            className="slide-img"
                                            style={slides.indexOf(slide) === 0 ? imageStyleZero : imageStyle}
                                            onClick={e => linkSlide(e, slide.link)}
                                        //onLoad={e => { e.currentTarget.previousSibling.classList.add('hide') }}
                                        />
                                    </div>
                                    {slide.priceUsd
                                        ? <div className='product-details-wrap' style={productWrap}>
                                            <div className='product-details-wrap-1'>
                                                <div className="product-name" style={productName}>
                                                    <Link to={"/product/" + slide._id}>
                                                        <div className='product-nameEn'>{slide.nameEn || slide.title}</div>
                                                    </Link>
                                                </div>
                                                <div className="product-brand" style={productBrand}>{slide.brand}</div>
                                                <div className='product-det-price-reviews-cont'>
                                                    <div className="product-det-price-reviews-wrap">
                                                        <div className="product-price">
                                                            <div className={slide.discount > 0 ? 'before-discount' : ''}
                                                                style={slide.discount > 0 ? productPriceBeforeDiscount : productPrice}>
                                                                {slide.priceUsd}<div className='price-unit' style={productPriceUnit}>$</div>
                                                            </div>
                                                            {slide.discount > 0 &&
                                                                <div className='after-discount' style={productPrice}>
                                                                    {slide.priceUsd - (slide.priceUsd * ((slide.onSale && showTimer(slide.onSale).active)
                                                                        ? slide.onSale.amount : slide.discount) / 100).toFixed(2)}
                                                                    <div className='price-unit' style={productPriceUnit}>$</div>
                                                                </div>}
                                                        </div>
                                                        <div className='product-review-container'>
                                                            <FontAwesomeIcon icon={faStar} className='faStar' />
                                                            <div className='product-review' style={productRating}>4.5</div>
                                                            <div className='product-review-qty' style={productReviews}>(21)</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {!showTimer(slide.onSale).ended && <Timer slide={slide} slideBox_id={slideBox._id} />}
                                        </div>
                                        : <div className='product-title-wrap'>
                                            <div className='slide-title' style={slides.indexOf(slide) === 0 ? slideTitleStyleZero : slideTitleStyle}>
                                                {slide.title || slide.nameEn}
                                                {!mobileScreen && <FontAwesomeIcon icon={faChevronCircleRight} />}
                                            </div>
                                        </div>}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <Bullets />
            </div>
        </div >
    )
}

export default React.memo(SlideBox)