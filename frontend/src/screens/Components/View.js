import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSlides } from '../../actions/slidesActions';
import { getStyles } from '../../actions/stylesActions';
import { MagicBox } from './MagicBox';

export const View = ({ view, viewPort, touchScreen }) => {
    const dispatch = useDispatch()
    const stylesProps = view.styles[viewPort]
    const type = stylesProps.type

    var slides = []

    // AddToCart default styles
    const defaultAddToCartStyles = useSelector(state => state.styles.find(styles =>
        styles.name === 'Default Desktop AddToCart Styles'
    ))

    // Slider default styles
    const defaultStyles = useSelector(state => state.styles.find(styles =>
        styles.name === 'Default Desktop MagicBox Styles'))

    // Box styles
    const styles = useSelector(state => state.styles.find(styles =>
        styles._id === stylesProps._id || styles.name === stylesProps.name
    ))

    // get all slideLists => if (magicBoc) get slides from server
    useSelector(state => { if (!styles) slides = state.slides })


    useEffect(() => {
        if (!styles) {
            const _id = stylesProps._id
            const name = stylesProps.name
            const type = stylesProps.type

            dispatch(getStyles({ _id, name, type }))

            if (type === 'MagicBox') {
                // get non existing slides
                view.slider && view.slider.map(slider => {
                    var slidesExist = slides.find(slidesList => slidesList._id === slider._id)
                    if (!slidesExist)
                        dispatch(getSlides(slider))
                })
            }
        }
    }, [styles])

    if (styles && defaultStyles) {
        if (type === 'MagicBox') {

            // Send AddToCart styles within styles
            if (defaultAddToCartStyles) {
                defaultStyles.slider[0].product.addToCart = defaultAddToCartStyles

                return <MagicBox
                    styles={styles}
                    defaultStyles={defaultStyles}
                    touchScreen={touchScreen}
                    magicBox={view} />
            } else return <></>

        } else if (type === 'LiteBox') {
            /*<LiteBox styles={styles} defaultStyles={defaultStyles} touchScreen={touchScreen} liteBox={view} />*/
        } else return <></>

    } else return <></>
}