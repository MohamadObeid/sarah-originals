import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserCog, faBoxes, faMapMarkedAlt, faTh,
  faThLarge, faTruck, faDoorOpen, faStarHalfAlt, faAddressCard, faCartArrowDown,
  faDollarSign,
  faCalendarCheck,
  faTasks
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
    if (!userInfo) {
      props.history.push("/signin?redirect=dashboard")
    }

    if (productVisible) {
      dispatch(listProducts())
      dispatch(listBrand())
    };
    if (categoryVisible) {
      dispatch(listCategory())
      dispatch(listBrand())
    }
    brandVisible && dispatch(listBrand())
    if (usersVisible) { dispatch(listUsers()); dispatch(listEmployees()) }
    zoneVisible && dispatch(listZone())
    deliveryVisible && dispatch(listDelivery())
    paymentVisible && dispatch(listPayment())
    employeeVisible && dispatch(listEmployees())
    ordersVisible && dispatch(listOrders())
    reviewsVisible && dispatch(listReviews())
    assignmentsVisible && dispatch(listAssignment())
    if (attendanceVisible) {
      dispatch(listAttendance());
      !employees && dispatch(listEmployees());
      userInfo && dispatch(detailsEmployee(userInfo.employeeId))
    }
    if (chatVisible) { dispatch(listChat()); dispatch(listLiveUser()) }
    return () => {
      //
    };
  }, [
    productVisible,
    categoryVisible,
    brandVisible,
    usersVisible,
    zoneVisible,
    deliveryVisible,
    paymentVisible,
    assignmentsVisible,
    employeeVisible,
    reviewsVisible,
    attendanceVisible,
    userInfo,
    chatVisible
  ])

  return (
    (userInfo &&
      (userInfo.isAdmin || userInfo.email === 'dm@beirutgrouptt.com')) &&
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
          <li onClick={() => {
            setCategoryVisible(false)
            setProductVisible(false)
            setZoneVisible(false)
            setBrandVisible(false)
            setDeliveryVisible(false)
            setPaymentVisible(false)
            setUsersVisible(true)
            setReviewsVisible(false)
            setEmployeeVisible(false)
            setAssignmentsVisible(false)
            setOrdersVisible(false)
            setAttendanceVisible(false)
            setChatVisible(false)
          }}>
            <h4 className="control-title">
              <FontAwesomeIcon
                icon={faUserCog}
                style={{ width: '3rem', color: 'rgb(60, 60, 60)' }} />
              User Manager</h4>
          </li>
          <li onClick={() => {
            setCategoryVisible(false)
            setProductVisible(false)
            setZoneVisible(false)
            setBrandVisible(false)
            setDeliveryVisible(false)
            setPaymentVisible(false)
            setUsersVisible(false)
            setReviewsVisible(false)
            setEmployeeVisible(true)
            setAssignmentsVisible(false)
            setOrdersVisible(false)
            setAttendanceVisible(false)
            setChatVisible(false)
          }}>
            <h4 className="control-title">
              <FontAwesomeIcon
                icon={faAddressCard}
                style={{ width: '3rem', color: 'rgb(60, 60, 60)' }} />
              Employee Profile Manager</h4>
          </li>
          <li onClick={() => {
            setCategoryVisible(false)
            setProductVisible(false)
            setZoneVisible(false)
            setBrandVisible(false)
            setDeliveryVisible(false)
            setPaymentVisible(false)
            setUsersVisible(false)
            setReviewsVisible(false)
            setEmployeeVisible(false)
            setAssignmentsVisible(true)
            setOrdersVisible(false)
            setAttendanceVisible(false)
            setChatVisible(false)
          }}>
            <h4 className="control-title">
              <FontAwesomeIcon
                icon={faTasks}
                style={{ width: '3rem', color: 'rgb(60, 60, 60)' }} />
              Assignments Manager</h4>
          </li>
          <li onClick={() => {
            setCategoryVisible(false)
            setProductVisible(false)
            setZoneVisible(false)
            setBrandVisible(false)
            setDeliveryVisible(false)
            setPaymentVisible(false)
            setUsersVisible(false)
            setReviewsVisible(false)
            setEmployeeVisible(false)
            setAssignmentsVisible(false)
            setOrdersVisible(false)
            setAttendanceVisible(true)
            setChatVisible(false)
          }}>
            <h4 className="control-title">
              <FontAwesomeIcon
                icon={faCalendarCheck}
                style={{ width: '3rem', color: 'rgb(60, 60, 60)' }} />
              Attendance Manager</h4>
          </li>
          <li onClick={() => {
            setCategoryVisible(false)
            setProductVisible(false)
            setZoneVisible(false)
            setBrandVisible(false)
            setDeliveryVisible(false)
            setPaymentVisible(false)
            setUsersVisible(false)
            setReviewsVisible(false)
            setEmployeeVisible(false)
            setAssignmentsVisible(false)
            setOrdersVisible(true)
            setAttendanceVisible(false)
            setChatVisible(false)
          }}>
            <h4 className="control-title">
              <FontAwesomeIcon
                icon={faCartArrowDown}
                style={{ width: '3rem', color: 'rgb(60, 60, 60)' }} />
              Orders Manager</h4>
          </li>
          <li onClick={() => {
            setProductVisible(true)
            setZoneVisible(false)
            setCategoryVisible(false)
            setDeliveryVisible(false)
            setPaymentVisible(false)
            setBrandVisible(false)
            setUsersVisible(false)
            setReviewsVisible(false)
            setEmployeeVisible(false)
            setAssignmentsVisible(false)
            setOrdersVisible(false)
            setAttendanceVisible(false)
            setChatVisible(false)
          }}>
            <h4 className="control-title">
              <FontAwesomeIcon
                icon={faBoxes}
                style={{ width: '3rem', color: 'rgb(60, 60, 60)' }} />
              Product Manager</h4>
          </li>
          <li onClick={() => {
            setZoneVisible(true)
            setProductVisible(false)
            setCategoryVisible(false)
            setBrandVisible(false)
            setDeliveryVisible(false)
            setPaymentVisible(false)
            setUsersVisible(false)
            setReviewsVisible(false)
            setEmployeeVisible(false)
            setAssignmentsVisible(false)
            setOrdersVisible(false)
            setAttendanceVisible(false)
            setChatVisible(false)
          }}>
            <h4 className="control-title">
              <FontAwesomeIcon
                icon={faMapMarkedAlt}
                style={{ width: '3rem', color: 'rgb(60, 60, 60)' }} />
              Zone Manager</h4>
          </li>
          <li onClick={() => {
            setCategoryVisible(true)
            setProductVisible(false)
            setZoneVisible(false)
            setBrandVisible(false)
            setDeliveryVisible(false)
            setPaymentVisible(false)
            setUsersVisible(false)
            setReviewsVisible(false)
            setEmployeeVisible(false)
            setAssignmentsVisible(false)
            setOrdersVisible(false)
            setAttendanceVisible(false)
            setChatVisible(false)
          }}>
            <h4 className="control-title">
              <FontAwesomeIcon
                icon={faTh}
                style={{ width: '3rem', color: 'rgb(60, 60, 60)' }} />
              Category Manager</h4>
          </li>
          <li onClick={() => {
            setCategoryVisible(false)
            setProductVisible(false)
            setZoneVisible(false)
            setBrandVisible(true)
            setDeliveryVisible(false)
            setPaymentVisible(false)
            setUsersVisible(false)
            setReviewsVisible(false)
            setEmployeeVisible(false)
            setAssignmentsVisible(false)
            setOrdersVisible(false)
            setAttendanceVisible(false)
            setChatVisible(false)
          }}>
            <h4 className="control-title">
              <FontAwesomeIcon
                icon={faThLarge}
                style={{ width: '3rem', color: 'rgb(60, 60, 60)' }} />
              Brand Manager</h4>
          </li>
          <li onClick={() => {
            setCategoryVisible(false)
            setProductVisible(false)
            setZoneVisible(false)
            setBrandVisible(false)
            setDeliveryVisible(true)
            setPaymentVisible(false)
            setUsersVisible(false)
            setReviewsVisible(false)
            setEmployeeVisible(false)
            setAssignmentsVisible(false)
            setOrdersVisible(false)
            setAttendanceVisible(false)
            setChatVisible(false)
          }}>
            <h4 className="control-title">
              <FontAwesomeIcon
                icon={faTruck}
                style={{ width: '3rem', color: 'rgb(60, 60, 60)' }} />
              Delivery Manager</h4>
          </li>
          <li onClick={() => {
            setCategoryVisible(false)
            setProductVisible(false)
            setZoneVisible(false)
            setBrandVisible(false)
            setDeliveryVisible(false)
            setPaymentVisible(true)
            setUsersVisible(false)
            setReviewsVisible(false)
            setEmployeeVisible(false)
            setAssignmentsVisible(false)
            setOrdersVisible(false)
            setAttendanceVisible(false)
            setChatVisible(false)
          }}>
            <h4 className="control-title">
              <FontAwesomeIcon
                icon={faDollarSign}
                style={{ width: '3rem', color: 'rgb(60, 60, 60)' }} />
              Payment Manager</h4>
          </li>
          <li onClick={() => {
            setCategoryVisible(false)
            setProductVisible(false)
            setZoneVisible(false)
            setBrandVisible(false)
            setDeliveryVisible(false)
            setPaymentVisible(false)
            setUsersVisible(false)
            setReviewsVisible(true)
            setEmployeeVisible(false)
            setAssignmentsVisible(false)
            setOrdersVisible(false)
            setAttendanceVisible(false)
            setChatVisible(false)
          }}>
            <h4 className="control-title">
              <FontAwesomeIcon
                icon={faStarHalfAlt}
                style={{ width: '3rem', color: 'rgb(60, 60, 60)' }} />
              Reviews Manager</h4>
          </li>
          <li onClick={() => {
            setCategoryVisible(false)
            setProductVisible(false)
            setZoneVisible(false)
            setBrandVisible(false)
            setDeliveryVisible(false)
            setPaymentVisible(false)
            setUsersVisible(false)
            setReviewsVisible(false)
            setEmployeeVisible(false)
            setAssignmentsVisible(false)
            setOrdersVisible(false)
            setAttendanceVisible(false)
            setChatVisible(true)
          }}>
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
