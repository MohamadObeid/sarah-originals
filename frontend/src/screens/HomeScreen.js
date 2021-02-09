import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View } from "./Components/View";
import { saveControls, getControls, deleteControls } from "../actions/controlsActions";
import { saveStyles, deleteStyles, getStyles, } from "../actions/stylesActions";
import { magicBoxStyles } from '../constants/magicBoxStyles'
import { Controls } from '../constants/defaultControls'
import {
  defaultMagicBoxStyles, defaultTitleStyles,
  defaultAddToCartStyles
} from "../constants/defaults";

const HomeScreen = (props) => {
  const dispatch = useDispatch()
  const { controls } = useSelector(state => state.controls)
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

    // get initials requests
    dispatch(getStyles({ name: 'Default Desktop AddToCart Styles', type: 'AddToCart' }))
    dispatch(getStyles({ name: 'Default Desktop Title Styles', type: 'Title' }))
    dispatch(getStyles({ name: 'Default Desktop MagicBox Styles', type: 'MagicBox' }))
    //dispatch(getStyles({ type: 'MagicBox' }))
    dispatch(getControls({ limit: 11 }))

    // save requests
    dispatch(saveControls(Controls))
    dispatch(saveStyles([...magicBoxStyles, defaultMagicBoxStyles, defaultTitleStyles, defaultAddToCartStyles]))

    // delete requests
    //dispatch(deleteStyles({ type: 'MagicBox', name: '2controlBox' }))
    //dispatch(deleteControls({ deleteAll: true }))
  }, [])

  return controls.HomeScreen
    ? controls.HomeScreen.map((view, index) =>
      view.styles[viewPort] &&
      <View view={view} viewPort={viewPort} key={index} touchScreen={touchScreen} />
    ) : <></>
}

export default HomeScreen;
