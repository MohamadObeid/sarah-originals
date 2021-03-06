import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { timer, showTimer } from '../../methods/methods'
import { faClock as farClock } from '@fortawesome/free-regular-svg-icons'

export const Timer = React.memo(({ slide }) => {
    var element
    var timeLeft
    var timerVisible

    const [_id] = useState(Math.floor(Math.random() * 10000000000000))

    useEffect(() => {
        element = document.getElementsByClassName('timer-' + _id)[0]
        timerVisible = showTimer(slide.onSale).active
        timeLeft = timerVisible ? timer(slide.onSale.endDate) : timer(slide.onSale.startDate)

        if (timerVisible) {
            element.innerHTML = timeLeft
            setInterval(() => {
                timeLeft = timer(slide.onSale.endDate)
                element.innerHTML = timeLeft
            }, 1000)

        } else {
            element.innerHTML = 'Starts After : ' + timeLeft.split('left')[0]
            setInterval(() => {
                timeLeft = timer(slide.onSale.startDate).split('left')[0]
                if (timeLeft.includes('ago')) timeLeft = 'reload page'
                element.innerHTML = 'Starts After : ' + timeLeft
            }, 1000)
        }

    }, [])

    return (
        <div className={'product-timer-wrap ' + (showTimer(slide.onSale).active ? 'highlight' : '')}>
            <FontAwesomeIcon icon={farClock} className='product-fa-clock' />
            <div className={'product-timer timer-' + _id} />
        </div>
    )

})
