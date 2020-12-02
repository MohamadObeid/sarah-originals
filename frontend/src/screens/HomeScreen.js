import React, { useEffect, useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listHomePageViews } from "../actions/viewsActions";
import HeroBanners from "./Components/HeroBanners";
import { SlideRibbon } from './Components/SlideRibbon'
import FontAwesome from 'react-fontawesome'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faStar } from "@fortawesome/free-solid-svg-icons"
import Swiper from 'react-id-swiper'
import { Link } from "react-router-dom"
import { swiper } from '../constants/defaultControls'
import { addToCart, removeFromCart, updateCart } from "../actions/cartActions"; import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { AppstoreOutlined } from '@ant-design/icons';

function HomeScreen(props) {
  const imageUrl = window.location.origin + '/api/uploads/image/'

  const [actionNote, setActionNote] = useState('Product Added Succefully');
  const [actionNoteVisible, setActionNoteVisible] = useState(false);
  const [timeOut, setTimeOut] = useState()
  const [products, setProducts] = useState([])

  const { views, loading } = useSelector(state => state.views)
  const { cartItems, message } = useSelector(state => state.cart);
  const { controls, loading: loadingControls } = useSelector(state => state.controls)
  const actions = useSelector(state => state.actions)

  const dispatch = useDispatch()
  useEffect(() => {
    if (Object.keys(controls).length > 0) {
      if (searchContainerVisible) {
        const input = document.querySelector('.text-input')
        input.focus() // move cursor to text-input
      }
      setNavigationBar(controls.navigationBar)

      if (controls.homePageCollections)
        dispatch(listHomePageViews({ collections: controls.homePageCollections, limit: 10 }))
    }
  }, [controls])

  useEffect(() => {
    if (views.length > 0) {
      setProducts(views.map(view => {
        return view.products
      }).flat())

      cartItems.map(item => {
        const similarProducts = products.filter(product => product._id == item._id)
        similarProducts.map(product => {
          if (item.qty > product.countInStock) item.qty = product.countInStock
          product.qty = item.qty
          product.animate = true
          toggleCartBtns(product)
        })
      })
    }
  }, [views])

  useEffect(() => {
    if (message) {
      setActionNote(message)
      setActionNoteVisible(true)
      clearTimeout(timeOut)
      setTimeOut(setInterval(() => setActionNoteVisible(false), 5000))
    }

  }, [cartItems])

  const handleAddToCart = (product) => {

    const productList = products.filter(pro => product._id == pro._id)
    productList.map(pro => {
      pro.qty = 1
      toggleCartBtns(pro)
    })

    const inCart = cartItems.find(item => item._id === product._id)
    if (inCart) dispatch(updateCart({ _id: product._id, qty: product.qty, message: 'Product Added Successfully!' }))
    else dispatch(addToCart({ _id: product._id, qty: product.qty, message: 'Product Added Successfully!' }))
  }

  const handleMinus = (product, e) => {
    const productList = products.filter(pro => product._id == pro._id)
    productList.map(pro => {
      pro.qty--
      toggleCartBtns(pro)
    })

    if (product.qty === 0) dispatch(removeFromCart({ _id: product._id, message: 'Product Removed Successfully!' }))
    else dispatch(updateCart({ _id: product._id, qty: product.qty }))
  }

  const handlePlus = (product, e) => {
    if ((!product.qty || product.qty === 0) && product.countInStock > 0) {
      const productList = products.filter(pro => product._id == pro._id)
      productList.map(pro => {
        pro.qty = 1
        toggleCartBtns(pro)
      })

      dispatch(addToCart({ _id: product._id, qty: product.qty, message: 'Product Added Successfully!' }))

    } else if (product.countInStock > product.qty) {
      const productList = products.filter(pro => product._id == pro._id)
      productList.map(product0 => product0.qty++)
      dispatch(updateCart({ _id: product._id, qty: product.qty, message: 'Product Added Succefully!' }))

    } else dispatch(updateCart({ _id: product._id, message: 'Only ' + product.qty + product.unit + ' ' + product.nameEn + ' are available in stock!' }))
  }

  const toggleCartBtns = (product) => {
    if (product.qty === 0) {
      product.AddToCartClass = 'show';
      product.PlusMinusClass = 'hide';
    } else if (product.qty > 0) {
      product.AddToCartClass = 'hide';
      product.PlusMinusClass = 'show';
    }
  }

  const QuickView = (product) => {

    return (
      <div className="quick-view-container">
        <div className="quick-view-product">
          {product.discount > 0 &&
            <div className='product-discount pdqv'>
              <div>{product.discount}%</div>
            </div>}
          <div className="quick-view-image">
            <img src={imageUrl + product.image} alt="product" />
          </div>
          <div className='quick-view-details'>
            <table className='quick-view-table'>
              <tbody>
                <tr>
                  <th>Name</th>
                  <td className='quick-view-header'>{product.nameEn}</td>
                </tr>
                <tr>
                  <th>Brand</th>
                  <td className='quick-view-brand'>{product.brand}</td>
                </tr>
                <tr>
                  <th>Price</th>
                  <td className='quick-view-price'>${product.priceUsd}
                    <div className='quick-view-unit'>/{product.unit}</div>
                  </td>
                </tr>
                <tr>
                  <th>Rate</th>
                  <td>{product.rating} Stars</td>
                </tr>
                <tr>
                  <th>Reviews</th>
                  <td>{product.numReviews}</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>{product.description}</td>
                </tr>
              </tbody>
            </table>
            <div className="product-add-to-cart">
              <button
                type="button"
                className={`add-to-cart-btn ${product.AddToCartClass}`}
                value={product._id}
                onClick={() => handleAddToCart(product)}>
                Add To Cart
              </button>
              <div className={`add-to-cart-btns hide ${product.PlusMinusClass}`}>
                <button
                  type="button"
                  className="minus"
                  onClick={(e) => handleMinus(product, e)}>
                  <FontAwesome name='fa-minus' className="fas fa-minus" />
                </button>
                <p className="add-to-cart-qty">{product.qty}</p>
                <button
                  type="button"
                  className="plus"
                  onClick={() => handlePlus(product)}>
                  <FontAwesome name='fa-plus' className="fas fa-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="quick-view-bar">
          <div>Add to WishList</div>
          <div>More Details</div>
        </div>
      </div>
    )
  }

  const handleQuickView = (product) => {
    dispatch({ type: 'UPDATE_ACTIONS', payload: { quickView: { product } } })
    window.addEventListener('click', (e) => {
      const quickViewOverlay = document.querySelector('.quick-view-overlay')
      if (e.target === quickViewOverlay) {
        dispatch({ type: 'REMOVE_FROM_ACTIONS', payload: 'quickView' })
      }
    })
  }

  const BottomCenterBtnsDesign = (product) => {
    return (
      <div className="product-add-to-cart">
        <button
          type="button"
          className={`add-to-cart-btn ${product.AddToCartBtnsClass}`}
          value={product._id}
          onClick={() => dispatch(handleAddToCart(product))}>
          Add To Cart
                </button>
        <div className={`add-to-cart-btns hide ${product.PlusMinusClass}`}>
          <button
            type="button"
            className="minus"
            onClick={(e) => handleMinus(product, e)}>
            <FontAwesome name='fa-minus' className="fas fa-minus" />
          </button>
          <p className="add-to-cart-qty show-qty">{product.qty}</p>
          <button
            type="button"
            className="plus show-plus"
            onClick={() => handlePlus(product)}>
            <FontAwesome name='fa-plus' className="fas fa-plus" />
          </button>
        </div>
      </div>
    )
  }

  const RightTopBtnsDesign = (product) => {
    return (
      <>
        <div className='product-plus' onClick={(e) => handlePlus(product, e)}>
          <FontAwesome name='fa-plus' className="fas fa-plus" />
        </div>
        <div>
          <div className={'product-new-qty right-qty-btn-transform ' +
            (product.qty >= 1 ? 'animate' : '')}>
            {product.qty}
          </div>
          <div className={'product-minus right-minus-btn-transform ' +
            (product.qty >= 1 ? 'animate' : '')}
            onClick={(e) => handleMinus(product, e)}>
            <FontAwesome name='fa-minus' className="fas fa-minus" />
          </div>
        </div>
      </>
    )
  }

  const AddToCartBtns = (product) => {
    return (
      controls.addToCartBtnsStyle === 'Bottom-Center'
        ? BottomCenterBtnsDesign(product)
        : controls.addToCartBtnsStyle === 'Right-Top'
          ? RightTopBtnsDesign(product)
          : <></>
    )
  }

  const ProductSlide = (view) => {
    return (
      view.products.map(product => (
        <div className="product" key={product._id}>
          {product.countInStock === 0 && <div className="product-out-of-stock"></div>}
          {product.discount > 0 &&
            <div className='product-discount'>
              <div>{product.discount}</div>
              <div>%</div>
            </div>
          }
          <div className="product-image">
            <div className='title-skeleton'>Sarah Originals</div>
            <img src={imageUrl + product.image} alt="product"
              onClick={() => handleQuickView(product)} />
          </div>
          <div className='product-details-container'>
            <div className="product-name">
              <Link to={"/product/" + product._id}>{product.nameEn}</Link>
            </div>
            <div className="product-brand">{product.brand}</div>
            <div className="product-price">
              <div className={product.discount > 0 ? 'before-discount' : ''}>${product.priceUsd}</div>
              {product.discount > 0 &&
                <div className='after-discount'>${Math.round(100 * (product.priceUsd - product.priceUsd * product.discount / 100)) / 100}</div>
              }
              <div className='product-review-container'>
                <FontAwesomeIcon icon={faStar} className='faStar' />
                <div className='product-review'>4.5</div>
                <div className='product-review-qty'>(21)</div>
              </div>
            </div>
          </div>
          {AddToCartBtns(product)}
        </div>)))
  }

  ////////////////////////////////////////////////
  //////////////// Navigation Bar ////////////////

  const [animateNavBar, setAnimateNavBar] = useState('')
  const [searchContainerVisible, setSearchContainerVisible] = useState()
  const [searchKeyword, setSearchKeyword] = useState('')
  const [animateSearchContainer, setAnimateSearchContainer] = useState('')
  const [animateNavHeader, setAnimateNavHeader] = useState('')
  const [navigationBar, setNavigationBar] = useState()
  const [mouseXCoordinate, setMouseXCoordinate] = useState(false)
  const [reverse, setReverse] = useState(false)

  const topRibbonVisible = useSelector(state => state.topRibbonVisible)

  useEffect(() => {
    if (navigationBar) setVariables(controls.navigationBar)
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

  const NavigationBar = () => {
    return (
      <>
        <div className='navigation-bar'>
          <div className={'navigation-bar-container ' + animateNavBar} style={topRibbonVisible && window.innerWidth <= 700 ? { paddingTop: '1rem' } : {}}>
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
        </div>
        <div className='navigation-height'></div>
      </>
    )
  }

  const ProductSwiper = () => {
    return (
      <>
        {actions.quickView &&
          <div className="quick-view-overlay">
            {QuickView(actions.quickView.product)}
          </div>
        }

        {views.map(view => (
          <div key={view.title}>
            <div className="products-slider-container">
              <div className='slider-container-title-line'>
                <div className='slider-container-title'>{view.title} Products</div>
                <div className='slider-container-show-all'>show all
                        <FontAwesomeIcon icon={faChevronRight} className='faChevronRight' /></div>
              </div>
              <div className="products">
                {view.products &&
                  view.products.length > 0 &&
                  (window.innerWidth > 700 ?
                    <Swiper {...swiper}>
                      {ProductSlide(view)}
                    </Swiper>
                    : <div className='mobile-swiper-container'>
                      {ProductSlide(view)}
                    </div>
                  )}
              </div>
            </div>
          </div>))}
      </>
    )
  }

  return (
    <>
      {actionNoteVisible &&
        <div className="action-note">
          <div>{actionNote}</div>
        </div>}

      {controls && !loadingControls &&
        <>
          {navigationBar && NavigationBar()}
          {SlideRibbon(controls)}
        </>
      }
      <HeroBanners />
      {views.length > 0 && !loading && ProductSwiper()}
    </>
  );
}

export default HomeScreen;
