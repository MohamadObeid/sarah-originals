import React, { useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { saveControls, getControls, deleteControls } from "./actions/controlsActions";
import { saveStyles, deleteStyles, getStyles, } from "./actions/stylesActions";
import { magicBoxStyles } from './constants/magicBox'
import { Controls } from './constants/defaultControls'
import { defaultMagicBoxStyles, defaultTitleStyles, defaultAddToCartStyles } from "./constants/defaults";
import { ActionNote } from "./screens/Components/ActionNote";

const App = React.memo(() => {

  const dispatch = useDispatch()
  useEffect(() => {
    // get initials requests
    dispatch(getStyles({ name: 'Default Desktop AddToCart Styles', type: 'AddToCart' }))
    dispatch(getStyles({ name: 'Default Desktop Title Styles', type: 'Title' }))
    dispatch(getStyles({ name: 'Default Desktop MagicBox Styles', type: 'MagicBox' }))
    dispatch(getControls({ limit: 10 }))

    // save requests
    //dispatch(saveControls(Controls))
    //dispatch(saveStyles([...magicBoxStyles, defaultMagicBoxStyles, defaultTitleStyles, defaultAddToCartStyles]))

    // delete requests
    //dispatch(deleteControls({ deleteAll: true }))
    //dispatch(deleteStyles({ deleteAll: true, type: 'Title' }))
    //dispatch(deleteStyles({ deleteAll: true, type: 'MagicBox' }))
    //dispatch(deleteStyles({ deleteAll: true, type: 'AddToCart' }))
  }, [])

  return (
    <BrowserRouter>
      <div className="grid-container">
        <NavBar />
        <ActionNote />
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
