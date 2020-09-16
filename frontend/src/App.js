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
import { saveUser } from "./actions/userActions";

function App() {
  const [IP, setIP] = useState()

  const getIPAddress = async () => {
    await fetch('https://geolocation-db.com/json/7733a990-ebd4-11ea-b9a6-2955706ddbf3')
      .then(res => res.json())
      .then(IP => { setIP(IP); console.log(IP, 'failed') })
  }

  const { userInfo } = useSelector(state => state.userSignin)
  const dispatch = useDispatch()

  const refreshActiveUser = async () => {
    await dispatch(saveUser({ ...userInfo, active: true, lastActivity: { date: Date.now() + 10800000, IPaddress: IP } }))
    dispatch(saveUser('clear'))
    setTimeout(refreshActiveUser, 60000)
  }

  useEffect(() => {
    getIPAddress()
    if (userInfo) {
      console.log('set Active User once')
      refreshActiveUser()
    }
    return () => {
      //
    };
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
  );
}

export default App;
