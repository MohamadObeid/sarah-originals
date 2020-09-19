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
    var d = new Date()
    var currentYear = d.getFullYear()
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
    const [checkoutRequestReason, setCheckoutRequestReason] = useState()
    const [checkoutRequestConfirmation, setCheckoutRequestConfirmation] = useState()
    const [absence, setAbsence] = useState()
    const [absenceDate, setAbsenceDate] = useState()
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

        setId(attendance._id ? attendance._id : '')
        setModified(attendance.modified ? attendance.modified : [])
        setEmployeeId(attendance.employeeId ? attendance.employeeId : '')
        setEmployeeName(attendance.employeeName ? attendance.employeeName : '')
        setDate(attendance.date ? attendance.date : Date.now())
        setWeekDay(attendance.weekDay ? attendance.weekDay : currentWeekDay)

        if (attendance.checkin) {

        }

        setNote(attendance.note ? attendance.note : '')
        setFormAlertVisible(false)
    }

    return (
        <div>
        </div >
    );
}

export default AttendanceManager;
