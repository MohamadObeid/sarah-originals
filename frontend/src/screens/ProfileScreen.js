import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { detailsUser, saveUser, signin } from '../actions/userActions'
import cookie from "js-cookie"
import FontAwesome from 'react-fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit, faUnlockAlt, faHistory, faStar, faWallet, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

function ProfileScreen(props) {
    const [formNote, setFormNote] = useState()
    const [formNoteVisible, setFormNoteVisible] = useState(false)
    const [editProfileVisible, setEditProfileVisible] = useState(false)
    const [changePasswordVisible, setChangePasswordVisible] = useState(false)
    const [orderHistoryVisible, setOrderHistoryVisible] = useState(false)
    const [wishListVisible, setWishListVisible] = useState(false)
    const [walletVisible, setWalletVisible] = useState(false)
    const [passwordValid, setPasswordValid] = useState(false)
    const [signoutVisible, setSignoutVisible] = useState(false)

    const { userInfo } = useSelector(state => state.userSignin)
    const { user } = useSelector(state => state.userDetails)

    if (!userInfo) {
        props.history.push('/signin')
    }

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [password, setPassword] = useState()
    const [predPassword, setPredPassword] = useState()

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(detailsUser(userInfo && userInfo._id))
        return () => {
            //
        };
    }, [])

    const setProfileProps = () => {
        setName(user && user.name)
        setEmail(user && user.email)
        setPhone(user && user.phone)
    }

    const clearProps = () => {
        setName('')
        setEmail('')
        setPhone('')
    }

    const openProfilePage = () => {
        setEditProfileVisible(true)
        setChangePasswordVisible(false)
        setOrderHistoryVisible(false)
        setWishListVisible(false)
        setWalletVisible(false)
        setProfileProps()
    }

    const openChangePassword = () => {
        setEditProfileVisible(false)
        setChangePasswordVisible(true)
        setOrderHistoryVisible(false)
        setWishListVisible(false)
        setWalletVisible(false)
        clearProps()
        setPassword(user && user.password)

        setPasswordValid(false)
        setPredPassword('')
    }

    const handleSaveUser = () => {
        if (name) user.name = name
        if (email) user.email = email
        if (phone) user.phone = phone
        if (password) user.password = password
        dispatch(saveUser(user))
        setFormNote(`Account Edited Succefully`)
        setFormNoteVisible(true)
        setInterval(() => setFormNoteVisible(false), 3000)

        setEditProfileVisible(false)
        setChangePasswordVisible(false)
        setOrderHistoryVisible(false)
        setWishListVisible(false)
        setWalletVisible(false)
        setPasswordValid(false)
        setPredPassword('')
    }

    window.addEventListener('click', (e) => {
        const signoutOverlay = document.querySelector('.signout-overlay');
        if (e.target === signoutOverlay)
            setSignoutVisible(false)
    })

    const handleSignout = (e) => {
        cookie.remove('userInfo')
        dispatch(signin(
            { email: userInfo.email, password: userInfo.password, request: 'signout' }))
        props.history.push('/')
    }

    return (
        userInfo &&
        <div>
            {formNoteVisible && <div className="action-note">{formNote}</div>}
            <div className="back-to-result">
                <Link to="/">
                    <FontAwesome name="fa-chevron-left" className="fas fa-chevron-left fa-lg" />
                    Home
                </Link>
            </div>
            <div className="cart">
                <div className="cart-list">
                    <div className="cart-list-container">
                        {editProfileVisible &&
                            <div style={{ marginBottom: '3rem' }}>
                                <h3>Edit Profile</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    <div className='profile-input'>
                                        <label htmlFor="name" style={{ marginRight: '0.5rem' }}>Full Name</label>
                                        <input
                                            type="name"
                                            name="name"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        ></input>
                                    </div>
                                    <div className='profile-input'>
                                        <label htmlFor="email" style={{ marginRight: '0.5rem' }}>Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        ></input>
                                    </div>
                                    <div className='profile-input'>
                                        <label htmlFor="phone" style={{ marginRight: '0.5rem' }}>Phone Number</label>
                                        <input
                                            type="number"
                                            name="phone"
                                            id="phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        ></input>
                                    </div>
                                    <button
                                        className='button profile-save-btn'
                                        onClick={handleSaveUser}
                                    >Save</button>
                                </div>
                            </div>
                        }
                        {changePasswordVisible &&
                            <div>
                                <h3>Change Password</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    <div className='profile-input'>
                                        <label htmlFor="password" style={{ marginRight: '0.5rem' }}>Enter Current Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            onChange={(e) => {
                                                setPredPassword(e.target.value)
                                                if (e.target.value === user.password)
                                                    setPasswordValid(true)
                                                else setPasswordValid(false)
                                            }}
                                        ></input>
                                        {
                                            (!passwordValid && predPassword) && <div className="invalid">Wrong Password!</div>
                                        }
                                        {
                                            (passwordValid && predPassword) && <div className="valid">Valid password!</div>
                                        }
                                    </div>
                                    {passwordValid &&
                                        <div className='profile-input'>
                                            <label htmlFor="password" style={{ marginRight: '0.5rem' }}>Enter New Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                onChange={(e) => setPassword(e.target.value)}
                                            ></input>
                                        </div>}

                                    {passwordValid &&
                                        <button
                                            className='button  profile-save-btn'
                                            onClick={handleSaveUser}
                                        >Save</button>}
                                </div>
                            </div>
                        }
                        {orderHistoryVisible &&
                            <div>
                                <h3>Order History</h3>
                            </div>
                        }
                        {wishListVisible &&
                            <div>
                                <h3>Wish List</h3>
                            </div>
                        }
                        {walletVisible &&
                            <div>
                                <h3>Wallet</h3>
                            </div>
                        }
                    </div>
                </div>
                <div className="cart-action" style={{ margin: '1rem' }}>
                    <h3
                        className="control-title"
                        style={{ marginBottom: '3rem' }}>
                        Profile Page
                    </h3>

                    <h4
                        onClick={openProfilePage}
                        className="control-title profile-title">
                        <FontAwesomeIcon
                            icon={faUserEdit}
                            style={{ marginRight: '0.3rem', color: 'rgb(60, 60, 60)' }} />
                        Edit Profile
                    </h4>
                    <h4
                        onClick={openChangePassword}
                        className="control-title profile-title">
                        <FontAwesomeIcon
                            icon={faUnlockAlt}
                            style={{ marginRight: '0.7rem', color: 'rgb(60, 60, 60)' }} />
                        Change Password
                    </h4>

                    <h4
                        onClick={() => {
                            setEditProfileVisible(false)
                            setChangePasswordVisible(false)
                            setOrderHistoryVisible(true)
                            setWishListVisible(false)
                            setWalletVisible(false)
                        }}
                        className="control-title profile-title">
                        <FontAwesomeIcon
                            icon={faHistory}
                            style={{ marginRight: '0.5rem', color: 'rgb(60, 60, 60)' }} />
                        Order History
                    </h4>

                    <h4
                        onClick={() => {
                            setEditProfileVisible(false)
                            setChangePasswordVisible(false)
                            setOrderHistoryVisible(false)
                            setWishListVisible(true)
                            setWalletVisible(false)
                        }}
                        className="control-title profile-title">
                        <FontAwesomeIcon
                            icon={faStar}
                            style={{ marginRight: '0.5rem', color: 'rgb(60, 60, 60)' }} />
                        WishList
                    </h4>

                    <h4
                        onClick={() => {
                            setEditProfileVisible(false)
                            setChangePasswordVisible(false)
                            setOrderHistoryVisible(false)
                            setWishListVisible(false)
                            setWalletVisible(true)
                        }}
                        className="control-title profile-title">
                        <FontAwesomeIcon
                            icon={faWallet}
                            style={{ marginRight: '0.7rem', color: 'rgb(60, 60, 60)' }} />
                        Wallet
                    </h4>

                    <h4
                        onClick={() => {
                            setEditProfileVisible(false)
                            setChangePasswordVisible(false)
                            setOrderHistoryVisible(false)
                            setWishListVisible(false)
                            setWalletVisible(false)
                            setSignoutVisible(true)
                        }}
                        style={{ float: 'right', cursor: 'pointer', marginRight: '3rem' }}>
                        <FontAwesomeIcon
                            icon={faSignOutAlt}
                            style={{ marginRight: '0.7rem', color: 'rgb(60, 60, 60)' }} />
                        Sign out
                    </h4>
                </div>
            </div>
            {signoutVisible &&
                <div>
                    <div className='signout-overlay'>
                        <div className='signout-container'>
                            <div style={{ margin: '2rem' }}>Do you want to Sign out?</div>
                            <button className='button'
                                onClick={(e) => handleSignout(e)}
                                style={{ marginRight: '1rem' }}>Sign out</button>
                            <button className='button secondary'
                                onClick={() => setSignoutVisible(false)}>Cancel</button>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default ProfileScreen
