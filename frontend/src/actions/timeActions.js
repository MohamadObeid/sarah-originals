import { CURRENT_TIME } from '../constants/constants'

const clock = () => (dispatch) => {
    const time = new Date().toLocaleString()
    dispatch({ type: CURRENT_TIME, payload: time })
}

export { clock }