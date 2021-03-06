import React from 'react'

export const Skeleton = ({ stylesIndex, styles, defaultStyles }) => {

    const slideStyles = styles.slide
    const defaultSlideStyles = defaultStyles.slide[0]

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

    return (
        <div className={'slide-container'} style={slideContainer(stylesIndex)}>
            <div className='slide-wrapper' style={slideWrapperStyle(stylesIndex)}>

                {/* Image */}
                <div className='image-wrap' style={imageWrapStyle(stylesIndex)} />

            </div>
        </div>)
}