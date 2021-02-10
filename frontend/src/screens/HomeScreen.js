import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View } from "./Components/View";
import { saveControls, getControls, deleteControls } from "../actions/controlsActions";
import { saveStyles, deleteStyles, getStyles, } from "../actions/stylesActions";
import { magicBoxStyles } from '../constants/magicBoxStyles'
import { Controls } from '../constants/defaultControls'
import { defaultMagicBoxStyles, defaultTitleStyles, defaultAddToCartStyles } from "../constants/defaults";

const HomeScreen = (props) => {
  const dispatch = useDispatch()
  const HomeScreen = useSelector(state => state.controls.HomeScreen)
  const { styles } = useSelector(state => state.styles)
  const [viewPort, setViewPort] = useState(window.innerWidth <= 700 ? 'mobile' : 'desktop')
  var touchScreen

  useEffect(() => {

    window.addEventListener("resize", function () {
      if (window.innerWidth <= 700) setViewPort('mobile')
      else setViewPort('desktop')
    })

    if (window.matchMedia("(pointer: coarse)").matches) {
      touchScreen = true
    } else touchScreen = false

    // get initials requests
    dispatch(getStyles({ name: 'Default Desktop AddToCart Styles', type: 'AddToCart', viewPort }))
    dispatch(getStyles({ name: 'Default Desktop Title Styles', type: 'Title', viewPort }))
    dispatch(getStyles({ name: 'Default Desktop MagicBox Styles', type: 'MagicBox', viewPort }))
    //dispatch(getStyles({ type: 'MagicBox' }))
    dispatch(getControls({ fields: 'HomeScreen' }))

    // save requests
    //dispatch(saveControls(Controls))
    //dispatch(saveStyles([...magicBoxStyles, defaultMagicBoxStyles, defaultTitleStyles, defaultAddToCartStyles]))

    // delete requests
    //dispatch(deleteStyles({ type: 'MagicBox', name: '2controlBox' }))
    //dispatch(deleteControls({ deleteAll: true }))
  }, [])

  return HomeScreen
    ? HomeScreen.map((view, index) =>
      view.styles[viewPort] &&
      <View view={view} viewPort={viewPort} key={index} touchScreen={touchScreen} />
    ) : <div>{viewPort}</div>
}

export default HomeScreen;
