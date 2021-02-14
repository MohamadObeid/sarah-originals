import React, { useEffect, useState } from 'react'
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
import { getSlides } from '../../actions/slidesActions'

export const Slider = React.memo(({ styles, defaultStyles, slider, touchScreen }) => {
    const dispatch = useDispatch()

    var timeOut
    var sliderWrapper
    var timerBar
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
    var slideWrapper
    var markerElement
    var productTimerWrapper
    var markerInterval
    var markerIndex = 0
    //var titleSlides = slider.slide.filter(slide => slide.name)
    //if (titleSlides.length > 0) titleSlides = titleSlides.map(slide => slide.title)

    var otherSlides = slider.slides
    var allSlides = []
    var currentAction = {}
    var assigned = false
    var slideBox = {}

    const _id = slider._id
    const action = slider.action
    const controls = slider.controls
    const controller = slider.controller
    const controllable = slider.controllable
    const event = controls.event
    const title = slider.title
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
    const defaultTimerBar = defaultStyles.timerBar
    const defaultAddToCart = defaultProduct.addToCart
    const defaultSlideBox = slider.slide.find(slideBox => slideBox.isDefault)

    const [slides, setSlides] = useState()

    useSelector(state => {

        if (!assigned) {
            var slideAction = slideBox.action
            var slideController = slideBox.controller
            var slideControllable = slideBox.controllable

            if (state.actions[action] || state.actions[slideAction]) {
                currentAction = state.actions[action] || state.actions[slideAction]

                if (controller || slideController) {

                    if (markerStyle && markerStyle.display !== 'none')
                        if (currentAction.stop) {

                            markerIndex = markerIndex === 0 ? 0 : markerIndex - 1
                            clearInterval(markerInterval)
                            markerInterval = 0

                        } else {
                            if (markerStyle.autoPlay && !markerInterval) {
                                markerInterval = setInterval(() => { markerHandler(false) }, markerStyle.duration)
                                markerHandler(false)
                            }
                        }

                } else if (controllable || slideControllable) {

                    const sameSlides = currentAction.slides === slides
                    // controllable? => update slides
                    if (!sameSlides) {
                        // clear marker
                        if (markerStyle && markerStyle.display !== 'none') {
                            markerIndex = markerIndex === 0 ? 0 : markerIndex - 1
                            clearInterval(markerInterval)
                        }

                        setSlides(currentAction.slides)
                    }
                }
            }
        }

        if (!slides) {
            var slidesExist = state.slides.find(slides => slides._id === _id)
            if (slidesExist) setSlides(slidesExist.slides)
        }
    })

    assigned = true
    setTimeout(() => { assigned = false }, 200)

    if (slides) allSlides = [...otherSlides, ...slides]

    useEffect(() => {
        if (slides) {

            element = document.getElementsByClassName('slider-' + _id)[0]
            sliderWrapper = element.getElementsByClassName('slider-wrapper')[0]
            leftChevron = element.getElementsByClassName('left-chevron-wrap')[0]
            rightChevron = element.getElementsByClassName('right-chevron-wrap')[0]
            timerBar = element.getElementsByClassName('timer-bar')[0]
            slideWrapper = [...element.getElementsByClassName('slide-wrapper')]
            productTimerWrapper = element.getElementsByClassName('product-timer-wrap')
            markerElement = element.getElementsByClassName('marker-transform')[0]

            var maxHeight = 0

            // collapse wrapper totally
            if (allSlides.length === 0) {
                element.style.padding = '0'
                sliderWrapper.style.padding = '0'
            } else {
                element.style.padding = slidesOverlayStyle.padding
                sliderWrapper.style.padding = swiperBox.padding
            }

            slideWrapper.map(e => {
                if (e.offsetHeight > maxHeight)
                    maxHeight = e.offsetHeight

                // if slide have a product timer => align the timer to the end
                if (productTimerWrapper && productTimerWrapper.length > 0)
                    productTimerWrapper[0].style.justifyContent = 'space-between'
            })

            for (var i = 0, len = slideWrapper.length; i < len; i++) {
                slideWrapper[i].style["height"] = maxHeight + 'px';
            }

            slideHeight = maxHeight
            slideWidth = slideWrapper[0] && slideWrapper[0].offsetWidth

            if (swiperBox.height === 'slideHeight')
                sliderWrapper.style["height"] = slideHeight + (fixBorder ? 1 : 0) + 'px'

            widthSlideSkipper = (slideWidth + gapWidth) * skip
            heightSlideSkipper = (slideHeight + gapWidth) * skip

            const currSwiperWidth = sliderWrapper.offsetWidth
            const lineCapacity = parseInt((currSwiperWidth + gapWidth) / (slideWidth + gapWidth))
            const lineNum = allSlides.length / lineCapacity
            if (lineNum % 1 === 0)
                swiperHeight = ((slideHeight + gapWidth) * lineNum - gapWidth) + 'px'
            else if (lineNum % 1 > 0)
                swiperHeight = ((slideHeight + gapWidth) * (parseInt(lineNum + 1)) - gapWidth) + 'px'

            if (autoPlay && !timeOut && !boxOpenned) {
                clearInterval(timeOut)
                timeOut = setInterval(() => chevronRight(), duration)
                toggleTimerBar(true)
            }

            toggleSlides(true)

            if (markerStyle.autoPlay) {
                clearInterval(markerInterval)
                markerHandler(false)
                markerInterval = setInterval(() => { markerHandler(false) }, markerStyle.duration)
            }
        }
    }, [slides])

    defaultSlideIndex = slide.findIndex(slide => slide.isDefault)
    if (defaultSlideIndex === -1) defaultSlideIndex = undefined

    const skipMore = swiper.skipMore || defaultSwiper.skipMore
    const fixBorder = styles.fixBorder || defaultStyles.fixBorder
    const scrollBehavior = swiper.scroll && swiper.scroll.behavior || defaultSwiper.scroll.behavior
    const verticalSwiper = (swiper.direction === 'Y' || defaultSwiper.direction === 'Y') ? true : false

    const slidesOverlayStyle = {
        display: styles.display || defaultStyles.display,
        width: styles.width || defaultStyles.width,
        backgroundColor: styles.backgroundColor || defaultStyles.backgroundColor,
        border: styles.border || defaultStyles.border,
        borderBottom: styles.borderBottom || defaultStyles.borderBottom || styles.border,
        borderTop: styles.borderTop || defaultStyles.borderTop || styles.border,
        borderLeft: styles.borderLeft || defaultStyles.borderLeft || styles.border,
        borderRight: styles.borderRight || defaultStyles.borderRight || styles.border,
        borderRadius: styles.borderRadius || defaultStyles.borderRadius,
        flexDirection: styles.flexDirection || defaultStyles.flexDirection,
        justifyContent: styles.justifyContent || defaultStyles.justifyContent,
        alignItems: styles.alignItems || defaultStyles.alignItems,
        padding: styles.paddingAround || defaultStyles.paddingAround,
        minHeight: styles.minHeight || defaultStyles.minHeight,
    }

    const slidesWrapperStyle = {
        borderRadius: styles.borderRadius || defaultStyles.borderRadius,
        width: '100%',
    }

    const swiperBox = {
        display: styles.display || defaultStyles.display,
        gridColumnGap: styles.paddingBetween || defaultStyles.paddingBetween,
        gridRowGap: styles.paddingBetween || defaultStyles.paddingBetween,
        gridTemplateColumns: `repeat(auto-fit, minmax(${slide[defaultSlideIndex].width}, 1fr))`,
        borderRadius: slide[defaultSlideIndex].borderRadius,
        overflow: styles.overflow || defaultStyles.overflow,
        height: styles.height || defaultStyles.height,
        borderLeft: fixBorder && (slide[defaultSlideIndex].border || defaultSlide.border),
        borderTop: fixBorder && (slide[defaultSlideIndex].border || defaultSlide.border),
        flexDirection: swiper.flexDirection || defaultSwiper.flexDirection,
        justifyContent: swiper.justifyContent || defaultSwiper.justifyContent,
        width: '100%',
    }

    const slideContainer = (index) =>
    ({
        height: slide[index].height || defaultSlide.height,
        minWidth: slide[index].width || defaultSlide.width,
        width: slide[index].forceWidth && (slide[index].width || defaultSlide.width),
        borderRadius: slide[index].borderRadius || defaultSlide.borderRadius,
        margin: slide[index].margin || defaultSlide.margin,
    })

    const slideWrapperStyle = (index) =>
    ({
        height: '100%',
        width: '100%',
        borderRadius: slide[index].borderRadius || defaultSlide.borderRadius,
        border: slide[index].border || defaultSlide.border,
        backgroundColor: slide[index].backgroundColor || defaultSlide.backgroundColor,
        transition: slide[index].transition || defaultSlide.transition,
        transform: slide[index].transform || defaultSlide.transform,
        justifyContent: slide[index].justifyContent || defaultSlide.justifyContent,
        flexDirection: slide[index].flexDirection || defaultSlide.flexDirection,
        padding: slide[index].padding || defaultSlide.padding,
        borderLeft: fixBorder ? '1px solid #00000000' : (slide[index].border || defaultSlide.border),
        borderTop: fixBorder ? '1px solid #00000000' : (slide[index].border || defaultSlide.border),
        boxShadow: slide[index].boxShadow || defaultSlide.boxShadow || 'unset',
    })

    var markerStyle = styles.marker ? styles.marker : {}
    defaultStyles.marker &&
        Object.entries(defaultStyles.marker).map(([key, value]) => {
            markerStyle = { ...markerStyle, [key]: markerStyle[key] || value }
        })

    const imageWrapStyle = (index) =>
    ({
        minHeight: slide[index].image.height || defaultSlide.image.height,
        borderRadius: slide[index].image.borderRadius || defaultSlide.image.borderRadius,
        display: slide[index].image.display || defaultSlide.image.display,
        padding: slide[index].image.padding || defaultSlide.image.padding,

        width: (slide[index].image.forceWidth || defaultSlide.image.forceWidth)
            && (slide[index].image.width || defaultSlide.image.width),

        maxWidth: (!slide[index].image.forceWidth || !defaultSlide.image.forceWidth)
            && (slide[index].image.width || defaultSlide.image.width),

        minWidth: (!slide[index].image.forceWidth || !defaultSlide.image.forceWidth)
            && (slide[index].image.width || defaultSlide.image.width)
    })

    const imageStyle = (index) =>
    ({
        borderRadius: slide[index].image.borderRadius || defaultSlide.image.borderRadius,
        transform: (!slide[index].image.animation || !defaultSlide.image.animation) && 'unset',

        width: (slide[index].image.forceWidth || defaultSlide.image.forceWidth)
            && (slide[index].image.width || defaultSlide.image.width),

        height: (slide[index].image.forceHeight || defaultSlide.image.forceHeight)
            && (slide[index].image.height || defaultSlide.image.height),

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
            boxShadow: swiper.chevrons.boxShadow || defaultSwiper.chevrons.boxShadow,
            border: swiper.chevrons.border || defaultSwiper.chevrons.border,
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

    var timerBarStyle = styles.timerBar || defaultStyles.timerBar
    Object.entries(defaultStyles.timerBar).map(([key, value]) => {
        timerBarStyle = { ...timerBarStyle, [key]: timerBarStyle[key] || value }
    })
    timerBarStyle.afterTransition = timerBarStyle.transition
    timerBarStyle.width = '0%'

    /////////////////// product styles //////////////////////

    var productWrap, productName, productBrand, productPrice, productPriceBeforeDiscount,
        productPriceUnit, productReviews, productRating, priceAndAddToCartWrapper,
        productPriceWrap, productStyles

    productWrap = {
        display: product.display || defaultProduct.display,
        justifyContent: product.justifyContent || defaultProduct.justifyContent,
        alignItems: product.alignItems || defaultProduct.alignItems,
        padding: product.padding || defaultProduct.padding,
        height: '100%',
    }

    productName = product.name || defaultProduct.name
    productName = {
        fontSize: productName.fontSize || defaultProduct.name.fontSize,
        color: productName.color || defaultProduct.name.color,
        //hoverColor: product.name.hoverColor ,
        textAlign: productName.textAlign || defaultProduct.name.textAlign,
        fontWeight: productName.fontWeight || defaultProduct.name.fontWeight,
        margin: productName.margin || defaultProduct.name.margin,
    }

    productBrand = product.brand || defaultProduct.brand
    productBrand = {
        display: productBrand.display || defaultProduct.brand.display,
        fontSize: productBrand.fontSize || defaultProduct.brand.fontSize,
        color: productBrand.color || defaultProduct.brand.color,
    }

    priceAndAddToCartWrapper = product.priceAndAddToCartWrapper || defaultProduct.priceAndAddToCartWrapper
    priceAndAddToCartWrapper = {
        display: priceAndAddToCartWrapper.display || defaultProduct.display,
        padding: priceAndAddToCartWrapper.padding || defaultProduct.padding,
        flexDirection: priceAndAddToCartWrapper.flexDirection || defaultProduct.flexDirection,
        justifyContent: priceAndAddToCartWrapper.justifyContent || defaultProduct.justifyContent,
        alignItems: priceAndAddToCartWrapper.alignItems || defaultProduct.alignItems,
        height: priceAndAddToCartWrapper.height || defaultProduct.height,
        flex: '0.5'
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
        unit: productPrice.unit || defaultProduct.price.unit,
        beforeDiscount: productPrice.beforeDiscount || defaultProduct.price.beforeDiscount,
        //hoverColor: product.price.hoverColor ,
    }

    productPriceBeforeDiscount = productPrice.beforeDiscount || defaultProduct.price.beforeDiscount
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
    addToCartVisible = addToCart && addToCart.display !== 'none'

    if (addToCartVisible) {
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
        fontWeight: '500'
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
    var mouseDown, touchStart, mouseEnter

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
        mouseEnter = true
        if (markerStyle.stopOnHover) {
            markerIndex = markerIndex === 0 ? 0 : markerIndex - 1
            //clearMarker(markerIndex)
            clearInterval(markerInterval)
        }
        if (stopOnHover) {
            clearInterval(timeOut)
            toggleTimerBar(false)
        }
    }

    const mouseLeaveHandler = e => {
        e.preventDefault()
        mouseEnter = false
        if (autoPlay && stopOnHover && !mouseDown && !boxOpenned) {
            timeOut = setInterval(() => chevronRight(), duration)
            toggleTimerBar(true)
        }

        if (markerStyle.stopOnHover)
            if (markerStyle.autoPlay) {
                markerIndex = markerIndex === 0 ? 0 : markerIndex - 1
                markerHandler(false)
                markerInterval = setInterval(() => { markerHandler(false) }, markerStyle.duration)
            }
    }

    const mouseDownHandler = (e) => {
        e.preventDefault()
        mouseDown = true
        clearInterval(timeOut)
        toggleTimerBar(false)

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

        if (touchScreen) {
            window.addEventListener('touchend', mouseUpHandler)
            window.addEventListener('touchmove', touchMoveHandler)
        } else {
            window.addEventListener('mousemove', mouseMoveHandler)
            window.addEventListener('mouseup', mouseUpHandler)
        }
    }

    const mouseUpHandler = (e) => {
        drag = false
        mouseDown = false
        touchStart = false

        sliderWrapper.style.scrollBehavior = scrollBehavior
        ToggleScroll(e)
        window.removeEventListener('mousemove', mouseMoveHandler)
        window.removeEventListener('mouseup', mouseUpHandler)

        if (touchScreen) {
            window.removeEventListener('touchend', mouseUpHandler)
            window.removeEventListener('touchmove', touchMoveHandler)
        }

        if (autoPlay && !boxOpenned && (touchScreen
            ? !touchStart
            : ((stopOnHover ? !mouseEnter : true) && !mouseDown))) {
            timeOut = setInterval(() => chevronRight(), duration)
            toggleTimerBar(true)
        }

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
        touchStart = true
        mouseDownHandler(e)
        if (stopOnHover) {
            e.preventDefault()
            clearInterval(timeOut)
            toggleTimerBar(false)
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

    const chevronRight = (marker) => {
        if (sliderWrapper) {

            toggleTimerBar(true)

            if (verticalSwiper) {
                chevronBottom()
                return
            }

            if (marker) {
                var virtualScrollLeft = (markerIndex + 1) * (slideWidth + gapWidth)
                var visibleWidth = (sliderWrapper.clientWidth + sliderWrapper.scrollLeft) / virtualScrollLeft
                if (visibleWidth >= 1) {
                    if (markerIndex === 0) {
                        scrollWidth = sliderWrapper.scrollWidth - sliderWrapper.clientWidth
                        const maxScroll = !verticalSwiper
                            ? scrollWidth === sliderWrapper.scrollLeft
                            : scrollHeight === sliderWrapper.scrollTop
                        if (!maxScroll) return
                    } else return
                }
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

    const chevronLeft = () => {
        if (sliderWrapper) {
            if (verticalSwiper) {
                chevronTop()
                return
            }
            sliderWrapper.style.scrollBehavior = 'smooth'
            var visibleWidthofSlide = sliderWrapper.scrollLeft % (slideWidth + gapWidth)
            scrollLeft = sliderWrapper.scrollLeft - skipMore
            if (sliderWrapper.scrollLeft === 0) scrollLeft = sliderWrapper.scrollWidth
            else if (visibleWidthofSlide === 0) scrollLeft += - widthSlideSkipper
            else if (visibleWidthofSlide === 1) scrollLeft += - widthSlideSkipper - 1
            else scrollLeft += - visibleWidthofSlide - (widthSlideSkipper - (slideWidth + gapWidth))
            sliderWrapper.scrollLeft = scrollLeft
        }
    }

    const chevronBottom = () => {
        if (sliderWrapper) {
            sliderWrapper.style.scrollBehavior = 'smooth'
            var visibleHeightofSlide = (sliderWrapper.clientHeight + sliderWrapper.scrollTop) % (slideHeight + gapWidth)
            scrollTop = sliderWrapper.scrollTop + skipMore
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
            scrollTop = sliderWrapper.scrollTop - skipMore
            if (sliderWrapper.scrollTop === 0) scrollTop = sliderWrapper.scrollHeight
            else if (visibleHeightofSlide === 0) scrollTop += - heightSlideSkipper
            else if (visibleHeightofSlide === 1) scrollTop += - heightSlideSkipper - 1
            else scrollTop += - visibleHeightofSlide - (heightSlideSkipper - (slideHeight + gapWidth))
            sliderWrapper.scrollTop = scrollTop
        }
    }

    const chevronHandler = (e, side) => {
        clearInterval(timeOut)
        side === 'right' ? chevronRight() : chevronLeft()
        if (autoPlay && !boxOpenned) {
            timeOut = setInterval(() => {
                side === 'right' ? chevronRight() : chevronLeft()
            }, duration)
            toggleTimerBar(true)
        }
    }

    const toggleSlides = e => {
        if (swiper.swipable) {
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

            toggleBullets()
        }
    }

    const ToggleScroll = e => {
        const currClientX = !touchScreen ? e.clientX : e.changedTouches[0].clientX
        const currClientY = !touchScreen ? e.clientY : e.changedTouches[0].clientY
        const minScroll = !verticalSwiper ? sliderWrapper.scrollLeft === 0 : sliderWrapper.scrollTop === 0
        const maxScroll = !verticalSwiper ? scrollWidth === sliderWrapper.scrollLeft : scrollHeight === sliderWrapper.scrollTop

        if (scrollBehavior === 'smooth') { // auto scroll
            if (verticalSwiper) {
                if (currClientY < clientY && !maxScroll) chevronRight()
                else if (currClientY > clientY && !minScroll) chevronLeft()
            } else if (!verticalSwiper) {
                if (currClientX < clientX && !maxScroll) chevronRight()//sliderWrapper.scrollLeft += Math.pow(mouseTravel, 2)
                else if (currClientX > clientX && !minScroll) chevronLeft()//sliderWrapper.scrollLeft -= Math.pow(mouseTravel, 2)
            }
        }

        if (scrollAutoToggle) // toggle scroll if scroll on min or max
            if (!verticalSwiper && currClientX !== prevClientX) {
                if (minScroll) chevronLeft()
                else if (maxScroll) chevronRight()

            } else if (verticalSwiper && currClientY !== prevClientY) {
                if (minScroll) chevronTop()
                else if (maxScroll) chevronBottom()
            }
    }

    ////////////////////// Open Box ///////////////////////////

    useSelector(state => {
        if (sliderWrapper) {
            const _idExist = state.actions.openBox &&
                state.actions.openBox.find(box_id => box_id == _id)

            if (_idExist && !boxOpenned) {
                boxOpenned = true
                clearInterval(timeOut)
                toggleTimerBar(false)
                sliderWrapper.style.height = swiperHeight

            } else if (!_idExist && boxOpenned) {
                boxOpenned = false

                if (autoPlay && !boxOpenned && (touchScreen
                    ? !touchStart
                    : ((stopOnHover ? !mouseEnter : true) && !mouseDown))) {
                    timeOut = setInterval(() => chevronRight(), duration)
                    toggleTimerBar(true)
                }

                if (swiperBox.height === 'slideHeight')
                    sliderWrapper.style.height = slideHeight + 'px'
                else sliderWrapper.style.height = styles.height || defaultStyles.height
            }
        }
    })

    ////////////////////// Bullets ///////////////////////

    const toggleBullets = () => {
        // toggle bullets

        var index = verticalSwiper
            ? parseInt((sliderWrapper.scrollTop + sliderWrapper.clientHeight + gapWidth) / (slideHeight + gapWidth) + 0.01) - 1
            : parseInt((sliderWrapper.scrollLeft + sliderWrapper.clientWidth + gapWidth) / (slideWidth + gapWidth) + 0.01) - 1

        if (index < 0 || isNaN(index) || !index) index = 0

        if (slideIndex !== index && element) {
            slideIndex = index

            if (bullets.display !== 'none') {
                const bulletElement = element.getElementsByClassName('bullet')
                if (bulletElement[slideIndex] && bulletElement[slideIndex].style.color !== '#00bdd9') {
                    var i = allSlides.length - 1
                    while (i >= 0) {
                        bulletElement[i].style.color = '#eeeeee'
                        i--
                    }
                    bulletElement[slideIndex].style.color = '#00bdd9'
                }
            }
        }

    }

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
                        {allSlides && allSlides.map((slide, index) =>
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

    const toggleTimerBar = (state) => {

        if (timerBarStyle.display !== 'none') {
            if (state && !mouseEnter && !touchStart) {
                timerBar.style.transition = 'all 300ms'
                timerBar.style.width = '0'
                setTimeout(() => {
                    timerBar.style.transition = timerBarStyle.afterTransition
                    timerBar.style.width = '100%'
                }, 300)
            } else {
                timerBar.style.transition = 'unset'
                timerBar.style.width = '0'
            }
        }
    }

    ////////////////////////// Product ////////////////////////////

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

    const productVisible = (index) =>
        slide[index].productVisible === undefined
            ? defaultSlide.productVisible
            : slide[index].productVisible

    const Product = React.memo(({ slideBox, timer, product, styles }) => {

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
            <div className="product-name" onClick={e => controllerHandler('click', 'title', { slides: [product], title: product.nameEn }, slideBox)}>
                {controller
                    ? <div className='product-nameEn' style={productName}>{product.nameEn}</div>
                    : <Link to={"/product/" + product._id}>
                        <div className='product-nameEn' style={productName}>{product.nameEn}</div>
                    </Link>
                }
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

    const slideTitleStyles = (index) => slide[index].title || defaultSlide.title

    const controllerHandler = (event, trigger, content, slideBox) => {

        if (slider.controller) {
            const controls = slider.controls
            const action = slider.action

            if (controls.event === event || trigger === 'autoPlay')
                if (controls.trigger.includes(trigger)) {
                    if (controls.getFrom === 'content')
                        dispatch(getSlides(controls, action, { slides, title }))
                    else if (controls.getFrom === 'controls')
                        dispatch(getSlides(controls, action, {}))
                }
        }

        if (slideBox.controller) {
            const controls = slideBox.controls
            const action = slideBox.action

            if (controls.event === event || trigger === 'autoPlay')
                if (controls.trigger.includes(trigger)) {
                    if (controls.getFrom === 'content')
                        dispatch(getSlides(controls, action, content))
                    else if (controls.getFrom === 'controls')
                        dispatch(getSlides(controls, action, {}))
                }
        }
    }

    const overlayMouseEnter = (e) => {
        e.preventDefault()
        if (controllable && event === 'hover') {
            dispatch({
                type: 'UPDATE_ACTIONS', payload: {
                    [action]: { ...currentAction, stop: true }
                }
            })
        }
    }

    const overlayMouseLeave = (e) => {
        e.preventDefault()
        if (controllable && event === 'hover') {
            dispatch({
                type: 'UPDATE_ACTIONS', payload: {
                    [action]: { ...currentAction, stop: false }
                }
            })
        }
    }

    ///////////////////////////// Marker /////////////////////////////////

    const markerHandler = (hovering) => {
        if (slideWrapper && slideWrapper.length > 0) {

            if (markerIndex === allSlides.length) markerIndex = 0
            var marker = markerStyle || {}

            if (markerElement)
                if (marker.display && marker.display !== 'none') {
                    var target = slideWrapper[markerIndex]

                    var slideWidth = target.offsetWidth
                    var slideHeight = target.offsetHeight

                    var offsetLeft = target.offsetLeft
                    var offsetTop = target.offsetTop

                    if (markerStyle.type === 'line') {
                        if (hovering) {
                            markerElement.style.width = slideWidth + 'px'
                            markerElement.style.left = offsetLeft + 'px'

                        } else {
                            var left = offsetLeft + slideWidth * 0.5
                            //var top = offsetTop + slideHeight * 0.5

                            markerElement.style.width = '0'
                            markerElement.style.left = left + 'px'
                        }
                    } else if (markerStyle.type === 'box') {
                        markerElement.style.height = slideHeight + 'px'
                        markerElement.style.width = slideWidth + 'px'
                        markerElement.style.top = offsetTop + 'px'
                    }

                    // controller handler
                    const slide = allSlides[markerIndex]
                    slideBox = slider.slide.find(slideBox =>
                        (slideBox.name && (slideBox.name === (slide.nameEn || slide.name)))
                        || (slide.title && slideBox.title && slideBox.title.title === slide.title)
                    ) || defaultSlideBox

                    var trigger = hovering && 'hover'
                    if (markerStyle.autoPlay) trigger = 'autoPlay'
                    controllerHandler('', trigger, { slides: [allSlides[markerIndex]], title: slideBox.title }, slideBox)

                    markerIndex++
                }
        }
    }

    const mouseLeaveSlideHandler = (e, index, slide) => {
        e.preventDefault()
        markerIndex = index
        markerHandler(false)

        if (slide && slide.controllable && slide.controls.event === 'hover') {
            dispatch({
                type: 'UPDATE_ACTIONS', payload: {
                    [slide.action]: { ...currentAction, stop: false }
                }
            })
        }
    }

    const mouseEnterSlideHandler = (e, index, slide) => {
        e.preventDefault()
        markerIndex = index
        markerHandler(true)

        if (slide && slide.controllable && slide.controls.event === 'hover') {
            dispatch({
                type: 'UPDATE_ACTIONS', payload: {
                    [slide.action]: { ...currentAction, stop: true }
                }
            })
        }
    }

    return (
        <div className={'slides-overlay slider-' + _id} style={slidesOverlayStyle}
            onMouseEnter={overlayMouseEnter} onMouseLeave={overlayMouseLeave}>

            {/* Slider Title */}
            {TitleStyles && TitleStyles.display !== 'none' &&
                <TitleContainer box={slider} styles={TitleStyles} />}

            <div className='flex-slides-wrapper'>
                <div className='fixed-slides-wrapper' style={slidesWrapperStyle}>

                    {/* Timer Bar */}
                    {timerBarStyle.display !== 'none' &&
                        <div className='timer-bar' style={timerBarStyle} />}

                    {/* Chevrons */}
                    <div className='left-chevron-wrap'
                        onClick={e => chevronHandler(e, 'left')}
                        style={{ ...chevrons, ...leftChevronWrapper }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = chevrons.hoverBackgroundColor }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = chevrons.initialBackgroundColor }}>
                        <FontAwesomeIcon icon={faChevronLeft} style={swiperChevronsStyle} />
                    </div>

                    <div className='right-chevron-wrap'
                        onClick={e => chevronHandler(e, 'right')}
                        style={{ ...chevrons, ...rightChevronWrapper }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = chevrons.hoverBackgroundColor }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = chevrons.initialBackgroundColor }}>
                        <FontAwesomeIcon icon={faChevronRight} style={swiperChevronsStyle} />
                    </div>

                    <div className='marker-transform' style={markerStyle} />

                    {/* Swiper */}
                    <div className="slider-wrapper" style={swiperBox}
                        onMouseDown={e => { sliderWrapper && mouseDownHandler(e); }}
                        onMouseEnter={e => { sliderWrapper && mouseEnterHandler(e); }}
                        onMouseLeave={e => { sliderWrapper && mouseLeaveHandler(e) }}
                        onTouchStart={e => { sliderWrapper && touchScreen && touchStartHandler(e) }}
                        onTouchEnd={e => { sliderWrapper && touchScreen && mouseLeaveHandler(e) }}
                        onScroll={e => sliderWrapper && toggleSlides()}>

                        {allSlides.map((slide, index) => {
                            const i = getSlideIndex(index)
                            const timer = showTimer(slide.onSale)
                            const slideBox = slider.slide.find(slideBox =>
                                (slideBox.name && (slideBox.name === (slide.nameEn || slide.name)))
                                || (slide.title && slideBox.title.title === slide.title)
                            ) || defaultSlideBox

                            return (
                                <div className='slide-container' style={slideContainer(i)} key={index}>
                                    <div className='slide-wrapper' style={slideWrapperStyle(i)}
                                        onMouseEnter={e => mouseEnterSlideHandler(e, index, slideBox)}
                                        onMouseLeave={e => mouseLeaveSlideHandler(e, index, slideBox)}>

                                        {/* Badges */}
                                        {badges.display !== 'none' &&
                                            <Badges slide={slide} timer={timer} styles={badgeStyles} />}

                                        {/* Image */}
                                        {imageWrapStyle(i).display !== 'none' && (slide.src || slide.image) &&
                                            <div className='image-wrap' style={imageWrapStyle(i)}>
                                                {/*<div className='image-skeleton' style={skeleton}>Sarah Originals</div>*/}
                                                <img src={/*imageUrl + slide.src*/url(slide.src || slide.image)}
                                                    className="slide-img"
                                                    style={imageStyle(i)}
                                                    onClick={e => linkSlide(e, slide.link)}
                                                //onLoad={e => { e.currentTarget.previousSibling.classList.add('hide') }}
                                                />
                                            </div>}

                                        {/* Slide Title */}
                                        {slideTitleStyles(i).display && slideTitleStyles(i).display !== 'none' &&
                                            <TitleContainer box={slideBox} styles={slideTitleStyles(i)} />}

                                        {/* Product */}
                                        {productVisible(i) &&
                                            <Product slideBox={slideBox} product={slide} timer={timer} styles={productStyles} />}

                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>

                {/* Bullets */}
                {bullets.display !== 'none' && <Bullets />}
            </div>
        </div >
    )

})