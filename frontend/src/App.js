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
import { useDispatch } from "react-redux";
import { listControls, saveControls, getController, saveController, deleteController } from "./actions/controlActions";
import { Ribbon } from './screens/Components/Ribbon'
import { defaultController, defaultControls, defaultScreenBoxes } from './constants/defaultControls'
import { saveScreenBox, deleteScreenBox, getScreenBox } from "./actions/screenBoxActions";

const App = React.memo(() => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listControls())
    dispatch(getController({ _id: '5fff71598a20391b7c24e26c' }))
    dispatch(getScreenBox({ _id: '5fff6ec48a20391b7c24e207' }))
    //dispatch(saveScreenBox(defaultScreenBoxes))
    //dispatch(saveController(defaultController))
    //dispatch(saveControls(defaultControls))
    //dispatch(deleteScreenBox({ deleteAll: true }))
    //dispatch(deleteController({ _id: '' }))
  }, [])

  return (
    <BrowserRouter>
      <div className="grid-container">
        <NavBar />
        <div className="main">
          {/*<Ribbon />*/}
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
