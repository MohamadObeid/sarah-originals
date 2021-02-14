import React, { useState, useEffect } from 'react'
import FontAwesome from 'react-fontawesome'
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

export const SideBar = () => {

    const [subSidebarVisible, setSubSidebarVisible] = useState(false);
    const [categoryHovered, setCategoryHovered] = useState()

    const { category } = useSelector(state => state.categoryList);

    const closeSideBar = () => {
        document.querySelector('.sidebar').classList.remove('open');
        document.querySelector('.sidebar-overlay').style.visibility = 'hidden';
        setSubSidebarVisible(false);
    }

    const handleHover = (e) => {
        if (e.target.innerText) {
            setCategoryHovered(e.target.innerText);
            setSubSidebarVisible(true);
        } else setSubSidebarVisible(false);
    }

    return (
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
        </div>)
}