import axios from 'axios'
import { months, weekDays } from '../constants/lists'
import cookie from "js-cookie";
import { listLiveUser, saveLiveUser } from '../actions/chatActions';
import audio from '../sounds/swiftly.mp3'
import UIfx from 'uifx';
import { LIVE_USER_LIST_SUCCESS } from '../constants/constants';
const tick = new UIfx(audio)

const dayConverter = (date, active) => {
    var d = new Date()
    var currentYear = d.getFullYear()
    var currentMonthNum = d.getMonth() + 1
    var currentMonth = months[d.getMonth()]
    var currentDay = d.getDate()
    var currentWeekDay = weekDays[d.getDay()]
    var currentHour = d.getHours()
    var currentMinutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
    var currentSeconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
    //console.log(date)

    if (date) {
        var dateNum = date.split("T", 1)[0]
        var time = date.slice(date.indexOf('T') + 1, -1).slice(0, 9)
        var dateDay = parseInt(dateNum.slice(8, 10))
        var dateMonth = parseInt(dateNum.slice(5, 7))
        var dateYear = parseInt(dateNum.slice(0, 4))
        var timeHour = parseInt(time.slice(0, 2))
        var timeMin = parseInt(time.slice(3, 5))
        var timeSec = parseInt(time.slice(6, 8))

        var secDiff = currentSeconds - timeSec
        var minDiff = currentMinutes - timeMin
        var hourDiff = currentHour - timeHour
        var dayDiff = currentDay - dateDay
        var monthDiff = currentMonthNum - dateMonth
        var yearDiff = currentYear - dateYear

        var secStatus = secDiff <= 1 ? 'Online' : secDiff + ' sec ago'

        var minStatus = minDiff === 1
            ? (secDiff >= 0 ? 'Last minute' : 60 + secDiff + ' sec ago')
            : Math.abs(minDiff) + ' min ago'

        var hourStatus = hourDiff === 1
            ? (minDiff >= 0 ? 'Last hour' : 60 + minDiff + ' mins ago')
            : Math.abs(hourDiff) + ' hours ago'

        var dayStatus = dayDiff === 1
            ? (hourDiff >= 0 ? 'Yesterday' : 24 + hourDiff + ' hours ago')
            : Math.abs(dayDiff) + ' days ago'

        var monthStatus = monthDiff === 1
            ? (dayDiff >= 0 ? 'Last month' : 30 + dayDiff + ' days ago')
            : Math.abs(monthDiff) + ' months ago'
        var yearStatus = yearDiff === 1
            ? (monthDiff >= 0 ? 'Last year' : 12 + monthDiff + ' months ago')
            : yearDiff + ' years ago'

        var status = 'Online'

        if (!active) {
            if (yearDiff === 0) {
                if (monthDiff === 0) {
                    if (dayDiff === 0) {
                        if (hourDiff === 0) {
                            if (minDiff === 0) {
                                status = secStatus
                            } else status = minStatus
                        } else status = hourStatus
                    } else status = dayStatus
                } else status = monthStatus
            } else status = yearStatus
        }

        return status
    }
}

const timeDiffCalc = (from, to, nextDay) => { //time format ex.: 01:20
    var fromHour = parseInt(from.slice(0, 2))
    var fromMin = parseInt(from.slice(3, 5))
    var toHour = parseInt(to.slice(0, 2))
    var toMin = parseInt(to.slice(3, 5))
    //console.log(from, to)

    if (fromHour === toHour) {
        if (toMin > fromMin) { return '00:' + ((toMin - fromMin) < 10 ? '0' + (toMin - fromMin) : (toMin - fromMin)) }
        else if (toMin < fromMin) { return { sign: 'late', diff: '00:' + ((fromMin - toMin) < 10 ? '0' + (fromMin - toMin) : (fromMin - toMin)) } }
        else if (toMin === fromMin) return '00:00'
    } else if (toHour > fromHour) {
        if (toMin < fromMin) {
            var min = (60 - fromMin + parseInt(toMin))
            if (!nextDay) return (((toHour - fromHour - 1) < 10 ? '0' + (toHour - fromHour - 1) : (toHour - fromHour - 1)) + ':' + (min < 10 ? '0' + min : min))
            if (nextDay) return ((24 + (toHour - fromHour - 1)) + ':' + (min < 10 ? '0' + min : min))
        }
        else if (toMin === fromMin) {
            if (!nextDay) return (((toHour - fromHour) < 10 ? '0' + (toHour - fromHour) : (toHour - fromHour)) + ':00')
            var hour = 24 + (toHour - fromHour)
            if (nextDay) return ((hour < 10 ? '0' + hour : hour) + ':00')
        } else if (toMin > fromMin) {
            if (!nextDay) return (((toHour - fromHour) < 10 ? '0' + (toHour - fromHour) : (toHour - fromHour)) + ':' + ((toMin - fromMin) < 10 ? '0' + (toMin - fromMin) : (toMin - fromMin)))
            var hour = (24 + (toHour - fromHour))
            if (nextDay) return ((hour < 10 ? '0' + hour : hour) + ':' + ((toMin - fromMin) < 10 ? '0' + (toMin - fromMin) : (toMin - fromMin)))
        }
    } else if (toHour < fromHour) { // second day
        var hourDiff = (fromMin > 0) ? 24 - fromHour - 1 : 24 - fromHour
        var minDiff = 60 - fromMin
        hourDiff = hourDiff + toHour
        minDiff = minDiff + toMin
        hourDiff = minDiff >= 60 ? hourDiff + 1 : hourDiff
        minDiff = minDiff >= 60 ? minDiff - 60 : minDiff
        //console.log(hourDiff + ':' + minDiff)
        if (minDiff < 10) minDiff = '0' + minDiff
        if (hourDiff < 10) hourDiff = '0' + hourDiff
        return hourDiff + ':' + minDiff
        /*if (toMin > fromMin) { return ({ sign: 'late', diff: ((fromHour - toHour - 1) < 10 ? '0' + (fromHour - toHour - 1) : (fromHour - toHour - 1)) + ':' + (60 - toMin + parseInt(fromMin)) }) }
        else if (toMin === fromMin) { return ({ sign: 'late', diff: ((fromHour - toHour) < 10 ? '0' + (fromHour - toHour) : '0' + (fromHour - toHour)) + ':00' }) }
        else if (toMin < fromMin) { return ({ sign: 'late', diff: ((fromHour - toHour) < 10 ? '0' + (fromHour - toHour) : (fromHour - toHour)) + ':' + ((fromMin - toMin) < 10 ? '0' + (fromMin - toMin) : (fromMin - toMin)) }) }*/
    }
}

const refreshLiveUsers = () => async (dispatch) => {
    const userInfo = cookie.getJSON("userInfo") || undefined
    const { data } = await axios.get("/api/live")
    dispatch({ type: LIVE_USER_LIST_SUCCESS, payload: data })
    var agent
    data && data.map(liveUser => {
        liveUser.agent && liveUser.agent.map(agt => {
            if (agt === userInfo.name) {
                agent = true
                return
            }
        })
        if (agent) return
    })
    if (!agent) {
        data && data.map(liveUser => {
            if (!liveUser.agent) { // set me as agent for this user
                dispatch(saveLiveUser({ ...liveUser, agent: [userInfo.name] }))
                //setChatboxVisible(false)
                dispatch(listLiveUser())
                tick.play(1.0)
                agent = true
                return
            }
        })
    }
    if (agent) return
    if (userInfo && userInfo.isCallCenterAgent) setTimeout(() => {
        dispatch(refreshLiveUsers())
    }, 3000)
}

const creationDatePrettier = (date) => {
    var dateNum = date.split("T", 1)[0]
    var time = date.slice(date.indexOf('T') + 1, date.length)
    var dateDay = dateNum.slice(8, 10)
    var dateMonth = dateNum.slice(5, 7)
    var dateYear = dateNum.slice(0, 4)
    var timeHour = time.slice(0, 2)
    var timeMin = time.slice(3, 5)
    //var timeSec = time.slice(6, 8)
    timeHour = parseInt(timeHour) < 10 ? '0' + parseInt(timeHour) : timeHour
    timeMin = parseInt(timeMin) < 10 ? '0' + parseInt(timeMin) : timeMin

    return dateDay + '-' + dateMonth + '-' + dateYear + ' ' + timeHour + ':' + timeMin
}

const updateRequestStatus = (cart, payment, delivery) => {
    var status
    if (cart === 'Packed' && (delivery ? delivery === 'Delivered' : true) && payment === 'Collected')
        status = 'Completed'
    else if (cart === 'Canceled' && (delivery ? delivery === 'Canceled' : true) && payment === 'Canceled')
        status = 'Canceled'
    else if (cart === 'Rejected' && (delivery ? delivery === 'Rejected' : true) && payment === 'Rejected')
        status = 'Rejected'
    /*else if (cart === 'Pending' && (delivery ? delivery === 'Pending' : true) && payment === 'Pending')
        status = 'Pending'*/
    else status = 'Confirmed'
    return status
}

const statusModifier = (request, cart, payment, delivery) => {
    var cartStatus = cart
    var payStatus = payment
    var delStatus = delivery

    if (request === 'on Hold') {
        cartStatus = 'on Hold'
        payStatus = 'on Hold'
        if (delStatus) delStatus = 'on Hold'

    } else if (request === 'Pending') {
        cartStatus = 'Pending'
        payStatus = 'Pending'
        if (delStatus) delStatus = 'Pending'

    } else if (request === 'Canceled') {// assign or reassign
        if (cartStatus !== 'Packed' && payStatus !== 'Collected' && delStatus !== 'Delivered') {
            cartStatus = 'Canceled'
            payStatus = 'Canceled'
            if (delStatus) delStatus = 'Canceled'
        }

    } else if (request === 'Completed') {// assign or reassign
        cartStatus = 'Packed'
        payStatus = 'Collected'
        if (delStatus) delStatus = 'Delivered'

    } else if (request === 'Confirmed') {
        if ((cartStatus === 'Canceled' || cartStatus === 'Rejected')
            && (payStatus === 'Canceled' || payStatus === 'Rejected')
            && delStatus ? (delStatus === 'Canceled' || delStatus === 'Rejected') : true) {
            cartStatus = 'Pending'
            payStatus = 'Pending'
            if (delStatus) delStatus = 'Pending'
        }

    } else if (request === 'Rejected') {
        if (cartStatus !== 'Packed' && payStatus !== 'Collected' && delStatus !== 'Delivered') {
            cartStatus = undefined
            payStatus = undefined
            if (delStatus) delStatus = undefined
        }
    }

    return ({ cartStatus, payStatus, delStatus })
}

export { dayConverter, timeDiffCalc, refreshLiveUsers, creationDatePrettier, updateRequestStatus, statusModifier }