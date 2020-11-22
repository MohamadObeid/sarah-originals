import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { listCategory } from '../../actions/categoryActions';
import FontAwesome from 'react-fontawesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser as farUser } from '@fortawesome/free-regular-svg-icons'

function Navbar() {

    const { userInfo } = useSelector(state => state.userSignin);
    const { cartItems } = useSelector(state => state.cart);

    const [subSidebarVisible, setSubSidebarVisible] = useState(false);
    const [categoryHovered, setCategoryHovered] = useState()

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

    const { category } = useSelector(state => state.categoryList);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listCategory())
    }, []);

    const handleHover = (e) => {
        if (e.target.innerText) {
            setCategoryHovered(e.target.innerText);
            setSubSidebarVisible(true);
        } else setSubSidebarVisible(false);
    }

    /////////////////////////////////////////
    ////////////////Drag Btn/////////////////
    const [xPosition, setXPosition] = useState()
    const [yPosition, setYPosition] = useState()

    const [active, setActive] = useState()
    var currentX
    var currentY
    var initialX
    var initialY
    var xOffset = 0
    var yOffset = 0

    const drag = e => {
        if (active) {
            e.preventDefault()

            /*if (e.type === "touchmove") {
                currentX = initialX;*/
            currentY = e.touches[0].clientY;
            /*} else {
                currentX = initialX;
                currentY = e.clientY;
            }

            xOffset = currentX;
            yOffset = currentY;*/

            const dragBtn = e.currentTarget;
            setTranslate(currentX, currentY, dragBtn);
        }
    }

    const dragStart = e => {
        /*if (e.type === "touchstart") {
            initialX = e.touches[0].clientX - xOffset
            initialY = e.touches[0].clientY - yOffset
        } else {
            initialX = e.clientX - xOffset
            initialY = e.clientY - yOffset
        }*/
        setActive(true)
    }

    const dragEnd = e => {
        /*initialX = currentX;
        initialY = currentY;*/
        setActive(false)
    }

    const setTranslate = (xPos, yPos, dragBtn) => {
        setXPosition(xPos)
        setYPosition(yPos)
        const screenHeight = window.screen.height
        dragBtn.style.top = (yPos / screenHeight * 100) + 'vh'
    }

    ////////////////End Drag/////////////////
    /////////////////////////////////////////

    return (
        <div className="navbar-div">
            <header className="header">
                <div className="brand">
                    <FontAwesome name="fa-bars" className="fas fa-bars" onClick={() => openSideBar()} />
                    <Link className="brand-name" to="/">Sarah Originals</Link>
                </div>
                <div className="header-links">
                    <Link className="header-link-cart" to="/cart"
                        onTouchMove={drag}
                        onTouchStart={dragStart}
                        onTouchEnd={dragEnd}>
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
                                Hi, {userInfo.name.split(" ")[0]}</Link> :
                            <Link className="header-link-user" to="/signin">
                                Sign In
                                <FontAwesomeIcon icon={farUser} className='farUser fa-lg' />
                            </Link>
                    }
                </div>
            </header>
            <div className="sidebar-overlay">
                <aside className="sidebar">
                    <h3 className="sidebar-header">Categories</h3>
                    <FontAwesome name="fa-window-close"
                        className="far fa-window-close fa-lg sidebar-close-button"
                        onClick={() => closeSideBar()} />

                    <ul className="sidebar-ul">
                        {category && category.map(category => (
                            !category.headCategory &&
                            <li key={category._id}>
                                <Link className="sidebar-link" onMouseOver={(e) => handleHover(e)} to="/products">{category.name}</Link>
                            </li>
                        ))}
                    </ul>
                </aside>
                {subSidebarVisible &&
                    <aside className="sub-sidebar">
                        <div>
                            <h4 className="sub-sidebar-header">{categoryHovered}</h4>
                            {category && category.map(category => (
                                category.headCategory == categoryHovered &&
                                <ul className="subSidebar-ul">
                                    <li key={category._id}>
                                        <Link className="subSidebar-link" to="/products">{category.name}</Link>
                                    </li>
                                </ul>
                            ))}
                        </div>
                    </aside>
                }
            </div>
        </div >
    )
}

export default Navbar;