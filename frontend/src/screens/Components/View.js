import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSlides } from '../../actions/slidesActions';
import { getStyles } from '../../actions/stylesActions';
import SlideBox from './SlideBox';
import { TitleContainer } from './TitleContainer'

export const View = ({ view, viewPort, touchscreen }) => {
    const dispatch = useDispatch()
    const [params, setParams] = useState()
    const data = view.styles[viewPort]

    var getStylesRequested, stylesExist, slidesExist, getSlidesRequested
    const { defaultStyles } = useSelector(state => state.defaultStyles)
    const { defaultStyles: defaultAddToCartStyles } = useSelector(state =>
        state.defaultAddToCartStyles)

    useSelector(state => {
        if (!params) {

            //// find styles
            if (!stylesExist)
                stylesExist = state.styles.find(obj => obj._id === data._id || obj.name === data.name)

            //// fetch styles
            if (!stylesExist && !getStylesRequested) {
                dispatch(getStyles({ _id: data._id, name: data.name }))
                getStylesRequested = true
            }

            //// find slides
            if (!slidesExist)
                slidesExist = state.slides.find(obj => obj._id === view._id)

            //// fetch slides
            if (!slidesExist && !getSlidesRequested) {
                dispatch(getSlides(view))
                getSlidesRequested = true
            }

            if (slidesExist && stylesExist) {
                setParams({
                    slides: slidesExist.slides,
                    styles: stylesExist,
                    defaultStyles: state.defaultStyles
                })
            }
        }
    })

    if (params && defaultStyles && defaultAddToCartStyles) {
        console.log(view.name, params)
        const slideBoxDefaultStyles = defaultStyles.slideBox[0]
        slideBoxDefaultStyles.product.addToCart = defaultAddToCartStyles

        const _id = view._id
        const styles = params.styles
        const slides = params.slides
        const Title = view.title
        const TitleStyles = styles.title

        const background = typeof styles.background === 'object'
            ? {
                src: styles.background.src || defaultStyles.background.src,
                isImage: styles.background.isImage || defaultStyles.background.isImage,
            } : {
                src: defaultStyles.background.src,
                isImage: defaultStyles.background.isImage,
            }

        const viewWrapper = {
            borderRadius: styles.borderRadius || defaultStyles.borderRadius,
            backgroundColor: styles.background.color || defaultStyles.background.color,
            flexDirection: styles.flexDirection || defaultStyles.flexDirection,
        }

        const slideBoxWrapper = {
            borderRadius: styles.borderRadius || defaultStyles.borderRadius,
            gridColumnGap: styles.paddingBetween || defaultStyles.paddingBetween,
            flexDirection: styles.flexDirection || defaultStyles.flexDirection,
            gridRowGap: styles.paddingBetween || defaultStyles.paddingBetween,
            padding: styles.paddingAround || defaultStyles.paddingAround,
        }

        const viewContainer = {
            padding: styles.overlayPadding || defaultStyles.overlayPadding,
            maxWidth: '100vw'
        }

        return (
            <div style={viewContainer}>
                <div className="view-wrapper" style={viewWrapper}>

                    {/* Background */}
                    {background.isImage && <img src={background.src}
                        className='box-background-image' />}

                    {/* Title */}
                    {TitleStyles && TitleStyles.display !== 'none' &&
                        <TitleContainer _id={_id} styles={TitleStyles} Title={Title} />}

                    {/* Slide Box */}
                    <div className='slideBox-wrapper' style={slideBoxWrapper}>
                        {view.slideBox.map((box, index) =>
                            <SlideBox
                                styles={styles.slideBox[index]}
                                slides={slides[index]}
                                defaultStyles={defaultStyles.slideBox[0]}
                                slideBox={box}
                                touchscreen={touchscreen} />
                        )}
                    </div>
                </div>
            </div>
        )
    } else return <></>
}