import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const ActionNote = React.memo(() => {
    var timeOut, actionNoteWrapper, timerBar, actionNote, note, width, height
    const dispatch = useDispatch()
    const styles = useSelector(state => state.controls.actionNote)

    //
    const clearActionNote = () => {
        clearTimeout(timeOut)
        //dispatch({ type: 'REMOVE_FROM_ACTIONS', payload: 'actionNote' })
        actionNoteWrapper.classList.remove('show-action-note')
        timerBar.classList.remove('width-1000')
    }

    const displayActionNote = (note) => {
        timeOut = setTimeout(() => { clearActionNote() }, 5000)
        setTimeout(() => { timerBar.classList.add('width-1000') }, 50)

        actionNote.innerHTML = note
        width = actionNoteWrapper.offsetWidth
        height = actionNoteWrapper.offsetHeight

        actionNoteWrapper.classList.add('show-action-note')
        actionNoteWrapper.style.left = `calc((100vw - ${width + 'px'}) / 2)`
    }

    const hideTimer = () => {
        clearTimeout(timeOut)
        timerBar.classList.remove('width-1000')
    }

    const showTimer = () => {
        timeOut = setTimeout(() => { clearActionNote() }, 5000)
        setTimeout(() => { timerBar.classList.add('width-1000') }, 50)
    }

    useSelector(state => {
        if (state.actions.actionNote) {
            note = state.actions.actionNote
            clearActionNote()
            displayActionNote(note)
        }
    })

    useEffect(() => {
        actionNoteWrapper = document.getElementsByClassName('action-note-wrap')[0]
        timerBar = actionNoteWrapper.getElementsByClassName('action-note-timerBar')[0]
        actionNote = actionNoteWrapper.getElementsByClassName('action-note')[0]
    }, [])

    return <div className="action-note-wrap" onMouseEnter={hideTimer} onMouseLeave={showTimer}>
        <div className='action-note-timerBar' />
        <div className='action-note' />
        <div className='faTimes-action-note'>
            <FontAwesomeIcon icon={faTimes} onClick={clearActionNote} />
        </div>
    </div>
})