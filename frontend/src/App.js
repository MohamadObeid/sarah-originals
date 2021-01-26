import React, { useEffect, useLayoutEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./index.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import OrderScreen from "./screens/OrderScreen";
import RegisterScreen from "./screens/RegisterScreen";
import DashBoard from "./screens/AdminPanel/DashBoard";
import NavBar from "./screens/Components/NavBar";
import ProfileScreen from './screens/ProfileScreen';
import Chatbox from './screens/Components/Chatbox';
import { useDispatch, useSelector } from "react-redux";
import { saveControls, getControls, deleteControls } from "./actions/controlsActions";
import {
  saveStyles, deleteStyles, getStyles,
  saveTitleStyles, getTitleStyles, deleteTitleStyles, saveAddToCartStyles, getAddToCartStyles
} from "./actions/stylesActions";
import { Styles } from './constants/Styles'
import { Controls } from './constants/defaultControls'
import { defaultStyles, defaultTitleStyles, defaultAddToCartStyles } from "./constants/defaults";

const App = React.memo(() => {

  const dispatch = useDispatch()
  useEffect(() => {
    // get initials requests
    dispatch(getAddToCartStyles({ name: 'Default Desktop AddToCart' }))
    dispatch(getTitleStyles({ name: 'Default Title Desktop Styles' }))
    dispatch(getStyles({ name: 'Default Desktop Styles' }))
    dispatch(getControls({ limit: 10 }))

    // save requests
    //dispatch(saveControls(Controls))
    //dispatch(saveStyles(Styles))
    //dispatch(saveStyles(defaultStyles))
    //dispatch(saveTitleStyles(defaultTitleStyles))
    //dispatch(saveAddToCartStyles(defaultAddToCartStyles))

    // delete requests
    //dispatch(deleteControls({ deleteAll: true }))
    //dispatch(deleteStyles({ deleteAll: true }/*{ name: 'Default Desktop Styles' }*/))
    //dispatch(deleteTitleStyles({ deleteAll: true }))
  }, [])

  return (
    <BrowserRouter>
      <div className="grid-container">
        <NavBar />
        <div className="main">
          <Route path="/dashboard" component={DashBoard} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/" exact={true} component={HomeScreen} />
          <Route path="/order" component={OrderScreen} />
          <Route path="/profile" component={ProfileScreen} />
        </div>
        <Chatbox />
        <footer className="footer">All rights reserved.</footer>
      </div>
    </BrowserRouter >
  )
})

export default App;
