import React from 'react';
import { SlideBox } from './SlideBox';
import { TitleContainer } from './TitleContainer'

export const ImageBox = React.memo(({ imageBox, mobileScreen, products }) => {
    const touchScreen = () => {
        try {
            document.createEvent("TouchEvent");
            return true
        } catch (e) {
            return false
        }
    }

    const mobile = imageBox.mobile
    const flexDirection = !mobileScreen ? imageBox.flexDirection : mobile.flexDirection
    const overlayPadding = !mobileScreen ? imageBox.overlayPadding : mobile.overlayPadding
    const paddingAround = !mobileScreen ? imageBox.paddingAround : mobile.paddingAround
    const paddingBetween = !mobileScreen ? imageBox.paddingBetween : mobile.paddingBetween
    const borderRadius = !mobileScreen ? imageBox.borderRadius : mobile.borderRadius
    const backgroundColor = imageBox.backgroundColor

    const imageBoxStyle = {
        borderRadius,
        backgroundColor,
        flexDirection,
    }

    const slideBoxWrapperStyle = {
        borderRadius,
        gridColumnGap: paddingBetween,
        flexDirection,
        gridRowGap: paddingBetween,
        padding: paddingAround,
    }

    return (
        <div style={{ padding: overlayPadding, width: '100vw' }}>
            <div className="hero-banners" style={imageBoxStyle}>
                <TitleContainer imageBox={imageBox} mobileScreen={mobileScreen} />
                <div className='slideBox-wrapper' style={slideBoxWrapperStyle}>
                    {imageBox.slideBox.map(box =>
                        <SlideBox slideBox={box} mobileScreen={mobileScreen} touchScreen={touchScreen()} products={products || false} />
                    )}
                </div>
            </div>
        </div>
    )
})