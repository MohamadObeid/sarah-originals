import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listUsers, deleteUser, saveUser } from "../../actions/userActions";
import FontAwesome from 'react-fontawesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { months, weekDays } from '../../constants/lists'

function UsersManager(props) {
    var d = new Date()
    var currentYear = d.getFullYear()
    var currentMonthNum = d.getMonth() + 1
    var currentMonth = months[d.getMonth()]
    var currentDay = d.getDate()
    var currentWeekDay = weekDays[d.getDay()]
    var currentHour = d.getHours()
    var currentMinutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
    var currentSeconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()

    const [formAction, setFormAction] = useState()
    const [actionNote, setActionNote] = useState()
    const [actionNoteVisible, setActionNoteVisible] = useState(false)
    const [formAlert, setFormAlert] = useState('Kindly fill all required blanks!')
    const [formAlertVisible, setFormAlertVisible] = useState(false)
    const [modelVisible, setModelVisible] = useState(false)

    const [_id, setId] = useState()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [password, setPassword] = useState()
    const [isAdmin, setIsAdmin] = useState(false)
    const [isCallCenterAgent, setIsCallCenterAgent] = useState(false)
    const [isAttendanceManager, setIsAttendanceManager] = useState(false)
    const [employeeId, setEmployeeId] = useState()
    const [image, setImage] = useState()

    const { users } = useSelector(state => state.usersList)

    const { success: successSave } = useSelector(state => state.userSave)
    const { success: successDelete } = useSelector(state => state.userDelete)
    const { employees: employeeList } = useSelector(state => state.employeeList)

    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave || successDelete) { //!.active to stop reloading on success
            setFormAlertVisible(false)
            setModelVisible(false)
            dispatch(listUsers())
            setActionNote(`User ${formAction == 'Create' ? 'Creat' : formAction}ed succefully`)
            setActionNoteVisible(true)
            setInterval(() => setActionNoteVisible(false), 5000)
            setFormAction('')
            dispatch(saveUser('clear'))
        }
        employeeId && employeeList.map(employee => {
            if (employee._id === employeeId) {
                setImage(employee.image)
                return
            }
        })
        return () => {
            //
        };
    }, [successSave, successDelete, employeeId]);

    const openModel = async (user) => {
        setModelVisible(true)
        setId(user._id ? user._id : '')
        setName(user.name ? user.name : '')
        setEmail(user.email ? user.email : '')
        setPhone(user.phone ? user.phone : '')
        setPassword(user.password ? user.password : '')
        setIsAdmin(user.isAdmin ? user.isAdmin : false)
        setIsCallCenterAgent(user.isCallCenterAgent ? user.isCallCenterAgent : false)
        setIsAttendanceManager(user.isAttendanceManager ? user.isAttendanceManager : false)
        setEmployeeId(user.employeeId ? user.employeeId : undefined)
        setImage(user.image ? user.image : '')
    };

    const submitHandler = (e) => {
        e.preventDefault()
        const user = { _id, name, email, phone, password, isAdmin, isCallCenterAgent, isAttendanceManager, image, employeeId }
        formAction === 'Copy' && delete user._id
        if (name != '' && email != '' && phone && password != '') {
            dispatch(saveUser(user))
        }
        else setFormAlertVisible(true)
    }

    const createHandler = () => {
        setFormAction('Create')
        openModel({})
    }

    const editHandler = (user) => {
        setFormAction('Edit')
        openModel(user)
    }

    const deleteHandler = (e, _id) => {
        e.preventDefault()
        dispatch(deleteUser(_id))
    }

    const copyHandler = (user) => {
        setFormAction('Copy')
        openModel(user)
    }

    // return today, yesterday, days ago, and time
    const dayConverter = (date, active) => {

        if (date) {
            var dateNum = date.split("T", 1)[0]
            var time = date.slice(date.indexOf('T') + 1, -1).slice(0, 9)
            var dateDay = dateNum.slice(8, 10)
            var dateMonth = dateNum.slice(5, 7)
            var dateYear = dateNum.slice(0, 4)
            var timeHour = time.slice(0, 2)
            var timeMin = time.slice(3, 5)
            var timeSec = time.slice(6, 8)

            var yearDiff = parseInt(currentYear) - parseInt(dateYear)
            var yearStatus = yearDiff === 1 ? 'Last year' : yearDiff + ' years ago'
            var monthDiff = parseInt(currentMonthNum) - parseInt(dateMonth)
            var monthStatus = monthDiff === 1 ? 'Last month' : monthDiff + ' months ago'
            var dayDiff = parseInt(currentDay) - parseInt(dateDay)
            var dayStatus = dayDiff === 1 ? 'Yesterday' : dayDiff + ' days ago'
            var hourDiff = parseInt(currentHour) - parseInt(timeHour)
            var hourStatus = hourDiff === 1 ? 'Last hour' : hourDiff + ' hours ago'
            var minDiff = parseInt(currentMinutes) - parseInt(timeMin)
            var minStatus = minDiff === 1 ? 'Last minute' : minDiff + ' min ago'
            var secDiff = parseInt(currentSeconds) - parseInt(timeSec)
            var secStatus = secDiff <= 1 ? 'Online' : secDiff + ' sec ago'

            var status = 'Online'

            if (!active) {
                if (yearDiff === 0) {
                    if (monthDiff === 0) {
                        if (dayDiff === 0) {
                            if (hourDiff === 0) {
                                if (minDiff === 0) {
                                    status = secStatus
                                } else if (minDiff < 59) status = minStatus
                            } else if (hourDiff < 23) status = hourStatus
                        } else if (dayDiff < 29) status = dayStatus
                    } else if (monthDiff < 11) status = monthStatus
                } else status = yearStatus
            }

            return status
        }
    }

    return (
        <div>
            {actionNoteVisible && <div className="action-note">{actionNote}</div>}
            <div className="control-page-header">
                <h3 className="header-title">Users Manager</h3>
                <button type="button" className="header-button" onClick={() => createHandler()}>Create User</button>
            </div>
            {
                modelVisible &&
                <form className="form-form" onSubmit={(e) => submitHandler(e)}>
                    <ul className="form-container-manager">
                        <FontAwesome name="fa-window-close" className="far fa-window-close fa-lg" onClick={() => setModelVisible(false)} />
                        <li>
                            <h2>{formAction == 'Copy' ? 'Create' : formAction} User</h2>
                        </li>
                        <li>
                            <label className="label" htmlFor="name">Name<p className="required">*</p></label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                        </li>
                        <li>
                            <label className="label" htmlFor="phone">Phone<p className="required">*</p></label>
                            <input
                                type="text"
                                name="phone"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            ></input>
                        </li>
                        <li>
                            <label className="label" htmlFor="email">Email<p className="required">*</p></label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></input>
                        </li>
                        <li>
                            <label className="label" htmlFor="password">Password<p className="required">*</p></label>
                            <input
                                type="text"
                                name="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                        </li>
                        <div className='li-users'>
                            <input
                                className='switch'
                                type="checkbox"
                                name="isAdmin"
                                id="isAdmin s2"
                                value={isAdmin}
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></input>
                            <label className="label switch-label" htmlFor="isCallCenterAgent">Is Admin?</label>
                        </div>
                        {isAdmin && <li>
                            <label className="label" htmlFor="employeeName">Employee Name<p className="required">*</p></label>
                            <select
                                value={employeeId}
                                onChange={(e) => {
                                    setEmployeeId(
                                        e.target.selectedIndex ?
                                            e.target.options[e.target.selectedIndex].value :
                                            e.target.value)
                                }}
                            >
                                <option key='' value=''>
                                    Select...
                                </option>
                                {employeeList
                                    && employeeList.map((employee) => (
                                        <option key={employee._id} value={employee._id}>
                                            {employee.firstName + ' ' + employee.lastName}
                                        </option>
                                    ))}
                            </select>
                        </li>}
                        <div className='li-users'>
                            <input
                                className='switch'
                                type="checkbox"
                                name="isCallCenterAgent"
                                id="isCallCenterAgent s2"
                                value={isCallCenterAgent}
                                checked={isCallCenterAgent}
                                onChange={(e) => setIsCallCenterAgent(e.target.checked)}
                            ></input>
                            <label className="label switch-label" htmlFor="isCallCenterAgent">Is Call Center Agent?</label>
                        </div>
                        <div className='li-users'>
                            <input
                                className='switch'
                                type="checkbox"
                                name="isAttendanceManager"
                                id="isAttendanceManager s2"
                                value={isAttendanceManager}
                                checked={isAttendanceManager}
                                onChange={(e) => setIsAttendanceManager(e.target.checked)}
                            ></input>
                            <label className="label switch-label" htmlFor="isAttendanceManager">Is Attendance Manager?</label>
                        </div>
                        <li>
                            {formAlertVisible && <div className="invalid">{formAlert}</div>}
                            <button type="submit" className="button primary">
                                {
                                    formAction == 'Copy' ? 'Create' :
                                        formAction == 'Edit' ? 'Save' : formAction
                                }
                            </button>
                            <button type="button" className="button secondary" onClick={() => setModelVisible(false)}>
                                Back
                            </button>
                        </li>
                    </ul>
                </form>
            }
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ paddingRight: '0.5rem' }}>Active</th>
                        <th>Last Activity</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Password</th>
                        <th>is Admin</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user) => (
                        <tr key={user._id}>
                            <td className='td-active'>
                                <FontAwesomeIcon className={`${user.active ? 'faCircle' : 'farCircle'}`} icon={faCircle} />
                            </td>
                            <td>{dayConverter(user.lastActivity, user.active)}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.password}</td>
                            <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                            <td>
                                <button className="table-btns" onClick={() => editHandler(user)}>Edit</button>
                                <button className="table-btns" onClick={(e) => deleteHandler(e, user._id)}>Delete</button>
                                <button className="table-btns" onClick={() => copyHandler(user)} disabled>Copy</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersManager
