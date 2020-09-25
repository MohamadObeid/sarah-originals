import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../actions/userActions";
import FontAwesome from 'react-fontawesome';
import CheckoutSteps from "./Components/CheckoutSteps";
import Axios from "axios";
import { USER_SIGNIN_SUCCESS } from "../constants/constants";
import { listLiveUser } from "../actions/chatActions";

function SigninScreen(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, userInfo, error } = useSelector(state => state.userSignin);

  const dispatch = useDispatch()
  var IPaddress

  const getIPAddress = async () => {
    await fetch('https://geolocation-db.com/json/7733a990-ebd4-11ea-b9a6-2955706ddbf3')
      .then(res => res.json())
      .then(IP => {
        IPaddress = IP.country_name + ', ' + IP.city
      })
  }

  const refreshActiveUser = async () => {
    let { data } = await Axios.post("/api/users/signin",
      { email: userInfo.email, password: userInfo.password, IPaddress })
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
    data.active &&
      setTimeout(refreshActiveUser, 25000)
  }

  // props.location.search is everything written in the path after the page path
  const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

  useEffect(() => {
    getIPAddress()
    return () => {
      //
    }
  }, [])

  useEffect(() => {
    if (userInfo) {
      setTimeout(refreshActiveUser, 25000)
      dispatch(listLiveUser())
      props.history.push(redirect)
    }
    return () => {
      //
    };
  }, [userInfo]);

  // when user press on signin, submithandler is gonna run
  const submitHandler = (e) => {
    e.preventDefault(); // prevents from refreshing when submiting
    dispatch(signin({ email, password, IP: IPaddress, request: 'signin' }))
  }

  return (
    <div>
      <div className="back-to-result">
        <Link to="/">
          <FontAwesome className="fas fa-chevron-left fa-lg" />
          Home
        </Link>
      </div>
      {redirect === 'order' && <CheckoutSteps step1 />}
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Sign In</h2>
            </li>
            {loading && <div>loading...</div>}
            {(error && email && password) &&
              <div className="error">Invalid Email or Password!</div>}
            <li>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </li>
            <li>
              <button type="submit" className="button primary">
                Sign in
            </button>
            </li>
            <li className="new-to">New to Sarah Orginals?</li>
            <li>
              <Link to={redirect == '/' ? "/register" : '/register?redirect=' + redirect} className="button secondary">
                Create a Sarah Originals account
            </Link>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
export default SigninScreen;
