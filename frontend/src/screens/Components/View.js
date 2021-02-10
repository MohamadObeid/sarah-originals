import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSlides } from '../../actions/slidesActions';
import { getStyles } from '../../actions/stylesActions';
import { MagicBox } from './MagicBox';
//import { LiteBox } from './LiteBox';

export const View = ({ view, viewPort, touchScreen }) => {
    const dispatch = useDispatch()
    const stylesProps = view.styles[viewPort]

    var slides = []
    var requested
    var stylesExist

    const styles = useSelector(state => {
        if (!stylesExist) {
            slides = state.slides
            const styles = state.styles.find(styles =>
                (stylesProps._id && styles._id === stylesProps._id)
                || styles.name === stylesProps.name
            )
            if (styles) return styles
        }
    })

    stylesExist = styles
    if (stylesExist) requested = true

    useEffect(() => {
        if (!styles && !requested) {
            requested = true
            const _id = stylesProps._id
            const name = stylesProps.name
            const type = stylesProps.type

            dispatch(getStyles({ _id, name, type }))

            view.slider && view.slider.map(slider => {
                var slidesExist = slides.find(slides => slides._id === slider._id)
                if (!slidesExist)
                    dispatch(getSlides(slider, slider.action, true)) // true means first update
            })
        }
    }, [styles])

    return styles ? <MagicBox
        styles={styles}
        touchScreen={touchScreen}
        magicBox={view} />
        : <></>
}