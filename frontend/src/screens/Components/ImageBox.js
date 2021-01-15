import React from 'react';
import { useSelector } from 'react-redux';
import SlideBox from './SlideBox';
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
    const flexDirection = !mobileScreen ? imageBox.flexDirection : mobile.flexDirection
    const overlayPadding = !mobileScreen ? imageBox.overlayPadding : mobile.overlayPadding
    const paddingAround = !mobileScreen ? imageBox.paddingAround : mobile.paddingAround
    const paddingBetween = !mobileScreen ? imageBox.paddingBetween : mobile.paddingBetween
    const borderRadius = !mobileScreen ? imageBox.borderRadius : mobile.borderRadius
    const background = !mobileScreen ? imageBox.background : mobile.background

    const imageBoxStyle = {
        borderRadius,
        backgroundColor: background.color,
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
                {background.image && <img src={background.src} className='box-background-image' />}
                {imageBox.title.display !== 'none' && <TitleContainer imageBox={imageBox} mobileScreen={mobileScreen} />}
                <div className='slideBox-wrapper' style={slideBoxWrapperStyle}>
                    {imageBox.slideBox.map(box =>
                        <SlideBox slideBox={box}
                            mobileScreen={mobileScreen}
                            touchScreen={touchScreen()}
                            slideList={useSelector(state => state.slideLists.length > 0 &&
                                (state.slideLists.find(list => list.collection === box.collection_) || {}).slideList) || false} />
                    )}
                </div>
            </div>
        </div>
    )
})