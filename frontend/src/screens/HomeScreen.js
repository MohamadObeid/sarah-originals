import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from 'react-fontawesome'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import { addToCart, removeFromCart, updateCart } from "../actions/cartActions";
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { View } from "./Components/View";
import { NavigationBar } from "./Components/NavigationBar";

const HomeScreen = props => {
  const imageUrl = window.location.origin + '/api/uploads/image/'

  const [actionNote, setActionNote] = useState('Product Added Succefully')
  const [actionNoteVisible, setActionNoteVisible] = useState(false);
  const [timeOut, setTimeOut] = useState()
  const [products, setProducts] = useState([])
  const [navigationBar, setNavigationBar] = useState()

  const { cartItems, message } = useSelector(state => state.cart)
  const { controls } = useSelector(state => state.controls)

  const dispatch = useDispatch()

  /*useEffect(() => {
    if (message) {
      setActionNote(message)
      setActionNoteVisible(true)
      clearTimeout(timeOut)
      setTimeOut(setInterval(() => {
        setActionNoteVisible(false)
      }, 5000))
      dispatch({ type: 'CLEAR_MESSAGE', payload: cartItems }) // clear message
    }
  }, [cartItems])*/

  const [viewPort, setViewPort] = useState(window.innerWidth <= 700 ? 'mobile' : 'desktop')
  var touchscreen

  useEffect(() => {
    window.addEventListener("resize", function () {
      if (window.innerWidth <= 700) setViewPort('mobile')
      else setViewPort('desktop')
    })
    if (window.matchMedia("(pointer: coarse)").matches) {
      console.log('touchscreen')
      touchscreen = true
    } else touchscreen = false
  }, [])


  // Toggle Handler
  /*const toggleCartBtns = (product) => {
    if (product.qty === 0) {
      product.AddToCartClass = 'show';
      product.PlusMinusClass = 'hide';
    } else if (product.qty > 0) {
      product.AddToCartClass = 'hide';
      product.PlusMinusClass = 'show';
    }
  }*/

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

  //////////////// Navigation Bar ////////////////

  const [actionNoteTop, setActionNoteTop] = useState('0.5rem')

  const Views = () =>
    controls.HomeScreen
      ? controls.HomeScreen.map((view, index) =>
        view.styles[viewPort] &&
        view.active && <View view={view} viewPort={viewPort} key={index} touchscreen={touchscreen} />
      ) : <></>

  //////////////////////////////////// Slide Ribbon Props ///////////////////////////////////

  /*const swiper = {
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

      const ribbonWidth = !viewPort
        ? slideRibbon.ribbon.width
        : slideRibbon.mobile.ribbon.width

      const slideWidth = !viewPort
        ? slideRibbon.slide.width
        : slideRibbon.mobile.slide.width

      const imgHeight = !viewPort
        ? slideRibbon.image.maxHeight
        : slideRibbon.mobile.image.maxHeight

      const imgWidth = !viewPort
        ? slideRibbon.image.maxWidth
        : slideRibbon.mobile.image.maxWidth

      const imgContWidth = !viewPort
        ? slideRibbon.image.containerWidth
        : slideRibbon.mobile.image.containerWidth

      const imgContHeight = !viewPort
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
        imgContStyle, imgStyle, slideTitleContStyle, swiper, titleStyle, viewPort
      })
    }

  }, [controls, viewPort])*/

  return (
    <>
      {actionNoteVisible &&
        <div style={{ top: actionNoteTop }} className="action-note">
          <div>{actionNote}</div>
          <div className='faTimes-action-note'>
            <FontAwesomeIcon icon={faTimes} onClick={e => setActionNoteVisible(false)} />
          </div>
        </div>}

      {/*actions.quickView &&
        <div className="quick-view-overlay">
          {QuickView(actions.quickView.product)}
        </div>
      */}

      {/*controls && controls.navigationBar && <NavigationBar navigationBar={controls.navigationBar} />*/}
      <Views />
    </>
  );
}

export default HomeScreen;
