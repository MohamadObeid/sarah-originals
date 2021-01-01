import React, { useEffect, useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listHomePageViews } from "../actions/viewsActions";
import FontAwesome from 'react-fontawesome'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faStar } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import { addToCart, removeFromCart, updateCart } from "../actions/cartActions";
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Swiper from 'react-id-swiper';
import { ImageBox } from "./Components/ImageBox";
import { NavigationBar } from "./Components/NavigationBar";
//import ScrollBox from './Components/ScrollBox';

const HomeScreen = React.memo(props => {
  const imageUrl = window.location.origin + '/api/uploads/image/'

  const [actionNote, setActionNote] = useState('Product Added Succefully')
  const [actionNoteVisible, setActionNoteVisible] = useState(false);
  const [timeOut, setTimeOut] = useState()
  const [products, setProducts] = useState([])
  const [navigationBar, setNavigationBar] = useState()

  const { views, loading } = useSelector(state => state.views)
  const { cartItems, message } = useSelector(state => state.cart);
  const { controls, loading: loadingControls } = useSelector(state => state.controls)
  const actions = useSelector(state => state.actions)

  const dispatch = useDispatch()
  useEffect(() => {
    if (Object.keys(controls).length > 0) {
      setNavigationBar(controls.navigationBar)

      if (controls.homePageViews)
        dispatch(listHomePageViews({ views: controls.homePageViews }))
      document.getElementsByTagName('HTML')[0].style.backgroundColor = controls.backgroundColor
    }
  }, [controls])

  useEffect(() => {
    if (views.length > 0) {

      const productList = views
        .filter(view => view.type === 'Product Box')
        .map(view => {
          view.products.map(product => delete product['qty'])
          return view.products
        }).flat()

      setProducts(productList)

      cartItems.map(item => {
        productList
          .filter(product => product._id == item._id)
          .map(product => {
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
      setTimeOut(setInterval(() => {
        setActionNoteVisible(false)
      }, 5000))
      dispatch({ type: 'CLEAR_MESSAGE', payload: cartItems }) // clear message
    }
  }, [cartItems])

  const [mobileScreen, setMobileScreen] = useState(window.innerWidth <= 700 ? true : false)

  useEffect(() => {
    window.addEventListener("resize", function () {
      if (window.innerWidth <= 700) setMobileScreen(true)
      else setMobileScreen(false)
    })
  }, [])

  //const mobileScreen = window.innerWidth <= 700 ? true : false

  // Add to Cart Handler
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

  //Minus Handler
  const handleMinus = (product, e) => {
    const productList = products.filter(pro => product._id == pro._id)
    productList.map(pro => {
      pro.qty--
      toggleCartBtns(pro)
    })

    if (product.qty === 0) dispatch(removeFromCart({ _id: product._id, message: 'Product Removed Successfully!' }))
    else dispatch(updateCart({ _id: product._id, qty: product.qty }))
  }

  // Plus Handler
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
      dispatch(updateCart({ _id: product._id, qty: product.qty, message: 'Product Added Successfully!' }))

    } else dispatch(updateCart({ _id: product._id, message: 'Only ' + product.qty + product.unit + ' ' + product.nameEn + ' are available in stock!' }))
  }

  // Toogle Handler
  const toggleCartBtns = (product) => {
    if (product.qty === 0) {
      product.AddToCartClass = 'show';
      product.PlusMinusClass = 'hide';
    } else if (product.qty > 0) {
      product.AddToCartClass = 'hide';
      product.PlusMinusClass = 'show';
    }
  }

  // Product Quick View
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

  // Product Quick View Handler
  const handleQuickView = (product) => {
    dispatch({ type: 'UPDATE_ACTIONS', payload: { quickView: { product } } })
    window.addEventListener('click', (e) => {
      const quickViewOverlay = document.querySelector('.quick-view-overlay')
      if (e.target === quickViewOverlay) {
        dispatch({ type: 'REMOVE_FROM_ACTIONS', payload: 'quickView' })
      }
    })
  }

  // Add to Cart Btns design 1
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

  // Add to Cart Btns design 2
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

  // Add to Cart Btns Designs Handler
  const AddToCartBtns = (product) => {
    return (
      controls.addToCartBtnsStyle === 'Bottom-Center'
        ? BottomCenterBtnsDesign(product)
        : controls.addToCartBtnsStyle === 'Right-Top'
          ? RightTopBtnsDesign(product)
          : <></>
    )
  }

  // Product Slide View
  const ProductSlide = (view) => {
    return (
      view.products.map((product) => (
        <div className="product" key={product._id} style={{ backgroundColor: '#fff' }}>
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
              onLoad={e => { e.currentTarget.previousSibling.classList.add('hide') }}
              onClick={() => handleQuickView(product)} />
          </div>
          <div className='product-details-container'>
            <div className="product-name">
              <Link to={"/product/" + product._id}>{product.nameEn}</Link>
            </div>
            {/*Done*/}
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

  //////////////// Navigation Bar ////////////////

  const [actionNoteTop, setActionNoteTop] = useState('0.5rem')

  const Views = () => {
    return (views.map(view =>
      (view.type === 'Image Box' || view.type === 'Product Box')
        ? controls.imageBox.find(box => box.name === view.name) &&
        <ImageBox imageBox={controls.imageBox.find(box => box.name === view.name)} mobileScreen={mobileScreen} products={view.products || false} />
        : <></>
    ))
  }

  //////////////////////////////////// Slide Ribbon Props ///////////////////////////////////

  const swiper = {
    slidesOffsetAfter: 0,
    freeMode: true,
    grabCursor: true,
    slidesPerView: 'auto',
  }

  const [imageBoxCategories, setimageBoxCategories] = useState()

  useEffect(() => {

    if (controls.slideRibbon) {
      const slideRibbon = controls.slideRibbon[0]
      const slideBorder = slideRibbon.slide.border + ' solid #f9f9f9'
      const slideBackgroundColor = slideRibbon.slide.backgroundColor
      const slideFlexDirection = slideRibbon.slide.flexDirection
      const slideTitleJustify = slideRibbon.slide.title.justifyContent
      const titleBackgroundColor = slideRibbon.title.backgroundColor
      const slideTitleDisplay = slideRibbon.slide.title.display

      const ribbonWidth = !mobileScreen
        ? slideRibbon.ribbon.width
        : slideRibbon.mobile.ribbon.width

      const slideWidth = !mobileScreen
        ? slideRibbon.slide.width
        : slideRibbon.mobile.slide.width

      const imgHeight = !mobileScreen
        ? slideRibbon.image.maxHeight
        : slideRibbon.mobile.image.maxHeight

      const imgWidth = !mobileScreen
        ? slideRibbon.image.maxWidth
        : slideRibbon.mobile.image.maxWidth

      const imgContWidth = !mobileScreen
        ? slideRibbon.image.containerWidth
        : slideRibbon.mobile.image.containerWidth

      const imgContHeight = !mobileScreen
        ? slideRibbon.image.containerHeight
        : slideRibbon.mobile.image.containerHeight


      ////////////////////////////////Styles/////////////////////////////////////

      const RibbonContStyle = { width: ribbonWidth }
      const slideSwiperContStyle = { maxWidth: ribbonWidth, minWidth: ribbonWidth }
      const slideContStyle = { maxWidth: slideWidth, minWidth: slideWidth, border: slideBorder, backgroundColor: slideBackgroundColor, flexDirection: slideFlexDirection }
      const imgContStyle = { width: imgContWidth, height: imgContHeight }
      const imgStyle = { maxWidth: imgWidth, maxHeight: imgHeight }
      const slideTitleContStyle = { justifyContent: slideTitleJustify, display: slideTitleDisplay }
      const titleStyle = {
        color: { color: titleBackgroundColor },
        backgroundColor: { backgroundColor: titleBackgroundColor },
      }

      setimageBoxCategories({
        slideRibbon, imageUrl, RibbonContStyle, slideSwiperContStyle, slideContStyle,
        imgContStyle, imgStyle, slideTitleContStyle, swiper, titleStyle, mobileScreen
      })
    }

  }, [controls, mobileScreen])

  return (controls && !loadingControls &&
    <>
      {actionNoteVisible &&
        <div style={{ top: actionNoteTop }} className="action-note">
          <div>{actionNote}</div>
          <div className='faTimes-action-note'>
            <FontAwesomeIcon icon={faTimes} onClick={e => setActionNoteVisible(false)} />
          </div>
        </div>}

      {actions.quickView &&
        <div className="quick-view-overlay">
          {QuickView(actions.quickView.product)}
        </div>
      }

      {navigationBar && <NavigationBar navigationBar={navigationBar} />}

      {views.length > 0 && !loading && Views()}
    </>
  );
})

export default HomeScreen;
