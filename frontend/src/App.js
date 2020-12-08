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
import { signin } from "./actions/userActions";
import axios from "axios";
import { USER_SIGNIN_SUCCESS } from "./constants/constants";
import { clock } from './actions/timeActions'
import cookie from "js-cookie";
import { listControls, saveControls } from "./actions/controlActions";
import Ribbon from './screens/Components/Ribbon'
import { defaultControls } from './constants/defaultControls'

const App = React.memo(props => {

  const [hideTopRibbon, setHideTopRibbon] = useState(false)
  const topRibbonVisible = useSelector(state => state.topRibbonVisible)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listControls())
    dispatch(saveControls(defaultControls))
  }, [])

  var IPaddress
  var refresh

  const { userInfo } = useSelector(state => state.userSignin)
  const { time } = useSelector(state => state.clock)

  const getIPAddress = async () => {
    try {
      await fetch('https://geolocation-db.com/json/7733a990-ebd4-11ea-b9a6-2955706ddbf3')
        .then(res => res.json())
        .then(IP => {
          IPaddress = IP.country_name + ', ' + IP.city
        })
    } catch (error) { }
    if (userInfo) {
      await dispatch(signin({ email: userInfo.email, password: userInfo.password, IPaddress, request: 'signin' }))
      setTimeout(refreshActiveUser, 25000)
    }
  }

  const refreshActiveUser = async () => {
    const userInfo = cookie.getJSON("userInfo") || undefined
    if (userInfo) {
      let { data } = await axios.post("/api/users/signin",
        { email: userInfo.email, password: userInfo.password, IPaddress })
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
      if (data.active)
        refresh = setTimeout(refreshActiveUser, 25000)
    }
  }

  const refreshClock = () => {
    dispatch(clock())
    setTimeout(refreshClock, 1000)
  }

  useEffect(() => {
    !time && refreshClock()
    getIPAddress()
  }, [])

  useLayoutEffect(() => {
    const URL = window.location.href
    if (URL.includes('dashboard')) setHideTopRibbon(true)
    else setHideTopRibbon(false)
  }, [window.location.href])

  // hide address bar in mobile
  /*window.addEventListener("load", function () {
    setTimeout(function () {
      // This hides the address bar:
      window.scrollTo(0, 1);
    }, 0);
  });*/

  return (
    <BrowserRouter>
      <div className="grid-container">
        <NavBar />
        <div className="main">
          {topRibbonVisible && !hideTopRibbon && <Ribbon />}
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
  );
})

export default App;
