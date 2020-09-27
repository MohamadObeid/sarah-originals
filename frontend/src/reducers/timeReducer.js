import { CURRENT_TIME, GET_CURRENT_TIME } from "../constants/constants"
import { weekDays } from '../constants/lists'

function timeReducer(state = { time: undefined }, action) {
    if (action.type === GET_CURRENT_TIME) {
        var d = new Date()
        return {
            time: {
                currentWeekDay: weekDays[d.getDay()],
                currentHour: d.getHours(),
                currentMinutes: d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes(),
                currentSeconds: d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds(),
            }
        }
    } else return state
}

function clockReducer(state = { time: undefined }, action) {
    switch (action.type) {
        case CURRENT_TIME:
            return {
                loading: false,
                time: action.payload,
            };
        default:
            return state;
    }
}
export { timeReducer, clockReducer }