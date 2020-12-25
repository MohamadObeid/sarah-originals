import React from 'react';
import { SlideBox } from './SlideBox';
import { TitleContainer } from './TitleContainer'

export const ImageBox = React.memo(({ imageBox, mobileScreen }) => {
    const touchScreen = () => {
        try {
            document.createEvent("TouchEvent");
            return true
        } catch (e) {
            return false
        }
    }

    const mobile = imageBox.mobile
    const flexDirection = imageBox.flexDirection
    const overlayPadding = !mobileScreen ? imageBox.overlayPadding : imageBox.mobile.overlayPadding
    const paddingAround = !mobileScreen ? imageBox.paddingAround : imageBox.mobile.paddingAround
    const backgroundColor = imageBox.backgroundColor

    const imageBoxStyle = !mobileScreen
        ? {
            padding: paddingAround,
            backgroundColor
        } : {
            padding: mobile.paddingAround,
            backgroundColor
        }

    const slideBoxWrapperStyle = !mobileScreen
        ? {
            flexDirection,
            gridColumnGap: imageBox.paddingBetween,
            gridRowGap: imageBox.paddingBetween,
        } : {
            gridColumnGap: mobile.paddingBetween,
            gridRowGap: mobile.paddingBetween,
            flexDirection: mobile.flexDirection,
        }

    return (
        <div style={{ padding: overlayPadding, width: '100vw' }}>
            <div className="hero-banners" style={imageBoxStyle}>
                <TitleContainer imageBox={imageBox} />
                <div className='slideBox-wrapper' style={slideBoxWrapperStyle}>
                    {imageBox.slideBox.map(box =>
                        <SlideBox slideBox={box} mobileScreen={mobileScreen} touchScreen={touchScreen()} />
                    )}
                </div>
            </div>
        </div>
    )
})