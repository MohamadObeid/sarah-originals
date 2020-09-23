import React, { useEffect, useState } from "react";
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

function App(props) {

  const dispatch = useDispatch()
  //const [IP, setIP] = useState()
  var IPaddress

  const { userInfo } = useSelector(state => state.userSignin)

  const getIPAddress = async () => {
    await fetch('https://geolocation-db.com/json/7733a990-ebd4-11ea-b9a6-2955706ddbf3')
      .then(res => res.json())
      .then(IP => {
        IPaddress = IP.country_name + ', ' + IP.city
        console.log('refresh Active User')
        userInfo && refreshActiveUser()
      })
  }

  const refreshActiveUser = async () => {
    await dispatch(signin(userInfo.email, userInfo.password, IPaddress))
    setTimeout(refreshActiveUser, 30000)
  }

  useEffect(() => {
    getIPAddress()
    return () => {
      //
    };
  }, [])

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
}

export default App;
