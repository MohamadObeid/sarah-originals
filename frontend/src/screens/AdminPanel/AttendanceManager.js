import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import FontAwesome from 'react-fontawesome'
import { listAttendance, saveAttendance, deleteAttendance } from '../../actions/attendanceActions'
import { detailsEmployee } from '../../actions/employeeActions'
import { months, weekDays } from '../../constants/lists'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCircle, faEnvelopeOpenText, faPlus, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from "react-tooltip"
import { timeDiffCalc } from '../../methods/methods'
import { Modal, Popconfirm } from 'antd'


function AttendanceManager(props) {
    const [IP, setIP] = useState()

    const getIPAddress = async () => {
        await fetch('https://geolocation-db.com/json/7733a990-ebd4-11ea-b9a6-2955706ddbf3')
            .then(res => res.json())
            .then(IP => { setIP(IP) })
    }

    useEffect(() => {
        getIPAddress()
        return () => {
            //
        };
    }, [])

    const imageUrl = window.location.origin + '/api/uploads/image/'
    var d = new Date()
    var currentYear = d.getFullYear()
    var currentMonth = months[d.getMonth()]
    var currentDay = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
    var currentWeekDay = weekDays[d.getDay()]
    var currentHour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
    var currentMinutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
    var currentSeconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()

    var currentDate = currentWeekDay.slice(0, 3) + ' ' + currentDay + ' ' + currentMonth + ' ' + currentYear

    const [formAction, setFormAction] = useState('recorded')
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
    const [reasonModalVisible, setReasonModalVisible] = useState({ visibility: false })
    const [requestVisible, setRequestVisible] = useState(false)
    const [requestAnswerVisible, setRequestAnswerVisible] = useState(false)

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
    const [requestText, setRequestText] = useState()
    const [requestAnswer, setRequestAnswer] = useState()

    const { success: successSave } = useSelector(state => state.attendanceSave)
    const { success: successDelete } = useSelector(state => state.attendanceDelete)
    const { employees } = useSelector(state => state.employeeList)
    const { attendance: attendanceList } = useSelector(state => state.attendanceList)
    const { userInfo } = useSelector(state => state.userSignin)
    const { employee } = useSelector(state => state.employeeDetails)
    const { time } = useSelector(state => state.clock)
    const [isCheckout, setIsCheckout] = useState(undefined)
    const [timeOut, setTimeOut] = useState()

    const dispatch = useDispatch()
    useEffect(() => {
        if (successSave || successDelete) {
            dispatch(saveAttendance('clear'))
            setFormAlertVisible(false)
            setModelVisible(false)
            userInfo.isAttendanceManager ? dispatch(listAttendance())
                : dispatch(listAttendance(userInfo.employeeId))
            setActionNote(`Attendance ${successDelete ? 'deleted' : 'recorded'} succefully`)
            setActionNoteVisible(true)
            clearTimeout(timeOut)
            setTimeOut(setInterval(() => setActionNoteVisible(false), 5000))
            setFormAction('')
            setId(undefined)
        } return () => {
            //
        }
    }, [successSave, successDelete])

    useEffect(() => {
        attendanceList ? attendanceList.length > 0 &&
            setIsCheckout(attendanceList.find(att =>
                (att.date === currentDate || newDayCheckout(att.date))
                && att.employeeId === userInfo.employeeId
                && (!att.checkout || !att.checkout.record)))
            : setIsCheckout(undefined)
        //isCheckout && console.log(isCheckout)
        if (isCheckout) openModel(isCheckout)
        return () => { }
    }, [attendanceList, isCheckout])

    const openModel = (attendance, openModel) => {
        openModel && setModelVisible(true)

        setIsAbsent(false)
        setId(attendance._id ? attendance._id : undefined)
        setModified(attendance.modified ? attendance.modified : undefined)
        setEmployeeId(attendance.employeeId ? attendance.employeeId : undefined)
        openModel && attendance.employeeId && userInfo.employeeId != attendance.employeeId
            && dispatch(detailsEmployee(attendance.employeeId))
        setEmployeeName(attendance.employeeName ? attendance.employeeName : undefined)
        setEmployeeImage(attendance.employeeImage ? attendance.employeeImage : undefined)
        setDate(attendance.date ? attendance.date : currentDate)
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

    const checkInOutHandler = (e) => {
        e.preventDefault()
        //const attendanceExist = attendanceList ? attendanceList.find(attendance => attendance._id === _id) : undefined
        /*const isCheckout = attendanceList ? attendanceList.find
            (att =>
                (att.date === currentDate || newDayCheckout(att.date))
                && att.employeeId === userInfo.employeeId
                && (!att.checkout || !att.checkout.record)) : undefined*/
        //console.log(isCheckout)
        if (isCheckout) {
            //console.log(isCheckout._id)
            const data = checkoutStatus()
            const earlyLeave = data.earliness
            const overTime = data.overTime
            if (earlyLeave || overTime)
                setReasonModalVisible({ visibility: true, commander: 'checkout' })
            else checkoutHandler(e, isCheckout)
        } else {
            const data = checkinStatus()
            const lateness = data.lateness
            const overTime = data.overTime
            if (lateness || overTime)
                setReasonModalVisible({ visibility: true, commander: 'checkin' })
            else checkinHandler(e)
        }
        //else if (attendanceExist) { requestHandler(attendanceExist) }
    }

    const newDayCheckout = (date) => {
        const dateMonth = date.slice(7, 10)
        const dateYear = parseInt(date.slice(11, 15))
        const dateDay = parseInt(date.slice(4, 6))
        var secondDay = false
        //console.log(dateYear, dateMonth, dateDay)
        if (dateYear == currentYear) {
            if (dateMonth == currentMonth) {
                if (dateDay + 1 == currentDay) secondDay = true
            } else if (months.indexOf(dateMonth) + 1 == months.indexOf(currentMonth) && currentDay == 1) secondDay = true
        } else if (dateYear + 1 == currentYear && dateMonth === 'Dec' && dateDay === 31) secondDay = true

        return secondDay
    }

    const requestHandler = (e, attendance) => {
        if (requestText && requestText !== '') {
            e.preventDefault()
            requestAnswerVisible && setRequestAnswerVisible(false)
            dispatch(saveAttendance({
                _id: _id,
                request: [...attendance.request, {
                    date: currentDate,
                    text: requestText,
                    status: 'pending'
                }]
            }))
            setRequestVisible(false)
        }
    }

    const checkinStatus = () => {
        var workTime = workTimeStart()
        var timeDiff
        if (workTime) {
            timeDiff = workTime ? timeDiffCalc(currentHour + ':' + currentMinutes, workTime) : undefined
        } else timeDiff = '00:00'
        var lateness = false
        var overTime = false
        if (timeDiff.sign) {
            timeDiff = timeDiff.diff
            lateness = true
        } else if (timeDiff !== '00:00') overTime = true
        return { lateness: lateness, overTime: overTime, timeDiff: timeDiff, workTime: workTime }
    }

    const checkinHandler = (e) => {
        e.preventDefault()
        var workTimeHours = undefined
        if (workTimeStart() && workTimeEnd())
            workTimeHours = timeDiffCalc(workTimeStart(), workTimeEnd())
        const data = checkinStatus()
        const lateness = data.lateness
        const overTime = data.overTime
        const timeDiff = data.timeDiff
        const workTime = data.workTime
        dispatch(saveAttendance({
            creation_date: Date.now() + 10800000,
            created_by: employee.firstName + ' ' + employee.lastName,
            employeeId: employee._id,
            employeeName: employee.firstName + ' ' + employee.lastName,
            employeeImage: employeeImage ? employeeImage : employee.image,
            date: currentDate,
            workTimeHours: workTimeHours,
            checkin: {
                workTime: workTime,
                record: currentHour + ':' + currentMinutes,
                location: IP.country_name + ', ' + IP.city,
                lateness: lateness ? { hours: timeDiff, reason: checkinLatenessReason } : undefined,
                overTime: overTime ? { hours: timeDiff, reason: checkinOverTimeReason } : undefined,
            },
            checkout: {
                workTime: workTimeEnd(),
            }
        }))
        setReasonModalVisible({ visibility: false })
    }
    //console.log(currentDate)
    const checkoutStatus = () => {
        var workTime = workTimeEnd()
        var timeDiff
        if (workTime) {
            timeDiff = workTime ? timeDiffCalc(workTime, currentHour + ':' + currentMinutes, newDayCheckout(isCheckout.date)) : undefined
        } else timeDiff = '00:00'

        var earliness = false
        var overTime = false
        if (timeDiff.sign) {
            timeDiff = timeDiff.diff
            earliness = true
        } else if (timeDiff !== '00:00') overTime = true
        return { earliness: earliness, overTime: overTime, timeDiff: timeDiff, workTime: workTime }
    }

    const checkoutHandler = (e, attendance) => {
        e.preventDefault()
        //console.log(_id)
        const data = checkoutStatus()
        const earliness = data.earliness
        const overTime = data.overTime
        const timeDiff = data.timeDiff
        const checkoutRecord = currentHour + ':' + currentMinutes
        const checkin = checkinRecord ? checkinRecord : attendance.checkin.record
        var timeDiffValue = timeDiffCalc(checkin, checkoutRecord, newDayCheckout(isCheckout.date))
        var workHoursRecorded = typeof timeDiffValue === 'object' ? timeDiffValue.diff : timeDiffValue

        if (attendance && newDayCheckout(attendance.date) && time.slice(11, 13) === '12' && time.includes('AM')) {
            workHoursRecorded = parseInt(workHoursRecorded.slice(0, 2)) - 12 + workHoursRecorded.slice(2, 5)
        } else if (attendance && newDayCheckout(attendance.date) && time.slice(11, 13) !== '12' && !time.includes('AM'))
            workHoursRecorded = parseInt(workHoursRecorded.slice(0, 2)) + workHoursRecorded.slice(2, 5)

        const workTime = checkoutTime ? checkoutTime
            : (attendance && attendance.checkout ? attendance.checkout.workTime
                : undefined)
        //console.log(workHoursRecorded)
        //const workTime = data.workTime
        dispatch(saveAttendance({
            _id: _id ? _id : attendance._id,
            employeeId: userInfo.employeeId,
            modified: modified,
            workHoursRecorded: workHoursRecorded,
            checkout: {
                workTime: workTime,
                record: checkoutRecord,
                location: IP.country_name + ', ' + IP.city,
                earliness: earliness ? { hours: timeDiff, reason: checkoutEarlinessReason } : undefined,
                overTime: overTime ? { hours: timeDiff, reason: checkoutOverTimeReason } : undefined,
                //request: { time: checkoutRequestTime, reason: checkoutRequestReason, status: checkoutRequestStatus }
            },
        }))
        setReasonModalVisible({ visibility: false })
        setIsCheckout(false)
    }

    const workTimeEnd = () => {
        if (employee) {
            var workTime
            if (currentWeekDay === 'Monday') workTime = employee.workTime.mon.to
            else if (currentWeekDay === 'Tuesday') workTime = employee.workTime.tue.to
            else if (currentWeekDay === 'Wednesday') workTime = employee.workTime.wed.to
            else if (currentWeekDay === 'Thursday') workTime = employee.workTime.thu.to
            else if (currentWeekDay === 'Friday') workTime = employee.workTime.fri.to
            else if (currentWeekDay === 'Saturday') workTime = employee.workTime.sat.to
            else if (currentWeekDay === 'Sunday') workTime = employee.workTime.sun.to
            if (workTime === '') return undefined
            else return workTime
        } return false
    }

    const workTimeStart = () => {
        if (employee) {
            var workTime
            if (currentWeekDay === 'Monday') workTime = employee.workTime.mon && employee.workTime.mon.from
            else if (currentWeekDay === 'Tuesday') workTime = employee.workTime.tue && employee.workTime.tue.from
            else if (currentWeekDay === 'Wednesday') workTime = employee.workTime && employee.workTime.wed.from
            else if (currentWeekDay === 'Thursday') workTime = employee.workTime.thu && employee.workTime.thu.from
            else if (currentWeekDay === 'Friday') workTime = employee.workTime.fri && employee.workTime.fri.from
            else if (currentWeekDay === 'Saturday') workTime = employee.workTime.sat && employee.workTime.sat.from
            else if (currentWeekDay === 'Sunday') workTime = employee.workTime.sun && employee.workTime.sun.from
            if (workTime === '') return undefined
            else return workTime
        } return false
    }

    const createHandler = (e) => {
        setModelVisible(true)
    }

    const showTimeTooltip = (time, status) => {
        if (status === 'checkin') {
            if (!time.lateness && !time.overTime) {
                return 'On Time'
            } else if (time.lateness && time.lateness.hours) {
                return 'Late ' + time.lateness.hours + ' hours'
            } else if (time.overTime && time.overTime.hours) {
                return 'Over Time ' + time.overTime.hours
            }
        } else if (status === 'checkout') {
            if (!time.earliness && !time.overTime) {
                return 'On Time'
            } else if (time.earliness && time.earliness.hours) {
                return 'Early Leave ' + time.earliness.hours + ' hours'
            } else if (time.overTime && time.overTime.hours) {
                return 'Over Time ' + time.overTime.hours
            } else return false
        }
    }

    const FaCircleColor = (checkinout) => {
        if (!checkinout.record) return 'grey'
        else if (checkinout.lateness && checkinout.lateness.hours) return 'red'
        else if (checkinout.earliness && checkinout.earliness.hours) return 'red'
        else if (checkinout.overTime && checkinout.overTime.hours) return 'green'
    }

    const checkInOutButton = () => {
        if (attendanceList) {
            var lastIndex = attendanceList.length - 1
            //console.log(newDayCheckout(attendanceList[lastIndex].date))
            if (attendanceList[lastIndex].employeeId === userInfo.employeeId)
                lastIndex = attendanceList.length - 1
            else {
                lastIndex = 0
                attendanceList.map(att => {
                    if (attendanceList.indexOf(att) > lastIndex && att.employeeId === userInfo.employeeId)
                        lastIndex = attendanceList.indexOf(att)
                })
            }
            if (attendanceList[lastIndex].date == currentDate || newDayCheckout(attendanceList[lastIndex].date)) {
                if (!attendanceList[lastIndex].checkout) return 'Check out'
                else if (!attendanceList[lastIndex].checkout.record) return 'Check out'
                else if (attendanceList[lastIndex].checkout.record) return 'Check in'
            } else return 'Check in'
        } else return 'Check in'
        return undefined
    }

    const modalTitle = () => {
        if (reasonModalVisible.commander === 'checkin') {
            if (checkinStatus().lateness) return 'Lateness Reason'
            else if (checkinStatus().overTime) return 'OverTime Reason'
        } else if (reasonModalVisible.commander === 'checkout') {
            if (checkoutStatus().earliness) return 'Early Leave Reason'
            else if (checkoutStatus().overTime) return 'OverTime Reason'
        }
    }

    const deleteHandler = (e, _id) => {
        e.preventDefault();
        setFormAction('Delet')
        dispatch(deleteAttendance(_id));
    }

    const showHistoryHandler = (attendance) => {

    }

    const editHandler = (attendance) => {

    }

    const reasonInputHandler = (e) => {
        reasonModalVisible.commander === 'checkin'
            ? ((checkinStatus().lateness) ?
                setCheckinLatenessReason(e.target.value)
                : (checkinStatus().overTime)
                && setCheckinOverTimeReason(e.target.value))
            : reasonModalVisible.commander === 'checkout'
            && ((checkoutStatus().lateness) ?
                setCheckoutEarlinessReason(e.target.value)
                : (checkoutStatus().overTime)
                && setCheckoutOverTimeReason(e.target.value))
    }

    const timeDurationAtWork = (attendance) => {
        /*var hours = time.slice(11, 13)
        var minutes = time.slice(14, 16)
        var seconds = time.slice(17, 19)

        if (hours.includes(':')) {
            hours = '0' + time.slice(11, 12)
            minutes = time.slice(13, 15)
            seconds = time.slice(16, 18)
        }*/

        var d = new Date()
        var hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
        var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
        var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()

        /*if (time.includes('PM')) hours = parseInt(hours) + 12
        if (time.includes('AM') && hours === '12') hours = parseInt(hours) - 12*/
        const format24 = hours + ':' + minutes
        //console.log(format24, seconds)
        var duration

        if (attendance.workHoursRecorded) {
            duration = attendance.workHoursRecorded + ' hrs'
        } else {
            if (attendance.date === currentDate) {
                if (typeof timeDiffCalc(attendance.checkin.record, format24) === 'object') {
                    duration = timeDiffCalc(attendance.checkin.record, format24).diff
                } else {
                    duration = timeDiffCalc(attendance.checkin.record, format24)
                        + ':' + seconds + ' hrs'
                }
            } else if (newDayCheckout(attendance.date)) {

                /*const time1 = timeDiffCalc(attendance.checkin.record, '24:00')
                const time2 = timeDiffCalc('00:00', format24)

                var hours0 = parseInt(time1.slice(0, 2)) + parseInt(time2.slice(0, 2))
                var min0 = parseInt(time1.slice(3, 5)) + parseInt(time2.slice(3, 5))

                hours0 = min0 >= 60 ? hours0 + 1 : hours0
                hours0 = hours0 < 10 ? '0' + hours0 : hours0
                min0 = min0 >= 60 ? min0 - 60 : min0
                min0 = min0 < 10 ? '0' + min0 : min0

                duration = hours0 + ':' + min0 + ':' + seconds + ' hrs'*/
                var timeDiffer = timeDiffCalc(attendance.checkin.record, format24, newDayCheckout(attendance.date))
                duration = timeDiffer + ':' + seconds + ' hrs'
            }
        }
        return duration
    }

    const setFontAwesome = (attendance) => {
        const length = attendance.request.length
        const lastRequest = attendance.request[length - 1]
        return (
            length > 0
                ? <FontAwesomeIcon icon={
                    lastRequest.status === 'pending'
                        ? faEnvelope
                        : faEnvelopeOpenText}
                    style={{ cursor: 'pointer' }}
                    className='fa-lg'
                    onClick={() => {
                        setRequestAnswerVisible(true)
                        setId(attendance._id)
                    }} />
                : attendance.employeeId === userInfo.employeeId
                && <FontAwesomeIcon icon={faPlus}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        setRequestVisible(true)
                        setId(attendance._id)
                    }} />)
    }

    const requestAnswerHandler = (e, attendance) => {
        e.preventDefault()
        var lastRequest = attendance.request[attendance.request.length - 1]
        attendance.request[attendance.request.length - 1] = {
            ...lastRequest,
            manager: userInfo.name,
            answer: requestAnswer,
            status: 'read'
        }
        dispatch(saveAttendance({
            _id: _id,
            request: attendance.request
        }))
        setId(undefined)
        setRequestAnswer(undefined)
        setRequestAnswerVisible(false)
    }

    const submitHandler = (e) => {

    }

    return (
        <div>
            {actionNoteVisible && <div className="action-note">{actionNote}</div>}
            <div className="control-page-header">
                <h3 className="header-title">Attendance Manager</h3>
                {checkInOutButton() !== undefined &&
                    <button type="button"
                        className="header-button checkin-btn"
                        onClick={(e) => checkInOutHandler(e)}>
                        {checkInOutButton()}<br />
                        <div className={`timer ${checkInOutButton() === 'Check in' &&
                            (checkinStatus().lateness) && 'red-background'}`}>
                            {time.slice(11, time.length)}
                        </div>
                    </button>
                }
            </div>
            {reasonModalVisible.visibility &&
                <Modal
                    title={modalTitle()}
                    visible={reasonModalVisible.visibility}
                    onOk={(e) => reasonModalVisible.commander === 'checkin'
                        ? checkinHandler(e)
                        : reasonModalVisible.commander === 'checkout' && checkoutHandler(e)
                    }
                    //confirmLoading={checkinHandler}
                    onCancel={() => setReasonModalVisible({ visibility: false })}
                >
                    <textarea
                        style={{ width: '47rem' }}
                        type="text"
                        name="checkinReason"
                        id="checkinReason"
                        onChange={(e) => reasonInputHandler(e)}
                    ></textarea>
                </Modal>}
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
                        <th style={{ width: '18rem' }}>Name</th>
                        <th style={{ textAlign: 'center' }}>Photo</th>
                        <th style={{ width: '13rem' }}>Date</th>
                        <th style={{ textAlign: 'center', width: '8rem' }} colSpan="2">Check In</th>
                        <th style={{ width: '20rem' }}></th>
                        <th style={{ textAlign: 'center', width: '8rem' }} colSpan="2">Check Out</th>
                        <th style={{ textAlign: 'center', width: '7rem' }}>Request</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceList &&
                        attendanceList.map((attendance) => (
                            <tr key={attendance._id}>
                                <td>{attendance.employeeName}</td>
                                <td className='td-img'>
                                    <img
                                        className='employee-image'
                                        src={imageUrl + attendance.employeeImage} alt='employee' />
                                </td>
                                <td>{attendance.date}</td>
                                <td style={{ textAlign: 'center' }}>{attendance.checkin.record}</td>
                                <td style={{ textAlign: 'end', width: '2rem' }}>
                                    <div><FontAwesomeIcon data-tip data-for={attendance._id + 'checkin'}
                                        className={`faCircle ${FaCircleColor(attendance.checkin)}`}
                                        icon={faCircle} />
                                        <ReactTooltip id={attendance._id + 'checkin'} place="top" effect="solid">
                                            {attendance.checkin.workTime
                                                ? showTimeTooltip(attendance.checkin, 'checkin') +
                                                ' | Work Start Time ' + attendance.checkin.workTime
                                                : 'Not Working Day'}
                                        </ReactTooltip>
                                    </div>
                                </td>
                                <td style={{ position: 'relative' }}>
                                    <p className={`line ${!attendance.workHoursRecorded && 'highlight'}`}>
                                        {timeDurationAtWork(attendance)}
                                    </p>
                                </td>
                                <td style={{ width: '2rem' }}>
                                    {attendance.checkout && attendance.checkout.record &&
                                        <div><FontAwesomeIcon data-tip data-for={attendance._id + 'checkout'}
                                            className={`faCircle ${FaCircleColor(attendance.checkout)}`}
                                            icon={faCircle} />
                                            <ReactTooltip id={attendance._id + 'checkout'} place="top" effect="solid">
                                                {attendance.checkout.workTime
                                                    ? showTimeTooltip(attendance.checkout, 'checkout') +
                                                    ' | Work End Time ' + attendance.checkout.workTime
                                                    : 'Not Working Day'}
                                            </ReactTooltip>
                                        </div>}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    {attendance.checkout && attendance.checkout.record ? attendance.checkout.record : '--:--'}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    {setFontAwesome(attendance)}
                                </td>
                                {requestAnswerVisible && attendance._id === _id &&
                                    <Modal
                                        title='Request Form'
                                        visible={requestAnswerVisible}
                                        onOk={(e) => userInfo.isAttendanceManager
                                            ? (!attendance.request[attendance.request.length - 1].answer
                                                ? requestAnswerHandler(e, attendance)
                                                : setRequestAnswerVisible(false))
                                            : attendance.request[attendance.request.length - 1].answer
                                            && setRequestVisible(true)}
                                        onCancel={() => {
                                            setRequestAnswerVisible(false)
                                            setRequestAnswer(undefined)
                                        }}
                                        okText={userInfo.isAttendanceManager
                                            ? 'Send' : 'Add Request'}
                                    >{attendance.request.map(req => (
                                        <div>
                                            <div className='request-line'>
                                                <div className='request-user'>{attendance.employeeName}</div>
                                                {req.text}
                                            </div>
                                            {req.manager &&
                                                <div className='request-line'>
                                                    <div className='request-user'>{req.manager}</div>
                                                    {req.answer}
                                                </div>}
                                        </div>
                                    ))}
                                        {userInfo.isAttendanceManager && !attendance.request[attendance.request.length - 1].answer &&
                                            <div style={{ margin: '1rem' }}>
                                                <label htmlFor={'requestReply'}>Reply</label>
                                                <textarea
                                                    style={{ width: '45rem' }}
                                                    type="text"
                                                    name='requestReply'
                                                    id='requestReply'
                                                    onChange={(e) => setRequestAnswer(e.target.value)}
                                                ></textarea>
                                            </div>}
                                    </Modal>}
                                {requestVisible && attendance._id === _id &&
                                    <Modal
                                        title='Request Form'
                                        visible={requestVisible}
                                        onOk={(e) => requestHandler(e, attendance)}
                                        onCancel={() => {
                                            setRequestVisible(false)
                                            setRequestText(undefined)
                                        }}
                                    >
                                        <textarea
                                            style={{ width: '47rem' }}
                                            type="text"
                                            name="checkinReason"
                                            id="checkinReason"
                                            onChange={(e) => setRequestText(e.target.value)}
                                        ></textarea>
                                    </Modal>}
                                <td>
                                    <button className="table-btns" onClick={() => editHandler(attendance)}>Edit</button>
                                    <Popconfirm
                                        placement="topRight"
                                        title="Are you sure?"
                                        onConfirm={(e) => deleteHandler(e, attendance._id)}
                                        okText="Delete"
                                        cancelText="Cancel"
                                    >
                                        <button className="table-btns">Delete</button>
                                    </Popconfirm>
                                    <button className="table-btns" onClick={() => showHistoryHandler(attendance)}>History</button>
                                </td>
                            </tr>
                        )).reverse()}
                </tbody>
            </table>
        </div>
    );
}

export default AttendanceManager;
