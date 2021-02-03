import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View } from "./Components/View";
import { NavigationBar } from "./Components/NavigationBar";

const HomeScreen = props => {
  const [navigationBar, setNavigationBar] = useState()
  const { controls } = useSelector(state => state.controls)

  const dispatch = useDispatch()

  const [viewPort, setViewPort] = useState(window.innerWidth <= 700 ? 'mobile' : 'desktop')
  var touchScreen

  useEffect(() => {
    window.addEventListener("resize", function () {
      if (window.innerWidth <= 700) setViewPort('mobile')
      else setViewPort('desktop')
    })
    if (window.matchMedia("(pointer: coarse)").matches) {
      console.log('touchScreen')
      touchScreen = true
    } else touchScreen = false
  }, [])

  //////////////// Navigation Bar ////////////////

  const Views = () =>
    controls.HomeScreen
      ? controls.HomeScreen.map((view, index) =>
        view.styles[viewPort] &&
        view.active && <View view={view} viewPort={viewPort} key={index} touchScreen={touchScreen} />
      ) : <></>

  //////////////////////////////////// Slide Ribbon Props ///////////////////////////////////

  /*const [imageBoxCategories, setimageBoxCategories] = useState()

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
      {/*actions.quickView &&
        <div className="quick-view-overlay">
          {QuickView(actions.quickView.product)}
        </div>
      */}
      <Views />
    </>
  );
}

export default HomeScreen;
