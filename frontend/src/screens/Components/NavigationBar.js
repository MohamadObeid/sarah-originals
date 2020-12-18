import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { AppstoreOutlined } from '@ant-design/icons'

export const NavigationBar = React.memo(({ navigationBar }) => {

    const [animateNavBar, setAnimateNavBar] = useState('')
    const [searchContainerVisible, setSearchContainerVisible] = useState()
    const [searchKeyword, setSearchKeyword] = useState('')
    const [animateSearchContainer, setAnimateSearchContainer] = useState('')
    const [animateNavHeader, setAnimateNavHeader] = useState('')
    const [mouseXCoordinate, setMouseXCoordinate] = useState(false)
    const [reverse, setReverse] = useState(false)

    const { controls } = useSelector(state => state.controls)
    const actions = useSelector(state => state.actions)

    useEffect(() => {
        const handleScroll = () => {
            var topRibbon = 50

            if (actions.topRibbonVisible)
                topRibbon = topRibbon + parseInt(controls.topRibbon.height)

            if (window.scrollY >= topRibbon)
                setAnimateNavBar('animateNavBar')
            else
                setAnimateNavBar('')
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)

    }, [actions.topRibbonVisible])

    const navigationBarContainerStyle = {
        width: navigationBar.width,
        backgroundColor: navigationBar.backgroundColor,
        paddingTop: window.innerWidth <= 700 ? '1rem' : ''
    }

    const navHeaderStyle = {
        fontSize: navigationBar.headers.fontSize,
        padding: '1.5rem ' + navigationBar.headers.padding
    }

    const headerBorderStyle = { backgroundColor: navigationBar.headers.borderColor }

    useEffect(() => {
        if (searchContainerVisible) {
            const input = document.querySelector('.text-input')
            input.focus() // move cursor to text-input
        }
    }, [searchContainerVisible])

    const closeSearchContainer = () => {
        setSearchContainerVisible(false)
        setSearchKeyword('')
        setAnimateSearchContainer('')
    }

    return (
        <>
            <div className='navigation-bar'>
                <div className={'navigation-bar-container ' + animateNavBar}
                    style={navigationBarContainerStyle}>
                    <div className='nav-category-container'>
                        <div className='nav-category-icon'>
                            <AppstoreOutlined className='category-icon' />
                        </div>
                        <div className='nav-category-header'>{navigationBar.mainHeader.title}</div>
                        <div className='nav-category-border'></div>
                    </div>
                    <div className='nav-headers'>
                        <div className='nav-headers-container'
                            onMouseLeave={e => setAnimateNavHeader('')}>
                            {navigationBar.headers.content.map(header => (
                                <div className='nav-header' style={navHeaderStyle} key={header._id}
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
                                            ? 'animate-border-bottom' : '')} style={headerBorderStyle}></div>
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
            </div>
            <div className='navigation-height'></div>
        </>
    )
})
