// react
import React, { useEffect, useState } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
// screens
import Screen from "./Screen"
import ProductScreen from "../ProductScreen"
import CartScreen from "../CartScreen"
import SigninScreen from "../SigninScreen"
import OrderScreen from "../OrderScreen"
import RegisterScreen from "../RegisterScreen"
import DashBoard from "../AdminPanel/DashBoard"
import NavBar from "./NavBar"
import ProfileScreen from '../ProfileScreen'
import Chatbox from './Chatbox'
// actions
import { getScreens, saveScreens } from "../../actions/screenActions"
import { getStyles, saveStyles } from "../../actions/stylesActions"
import { saveViews } from "../../actions/viewActions"
// data
import { screenData } from "../../data/screenData"
import { viewData } from "../../data/viewData"
import { magicBoxData } from "../../data/magicBoxData"
import {
    defaultAddToCartStyles,
    defaultMagicBoxStyles,
    defaultTitleStyles
} from "../../data/defaultsData"

export const Website = ({ website, viewPort, touchScreen }) => {

    /////////////////////// Hooks ////////////////////////

    const [screens, setScreens] = useState([])
    const dispatch = useDispatch()

    useSelector(state => {
        if (screens.length === 0)
            if (state.screens.length > 0) {
                const filteredScreens = state.screens.filter(screen =>
                    screen.viewPort === viewPort
                )
                if (filteredScreens.length > 0)
                    setScreens(state.screens)
            }
    })

    useEffect(() => {
        // get screens
        dispatch(getScreens({ viewPort }))

        // save data
        dispatch(saveStyles([...magicBoxData, defaultMagicBoxStyles, defaultTitleStyles, defaultAddToCartStyles]))
        dispatch(saveViews(viewData))
        dispatch(saveScreens(screenData))

        // get default styles
        website.defaults.map(styles => {
            dispatch(getStyles({
                name: styles.name,
                type: styles.type,
                viewPort
            }))
        })

    }, [])

    /////////////////////// DOM ///////////////////////

    return (
        <BrowserRouter>
            <div className="grid-container">
                <NavBar />
                <div className="main">

                    {/* Screens */}
                    {screens.map((screen, index) =>
                        screen.viewPort === viewPort &&
                        <Route
                            key={index}
                            path={screen.path}
                            exact={screen.exact}
                            render={() => <Screen
                                screen={screen}
                                viewPort={viewPort}
                                touchScreen={touchScreen} />
                            } />
                    )}

                    <Route path="/dashboard" component={DashBoard} />
                    <Route path="/signin" component={SigninScreen} />
                    <Route path="/register" component={RegisterScreen} />
                    <Route path="/product" component={ProductScreen} />
                    <Route path="/cart" component={CartScreen} />
                    <Route path="/order" component={OrderScreen} />
                    <Route path="/profile" component={ProfileScreen} />
                </div>
                <Chatbox />
                <footer className="footer">All Rights Reserved.</footer>
            </div>
        </BrowserRouter >
    )
}
