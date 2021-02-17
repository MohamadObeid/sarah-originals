import React, { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./index.css";
import Screen from "./screens/Screen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import OrderScreen from "./screens/OrderScreen";
import RegisterScreen from "./screens/RegisterScreen";
import DashBoard from "./screens/AdminPanel/DashBoard";
import NavBar from "./screens/Components/NavBar";
import ProfileScreen from './screens/ProfileScreen';
import Chatbox from './screens/Components/Chatbox';
import { deleteScreens, getScreens, saveScreens } from "./actions/screenActions";
import { useDispatch, useSelector } from "react-redux";
import { getStyles, saveStyles } from "./actions/stylesActions";
import { magicBoxStyles } from "./constants/magicBoxStyles";
import { defaultAddToCartStyles, defaultMagicBoxStyles, defaultTitleStyles } from "./constants/defaults";
import { saveViews } from "./actions/viewActions";
import { viewsData } from "./data/viewsData"
import { screensData } from "./data/screensData"

const App = React.memo(() => {

  const [screens, setScreens] = useState([])
  const [viewPort, setViewPort] = useState(window.innerWidth <= 700 ? 'mobile' : 'desktop')
  const [touchScreen, setTouchScreen] = useState(window.matchMedia("(pointer: coarse)").matches)

  const dispatch = useDispatch()

  useSelector(state => {
    if (state.screens.length > screens.length) {
      const viewPortScreens = state.screens.filter(screen => screen.viewPort === viewPort)
      if (viewPortScreens !== screens) setScreens(state.screens)
    }
  })

  useEffect(() => {
    // list screens
    dispatch(getScreens({ viewPort }))

    window.addEventListener("resize", function () {
      // check view port: desktop, mobile
      if (window.innerWidth <= 700) {
        if (viewPort !== 'mobile') setViewPort('mobile')
      } else if (viewPort !== 'desktop') setViewPort('desktop')

      // check touch screen
      if (window.matchMedia("(pointer: coarse)").matches !== touchScreen)
        setTouchScreen(window.matchMedia("(pointer: coarse)").matches)
    })

    // save defaults
    /*dispatch(saveStyles([...magicBoxStyles, defaultMagicBoxStyles, defaultTitleStyles, defaultAddToCartStyles]))
    dispatch(saveViews(viewsData))
    dispatch(saveScreens(screensData))*/

    // get defaults
    dispatch(getStyles({ name: 'Default Desktop AddToCart Styles', type: 'AddToCart', viewPort }))
    dispatch(getStyles({ name: 'Default Desktop Title Styles', type: 'Title', viewPort }))
    dispatch(getStyles({ name: 'Default Desktop MagicBox Styles', type: 'MagicBox', viewPort }))

  }, [viewPort])

  return (
    <BrowserRouter>
      <div className="grid-container">
        <NavBar />
        <div className="main">

          {screens.map((screen, index) => screen.viewPort === viewPort &&
            <Route
              key={index}
              path={screen.path}
              exact={screen.exact}
              render={() => <Screen
                screen={screen}
                viewPort={viewPort}
                touchScreen={touchScreen} />
              } />)}

          <Route path="/dashboard" component={DashBoard} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/order" component={OrderScreen} />
          <Route path="/profile" component={ProfileScreen} />
        </div>
        <Chatbox />
        <footer className="footer">All Rights Reserved.</footer>
      </div>
    </BrowserRouter >
  )
})

export default App;
