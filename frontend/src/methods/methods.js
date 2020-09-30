import { months, weekDays } from '../constants/lists'

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
            ? (minDiff >= 0 ? 'Last hour' : 60 + minDiff + ' min ago')
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

const timeDiffCalc = (from, to) => { //time format ex.: 01:20
    var fromHour = parseInt(from.slice(0, 2))
    var fromMin = parseInt(from.slice(3, 5))
    var toHour = parseInt(to.slice(0, 2))
    var toMin = parseInt(to.slice(3, 5))
    if (fromHour === toHour) {
        if (toMin > fromMin) { return '00:' + ((toMin - fromMin) < 10 ? '0' + (toMin - fromMin) : (toMin - fromMin)) }
        else if (toMin < fromMin) { return { sign: 'late', diff: '00:' + ((fromMin - toMin) < 10 ? '0' + (fromMin - toMin) : (fromMin - toMin)) } }
        else if (toMin === fromMin) return '00:00'
    } else if (toHour > fromHour) {
        if (toMin < fromMin) { return (((toHour - fromHour - 1) < 10 ? '0' + (toHour - fromHour - 1) : (toHour - fromHour - 1)) + ':' + (60 - fromMin + parseInt(toMin))) }
        else if (toMin === fromMin) { return (((toHour - fromHour) < 10 ? '0' + (toHour - fromHour) : '0' + (toHour - fromHour)) + ':00') }
        else if (toMin > fromMin) { return (((toHour - fromHour) < 10 ? '0' + (toHour - fromHour) : (toHour - fromHour)) + ':' + ((toMin - fromMin) < 10 ? '0' + (toMin - fromMin) : (toMin - fromMin))) }
    } else if (toHour < fromHour) {
        if (toMin > fromMin) { return ({ sign: 'late', diff: ((fromHour - toHour - 1) < 10 ? '0' + (fromHour - toHour - 1) : (fromHour - toHour - 1)) + ':' + (60 - toMin + parseInt(fromMin)) }) }
        else if (toMin === fromMin) { return ({ sign: 'late', diff: ((fromHour - toHour) < 10 ? '0' + (fromHour - toHour) : '0' + (fromHour - toHour)) + ':00' }) }
        else if (toMin < fromMin) { return ({ sign: 'late', diff: ((fromHour - toHour) < 10 ? '0' + (fromHour - toHour) : (fromHour - toHour)) + ':' + ((fromMin - toMin) < 10 ? '0' + (fromMin - toMin) : (fromMin - toMin)) }) }
    }
}

export { dayConverter, timeDiffCalc }