import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import FontAwesome from 'react-fontawesome'
import axios from 'axios'
import { listAttendance, saveAttendance, deleteAttendance } from '../../actions/attendanceActions'
import { days, months, years, weekDays } from '../../constants/lists'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from '@fortawesome/free-solid-svg-icons'
import { } from '@fortawesome/free-brands-svg-icons'

function AttendanceManager(props) {
    const imageUrl = window.location.origin + '/api/uploads/image/'
    var d = new Date()
    var currentYear = d.getFullYear()
    var currentMonth = months[d.getMonth()]
    var currentDay = d.getDate()
    var currentWeekDay = weekDays[d.getDay()]
    var currentHour = d.getHours()
    var currentMinutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
    var currentSeconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()

    const [formAction, setFormAction] = useState('Create')
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

    const [_id, setId] = useState()
    const [modified, setModified] = useState()
    const [employeeId, setEmployeeId] = useState()
    const [employeeName, setEmployeeName] = useState()
    const [employeeImage, setEmployeeImage] = useState()
    const [date, setDate] = useState()
    const [weekDay, setWeekDay] = useState()
    const [checkin, setCheckin] = useState()
    const [checkinTime, setCheckinTime] = useState()
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

        setId(attendance._id ? attendance._id : undefined)
        setModified(attendance.modified ? attendance.modified : undefined)
        setEmployeeId(attendance.employeeId ? attendance.employeeId : undefined)
        setEmployeeName(attendance.employeeName ? attendance.employeeName : undefined)
        setEmployeeImage(attendance.employeeImage ? attendance.employeeImage : undefined)
        setDate(attendance.date ? attendance.date : Date.now())
        setWeekDay(attendance.weekDay ? attendance.weekDay : currentWeekDay)

        if (attendance.checkin) {
            setCheckin(attendance.checkin ? attendance.checkin : undefined)
            setCheckinTime(attendance.checkin.time ? attendance.checkin.time : undefined)
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

    }

    const createHandler = (e) => {
        setModelVisible(true)
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
                        <li>
                            <img className='employee-img-attendance'
                                src={imageUrl + employeeImage} alt='employee' />
                        </li>
                        <li>
                            <label className="label" htmlFor="employeeName">Employee Name<p className="required">*</p></label>
                            <input
                                type="text"
                                name="employeeName"
                                id="employeeName"
                                value={employeeName}
                                onChange={(e) => setEmployeeName(e.target.value)}
                                readOnly={formAction !== 'create' && !userInfo.isAttendanceManager && 'readOnly'}
                            ></input>
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
                                <input
                                    type="time"
                                    name="checkinTime"
                                    id="checkinTime"
                                    value={checkinTime}
                                    onChange={(e) => setCheckinTime(e.target.value)}
                                />
                            </fieldset>
                        </li>
                        <li>
                            {formAlertVisible && <div className="invalid">{formAlert}</div>}
                            <button type="submit" className="button primary">
                                {formAction}
                            </button>
                            <button type="button" className="button secondary" onClick={() => setModelVisible(false)}>
                                Back
                            </button>
                        </li>
                    </ul>
                </form>}
        </div>
    );
}

export default AttendanceManager;
