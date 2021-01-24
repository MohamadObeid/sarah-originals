import axios from 'axios'
import cookie from "js-cookie";
import { listLiveUser, saveLiveUser } from '../actions/chatActions';
import audio from '../screens/Components/swiftly.mp3'
import UIfx from 'uifx';
import { LIVE_USER_LIST_SUCCESS } from '../constants/constants';
import React from 'react'
import { useSelector } from 'react-redux';
const tick = new UIfx(audio)

const timer = (endDate, active) => { //gets date and retruns time difference between current date, active is active user

    var d = new Date()
    var currentYear = d.getFullYear()
    var currentMonthNum = d.getMonth() + 1
    var currentDay = d.getDate()
    var currentHour = d.getHours()
    var currentMinutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
    var currentSeconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
    //console.log(date)

    if (endDate) {
        var dateNum = endDate.split("T")[0]
        var time = endDate.split("T")[1]
        var dateDay = parseInt(dateNum.split("-")[2])
        var dateMonth = parseInt(dateNum.split("-")[1])
        var dateYear = parseInt(dateNum.split("-")[0])
        var timeHour = parseInt(time.slice(0, 2))
        var timeMin = parseInt(time.slice(3, 5))
        var timeSec = parseInt(time.slice(6, 8)) ? parseInt(time.slice(6, 8)) : 0

        var secDiff = currentSeconds - timeSec
        var minDiff = currentMinutes - timeMin
        var hourDiff = currentHour - timeHour
        var dayDiff = currentDay - dateDay
        var monthDiff = currentMonthNum - dateMonth
        var yearDiff = currentYear - dateYear

        var secStatus = secDiff <= 1 ? 'Online' : secDiff + ' sec ago'

        var minStatus = minDiff > 0
            ? (minDiff === 1
                ? (secDiff >= 0 ? 'Last minute' : 60 + secDiff + ' sec ago')
                : Math.abs(minDiff) + ' min ago')
            : minDiff < 0 &&
            (secDiff === 0
                ? Math.abs(minDiff) + ' min left'
                : (secDiff > 0 ? (minDiff !== -1 ? Math.abs(minDiff) - 1 + ' min  ' : '') : Math.abs(minDiff) + ' min  ')
                + (60 - Math.abs(secDiff)) + ' sec left')

        var hourStatus = hourDiff > 0
            ? (hourDiff === 1
                ? (minDiff >= 0 ? 'Last hour' : 60 + minDiff + ' min ago')
                : hourDiff + ' hour ago')
            : hourDiff < 0
            && (minDiff === 0
                ? Math.abs(hourDiff) + ' hour left'
                : ((minDiff >= 0 ? hourDiff + 1 : hourDiff) > 0
                    ? (24 - Math.abs(minDiff >= 0 ? hourDiff + 1 : hourDiff)) + ' hour  '
                    : (Math.abs(minDiff >= 0 ? hourDiff + 1 : hourDiff)) + ' hour  ')
                + (minDiff > 0 ? 60 - minDiff : Math.abs(minDiff)) + ' min '
                + (secDiff === 0 ? 'left' : ((secDiff > 0 ? 60 - secDiff : Math.abs(secDiff)) + ' sec left')))

        var dayStatus = dayDiff > 0
            ? (dayDiff === 1
                ? (hourDiff >= 0 ? 'Yesterday' : 24 + hourDiff + ' hour ago')
                : Math.abs(dayDiff) + ' day ago')
            : dayDiff < 0
            && (hourDiff === 0
                ? (minDiff === 0
                    ? Math.abs(dayDiff) + ' day left'
                    : (minDiff < 0 ? Math.abs(dayDiff) + ' day ' + Math.abs(minDiff) + ' min left' : '23 hours ' + (60 - minDiff) + ' min left'))
                : (hourDiff > 0 ? (dayDiff !== -1 ? Math.abs(dayDiff) - 1 + ' day  ' : '') : Math.abs(dayDiff) + ' day  ')
                + ((minDiff >= 0 ? hourDiff + 1 : hourDiff) > 0
                    ? (24 - Math.abs(minDiff >= 0 ? hourDiff + 1 : hourDiff)) + ' hour  '
                    : (Math.abs(minDiff >= 0 ? hourDiff + 1 : hourDiff)) + ' hour  ')
                + ((minDiff > 0 ? 60 - minDiff : Math.abs(minDiff)) + ' min ')
                + (secDiff === 0 ? 'left' : ((secDiff > 0 ? 60 - secDiff : Math.abs(secDiff)) + ' sec left')))

        var monthStatus = monthDiff > 0
            ? (monthDiff === 1
                ? (dayDiff >= 0 ? 'Last month' : 30 + dayDiff + ' day ago')
                : Math.abs(monthDiff) + ' month ago')
            : monthDiff < 0 &&
            (dayDiff === 0
                ? Math.abs(monthDiff) + ' month left'
                : (dayDiff > 0 ? (monthDiff !== -1 ? Math.abs(monthDiff) - 1 + ' month  ' : '') : Math.abs(monthDiff) + ' month  ')
                + (30 - Math.abs(dayDiff)) + ' day left')

        var yearStatus = yearDiff > 0
            ? (yearDiff === 1
                ? (monthDiff >= 0 ? 'Last year' : 12 + monthDiff + ' month ago')
                : yearDiff + ' year ago')
            : yearDiff < 0 &&
            (monthDiff === 0
                ? Math.abs(yearDiff) + ' year left'
                : (monthDiff > 0 ? (yearDiff !== -1 ? Math.abs(yearDiff) - 1 + ' year  ' : '') : Math.abs(yearDiff) + ' year  ')
                + (12 - Math.abs(monthDiff)) + ' month left')

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
        } else if (toMin === fromMin) {
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

        if (minDiff < 10) minDiff = '0' + minDiff
        if (hourDiff < 10) hourDiff = '0' + hourDiff
        return hourDiff + ':' + minDiff
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
    if (date) {
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

    return date
}

const date = (delivery) => { // returns a date in right date format
    var d = new Date()
    var currentYear = d.getFullYear()
    var currentMonth = d.getMonth() + 1 < 10 ? '0' + d.getMonth() + 1 : d.getMonth() + 1
    var currentDay = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
    var currentHour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
    var currentMinutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()

    if (typeof delivery === 'object') {
        var n = d
        n.setDate(d.getDate() + 1)
        var tomorrowYear = n.getFullYear()
        var tomorrowMonth = n.getMonth() + 1 < 10 ? '0' + n.getMonth() + 1 : n.getMonth() + 1
        var tomorrowDay = n.getDate() < 10 ? '0' + n.getDate() : n.getDate()

        var duration = delivery.duration
        var timeFormat = delivery.timeFormat

        if (timeFormat === 'min') {
            //console.log(typeof currentMinutes, typeof duration)
            currentMinutes = parseInt(currentMinutes) + duration
            if (currentMinutes >= 60) {
                while (currentMinutes >= 60) {
                    currentMinutes = currentMinutes - 60
                }
                currentHour++
                if (currentHour >= 24) {
                    currentHour = '00'
                    currentDay = tomorrowDay
                    currentMonth = tomorrowMonth
                    currentYear = tomorrowYear
                }
            }
        } else if (timeFormat === 'hr') {
            currentHour = parseInt(currentHour) + duration
            if (currentHour >= 24) {
                while (currentHour >= 24) {
                    currentHour = currentHour - 24
                }
                currentDay = tomorrowDay
                currentMonth = tomorrowMonth
                currentYear = tomorrowYear
            }
        } else if (timeFormat === 'day') {
            currentDay = tomorrowDay
            currentMonth = tomorrowMonth
            currentYear = tomorrowYear
        }
    } else if (typeof delivery === 'string') {
        var date = delivery
        return date.slice(0, 16)
    }
    if (typeof currentMinutes === 'number' && currentMinutes < 10) currentMinutes = '0' + currentMinutes
    if (typeof currentHour === 'number' && currentHour < 10) currentHour = '0' + currentHour
    //console.log(currentYear + '-' + currentMonth + '-' + currentDay + 'T' + currentHour + ':' + currentMinutes)
    return currentYear + '-' + currentMonth + '-' + currentDay + 'T' + currentHour + ':' + currentMinutes
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

//////////////////////////////////////////////////////////////////////

const qtyCalc = (cartItems) => {
    var totalqty = 0
    cartItems.map(item => {
        var itemRejected = item.rejectedQty || 0
        totalqty = totalqty + item.qty - itemRejected
    })
    return totalqty
}


const paymentCalc = (payment, paymentType, cartItems, requestType) => {
    var rateMin = 1000000000 /* = default payment rate */
    var currentRate
    const cartAmountPlus = cartAmountCalc(cartItems, requestType) < 0
        ? (-1) * cartAmountCalc(cartItems, requestType)
        : cartAmountCalc(cartItems, requestType)
    // Flat Rate
    if (payment && payment.rateType === 'Flat') {
        if (payment.unit === '%')
            rateMin = payment.flatRate * 0.01 * cartAmountPlus
        else rateMin = payment.flatRate

        // Custom Rate
    } else if (payment && payment.rateType === 'Custom') {
        if (payment.rates) {
            payment.rates.map(rate => {

                if (rate.basedOn === 'Value') {
                    if (cartAmountPlus >= rate.min && cartAmountPlus <= rate.max && paymentType === rate.paymentType) {
                        if (rate.unit === '%')
                            currentRate = cartAmountPlus * rate.rate * 0.01
                        else currentRate = rate.rate
                        //console.log(rate.rate, currentRate)
                        if (currentRate < rateMin) rateMin = currentRate
                    }

                } else if (rate.basedOn === 'Quantity') {
                    if (qtyCalc(cartItems) >= rate.min && qtyCalc(cartItems) <= rate.max && paymentType == rate.paymentType) {
                        if (rate.unit === '%')
                            currentRate = qtyCalc(cartItems) * rate.rate * 0.0
                        else currentRate = rate.rate
                        if (currentRate < rateMin) rateMin = currentRate
                    }
                }
            })
        }
    } else rateMin = 0
    //console.log(rateMin)
    return Number.isInteger(rateMin) ? rateMin : rateMin.toFixed(2)
}

const cartAmountCalc = (cartItems, requestType) => {
    var cartAmount = 0
    cartItems.map(item => {
        cartAmount = cartAmount + item.priceUsd * item.qty
    })
    //cartAmount = cartAmount - discountCalc()
    if (requestType === 'Cancel' || requestType === 'Return')
        cartAmount = cartAmount * (-1)
    return cartAmount.toFixed(2)
}

const discountCalc = (cartItems, requestType) => {
    var discountAmount = 0
    cartItems.map(item => {
        if (item.discount > 0) { discountAmount = discountAmount + item.priceUsd * item.discount * 0.01 * item.qty }
    })
    if (requestType && requestType !== 'Cancel' && requestType !== 'Return')
        discountAmount = discountAmount * (-1)
    return discountAmount.toFixed(2)
}

const totalAmountCalc = (cartItems, deliveryCharge, paymentCharge, paymentValues, request, requestType, paymentType, itemsQty, requestNum, requestIndex, deliveryValues) => {
    var deliveryCharg = deliveryCharge ? deliveryCharge
        : deliveryCalc(deliveryValues, cartItems, requestType, itemsQty, request, requestNum, requestIndex)
    deliveryCharg = parseFloat(deliveryCharg)
    if (request.type === 'Cancel') deliveryCharg = 0
    var paymentCharg = paymentCharge ? paymentCharge
        : paymentCalc(paymentValues, paymentType, cartItems, requestType)

    paymentCharg = parseFloat(paymentCharg)
    //console.log(paymentCharg, deliveryCharg)
    var amount = deliveryCharg + paymentCharg +
        parseFloat(cartAmountCalc(cartItems, requestType)) +
        parseFloat(discountCalc(cartItems, requestType))
    //console.log(totalAmount)
    return Number.isInteger(amount) ? amount : amount.toFixed(2)
}


const deliveryCalc = (deliveryValues, cartItems, requestType, itemsQty, request, requestNum, requestIndex) => {
    var rateMin = 100000000 /* = default delivery rate */
    var currentRate
    var cartAmount = cartAmountCalc(cartItems, requestType)
    var cartAmountPlus = cartAmount < 0
        ? (-1) * cartAmount
        : cartAmount
    // All Items in Cart are canceled
    var sameReq = false
    if (request[0]) if (requestType === request[0].type && requestIndex !== 0) sameReq = true
    if (requestType === 'Prepare' || sameReq || (request[0] && request[0].type === 'Prepare')) return 0

    // the reason for the below eq. is to check if all items are canceled => delivery charge = x(-1) original charge => delivery charge is canceled
    else if (requestType === 'Cancel' && request[requestNum - 1].cart.status !== 'Packed' && itemsQty) { // all order is returned
        if (requestNum && request[requestNum - 1].delivery && request[requestNum - 1].delivery.charge) {
            var allItemsCanceled = true
            cartItems.map(item => {
                var item0 = itemsQty.find(item0 => item0._id === item._id)
                if (item0 && item.qty !== item0.qty) {
                    allItemsCanceled = false
                    return
                }
            })
            if (allItemsCanceled === true) {
                var delCharge = parseFloat(request[requestNum - 1].delivery.charge)
                return delCharge * (-1)
            } else return 0
        } else return 0

        // Flat Rate
    } else if (deliveryValues && deliveryValues.rateType === 'Flat') {
        if (deliveryValues.unit === '%') {
            currentRate = deliveryValues.flatRate * cartAmountPlus * 0.01
            if (currentRate < rateMin) rateMin = currentRate
        } else rateMin = parseFloat(deliveryValues.flatRate).toFixed(2)

        // Custom Rate
    } else if (deliveryValues && deliveryValues.rateType === 'Custom') {
        if (deliveryValues.rates) {
            deliveryValues.rates.map(rate => {

                if (rate.basedOn === 'Value') {
                    if (cartAmountPlus >= rate.min && cartAmountPlus <= rate.max) {
                        if (rate.unit === '%')
                            currentRate = rate.rate * cartAmountPlus * 0.01
                        else currentRate = rate.rate
                        if (currentRate < rateMin) rateMin = currentRate
                    }

                } else if (rate.basedOn === 'Quantity') {
                    if (qtyCalc(cartItems) >= rate.min && qtyCalc(cartItems) <= rate.max) {
                        if (rate.unit === '%') currentRate = rate.rate * qtyCalc(cartItems) * 0.01
                        else currentRate = rate.rate
                        if (currentRate < rateMin) rateMin = currentRate
                    }

                } /*else if (rate.basedOn === 'Weight') {
                        if (cartAmountPlus >= rate.min && cartAmountPlus <= rate.max) {
                            currentRate = rate.rate * cartAmountPlus * 0.01
                            if (currentRate < rateMin) rateMin = currentRate
                        }
                    }*/
            })
        } else rateMin = 0
    }
    return rateMin
}

const showTimer = (onSale) => {
    if (!onSale) return { ended: true, active: false }

    var d = new Date()
    var currentYear = d.getFullYear()
    var currentMonthNum = d.getMonth() + 1
    var currentDay = d.getDate()
    var currentHour = d.getHours()
    var currentMinutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
    var currentSeconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()

    var active = true
    var ended = false

    var endDate = onSale.endDate
    var dateNum = endDate.split("T")[0]
    var time = endDate.split("T")[1]
    var dateDay = parseInt(dateNum.split("-")[2])
    var dateMonth = parseInt(dateNum.split("-")[1])
    var dateYear = parseInt(dateNum.split("-")[0])
    var timeHour = parseInt(time.slice(0, 2))
    var timeMin = parseInt(time.slice(3, 5))
    var timeSec = parseInt(time.slice(6, 8)) ? parseInt(time.slice(6, 8)) : 0

    var secDiff = currentSeconds - timeSec
    var minDiff = currentMinutes - timeMin
    var hourDiff = currentHour - timeHour
    var dayDiff = currentDay - dateDay
    var monthDiff = currentMonthNum - dateMonth
    var yearDiff = currentYear - dateYear

    if (yearDiff === 0) {
        if (monthDiff === 0) {
            if (dayDiff === 0) {
                if (hourDiff === 0) {
                    if (minDiff === 0) {
                        if (secDiff >= 0) ended = true
                    } else if (minDiff > 0) ended = true
                } else if (hourDiff > 0) ended = true
            } else if (dayDiff > 0) ended = true
        } else if (monthDiff > 0) ended = true
    } else if (yearDiff > 0) ended = true

    if (ended) return { ended, active: false }

    var startDate = onSale.startDate
    var dateNum = startDate.split("T")[0]
    var time = startDate.split("T")[1]
    var dateDay = parseInt(dateNum.split("-")[2])
    var dateMonth = parseInt(dateNum.split("-")[1])
    var dateYear = parseInt(dateNum.split("-")[0])
    var timeHour = parseInt(time.slice(0, 2))
    var timeMin = parseInt(time.slice(3, 5))
    var timeSec = parseInt(time.slice(6, 8)) ? parseInt(time.slice(6, 8)) : 0

    var secDiff = currentSeconds - timeSec
    var minDiff = currentMinutes - timeMin
    var hourDiff = currentHour - timeHour
    var dayDiff = currentDay - dateDay
    var monthDiff = currentMonthNum - dateMonth
    var yearDiff = currentYear - dateYear

    if (yearDiff === 0) {
        if (monthDiff === 0) {
            if (dayDiff === 0) {
                if (hourDiff === 0) {
                    if (minDiff === 0) {
                        if (secDiff === 0) { }
                        else if (secDiff < 0) active = false
                    } else if (minDiff < 0) active = false
                } else if (hourDiff < 0) active = false
            } else if (dayDiff < 0) active = false
        } else if (monthDiff < 0) active = false
    } else if (yearDiff < 0) active = false

    return { active, ended }
}

const domain = window.location.href.includes('netlify')
    ? 'https://sarah-originals.herokuapp.com/'
    : ''

export {
    timer, timeDiffCalc, refreshLiveUsers, creationDatePrettier,
    updateRequestStatus, statusModifier, date, qtyCalc, paymentCalc, cartAmountCalc,
    discountCalc, totalAmountCalc, deliveryCalc, showTimer, domain
}