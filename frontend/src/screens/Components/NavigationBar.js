import { faSearch, faTh, faThLarge, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppstoreOutlined } from '@ant-design/icons';

function NavigationBar() {
    const [animateNavBar, setAnimateNavBar] = useState('')
    const [searchContainerVisible, setSearchContainerVisible] = useState()
    const [searchKeyword, setSearchKeyword] = useState('')
    const [animateSearchContainer, setAnimateSearchContainer] = useState('')
    const [animateNavHeader, setAnimateNavHeader] = useState('')
    const [navigationBar, setNavigationBar] = useState()
    const [mouseXCoordinate, setMouseXCoordinate] = useState(false)
    const [reverse, setReverse] = useState(false)

    const topRibbonVisible = useSelector(state => state.topRibbonVisible)
    const { controls, loading } = useSelector(state => state.controls)

    useEffect(() => {
        if (searchContainerVisible) {
            const input = document.querySelector('.text-input')
            input.focus() // move cursor to text-input
        }
        if (controls && !loading) setNavigationBar(controls.navigationBar)
    }, [searchContainerVisible, controls])

    useEffect(() => {
        if (navigationBar) setVariables(navigationBar)

    }, [])

    const setVariables = (navigationBar) => {
        const navigationBarContainer = document.querySelector('.navigation-bar-container')
        navigationBarContainer.style.width = navigationBar.width
        navigationBarContainer.style.backgroundColor = navigationBar.backgroundColor

        const navHeader = document.querySelector('.nav-header')
        navHeader.style.fontSize = navigationBar.headers.fontSize
        navHeader.style.padding = '1.5rem ' + navigationBar.headers.padding

        const headerBorder = document.querySelector('.header-border-bottom')
        headerBorder.style.backgroundColor = navigationBar.headers.borderColor
    }

    useLayoutEffect(() => {

        const handleScroll = () => {
            var top = 50

            if (topRibbonVisible)
                top = parseInt(top) + parseInt(controls.topRibbon.height)

            if (window.scrollY >= top)
                setAnimateNavBar('animateNavBar')
            else setAnimateNavBar('')
        }

        controls && controls.topRibbon &&
            window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)

    }, [controls, topRibbonVisible])

    const closeSearchContainer = e => {
        setSearchContainerVisible(false)
        setSearchKeyword('')
        setAnimateSearchContainer('')
    }
    const searchContStyle = { paddingTop: '1rem' }

    return (
        <div>
            {navigationBar &&
                <div className='navigation-bar'>
                    <div className={'navigation-bar-container ' + animateNavBar} style={topRibbonVisible && window.innerWidth <= 700 ? searchContStyle : {}}>
                        <div className='nav-category-container'>
                            <div className='nav-category-icon'>
                                <AppstoreOutlined className='category-icon' />
                            </div>
                            <div className='nav-category-header'>{navigationBar.mainHeader.title}</div>
                            <div className='nav-category-border'></div>
                        </div>
                        <div className='nav-headers'>
                            <div className='nav-headers-container'
                                onMouseLeave={e => {
                                    /*setMouseOver(false)*/
                                    setAnimateNavHeader('')
                                }}>
                                {navigationBar.headers.content.map(header => (
                                    <div className='nav-header' key={header._id}
                                        onMouseLeave={(e) => {
                                            if (e.pageX < mouseXCoordinate) {
                                                setReverse(animateNavHeader - 1)
                                            } else setReverse(animateNavHeader)
                                        }}
                                        onMouseEnter={e => {
                                            setAnimateNavHeader(navigationBar.headers.content.indexOf(header))
                                            setMouseXCoordinate(e.pageX)
                                        }}>
                                        {header.title}
                                        <div className={'header-border-bottom ' + (
                                            reverse === navigationBar.headers.content.indexOf(header)
                                                ? 'right ' : 'left ') +
                                            (animateNavHeader === navigationBar.headers.content.indexOf(header)
                                                ? 'animate-border-bottom' : '')}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='nav-search-container'>
                            <div className='nav-search-bar'>
                                <div className='nav-search-icon'>
                                    <FontAwesomeIcon icon={faSearch} className='search-icon' />
                                </div>
                                <input type='text' className='nav-search-text'
                                    onClickCapture={e => {
                                        setSearchContainerVisible(true)
                                        setAnimateSearchContainer('animate-search-container')
                                    }}
                                    value={searchKeyword || ''} onChange={e => setSearchKeyword(e.target.value)}
                                    placeholder='Search for product, brand, category...'></input>
                                <div className='nav-search-close-icon'
                                    onClick={closeSearchContainer} >
                                    <FontAwesomeIcon icon={faTimes} className='close-icon' />
                                </div>
                                {searchContainerVisible &&
                                    <div className={'nav-search-help ' + animateSearchContainer}>
                                        <div className='nav-search-bar-container'>
                                            <div className='nav-search-icon'>
                                                <FontAwesomeIcon icon={faSearch} className='search-icon' />
                                            </div>
                                            <input type='text' className='nav-search-text text-input'
                                                placeholder='Search for product, brand, category...'></input>
                                            <div className='nav-search-close-icon'
                                                onClick={closeSearchContainer}
                                                value={searchKeyword || ''}
                                                onChange={e => setSearchKeyword(e.target.value)} >
                                                <FontAwesomeIcon icon={faTimes} className='close-icon' />
                                            </div>
                                        </div>
                                        <div className='search-bar-border-bottom'></div>
                                        <div className='search-bar-help-cont'>
                                            <div className='search-bar-help-title'>Trending: </div>
                                            <div className='nav-search-help-words'>
                                                {navigationBar.searchBar.mostSearchedWords.map(word => (
                                                    <div className='nav-search-help-word'>{word}</div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>}
            <div className='navigation-height'></div>
        </div>
    )
}

export default NavigationBar