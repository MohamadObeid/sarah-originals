import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSlides } from '../../actions/slidesActions';
import { getStyles } from '../../actions/stylesActions';
import { MagicBox } from './MagicBox';
//import { LiteBox } from './LiteBox';

export const View = ({ view, viewPort, touchScreen }) => {
    const dispatch = useDispatch()
    const stylesProps = view.styles[viewPort]
    const type = stylesProps.type

    var slides = []

    // Box styles
    const styles = useSelector(state => state.styles.find(styles =>
        styles._id === stylesProps._id || styles.name === stylesProps.name
    ))

    useSelector(state => { if (!styles) slides = state.slides })

    var requested
    useEffect(() => {
        if (!styles && !requested) {
            requested = true
            const _id = stylesProps._id
            const name = stylesProps.name
            const type = stylesProps.type

            dispatch(getStyles({ _id, name, type }))
            view.slider && view.slider.map(slider => {
                var slidesExist = slides.find(slidesList => slidesList._id === slider._id)
                if (!slidesExist)
                    dispatch(getSlides(slider))
            })
        }
    }, [styles])

    if (styles) {
        if (type === 'MagicBox') {

            return <MagicBox
                styles={styles}
                touchScreen={touchScreen}
                magicBox={view} />

        }/* else if (type === 'LiteBox') {

            return <LiteBox
                styles={styles}
                touchScreen={touchScreen}
                liteBox={view} />

        }*/ else return <></>

    } else return <></>
}