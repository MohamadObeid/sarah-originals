import React from 'react'
import Slider from './Slider';
import { TitleContainer } from './TitleContainer'

export const MagicBox = React.memo(({ styles, defaultStyles, touchScreen, magicBox }) => {

    const _id = magicBox._id
    const Title = magicBox.title
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

    const sliderWrapper = {
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
                <div className='slider-wrapper' style={sliderWrapper}>
                    {magicBox.slider.map((slider, index) =>
                        <Slider
                            key={index}
                            styles={styles.slider[index]}
                            defaultStyles={defaultStyles.slider[0]}
                            slider={slider}
                            touchScreen={touchScreen} />
                    )}
                </div>
            </div>
        </div>
    )
})