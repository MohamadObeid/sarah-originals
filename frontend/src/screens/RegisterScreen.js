import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register, signin } from "../actions/userActions";
import FontAwesome from 'react-fontawesome';

function RegisterScreen(props) {
    const [IP, setIP] = useState()

    const getIPAddress = async () => {
        await fetch('https://geolocation-db.com/json/7733a990-ebd4-11ea-b9a6-2955706ddbf3')
            .then(res => res.json())
            .then(IP => {
                setIP(IP)
            })
    }

    useEffect(() => {
        getIPAddress()
        return () => {
            //
        };
    }, [])

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [password, setPassword] = useState()
    const [rePassword, setRePassword] = useState()
    const { loading, userInfo, error } = useSelector(state => state.userRegister)

    // props.location.search is everything written in the path after the page path
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/'

    const dispatch = useDispatch()
    useEffect(() => {
        if (userInfo && userInfo.name) {
            props.history.push(redirect)
        }
        return () => {
            //
        };
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if (name && email && password && phone && rePassword == password) {
            dispatch(register({
                name: name, email: email, phone: phone, password: password, isAdmin: false,
                IP: (IP.country_name + ', ' + IP.city)
            }))
        }
    }

    return (
        <div>
            <div className="back-to-result">
                <Link to="/">
                    <FontAwesome className="fas fa-chevron-left fa-lg" />
                    Home
                </Link>
            </div>
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h2>Create Account</h2>
                        </li>
                        {loading && <div>loading...</div>}
                        {error && <div className="Invalid">Invalid Password or Email.</div>}
                        <li>
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="name"
                                name="name"
                                id="name"
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                        </li>
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
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="number"
                                name="phone"
                                id="phone"
                                onChange={(e) => setPhone(e.target.value)}
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
                            <label htmlFor="rePassword">Re-Enter Password</label>
                            <input
                                type="password"
                                name="rePassword"
                                id="rePassword"
                                onChange={(e) => setRePassword(e.target.value)}
                            ></input>
                            {rePassword && rePassword === password ?
                                <div className="valid">Valid password!</div> :
                                rePassword && rePassword !== password &&
                                <div className="invalid">Wrong password!</div>
                            }
                        </li>
                        <li>
                            <button type="submit" className="button primary">
                                Register
                        </button>
                        </li>
                        <li className="already-have">
                            <p>Already have an account? <Link to={redirect == '/' ? "/signin" : '/signin?redirect=' + redirect}>Sign In</Link></p>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    );
}

export default RegisterScreen;
