import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { listCategory } from '../../actions/categoryActions';
import FontAwesome from 'react-fontawesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser as farUser } from '@fortawesome/free-regular-svg-icons'
import { SideBar } from './SideBar'

const Navbar = React.memo(props => {

    const [subSidebarVisible, setSubSidebarVisible] = useState(false);
    const { userInfo } = useSelector(state => state.userSignin);
    const { cartItems } = useSelector(state => state.cart);

    const openSideBar = () => {
        document.querySelector('.sidebar').classList.add('open');
        document.querySelector('.sidebar-overlay').style.visibility = 'visible';
        window.addEventListener('click', (e) => {
            const sidebarOverlay = document.querySelector('.sidebar-overlay');
            e.target == sidebarOverlay && closeSideBar();
        });

        window.addEventListener('mouseover', (e) => {
            const sidebarOverlay = document.querySelector('.sidebar-overlay');
            e.target == sidebarOverlay && setSubSidebarVisible(false);
        });
    }

    const closeSideBar = () => {
        document.querySelector('.sidebar').classList.remove('open');
        document.querySelector('.sidebar-overlay').style.visibility = 'hidden';
        setSubSidebarVisible(false);
    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listCategory())
    }, []);

    var currentY, active

    const drag = e => {
        //if (active) {
        e.preventDefault()
        currentY = e.touches[0].clientY
        const screenHeight = window.screen.height
        e.currentTarget.style.top = (currentY / screenHeight * 100) + 'vh'

    }

    return (
        <header className="header">
            <SideBar />
            <div className="brand">
                <FontAwesome name="fa-bars" className="fas fa-bars" onClick={() => openSideBar()} />
                <Link className="brand-name" to="/">Sarah Originals</Link>
            </div>
            <div className="header-links">
                <Link className="header-link-cart" to="/cart"
                    onTouchMove={drag}>
                    <div className='item-qty-div'>
                        {cartItems.reduce((total, item) => total + item.qty, 0) > 0 &&
                            <p className='header-link-item'>
                                {cartItems.reduce((total, item) => total + item.qty, 0)}
                            </p>}
                        <FontAwesome name='fa-cart-plus' className="fas fa-cart-plus fa-2x" />
                    </div>
                </Link>
                {
                    (userInfo && userInfo.name) ?
                        <Link className="header-link-user" to='/profile'>
                            Hi, {userInfo.name.split(" ")[0]}
                            <FontAwesomeIcon icon={farUser} className='farUser fa-lg' />
                        </Link> :
                        <Link className="header-link-user" to="/signin">
                            Sign In
                                <FontAwesomeIcon icon={farUser} className='farUser fa-lg' />
                        </Link>
                }
            </div>
        </header>
    )
})

export default Navbar;