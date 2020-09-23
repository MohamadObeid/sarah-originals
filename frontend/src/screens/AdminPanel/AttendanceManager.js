import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import FontAwesome from 'react-fontawesome'
import { listAttendance, saveAttendance, deleteAttendance } from '../../actions/attendanceActions'
import { detailsEmployee } from '../../actions/employeeActions'
import { days, months, years, weekDays } from '../../constants/lists'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCircle } from '@fortawesome/free-solid-svg-icons'
import { } from '@fortawesome/free-brands-svg-icons'
import ReactTooltip from "react-tooltip"

function AttendanceManager(props) {
    const [IP, setIP] = useState()

    const getIPAddress = async () => {
        await fetch('https://geolocation-db.com/json/7733a990-ebd4-11ea-b9a6-2955706ddbf3')
            .then(res => res.json())
            .then(IP => { setIP(IP); console.log(IP, 'failed') })
    }

    useEffect(() => {
        getIPAddress()
        userInfo && dispatch(detailsEmployee(userInfo.employeeId))
        return () => {
            //
        };
    }, [])

    const imageUrl = window.location.origin + '/api/uploads/image/'
    var d = new Date()
    var currentYear = d.getFullYear()
    var currentMonth = months[d.getMonth()]
    var currentDay = d.getDate()
    var currentWeekDay = weekDays[d.getDay()]
    var currentHour = d.getHours()
    var currentMinutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
    var currentSeconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()

    var currentDate = currentWeekDay.slice(0, 3) + ' ' + currentDay + ' ' + currentMonth + ' ' + currentYear

    const [formAction, setFormAction] = useState('Submit')
    const [actionNote, setActionNote] = useState()
    const [actionNoteVisible, setActionNoteVisible] = useState(false)
    const [formAlert, setFormAlert] = useState('Kindly fill all required blanks!')
    const [formAlertVisible, setFormAlertVisible] = useState(false)
    const [modelVisible, setModelVisible] = useState(false)
    const [historyVisible, setHistoryVisible] = useState(false)
    const [assignmentValues, setAssignmentValues] = useState()
    const [uploading, setUploading] = useState(false)
    const [dropdownList, setDropdownList] = useState()
    const [dropdownListVisible, setDropdownListVisible] = useState(false)
    const [commentVisible, setCommentVisible] = useState(false)
    const [comment, setComment] = useState()
    const [isAbsent, setIsAbsent] = useState(false)

    const [_id, setId] = useState()
    const [modified, setModified] = useState()
    const [employeeId, setEmployeeId] = useState()
    const [employeeName, setEmployeeName] = useState()
    const [employeeImage, setEmployeeImage] = useState()
    const [date, setDate] = useState()
    const [weekDay, setWeekDay] = useState()
    const [checkin, setCheckin] = useState()
    const [checkinTime, setCheckinTime] = useState()
    const [checkinRecord, setCheckinRecord] = useState()
    const [checkinLocation, setCheckinLocation] = useState()
    const [checkinLateness, setCheckinLateness] = useState()
    const [checkinLatenessHours, setCheckinLatenessHours] = useState()
    const [checkinLatenessReason, setCheckinLatenessReason] = useState()
    const [checkinOverTime, setCheckinOverTime] = useState()
    const [checkinOverTimeHours, setCheckinOverTimeHours] = useState()
    const [checkinOverTimeReason, setCheckinOverTimeReason] = useState()
    const [checkinRequest, setCheckinRequest] = useState()
    const [checkinRequestTime, setCheckinRequestTime] = useState()
    const [checkinRequestReason, setCheckinRequestReason] = useState()
    const [checkinRequestConfirmation, setCheckinRequestConfirmation] = useState()
    const [checkout, setCheckout] = useState()
    const [checkoutTime, setCheckoutTime] = useState()
    const [checkoutRecord, setCheckoutRecord] = useState()
    const [checkoutLocation, setCheckoutLocation] = useState()
    const [checkoutEarliness, setCheckoutEarliness] = useState()
    const [checkoutEarlinessHours, setCheckoutEarlinessHours] = useState()
    const [checkoutEarlinessReason, setCheckoutEarlinessReason] = useState()
    const [checkoutOverTime, setCheckoutOverTime] = useState()
    const [checkoutOverTimeHours, setCheckoutOverTimeHours] = useState()
    const [checkoutOverTimeReason, setCheckoutOverTimeReason] = useState()
    const [checkoutRequestTime, setCheckoutRequestTime] = useState()
    const [checkoutRequest, setCheckoutRequest] = useState()
    const [checkoutRequestReason, setCheckoutRequestReason] = useState()
    const [checkoutRequestStatus, setCheckoutRequestStatus] = useState()
    const [checkoutRequestConfirmation, setCheckoutRequestConfirmation] = useState()
    const [absence, setAbsence] = useState()
    const [absenceReason, setAbsenceReason] = useState()
    const [absenceRequest, setAbsenceRequest] = useState()
    const [absenceRequestReason, setAbsenceRequestReason] = useState()
    const [absenceRequestConfirmation, setAbsenceRequestConfirmation] = useState()
    const [note, setNote] = useState()

    const { success: successSave } = useSelector(state => state.attendanceSave)
    const { success: successDelete } = useSelector(state => state.attendanceDelete)
    const { employees } = useSelector(state => state.employeeList)
    const { attendance: attendanceList } = useSelector(state => state.attendanceList)
    const { userInfo } = useSelector(state => state.userSignin)
    const { employee } = useSelector(state => state.employeeDetails)

    const dispatch = useDispatch()
    useEffect(() => {
        if (successSave || successDelete) {
            setFormAlertVisible(false)
            setModelVisible(false)
            dispatch(listAttendance())
            setActionNote(`Attendance ${formAction}ed succefully`)
            setActionNoteVisible(true)
            setInterval(() => setActionNoteVisible(false), 5000)
            setFormAction('')
            dispatch(saveAttendance('clear'))
        }
        return () => {
            //
        }
    }, [successSave, successDelete])

    const openModel = (attendance) => {
        setModelVisible(true)
        setIsAbsent(false)

        setId(attendance._id ? attendance._id : undefined)
        setModified(attendance.modified ? attendance.modified : undefined)
        setEmployeeId(attendance.employeeId ? attendance.employeeId : undefined)
        attendance.employeeId && userInfo.employeeId != attendance.employeeId && dispatch(detailsEmployee(attendance.employeeId))
        setEmployeeName(attendance.employeeName ? attendance.employeeName : undefined)
        setEmployeeImage(attendance.employeeImage ? attendance.employeeImage : undefined)
        setDate(attendance.date ? attendance.date : d)
        setWeekDay(attendance.weekDay ? attendance.weekDay : currentWeekDay)

        if (attendance.checkin) {
            setCheckin(attendance.checkin ? attendance.checkin : undefined)
            setCheckinTime(attendance.checkin.time ? attendance.checkin.time : undefined)
            setCheckinRecord(attendance.checkin.record ? attendance.checkin.record : undefined)
            setCheckinLocation(attendance.checkin.location ? attendance.checkin.location : undefined)
            if (attendance.checkin.lateness) {
                setCheckinLateness(attendance.checkin.lateness ? attendance.checkin.lateness : undefined)
                setCheckinLatenessHours(attendance.checkin.lateness.hours ? attendance.checkin.lateness.hours : undefined)
                setCheckinLatenessReason(attendance.checkin.lateness.reason ? attendance.checkin.lateness.reason : undefined)
            }
            if (attendance.checkin.overTime) {
                setCheckinOverTime(attendance.checkin.overTime ? attendance.checkin.overTime : undefined)
                setCheckinOverTimeHours(attendance.checkin.overTime.hours ? attendance.checkin.overTime.hours : undefined)
                setCheckinOverTimeReason(attendance.checkin.overTime ? attendance.checkin.overTime : undefined)
            }
            if (attendance.checkin.request) {
                setCheckinRequest(attendance.checkin.request ? attendance.checkin.request : undefined)
                setCheckinRequestTime(attendance.checkin.request.time ? attendance.checkin.request.time : undefined)
                setCheckinRequestReason(attendance.checkin.request.reason ? attendance.checkin.request.reason : undefined)
                setCheckinRequestConfirmation(attendance.checkin.request.confirmation ? attendance.checkin.request.confirmation : undefined)
            }
        }

        if (attendance.checkout) {
            setCheckout(attendance.checkout ? attendance.checkout : undefined)
            setCheckoutTime(attendance.checkout.time ? attendance.checkout.time : undefined)
            setCheckoutRecord(attendance.checkout.record ? attendance.checkout.record : undefined)
            setCheckoutLocation(attendance.checkout.location ? attendance.checkout.location : undefined)
            if (attendance.checkout.earliness) {
                setCheckoutEarliness(attendance.checkout.earliness ? attendance.checkout.earliness : undefined)
                setCheckoutEarlinessHours(attendance.checkout.earliness.hours ? attendance.checkout.earliness.hours : undefined)
                setCheckoutEarlinessReason(attendance.checkout.earliness.reason ? attendance.checkout.earliness.reason : undefined)
            }
            if (attendance.checkout.overTime) {
                setCheckoutOverTime(attendance.checkout.overTime ? attendance.checkout.overTime : undefined)
                setCheckoutOverTimeHours(attendance.checkout.overTime.hours ? attendance.checkout.overTime.hours : undefined)
                setCheckoutOverTimeReason(attendance.checkout.overTime.reason ? attendance.checkout.overTime.reason : undefined)
            }
            if (attendance.checkout.request) {
                setCheckoutRequest(attendance.checkout.request ? attendance.checkout.request : undefined)
                setCheckoutRequestTime(attendance.checkout.request.time ? attendance.checkout.request.time : undefined)
                setCheckoutRequestReason(attendance.checkout.request.reason ? attendance.checkout.request.reason : undefined)
                setCheckoutRequestConfirmation(attendance.checkout.request.confirmation ? attendance.checkout.request.confirmation : undefined)
            }
        }

        if (attendance.absence) {
            setIsAbsent(true)
            setAbsence(attendance.absence ? attendance.absence : undefined)
            setAbsenceReason(attendance.absence.reason ? attendance.absence.reason : undefined)
            if (attendance.absence.request) {
                setAbsenceRequest(attendance.absence.request ? attendance.absence.request : undefined)
                setAbsenceRequestReason(attendance.absence.request.reason ? attendance.absence.request.reason : undefined)
                setAbsenceRequestConfirmation(attendance.absence.request.confirmation ? attendance.absence.request.confirmation : undefined)
            }
        }

        setNote(attendance.note ? attendance.note : undefined)
        setFormAlertVisible(false)
    }

    const modifiedArray = (attendance) => {
        let modifiedNote = []
        if (attendance.checkin) {
            if (checkinTime !== attendance.checkin.time) modifiedNote = [...modifiedNote, 'Check In Time']
            if (checkinRecord !== attendance.checkin.record) modifiedNote = [...modifiedNote, 'Check In Record']
            if (checkinLocation !== attendance.checkin.location) modifiedNote = [...modifiedNote, 'Check In Location']
            if (attendance.checkin.lateness) {
                if (checkinLatenessHours !== attendance.checkin.lateness.hours) modifiedNote = [...modifiedNote, 'Check In Lateness Hours']
                if (checkinLatenessReason !== attendance.checkin.lateness.reason) modifiedNote = [...modifiedNote, 'Check In Lateness Reason']
            }
            if (attendance.checkin.overTime) {
                if (checkinOverTimeHours !== attendance.checkin.overTime.hours) modifiedNote = [...modifiedNote, 'Check In Over Time Hours']
                if (checkinOverTimeReason !== attendance.checkin.overTime.reason) modifiedNote = [...modifiedNote, 'Check In Over Time Reason']
            }
            if (attendance.checkin.request) {
                if (checkinRequestTime !== attendance.checkin.request.time) modifiedNote = [...modifiedNote, 'Request Check In Time']
                if (checkinRequestReason !== attendance.checkin.request.reason) modifiedNote = [...modifiedNote, 'Request Check In Reason']
                if (checkinRequestConfirmation !== attendance.checkin.request.confirmation) modifiedNote = [...modifiedNote, 'Request Check In Confirmation']
            }
        }
        if (attendance.checkout) {
            if (checkoutTime !== attendance.checkout.time) modifiedNote = [...modifiedNote, 'Check Out Time']
            if (checkoutRecord !== attendance.checkout.record) modifiedNote = [...modifiedNote, 'Check Out Record']
            if (checkoutLocation !== attendance.checkout.location) modifiedNote = [...modifiedNote, 'Check Out Location']
            if (attendance.checkout.lateness) {
                if (checkoutEarlinessHours !== attendance.checkout.earliness.hours) modifiedNote = [...modifiedNote, 'Check Out Earliness Hours']
                if (checkoutEarlinessReason !== attendance.checkout.earliness.reason) modifiedNote = [...modifiedNote, 'Check Out Earliness Reason']
            }
            if (attendance.checkout.overTime) {
                if (checkoutOverTimeHours !== attendance.checkout.overTime.hours) modifiedNote = [...modifiedNote, 'Check Out Over Time Hours']
                if (checkoutOverTimeReason !== attendance.checkout.overTime.reason) modifiedNote = [...modifiedNote, 'Check Out Over Time Reason']
            }
            if (attendance.checkout.request) {
                if (checkoutRequestTime !== attendance.checkout.request.time) modifiedNote = [...modifiedNote, 'Request Check Out Time']
                if (checkoutRequestReason !== attendance.checkout.request.reason) modifiedNote = [...modifiedNote, 'Request Check Out Reason']
                if (checkoutRequestConfirmation !== attendance.checkout.request.confirmation) modifiedNote = [...modifiedNote, 'Request Check Out Confirmation']
            }
        }
        if (attendance.absence) {
            if (absenceReason !== attendance.absence.reason) modifiedNote = [...modifiedNote, 'Absence Reason']
            if (attendance.absence.request) {
                if (absenceRequestReason !== attendance.absence.request.reason) modifiedNote = [...modifiedNote, 'Absence Reason Reaquest']
                if (absenceRequestConfirmation !== attendance.absence.request.confirmation) modifiedNote = [...modifiedNote, 'Absence Confirmation Reaquest']
            }
        }
        if (note !== attendance.note) modifiedNote = [...modifiedNote, 'Note']
        return [...modified, {
            modified_date: Date.now() + 10800000,
            modified_by: userInfo.name,
            modified_note: modifiedNote,
        }]
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const attendanceExist = attendanceList ? attendanceList.find(attendance => attendance._id === _id) : undefined
        const checkingout = attendanceList ? attendanceList.find(attendance => attendance.date === currentDate && attendance.employeeId === userInfo.employeeId && !attendance.checkout) : undefined
        if (checkingout) { checkoutHandler(checkingout) }
        else if (!attendanceExist && !checkingout) { checkinHandler() }
        else if (attendanceExist) { requestHandler(attendanceExist) }
    }

    const requestHandler = (attendance) => {

    }

    const checkinHandler = () => {
        var workTime = workTimeEnd()
        var timeDiff = timeDiffCalc(currentHour + ':' + currentMinutes, workTime)
        var lateness = false
        var overTime = false
        if (timeDiff.sign) {
            timeDiff = timeDiff.diff;
            lateness = true
        } else if (timeDiff !== '00:00') overTime = true

        dispatch(saveAttendance({
            creation_date: Date.now() + 10800000,
            created_by: employee.firstName + ' ' + employee.lastName,
            employeeId: employee._id,
            employeeName: employeeName ? employeeName : (employee.firstName + ' ' + employee.lastName),
            employeeImage: employeeImage ? employeeImage : employee.image,
            date: currentDate,
            checkin: {
                time: workTime, record: currentHour + ':' + currentMinutes, location: IP.country_name + ' ' + IP.state,
                lateness: lateness && { hours: timeDiff, reason: checkinLatenessReason },
                overTime: overTime && { hours: timeDiff, reason: checkinOverTimeReason },
            }
        }))
    }

    const checkoutHandler = (checkout) => {
        var workTime = workTimeEnd()
        var timeDiff = timeDiffCalc(workTime, currentHour + ':' + currentMinutes)
        var earliness = false
        var overTime = false
        if (timeDiff.sign) {
            timeDiff = timeDiff.diff;
            earliness = true
        } else if (timeDiff !== '00:00') overTime = true
        dispatch(saveAttendance({
            _id: checkout._id,
            modified, checkout: {
                time: workTime, record: currentHour + ':' + currentMinutes, location: IP.country_name + ' ' + IP.state,
                earliness: earliness && { hours: timeDiff, reason: checkoutEarlinessReason },
                overTime: overTime && { hours: timeDiff, reason: checkoutOverTimeReason },
                //request: { time: checkoutRequestTime, reason: checkoutRequestReason, status: checkoutRequestStatus }
            },
        }))
    }

    const timeDiffCalc = (from, to) => {
        var fromHour = from.slice(0, 2)
        var fromMin = from.slice(3, 5)
        var toHour = to.slice(0, 2)
        var toMin = to.slice(3, 5)
        if (fromHour === toHour) {
            if (toMin > fromMin) { return '00:' + ((toMin - fromMin) ? '0' + (toMin - fromMin) : (toMin - fromMin)) }
            else if (toMin < fromMin) { return { sign: '-', diff: '00:' + ((fromMin - toMin) < 10 ? '0' + (fromMin - toMin) : (fromMin - toMin)) } }
            else if (toMin === fromMin) return '00:00'
        } else if (toHour > fromHour) {
            if (toMin < fromMin) { return (((toHour - fromHour - 1) < 10 ? '0' + (toHour - fromHour - 1) : (toHour - fromHour - 1)) + ':' + (60 - fromMin + parseInt(toMin))) }
            else if (toMin === fromMin) { return (((toHour - fromHour) < 10 ? '0' + (toHour - fromHour) : '0' + (toHour - fromHour)) + ':00') }
            else if (toMin > fromMin) { return (((toHour - fromHour) < 10 ? '0' + (toHour - fromHour) : (toHour - fromHour)) + ':' + ((toMin - fromMin) < 10 ? '0' + (toMin - fromMin) : (toMin - fromMin))) }
        } else if (toHour < fromHour) {
            if (toMin > fromMin) { return ({ sign: '-', diff: ((fromHour - toHour - 1) < 10 ? '0' + (fromHour - toHour - 1) : (fromHour - toHour - 1)) + ':' + (60 - toMin + parseInt(fromMin)) }) }
            else if (toMin === fromMin) { return ({ sign: '-', diff: ((fromHour - toHour) < 10 ? '0' + (fromHour - toHour) : '0' + (fromHour - toHour)) + ':00' }) }
            else if (toMin < fromMin) { return ({ sign: '-', diff: ((fromHour - toHour) < 10 ? '0' + (fromHour - toHour) : (fromHour - toHour)) + ':' + ((fromMin - toMin) < 10 ? '0' + (fromMin - toMin) : (fromMin - toMin)) }) }
        }
    }

    const workTimeEnd = () => {
        if (currentWeekDay === 'Monday') return employee.workTime.mon.to
        else if (currentWeekDay === 'Tuesday') return employee.workTime.tue.to
        else if (currentWeekDay === 'Wednesday') return employee.workTime.wed.to
        else if (currentWeekDay === 'Thursday') return employee.workTime.thu.to
        else if (currentWeekDay === 'Friday') return employee.workTime.fri.to
        else if (currentWeekDay === 'Saturday') return employee.workTime.sat.to
        else if (currentWeekDay === 'Sunday') return employee.workTime.sun.to
    }

    const workTimeStart = () => {
        if (currentWeekDay === 'Monday') return employee.workTime.mon.from
        else if (currentWeekDay === 'Tuesday') return employee.workTime.tue.from
        else if (currentWeekDay === 'Wednesday') return employee.workTime.wed.from
        else if (currentWeekDay === 'Thursday') return employee.workTime.thu.from
        else if (currentWeekDay === 'Friday') return employee.workTime.fri.from
        else if (currentWeekDay === 'Saturday') return employee.workTime.sat.from
        else if (currentWeekDay === 'Sunday') return employee.workTime.sun.from
    }

    const createHandler = (e) => {
        setModelVisible(true)
    }

    const showTimeTooltip = (checkin) => {
        if (!checkin.lateness && !checkin.overTime) {
            return 'On Time'
        } else if (checkin.lateness && checkin.lateness.hours) {
            return 'Late: ' + checkin.lateness.hours
        } else if (checkin.overTime && checkin.overTime.hours) {
            return 'Over Time: ' + checkin.overTime.hours
        }
    }

    const FaCircleColor = (checkin) => {
        if (!checkin) return 'grey'
        else if (checkin.lateness && checkin.lateness.hours) return 'red'
        else if (checkin.overTime && checkin.overTime.hours) return 'green'
    }

    return (
        <div>
            {actionNoteVisible && <div className="action-note">{actionNote}</div>}
            <div className="control-page-header">
                <h3 className="header-title">Attendance Manager</h3>
                <button type="button" className="header-button" onClick={() => createHandler()}>Create Attendance</button>
            </div>
            {
                modelVisible &&
                <form className="form-form" onSubmit={(e) => submitHandler(e)}>
                    <ul className="form-container-manager">
                        <FontAwesome name="fa-window-close" className="far fa-window-close fa-lg" onClick={() => setModelVisible(false)} />
                        <li>
                            <h2>Attendance Form</h2>
                        </li>
                        {employeeImage && <li>
                            <img className='employee-img-attendance'
                                src={imageUrl + employeeImage} alt='employee' />
                        </li>}
                        <li>
                            <div className="label">Employee Name<p className="required">*</p></div>
                            <select
                                value={employeeName}
                                onChange={(e) => {
                                    setEmployeeName(
                                        e.target.selectedIndex ?
                                            e.target.options[e.target.selectedIndex].value :
                                            e.target.value);
                                }}
                                readOnly={!userInfo.isAttendanceManager && 'readOnly'}
                            >
                                <option key='' value=''>
                                    Select...
                                </option>
                                {employees
                                    && employees.map((emp) => (
                                        <option key={emp._id} value={emp.firstName + ' ' + emp.lastName}>
                                            {emp.firstName + ' ' + emp.lastName}
                                        </option>
                                    ))}
                            </select>
                        </li>
                        <li>
                            <label className="label" htmlFor="date">Date<p className="required">*</p></label>
                            <input
                                type="date"
                                name="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                readOnly={formAction !== 'create' && !userInfo.isAttendanceManager && 'readOnly'}
                            ></input>
                        </li>
                        <li>
                            <div className="label">Week Day<p className="required">*</p></div>
                            <select
                                value={weekDay}
                                onChange={(e) => {
                                    setWeekDay(
                                        e.target.selectedIndex ?
                                            e.target.options[e.target.selectedIndex].value :
                                            e.target.value);
                                }}
                                readOnly={formAction !== 'create' && !userInfo.isAttendanceManager && 'readOnly'}
                            >
                                <option key='' value=''>
                                    Select...
                                </option>
                                {weekDays
                                    && weekDays.map((day) => (
                                        <option key={day} value={day}>
                                            {day}
                                        </option>
                                    ))}
                            </select>
                        </li>
                        <li>
                            <label className="label" htmlFor="checkin">Check In<p className="required">*</p></label>
                            <fieldset className='fieldset'>
                                <label className="label" htmlFor="checkinTime">Time<p className="required">*</p></label>
                                <div>
                                    <input
                                        style={{ marginRight: '1rem' }}
                                        type="time"
                                        name="checkinTime"
                                        id="checkinTime"
                                        value={checkinTime}
                                        onChange={(e) => setCheckinTime(e.target.value)}
                                    />
                                    <FontAwesomeIcon icon={faTimes} style={{ color: 'red', cursor: 'pointer' }}
                                        onClick={() => setCheckinTime('')} />
                                </div>
                                <label className="label" htmlFor="checkinLatenessHours">Lateness Hours<p className="required">*</p></label>
                                <input
                                    type="text"
                                    name="checkinLatenessHours"
                                    id="checkinLatenessHours"
                                    value={checkinLatenessHours}
                                    onChange={(e) => setCheckinLatenessHours(e.target.value)}
                                    readOnly
                                />
                                <label className="label" htmlFor="checkinLatenessReason">Lateness Reason<p className="required">*</p></label>
                                <textarea
                                    name="checkinLatenessReason"
                                    id="checkinLatenessReason"
                                    value={checkinLatenessReason}
                                    onChange={(e) => setCheckinLatenessReason(e.target.value)}
                                />
                            </fieldset>
                        </li>
                        <li>
                            <label className="label" htmlFor="checkout">Check Out<p className="required">*</p></label>
                            <fieldset className='fieldset'>
                                <label className="label" htmlFor="checkoutTime">Time<p className="required">*</p></label>
                                <div><input
                                    style={{ marginRight: '1rem' }}
                                    type="time"
                                    name="checkoutTime"
                                    id="checkoutTime"
                                    value={checkoutTime}
                                    onChange={(e) => setCheckoutTime(e.target.value)}
                                />
                                    <FontAwesomeIcon icon={faTimes} style={{ color: 'red', cursor: 'pointer' }}
                                        onClick={() => setCheckoutTime('')} />
                                </div>
                                <label className="label" htmlFor="checkoutEarlinessHours">Early Leave Hours<p className="required">*</p></label>
                                <input
                                    type="text"
                                    name="checkoutEarlinessHours"
                                    id="checkoutEarlinessHours"
                                    value={checkoutEarlinessHours}
                                    onChange={(e) => setCheckoutEarlinessHours(e.target.value)}
                                    readOnly
                                />
                                <label className="label" htmlFor="checkoutEarlinessReason">Early Leave Reason<p className="required">*</p></label>
                                <textarea
                                    name="checkoutEarlinessReason"
                                    id="checkoutEarlinessReason"
                                    value={checkoutEarlinessReason}
                                    onChange={(e) => setCheckoutEarlinessReason(e.target.value)}
                                />
                            </fieldset>
                        </li>
                        <li>
                            <div style={{ display: 'flex' }}>
                                <input
                                    className='switch'
                                    type="checkbox"
                                    name='isAbsent'
                                    id="active s2"
                                    value={isAbsent}
                                    checked={isAbsent}
                                    onChange={(e) => setIsAbsent(e.target.checked)}
                                ></input>
                                <label className="label" htmlFor="isAbsent"
                                    style={{ paddingLeft: '1rem' }}>Is Absent</label></div>
                        </li>
                        {isAbsent && <li>
                            <fieldset className='fieldset'>
                                <label className="label" htmlFor="absenceReason">Absence Reason<p className="required">*</p></label>
                                <textarea
                                    name="absenceReason"
                                    id="absenceReason"
                                    value={absenceReason}
                                    onChange={(e) => setAbsenceReason(e.target.value)}
                                />
                            </fieldset>
                        </li>}
                        <li>
                            {formAlertVisible && <div className="invalid">{formAlert}</div>}
                            <button type="submit" className="button primary">{formAction}</button>
                            <button type="button" className="button secondary" onClick={() => setModelVisible(false)}>
                                Back
                            </button>
                        </li>
                    </ul>
                </form>}
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th style={{ textAlign: 'center' }}>Photo</th>
                        <th>Date</th>
                        <th>Check In</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>Check Out</th>
                        <th>Request</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceList &&
                        attendanceList.map((attendance) => (
                            <tr key={attendance._id}>
                                <td>{attendance.name}</td>
                                <td className='td-img'>
                                    <img
                                        className='attendance-image'
                                        src={imageUrl + attendance.image} alt='employee' />
                                </td>
                                <td>{attendance.date}</td>
                                <td>{attendance.checkin.time}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <div><FontAwesomeIcon data-tip data-for={attendance.checkin}
                                        className={`faCircle ${FaCircleColor(attendance.checkin)}`}
                                        icon={faCircle} />
                                        {attendance.checkin && <ReactTooltip id={attendance.checkin} place="top" effect="solid">
                                            {showTimeTooltip(attendance.checkin)}<br />
                                                Location: {attendance.checkin.location}
                                        </ReactTooltip>}
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default AttendanceManager;
