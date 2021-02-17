import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSlides } from '../../actions/slidesActions';
import { MagicBox } from './MagicBox';

export const View = ({ view, viewPort, touchScreen }) => {

    const [viewVisible, setViewVisible] = useState()
    var stylesExist, viewExist, defaultAddToCartStyles, defaultStyles, defaultTitleStyles

    useSelector(state => {

        if (!stylesExist)
            stylesExist = state.styles.find(styles =>
                styles.name === view.styles)

        if (!viewExist)
            viewExist = state.views.find(vue =>
                vue.name === view.name)

        // AddToCart default styles
        if (!defaultAddToCartStyles)
            defaultAddToCartStyles = state.styles.find(styles =>
                styles.name === 'Default Desktop AddToCart Styles')

        // magicBox default styles
        if (!defaultStyles)
            defaultStyles = state.styles.find(styles =>
                styles.name === 'Default Desktop MagicBox Styles')

        // title default styles
        if (!defaultTitleStyles)
            defaultTitleStyles = state.styles.find(styles =>
                styles.name === 'Default Desktop Title Styles')

        if (stylesExist && viewExist && defaultStyles && defaultAddToCartStyles && defaultTitleStyles) {
            !viewVisible && setViewVisible(true)
        }
    })

    // pass default styles
    if (defaultAddToCartStyles && defaultStyles && defaultTitleStyles) {
        // pass addtoCart Styles
        defaultStyles.slider[0].product.addToCart = defaultAddToCartStyles

        // pass title Styles
        defaultStyles.title = defaultTitleStyles
        defaultStyles.slider[0].title = defaultTitleStyles
    }

    return viewVisible ? <MagicBox
        styles={stylesExist}
        magicBox={viewExist}
        defaultStyles={defaultStyles}
        touchScreen={touchScreen}
        viewPort={viewPort} />
        : <></>
}