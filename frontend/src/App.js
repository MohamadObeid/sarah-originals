import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// data
import { websiteData } from "./data/websiteData"
// actions
import { deleteWebsite, getWebsites, saveWebsites } from "./actions/websiteActions"
// methods
import { screenProps, website } from './methods/methods'
// components
import { Website } from "./screens/Components/Website"

const App = () => {

  ///////////////////// Hooks ///////////////////////

  const [websites, setWebsites] = useState([])
  const [viewPort, setViewPort] = useState(window.innerWidth <= 700 ? 'mobile' : 'desktop')
  const [touchScreen, setTouchScreen] = useState(window.matchMedia("(pointer: coarse)").matches)

  const dispatch = useDispatch()

  useSelector(state => {
    if (websites.length === 0)
      if (state.websites) {
        const existingSites = state.websites.filter(site => site.name === website)
        if (existingSites.length > 0) setWebsites(existingSites)
      }
  })

  useEffect(() => {
    // list sites
    dispatch(getWebsites({ name: website }))

    // viewPort & touchScreen
    screenProps(viewPort, setViewPort, touchScreen, setTouchScreen)

    // save data
    dispatch(saveWebsites(websiteData))

  }, [viewPort])

  ///////////////////// DOM ///////////////////////

  return websites.map((website, index) =>
    <Website key={index}
      website={website}
      viewPort={viewPort}
      touchScreen={touchScreen}
    />)
}

export default App