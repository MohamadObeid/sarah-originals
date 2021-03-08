import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
// components
import { Title } from './Title'
import { Badges } from './Badges'
import { Product } from './Product'
// methods
import { showTimer } from '../../methods/methods'
import { url } from '../../constants/defaultImages'
import { search } from '../../actions/searchActions'

export const Slide = ({ slider, slide, stylesIndex, defaultStyles, styles }) => {

    ////////////////////////// Consts & Vars ///////////////////////////

    var slideWrapper, mounted

    const timer = showTimer(slide.onSale)
    const controller = slider.controller
    const controls = slider.controls

    const badgeStyles = styles.badges
    const productStyles = styles.product
    const slideStyles = styles.slide
    const defaultSlideStyles = defaultStyles.slide[0]

    ////////////////////////// Hooks ///////////////////////////

    const [_id] = useState(Math.floor(Math.random() * 10000000000000))
    const dispatch = useDispatch()

    useEffect(() => {
        slideWrapper = document.getElementsByClassName(_id)[0]

        // add conrtroller handler on event to specified triggers
        if (controller) {
            // special slide controls
            const slideControls = controls.find(controls =>
                controls.slide.includes(slide.nameEn || slide.name)
            )

            if (slideControls) {
                if (slideControls.trigger.type === 'slide') {

                    // hover event: mouseenter
                    if (slideControls.event === 'hover')
                        slideControls.trigger.className.map(className => {

                            if (!className.includes('title') && !className.includes('showall'))
                                slideWrapper.getElementsByClassName(className)[0]
                                    .addEventListener('mouseenter', () => {
                                        controllerHandler(slideControls)
                                    })
                        })

                    // click event: mousedown
                    else if (slideControls.event === 'click')
                        slideControls.trigger.className.map(className => {

                            if (!className.includes('title') && !className.includes('showall'))
                                slideWrapper.getElementsByClassName(className)[0]
                                    .addEventListener('mousedown', () => {
                                        controllerHandler(slideControls)
                                    })
                        })
                }

            } else {
                // default controls
                controls.map(controls => {

                    // set event coming from all controls other than slide controls
                    if (!controls.slide || controls.slide.length === 0)
                        if (controls.trigger.type === 'slide') {

                            // hover event: mouseenter
                            if (controls.event === 'hover')
                                controls.trigger.className.map(className => {

                                    if (!className.includes('title') && !className.includes('showall'))
                                        slideWrapper.getElementsByClassName(className)[0]
                                            .addEventListener('mouseenter', () => {
                                                controllerHandler(controls)
                                            })
                                })

                            // click event: mousedown
                            else if (controls.event === 'click')
                                controls.trigger.className.map(className => {

                                    if (!className.includes('title') && !className.includes('showall'))
                                        slideWrapper.getElementsByClassName(className)[0]
                                            .addEventListener('mousedown', () => {
                                                controllerHandler(controls)
                                            })
                                })
                        }
                })
            }
        }

    }, [])

    /////////////////////////// Styles //////////////////////////////

    const slideContainer = (index) =>
    ({
        height: slideStyles[index].height || defaultSlideStyles.height,
        minWidth: slideStyles[index].width || defaultSlideStyles.width,
        width: slideStyles[index].forceWidth && (slideStyles[index].width || defaultSlideStyles.width),
        borderRadius: slideStyles[index].borderRadius || defaultSlideStyles.borderRadius,
        margin: slideStyles[index].margin || defaultSlideStyles.margin,
    })

    const slideWrapperStyle = (index) =>
    ({
        height: '100%',
        width: '100%',
        borderRadius: slideStyles[index].borderRadius || defaultSlideStyles.borderRadius,
        border: slideStyles[index].border || defaultSlideStyles.border,
        backgroundColor: slideStyles[index].backgroundColor || defaultSlideStyles.backgroundColor,
        transition: slideStyles[index].transition || defaultSlideStyles.transition,
        transform: slideStyles[index].transform || defaultSlideStyles.transform,
        justifyContent: slideStyles[index].justifyContent || defaultSlideStyles.justifyContent,
        flexDirection: slideStyles[index].flexDirection || defaultSlideStyles.flexDirection,
        padding: slideStyles[index].padding || defaultSlideStyles.padding,
        borderLeft: styles.fixBorder ? '1px solid #00000000' : (slideStyles[index].border || defaultSlideStyles.border),
        borderTop: styles.fixBorder ? '1px solid #00000000' : (slideStyles[index].border || defaultSlideStyles.border),
        boxShadow: slideStyles[index].boxShadow || defaultSlideStyles.boxShadow || 'unset',
    })

    const imageWrapStyle = (index) =>
    ({
        minHeight: slideStyles[index].image.height || defaultSlideStyles.image.height,
        borderRadius: slideStyles[index].image.borderRadius || defaultSlideStyles.image.borderRadius,
        display: slideStyles[index].image.display || defaultSlideStyles.image.display,
        padding: slideStyles[index].image.padding || defaultSlideStyles.image.padding,

        width: (slideStyles[index].image.forceWidth || defaultSlideStyles.image.forceWidth)
            && (slideStyles[index].image.width || defaultSlideStyles.image.width),

        maxWidth: (!slideStyles[index].image.forceWidth || !defaultSlideStyles.image.forceWidth)
            && (slideStyles[index].image.width || defaultSlideStyles.image.width),

        minWidth: (!slideStyles[index].image.forceWidth || !defaultSlideStyles.image.forceWidth)
            && (slideStyles[index].image.width || defaultSlideStyles.image.width)
    })

    const imageStyle = (index) =>
    ({
        borderRadius: slideStyles[index].image.borderRadius || defaultSlideStyles.image.borderRadius,
        transform: (!slideStyles[index].image.animation || !defaultSlideStyles.image.animation) && 'unset',

        width: (slideStyles[index].image.forceWidth || defaultSlideStyles.image.forceWidth)
            && (slideStyles[index].image.width || defaultSlideStyles.image.width),

        height: (slideStyles[index].image.forceHeight || defaultSlideStyles.image.forceHeight)
            && (slideStyles[index].image.height || defaultSlideStyles.image.height),

        maxWidth: slideStyles[index].image.width || defaultSlideStyles.image.width,
        maxHeight: slideStyles[index].image.height || defaultSlideStyles.image.height,
    })

    const slideTitleStyles = (index) => {
        const titleStyles = slideStyles[index].title || defaultSlideStyles.title
        if (!titleStyles.display) titleStyles.display = 'none'
        return titleStyles
    }

    //////////////////////////// Functions //////////////////////////////

    const controllerHandler = (controls) => {

        mounted = _id

        var title, slides = [], searches = { collections: [], keyword: [] }

        if (controls.push.includes('title'))
            title = slider.title

        if (controls.push.includes('slide'))
            slides = [slide]

        if (controls.search.push) {

            const key = controls.search.push.key
            const className = controls.search.push.className

            // push to search
            className.map(className => {

                // if element exist
                if (slideWrapper.getElementsByClassName(className)) {
                    const value = slideWrapper.getElementsByClassName(className)[0].innerHTML
                    searches[key].push(value)
                }
            })
        }

        // written this way to stop controls reassigning
        dispatch(search({
            mount: _id,
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

    const linkSlide = (e, src) => {
        //handleQuickView({})
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

    const productVisible = (index) =>
        slideStyles[index].productVisible === undefined
            ? defaultSlideStyles.productVisible
            : slideStyles[index].productVisible

    return (
        <div className={'slide-container ' + _id} style={slideContainer(stylesIndex)}>
            <div className='slide-wrapper' style={slideWrapperStyle(stylesIndex)}>

                {/* Badges */}
                {badgeStyles.display && badgeStyles.display !== 'none' &&
                    <Badges slide={slide} timer={timer} styles={badgeStyles} />}

                {/* Image */}
                {imageWrapStyle(stylesIndex).display !== 'none' &&
                    (slide.src || slide.image) &&
                    <div className='image-wrap' style={imageWrapStyle(stylesIndex)}>
                        {/*<div className='image-skeleton' style={skeleton}>Sarah Originals</div>*/}
                        <img src={/*imageUrl + slide.src*/url(slide.src || slide.image)}
                            className="slide-img"
                            style={imageStyle(stylesIndex)}
                            onClick={e => linkSlide(e, slide.link)}
                        //onLoad={e => { e.currentTarget.previousSibling.classList.add('hide') }}
                        />
                    </div>}

                {/* Slide Title */}
                {slideTitleStyles(stylesIndex).display !== 'none' &&
                    <Title
                        type={'slide'}
                        box={{ ...slider, title: { title: slide.name || slide.nameEn, icon: {} } }}
                        styles={slideTitleStyles(stylesIndex)}
                        defaultStyles={defaultStyles.title}
                        slides={[slide]} />}

                {/* Product */}
                {productVisible(stylesIndex) &&
                    <Product product={slide} timer={timer} styles={productStyles} />}

            </div>
        </div>
    )

}