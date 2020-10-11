import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserCog, faBoxes, faMapMarkedAlt, faTh,
  faThLarge, faTruck, faDoorOpen, faStarHalfAlt, faAddressCard, faCartArrowDown,
  faDollarSign,
  faCalendarCheck,
  faTasks, faChartLine
} from '@fortawesome/free-solid-svg-icons'
import { faComments as farComments } from '@fortawesome/free-regular-svg-icons'

import ProductManager from './ProductManager'
import CategoryManager from './CategoryManager'
import BrandManager from './BrandManager'
import ZoneManager from "./ZoneManager"
import UsersManager from './UsersManager'
import DeliveryManager from './DeliveryManager'
import PaymentManager from './PaymentManager'
import ReviewsManager from './ReviewsManager'
import EmployeeManager from './EmployeeManager'
import OrdersManager from './OrdersManager'
import AssignmentManager from './AssignmentManager'
import AttendanceManager from './AttendanceManager'
import ChatManager from "./ChatManager";

import { listProducts } from "../../actions/productActions"
import { listCategory } from "../../actions/categoryActions"
import { listBrand } from "../../actions/brandActions"
import { listUsers } from "../../actions/userActions"
import { listZone } from "../../actions/zoneActions"
import { listDelivery } from "../../actions/deliveryActions"
import { listPayment } from "../../actions/paymentActions"
import { detailsEmployee, listEmployees } from "../../actions/employeeActions"
import { listReviews } from "../../actions/reviewActions"
import { listOrders } from "../../actions/orderActions"
import { listAssignment } from "../../actions/assignmentActions"
import { listAttendance } from "../../actions/attendanceActions"
import { listChat, listLiveUser, saveLiveUser, deleteChat } from "../../actions/chatActions"

function DashBoard(props) {

  const { userInfo } = useSelector(state => state.userSignin);
  const { employees } = useSelector(state => state.employeeList)
  const { delivery: deliveryList } = useSelector(state => state.deliveryList)
  const { payment: paymentList } = useSelector(state => state.paymentList)
  //const { attendance: attendanceList } = useSelector(state => state.attendanceList)

  const [productVisible, setProductVisible] = useState(false)
  const [zoneVisible, setZoneVisible] = useState(false)
  const [categoryVisible, setCategoryVisible] = useState(false)
  const [brandVisible, setBrandVisible] = useState(false)
  const [usersVisible, setUsersVisible] = useState(false)
  const [deliveryVisible, setDeliveryVisible] = useState(false)
  const [paymentVisible, setPaymentVisible] = useState(false)
  const [reviewsVisible, setReviewsVisible] = useState(false)
  const [employeeVisible, setEmployeeVisible] = useState(false)
  const [assignmentsVisible, setAssignmentsVisible] = useState(false)
  const [ordersVisible, setOrdersVisible] = useState(false)
  const [attendanceVisible, setAttendanceVisible] = useState(false)
  const [chatVisible, setChatVisible] = useState(false)

  const dispatch = useDispatch();

  useEffect(() => {
    !userInfo &&
      props.history.push("/signin?redirect=dashboard")
    return () => {
      //
    };
  }, [])

  const managerHandler = (manager) => {
    if (manager === 'user') {
      dispatch(listUsers())
      dispatch(listEmployees())
      setUsersVisible(true)

    } else setUsersVisible(false)

    if (manager === 'employee') {
      dispatch(listEmployees())
      setEmployeeVisible(true)
    } else setEmployeeVisible(false)

    if (manager === 'assignment') {
      dispatch(listAssignment())
      setAssignmentsVisible(true)
    } else setAssignmentsVisible(false)

    if (manager === 'attendance') {
      userInfo.isAttendanceManager ?
        dispatch(listAttendance())
        : dispatch(listAttendance(userInfo.employeeId))
      //!employees && dispatch(listEmployees())
      dispatch(detailsEmployee(userInfo.employeeId))
      setAttendanceVisible(true)
    } else setAttendanceVisible(false)

    if (manager === 'order') {
      !deliveryList.length > 0 &&
        dispatch(listDelivery())
      !paymentList.length > 0 &&
        dispatch(listPayment())
      dispatch(listOrders())
      setOrdersVisible(true)
    } else setOrdersVisible(false)

    if (manager === 'product') {
      dispatch(listProducts())
      dispatch(listBrand())
      setProductVisible(true)
    } else setProductVisible(false)

    if (manager === 'zone') {
      dispatch(listZone())
      setZoneVisible(true)
    } else setZoneVisible(false)

    if (manager === 'category') {
      dispatch(listCategory())
      dispatch(listBrand())
      setCategoryVisible(true)
    } else setCategoryVisible(false)

    if (manager === 'brand') {
      dispatch(listBrand())
      setBrandVisible(true)
    } else setBrandVisible(false)

    if (manager === 'delivery') {
      dispatch(listDelivery())
      setDeliveryVisible(true)
    } else setDeliveryVisible(false)

    if (manager === 'payment') {
      dispatch(listPayment())
      dispatch(listZone())
      setPaymentVisible(true)
    } else setPaymentVisible(false)

    if (manager === 'review') {
      dispatch(listReviews())
      setReviewsVisible(true)
    } else setReviewsVisible(false)

    if (manager === 'chat') {
      dispatch(listChat());
      dispatch(listLiveUser())
      setChatVisible(true)
    } else setChatVisible(false)
  }

  return (
    userInfo && (userInfo.isAdmin || userInfo.email === 'dm@beirutgrouptt.com') &&
    <div className="content">
      <form className="form-control">
        <ul className="form-control-container">
          <li>
            <div className="header-links-manager">
              {
                userInfo &&
                <Link className="header-link-manager" to='/profile'>
                  <FontAwesomeIcon
                    className='fa-lg'
                    icon={faDoorOpen}
                    style={{ marginRight: '0.5rem', color: 'rgb(60, 60, 60)' }} />
                    Hello, {userInfo && userInfo.name && userInfo.name.split(' ')[0]}</Link>
              }
            </div>
            <div className="header-links-manager">Welcome Manager</div>
          </li>
          <li onClick={() => managerHandler('user')}>
            <h4 className="control-title">
              <FontAwesomeIcon
                icon={faUserCog}
                style={{ width: '3rem', color: 'rgb(60, 60, 60)' }} />
              User Manager</h4>
          </li>
          <li onClick={() => managerHandler('activity')}>
            <h4 className="control-title">
              <FontAwesomeIcon
                icon={faChartLine}
                style={{ width: '3rem', color: 'rgb(60, 60, 60)' }} />
              Activity Manager</h4>
          </li>
          <li onClick={() => managerHandler('employee')}>
            <h4 className="control-title">
              <FontAwesomeIcon
                icon={faAddressCard}
                style={{ width: '3rem', color: 'rgb(60, 60, 60)' }} />
              Employee Profile Manager</h4>
          </li>
          <li onClick={() => managerHandler('assignment')}>
            <h4 className="control-title">
              <FontAwesomeIcon
                icon={faTasks}
                style={{ width: '3rem', color: 'rgb(60, 60, 60)' }} />
              Assignments Manager</h4>
          </li>
          <li onClick={() => managerHandler('attendance')}>
            <h4 className="control-title">
              <FontAwesomeIcon
                icon={faCalendarCheck}
                style={{ width: '3rem', color: 'rgb(60, 60, 60)' }} />
              Attendance Manager</h4>
          </li>
          <li onClick={() => managerHandler('order')}>
            <h4 className="control-title">
              <FontAwesomeIcon
                icon={faCartArrowDown}
                style={{ width: '3rem', color: 'rgb(60, 60, 60)' }} />
              Orders Manager</h4>
          </li>
          <li onClick={() => managerHandler('product')}>
            <h4 className="control-title">
              <FontAwesomeIcon
                icon={faBoxes}
                style={{ width: '3rem', color: 'rgb(60, 60, 60)' }} />
              Product Manager</h4>
          </li>
          <li onClick={() => managerHandler('zone')}>
            <h4 className="control-title">
              <FontAwesomeIcon
                icon={faMapMarkedAlt}
                style={{ width: '3rem', color: 'rgb(60, 60, 60)' }} />
              Zone Manager</h4>
          </li>
          <li onClick={() => managerHandler('category')}>
            <h4 className="control-title">
              <FontAwesomeIcon
                icon={faTh}
                style={{ width: '3rem', color: 'rgb(60, 60, 60)' }} />
              Category Manager</h4>
          </li>
          <li onClick={() => managerHandler('brand')}>
            <h4 className="control-title">
              <FontAwesomeIcon
                icon={faThLarge}
                style={{ width: '3rem', color: 'rgb(60, 60, 60)' }} />
              Brand Manager</h4>
          </li>
          <li onClick={() => managerHandler('delivery')}>
            <h4 className="control-title">
              <FontAwesomeIcon
                icon={faTruck}
                style={{ width: '3rem', color: 'rgb(60, 60, 60)' }} />
              Delivery Manager</h4>
          </li>
          <li onClick={() => managerHandler('payment')}>
            <h4 className="control-title">
              <FontAwesomeIcon
                icon={faDollarSign}
                style={{ width: '3rem', color: 'rgb(60, 60, 60)' }} />
              Payment Manager</h4>
          </li>
          <li onClick={() => managerHandler('review')}>
            <h4 className="control-title">
              <FontAwesomeIcon
                icon={faStarHalfAlt}
                style={{ width: '3rem', color: 'rgb(60, 60, 60)' }} />
              Reviews Manager</h4>
          </li>
          <li onClick={() => managerHandler('chat')}>
            <h4 className="control-title">
              <FontAwesomeIcon
                icon={farComments}
                style={{ width: '3rem', color: 'rgb(60, 60, 60)' }} />
              Chat Manager</h4>
          </li>
        </ul>
      </form>

      {/* Product Manager */}
      {productVisible && <ProductManager />}

      {/* Delivery Manager */}
      {zoneVisible && <ZoneManager />}

      {/* Category Manager */}
      {categoryVisible && <CategoryManager />}

      {/* Brand */}
      {brandVisible && <BrandManager />}

      {/* Users */}
      {usersVisible && <UsersManager />}

      {/* Delivery */}
      {deliveryVisible && <DeliveryManager />}

      {/* Payment */}
      {paymentVisible && <PaymentManager />}

      {/* Reviews */}
      {reviewsVisible && <ReviewsManager />}

      {/* Employee */}
      {employeeVisible && <EmployeeManager />}

      {/* Orders */}
      {ordersVisible && <OrdersManager />}

      {/* Assignments */}
      {assignmentsVisible && <AssignmentManager />}

      {/* Attendance */}
      {attendanceVisible && <AttendanceManager />}

      {/* Chat */}
      {chatVisible && <ChatManager />}

    </div>
  );
}
export default DashBoard;
