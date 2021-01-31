import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faCircle, faStar } from '@fortawesome/free-solid-svg-icons'
import { url } from '../../constants/defaultImages'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { TitleContainer } from './TitleContainer'
import { showTimer } from '../../methods/methods'
import { Timer } from './SliderComponents'
import { AddToCart } from './AddToCart'
import { Badges } from './Badges'

const Slider = ({ styles, defaultStyles, slider, touchScreen }) => {
    const dispatch = useDispatch()
    const slides = useSelector(state => {
        var slidesExist = state.slides.find(slidesList => slidesList._id === slider._id)
        if (slidesExist) return slidesExist.slides
    })

    var timeOut
    var sliderWrapper
    var leftChevron
    var rightChevron
    var slideWidth
    var slideHeight
    var boxOpenned
    var element
    var slideIndex
    var lastClientX
    var swiperHeight
    var defaultSlideIndex

    useEffect(() => {
        if (slides) {
            element = document.getElementsByClassName('slider-' + _id)[0]
            sliderWrapper = element.getElementsByClassName('slider-wrapper')[0]
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
                sliderWrapper.style["height"] = slideHeight + 'px'

            widthSlideSkipper = (slideWidth + gapWidth) * skip
            heightSlideSkipper = (slideHeight + gapWidth) * skip

            const currSwiperWidth = sliderWrapper.offsetWidth
            const lineCapacity = parseInt((currSwiperWidth + gapWidth) / (slideWidth + gapWidth))
            const lineNum = slides.length / lineCapacity
            if (lineNum % 1 === 0)
                swiperHeight = ((slideHeight + gapWidth) * lineNum - gapWidth) + 'px'
            else if (lineNum % 1 > 0)
                swiperHeight = ((slideHeight + gapWidth) * (parseInt(lineNum + 1)) - gapWidth) + 'px'

            if (autoPlay && !timeOut)
                timeOut = [setInterval(() => chevronRight(), duration)]

            if (swiper.swipable) toggleSlides(true)
        }
    }, [slides])


    const _id = slider._id
    const Title = slider.title
    const TitleStyles = styles.title
    const slide = styles.slide || defaultStyles.slide
    const product = styles.product || defaultStyles.product
    const skeleton = styles.skeleton || defaultStyles.skeleton
    const badges = styles.badges || defaultStyles.badges
    const swiper = styles.swiper || defaultStyles.swiper
    const timerBar = styles.timerBar || defaultStyles.timerBar

    const defaultSlide = defaultStyles.slide[0]
    const defaultProduct = defaultStyles.product
    const defaultSkeleton = defaultStyles.skeleton
    const defaultBadges = defaultStyles.badges
    const defaultSwiper = defaultStyles.swiper
    const defaultTimerBar = defaultStyles.timerBar
    const defaultAddToCart = defaultProduct.addToCart
    //console.log(defaultProduct, product)
    defaultSlideIndex = slide.findIndex(slide => slide.isDefault)
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

    const timerBarStyles = {
        display: timerBar.display || defaultTimerBar.display,
        margin: timerBar.margin || defaultTimerBar.margin,
    }

    /////////////////// product styles //////////////////////

    var productWrap, productName, productBrand, productPrice, productPriceBeforeDiscount,
        productPriceUnit, productReviews, productRating, priceAndAddToCartWrapper,
        productPriceWrap, productStyles

    productWrap = {
        display: product.display || defaultProduct.display,
        justifyContent: product.justifyContent || defaultProduct.justifyContent,
        padding: product.padding || defaultProduct.padding,
        height: '100%',
    }

    productName = product.name || defaultProduct.name
    productName = {
        fontSize: productName.fontSize || defaultProduct.name.fontSize,
        color: productName.color || defaultProduct.name.color,
        //hoverColor: product.name.hoverColor ,
        textAlign: productName.textAlign || defaultProduct.name.textAlign,
    }

    productBrand = product.brand || defaultProduct.brand
    productBrand = {
        display: productBrand.display || defaultProduct.brand.display,
        fontSize: productBrand.fontSize || defaultProduct.brand.fontSize,
        color: productBrand.color || defaultProduct.brand.color,
        //hoverColor: product.name.hoverColor ,
    }

    priceAndAddToCartWrapper = product.priceAndAddToCartWrapper || defaultProduct.priceAndAddToCartWrapper
    priceAndAddToCartWrapper = {
        padding: priceAndAddToCartWrapper.padding || defaultProduct.padding,
        flexDirection: priceAndAddToCartWrapper.flexDirection || defaultProduct.flexDirection,
        justifyContent: priceAndAddToCartWrapper.justifyContent || defaultProduct.justifyContent
    }

    productPrice = product.price || defaultProduct.price

    productPriceWrap = {
        flexDirection: productPrice.flexDirection || defaultProduct.price.flexDirection,
        padding: productPrice.padding || defaultProduct.price.padding,
        textAlign: productPrice.textAlign || defaultProduct.price.textAlign,
    }

    productPrice = {
        fontSize: productPrice.fontSize || defaultProduct.price.fontSize,
        color: productPrice.color || defaultProduct.price.color,
        //hoverColor: product.price.hoverColor ,
    }

    productPriceBeforeDiscount = productPrice.fontSize || defaultProduct.price.beforeDiscount
    productPriceBeforeDiscount = {
        display: productPriceBeforeDiscount.display || defaultProduct.price.beforeDiscount.display,
        fontSize: productPriceBeforeDiscount.fontSize || defaultProduct.price.beforeDiscount.fontSize,
        color: productPriceBeforeDiscount.color || defaultProduct.price.beforeDiscount.color,
    }

    productPriceUnit = productPrice.unit || defaultProduct.price.unit
    productPriceUnit = {
        display: productPriceUnit.display || defaultProduct.price.unit.display,
        fontSize: productPriceUnit.fontSize || defaultProduct.price.unit.fontSize,
        color: productPriceUnit.color || defaultProduct.price.unit.color,
    }

    productReviews = product.reviews || defaultProduct.reviews
    productReviews = {
        display: productReviews.display || defaultProduct.reviews.display,
        fontSize: productReviews.fontSize || defaultProduct.reviews.fontSize,
        color: productReviews.color || defaultProduct.reviews.color,
    }

    productRating = product.rating || defaultProduct.rating
    productRating = {
        display: productRating.display || defaultProduct.rating.display,
        fontSize: productRating.fontSize || defaultProduct.rating.fontSize,
        color: productRating.color || defaultProduct.rating.color,
    }

    ///////////////////// Add To Cart Styles ///////////////////////

    var addToCart, addToCartVisible, addToCartWrap, addToCartBtn, plusBtn,
        minusBtn, removeBtn, qtyBtn, addToCartStyles, btnsWrap

    addToCart = product.addToCart
    addToCartVisible = addToCart && addToCart.display === 'none'

    if (!addToCartVisible) {
        addToCartWrap = {
            display: addToCart.display || defaultAddToCart.display,
            design: addToCart.design || defaultAddToCart.design,
            padding: addToCart.padding || defaultAddToCart.padding,
            margin: addToCart.margin || defaultAddToCart.margin,
            position: addToCart.position || defaultAddToCart.position,
            top: addToCart.top || defaultAddToCart.top,
            right: addToCart.right || defaultAddToCart.right,
            left: addToCart.top || defaultAddToCart.left,
            bottom: addToCart.right || defaultAddToCart.bottom,
        }

        addToCartBtn = addToCart.add || defaultAddToCart.add
        addToCartBtn = {
            btn: addToCartBtn.btn || defaultAddToCart.add.btn,
            position: addToCartBtn.position || defaultAddToCart.add.position,
            top: addToCartBtn.top || defaultAddToCart.add.top,
            right: addToCartBtn.right || defaultAddToCart.add.right,
            left: addToCartBtn.left || defaultAddToCart.add.left,
            bottom: addToCartBtn.bottom || defaultAddToCart.add.bottom,
            fontSize: addToCartBtn.fontSize || defaultAddToCart.add.fontSize,
            height: addToCartBtn.height || defaultAddToCart.add.height,
            width: addToCartBtn.width || defaultAddToCart.add.width,
            margin: addToCartBtn.margin || defaultAddToCart.add.margin,
            border: addToCartBtn.border || defaultAddToCart.add.border,
            borderRadius: addToCartBtn.borderRadius || defaultAddToCart.add.borderRadius,
            color: addToCartBtn.color || defaultAddToCart.add.color,
            backgroundColor: addToCartBtn.backgroundColor || defaultAddToCart.add.backgroundColor,
            hoverBackgroundColor: addToCartBtn.hoverBackgroundColor || defaultAddToCart.add.hoverBackgroundColor,
        }

        btnsWrap = {
            flexDirection: addToCart.flexDirection || defaultAddToCart.flexDirection,
        }

        plusBtn = addToCart.plus || defaultAddToCart.plus
        plusBtn = {
            btn: plusBtn.btn || defaultAddToCart.plus.btn,
            position: plusBtn.position || defaultAddToCart.plus.position,
            top: plusBtn.top || defaultAddToCart.plus.top,
            right: plusBtn.right || defaultAddToCart.plus.right,
            left: plusBtn.left || defaultAddToCart.plus.left,
            bottom: plusBtn.bottom || defaultAddToCart.plus.bottom,
            fontSize: plusBtn.fontSize || defaultAddToCart.plus.fontSize,
            height: plusBtn.height || defaultAddToCart.plus.height,
            width: plusBtn.width || defaultAddToCart.plus.width,
            margin: plusBtn.margin || defaultAddToCart.plus.margin,
            border: plusBtn.border || defaultAddToCart.plus.border,
            borderRadius: plusBtn.borderRadius || defaultAddToCart.plus.borderRadius,
            color: plusBtn.color || defaultAddToCart.plus.color,
            backgroundColor: plusBtn.backgroundColor || defaultAddToCart.plus.backgroundColor,
            hoverBackgroundColor: plusBtn.hoverBackgroundColor || defaultAddToCart.plus.hoverBackgroundColor,
        }

        minusBtn = addToCart.minus || defaultAddToCart.minus
        minusBtn = {
            btn: minusBtn.btn || defaultAddToCart.minus.btn,
            position: minusBtn.position || defaultAddToCart.minus.position,
            top: minusBtn.top || defaultAddToCart.minus.top,
            right: minusBtn.right || defaultAddToCart.minus.right,
            left: minusBtn.left || defaultAddToCart.minus.left,
            bottom: minusBtn.bottom || defaultAddToCart.minus.bottom,
            fontSize: minusBtn.fontSize || defaultAddToCart.minus.fontSize,
            height: minusBtn.height || defaultAddToCart.minus.height,
            width: minusBtn.width || defaultAddToCart.minus.width,
            margin: minusBtn.margin || defaultAddToCart.minus.margin,
            border: minusBtn.border || defaultAddToCart.minus.border,
            borderRadius: minusBtn.borderRadius || defaultAddToCart.minus.borderRadius,
            color: minusBtn.color || defaultAddToCart.minus.color,
            backgroundColor: minusBtn.backgroundColor || defaultAddToCart.minus.backgroundColor,
            hoverBackgroundColor: minusBtn.hoverBackgroundColor || defaultAddToCart.minus.hoverBackgroundColor,
        }

        removeBtn = addToCart.delete || defaultAddToCart.delete
        removeBtn = {
            btn: removeBtn.btn || defaultAddToCart.delete.btn,
            position: removeBtn.position || defaultAddToCart.delete.position,
            top: removeBtn.top || defaultAddToCart.delete.top,
            right: removeBtn.right || defaultAddToCart.right,
            left: removeBtn.left || defaultAddToCart.delete.left,
            bottom: removeBtn.bottom || defaultAddToCart.bottom,
            fontSize: removeBtn.fontSize || defaultAddToCart.delete.fontSize,
            height: removeBtn.height || defaultAddToCart.delete.height,
            width: removeBtn.width || defaultAddToCart.delete.width,
            margin: removeBtn.margin || defaultAddToCart.delete.margin,
            border: removeBtn.border || defaultAddToCart.delete.border,
            borderRadius: removeBtn.borderRadius || defaultAddToCart.delete.borderRadius,
            color: removeBtn.color || defaultAddToCart.delete.color,
            backgroundColor: removeBtn.backgroundColor || defaultAddToCart.delete.backgroundColor,
            hoverBackgroundColor: removeBtn.hoverBackgroundColor || defaultAddToCart.delete.hoverBackgroundColor,
        }

        qtyBtn = addToCart.num || defaultAddToCart.num
        qtyBtn = {
            btn: qtyBtn.btn || defaultAddToCart.num.btn,
            position: qtyBtn.position || defaultAddToCart.num.position,
            top: qtyBtn.top || defaultAddToCart.num.top,
            right: qtyBtn.right || defaultAddToCart.num.right,
            left: qtyBtn.left || defaultAddToCart.num.left,
            bottom: qtyBtn.bottom || defaultAddToCart.num.bottom,
            fontSize: qtyBtn.fontSize || defaultAddToCart.num.fontSize,
            height: qtyBtn.height || defaultAddToCart.num.height,
            width: qtyBtn.width || defaultAddToCart.num.width,
            margin: qtyBtn.margin || defaultAddToCart.num.margin,
            border: qtyBtn.border || defaultAddToCart.num.border,
            borderRadius: qtyBtn.borderRadius || defaultAddToCart.num.borderRadius,
            color: qtyBtn.color || defaultAddToCart.num.color,
            backgroundColor: qtyBtn.backgroundColor || defaultAddToCart.num.backgroundColor,
            hoverBackgroundColor: qtyBtn.hoverBackgroundColor || defaultAddToCart.num.hoverBackgroundColor,
        }

        addToCartStyles = {
            addToCartWrap, addToCartBtn, btnsWrap, plusBtn, minusBtn, removeBtn, qtyBtn
        }
    }

    productStyles = {
        productWrap, productName, productBrand, productPrice, productPriceBeforeDiscount,
        productPriceUnit, productReviews, productRating, priceAndAddToCartWrapper,
        productPriceWrap, addToCartStyles
    }

    ///////////////////// Badges Styles /////////////////////////

    var badgesWrap, badgeWrap, badgeStyle, badgeStyles, badgeList, backgroundColors

    badgesWrap = {
        display: badges.display || defaultBadges.display,
        top: badges.top || defaultBadges.top,
        left: badges.left || defaultBadges.left,
        gridRowGap: badges.paddingBetween || defaultBadges.paddingBetween,
        gridColumnGap: badges.paddingBetween || defaultBadges.paddingBetween,
        gridTemplateColumns: `repeat(auto-fit, minmax(${badges.badgeWidth || defaultBadges.badgeWidth}, 1fr))`,
    }

    badgeWrap = {
        height: badges.badgeHeight || defaultBadges.badgeHeight,
        width: badges.badgeWidth || defaultBadges.badgeWidth,
        borderRadius: badges.borderRadius || defaultBadges.borderRadius,
    }

    badgeStyle = {
        color: badges.color || defaultBadges.color,
        fontSize: badges.fontSize || defaultBadges.fontSize,
        fontWeight: '600'
    }

    badgeList = badges.badges || defaultBadges.badges || []
    backgroundColors = badges.backgroundColors.length > 0
        ? badges.backgroundColors
        : defaultBadges.backgroundColors

    badgeStyles = { badges: badgeList, backgroundColors, badgesWrap, badgeWrap, badgeStyle }

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
        playTimerBar(false)
    }

    const mouseLeaveHandler = e => {
        e.preventDefault()
        if (autoPlay) timeOut = [setInterval(() => chevronRight(), duration)]
        playTimerBar(true)
    }

    const mouseDownHandler = (e) => {
        e.preventDefault()
        sliderWrapper.style.scrollBehavior = 'auto'
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
        sliderWrapper.style.scrollBehavior = scrollBehavior
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

                if (e.clientY > clientY && sliderWrapper.scrollTop === 0) {// case scroll is 0
                    scrollTop = 0
                    clientY = e.clientY
                }
                sliderWrapper.scrollTop = scrollTop - (e.clientY - clientY)
                if (sliderWrapper.scrollTop === scrollHeight) {// case scroll is maximum
                    scrollTop = sliderWrapper.scrollTop
                    clientY = e.clientY
                }
            } else {
                lastClientX = e.clientX
                if (e.clientX > clientX && sliderWrapper.scrollLeft === 0) {// case scroll is 0
                    scrollLeft = 0
                    clientX = e.clientX
                }
                sliderWrapper.scrollLeft = scrollLeft - (e.clientX - clientX)
                if (sliderWrapper.scrollLeft === scrollWidth) {// case scroll is maximum
                    scrollLeft = sliderWrapper.scrollLeft
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
            playTimerBar(false)
        }
    }

    const touchMoveHandler = e => {
        if (drag) {
            if (verticalSwiper) {

                if (e.touches[0].clientY > clientY && sliderWrapper.scrollTop === 0) {// case scroll is 0
                    scrollTop = 0
                    clientY = e.touches[0].clientY
                }
                sliderWrapper.scrollTop = scrollTop - (e.touches[0].clientY - clientY)
                if (sliderWrapper.scrollTop === scrollHeight) {// case scroll is maximum
                    scrollTop = sliderWrapper.scrollTop
                    clientY = e.touches[0].clientY
                }

            } else {

                if (e.touches[0].clientX > clientX && sliderWrapper.scrollLeft === 0) {// case scroll is 0
                    scrollLeft = 0
                    clientX = e.touches[0].clientX
                }
                sliderWrapper.scrollLeft = scrollLeft - (e.touches[0].clientX - clientX)

                if (sliderWrapper.scrollLeft === scrollWidth) {// case scroll is maximum
                    scrollLeft = sliderWrapper.scrollLeft
                    clientX = e.touches[0].clientX
                }
            }
        }
    }

    const chevronRight = e => {
        if (sliderWrapper) {
            if (verticalSwiper) {
                chevronBottom(e)
                return
            }
            sliderWrapper.style.scrollBehavior = 'smooth'
            var visibleWidthofSlide = (sliderWrapper.clientWidth + sliderWrapper.scrollLeft) % (slideWidth + gapWidth)
            scrollLeft = sliderWrapper.scrollLeft + skipMore
            if (sliderWrapper.scrollWidth - (sliderWrapper.clientWidth + sliderWrapper.scrollLeft) <= 2)
                sliderWrapper.scrollLeft = 0
            else if (visibleWidthofSlide === slideWidth) scrollLeft += widthSlideSkipper
            else if (slideWidth - visibleWidthofSlide <= 2) scrollLeft += widthSlideSkipper
            else scrollLeft += slideWidth - visibleWidthofSlide + (widthSlideSkipper - (slideWidth + gapWidth))
            sliderWrapper.scrollLeft = scrollLeft
        }
    }

    const chevronLeft = e => {
        if (sliderWrapper) {
            if (verticalSwiper) {
                chevronTop(e)
                return
            }
            sliderWrapper.style.scrollBehavior = 'smooth'
            var visibleWidthofSlide = sliderWrapper.scrollLeft % (slideWidth + gapWidth)
            scrollLeft = sliderWrapper.scrollLeft
            if (sliderWrapper.scrollLeft === 0) scrollLeft = sliderWrapper.scrollWidth
            else if (visibleWidthofSlide === 0) scrollLeft += - widthSlideSkipper
            else if (visibleWidthofSlide === 1) scrollLeft += - widthSlideSkipper - 1
            else scrollLeft += - visibleWidthofSlide - (widthSlideSkipper - (slideWidth + gapWidth))
            sliderWrapper.scrollLeft = scrollLeft
        }
    }

    const chevronBottom = e => {
        if (sliderWrapper) {
            sliderWrapper.style.scrollBehavior = 'smooth'
            var visibleHeightofSlide = (sliderWrapper.clientHeight + sliderWrapper.scrollTop) % (slideHeight + gapWidth)
            scrollTop = sliderWrapper.scrollTop
            if (sliderWrapper.scrollHeight - (sliderWrapper.clientHeight + sliderWrapper.scrollTop) <= 2)
                sliderWrapper.scrollTop = 0
            else if (visibleHeightofSlide === slideHeight) scrollTop += heightSlideSkipper
            else scrollTop += slideHeight - visibleHeightofSlide + (heightSlideSkipper - (slideHeight + gapWidth))
            sliderWrapper.scrollTop = scrollTop
        }
    }

    const chevronTop = e => {
        if (sliderWrapper) {
            sliderWrapper.style.scrollBehavior = 'smooth'
            var visibleHeightofSlide = sliderWrapper.scrollTop % (slideHeight + gapWidth)
            scrollTop = sliderWrapper.scrollTop
            if (sliderWrapper.scrollTop === 0) scrollTop = sliderWrapper.scrollHeight
            else if (visibleHeightofSlide === 0) scrollTop += - heightSlideSkipper
            else if (visibleHeightofSlide === 1) scrollTop += - heightSlideSkipper - 1
            else scrollTop += - visibleHeightofSlide - (heightSlideSkipper - (slideHeight + gapWidth))
            sliderWrapper.scrollTop = scrollTop
        }
    }

    const toggleSlides = e => {

        if (!isNaN(scrollLeft) && autoToggle && chevrons.display !== 'none') {
            if (verticalSwiper
                ? sliderWrapper.scrollTop + sliderWrapper.clientHeight === sliderWrapper.scrollHeight
                : sliderWrapper.scrollLeft + sliderWrapper.clientWidth === sliderWrapper.scrollWidth) // maximum right
                rightChevron.style.display = 'none'
            else rightChevron.style.display = 'flex'

            if (verticalSwiper
                ? sliderWrapper.scrollTop === 0
                : sliderWrapper.scrollLeft === 0) // maximum left
                leftChevron.style.display = 'none'
            else leftChevron.style.display = 'flex'
        }

        toggleBullets_TimeBar()
    }

    const ToggleScroll = e => {
        const currClientX = !touchScreen ? e.clientX : e.changedTouches[0].clientX
        const currClientY = !touchScreen ? e.clientY : e.changedTouches[0].clientY
        const minScroll = !verticalSwiper ? sliderWrapper.scrollLeft === 0 : sliderWrapper.scrollTop === 0
        const maxScroll = !verticalSwiper ? scrollWidth === sliderWrapper.scrollLeft : scrollHeight === sliderWrapper.scrollTop

        if (scrollBehavior === 'smooth') { // auto scroll
            if (verticalSwiper) {
                if (currClientY < clientY && !maxScroll) chevronRight(e)
                else if (currClientY > clientY && !minScroll) chevronLeft(e)
            } else if (!verticalSwiper) {
                if (currClientX < clientX && !maxScroll) chevronRight(e)//sliderWrapper.scrollLeft += Math.pow(mouseTravel, 2)
                else if (currClientX > clientX && !minScroll) chevronLeft(e)//sliderWrapper.scrollLeft -= Math.pow(mouseTravel, 2)
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
        if (sliderWrapper) {
            const _idExist = state.actions.openBox &&
                state.actions.openBox.find(box_id => box_id == _id)

            if (_idExist && !boxOpenned) {
                boxOpenned = true
                timeOut && timeOut.map(run => clearTimeout(run))
                timeOut = []
                sliderWrapper.style.height = swiperHeight

            } else if (!_idExist && boxOpenned) {
                if (autoPlay) timeOut = [...timeOut, setInterval(() => chevronRight(), duration)]
                boxOpenned = false
                if (swiperBox.height === 'slideHeight')
                    sliderWrapper.style.height = slideHeight + 'px'
                else sliderWrapper.style.height = styles.height || defaultStyles.height
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
                        {slides && slides.map((slide, index) =>
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

    const playTimerBar = (state) => {
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
                var index = parseInt((sliderWrapper.scrollLeft + sliderWrapper.clientWidth + gapWidth) / (slideWidth + gapWidth) + 0.01) - 1
                if (index < 0 || isNaN(index) || !index) index = 0

                if (slideIndex !== index && element) {
                    slideIndex = index
                    playTimerBar(true)
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
                var index = parseInt((sliderWrapper.scrollTop + sliderWrapper.clientHeight + gapWidth) / (slideHeight + gapWidth) + 0.01) - 1
                if (index < 0 || isNaN(index) || !index) index = 0
                if (slideIndex !== index && element) {
                    slideIndex = index
                    playTimerBar(true)
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

    const Product = React.memo(({ timer, product, styles }) => {

        const {
            productWrap, productName, productBrand, productPrice, productPriceBeforeDiscount,
            productPriceUnit, productReviews, productRating, priceAndAddToCartWrapper,
            productPriceWrap, addToCartStyles
        } = styles

        product.discounted = timer.active && product.onSale.amount >= product.discount
            ? product.onSale.amount : (product.discount || 0)

        product.priceAfterDiscount = product.discounted > 0
            ? (product.priceUsd - (product.priceUsd * product.discount / 100).toFixed(2))
            : false

        return <div className='product-details-wrap' style={productWrap}>
            <div className='product-details-wrap-1'>
                <div className="product-name" style={productName}>
                    <Link to={"/product/" + product._id}>
                        <div className='product-nameEn'>{product.nameEn || product.title}</div>
                    </Link>
                </div>
                <div className="product-brand" style={productBrand}>{product.brand}</div>
                <div className='product-det-price-reviews-cont' style={priceAndAddToCartWrapper}>
                    <div className="product-det-price-reviews-wrap">
                        <div className="product-price" style={productPriceWrap}>
                            <div className={product.discounted ? 'before-discount' : ''}
                                style={product.discounted ? productPriceBeforeDiscount : productPrice}>{product.priceUsd}
                                <div className='price-unit' style={productPriceUnit}>${!product.priceAfterDiscount ? '/' + product.unit : ''}</div>
                            </div>
                            {product.priceAfterDiscount &&
                                <div className='after-discount' style={productPrice}>
                                    {product.priceAfterDiscount}
                                    <div className='price-unit' style={productPriceUnit}>$/{product.unit}</div>
                                </div>}
                        </div>
                        <div className='product-review-container'>
                            <div className='product-review' style={productRating}>
                                <FontAwesomeIcon icon={faStar} className='faStar' />
                                4.5</div>
                            <div className='product-review-qty' style={productReviews}>(21)</div>
                        </div>
                    </div>
                    {/* Add To Cart */}
                    {addToCartStyles && <AddToCart product={product} styles={addToCartStyles} />}
                </div>
            </div>

            {/* Timer */}
            {!timer.ended && product.onSale.amount >= product.discount &&
                <Timer slide={product} slider_id={_id} />}

        </div>
    })

    /////////////////////
    const getSlideIndex = (index) => {
        var i = slide.findIndex(slide => slide.index === index)
        if (i === -1) i = defaultSlideIndex
        return i
    }

    const slideTitleStyles = (index) => slide[index].title

    return (
        <div className={'slides-overlay slider-' + _id}
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
                    <div className="slider-wrapper" style={swiperBox}
                        onMouseDown={e => { e.preventDefault(); sliderWrapper && !stopOnHover && mouseDownHandler(e); }}
                        onMouseEnter={e => { e.preventDefault(); sliderWrapper && stopOnHover && mouseEnterHandler(e); }}
                        onMouseLeave={e => { sliderWrapper && stopOnHover && mouseLeaveHandler(e) }}
                        onTouchStart={e => { sliderWrapper && touchScreen && touchStartHandler(e) }}
                        onTouchEnd={e => { sliderWrapper && stopOnHover && touchScreen && mouseLeaveHandler(e) }}
                        onScroll={e => swiper.swipable && toggleSlides()}>

                        {slides && slides.map((slide, index) => {
                            const i = getSlideIndex(index)
                            const timer = showTimer(slide.onSale)
                            return (
                                <div className='slide-container' style={slideContainer(i)} key={index}>
                                    <div className='timerBar' style={timerBarStyles} />
                                    <div className='slide-wrapper' style={slideWrapperStyle(i)}>

                                        {/* Badges */}
                                        {badges.display !== 'none' &&
                                            <Badges slide={slide} timer={timer} styles={badgeStyles} />}

                                        <div className='image-wrap' style={imageWrapStyle(i)}>
                                            {/*<div className='image-skeleton' style={skeleton}>Sarah Originals</div>*/}
                                            <img src={/*imageUrl + slide.src*/url(slide.src || slide.image)}
                                                className="slide-img"
                                                style={imageStyle(i)}
                                                onClick={e => linkSlide(e, slide.link)}
                                            //onLoad={e => { e.currentTarget.previousSibling.classList.add('hide') }}
                                            />
                                        </div>

                                        {slideTitleStyles(i) && slideTitleStyles(i).display !== 'none' &&
                                            <TitleContainer _id={slide._id} styles={slideTitleStyles(i)}
                                                Title={{ title: slide.title, description: slide.description }} />}

                                        {productVisible(i) &&
                                            <Product product={slide} timer={timer} styles={productStyles} />}

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

export default React.memo(Slider)