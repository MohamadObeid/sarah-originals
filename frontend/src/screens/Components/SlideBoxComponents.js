import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { timer, showTimer } from '../../methods/methods'
import { faClock as farClock } from '@fortawesome/free-regular-svg-icons'

export const Timer = React.memo(({ slide, slideBox_id }) => {
    var element
    var timeLeft
    var timerVisible

    useEffect(() => {
        element = document.getElementsByClassName('slide-box-' + slideBox_id)[0]
        element = element.getElementsByClassName('timer-' + slide._id)[0]
        timeLeft = timer(slide.onSale.endDate)
        timerVisible = showTimer(slide.onSale).active

        if (timerVisible) {
            element.innerHTML = timeLeft
            setInterval(() => {
                timeLeft = timer(slide.onSale.endDate)
                element.innerHTML = timeLeft
            }, 1000)

        } else {
            element.innerHTML = 'Starts After : ' + timeLeft.split('left')[0]
            setInterval(() => {
                timeLeft = timer(slide.onSale.endDate).split('left')[0]
                element.innerHTML = 'Starts After : ' + timeLeft
            }, 1000)
        }

    }, [])

    return (
        <div className={'product-timer-wrap ' + (showTimer(slide.onSale).active ? 'highlight' : '')}>
            <FontAwesomeIcon icon={farClock} className='product-fa-clock' />
            <div className={'product-timer timer-' + slide._id} />
        </div>
    )

})