import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import ReactTooltip from "react-tooltip"
import FontAwesome from 'react-fontawesome'
import axios from 'axios';
import { listEmployees, saveEmployee, deleteEmployee } from '../../actions/employeeActions'
import {
    nameTitles, days, months, years, jobPositions, salaryTypes, weekDays, interestsList,
    maritalStatusList, drivingLicenseList
} from '../../constants/lists'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCheck, faTimes, faMotorcycle, faCaravan,
    faTaxi, faCarSide, faTruck, faTruckMoving, faTrailer, faShuttleVan,
    faBus, faTractor, faCommentDots, faCircle,
} from '@fortawesome/free-solid-svg-icons'
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons'
import {
    faFacebookSquare, faYoutube, faInstagram
} from '@fortawesome/free-brands-svg-icons'

function EmployeeManager(props) {
    var d = new Date()
    var currentYear = d.getFullYear()
    var currentMonth = months[d.getMonth()]
    var currentDay = d.getDate()
    var currentWeekDay = weekDays[d.getDay()]
    var currentHour = d.getHours()
    var currentMinutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
    var currentSecond = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()

    const refreshTime = () => {
        d = new Date()
        currentWeekDay = weekDays[d.getDay()]
        currentHour = d.getHours()
        currentMinutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
        currentSecond = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
        console.log('time')
        setTimeout(refreshTime, 1000)
    }

    const [formAction, setFormAction] = useState()
    const [actionNote, setActionNote] = useState()
    const [actionNoteVisible, setActionNoteVisible] = useState(false)
    const [formAlert, setFormAlert] = useState('Kindly fill all required blanks!')
    const [formAlertVisible, setFormAlertVisible] = useState(false)
    const [modelVisible, setModelVisible] = useState(false)
    const [historyVisible, setHistoryVisible] = useState(false)
    const [employeeValues, setEmployeeValues] = useState()
    const [uploading, setUploading] = useState(false)
    const [contractVisible, setContractVisible] = useState(false)
    const [salaryVisible, setSalaryVisible] = useState(false)
    const [workTimeVisible, setWorkTimeVisible] = useState(false)
    const [contractSaved, setContractSaved] = useState(false)
    const [salarySaved, setSalarySaved] = useState(false)
    const [workTimeSaved, setWorkTimeSaved] = useState(false)
    const [dropdownList, setDropdownList] = useState();
    const [dropdownListVisible, setDropdownListVisible] = useState(false)
    const [LicenseDropdown, setLicenseDropdown] = useState();
    const [licenseDropdownVisible, setLicenseDropdownVisible] = useState(false)
    const [commentVisible, setCommentVisible] = useState(false)
    const [comment, setComment] = useState()

    const [_id, setId] = useState()
    const [active, setActive] = useState()
    const [modified, setModified] = useState()
    const [title, setTitle] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [image, setImage] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [dob, setDob] = useState()
    const [dobDay, setDobDay] = useState()
    const [dobMonth, setDobMonth] = useState()
    const [dobYear, setDobYear] = useState()
    const [address, setAddress] = useState()
    const [maritalStatus, setMaritalStatus] = useState()
    const [drivingLicense, setDrivingLicense] = useState()
    const [jobPosition, setJobPosition] = useState()
    const [jobDescription, setJobDescription] = useState()
    const [facebook, setFacebook] = useState()
    const [instagram, setInstagram] = useState()
    const [youtube, setYoutube] = useState()
    const [interests, setInterests] = useState()
    //
    const [contract, setContract] = useState()
    const [validity, setValidity] = useState()
    const [validityMonth, setValidityMonth] = useState()
    const [validityYear, setValidityYear] = useState()
    const [startDate, setStartDate] = useState()
    const [startDay, setStartDay] = useState()
    const [startMonth, setStartMonth] = useState()
    const [startYear, setStartYear] = useState()
    const [endDate, setEndDate] = useState()
    const [endDay, setEndDay] = useState()
    const [endMonth, setEndMonth] = useState()
    const [endYear, setEndYear] = useState()
    //
    const [salary, setSalary] = useState()
    const [salaryType, setSalaryType] = useState()
    const [salaryRate, setSalaryRate] = useState()
    const [salaryOverTimeType, setSalaryOverTimeType] = useState()
    const [salaryOverTimeRate, setSalaryOverTimeRate] = useState()
    const [commissionRate, setCommissionRate] = useState()
    const [commissionType, setCommissionType] = useState()
    //
    const [workTime, setWorkTime] = useState()
    const [note, setNote] = useState()
    //
    const [monFrom, setMonFrom] = useState()
    const [monTo, setMonTo] = useState()
    const [tueFrom, setTueFrom] = useState()
    const [tueTo, setTueTo] = useState()
    const [wedFrom, setWedFrom] = useState()
    const [wedTo, setWedTo] = useState()
    const [thuFrom, setThuFrom] = useState()
    const [thuTo, setThuTo] = useState()
    const [friFrom, setFriFrom] = useState()
    const [friTo, setFriTo] = useState()
    const [satFrom, setSatFrom] = useState()
    const [satTo, setSatTo] = useState()
    const [sunFrom, setSunFrom] = useState()
    const [sunTo, setSunTo] = useState()

    const { success: successSave } = useSelector(state => state.employeeSave)
    const { success: successDelete } = useSelector(state => state.employeeDelete)
    const { employees } = useSelector(state => state.employeeList)
    const { userInfo } = useSelector(state => state.userSignin)

    const dispatch = useDispatch()

    useEffect(() => {

        if (successSave || successDelete) {
            setFormAlertVisible(false)
            setModelVisible(false)
            dispatch(listEmployees())
            setActionNote(`Employee ${formAction == 'Add' ? 'Creat' : formAction}ed succefully`)
            setActionNoteVisible(true)
            setInterval(() => setActionNoteVisible(false), 5000)
            setFormAction('')
            dispatch(saveEmployee('clear'))
        }
        return () => {
            //
        }
    }, [successSave, successDelete])

    const openModel = (employee) => {
        setModelVisible(true)
        setId(employee._id ? employee._id : '')
        setModified(employee.modified ? employee.modified : [])
        setActive(employee.active ? employee.active : false)
        setTitle(employee.title ? employee.title : '')
        setFirstName(employee.firstName ? employee.firstName : '')
        setLastName(employee.lastName ? employee.lastName : '')
        setImage(employee.image ? employee.image : '')
        setEmail(employee.email ? employee.email : '')
        setPhone(employee.phone ? employee.phone : '')

        if (employee.dob) {
            setDob(employee.dob ? employee.dob : {})
            setDobDay(employee.dob.day ? employee.dob.day : '')
            setDobMonth(employee.dob.month ? employee.dob.month : '')
            setDobYear(employee.dob.year ? employee.dob.year : '')
        } else {
            setDob({})
            setDobDay('')
            setDobMonth('')
            setDobYear('')
        }

        setAddress(employee.address ? employee.address : '')
        setMaritalStatus(employee.maritalStatus ? employee.maritalStatus : '')
        setDrivingLicense(employee.drivingLicense ? employee.drivingLicense : [])
        setJobPosition(employee.jobPosition ? employee.jobPosition : '')
        setJobDescription(employee.jobDescription ? employee.jobDescription : '')
        setFacebook(employee.facebook ? employee.facebook : '')
        setInstagram(employee.instagram ? employee.instagram : '')
        setYoutube(employee.youtube ? employee.youtube : '')
        setInterests(employee.interests ? employee.interests : '')

        if (employee.contract) {
            setContractVisible(true)
            setContract(employee.contract && employee.contract)
            setValidity(employee.contract.validity ? employee.contract.validity : {})
            setValidityMonth(employee.contract.validity.month ? employee.contract.validity.month : '')
            setValidityYear(employee.contract.validity.year ? employee.contract.validity.year : '')
            setStartDate(employee.contract.startDate ? employee.contract.startDate : {})
            setStartDay(employee.contract.startDate.day ? employee.contract.startDate.day : d.getDate())
            setStartMonth(employee.contract.startDate.month ? employee.contract.startDate.month : months[d.getMonth()])
            setStartYear(employee.contract.startDate.year ? employee.contract.startDate.year : d.getFullYear())
            setEndDate(employee.contract.endDate ? employee.contract.endDate : {})
            setEndDay(employee.contract.endDate.day ? employee.contract.endDate.day : d.getDate())
            setEndMonth(employee.contract.endDate.month ? employee.contract.endDate.month : months[d.getMonth()])
            setEndYear(employee.contract.endDate.year ? employee.contract.endDate.year : d.getFullYear())
        } else {
            setContractVisible(false)
            setContract()
            setValidity({})
            setValidityMonth('')
            setValidityYear('')
            setStartDate({})
            setStartDay(d.getDate())
            setStartMonth(months[d.getMonth()])
            setStartYear(d.getFullYear())
            setEndDate({})
            setEndDay(d.getDate())
            setEndMonth(months[d.getMonth()])
            setEndYear(d.getFullYear())
        }

        if (employee.salary) {
            setSalaryVisible(true)
            setSalary(employee.salary && employee.salary)
            setSalaryType(employee.salary.type ? employee.salary.type : '')
            setSalaryRate(employee.salary.rate ? employee.salary.rate : '')
            setSalaryOverTimeType(employee.salary.overTimeType ? employee.salary.overTimeType : '')
            setSalaryOverTimeRate(employee.salary.overTimeRate ? employee.salary.overTimeRate : '')
            setCommissionRate(employee.salary.commissionRate ? employee.salary.commissionRate : '')
            setCommissionType(employee.salary.commissionType ? employee.salary.commissionType : '')
        } else {
            setSalaryVisible(false)
            setSalary()
            setSalaryType('')
            setSalaryRate('')
            setSalaryOverTimeType('')
            setSalaryOverTimeRate('')
            setCommissionRate('')
            setCommissionType('')
        }

        if (employee.workTime) {
            setWorkTimeVisible(true)
            setWorkTime(employee.workTime && employee.workTime)
            setMonFrom(employee.workTime.mon ? employee.workTime.mon.from : '')
            setMonTo(employee.workTime.mon ? employee.workTime.mon.to : '')
            setTueFrom(employee.workTime.tue ? employee.workTime.tue.from : '')
            setTueTo(employee.workTime.tue ? employee.workTime.tue.to : '')
            setWedFrom(employee.workTime.wed ? employee.workTime.wed.from : '')
            setWedTo(employee.workTime.wed ? employee.workTime.wed.to : '')
            setThuFrom(employee.workTime.thu ? employee.workTime.thu.from : '')
            setThuTo(employee.workTime.thu ? employee.workTime.thu.to : '')
            setFriFrom(employee.workTime.fri ? employee.workTime.fri.from : '')
            setFriTo(employee.workTime.fri ? employee.workTime.fri.to : '')
            setSatFrom(employee.workTime.sat ? employee.workTime.sat.from : '')
            setSatTo(employee.workTime.sat ? employee.workTime.sat.to : '')
            setSunFrom(employee.workTime.sun ? employee.workTime.sun.from : '')
            setSunTo(employee.workTime.sun ? employee.workTime.sun.to : '')
        } else {
            setWorkTimeVisible(false)
            setWorkTime()
            setMonFrom('')
            setMonTo('')
            setTueFrom('')
            setTueTo('')
            setWedFrom('')
            setWedTo('')
            setThuFrom('')
            setThuTo('')
            setFriFrom('')
            setFriTo('')
            setSatFrom('')
            setSatTo('')
            setSunFrom('')
            setSunTo('')
        }

        setNote(employee.note ? employee.note : '')
        setSalarySaved(false)
        setContractSaved(false)
        setWorkTimeSaved(false)
        setFormAlertVisible(false)

        let interestList = interestsList;
        (employee.interests) &&
            (employee.interests).forEach(intExist => {
                interestList = interestList.filter(int => int !== intExist && int)
            })
        setDropdownList(interestList.sort());

        let drivingLicenselist = drivingLicenseList;
        (employee.drivingLicense) &&
            (employee.drivingLicense).forEach(licenseExist => {
                drivingLicenselist = drivingLicenselist
                    .filter(license => license !== licenseExist && license)
            })
        setLicenseDropdown(drivingLicenselist);
    }

    const modifiedArray = (employee) => {
        let modifiedNote = []
        if (active !== employee.active) modifiedNote = [...modifiedNote, 'Active']
        if (title && title !== employee.title) modifiedNote = [...modifiedNote, 'Title']
        if (image && image !== employee.image) modifiedNote = [...modifiedNote, 'Image']
        if (firstName !== employee.firstName) modifiedNote = [...modifiedNote, 'First Name']
        if (lastName !== employee.lastName) modifiedNote = [...modifiedNote, 'Last Name']
        if (email !== employee.email) modifiedNote = [...modifiedNote, 'Email']
        if (phone !== employee.phone) modifiedNote = [...modifiedNote, 'Phone']
        if ((dob && dob !== employee.dob)
            || (dobDay && dobDay !== employee.dob.day)
            || (dobMonth && dobMonth !== employee.dob.month)
            || (dobYear && dobYear !== employee.dob.year)
        ) modifiedNote = [...modifiedNote, 'Date of Birth']

        if (address !== employee.address) modifiedNote = [...modifiedNote, 'Address']
        if (maritalStatus !== employee.maritalStatus) modifiedNote = [...modifiedNote, 'Marital Status']
        if (drivingLicense !== employee.drivingLicense) modifiedNote = [...modifiedNote, 'Driving License']
        if (jobPosition !== employee.jobPosition) modifiedNote = [...modifiedNote, 'Job Position']
        if (jobDescription !== employee.jobDescription) modifiedNote = [...modifiedNote, 'Job Descrition']
        if (facebook !== employee.facebook) modifiedNote = [...modifiedNote, 'Facebook']
        if (instagram !== employee.instagram) modifiedNote = [...modifiedNote, 'Instagram']
        if (youtube !== employee.youtube) modifiedNote = [...modifiedNote, 'Youtube']

        if (employee.contract) {
            if (validity && validity !== employee.contract.validity) modifiedNote = [...modifiedNote, 'Contract Validity']
            if (endDate && endDate !== employee.contract.endDate) modifiedNote = [...modifiedNote, 'Contract End Date']
            if (startDate && startDate !== employee.contract.startDate) modifiedNote = [...modifiedNote, 'Contract Start Date']
        }
        else if (validity) modifiedNote = [...modifiedNote, 'Contract Validity']
        else if (startDate) modifiedNote = [...modifiedNote, 'Contract Start Date']
        else if (endDate) modifiedNote = [...modifiedNote, 'Contract End Date']

        if (employee.salary) {
            if (salaryType && salaryType !== employee.salary.type) modifiedNote = [...modifiedNote, 'Salary Fixed Type']
            if (salaryRate && salaryRate !== employee.salary.rate) modifiedNote = [...modifiedNote, 'Salary Fixed Rate']
            if (salaryOverTimeRate && salaryOverTimeRate !== employee.salary.overTimeRate) modifiedNote = [...modifiedNote, 'Salary Over Time Rate']
            if (salaryOverTimeType && salaryOverTimeType !== employee.salary.overTimeType) modifiedNote = [...modifiedNote, 'Salary Over Time Type']
            if (commissionRate && commissionRate !== employee.salary.commissionRate) modifiedNote = [...modifiedNote, 'Sales Commission Rate']
            if (commissionType && commissionType !== employee.salary.commissionType) modifiedNote = [...modifiedNote, 'Sales Commission Type']
        }
        else if (salaryType) modifiedNote = [...modifiedNote, 'Salary Fixed Type']
        else if (salaryRate) modifiedNote = [...modifiedNote, 'Salary Fixed Rate']
        else if (salaryOverTimeType) modifiedNote = [...modifiedNote, 'Salary Over Time Type']
        else if (salaryOverTimeRate) modifiedNote = [...modifiedNote, 'Salary Over Time Rate']
        else if (commissionRate) modifiedNote = [...modifiedNote, 'Sales Commission Rate']
        else if (commissionType) modifiedNote = [...modifiedNote, 'Sales Commission Type']

        if (workTime) {
            if (employee.workTime) {
                if (employee.workTime.mon) {
                    if (monFrom !== employee.workTime.mon.from) modifiedNote = [...modifiedNote, 'Monday Work Time']
                    if (monTo !== employee.workTime.mon.to) modifiedNote = [...modifiedNote, 'Monday Work Time']
                }
                if (employee.workTime.tue) {
                    if (tueFrom !== employee.workTime.tue.from) modifiedNote = [...modifiedNote, 'Tuesday Work Time']
                    if (tueTo !== employee.workTime.tue.to) modifiedNote = [...modifiedNote, 'Tuesday Work Time']
                }
                if (employee.workTime.wed) {
                    if (wedFrom !== employee.workTime.wed.from) modifiedNote = [...modifiedNote, 'WednesDay Work Time']
                    if (wedTo !== employee.workTime.wed.to) modifiedNote = [...modifiedNote, 'WednesDay Work Time']
                }
                if (employee.workTime.thu) {
                    if (thuFrom !== employee.workTime.thu.from) modifiedNote = [...modifiedNote, 'Thursday Work Time']
                    if (thuTo !== employee.workTime.thu.to) modifiedNote = [...modifiedNote, 'Thursday Work Time']
                }
                if (employee.workTime.fri) {
                    if (friFrom !== employee.workTime.fri.from) modifiedNote = [...modifiedNote, 'Friday Work Time']
                    if (friTo !== employee.workTime.fri.to) modifiedNote = [...modifiedNote, 'Friday Work Time']
                }
                if (employee.workTime.sat) {
                    if (satFrom !== employee.workTime.sat.from) modifiedNote = [...modifiedNote, 'Saturday Work Time']
                    if (satTo !== employee.workTime.sat.to) modifiedNote = [...modifiedNote, 'Saturday Work Time']
                }
                if (employee.workTime.sun) {
                    if (sunFrom !== employee.workTime.sun.from) modifiedNote = [...modifiedNote, 'Sunday Work Time']
                    if (sunTo !== employee.workTime.sun.to) modifiedNote = [...modifiedNote, 'Sunday Work Time']
                }
            } else modifiedNote = [...modifiedNote, 'Work Time']
        }
        if (note && note !== employee.note) modifiedNote = [...modifiedNote, 'Note']

        return [...modified, {
            modified_date: Date.now() + 10800000,
            modified_by: userInfo.name,
            modified_note: modifiedNote
        }]
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const employeeExist = employees ? employees.find(employee => employee._id === _id) : ''
        const nameExist = employees ? employees.find(employee => employee.firstName === firstName && employee.lastName === lastName) : false
        if (!employeeExist || (employeeExist && formAction == 'Edit')) {
            if (!nameExist || (nameExist && formAction == 'Edit')) {
                if ((!contractVisible || (contractVisible && contract))
                    && (!salaryVisible || (salaryVisible && salary))
                    && (!workTimeVisible || (workTimeVisible && workTime))) {
                    if (formAction == 'Add')
                        dispatch(saveEmployee({
                            modified: [], created_by: userInfo.name,
                            creation_date: Date.now() + 10800000, active, title, firstName, lastName, image, email,
                            phone, dob: { day: dobDay, month: dobMonth, year: dobYear },
                            address, maritalStatus, drivingLicense, jobPosition, jobDescription, facebook, instagram, youtube,
                            interests, contract: contract, salary: salary, workTime: workTime, note
                        }))
                    else {
                        // set modified
                        dispatch(saveEmployee({
                            modified: modifiedArray(employeeExist), created_by: employeeExist.created_by,
                            creation_date: userInfo.creation_date, _id, active, title, firstName, lastName, image, email,
                            phone, dob: { day: dobDay, month: dobMonth, year: dobYear },
                            address, maritalStatus, drivingLicense, jobPosition, jobDescription, facebook, instagram, youtube,
                            interests, contract: contract, salary: salary, workTime: workTime, note
                        }))
                    }
                } else {
                    setFormAlert('Kindly Save the checked inputs, or Uncheck them.')
                    setFormAlertVisible(true)
                }
            } else {
                setFormAlert('The Employee already exists.')
                setFormAlertVisible(true)
            }
        }
    }

    const activationHandler = (e, employee) => {
        e.preventDefault()
        if (employee.active) {
            setFormAction('Deactivat')
            employee.active = false
        } else {
            setFormAction('Activat')
            employee.active = true
        }
        employee.modified = [...employee.modified, {
            modified_date: Date.now() + 10800000,
            modified_by: userInfo.name, modified_note: ['Activation']
        }]
        dispatch(saveEmployee(employee))
    }

    const createHandler = () => {
        setFormAction('Add')
        openModel({})
    }

    const editHandler = (employee) => {
        setFormAction('Edit')
        openModel(employee)
    }

    const deleteHandler = (e, _id) => {
        e.preventDefault();
        dispatch(deleteEmployee(_id));
    }

    const showHistoryHandler = (employee) => {
        setHistoryVisible(true)
        setEmployeeValues(employee)
    }

    const commentHandler = (e, employee) => {
        setEmployeeValues(employee)
        setCommentVisible(true)
    }

    const sendComment = (e) => {
        e.preventDefault()
        if (comment) {
            setFormAction('Edit')
            employeeValues.modified = [...employeeValues.modified,
            {
                modified_date: Date.now() + 10800000,
                modified_by: userInfo.name,
                modified_note: "'" + comment + "'"
            }]
            dispatch(saveEmployee(employeeValues))
            setCommentVisible(false)
        }
    }

    window.addEventListener('click', (e) => {
        const historyOverlay = document.querySelector('.history-overlay');
        if (e.target === historyOverlay) {
            setHistoryVisible(false)
            setModelVisible(false)
        }
    })

    const uploadImageHandler = (e) => {
        e.preventDefault();
        const bodyFormData = new FormData();
        bodyFormData.append('image', image);
        setUploading(true);

        axios
            //.post('/api/uploads/s3', bodyFormData, {
            .post('/api/uploads', bodyFormData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((response) => {
                setImage(response.data);
                console.log(response.data)
                setUploading(false);
            })
            .catch((err) => {
                console.log(err);
                setUploading(false);
            });
    }

    const from = (day) => {
        if (day === 'Monday') return monFrom && monFrom
        else if (day === 'Tuesday') return tueFrom && tueFrom
        else if (day === 'Wednesday') return wedFrom && wedFrom
        else if (day === 'Thursday') return thuFrom && thuFrom
        else if (day === 'Friday') return friFrom && friFrom
        else if (day === 'Saturday') return satFrom && satFrom
        else if (day === 'Sunday') return sunFrom && sunFrom
        else return ''
    }

    const to = (day) => {
        if (day === 'Monday') return monTo && monTo
        else if (day === 'Tuesday') return tueTo && tueTo
        else if (day === 'Wednesday') return wedTo && wedTo
        else if (day === 'Thursday') return thuTo && thuTo
        else if (day === 'Friday') return friTo && friTo
        else if (day === 'Saturday') return satTo && satTo
        else if (day === 'Sunday') return sunTo && sunTo
        else return ''
    }

    const setFrom = (from, day) => {
        if (day === 'Monday') setMonFrom(from)
        if (day === 'Tuesday') setTueFrom(from)
        if (day === 'Wednesday') setWedFrom(from)
        if (day === 'Thursday') setThuFrom(from)
        if (day === 'Friday') setFriFrom(from)
        if (day === 'Saturday') setSatFrom(from)
        if (day === 'Sunday') setSunFrom(from)
    }

    const setTo = (to, day) => {
        if (day === 'Monday') setMonTo(to)
        if (day === 'Tuesday') setTueTo(to)
        if (day === 'Wednesday') setWedTo(to)
        if (day === 'Thursday') setThuTo(to)
        if (day === 'Friday') setFriTo(to)
        if (day === 'Saturday') setSatTo(to)
        if (day === 'Sunday') setSunTo(to)
    }

    // interests dropdown
    const addInterest = (interestAdded) => {
        setInterests([...interests, interestAdded])
        setDropdownList(dropdownList.filter(drop => drop !== interestAdded && drop))
    }

    const removeInterest = (interestRemoved) => {
        setDropdownList([...dropdownList, interestRemoved].sort())
        setInterests(interests.filter(int => int !== interestRemoved && int))
    }

    window.addEventListener('click', (e) => {
        const dropdownOverlay = document.querySelector('.overlay-2');
        if (e.target === dropdownOverlay) {
            setDropdownListVisible(false)
            dropdownOverlay.style.display = 'none'
        }
    });

    // License dropdown
    const addLicense = (licenseAdded) => {
        setDrivingLicense([...drivingLicense, licenseAdded])
        setLicenseDropdown(LicenseDropdown.filter(drop => drop !== licenseAdded && drop))
    }

    const removeLicense = (licenseRemoved) => {
        setLicenseDropdown([...LicenseDropdown, licenseRemoved].sort())
        setDrivingLicense(drivingLicense.filter(drv => drv !== licenseRemoved && drv))
    }

    window.addEventListener('click', (e) => {
        const dropdownOverlay = document.querySelector('.overlay-3');
        if (e.target === dropdownOverlay) {
            setLicenseDropdownVisible(false)
            dropdownOverlay.style.display = 'none'
        }
    })

    window.addEventListener('click', (e) => {
        const commentOverlay = document.querySelector('.overlay-4');
        if (e.target === commentOverlay) {
            setCommentVisible(false)
        }
    })

    //
    const uniteFromWorkTime = (from, day) => {
        if (day === 'Monday') {
            setMonFrom(from)
            setTueFrom(from)
            setWedFrom(from)
            setThuFrom(from)
            setFriFrom(from)
            setSatFrom(from)
            setSunFrom(from)
        }
    }

    const uniteToWorkTime = (to, day) => {
        if (day === 'Monday' && !monTo && !tueTo && !wedTo && !thuTo && !friTo && !satTo && !sunTo) {
            setMonTo(to)
            setTueTo(to)
            setWedTo(to)
            setThuTo(to)
            setFriTo(to)
            setSatTo(to)
            setSunTo(to)
        }
    }

    const modifiedNoteHandler = (modified) => {
        return (
            (modified.modified_by && modified.modified_by + ' ')
            + (modified.modified_note[0] && (modified.modified_note[0].includes("'", 0) ? ' commented ' : ' edited '))
            + modified.modified_note.map(note =>
                (modified.modified_note.indexOf(note) < (modified.modified_note).length - 1
                    ? ' ' + note
                    : (modified.modified_note).length === 1 ? note : ' and ' + note))
        )
    }

    const contractStartHandler = (contract) => {
        if (contract) {
            var contractStartDate = contract.startDate
            if (contractStartDate) {
                if (currentYear > contractStartDate.year) {
                    return true
                } else if (currentYear == contractStartDate.year) {
                    if (months.indexOf(currentMonth) > months.indexOf(contractStartDate.month)) {
                        return true
                    } else if (months.indexOf(currentMonth) == months.indexOf(contractStartDate.month)) {
                        if (currentDay >= contractStartDate.day) {
                            return true
                        }
                    }
                }
            }
        }
        return false
    }

    const contractEndHandler = (contract) => {
        if (contract) {
            var contractEndDate = contract.endDate
            if (contractEndDate) {
                if (currentYear < contractEndDate.year) {
                    return true
                } else if (currentYear == contractEndDate.year) {
                    if (months.indexOf(currentMonth) < months.indexOf(contractEndDate.month)) {
                        return true
                    } else if (months.indexOf(currentMonth) == months.indexOf(contractEndDate.month)) {
                        if (currentDay <= contractEndDate.day) {
                            return true
                        }
                    }
                }
            }
        }
        return false
    }

    const workTimeHandler = (workTime) => {

    }

    return (
        <div>
            {actionNoteVisible && <div className="action-note">{actionNote}</div>}
            <div className="control-page-header">
                <h3 className="header-title">Employee Manager</h3>
                <button type="button" className="header-button" onClick={() => createHandler()}>Add Employee</button>
            </div>
            {
                modelVisible &&
                <form className="form-form" onSubmit={(e) => submitHandler(e)}>
                    <ul className="form-container-manager">
                        <FontAwesome name="fa-window-close" className="far fa-window-close fa-lg" onClick={() => setModelVisible(false)} />
                        <li>
                            <h2>{formAction == 'Copy' ? 'Add' : formAction} Employee</h2>
                        </li>
                        <li>
                            <label className="label" htmlFor="firstName">First Name<p className="required">*</p></label>
                            <div style={{ display: 'flex', width: '100%' }}>
                                <select
                                    style={{ width: '6rem', marginRight: '0.5rem', padding: '0' }}
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(
                                            e.target.selectedIndex ?
                                                e.target.options[e.target.selectedIndex].value :
                                                e.target.value);
                                    }}
                                >
                                    {nameTitles
                                        && nameTitles.map((title) => (
                                            <option key={title} value={title}>
                                                {title}
                                            </option>
                                        ))}
                                    <option key='' value=''>
                                    </option>
                                </select>
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                ></input>
                            </div>
                        </li>
                        <li>
                            <label className="label" htmlFor="lastName">Last Name<p className="required">*</p></label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            ></input>
                        </li>
                        <li>
                            {image &&
                                <img style={{
                                    width: '100%',
                                    maxHeight: '30rem',
                                    background: '#fff',
                                    borderRadius: '0.5rem',
                                    border: '1px #c0c0c0 solid',
                                    marginBottom: '1rem',
                                }} src={image} alt='employee' />
                            }
                            <label className="label" htmlFor="img">{image && 'Update '}Photo<p className="required">*</p></label>
                            <input
                                style={{ cursor: 'pointer' }}
                                type="file"
                                name="img"
                                id="img"
                                onChange={(e) => {
                                    setImage(e.target.files[0])
                                }}
                            ></input>
                            <button
                                className="button primary"
                                onClick={uploadImageHandler}
                            >Upload Photo</button>
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
                            <label className="label" htmlFor="dob">Date of Birth<p className="required">*</p></label>
                            <div style={{ display: 'flex', width: '100%' }}>
                                <select
                                    style={{ width: '6rem', marginRight: '0.5rem' }}
                                    value={dobDay}
                                    onChange={(e) => {
                                        setDobDay(
                                            e.target.selectedIndex ?
                                                e.target.options[e.target.selectedIndex].value :
                                                e.target.value)
                                    }}
                                >
                                    {days
                                        && days.map((day) => (
                                            <option key={day} value={day}>
                                                {day}
                                            </option>
                                        ))}
                                </select>
                                <select
                                    style={{ width: '8rem', marginRight: '0.5rem' }}
                                    value={dobMonth}
                                    onChange={(e) => {
                                        setDobMonth(
                                            e.target.selectedIndex ?
                                                e.target.options[e.target.selectedIndex].value :
                                                e.target.value)
                                    }}
                                >
                                    {months
                                        && months.map((month) => (
                                            <option key={month} value={month}>
                                                {month}
                                            </option>
                                        ))}
                                </select>
                                <select
                                    style={{ width: '10rem', marginRight: '0.5rem' }}
                                    value={dobYear}
                                    onChange={(e) => {
                                        setDobYear(
                                            e.target.selectedIndex ?
                                                e.target.options[e.target.selectedIndex].value :
                                                e.target.value)
                                    }}
                                >
                                    {years
                                        && years.map((year) => (
                                            year <= currentYear &&
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </li>
                        <li>
                            <label className="label" htmlFor="address">Address<p className="required">*</p></label>
                            <textarea
                                type="text"
                                name="address"
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            ></textarea>
                        </li>
                        <li>
                            <label className="label" htmlFor="jobPosition">Marital Status<p className="required">*</p></label>
                            <select
                                value={maritalStatus}
                                onChange={(e) => {
                                    setMaritalStatus(
                                        e.target.selectedIndex ?
                                            e.target.options[e.target.selectedIndex].value :
                                            e.target.value)
                                }}
                            >
                                <option key='' value=''>
                                    Select...
                                </option>
                                {maritalStatusList
                                    && maritalStatusList.map((stat) => (
                                        <option key={stat} value={stat}>
                                            {stat}
                                        </option>
                                    ))}
                            </select>
                        </li>
                        <div className='dropdown'>
                            <div className='dropdown-label'>Driving License</div>
                            <div className='dropdown-overlay overlay-3'></div>
                            <div className='dropdown-container'>
                                <div className='dropdown-input' onClick={() => {
                                    document.querySelector('.overlay-3').style.display = 'block';
                                    setLicenseDropdownVisible(true)
                                }}>
                                    {drivingLicense &&
                                        drivingLicense.map(c => (
                                            <div
                                                key={c}
                                                className='dropdown-checked'>
                                                {c}
                                                <FontAwesome className='fas fa-close dropdown-checked-close'
                                                    onClick={() => removeLicense(c)} />
                                            </div>
                                        ))}
                                    <FontAwesome className='fas fa-chevron-down' />
                                </div>
                                {licenseDropdownVisible &&
                                    <div className='dropdown-list'>
                                        {LicenseDropdown.map(drop => (
                                            <div
                                                key={drop}
                                                className={drop + `dropdown-choice`}
                                                onClick={() => addLicense(drop)}
                                            >
                                                {drop === 'Motorcycle' &&
                                                    <FontAwesomeIcon
                                                        icon={faMotorcycle}
                                                        style={{ width: '2.5rem', color: 'rgb(60, 60, 60)' }} />
                                                }

                                                {drop === 'B1 Car' &&
                                                    <FontAwesomeIcon
                                                        icon={faCaravan}
                                                        style={{ width: '2.5rem', color: 'rgb(60, 60, 60)' }} />
                                                }
                                                {drop === 'B Car Public' &&
                                                    <FontAwesomeIcon
                                                        icon={faTaxi}
                                                        style={{ width: '2.5rem', color: 'rgb(60, 60, 60)' }} />
                                                }
                                                {drop === 'B Car Private' &&
                                                    <FontAwesomeIcon
                                                        icon={faCarSide}
                                                        style={{ width: '2.5rem', color: 'rgb(60, 60, 60)' }} />
                                                }
                                                {drop === 'C1 Truck' &&
                                                    <FontAwesomeIcon
                                                        icon={faTruck}
                                                        style={{ width: '2.5rem', color: 'rgb(60, 60, 60)' }} />
                                                }
                                                {drop === 'C Truck' &&
                                                    <FontAwesomeIcon
                                                        icon={faTruckMoving}
                                                        style={{ width: '2.5rem', color: 'rgb(60, 60, 60)' }} />
                                                }
                                                {drop === 'CE Trailer Truck' &&
                                                    <FontAwesomeIcon
                                                        icon={faTrailer}
                                                        style={{ width: '2.5rem', color: 'rgb(60, 60, 60)' }} />
                                                }
                                                {drop === 'D1 Bus' &&
                                                    <FontAwesomeIcon
                                                        icon={faShuttleVan}
                                                        style={{ width: '2.5rem', color: 'rgb(60, 60, 60)' }} />
                                                }
                                                {drop === 'D Bus' &&
                                                    <FontAwesomeIcon
                                                        icon={faBus}
                                                        style={{ width: '2.5rem', color: 'rgb(60, 60, 60)' }} />
                                                }
                                                {drop === 'Farm Machinery' &&
                                                    <FontAwesomeIcon
                                                        icon={faTractor}
                                                        style={{ width: '2.5rem', color: 'rgb(60, 60, 60)' }} />
                                                }
                                                {drop === 'Tractor' &&
                                                    <FontAwesomeIcon
                                                        icon={faTractor}
                                                        style={{ width: '2.5rem', color: 'rgb(60, 60, 60)' }} />
                                                }
                                                {drop}
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                        </div>
                        <li>
                            <label className="label" htmlFor="jobPosition">Job Position<p className="required">*</p></label>
                            <select
                                value={jobPosition}
                                onChange={(e) => {
                                    setJobPosition(
                                        e.target.selectedIndex ?
                                            e.target.options[e.target.selectedIndex].value :
                                            e.target.value)
                                }}
                            >
                                <option key='' value=''>
                                    Select...
                                </option>
                                {jobPositions
                                    && jobPositions.map((pos) => (
                                        <option key={pos} value={pos}>
                                            {pos}
                                        </option>
                                    ))}
                            </select>
                        </li>
                        <li>
                            <label className="label" htmlFor="jobDescription">Job Descrition<p className="required">*</p></label>
                            <textarea
                                type="text"
                                name="jobDescription"
                                id="jobDescription"
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                            ></textarea>
                        </li>
                        <li>
                            <label className="label" htmlFor="facebook">
                                <FontAwesomeIcon
                                    icon={faFacebookSquare}
                                    style={{ width: '2.5rem', color: 'rgb(60, 60, 60)' }} />
                                Facebook<p className="required">*</p></label>
                            <input
                                type="text"
                                name="facebook"
                                id="facebook"
                                value={facebook}
                                onChange={(e) => setFacebook(e.target.value)}
                            ></input>
                        </li>
                        <li>
                            <label className="label" htmlFor="instagram">
                                <FontAwesomeIcon
                                    icon={faInstagram}
                                    style={{ width: '2.5rem', color: 'rgb(60, 60, 60)' }} />
                                Instagram<p className="required">*</p></label>
                            <input
                                type="text"
                                name="instagram"
                                id="instagram"
                                value={instagram}
                                onChange={(e) => setInstagram(e.target.value)}
                            ></input>
                        </li>
                        <li>
                            <label className="label" htmlFor="youtube">
                                <FontAwesomeIcon
                                    icon={faYoutube}
                                    style={{ width: '2.5rem', color: 'rgb(60, 60, 60)' }} />
                                Youtube</label>
                            <input
                                type="text"
                                name="youtube"
                                id="youtube"
                                value={youtube}
                                onChange={(e) => setYoutube(e.target.value)}
                            ></input>
                        </li>
                        <div className='dropdown'>
                            <div className='dropdown-label'>Interests<p className="required">*</p></div>
                            <div className='dropdown-overlay overlay-2'></div>
                            <div className='dropdown-container'>
                                <div className='dropdown-input' onClick={() => {
                                    document.querySelector('.overlay-2').style.display = 'block';
                                    setDropdownListVisible(true)
                                }}>
                                    {interests &&
                                        interests.map(c => (
                                            <div
                                                key={c}
                                                className='dropdown-checked'>
                                                {c}
                                                <FontAwesome className='fas fa-close dropdown-checked-close'
                                                    onClick={() => removeInterest(c)} />
                                            </div>
                                        ))}
                                    <FontAwesome className='fas fa-chevron-down' />
                                </div>
                                {dropdownListVisible &&
                                    <div className='dropdown-list'>
                                        {dropdownList.map(drop => (
                                            //!(category.find(c => c === drop)) &&
                                            <div
                                                key={drop}
                                                className='dropdown-choice'
                                                onClick={() => addInterest(drop)}
                                            >
                                                {drop}
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                        </div>
                        <li>
                            <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                                <label className="label" htmlFor="contract">Contract</label>
                                <input
                                    style={{ margin: '0.5rem' }}
                                    className='switch'
                                    type="checkbox"
                                    id="active s2 contract"
                                    checked={contractVisible}
                                    onChange={(e) => {
                                        setContractVisible(e.target.checked)
                                        if (e.target.checked === false) {
                                            setContract(undefined)
                                            setContractSaved(false)
                                            setValidityMonth('')
                                            setValidityYear('')
                                            setStartDay('')
                                            setStartMonth('')
                                            setStartYear('')
                                            setEndDay('')
                                            setEndMonth('')
                                            setEndYear('')
                                        } else {
                                            setEndYear(currentYear)
                                            setStartYear(currentYear)
                                            setStartDay(currentDay)
                                            setStartMonth(currentMonth)
                                            setEndDay(currentDay)
                                            setEndMonth(currentMonth)
                                        }
                                    }}
                                ></input>
                                {contractVisible &&
                                    <button
                                        style={{ margin: '0' }}
                                        className='form-save-btn'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setContract({
                                                validity: { month: validityMonth, year: validityYear },
                                                startDate: { day: startDay, month: startMonth, year: startYear },
                                                endDate: { day: endDay, month: endMonth, year: endYear },
                                            })
                                            setContractSaved(true)
                                        }}
                                    >
                                        {!contractSaved && <div>Save</div>}
                                        {contractSaved && <div><FontAwesomeIcon icon={faCheck} /> Saved</div>}
                                    </button>
                                }
                            </div>
                            {contractVisible &&
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', fontSize: '1.2rem', marginBottom: '0.2rem' }}>
                                        <label
                                            style={{ width: '10rem', marginRight: '0.5rem' }}
                                            className="label" htmlFor="startDate">Duration</label>
                                        <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                                            <div style={{ marginRight: '0.5rem', fontSize: '1.2rem' }}>Month</div>
                                            <select
                                                style={{ width: '4rem', marginRight: '0.5rem', fontSize: '1.2rem', padding: '0' }}
                                                value={validityMonth}
                                                onChange={(e) => {
                                                    setValidityMonth(
                                                        e.target.selectedIndex ?
                                                            e.target.options[e.target.selectedIndex].value :
                                                            e.target.value)
                                                }}
                                            >
                                                <option key={0} value={0}>
                                                    0
                                                </option>
                                                {days
                                                    && days.map((day) => (
                                                        <option key={day} value={day}>
                                                            {day}
                                                        </option>
                                                    ))}
                                            </select>
                                            <div style={{ marginRight: '0.5rem', fontSize: '1.2rem' }}>Year</div>
                                            <select
                                                style={{ width: '4rem', marginRight: '0.5rem', fontSize: '1.2rem', padding: '0' }}
                                                value={validityYear}
                                                onChange={(e) => {
                                                    setValidityYear(
                                                        e.target.selectedIndex ?
                                                            e.target.options[e.target.selectedIndex].value :
                                                            e.target.value)
                                                }}
                                            >
                                                <option key={0} value={0}>
                                                    0
                                                </option>
                                                {days
                                                    && days.map((day) => (
                                                        <option key={day} value={day}>
                                                            {day}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', fontSize: '1.2rem', marginBottom: '0.2rem' }}>
                                        <label
                                            style={{ width: '10rem', marginRight: '0.5rem' }}
                                            className="label" htmlFor="startDate">Start Date</label>
                                        <div style={{ display: 'flex', width: '100%' }}>
                                            <select
                                                style={{ width: '4rem', marginRight: '0.5rem', fontSize: '1.2rem', padding: '0' }}
                                                value={startDay}
                                                onChange={(e) => {
                                                    setStartDay(
                                                        e.target.selectedIndex ?
                                                            e.target.options[e.target.selectedIndex].value :
                                                            e.target.value)
                                                }}
                                            >
                                                {days
                                                    && days.map((day) => (
                                                        <option key={day} value={day}>
                                                            {day}
                                                        </option>
                                                    ))}
                                            </select>
                                            <select
                                                style={{ width: '6rem', marginRight: '0.5rem', fontSize: '1.2rem', padding: '0' }}
                                                value={startMonth}
                                                onChange={(e) => {
                                                    setStartMonth(
                                                        e.target.selectedIndex ?
                                                            e.target.options[e.target.selectedIndex].value :
                                                            e.target.value)
                                                }}
                                            >
                                                {months
                                                    && months.map((month) => (
                                                        <option key={month} value={month}>
                                                            {month}
                                                        </option>
                                                    ))}
                                            </select>
                                            <select
                                                style={{ width: '6rem', marginRight: '0.5rem', fontSize: '1.2rem', padding: '0' }}
                                                value={startYear}
                                                onChange={(e) => {
                                                    setStartYear(
                                                        e.target.selectedIndex ?
                                                            e.target.options[e.target.selectedIndex].value :
                                                            e.target.value)
                                                }}
                                            >
                                                {years
                                                    && years.map((year) => (
                                                        <option key={year} value={year}>
                                                            {year}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', fontSize: '1.2rem' }}>
                                        <label
                                            style={{ width: '10rem', marginRight: '0.5rem' }}
                                            className="label" htmlFor="startDate">End Date</label>
                                        <div style={{ display: 'flex', width: '100%' }}>
                                            <select
                                                style={{ width: '4rem', marginRight: '0.5rem', fontSize: '1.2rem', padding: '0' }}
                                                value={endDay}
                                                onChange={(e) => {
                                                    setEndDay(
                                                        e.target.selectedIndex ?
                                                            e.target.options[e.target.selectedIndex].value :
                                                            e.target.value)
                                                }}
                                            >
                                                {days
                                                    && days.map((day) => (
                                                        <option key={day} value={day}>
                                                            {day}
                                                        </option>
                                                    ))}
                                            </select>
                                            <select
                                                style={{ width: '6rem', marginRight: '0.5rem', fontSize: '1.2rem', padding: '0' }}
                                                value={endMonth}
                                                onChange={(e) => {
                                                    setEndMonth(
                                                        e.target.selectedIndex ?
                                                            e.target.options[e.target.selectedIndex].value :
                                                            e.target.value)
                                                }}
                                            >
                                                {months
                                                    && months.map((month) => (
                                                        <option key={month} value={month}>
                                                            {month}
                                                        </option>
                                                    ))}
                                            </select>
                                            <select
                                                style={{ width: '6rem', marginRight: '0.5rem', fontSize: '1.2rem', padding: '0' }}
                                                value={endYear}
                                                onChange={(e) => {
                                                    setEndYear(
                                                        e.target.selectedIndex ?
                                                            e.target.options[e.target.selectedIndex].value :
                                                            e.target.value)
                                                }}
                                            >
                                                {years
                                                    && years.map((year) => (
                                                        year >= currentYear &&
                                                        <option key={year} value={year}>
                                                            {year}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            }
                        </li>
                        <li>
                            <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                                <label className="label" htmlFor="salary">Salary</label>
                                <input
                                    style={{ margin: '0.5rem' }}
                                    className='switch'
                                    type="checkbox"
                                    id="active s2 salary"
                                    checked={salaryVisible}
                                    onChange={(e) => {
                                        setSalaryVisible(e.target.checked)
                                        if (e.target.checked === false) {
                                            setSalary(undefined)
                                            setSalarySaved(false)
                                            setSalaryType('')
                                            setSalaryRate('')
                                            setSalaryOverTimeType('')
                                            setSalaryOverTimeRate('')
                                            setCommissionType('')
                                            setCommissionRate('')
                                        }
                                    }}
                                ></input>
                                {salaryVisible &&
                                    <button
                                        style={{ margin: '0' }}
                                        className='form-save-btn'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setSalary({
                                                type: salaryType,
                                                rate: salaryRate,
                                                overTimeType: salaryOverTimeType,
                                                overTimeRate: salaryOverTimeRate,
                                                commissionType: commissionType,
                                                commissionRate: commissionRate,
                                            })
                                            setSalarySaved(true)
                                        }}
                                    >
                                        {!salarySaved && <div>Save</div>}
                                        {salarySaved && <div><FontAwesomeIcon icon={faCheck} /> Saved</div>}
                                    </button>
                                }
                            </div>
                            {salaryVisible &&
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <label
                                            style={{ width: '8rem', marginRight: '0.5rem', fontSize: '1.2rem' }}
                                            className="label"
                                            htmlFor="fixed">Fixed Rate</label>
                                        <input
                                            style={{ width: '8rem', marginRight: '0.2rem', padding: '0', fontSize: '1.2rem', textAlign: 'center' }}
                                            type="text"
                                            name="salaryRate"
                                            id="salaryRate"
                                            value={salaryRate}
                                            onChange={(e) => {
                                                setSalaryRate(e.target.value)
                                                setSalarySaved(false)
                                            }}
                                        ></input>
                                        /
                                        <select
                                            style={{ width: '9rem', marginLeft: '0.2rem', padding: '0', fontSize: '1.2rem' }}
                                            value={salaryType}
                                            onChange={(e) => {
                                                setSalaryType(
                                                    e.target.selectedIndex ?
                                                        e.target.options[e.target.selectedIndex].value :
                                                        e.target.value)
                                                setSalarySaved(false)
                                            }}
                                        >
                                            {salaryTypes
                                                && salaryTypes.map(type => (
                                                    <option key={type} value={type}>
                                                        {type}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <label
                                            style={{ width: '8rem', marginRight: '0.5rem', fontSize: '1.2rem' }}
                                            className="label" htmlFor="overTime">Over Time</label>
                                        <input
                                            style={{ width: '8rem', marginRight: '0.2rem', padding: '0', textAlign: 'center', fontSize: '1.2rem' }}
                                            type="text"
                                            name="salaryOverTimeRate"
                                            id="salaryOverTimeRate"
                                            value={salaryOverTimeRate}
                                            onChange={(e) => {
                                                setSalaryOverTimeRate(e.target.value)
                                                setSalarySaved(false)
                                            }}
                                        ></input>
                                        /
                                        <select
                                            style={{ width: '9rem', marginLeft: '0.2rem', padding: '0', fontSize: '1.2rem' }}
                                            value={salaryOverTimeType}
                                            onChange={(e) => {
                                                setSalaryOverTimeType(
                                                    e.target.selectedIndex ?
                                                        e.target.options[e.target.selectedIndex].value :
                                                        e.target.value)
                                                setSalarySaved(false)
                                            }}
                                        >
                                            {salaryTypes
                                                && salaryTypes.map(type => (
                                                    <option key={type} value={type}>
                                                        {type}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <label
                                            style={{ width: '8rem', marginRight: '0.5rem', fontSize: '1.2rem' }}
                                            className="label"
                                            htmlFor="fixed">Commission</label>
                                        <input
                                            style={{ width: '8rem', marginRight: '0.2rem', padding: '0', textAlign: 'center', fontSize: '1.2rem' }}
                                            type="text"
                                            name="commissionRate"
                                            id="commissionRate"
                                            value={commissionRate}
                                            onChange={(e) => {
                                                setCommissionRate(e.target.value)
                                                setSalarySaved(false)
                                            }}
                                        ></input>
                                        {commissionType === 'Sales' ? '%' : '/'}
                                        <select
                                            style={{ width: '9rem', marginLeft: '0.2rem', padding: '0', fontSize: '1.2rem' }}
                                            value={commissionType}
                                            onChange={(e) => {
                                                setCommissionType(
                                                    e.target.selectedIndex ?
                                                        e.target.options[e.target.selectedIndex].value :
                                                        e.target.value)
                                                setSalarySaved(false)
                                            }}
                                        >
                                            {salaryTypes
                                                && salaryTypes.map(type => (
                                                    <option key={type} value={type}>
                                                        {type}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                </div>
                            }
                        </li>
                        <li>
                            <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                                <label className="label" htmlFor="salary">Work Time</label>
                                <input
                                    style={{ margin: '0.5rem' }}
                                    className='switch'
                                    type="checkbox"
                                    id="active s2 work-time"
                                    checked={workTimeVisible}
                                    onChange={(e) => {
                                        setWorkTimeVisible(e.target.checked)
                                        if (e.target.checked === false) {
                                            setWorkTime()
                                            weekDays.forEach(day => {
                                                setFrom('', day)
                                                setTo('', day)
                                            })
                                        }
                                        setWorkTimeSaved(false)
                                    }}
                                ></input>
                                {workTimeVisible &&
                                    <button
                                        style={{ margin: '0' }}
                                        className='form-save-btn'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setWorkTime({
                                                mon: { from: monFrom, to: monTo },
                                                tue: { from: tueFrom, to: tueTo },
                                                wed: { from: wedFrom, to: wedTo },
                                                thu: { from: thuFrom, to: thuTo },
                                                fri: { from: friFrom, to: friTo },
                                                sat: { from: satFrom, to: satTo },
                                                sun: { from: sunFrom, to: sunTo },
                                            })
                                            setWorkTimeSaved(true)
                                        }}
                                    >
                                        {!workTimeSaved && <div>Save</div>}
                                        {workTimeSaved && <div><FontAwesomeIcon icon={faCheck} /> Saved</div>}
                                    </button>
                                }
                            </div>
                            {workTimeVisible &&
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ width: '8rem', marginRight: '0.5rem', fontSize: '1.2rem' }}></div>
                                        <div style={{ width: '8rem', marginRight: '0.5rem', fontSize: '1.2rem' }}>From</div>
                                        <div style={{ width: '8rem', marginRight: '0.5rem', fontSize: '1.2rem' }}>To</div>
                                    </div>
                                    {weekDays && weekDays.map(day => (
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.2rem' }}>
                                            <label
                                                style={{ width: '8rem', fontSize: '1.2rem' }}
                                                className="label"
                                                htmlFor="monday">{day}</label>
                                            <input
                                                style={{ width: '9rem', marginRight: '0.2rem', padding: '0', textAlign: 'center', fontSize: '1.1rem' }}
                                                type="time"
                                                name={day}
                                                id={day + 'from'}
                                                value={from(day)}
                                                onChange={(e) => {
                                                    setFrom(e.target.value, day)
                                                    setWorkTimeSaved(false)
                                                    !tueFrom && !wedFrom && !thuFrom && !friFrom && !satFrom && !sunFrom &&
                                                        uniteFromWorkTime(e.target.value, day)
                                                }}
                                            ></input>
                                            <input
                                                style={{ width: '9rem', marginRight: '0.5rem', padding: '0', textAlign: 'center', fontSize: '1.1rem' }}
                                                type="time"
                                                name={day}
                                                id={day + 'to'}
                                                value={to(day)}
                                                onChange={(e) => {
                                                    setTo(e.target.value, day)
                                                    setWorkTimeSaved(false)
                                                    uniteToWorkTime(e.target.value, day)
                                                }}
                                            ></input>
                                            <FontAwesomeIcon icon={faTimes} style={{ color: 'red', cursor: 'pointer' }}
                                                onClick={() => {
                                                    setFrom('', day)
                                                    setTo('', day)
                                                    setWorkTimeSaved(false)
                                                }} />
                                        </div>
                                    ))}
                                </div>
                            }
                        </li>
                        <li>
                            <label className="label" htmlFor="note">Note</label>
                            <textarea
                                name="note"
                                id="note"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            ></textarea>
                        </li>
                        <li>
                            {formAlertVisible && <div className="invalid">{formAlert}</div>}
                            <button type="submit" className="button primary">
                                {
                                    formAction == 'Copy' ? 'Add' :
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
                        <th>Active</th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Position</th>
                        <th>Contract</th>
                        <th>Work Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees &&
                        employees.map((employee) => (
                            <tr key={employee._id}>
                                <td className='td-active'>
                                    <input
                                        className='switch'
                                        type="checkbox"
                                        name={employee._id}
                                        id="active s2"
                                        value={employee.active}
                                        checked={employee.active}
                                        onChange={(e) => activationHandler(e, employee)}
                                    ></input>
                                </td>
                                <td style={{ width: '8rem', textAlign: 'center', paddingTop: '0.5rem' }}>
                                    <img
                                        className='employee-image'
                                        src={employee.image} alt='employee' />
                                </td>
                                <td style={{ maxWidth: '20rem' }}>{employee.firstName + ' ' + employee.lastName}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.jobPosition}</td>
                                <td style={{ textAlign: 'center' }}>
                                    {contractStartHandler(employee.contract) && contractEndHandler(employee.contract)
                                        ? <div><FontAwesomeIcon data-tip data-for={'endDate' + employees.indexOf(employee)}
                                            className='faCircle' icon={faCircle} />
                                            <ReactTooltip id={'endDate' + employees.indexOf(employee)} place="top" effect="solid">
                                                Start Date {employee.contract.startDate.day + ' '
                                                    + employee.contract.startDate.month + ' '
                                                    + employee.contract.startDate.year}
                                                <br />
                                                End Date {employee.contract.endDate.day + ' '
                                                    + employee.contract.endDate.month + ' '
                                                    + employee.contract.endDate.year}
                                            </ReactTooltip>
                                        </div>
                                        : <FontAwesomeIcon className='farCircle' icon={farCircle} />}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    {((currentWeekDay === 'Monday' && employee.workTime.mon) ?
                                        (currentHour > employee.workTime.mon.from.slice(0, 2) || (currentHour == employee.workTime.mon.from.slice(0, 2) && currentMinutes >= employee.workTime.mon.from.slice(3, 5)))
                                        && (currentHour < employee.workTime.mon.to.slice(0, 2) || (currentHour == employee.workTime.mon.to.slice(0, 2)) && currentMinutes < employee.workTime.mon.to.slice(3, 5))
                                        && employee.workTime.mon.to

                                        : (currentWeekDay === 'Tuesday' && employee.workTime.tue) ?
                                            (currentHour > employee.workTime.tue.from.slice(0, 2) || (currentHour == employee.workTime.tue.from.slice(0, 2) && currentMinutes >= employee.workTime.tue.from.slice(3, 5)))
                                            && (currentHour < employee.workTime.tue.to.slice(0, 2) || (currentHour == employee.workTime.tue.to.slice(0, 2)) && currentMinutes < employee.workTime.tue.to.slice(3, 5))
                                            && employee.workTime.tue.to

                                            : (currentWeekDay === 'Wednesday' && employee.workTime.wed) ?
                                                (currentHour > employee.workTime.wed.from.slice(0, 2) || (currentHour == employee.workTime.wed.from.slice(0, 2) && currentMinutes >= employee.workTime.wed.from.slice(3, 5)))
                                                && (currentHour < employee.workTime.wed.to.slice(0, 2) || (currentHour == employee.workTime.wed.to.slice(0, 2)) && currentMinutes < employee.workTime.wed.to.slice(3, 5))
                                                && employee.workTime.wed.to

                                                : (currentWeekDay === 'Thursday' && employee.workTime.thu) ?
                                                    (currentHour > employee.workTime.thu.from.slice(0, 2) || (currentHour == employee.workTime.thu.from.slice(0, 2) && currentMinutes >= employee.workTime.thu.from.slice(3, 5)))
                                                    && (currentHour < employee.workTime.thu.to.slice(0, 2) || (currentHour == employee.workTime.thu.to.slice(0, 2)) && currentMinutes < employee.workTime.thu.to.slice(3, 5))
                                                    && employee.workTime.thu.to

                                                    : (currentWeekDay === 'Friday' && employee.workTime.fri) ?
                                                        (currentHour > employee.workTime.fri.from.slice(0, 2) || (currentHour == employee.workTime.fri.from.slice(0, 2) && currentMinutes >= employee.workTime.fri.from.slice(3, 5)))
                                                        && (currentHour < employee.workTime.fri.to.slice(0, 2) || (currentHour == employee.workTime.fri.to.slice(0, 2)) && currentMinutes < employee.workTime.fri.to.slice(3, 5))
                                                        && employee.workTime.fri.to

                                                        : (currentWeekDay === 'Saturday' && employee.workTime.sat) ?
                                                            (currentHour > employee.workTime.sat.from.slice(0, 2) || (currentHour == employee.workTime.sat.from.slice(0, 2) && currentMinutes >= employee.workTime.sat.from.slice(3, 5)))
                                                            && (currentHour < employee.workTime.sat.to.slice(0, 2) || (currentHour == employee.workTime.sat.to.slice(0, 2)) && currentMinutes < employee.workTime.sat.to.slice(3, 5))
                                                            && employee.workTime.sat.to

                                                            : (currentWeekDay === 'Sunday' && employee.workTime.sun) ?
                                                                (currentHour > employee.workTime.sun.from.slice(0, 2) || (currentHour == employee.workTime.sun.from.slice(0, 2) && currentMinutes >= employee.workTime.sun.from.slice(3, 5)))
                                                                && (currentHour < employee.workTime.sun.to.slice(0, 2) || (currentHour == employee.workTime.sun.to.slice(0, 2)) && currentMinutes < employee.workTime.sun.to.slice(3, 5))
                                                                && employee.workTime.sun.to
                                                                : undefined)
                                        ? <div><FontAwesomeIcon data-tip data-for={'endTime' + employees.indexOf(employee)}
                                            className='faCircle' icon={faCircle} />
                                            <ReactTooltip id={'endTime' + employees.indexOf(employee)} place="top" effect="solid">
                                                {((currentWeekDay === 'Monday' && employee.workTime.mon) ? 'Monday ' + employee.workTime.mon.from + ' till ' + employee.workTime.mon.to
                                                    : (currentWeekDay === 'Tuesday' && employee.workTime.tue) ? 'Tuesday ' + employee.workTime.tue.from + ' till ' + employee.workTime.tue.to
                                                        : (currentWeekDay === 'Wednesday' && employee.workTime.wed) ? 'Wednesday ' + employee.workTime.wed.from + ' till ' + employee.workTime.wed.to
                                                            : (currentWeekDay === 'Thursday' && employee.workTime.thu) ? 'Thursday ' + employee.workTime.thu.from + ' till ' + employee.workTime.thu.to
                                                                : (currentWeekDay === 'Friday' && employee.workTime.fri) ? 'Friday ' + employee.workTime.fri.from + ' till ' + employee.workTime.fri.to
                                                                    : (currentWeekDay === 'Saturday' && employee.workTime.sat) ? 'Saturday ' + employee.workTime.sat.from + ' till ' + employee.workTime.sat.to
                                                                        : (currentWeekDay === 'Sunday' && employee.workTime.sun) ? 'Sunday ' + employee.workTime.sun.from + ' till ' + employee.workTime.sun.to
                                                                            : '')}
                                            </ReactTooltip>
                                        </div>
                                        : <FontAwesomeIcon className='farCircle' icon={farCircle} />}
                                </td>
                                <td>
                                    <button className="table-btns" onClick={() => editHandler(employee)}>Edit</button>
                                    <button className="table-btns" onClick={(e) => deleteHandler(e, employee._id)}>Delete</button>
                                    <button className="table-btns" onClick={() => showHistoryHandler(employee)}>History</button>
                                    <button className="table-btns" onClick={(e) => commentHandler(e, employee)}>
                                        <FontAwesomeIcon icon={faCommentDots} /></button>
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
                            <div className='history-title' style={{ margin: '1rem' }}>{employeeValues.firstName + ' ' + employeeValues.lastName} History</div>
                            <table className="range-table">
                                <thead>
                                    <tr>
                                        <th style={{ width: '15rem' }}>Date</th>
                                        <th>Note</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={employeeValues._id}>
                                        <td>{employeeValues.creation_date && employeeValues.creation_date.split("T", 1) + '  '
                                            + employeeValues.creation_date.slice(employeeValues.creation_date.indexOf('T') + 1, -1).slice(0, 5)}
                                        </td>
                                        <td>{employeeValues.created_by && employeeValues.created_by} added {employeeValues.firstName + ' ' + employeeValues.lastName}.</td>
                                    </tr>
                                    {employeeValues.modified &&
                                        employeeValues.modified.map(modified => (
                                            <tr>
                                                <td>{modified.modified_date && modified.modified_date.split("T", 1) + '  '
                                                    + modified.modified_date.slice(modified.modified_date.indexOf('T') + 1, -1).slice(0, 5)}
                                                </td>
                                                <td>{modifiedNoteHandler(modified)}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            }
            {
                commentVisible &&
                <div className='range-overlay overlay-4' style={{ zIndex: '4' }}>
                    <div className='comment-container'>
                        <div style={{ padding: '0.5rem', fontSize: '1.6rem' }}>Send message to {employeeValues.firstName + ' ' + employeeValues.lastName}</div>
                        <textarea
                            style={{ width: '80%', height: '40%' }}
                            name="comment"
                            id="comment"
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        <div style={{ padding: '2rem' }}>
                            <button className='button'
                                style={{ marginRight: '3rem', padding: '1rem 4rem' }}
                                onClick={(e) => sendComment(e)}>Send</button>
                            <button className='button secondary'
                                style={{ padding: '1rem 4rem' }}
                                onClick={() => setCommentVisible(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            }
        </div >
    );
}

export default EmployeeManager;
