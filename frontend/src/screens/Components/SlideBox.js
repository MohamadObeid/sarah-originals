import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight, faChevronLeft, faChevronRight, faCircle, faStar } from '@fortawesome/free-solid-svg-icons'
import { url } from '../../constants/defaultImages'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { TitleContainer } from './TitleContainer'
import { showTimer } from '../../methods/methods'
import { Timer } from './SlideBoxComponents'

const SlideBox = ({ styles, slides, defaultStyles, slideBox, touchScreen }) => {
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
        element = document.getElementsByClassName('slide-box-' + _id)[0]
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

        if (swiperBox.height === 'slideHeight')
            swiperWrapper.style["height"] = slideHeight + 'px'

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

        if (swiper.swipable) ToggleChevrons(true)

    }, [])

    const _id = slideBox._id
    const Title = slideBox.title
    const TitleStyles = styles.title
    const slide = styles.slide || defaultStyles.slide
    const product = styles.product || defaultStyles.product
    const skeleton = styles.skeleton || defaultStyles.skeleton
    const badges = styles.badges || defaultStyles.badges
    const swiper = styles.swiper || defaultStyles.swiper

    const defaultSlide = defaultStyles.slide[0]
    const defaultProduct = defaultStyles.product
    const defaultSkeleton = defaultStyles.skeleton
    const defaultBadges = defaultStyles.badges
    const defaultSwiper = defaultStyles.swiper

    var defaultSlideIndex = slide.findIndex(slide => slide.isDefault)
    if (defaultSlideIndex === -1) defaultSlideIndex = undefined

    const skipMore = swiper.skipMore || defaultSwiper.skipMore

    const scrollBehavior = swiper.scroll && swiper.scroll.behavior || defaultSwiper.scroll.behavior
    const verticalSwiper = (swiper.direction === 'Y' || defaultSwiper.direction === 'Y') ? true : false

    const slidesOverlayStyle = {
        display: styles.display || defaultStyles.display,
        width: styles.width || defaultStyles.width,
        backgroundColor: styles.backgroundColor || defaultStyles.backgroundColor,
        border: styles.border || defaultStyles.border,
        borderRadius: styles.borderRadius || defaultStyles.borderRadius
    }

    const slidesWrapperStyle = {
        padding: styles.paddingAround || defaultStyles.paddingAround,
        borderRadius: styles.borderRadius || defaultStyles.borderRadius
    }

    const swiperBox = {
        display: styles.display || defaultStyles.display,
        gridColumnGap: styles.paddingBetween || defaultStyles.paddingBetween,
        gridRowGap: styles.paddingBetween || defaultStyles.paddingBetween,
        gridTemplateColumns: `repeat(auto-fit, minmax(${slide[defaultSlideIndex].width}, 1fr))`,
        borderRadius: slide[defaultSlideIndex].borderRadius,
        overflow: styles.overflow || defaultStyles.overflow,
        height: styles.height || defaultStyles.height
    }

    var swiperHeight
    /*const specialSlides = []
    slide.map((slide, index) => {
        if (slide.hasOwnProperty('index')) {
            specialSlides.push({ styleIndex: index, slideIndex: slide.index })
        }
    })*/

    const slideContainer = (index) =>
    ({
        height: slide[index].height || defaultSlide.height,
        minWidth: slide[index].width || defaultSlide.width,
        borderRadius: slide[index].borderRadius || defaultSlide.borderRadius,
        border: slide[index].border || defaultSlide.border,
    })


    const slideWrapperStyle = (index) =>
    ({
        height: '100%',
        width: '100%',
        borderRadius: slide[index].borderRadius || defaultSlide.borderRadius,
        border: slide[index].border || defaultSlide.border,
        backgroundColor: slide[index].backgroundColor || defaultSlide.backgroundColor,
        justifyContent: slide[index].justifyContent || defaultSlide.justifyContent
    })

    const imageWrapStyle = (index) =>
    ({
        minHeight: slide[index].image.height || defaultSlide.image.height,
        borderRadius: slide[index].image.borderRadius || defaultSlide.image.borderRadius,

        width: (slide[index].image.forceWidth || defaultSlide.image.forceWidth)
            && slide[index].image.width
            || defaultSlide.image.width,

        maxWidth: (!slide[index].image.forceWidth || !defaultSlide.image.forceWidth)
            && slide[index].image.width
            || defaultSlide.image.width
    })

    const imageStyle = (index) =>
    ({
        borderRadius: slide[index].image.borderRadius || defaultSlide.image.borderRadius,
        transform: (!slide[index].image.animation || !defaultSlide.image.animation)
            && 'unset',
        width: (slide[index].image.forceWidth || defaultSlide.image.forceWidth)
            && slide[index].image.width
            || defaultSlide.image.width,

        height: (slide[index].image.forceHeight || defaultSlide.image.forceHeight)
            && slide[index].image.height
            || defaultSlide.image.height,

        maxWidth: slide[index].image.width || defaultSlide.image.width,
        maxHeight: slide[index].image.height || defaultSlide.image.height,
    })

    var leftChevronWrapper, rightChevronWrapper, swiperChevronsStyle, autoToggle

    var chevrons = { display: 'none' }

    if (swiper.chevrons) {
        chevrons = {
            display: swiper.chevrons.display || defaultSwiper.chevrons.display,
            height: swiper.chevrons.height || defaultSwiper.chevrons.height,
            width: swiper.chevrons.width || defaultSwiper.chevrons.width,
            backgroundColor: swiper.chevrons.backgroundColor || defaultSwiper.chevrons.backgroundColor,
            hoverBackgroundColor: swiper.chevrons.hoverBackgroundColor || defaultSwiper.chevrons.hoverBackgroundColor,
            initialBackgroundColor: swiper.chevrons.backgroundColor || defaultSwiper.chevrons.backgroundColor,
            boxShadow: (!swiper.chevrons.boxShadow || !defaultSwiper.chevrons.boxShadow) && 'none'
        }

        leftChevronWrapper = !verticalSwiper
            ? {
                top: `calc(50% - ${parseFloat(swiper.chevrons.height || defaultSwiper.chevrons.height) / 2 + 'rem'})`,
                left: '0',
                transform: 'rotate(0)',
            } : {
                top: `calc(-${parseFloat(swiper.chevrons.width || defaultSwiper.chevrons.width) / 2 + 'rem'})`,
                left: `calc(50% - ${parseFloat(swiper.chevrons.width || defaultSwiper.chevrons.width) / 2 + 'rem'})`,
                transform: 'rotate(90deg)',
            }

        rightChevronWrapper = !verticalSwiper
            ? {
                top: `calc(50% - ${parseFloat(swiper.chevrons.height || defaultSwiper.chevrons.height) / 2 + 'rem'})`,
                right: '0',
                transform: 'rotate(0)',
            } : {
                bottom: `calc(-${parseFloat(swiper.chevrons.width || defaultSwiper.chevrons.width) / 2 + 'rem'})`,
                right: `calc(50% - ${parseFloat(swiper.chevrons.width || defaultSwiper.chevrons.width) / 2 + 'rem'})`,
                transform: 'rotate(90deg)',
            }

        swiperChevronsStyle = { color: swiper.chevrons.color || defaultSwiper.chevrons.color }

        autoToggle = swiper.chevrons.autoToggle !== undefined
            ? swiper.chevrons.autoToggle
            : defaultSwiper.chevrons.autoToggle
    }

    const timerBar = swiper.timerBar || defaultSwiper.timerBar

    const timerBarStyles = {
        display: timerBar.display || timerBar.display,
        margin: timerBar.margin || timerBar.margin,
    }

    /// product styles 

    const productWrap = {
        display: product.display || defaultProduct.display,
        justifyContent: product.justifyContent || defaultProduct.justifyContent,
        padding: product.padding || defaultProduct.padding,
    }

    const productName = {
        fontSize: product.name.fontSize || defaultProduct.name.fontSize,
        color: product.name.color || defaultProduct.name.color,
        //hoverColor: product.name.hoverColor ,
        textAlign: product.name.textAlign || defaultProduct.name.textAlign,
    }

    const productBrand = {
        display: product.brand.display || defaultProduct.brand.display,
        fontSize: product.brand.fontSize || defaultProduct.brand.fontSize,
        color: product.brand.color || defaultProduct.brand.color,
        //hoverColor: product.name.hoverColor ,
    }

    const productPrice = {
        fontSize: product.price.fontSize || defaultProduct.price.fontSize,
        color: product.price.color || defaultProduct.price.color,
        //hoverColor: product.price.hoverColor ,
        textAlign: product.price.textAlign || defaultProduct.price.textAlign,
    }

    const productPriceBeforeDiscount = {
        fontSize: product.price.beforeDiscount.fontSize || defaultProduct.price.beforeDiscount.fontSize,
        color: product.price.beforeDiscount.color || defaultProduct.price.beforeDiscount.color,
    }

    const productPriceUnit = {
        fontSize: product.price.unit.fontSize || defaultProduct.price.unit.fontSize,
        color: product.price.unit.color || defaultProduct.price.unit.color,
    }

    const productReviews = {
        fontSize: product.reviews.fontSize || defaultProduct.reviews.fontSize,
        color: product.reviews.color || defaultProduct.reviews.color,
    }

    const productRating = {
        fontSize: product.rating.fontSize || defaultProduct.rating.fontSize,
        color: product.rating.color || defaultProduct.rating.color,
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

    var gapWidth = styles.paddingBetween || defaultStyles.paddingBetween

    if (gapWidth.includes('rem')) gapWidth = parseFloat(gapWidth) * 10
    else gapWidth = parseFloat(gapWidth)

    var skip = swiper.skip || defaultSwiper.skip || 1

    var widthSlideSkipper = slideWidth
        ? (slideWidth + gapWidth) * skip
        : slideWidth * skip

    var heightSlideSkipper = (slideHeight + gapWidth) * skip
    var duration, autoPlay, stopOnHover

    if (swiper.autoPlay) {
        stopOnHover = swiper.autoPlay.stopOnHover !== undefined
            ? swiper.autoPlay.stopOnHover
            : defaultSwiper.autoPlay.stopOnHover
        duration = swiper.autoPlay.duration || defaultSwiper.autoPlay.duration
        autoPlay = swiper.autoPlay.run !== undefined
            ? swiper.autoPlay.run
            : defaultSwiper.autoPlay.run
    } else {
        stopOnHover = defaultSwiper.autoPlay.stopOnHover
        duration = defaultSwiper.autoPlay.duration
        autoPlay = defaultSwiper.autoPlay.run
    }

    const scrollAutoToggle = swiper.scroll && swiper.scroll.autoToggle !== undefined
        ? swiper.scroll.autoToggle
        : defaultSwiper.scroll.autoToggle

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
        e.preventDefault()
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

        window.addEventListener('mousemove', mouseMoveHandler)
        window.addEventListener('mouseup', mouseUpHandler)
        if (touchScreen) {
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
        if (touchScreen) {
            window.removeEventListener('touchend', mouseUpHandler)
            window.removeEventListener('touchmove', touchMoveHandler)
        }
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

        if (!isNaN(scrollLeft) && autoToggle && chevrons.display !== 'none') {
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
        const currClientX = e.clientX || e.changedTouches[0].clientX
        const currClientY = e.clientY || e.changedTouches[0].clientY
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
                state.actions.openBox.find(box_id => box_id == _id)

            if (_idExist && !boxOpenned) {
                boxOpenned = true
                timeOut && timeOut.map(run => clearTimeout(run))
                timeOut = []
                swiperWrapper.style.height = swiperHeight

            } else if (!_idExist && boxOpenned) {
                if (autoPlay) timeOut = [...timeOut, setInterval(() => chevronRight(), duration)]
                boxOpenned = false
                if (swiperBox.height === 'slideHeight')
                    swiperWrapper.style.height = slideHeight + 'px'
                else swiperWrapper.style.height = styles.height || defaultStyles.height
            }
        }
    })

    ////////////////////// Bullets ///////////////////////

    const bullets = swiper.bullets || defaultSwiper.bullets

    const Bullets = React.memo(() => {

        const bulletsCont = {
            display: bullets.display || defaultSwiper.bullets.display,
            bottom: bullets.bottom || defaultSwiper.bullets.bottom,
        }

        const bulletsWrap = {
            gridColumnGap: bullets.paddingBetween || defaultSwiper.bullets.paddingBetween,
            gridRowGap: bullets.paddingBetween || defaultSwiper.bullets.paddingBetween,
        }

        const bulletCont = {}
        const bulletWrap = {}

        const bullet = {
            fontSize: bullets.fontSize || defaultSwiper.bullets.fontSize,
        }

        if (swiper.swipable)
            return (
                <div style={bulletsCont} className='bullets-cont'>
                    <div style={bulletsWrap} className='bullets-wrap'>
                        {slides.map((slide, index) =>
                            <div style={bulletCont} key={index}>
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
        if (timerBarStyles.display !== 'none') {
            slideIndex = slideIndex || 0
            var i = slides.length - 1
            const timerBarElement = [...element.getElementsByClassName('timerBar')]
            while (i >= 0) {
                timerBarElement[i].classList.remove('width-100')
                i--
            }
            if (state) timerBarElement[slideIndex].classList.add('width-100')
        }
    }

    const toggleBullets_TimeBar = () => {
        if (bullets.display !== 'none' || timerBarStyles.display !== 'none') {// toggle bullets
            if (!verticalSwiper) {
                var index = parseInt((swiperWrapper.scrollLeft + swiperWrapper.clientWidth + gapWidth) / (slideWidth + gapWidth) + 0.01) - 1
                if (index < 0 || isNaN(index) || !index) index = 0

                if (slideIndex !== index && element) {
                    slideIndex = index
                    showTimerBar(true)
                    const bulletElement = element.getElementsByClassName('bullet')
                    if (bulletElement[slideIndex] && bulletElement[slideIndex].style.color !== '#00bdd9') {
                        var i = slides.length - 1
                        while (i >= 0) {
                            bulletElement[i].style.color = '#eeeeee'
                            i--
                        }
                        bulletElement[slideIndex].style.color = '#00bdd9'
                    }
                }
            } else {
                var index = parseInt((swiperWrapper.scrollTop + swiperWrapper.clientHeight + gapWidth) / (slideHeight + gapWidth) + 0.01) - 1
                if (index < 0 || isNaN(index) || !index) index = 0
                if (slideIndex !== index && element) {
                    slideIndex = index
                    showTimerBar(true)
                    const bulletElement = element.getElementsByClassName('bullet')
                    if (bulletElement[slideIndex] && bulletElement[slideIndex].style.color !== '#00bdd9') {
                        var i = slides.length - 1
                        while (i >= 0) {
                            bulletElement[i].style.color = '#eeeeee'
                            i--
                        }
                        bulletElement[slideIndex].style.color = '#00bdd9'
                    }
                }
            }
        }
    }

    /////////////////////// Badges ///////////////////////

    const Badges = React.memo(({ slide, timer }) => {

        const badgesWrap = {
            display: badges.display || defaultBadges.display,
            top: badges.top || defaultBadges.top,
            left: badges.left || defaultBadges.left,
            gridRowGap: badges.paddingBetween || defaultBadges.paddingBetween,
            gridColumnGap: badges.paddingBetween || defaultBadges.paddingBetween,
            gridTemplateColumns: `repeat(auto-fit, minmax(${badges.badgeWidth || defaultBadges.badgeWidth}, 1fr))`,
        }

        const badgeWrap = {
            height: badges.badgeHeight || defaultBadges.badgeHeight,
            width: badges.badgeWidth || defaultBadges.badgeWidth,
            borderRadius: badges.borderRadius || defaultBadges.borderRadius,
        }

        const badgeStyle = {
            color: badges.color || defaultBadges.color,
            fontSize: badges.fontSize || defaultBadges.fontSize,
            fontWeight: '600'
        }

        var slash = false
        var upcoming = false
        var backgroundColor
        var disc = (slide.discount && slide.discount !== 0 && [{ type: 'discount', discount: slide.discount + '%' }]) || []

        if (!timer.ended && slide.onSale.amount >= slide.discount) {
            disc.push({ type: 'onSale', discount: slide.onSale.amount + '%' })
            if (timer.active) slash = true
            else {
                upcoming = true
                backgroundColor = '#cccccc'
            }
        }

        const badgeList = [...badges.badges, ...disc]

        return (
            <div className='badges-wrap' style={badgesWrap}>
                {badgeList && badgeList.map((badge, index) =>
                    <div className='badge-wrap' key={index}
                        style={{
                            ...badgeWrap,
                            backgroundColor: badge.type === 'onSale' && backgroundColor
                                ? backgroundColor
                                : (badges.backgroundColors[index]
                                    || defaultBadges.backgroundColors[index])
                        }}>
                        {badge.type === 'discount' && slash && <div className='slash-over slash' />}
                        {badge.type === 'onSale' && upcoming && <div className='upcoming-badget'>coming soon</div>}
                        <div style={badgeStyle}>{badge.discount || badge}</div>
                    </div>
                )}
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

    ////////////////////////// Product ////////////////////////////

    const productVisible = (index) =>
        slide[index].productVisible === undefined
            ? defaultSlide.productVisible
            : slide[index].productVisible

    const Product = React.memo(({ timer, slide }) => {
        const priceBeforeDiscount = slide.priceUsd

        const discount = timer.active && slide.onSale.amount >= slide.discount
            ? slide.onSale.amount : (slide.discount || 0)

        const priceAfterDiscount = discount > 0
            ? (slide.priceUsd - (slide.priceUsd * discount / 100).toFixed(2))
            : false

        const price = { priceBeforeDiscount, priceAfterDiscount, discount }

        return <div className='product-details-wrap' style={productWrap}>
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
                            <div className={discount ? 'before-discount' : ''}
                                style={discount ? productPriceBeforeDiscount : productPrice}>{priceBeforeDiscount}
                                <div className='price-unit' style={productPriceUnit}>${!priceAfterDiscount ? '/' + slide.unit : ''}</div>
                            </div>
                            {priceAfterDiscount &&
                                <div className='after-discount' style={productPrice}>{priceAfterDiscount}
                                    <div className='price-unit' style={productPriceUnit}>$/{slide.unit}</div>
                                </div>}
                        </div>
                        <div className='product-review-container'>
                            <FontAwesomeIcon icon={faStar} className='faStar' />
                            <div className='product-review' style={productRating}>4.5</div>
                            <div className='product-review-qty' style={productReviews}>(21)</div>
                        </div>
                    </div>
                    {/*<AddToCart slide={slide} price={price}/> */}
                </div>
            </div>

            {/* Timer */}
            {!timer.ended && slide.onSale.amount >= slide.discount &&
                <Timer slide={slide} slideBox_id={_id} />}

        </div>
    })

    /////////////////////
    const getSlideIndex = (index) => {
        var i = slide.findIndex(slide => slide.index === index)
        if (i === -1) i = defaultSlideIndex
        return i
    }

    const slideStyles = (index) => slide[index].title

    return (
        <div className={'slides-overlay slide-box-' + _id}
            style={slidesOverlayStyle}>

            {/* Title */}
            {TitleStyles && TitleStyles.display !== 'none' &&
                <TitleContainer _id={_id} Title={Title} styles={TitleStyles} />}

            <div className='flex-slides-wrapper'>
                <div className='fixed-slides-wrapper' style={slidesWrapperStyle}>

                    {/* Chevrons */}
                    {/* chevrons.display !== 'none' && <Chevrons /> */}
                    {/* Left Chevron */}
                    <div className='left-chevron-wrap'
                        onClick={e => {
                            timeOut && timeOut.map(run => clearTimeout(run))
                            chevronLeft(e)
                            var newTimeOut = []
                            if (autoPlay) timeOut = [...newTimeOut, setInterval(() => chevronRight(), duration)]
                        }}
                        style={{ ...chevrons, ...leftChevronWrapper }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = chevrons.hoverBackgroundColor }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = chevrons.initialBackgroundColor }}>
                        <FontAwesomeIcon icon={faChevronLeft} style={swiperChevronsStyle} />
                    </div>

                    {/* Right Chevron */}
                    <div className='right-chevron-wrap'
                        onClick={e => {
                            timeOut && timeOut.map(run => clearTimeout(run))
                            chevronRight(e)
                            var newTimeOut = []
                            if (autoPlay) timeOut = [...newTimeOut, setInterval(() => chevronRight(), duration)]
                        }}
                        style={{ ...chevrons, ...rightChevronWrapper }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = chevrons.hoverBackgroundColor }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = chevrons.initialBackgroundColor }}>
                        <FontAwesomeIcon icon={faChevronRight} style={swiperChevronsStyle} />
                    </div>

                    {/*////////////////////// Swiper ///////////////////////*/}
                    <div className="slideBox-wrapper" style={swiperBox}
                        onMouseDown={e => { swiperWrapper && !stopOnHover && mouseDownHandler(e); e.preventDefault() }}
                        onMouseEnter={e => { swiperWrapper && stopOnHover && mouseEnterHandler(e); e.preventDefault() }}
                        onMouseLeave={e => { swiperWrapper && stopOnHover && mouseLeaveHandler(e) }}
                        onTouchStart={e => { swiperWrapper && touchScreen && touchStartHandler(e) }}
                        onTouchEnd={e => { swiperWrapper && stopOnHover && touchScreen && mouseLeaveHandler(e) }}
                        onScroll={e => swiper.swipable && ToggleChevrons()}>

                        {slides.map((slide, index) => {
                            const i = getSlideIndex(index)
                            const timer = showTimer(slide.onSale)
                            return (
                                <div className='slide-container' style={slideContainer(i)} key={index}>
                                    <div className='timerBar' style={timerBarStyles} />
                                    <div className='slide-wrapper' style={slideWrapperStyle(i)}>

                                        {/* Badges */}
                                        {badges.display !== 'none' && <Badges slide={slide} timer={timer} />}

                                        <div className='image-wrap' style={imageWrapStyle(i)}>
                                            {/*<div className='image-skeleton' style={skeleton}>Sarah Originals</div>*/}
                                            <img src={/*imageUrl + slide.src*/url(slide.src || slide.image)}
                                                className="slide-img"
                                                style={imageStyle(i)}
                                                onClick={e => linkSlide(e, slide.link)}
                                            //onLoad={e => { e.currentTarget.previousSibling.classList.add('hide') }}
                                            />
                                        </div>
                                        {slideStyles(i) && slideStyles(i).display !== 'none' &&
                                            <TitleContainer _id={slide._id} styles={slideStyles(i)}
                                                Title={{ title: slide.title, description: slide.description }} />}

                                        {productVisible(i) && <Product slide={slide} timer={timer} />}

                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Bullets */}
                {bullets.display !== 'none' && <Bullets />}
            </div>
        </div >
    )

}

export default React.memo(SlideBox)