// react hooks
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// plugins
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faCircle } from '@fortawesome/free-solid-svg-icons'
// components
import { Title } from './Title'
import { Slide } from './Slide'
import { Skeleton } from './Skeleton'
// actions
import { search } from '../../actions/searchActions'

export const Slider = React.memo(({ styles, defaultStyles, slider, touchScreen }) => {

    var sliderOverlay
    var sliderWrapper
    var timerBar
    var leftChevron
    var rightChevron
    var slideWidth
    var slideHeight
    var boxOpenned
    var sliderContainer
    var slideIndex
    var swiperHeight
    var defaultStylesIndex
    var slideWrapper
    var markerElement
    var markerIndex = 0
    var skeletonSlides = []
    while (skeletonSlides.length < 10) {
        skeletonSlides.push({ skeleton: true })
    }
    var widthSlideSkipper
    var maxHeight = 0
    var DOMLoaded = false
    var slideStyles = { slide: styles.slide }

    var controlsSlides = slider.slide
    controlsSlides = controlsSlides.filter(slide =>
        (slide.title && slide.title.title) || slide.src)

    var controllableStateAction
    var controllerStateAction
    var firstLoadStateAction
    var markerControls

    const _id = slider._id
    const action = slider.action
    const controller = slider.controller
    const controllable = slider.controllable
    const controls = slider.controls

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
    const defaultAddToCart = defaultProduct.addToCart

    ////////////////////////// Hook ///////////////////////////

    const dispatch = useDispatch()

    const [props, setProps] = useState()

    const stateAction = useRef()
    const chevronInterval = useRef()
    const markerInterval = useRef()

    // open Box handler
    useSelector(state => {

        if (DOMLoaded) {
            if (state.actions.openBox) {
                const openBox = state.actions.openBox.find(box_id => box_id == _id)

                if (openBox && !boxOpenned) {
                    boxOpenned = true

                    clearInterval(chevronInterval.current)
                    toggleTimerBar(false)
                    sliderWrapper.style.height = swiperHeight

                } else if (!openBox && boxOpenned) {
                    boxOpenned = false

                    if (autoPlay && !touchStart && !mouseDown)
                        if (stopOnHover ? !mouseEnter : true) {
                            chevronInterval.current = setInterval(() => chevronRight(), duration)
                            toggleTimerBar(true)
                        }

                    // reset height
                    if (sliderWrapStyles.height === 'slideHeight')
                        sliderWrapper.style.height = slideHeight + 'px'
                    else sliderWrapper.style.height = styles.height || defaultStyles.height
                }
            }
        }
    })

    useSelector(state => {

        // first Load of State Action: set props
        if (state.actions[_id]) {
            firstLoadStateAction = state.actions[_id]

            if (!firstLoadStateAction.mounted.includes(_id)) {
                // if no title: keep current
                firstLoadStateAction.title = firstLoadStateAction.title

                // if no slides: set []
                firstLoadStateAction.slides = firstLoadStateAction.slides

                // set action mounted
                firstLoadStateAction.mounted.push(_id)
                dispatch({ type: 'UPDATE_ACTIONS', payload: { [_id]: firstLoadStateAction } })

                setProps({
                    slides: firstLoadStateAction.slides,
                    title: firstLoadStateAction.title
                })
            }
        }

        if (DOMLoaded) {

            // controllable
            if (controllable)
                if (state.actions[action]) {
                    controllableStateAction = state.actions[action]

                    // update state action for event listeners
                    stateAction.current = state.actions[action]
                    console.log(stateAction.current)
                    if (!controllableStateAction.mounted.includes(_id)) {

                        // if no title: keep current
                        controllableStateAction.title = controllableStateAction.title || props.title

                        // if no slides: set []
                        controllableStateAction.slides = controllableStateAction.slides || []

                        // set action mounted
                        controllableStateAction.mounted.push(_id)
                        dispatch({ type: 'UPDATE_ACTIONS', payload: { [action]: controllableStateAction } })

                        setProps({
                            slides: controllableStateAction.slides,
                            title: controllableStateAction.title
                        })
                    }
                }

            // controller slider: clear event effects
            if (controller)
                controls.map(controls => {

                    if (state.actions[controls.action]) {
                        controllerStateAction = state.actions[controls.action]

                        if (!controllerStateAction.mounted.includes(_id)) {
                            clearEventStyles(controls.event, controls.trigger)

                            // update action
                            controllerStateAction.mounted.push(_id)
                            dispatch({ type: 'UPDATE_ACTIONS', payload: { [controls.action]: controllerStateAction } })
                        }

                        // pause controller
                        if (controllerStateAction.pause && !controllerStateAction.paused) {
                            autoPlayHandler(false)

                            // pause actions
                            controllerStateAction.paused = true
                            dispatch({ type: 'UPDATE_ACTIONS', payload: { [controls.action]: controllerStateAction } })

                            // play controller
                        } else if (!controllerStateAction.pause && controllerStateAction.paused) {
                            autoPlayHandler(true)

                            // unpause actions
                            controllerStateAction.paused = false
                            dispatch({ type: 'UPDATE_ACTIONS', payload: { [controls.action]: controllerStateAction } })
                        }
                    }
                })

            // set slide Width and Height equal to biggest slide
            if (slideWrapper)
                if (slideWrapper[0].offsetWidth !== slideWidth) {
                    slideWidth = slideWrapper[0] && slideWrapper[0].offsetWidth

                    widthSlideSkipper = slideWidth
                        ? (slideWidth + gapWidth) * skip
                        : slideWidth * skip
                }
        }
    })

    useEffect(() => {
        if (props) {
            sliderOverlay = document.getElementsByClassName('slider-' + _id)[0]
            timerBar = sliderOverlay.getElementsByClassName('timer-bar')[0]
            sliderContainer = sliderOverlay.getElementsByClassName('slider-container')[0]
            leftChevron = sliderContainer.getElementsByClassName('left-chevron-wrap')[0]
            rightChevron = sliderContainer.getElementsByClassName('right-chevron-wrap')[0]
            sliderWrapper = sliderContainer.getElementsByClassName('slider-wrapper')[0]
            markerElement = sliderWrapper.getElementsByClassName('marker-wrapper')[0]
            slideWrapper = [...sliderWrapper.getElementsByClassName('slide-wrapper')]
            DOMLoaded = true

            sliderWrapper.style.scrollBehavior = 'auto'
            sliderWrapper.scrollLeft = 0
            sliderWrapper.scrollTop = 0

            // collapse wrapper totally
            if (props.slides.length === 0) {
                sliderContainer.style.padding = '0'
                sliderWrapper.style.padding = '0'
            } else {
                sliderContainer.style.padding = sliderOverlayStyle.padding
                sliderWrapper.style.padding = sliderWrapStyles.padding
            }

            setSlideDimensions()
            toggleSlides(true)
            autoPlayHandler(true)
            markerHandler(false)

            // add marker event
            slideWrapper.map((slide, index) => {

                slide.addEventListener('mouseenter', () => {
                    markerIndex = index
                    markerHandler(true)
                })

                slide.addEventListener('mouseleave', () => {
                    markerIndex = index
                    markerHandler(false)
                })
            })

            // add conrtroller handler on event to specified triggers
            if (controller)
                controls.map(controls => {
                    if (controls.trigger.type === 'slider') {

                        if (controls.event === 'autoPlay')
                            markerControls = controls

                        // hover event: mouseenter
                        else if (controls.event === 'hover')
                            controls.trigger.className.map(className => {

                                if (!className.includes('title') && !className.includes('showall'))
                                    sliderContainer.getElementsByClassName(className)[0]
                                        .addEventListener('mouseenter', () => {
                                            controllerHandler(controls)
                                        })
                            })

                        // click event: mousedown
                        else if (controls.event === 'click')
                            controls.trigger.className.map(className => {

                                if (!className.includes('title') && !className.includes('showall'))
                                    sliderContainer.getElementsByClassName(className)[0]
                                        .addEventListener('mousedown', () => {
                                            controllerHandler(controls)
                                        })
                            })
                    }
                })
        }
    }, [props])

    slideStyles = { slide }

    defaultStylesIndex = slide.findIndex(slide => slide.isDefault)
    if (defaultStylesIndex === -1) defaultStylesIndex = 0

    const skipMore = swiper.skipMore || defaultSwiper.skipMore
    const fixBorder = styles.fixBorder || defaultStyles.fixBorder
    const scrollBehavior = swiper.scroll && swiper.scroll.behavior || defaultSwiper.scroll.behavior
    const verticalSwiper = (swiper.direction === 'Y' || defaultSwiper.direction === 'Y') ? true : false

    const sliderOverlayStyle = {
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
        boxShadow: styles.boxShadow || defaultStyles.boxShadow,
    }

    const sliderContainerStyle = {
        borderRadius: styles.borderRadius || defaultStyles.borderRadius,
        width: '100%'
    }

    const sliderWrapStyles = {
        display: styles.display || defaultStyles.display,
        gridColumnGap: styles.paddingBetween || defaultStyles.paddingBetween,
        gridRowGap: styles.paddingBetween || defaultStyles.paddingBetween,
        gridTemplateColumns: `repeat(auto-fit, minmax(${slide[defaultStylesIndex].width}, 1fr))`,
        borderRadius: slide[defaultStylesIndex].borderRadius,
        overflow: styles.overflow || defaultStyles.overflow,
        height: styles.height || defaultStyles.height,
        borderLeft: fixBorder && (slide[defaultStylesIndex].border || defaultSlide.border),
        borderTop: fixBorder && (slide[defaultStylesIndex].border || defaultSlide.border),
        flexDirection: swiper.flexDirection || defaultSwiper.flexDirection,
        justifyContent: swiper.justifyContent || defaultSwiper.justifyContent,
        width: '100%',
    }

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

    var markerStyles = styles.marker ? styles.marker : {}
    defaultStyles.marker &&
        Object.entries(defaultStyles.marker).map(([key, value]) => {
            markerStyles = { ...markerStyles, [key]: markerStyles[key] || value }
        })

    /////////////////////// timer Bar styles //////////////////////

    var timerBarStyle = styles.timerBar || defaultStyles.timerBar
    Object.entries(defaultStyles.timerBar).map(([key, value]) => {
        timerBarStyle = { ...timerBarStyle, [key]: timerBarStyle[key] || value }
    })
    timerBarStyle.afterTransition = timerBarStyle.transition
    timerBarStyle.width = '0%'

    /////////////////////// product styles //////////////////////

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

    ///////////////////// AddToCart Styles ///////////////////////

    var addToCart, addToCartVisible, addToCartWrap, addToCartBtn, plusBtn,
        minusBtn, removeBtn, qtyBtn, addToCartStyles, btnsWrap

    addToCart = product.addToCart
    addToCartVisible = addToCart && addToCart.display !== 'none'

    if (addToCartVisible) {

        addToCartWrap = addToCart ? addToCart : {}
        defaultAddToCart &&
            Object.entries(defaultAddToCart).map(([key, value]) => {
                addToCartWrap = { ...addToCartWrap, [key]: addToCartWrap[key] || value }
            })
        delete addToCartWrap.flexDirection

        addToCartBtn = addToCart.add ? addToCart.add : {}
        defaultAddToCart.add &&
            Object.entries(defaultAddToCart.add).map(([key, value]) => {
                addToCartBtn = { ...addToCartBtn, [key]: addToCartBtn[key] || value }
            })

        btnsWrap = {
            flexDirection: addToCart.flexDirection || defaultAddToCart.flexDirection,
        }

        plusBtn = addToCart.plus ? addToCart.plus : {}
        defaultAddToCart.plus &&
            Object.entries(defaultAddToCart.plus).map(([key, value]) => {
                plusBtn = { ...plusBtn, [key]: plusBtn[key] || value }
            })

        minusBtn = addToCart.minus ? addToCart.minus : {}
        defaultAddToCart.minus &&
            Object.entries(defaultAddToCart.plus).map(([key, value]) => {
                minusBtn = { ...minusBtn, [key]: minusBtn[key] || value }
            })

        removeBtn = addToCart.delete ? addToCart.delete : {}
        defaultAddToCart.delete &&
            Object.entries(defaultAddToCart.delete).map(([key, value]) => {
                removeBtn = { ...removeBtn, [key]: removeBtn[key] || value }
            })

        qtyBtn = addToCart.num ? addToCart.num : {}
        defaultAddToCart.num &&
            Object.entries(defaultAddToCart.num).map(([key, value]) => {
                qtyBtn = { ...qtyBtn, [key]: qtyBtn[key] || value }
            })

        addToCartStyles = {
            addToCartWrap, addToCartBtn, btnsWrap, plusBtn, minusBtn, removeBtn, qtyBtn
        }
    }

    productStyles = {
        productWrap, productName, productBrand, productPrice, productPriceBeforeDiscount,
        productPriceUnit, productReviews, productRating, priceAndAddToCartWrapper,
        productPriceWrap, addToCartStyles
    }

    slideStyles.product = productStyles

    ///////////////////////// Badges Styles //////////////////////////

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

    slideStyles.badges = badgeStyles

    //////////////////////// Swiper Functions /////////////////////////

    var drag = false
    var clientX = 0
    var prevClientX = 0
    var clientY = 0
    var prevClientY = 0
    var scrollLeft = 0
    var scrollTop = 0
    var scrollWidth = 0
    var scrollHeight = 0
    var mouseDown, touchStart, mouseEnter, duration, autoPlay, stopOnHover,
        heightSlideSkipper, gapWidth, skip

    gapWidth = styles.paddingBetween || defaultStyles.paddingBetween
    skip = swiper.skip || defaultSwiper.skip || 1

    // convert gap width to number
    if (gapWidth.includes('rem')) gapWidth = parseFloat(gapWidth) * 10
    else gapWidth = parseFloat(gapWidth)

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
        autoPlayHandler(false)
    }

    const mouseLeaveHandler = e => {
        e.preventDefault()
        mouseEnter = false
        autoPlayHandler(true)
    }

    const mouseDownHandler = (e) => {
        e.preventDefault()
        mouseDown = true
        autoPlayHandler(false)

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

        autoPlayHandler(true)
    }

    const mouseMoveHandler = (e) => {
        if (drag)
            if (verticalSwiper) {

                // scroll is 0 (max top)
                if (e.clientY > clientY && sliderWrapper.scrollTop === 0) {
                    scrollTop = 0
                    clientY = e.clientY
                }
                sliderWrapper.scrollTop = scrollTop - (e.clientY - clientY)

                // scroll is maximum bottom
                if (sliderWrapper.scrollTop === scrollHeight) {
                    scrollTop = sliderWrapper.scrollTop
                    clientY = e.clientY
                }

            } else {

                // scroll is 0 (max left)
                if (e.clientX > clientX && sliderWrapper.scrollLeft === 0) {
                    scrollLeft = 0
                    clientX = e.clientX
                }
                sliderWrapper.scrollLeft = scrollLeft - (e.clientX - clientX)

                // scroll is maximum right
                if (sliderWrapper.scrollLeft === scrollWidth) {
                    scrollLeft = sliderWrapper.scrollLeft
                    clientX = e.clientX
                }
            }
    }

    const touchStartHandler = e => {

        touchStart = true
        mouseDownHandler(e)
        autoPlayHandler(false)
    }

    // touch screen: swipe effects
    const touchMoveHandler = e => {
        if (drag)
            if (verticalSwiper) {

                // scroll is 0 (max top)
                if (e.touches[0].clientY > clientY && sliderWrapper.scrollTop === 0) {
                    scrollTop = 0
                    clientY = e.touches[0].clientY
                }
                sliderWrapper.scrollTop = scrollTop - (e.touches[0].clientY - clientY)

                // scroll is maximum (max bottom)
                if (sliderWrapper.scrollTop === scrollHeight) {
                    scrollTop = sliderWrapper.scrollTop
                    clientY = e.touches[0].clientY
                }

            } else {

                // scroll is 0 (max left)
                if (e.touches[0].clientX > clientX && sliderWrapper.scrollLeft === 0) {
                    scrollLeft = 0
                    clientX = e.touches[0].clientX
                }
                sliderWrapper.scrollLeft = scrollLeft - (e.touches[0].clientX - clientX)

                // scroll is max right
                if (sliderWrapper.scrollLeft === scrollWidth) {
                    scrollLeft = sliderWrapper.scrollLeft
                    clientX = e.touches[0].clientX
                }
            }
    }

    const chevronRight = (marker) => {

        // toggleTimerBar(true)

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
                    const maxScroll = scrollWidth === sliderWrapper.scrollLeft

                    if (!maxScroll) return

                } else return
            }
        }

        sliderWrapper.style.scrollBehavior = 'smooth'
        var visibleWidthofSlide = (sliderWrapper.clientWidth + sliderWrapper.scrollLeft) % (slideWidth + gapWidth)
        scrollLeft = sliderWrapper.scrollLeft + skipMore
        if (sliderWrapper.scrollWidth - (sliderWrapper.clientWidth + sliderWrapper.scrollLeft) <= 2) scrollLeft = 0
        else if (visibleWidthofSlide === slideWidth) scrollLeft += widthSlideSkipper
        else if (slideWidth - visibleWidthofSlide <= 2) scrollLeft += widthSlideSkipper
        else scrollLeft += slideWidth - visibleWidthofSlide + (widthSlideSkipper - (slideWidth + gapWidth))
        sliderWrapper.scrollLeft = scrollLeft
    }

    const chevronLeft = () => {

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

    const chevronBottom = () => {

        sliderWrapper.style.scrollBehavior = 'smooth'
        var visibleHeightofSlide = (sliderWrapper.clientHeight + sliderWrapper.scrollTop) % (slideHeight + gapWidth)
        scrollTop = sliderWrapper.scrollTop + skipMore

        if (sliderWrapper.scrollHeight - (sliderWrapper.clientHeight + sliderWrapper.scrollTop) <= 2)
            scrollTop = 0

        else if (visibleHeightofSlide === slideHeight) scrollTop += heightSlideSkipper
        else scrollTop += slideHeight - visibleHeightofSlide + (heightSlideSkipper - (slideHeight + gapWidth))
        sliderWrapper.scrollTop = scrollTop
    }

    const chevronTop = e => {

        sliderWrapper.style.scrollBehavior = 'smooth'
        var visibleHeightofSlide = sliderWrapper.scrollTop % (slideHeight + gapWidth)
        scrollTop = sliderWrapper.scrollTop - skipMore
        if (sliderWrapper.scrollTop === 0) scrollTop = sliderWrapper.scrollHeight
        else if (visibleHeightofSlide === 0) scrollTop += - heightSlideSkipper
        else if (visibleHeightofSlide === 1) scrollTop += - heightSlideSkipper - 1
        else scrollTop += - visibleHeightofSlide - (heightSlideSkipper - (slideHeight + gapWidth))
        sliderWrapper.scrollTop = scrollTop
    }

    const chevronHandler = (direction) => {
        direction === 'forward' ? chevronRight() : chevronLeft()
        autoPlayHandler(true)
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

    const clearEventStyles = (event, trigger) => {
        // set before effects (remove after effects) according to controllerID
    }

    const autoPlayHandler = (play) => {

        if (play) {
            if (!mouseDown && !touchStart && (stopOnHover ? !mouseEnter : true)) {

                // play chevron
                if (autoPlay && !boxOpenned) {
                    toggleTimerBar(true)

                    clearInterval(chevronInterval.current)
                    chevronInterval.current = setInterval(() => {

                        chevronRight()
                        toggleTimerBar(true)

                    }, duration)

                }

                // play marker
                if (markerStyles.autoPlay) {
                    clearInterval(markerInterval.current)
                    //markerIndex = markerIndex === 0 ? 0 : markerIndex - 1

                    // get marker controls
                    markerControls = controls.find(controls =>
                        controls.trigger.className.includes('marker-wrapper')
                    )

                    markerInterval.current = setInterval(() => {
                        markerHandler(true)
                    }, markerStyles.duration)

                }
            }
        } else {

            // pause chevron
            clearInterval(chevronInterval.current)
            toggleTimerBar(false)

            // pause marker
            //markerIndex = markerIndex === 0 ? 0 : markerIndex - 1
            clearInterval(markerInterval.current)
        }
    }

    ////////////////////// Bullets ///////////////////////

    const toggleBullets = () => {
        // toggle bullets

        var index = verticalSwiper
            ? parseInt((sliderWrapper.scrollTop + sliderWrapper.clientHeight + gapWidth) / (slideHeight + gapWidth) + 0.01) - 1
            : parseInt((sliderWrapper.scrollLeft + sliderWrapper.clientWidth + gapWidth) / (slideWidth + gapWidth) + 0.01) - 1

        if (index < 0 || isNaN(index) || !index) index = 0

        if (slideIndex !== index) {
            slideIndex = index

            if (bullets.display !== 'none') {
                const bulletElement = sliderContainer.getElementsByClassName('bullet')
                if (bulletElement[slideIndex] && bulletElement[slideIndex].style.color !== '#00bdd9') {
                    var i = props.slides.length - 1
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
                        {props && props.slides.map((slide, index) =>
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

        if (timerBarStyle.display !== 'none')
            if (state) {

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

    const sliderMouseEnter = (e) => {
        e.preventDefault()

        if (stateAction.current)
            dispatch({
                type: 'UPDATE_ACTIONS', payload: {
                    [action]: { ...stateAction.current, pause: true }
                }
            })
    }

    const sliderMouseLeave = (e) => {
        e.preventDefault()

        if (stateAction.current)
            dispatch({
                type: 'UPDATE_ACTIONS', payload: {
                    [action]: { ...stateAction.current, pause: false }
                }
            })
    }

    ///////////////////////////// Marker /////////////////////////////////

    const markerHandler = (hovering) => {

        if (markerIndex === props.slides.length) markerIndex = 0

        if (markerElement)
            if (markerStyles.display && markerStyles.display !== 'none') {

                var target = slideWrapper[markerIndex]

                var slideWidth = target.offsetWidth
                var slideHeight = target.offsetHeight

                var offsetLeft = target.offsetLeft
                var offsetTop = target.offsetTop

                if (markerStyles.type === 'line') {

                    if (hovering) {
                        markerElement.style.width = slideWidth + 'px'
                        markerElement.style.left = offsetLeft + 'px'

                    } else {
                        var left = offsetLeft + slideWidth * 0.5
                        var top = offsetTop + slideHeight * 0.5

                        markerElement.style.width = '0'
                        markerElement.style.left = left + 'px'
                    }

                } else if (markerStyles.type === 'box') {

                    markerElement.style.height = slideHeight + 'px'
                    markerElement.style.width = slideWidth + 'px'
                    markerElement.style.top = offsetTop + 'px'
                }

                // controller handler
                if (hovering && markerControls)
                    controllerHandler(markerControls, markerIndex)

                markerIndex++
            }
    }

    const controllerHandler = (controls, index) => {
        var title, slides = [], searches = { collections: [], keyword: [] }

        if (controls.push.includes('title'))
            title = slider.title

        if (controls.push.includes('slides'))
            slides = props.slides

        if (controls.push.includes('slide'))
            slides = [props.slides[index]]

        if (controls.search.push) {

            const key = controls.search.push.key
            const className = controls.search.push.className

            // push to search
            className.map(className => {

                // if element exist
                if (sliderWrapper.getElementsByClassName(className)[0]) {
                    const value = sliderWrapper.getElementsByClassName(className)[index || 0].innerHTML
                    searches[key].push(value)
                }
            })
        }

        // written this way to stop controls reassigning
        dispatch(search({
            mounted: [_id],
            ...controls,
            title,
            slides,
            search: {
                ...controls.search,
                collections: [...controls.search.collections, ...searches.collections],
                keyword: [...controls.search.keyword, ...searches.keyword]
            },
        }))
    }

    const stylesIndex = (index) => {
        var i = slide.findIndex(slide => slide.index === index)
        if (i === -1) i = defaultStylesIndex
        return i
    }

    const setSlideDimensions = () => {

        slideWrapper = [...sliderContainer.getElementsByClassName('slide-wrapper')]
        // get max slide height and width
        slideWrapper.map(e => {
            if (e.offsetHeight > maxHeight)
                maxHeight = e.offsetHeight
        })

        // set slide height = max slide height
        for (var i = 0, len = slideWrapper.length; i < len; i++)
            slideWrapper[i].style.height = maxHeight + 'px'

        slideHeight = maxHeight
        slideWidth = slideWrapper[0] && slideWrapper[0].offsetWidth

        widthSlideSkipper = slideWidth
            ? (slideWidth + gapWidth) * skip
            : slideWidth * skip

        // set slider window height = slide height 
        if (sliderWrapStyles.height === 'slideHeight')
            sliderWrapper.style.height = slideHeight + (fixBorder ? 1 : 0) + 'px'

        // skipper width and height
        widthSlideSkipper = (slideWidth + gapWidth) * skip
        heightSlideSkipper = (slideHeight + gapWidth) * skip

        // get slider height
        const swiperWidth = sliderWrapper.offsetWidth
        const slidesPerRow = parseInt((swiperWidth + gapWidth) / (slideWidth + gapWidth) + 0.1)
        const rowsPerSwiper = props.slides.length / slidesPerRow

        if (rowsPerSwiper % 1 === 0)
            swiperHeight = ((slideHeight + gapWidth) * rowsPerSwiper - gapWidth) + 'px'
        else if (rowsPerSwiper % 1 > 0)
            swiperHeight = ((slideHeight + gapWidth) * (parseInt(rowsPerSwiper + 1)) - gapWidth) + 'px'

    }

    return (
        <div className={'slider-overlay slider-' + _id} style={sliderOverlayStyle}>

            {/* Slider Title */}
            {TitleStyles && TitleStyles.display !== 'none' &&
                <Title
                    type={'slider'}
                    box={slider}
                    styles={TitleStyles}
                    defaultStyles={defaultStyles.title}
                    slides={props ? props.slides : []} />}

            {/* Timer Bar */}
            {timerBarStyle.display !== 'none' &&
                <div className='timer-bar' style={timerBarStyle} />}

            <div className='slider-container' style={sliderContainerStyle}
                onMouseEnter={sliderMouseEnter} onMouseLeave={sliderMouseLeave}>

                {/* Chevrons */}
                <div className='left-chevron-wrap'
                    onClick={e => chevronHandler('backward')}
                    style={{ ...chevrons, ...leftChevronWrapper }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = chevrons.hoverBackgroundColor }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = chevrons.initialBackgroundColor }}>
                    <FontAwesomeIcon icon={faChevronLeft} style={swiperChevronsStyle} />
                </div>

                <div className='right-chevron-wrap'
                    onClick={e => chevronHandler('forward')}
                    style={{ ...chevrons, ...rightChevronWrapper }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = chevrons.hoverBackgroundColor }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = chevrons.initialBackgroundColor }}>
                    <FontAwesomeIcon icon={faChevronRight} style={swiperChevronsStyle} />
                </div>

                {/* Swiper */}
                <div className="slider-wrapper" style={sliderWrapStyles}
                    onMouseDown={e => { DOMLoaded && mouseDownHandler(e) }}
                    onMouseEnter={e => { DOMLoaded && mouseEnterHandler(e) }}
                    onMouseLeave={e => { DOMLoaded && mouseLeaveHandler(e) }}
                    onTouchStart={e => { DOMLoaded && touchScreen && touchStartHandler(e) }}
                    onTouchEnd={e => { DOMLoaded && touchScreen && mouseLeaveHandler(e) }}
                    onScroll={e => DOMLoaded && toggleSlides()}>

                    {/* Marker */}
                    {markerStyles.display !== 'none'
                        && <div className='marker-wrapper' style={markerStyles} />}

                    {props ? props.slides.map((slide, index) =>
                        // real slides
                        <Slide key={index}
                            styles={slideStyles}
                            slider={slider}
                            slide={slide}
                            stylesIndex={stylesIndex(index)}
                            defaultStyles={defaultStyles} />)

                        : skeletonSlides.map((slide, index) =>
                            <Skeleton key={index}
                                styles={slideStyles}
                                stylesIndex={stylesIndex(index)}
                                defaultStyles={defaultStyles} />)
                    }
                </div>

                {/* Bullets */}
                {bullets.display !== 'none' && <Bullets />}
            </div>
        </div >
    )

})