import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View } from "./View";
import { getViews } from "../../actions/viewActions";
import { getStyles } from "../../actions/stylesActions";

const Screen = ({ screen, viewPort, touchScreen }) => {

    //////////////////////// Vars and Cons //////////////////////////

    const _id = screen._id
    const viewList = screen.viewList
    var mouseDown, sliderWrapper, clientX, clientY, scrollLeft, scrollTop, scrollWidth,
        scrollBarVisible, screenWrapper, scrollHeight, drag, order = 0

    //////////////////////// Hooks //////////////////////////

    const dispatch = useDispatch()
    useEffect(() => {

        // list views & styles
        viewList.map(view => {
            dispatch(getViews({ name: view.name }))
            dispatch(getStyles({ name: view.styles, type: 'MagicBox' }))
        })

        // 
        screenWrapper = document.getElementsByClassName(_id)[0]
        screenWrapper.style.maxWidth = viewPort === 'desktop' ? 'calc(100vw - 12px)' : '100vw'
        scrollBarVisible = viewPort === 'desktop' && true

    }, [])

    // set screen width according to scrollBar visibility

    useSelector(state => {
        if (screenWrapper) {

            // scroll bar visible
            if (document.body.clientHeight < document.body.scrollHeight) {
                if (!scrollBarVisible) {
                    screenWrapper.style.maxWidth = viewPort === 'desktop'
                        ? 'calc(100vw - 12px)' : '100vw'
                    scrollBarVisible = true
                }

            } else {

                // scroll bar hidden
                if (scrollBarVisible) {
                    screenWrapper.style.maxWidth = '100vw'
                    scrollBarVisible = false
                }
            }
        }
    })

    //////////////////////// Functions //////////////////////////

    // clear all intervals
    var interval_id = window.setInterval(() => { }, 99999);
    for (var i = 0; i < interval_id; i++)
        window.clearInterval(i);

    const mouseDownHandler = (e) => {
        e.preventDefault()
        sliderWrapper = e.currentTarget

        sliderWrapper.style.scrollBehavior = 'auto'
        drag = true
        mouseDown = true

        clientX = e.clientX || e.touches[0].clientX
        clientY = e.clientY || e.touches[0].clientY

        scrollLeft = e.currentTarget.scrollLeft
        scrollTop = e.currentTarget.scrollTop
        scrollWidth = e.currentTarget.scrollWidth - e.currentTarget.clientWidth
        scrollHeight = e.currentTarget.scrollHeight - e.currentTarget.clientHeight

        if (touchScreen) {
            window.addEventListener('touchend', mouseUpHandler)
            window.addEventListener('touchmove', touchMoveHandler)
        } else {
            window.addEventListener('mousemove', mouseMoveHandler)
            window.addEventListener('mouseup', mouseUpHandler)
        }
    }

    const mouseUpHandler = (e) => {
        drag = false
        mouseDown = false

        sliderWrapper.style.scrollBehavior = 'smooth'

        window.removeEventListener('mousemove', mouseMoveHandler)
        window.removeEventListener('mouseup', mouseUpHandler)

        if (touchScreen) {
            window.removeEventListener('touchend', mouseUpHandler)
            window.removeEventListener('touchmove', touchMoveHandler)
        }
    }

    const mouseMoveHandler = (e) => {
        if (drag) {

            if (e.clientX > clientX && sliderWrapper.scrollLeft === 0) {// case scroll is 0
                scrollLeft = 0
                clientX = e.clientX
            }
            sliderWrapper.scrollLeft = scrollLeft - (e.clientX - clientX)
            if (sliderWrapper.scrollLeft === scrollWidth) {// case scroll is maximum
                scrollLeft = sliderWrapper.scrollLeft
                clientX = e.clientX
            }
        }
    }

    const touchStartHandler = e => {
        e.preventDefault()
        mouseDownHandler(e)
    }

    const touchMoveHandler = e => {
        if (drag) {

            if (e.touches[0].clientX > clientX && sliderWrapper.scrollLeft === 0) {// case scroll is 0
                scrollLeft = 0
                clientX = e.touches[0].clientX
            }
            sliderWrapper.scrollLeft = scrollLeft - (e.touches[0].clientX - clientX)
            if (sliderWrapper.scrollLeft === scrollWidth) {// case scroll is maximum
                scrollLeft = sliderWrapper.scrollLeft
                clientX = e.touches[0].clientX
            }
        }
    }

    //////////////////////// DOM //////////////////////////

    return <div className={'screen-wrapper ' + _id}>
        {viewList.map((view, index) => {

            const multipleColumn = view.multipleColumn
            const multipleRow = view.multipleRow

            if (index === order) {

                if (!multipleColumn) {

                    order++
                    return <View
                        key={index}
                        view={view}
                        touchScreen={touchScreen} />

                } else {

                    return <div key={index}
                        className='slider-wrapper'
                        onMouseDown={e => { mouseDownHandler(e) }}
                        onTouchStart={e => { touchStartHandler(e) }}>

                        {viewList.map((view, index) => {

                            const multipleColumn = view.multipleColumn
                            const multipleRow = view.multipleRow

                            if (index === order) {

                                if (multipleColumn) {

                                    if (!multipleRow) {

                                        order++
                                        return <View
                                            key={index}
                                            view={view}
                                            touchScreen={touchScreen} />

                                    } else {

                                        return <div key={index}
                                            className='column-wrapper'>
                                            {viewList.map((view, index) => {

                                                const multipleColumn = view.multipleColumn
                                                const multipleRow = view.multipleRow

                                                if (index === order)

                                                    if (multipleRow && multipleColumn) {

                                                        order++
                                                        return <View
                                                            key={index}
                                                            view={view}
                                                            touchScreen={touchScreen} />

                                                    }

                                            }).filter(view => view)}
                                        </div>
                                    }
                                }
                            }

                        }).filter(view => view)}
                    </div>
                }
            }

        }).filter(view => view)}
    </div>
}

export default Screen;
