import { faSearch, faTh, faThLarge, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppstoreOutlined } from '@ant-design/icons';

function NavigationBar() {
    const [animateNavBar, setAnimateNavBar] = useState('')
    const topRibbonVisible = useSelector(state => state.topRibbonVisible)

    /*useEffect(() => {
        console.log(topRibbonVisible)
    }, [topRibbonVisible])*/

    window.addEventListener('scroll', (e, topRibbonVisible) => {
        var top = '50'
        if (topRibbonVisible) {
            top = '100'
        }
        if (window.scrollY >= top) {
            setAnimateNavBar('animateNavBar')
        } else setAnimateNavBar('')
    })

    return (
        <div>
            <div className='window-overlay'></div>
            <div className='navigation-bar'>
                <div className={'navigation-bar-container ' + animateNavBar}>
                    <div className='nav-category-container'>
                        <div className='nav-category-icon'>
                            < AppstoreOutlined className='category-icon' />
                        </div>
                        <div className='nav-category-header'>Product Categories</div>
                        <div className='nav-category-border'></div>
                    </div>
                    <div className='nav-headers'>
                        <div className='nav-header'>header</div>
                    </div>
                    <div className='nav-search-container'>
                        <div className='nav-search-bar'>
                            <div className='nav-search-icon'>
                                <FontAwesomeIcon icon={faSearch} className='search-icon' />
                            </div>
                            <input type='text' className='nav-search-text'
                                placeholder='Search for product, brand, category...'></input>
                            <div className='nav-search-close-icon'>
                                <FontAwesomeIcon icon={faTimes} className='close-icon' />
                            </div><div className='nav-search-help'>
                                <div className='nav-search-help-text'></div>
                                <div className='nav-search-help-words'>
                                    <div className='nav-search-help-word'>word</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='navigation-height'></div>
        </div>
    )
}

export default NavigationBar