import React, { useState, useEffect } from "react";
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faComments, faTimes, faPaperPlane,
    faThumbsUp, faThumbsDown, faAngleRight
} from '@fortawesome/free-solid-svg-icons'
import {
    faThumbsUp as farThumbsUp, faThumbsDown as farThumbsDown, faPaperPlane as farPaperPlane,
    faImage as farImage, faComments as farComments,
} from '@fortawesome/free-regular-svg-icons'
import { useDispatch, useSelector } from "react-redux";
import {
    listChat, saveChat, deleteChat, detailsChat,
    listLiveUser, saveLiveUser, deleteLiveUser, detailsLiveUser
} from './../../actions/chatActions'
import { CHAT_DETAILS_SUCCESS, CHAT_SAVE_SUCCESS, LIVE_USER_LIST_SUCCESS } from "../../constants/constants";
import audio from '../../sounds/swiftly.mp3'
import UIfx from 'uifx';
import { Popconfirm } from 'antd'

function Chatbox() {
    const imageUrl = window.location.origin + '/api/uploads/image/'
    const dispatch = useDispatch()
    const tick = new UIfx(audio)
    const [chatboxVisible, setChatboxVisible] = useState(false)
    const [startChatVisible, setStartChatVisible] = useState(true)
    const [endChatVisible, setEndChatVisible] = useState(false)
    const [unseen, setUnseen] = useState(0)
    const [unseenVisible, setUnseenVisible] = useState(false)
    const [userDetails, setUserDetails] = useState()
    const [typing, setTyping] = useState(false)
    const [notTyping, setNotTyping] = useState(true)
    const [userVisible, setUserVisible] = useState(false)
    const [scrolling, setScrolling] = useState(false)
    const [draftImage, setDraftImage] = useState(undefined)

    const [chatId, setChatId] = useState()
    const [modified, setModified] = useState(undefined)
    const [modifiedNote, setModifiedNote] = useState()
    const [image, setImage] = useState(undefined)
    const [good, setGood] = useState(false)
    const [bad, setBad] = useState(false)

    //const { chat: chatList } = useSelector(state => state.chatList)
    const { chat: chatDetails } = useSelector(state => state.chatDetails)
    const { liveUser: liveUserDetails } = useSelector(state => state.liveUserDetails)
    const { liveUser: liveUserSave } = useSelector(state => state.liveUserSave)
    const { liveUser: liveUserList } = useSelector(state => state.liveUserList)
    const { userInfo } = useSelector(state => state.userSignin)

    const refreshChat = async () => {
        const { data } = await axios.get("/api/chat/" + chatId)
        dispatch({ type: CHAT_DETAILS_SUCCESS, payload: data })
        var declined
        data[0].users.map(user => {
            if (user.id === userInfo._id && user.isLive === false) declined = true
        })
        if (declined) {
            console.log('dog')
            endChatExtender()
            dispatch(detailsChat('clear'))
            userInfo.isCallCenterAgent && refreshLiveUsers()
            return
        }
        setTimeout(refreshChat, userInfo.isCallCenterAgent ? 1000 : 5000)
    }

    const refreshLiveUsers = async () => {
        const { data } = await axios.get("/api/live");
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
                if (!liveUser.agent) {
                    dispatch(saveLiveUser({ ...liveUser, agent: [userInfo.name] }))
                    setChatboxVisible(false)
                    dispatch(listLiveUser())
                    tick.play(1.0)
                    agent = true
                    return
                }
            })
        }
        if (agent) return
        setTimeout(refreshLiveUsers, 3000)
    }

    useEffect(() => {
        if (userInfo && userInfo.isCallCenterAgent) {
            refreshLiveUsers()
        } else dispatch(listLiveUser())
        return () => {
            //
        }
    }, [userInfo])

    const lunchLiveChat = async (liveUser) => {
        dispatch(detailsChat(liveUser.chatId))
        setChatId(liveUser.chatId)
        setUserDetails(liveUser)
        dispatch(detailsLiveUser(liveUser._id))
        setStartChatVisible(false)
    }

    useEffect(() => {
        if (liveUserList && userInfo && startChatVisible) {
            if (!liveUserSave) {
                liveUserList.map(liveUser => {
                    //dispatch(deleteLiveUser(liveUser._id))
                    if (liveUser.userId === userInfo._id) {
                        lunchLiveChat(liveUser)
                    } else {
                        liveUser.agent && liveUser.agent.map(agt => {
                            if (agt === userInfo.name)
                                lunchLiveChat(liveUser)
                        })
                    }

                })
            } else if (liveUserSave) lunchLiveChat(liveUserSave)
        }

        if (userDetails && !chatboxVisible && chatDetails) {
            var userExist
            chatDetails.users.map(user => {
                if (user.id === userInfo._id) {
                    if (user.typing === true) {
                        user.typing = false
                        dispatch(saveChat(chatDetails))
                    }
                    userExist = true
                    return
                }
            })

            if (!userExist) {
                chatDetails.users = [...chatDetails.users, {
                    id: userInfo._id,
                    name: userInfo.name,
                    isAgent: (userInfo.isCallCenterAgent || userInfo.isAgent) ? true : false,
                    image: userInfo.image && userInfo.image,
                    typing: false,
                    isLive: true
                }]
                dispatch(saveChat(chatDetails))
            }
            setChatboxVisible(true)
            refreshChat()
        }

        if (chatDetails) {
            if (modified) {
                if (!scrolling) {
                    var t = document.querySelector('.chatbox-msg-container')
                    if (t) t.scrollTop = t.scrollHeight
                }
                if (modified.length < chatDetails.modified.length) {
                    setScrolling(false)
                    setModified(chatDetails.modified)
                    if (unseenVisible) {
                        setUnseen(unseen + chatDetails.modified.length - modified.length)
                    } else setUnseen(0)
                    var lengthIndex = chatDetails.modified.length - 1
                    if (chatDetails.modified[lengthIndex].modified_by !== userInfo.name) tick.play(1.0)
                }
            } else if (!modified) {
                setModified(chatDetails.modified)
                openChatBoxHandler()
            }
            chatDetails.users.map(user => {
                user.isAgent && setUserVisible(true)
            })
            if (chatDetails.rate === 'good') { setGood(true); setBad(false) }
            if (chatDetails.rate === 'bad') { setGood(false); setBad(true) }
        }

        return () => {
            //
        }
    }, [chatDetails, chatboxVisible, userDetails, liveUserList, liveUserSave, scrolling])

    const closeChatBoxHandler = async () => {
        await setUserDetails(undefined)
        setChatboxVisible(false)
        setEndChatVisible(false)
        setUnseenVisible(true)
    }

    const openChatBoxHandler = async () => {
        await setChatboxVisible(true)
        setUnseenVisible(false)
        setUnseen(0)
        setUserDetails(liveUserDetails)
        var t = document.querySelector('.chatbox-msg-container')
        if (t) t.scrollTop = t.scrollHeight
    }

    const sendHandler = async (e, element) => {
        e.preventDefault()
        var note
        if (element) { note = element.value } else note = image
        chatDetails.modified = [...chatDetails.modified, {
            modified_date: Date.now() + 10800000,
            modified_by: userInfo ? userInfo.name : chatDetails.created_by,
            modified_note: note,
        }]
        if (!notTyping) {
            chatDetails.users.map(user => {
                if (user.id === userInfo._id) {
                    user.typing = false
                }
            })
        }
        setModified(chatDetails.modified)
        setTyping(false)
        setNotTyping(true)
        setModifiedNote('')
        setImage(undefined)
        const { data } = await axios.put('/api/chat/' + chatDetails._id, chatDetails)
        dispatch({ type: CHAT_SAVE_SUCCESS, payload: data })
        var t = document.querySelector('.chatbox-msg-container')
        if (t) t.scrollTop = t.scrollHeight
    }

    const startChatHandler = async (e) => {
        e.preventDefault()
        var newChat = {}
        var currentDate = Date.now() + 10800000
        newChat.active = true
        newChat.creation_date = currentDate
        newChat.created_by = userInfo ? userInfo.name : `user${currentDate}`
        newChat.created_by_id = userInfo ? userInfo._id : currentDate
        newChat.users = [{
            id: userInfo ? userInfo._id : currentDate,
            name: userInfo ? userInfo.name : newChat.created_by,
        }]
        await dispatch(saveChat(newChat))
        dispatch(listLiveUser())
    }

    const endChatHandler = async (e) => {
        e.preventDefault()
        var agents = 0
        chatDetails.users.map(user => {
            user.isLive && user.isAgent && agents++
        })
        if (agents === 1 || liveUserDetails.userId === userInfo._id) {
            chatDetails.active = false
            chatDetails.modified = [...modified, {
                modified_date: Date.now() + 10800000,
                modified_by: userInfo.name,
                modified_note: 'Ended Chat',
            }]
            chatDetails.users.map(user => {
                user.isLive = false
            })
            await dispatch(saveChat({ ...chatDetails, endDate: Date.now() + 10800000 }))
            dispatch(deleteLiveUser(liveUserDetails._id))
        } else {
            chatDetails.modified = [...modified, {
                modified_date: Date.now() + 10800000,
                modified_by: userInfo.name,
                modified_note: userInfo.name + ' left',
            }]
            chatDetails.users.map(user => {
                if (user.id === userInfo._id) {
                    user.isLive = false
                    return
                }
            })
            await dispatch(saveChat(chatDetails))
            const { data } = await axios.get("/api/live/" + liveUserDetails._id)
            var editedLiveUser = data[0].agent.filter(agent => agent != userInfo.name)
            console.log(editedLiveUser)
            liveUserDetails.agent = editedLiveUser
            await dispatch(saveLiveUser(liveUserDetails))
        }
    }

    const endChatExtender = async () => {
        await dispatch(listLiveUser('clear'))
        dispatch(saveLiveUser('clear'))
        closeChatBoxHandler()
        setModified(undefined)
        setStartChatVisible(true)
        setUserDetails(undefined)
        setUserVisible(false)
        setGood(false)
        setBad(false)
    }

    // Formats

    const readTime = (date) => {
        if (date.length > 16) {
            return date.slice(11, 16)
        } else {
            var d = new Date(date)
            return d.toString().slice(11, 16)
        }
    }

    const linkSibling = (text) => {
        var trimedText = text.substr(text.indexOf('http'), text.length)
        var link = trimedText.indexOf(' ') > 0
            ? trimedText.substr(0, trimedText.indexOf(' '))
            : trimedText
        return link
    }

    const firstSibling = (text) => {
        var firstSibling = text.substr(0, text.indexOf('http'))
        return firstSibling
    }
    const lastSibling = (text) => {
        var trimedText = text.substr(text.indexOf('http'), text.length)
        if (trimedText.indexOf(' ') > 0) {
            return trimedText.substr(trimedText.indexOf(' '), text.length)
        }
        return ''
    }

    const input = (e) => {
        setModifiedNote(e.target.value)
        if (e.target.value) {
            if (!typing) {
                chatDetails.users.map(user => {
                    if (user.id === userInfo._id) {
                        user.typing = true
                        dispatch(saveChat(chatDetails))
                    }
                })
            }
            setTyping(true)
            setNotTyping(false)
        } else {
            if (!notTyping) {
                chatDetails.users.map(user => {
                    if (user.id === userInfo._id) {
                        user.typing = false
                        dispatch(saveChat(chatDetails))
                    }
                })
            }
            setTyping(false)
            setNotTyping(true)
        }
    }

    const sendImageHandler = (e) => {
        sendHandler(e, undefined)
        console.log(image)
    }

    const cancelImageHandler = (e) => {
        setImage(undefined)
        //later delete Image from aws
    }

    const uploadImageHandler = (e) => {
        e.preventDefault();
        const bodyFormData = new FormData();
        bodyFormData.append('image', e.target.files[0]);

        axios.post('/api/uploads', bodyFormData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .then((response) => {
                setImage(response.data)
            })
            .catch((err) => {
                console.log(err)
            });
    }

    // rates

    const rateGood = (e) => {
        if (!good) {
            e.preventDefault()
            setGood(true)
            setBad(false)
            dispatch(saveChat({ ...chatDetails, rate: 'good' }))
        }
    }

    const rateBad = (e) => {
        if (!bad) {
            e.preventDefault()
            setBad(true)
            setGood(false)
            dispatch(saveChat({ ...chatDetails, rate: 'bad' }))
        }
    }

    return (
        <div>
            <div style={{ position: 'relative' }}>
                {chatDetails
                    ? <div className='chat-btn'>
                        <FontAwesomeIcon
                            className='fa-comments fa-2x'
                            icon={faComments}
                            onClick={() => {
                                !chatboxVisible
                                    ? openChatBoxHandler()
                                    : closeChatBoxHandler()
                            }} />
                        {unseenVisible && unseen > 0 &&
                            <div style={{ position: 'relative' }}>
                                <div className='chatbox-unseen-msg'
                                    onClick={() => {
                                        !chatboxVisible
                                            ? openChatBoxHandler()
                                            : closeChatBoxHandler()
                                    }}>
                                    {unseen}
                                </div>
                            </div>}
                    </div>
                    : <Popconfirm
                        title="Do you need Help?"
                        placement="leftBottom"
                        onConfirm={(e) => {
                            !chatboxVisible
                                ? userInfo && !userInfo.isCallCenterAgent
                                && startChatHandler(e)
                                : closeChatBoxHandler()
                        }}
                        okText="Start Live Chat"
                    >
                        <div className='chat-btn'>
                            <FontAwesomeIcon
                                className='fa-comments fa-2x'
                                icon={faComments} />
                        </div>

                    </Popconfirm>}
            </div>

            {
                chatboxVisible &&
                <div className='chatbox'>
                    {endChatVisible &&
                        <div className='chatbox-1'>
                            <div className='endchat-container'>
                                <div className='endchat-text'>Do You Want to End Chat?</div>
                                <div className='endchat-btns'>
                                    <button
                                        onClick={(e) => endChatHandler(e)}
                                        className='endchat-yes'>Yes</button>
                                    <button
                                        onClick={() => setEndChatVisible(false)}
                                        className='endchat-no'>No</button>
                                </div>
                            </div>
                        </div>
                    }
                    <div style={{ position: 'relative', textAlign: 'center' }}>
                        {image && <div className='endchat-container' style={{ top: '10rem' }}>
                            <img className='chatbox-send-image' src={imageUrl + image} alt='image' />
                            <div className='endchat-btns'>
                                <button
                                    onClick={(e) => sendImageHandler(e)}
                                    className='endchat-yes'>Send</button>
                                <button
                                    onClick={(e) => cancelImageHandler(e)}
                                    className='endchat-no'>Cancel</button>
                            </div>
                        </div>}
                        <div className='chatbox-title'>Live Chat</div>
                        <FontAwesomeIcon
                            onClick={() => closeChatBoxHandler()}
                            className='chatbox-fa-minus fa-2x' icon={faAngleRight} />
                        <FontAwesomeIcon
                            onClick={() => setEndChatVisible(true)}
                            className='chatbox-fa-times fa-lg' icon={faTimes} />
                    </div>
                    {chatDetails && chatDetails.users &&
                        <div className='chatbox-user'>
                            {chatDetails.users.map(user => (
                                user.isAgent && user.isLive &&
                                <div style={{ textAlign: 'center', marginRight: '0.5rem' }}>
                                    <img src={imageUrl + user.image} alt='image' className='chatbox-user-img' />
                                    <div className='chabox-username'>{user.name}</div>
                                    {/*<FontAwesomeIcon
                                    onClick={(e) => !userInfo.isAgent && !userInfo.isCallCenterAgent && rateGood(e)}
                                    className='chatbox-far-thumbup fa-2x'
                                    icon={good ? faThumbsUp : farThumbsUp} />
                                <FontAwesomeIcon
                                    onClick={(e) => !userInfo.isAgent && !userInfo.isCallCenterAgent && rateBad(e)}
                                    className='chatbox-far-thumbdown fa-2x'
                                icon={bad ? faThumbsDown : farThumbsDown} />*/}
                                </div>
                            ))}
                        </div>}
                    {chatDetails && chatDetails.users.length === 1 &&
                        < div className='chatbox-notavailable'>All of our agents are busy at the moment.<br />
                        Please stay online and we will get to you within less than 02:00 min</div>
                    }
                    <div className='chatbox-msg-container'
                        onScroll={() => setScrolling(true)}>

                        {chatDetails && chatDetails.users.map(user => (
                            user.id !== userInfo._id && user.typing &&
                            <div className='chatbox-typing'>{user.name + ' is typing...'}</div>
                        ))}
                        {modified && modified.map(mod => (
                            <div className='chatbox-msg-line'>
                                <div className='chatbox-username'>{mod.modified_by}</div>
                                <div className='chatbox-msg'>{
                                    mod.modified_note && mod.modified_note.includes('http')
                                        ? <div>
                                            {firstSibling(mod.modified_note)}
                                            <a href={linkSibling(mod.modified_note)} className='chatbox-msg-link' target='_blank'>
                                                {linkSibling(mod.modified_note)}</a>
                                            {lastSibling(mod.modified_note)}
                                        </div>
                                        : mod.modified_note.includes(imageUrl)
                                            ? <img className='chatbox-send-image' src={mod.modified_note} alt={mod.modified_note} />
                                            : mod.modified_note
                                }</div>
                                <div className='chatbox-msg-time'>
                                    {readTime(mod.modified_date)}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='chatbox-input-container'>
                        <div className="image-upload">
                            <label htmlFor="file-input">
                                <FontAwesomeIcon icon={farImage} className='faImage fa-lg' />
                            </label>
                            <input id="file-input" type="file" onChange={(e) => {
                                //setDraftImage(URL.createObjectURL(e.target.files[0]))
                                uploadImageHandler(e)
                            }} />
                        </div>
                        <textarea placeholder='Type a message...'
                            className='chatbox-input'
                            value={modifiedNote}
                            onChange={(e) => input(e)}
                            onKeyPress={(e) => e.key === 'Enter' && chatDetails && sendHandler(e, e.target)}>
                        </textarea>
                        <FontAwesomeIcon
                            onClick={(e) => modifiedNote && chatDetails &&
                                sendHandler(e,
                                    e.target.previousElementSibling
                                        ? e.target.previousElementSibling
                                        : e.target.parentElement.previousElementSibling
                                )}
                            className='chatbox-send' icon={faPaperPlane} />
                    </div>
                </div>
            }
        </div >
    )
}

export default Chatbox;