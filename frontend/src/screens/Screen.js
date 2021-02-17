import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { View } from "./Components/View";
import { getViews } from "../actions/viewActions";
import { getStyles } from "../actions/stylesActions";

const Screen = ({ screen, viewPort, touchScreen }) => {

    const dispatch = useDispatch()
    const viewList = screen.viewList

    useEffect(() => {
        // list views
        viewList.map(view => {
            dispatch(getViews({ name: view.name }))
            dispatch(getStyles({ name: view.styles, type: 'MagicBox' }))
        })

    }, [])

    return viewList.map((view, index) => <View
        key={index}
        view={view}
        viewPort={viewPort}
        touchScreen={touchScreen} />)
}

export default Screen;
