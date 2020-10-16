import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { saveChat, listChat, deleteChat, detailsChat, saveLiveUser, listLiveUser } from "../../actions/chatActions"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { months } from '../../constants/lists'
import { Popconfirm } from 'antd'
import { faThumbsUp, faThumbsDown, faCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { LIVE_USER_SAVE_SUCCESS } from "../../constants/constants"

function ChatManager(props) {
    const [formAction, setFormAction] = useState('Create')
    const [formNote, setFormNote] = useState()
    const [formNoteVisible, setFormNoteVisible] = useState(false)
    const [formAlertVisible, setFormAlertVisible] = useState()
    const [historyVisible, setHistoryVisible] = useState(false)
    const [chatValues, setChatValues] = useState()

    const { chat } = useSelector(state => state.chatList)
    const { success: successDelete } = useSelector(state => state.chatDelete)
    const { userInfo } = useSelector(state => state.userSignin)
    const { liveUser } = useSelector(state => state.liveUserList)
    const [timeOut, setTimeOut] = useState()

    const dispatch = useDispatch();
    useEffect(() => {
        if (successDelete) {
            setFormAlertVisible(false)
            dispatch(listChat())
            setFormNote(`Chat ${formAction}d succefully`)
            setFormNoteVisible(true);
            clearTimeout(timeOut)
            setTimeOut(setInterval(() => setFormNoteVisible(false), 5000))
            setFormAction('')
            dispatch(deleteChat('clear'))
        }
        return () => {
            //
        };
    }, [successDelete])

    const deleteHandler = (e, _id) => {
        e.preventDefault()
        setFormAction('Delete')
        dispatch(deleteChat(_id))
    }

    const showHistoryHandler = (chat) => {
        setHistoryVisible(true)
        setChatValues(chat)
    }

    const enterHandler = async (e, chat) => {
        e.preventDefault()
        var userExist
        chat.users.map(user => {
            if (user.id === userInfo._id) {
                userExist = true
                user.isLive = true
                return
            }
        })
        if (!userExist) {
            chat.users = [...chat.users, {
                id: userInfo._id,
                name: userInfo.name,
                isAgent: true,
                image: userInfo.image && userInfo.image,
                typing: false,
                isLive: true
            }]
            chat.modified = [...chat.modified, {
                modified_date: Date.now() + 10800000,
                modified_by: userInfo && userInfo.name,
                modified_note: userInfo && userInfo.name + ' joined',
            }]
        }
        await dispatch(saveChat(chat))
        var user = liveUser.find(user => user.chatId == chat._id)
        user.agent = [...user.agent, userInfo.name]
        const { data } = await axios.put('/api/live/' + user._id, user)
        dispatch({ type: LIVE_USER_SAVE_SUCCESS, payload: data })
        dispatch(listLiveUser())
    }

    window.addEventListener('click', (e) => {
        const rangeOverlay = document.querySelector('.range-overlay');
        if (e.target === rangeOverlay) {
            setHistoryVisible(false)
        }
    })

    const fixDate = (date) => {
        var monthName
        months.map(mon => {
            if (months.indexOf(mon) + 1 == date.slice(5, 7)) {
                monthName = mon
            }
        })
        return date.slice(8, 10) + ' ' + monthName + ' ' + date.slice(0, 4)
    }

    const getAgents = (users, char) => {
        var agent
        if (char === 'agent') agent = users.filter(user => user.isAgent && user)
        if (char === 'user') agent = users.filter(user => !user.isAgent && user)
        agent = agent.map(agent => {
            return agent.name
        })
        return agent
    }

    return (
        <div>
            {formNoteVisible && <div className="action-note">{formNote}</div>}
            <div className="control-page-header">
                <h3 className="header-title">Chat Manager</h3>
                <button type="button" className="header-button">Start Chat</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ paddingRight: '0.5rem' }}>Active</th>
                        <th>Date</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>User Name</th>
                        <th>Agent</th>
                        <th>Length</th>
                        <th>Rate</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {chat && chat.map((chat) => (
                        <tr key={chat._id}>
                            <td className='td-active'>
                                <FontAwesomeIcon className={`${chat.active ? 'faCircle' : 'farCircle'}`} icon={faCircle} />
                            </td>
                            <td>{fixDate((chat.creation_date && chat.creation_date.split("T", 1))[0])}</td>
                            <td>{chat.creation_date.slice(chat.creation_date.indexOf('T') + 1, -1).slice(0, 5)}</td>
                            <td>{chat.endDate && chat.endDate.slice(chat.endDate.indexOf('T') + 1, -1).slice(0, 5)}</td>
                            <td style={{ width: '20rem' }}>{getAgents(chat.users, 'user')}</td>
                            <td style={{ width: '20rem' }}>{getAgents(chat.users, 'agent')}</td>
                            <td>{chat.modified.length}</td>
                            <td style={{ textAlign: 'center' }}>{chat.rate === 'good'
                                ? <FontAwesomeIcon style={{ color: '#ff8000' }} icon={faThumbsUp} />
                                : chat.rate === 'bad'
                                && <FontAwesomeIcon icon={faThumbsDown} />
                            }</td>
                            <td style={{ width: '21rem' }}>
                                <button className="table-btns"
                                    onClick={(e) => !(chat.endDate) && enterHandler(e, chat)}
                                >Enter</button>
                                <Popconfirm
                                    placement="topRight"
                                    title="Are you sure you want to delete this chat?"
                                    onConfirm={(e) => deleteHandler(e, chat._id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <button className="table-btns">Delete</button>
                                </Popconfirm>
                                <button className="table-btns" onClick={() => showHistoryHandler(chat)}>History</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                historyVisible &&
                <div className='range'>
                    <div className='range-overlay history-overlay' style={{ zIndex: '4' }}>
                        <div className='range-form'>
                            <div className='history-title' style={{ margin: '1rem' }}>{chatValues.name} History</div>
                            <table className="range-table">
                                <thead>
                                    <tr>
                                        <th style={{ width: '15rem' }}>Date</th>
                                        <th style={{ width: '22rem' }}>User</th>
                                        <th>Comment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={chatValues._id}>
                                        <td>{chatValues.creation_date && chatValues.creation_date.split("T", 1) + '  '
                                            + chatValues.creation_date.slice(chatValues.creation_date.indexOf('T') + 1, -1).slice(0, 5)}
                                        </td>
                                        <td>{chatValues.created_by && chatValues.created_by}</td>
                                        <td>Started Chat</td>
                                    </tr>
                                    {chatValues.modified &&
                                        chatValues.modified.map(modified => (
                                            <tr>
                                                <td>{modified.modified_date && modified.modified_date.split("T", 1) + '  '
                                                    + modified.modified_date.slice(modified.modified_date.indexOf('T') + 1, -1).slice(0, 5)}
                                                </td>
                                                <td>{modified.modified_by}</td>
                                                <td>{modified.modified_note}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}
export default ChatManager;
