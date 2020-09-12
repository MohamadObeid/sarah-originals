import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { saveChat, listChat, deleteChat, detailsChat, saveLiveUser, listLiveUser } from "../../actions/chatActions"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { months } from '../../constants/lists'
import axios from "axios"
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { PASS_LIVE_USER } from "../../constants/constants"

function ChatManager(props) {
    const [formAction, setFormAction] = useState('Create')
    const [formNote, setFormNote] = useState()
    const [formNoteVisible, setFormNoteVisible] = useState(false)
    const [formAlert, setFormAlert] = useState()
    const [formAlertVisible, setFormAlertVisible] = useState()
    const [modelVisible, setModelVisible] = useState(false)
    const [historyVisible, setHistoryVisible] = useState(false)
    const [uploading, setUploading] = useState()

    const [_id, setId] = useState()
    const [modified, setModified] = useState()
    const [name, setName] = useState()
    const [origin, setOrigin] = useState()
    const [supplier, setSupplier] = useState()
    const [phone, setPhone] = useState()
    const [description, setDescription] = useState()
    const [chatValues, setChatValues] = useState()
    const [image, setImage] = useState()
    const [active, setActive] = useState(false)

    const { chat } = useSelector(state => state.chatList)
    const { success: successSave } = useSelector(state => state.chatSave)
    const { success: successDelete } = useSelector(state => state.chatDelete)
    const { userInfo } = useSelector(state => state.userSignin)
    const { liveUser } = useSelector(state => state.liveUserList)

    const dispatch = useDispatch();
    useEffect(() => {
        if (successDelete) {
            setFormAlertVisible(false)
            setModelVisible(false);
            dispatch(listChat())
            setFormNote(`Chat ${formAction}d succefully`)
            setFormNoteVisible(true);
            setInterval(() => setFormNoteVisible(false), 5000)
            setFormAction('')
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
        if (!(chat.endDate)) {
            dispatch(detailsChat(chat._id))
            chat.users = [...chat.users, {
                id: userInfo._id,
                name: userInfo.name,
                isAgent: true,
                image: userInfo.image && userInfo.image,
                typing: false
            }]
            dispatch(saveChat(chat))
            var user = liveUser.find(user => user.chatId == chat._id)
            console.log(user)
            dispatch({ type: PASS_LIVE_USER, payload: user })
            dispatch(listLiveUser())
        }
    }

    const activationHandler = (e, chat) => {
        e.preventDefault()
        if (chat.active) {
            setFormAction('Deactivat')
            chat.active = false
        } else {
            setFormAction('Activat')
            chat.active = true
        }
        chat.modified = [...chat.modified, {
            modified_date: Date.now() + 10800000,
            modified_by: userInfo.name, modified_note: ['Activation']
        }]
        dispatch(saveChat(chat))
    }

    window.addEventListener('click', (e) => {
        const rangeOverlay = document.querySelector('.range-overlay');
        if (e.target === rangeOverlay) {
            setHistoryVisible(false)
            setModelVisible(false)
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
                <button type="button" className="header-button">Create chat</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Active</th>
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
                                <input
                                    className='switch'
                                    type="checkbox"
                                    name={chat._id}
                                    id="active s2"
                                    value={chat.active}
                                    checked={chat.active}
                                    onChange={(e) => activationHandler(e, chat)}
                                ></input>
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
                                <button className="table-btns" onClick={(e) => enterHandler(e, chat)}>Enter</button>
                                <button className="table-btns" onClick={(e) => deleteHandler(e, chat._id)}>Delete</button>
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
