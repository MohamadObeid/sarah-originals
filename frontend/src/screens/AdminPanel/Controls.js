import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getControls, saveControls } from '../../actions/controlsActions'

function Controls() {
    const [productControl, setProductControl] = useState()

    const { controls } = useSelector(state => state.controls)
    const { userInfo } = useSelector(state => state.userSignin)

    useEffect(() => { })

    return (<div>

    </div>)
}

export default Controls