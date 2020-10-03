import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { months, weekDays } from '../../constants/lists'
import { deleteOrder, listOrders, saveOrder } from '../../actions/orderActions'
import FontAwesome from "react-fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlusCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { getUser, saveUser } from "../../actions/userActions";

function OrdersManager(props) {
    const imageUrl = window.location.origin + '/api/uploads/image/'
    /*
    var d = new Date()
    var currentYear = d.getFullYear()
    var currentMonth = months[d.getMonth()]
    var currentDay = d.getDate()
    var currentWeekDay = weekDays[d.getDay()]
    var currentHour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
    var currentMinutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
    var currentSeconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
    var currentDate = currentWeekDay.slice(0, 3) + ' ' + currentDay + ' ' + currentMonth + ' ' + currentYear
    */

    const [formAction, setFormAction] = useState('Create')
    const [actionNote, setActionNote] = useState()
    const [actionNoteVisible, setActionNoteVisible] = useState(false)
    const [formAlert, setFormAlert] = useState('Kindly fill all required blanks!')
    const [formAlertVisible, setFormAlertVisible] = useState(false)
    const [modelVisible, setModelVisible] = useState(false)
    const [historyVisible, setHistoryVisible] = useState(false)
    const [orderValues, setOrderValues] = useState()

    const [_id, setId] = useState()
    const [status, setStatus] = useState()
    const [closed, setClosed] = useState() //
    const [customerName, setCustomerName] = useState() //
    const [customerUserId, setCustomerUserId] = useState() //
    const [customerPhone, setCustomerPhone] = useState()//
    const [customerEmail, setCustomerEmail] = useState() //
    const [isPlace, setIsPlace] = useState() //
    const [isReturn, setIsReturn] = useState()//
    const [isCancel, setIsCancel] = useState() //
    const [isPrepare, setIsPrepare] = useState() //
    const [placement, setPlacement] = useState() //
    const [paymentStatus, setPaymentStatus] = useState() //
    const [deliveryStatus, setDeliveryStatus] = useState() //
    const [cartStatus, setCartStatus] = useState() //
    const [invoiceAmount, setInvoiceAmount] = useState() //
    const [confirmation, setConfirmation] = useState() //
    const [request, setRequest] = useState() //
    const [address, setAddress] = useState([])

    /*const [placed, setPlaced] = useState()
    const [confirmed, setConfirmed] = useState()
    const [canceled, setCanceled] = useState()
    const [rejected, setRejected] = useState()
    const [completed, setCompleted] = useState()
    const [cancelRequest, setCancelRequest] = useState()
    const [returnRequest, setReturnRequest] = useState()
    const [accomplishment, setAccomplishment] = useState()*/
    const [operatedBy, setOperatedBy] = useState()
    const [customer, setcustomer] = useState()
    const [totalAmount, setTotalAmount] = useState()
    const [customerNote, setCustomerNote] = useState()
    const [adminNote, setAdminNote] = useState()
    // payment
    const [payment, setPayment] = useState()
    const [collectOn, setcollectOn] = useState() //date
    const [isRefund, setIsRefund] = useState()
    const [paymentTitle, setPaymentTitle] = useState()
    const [paymentMethod, setPaymentMethod] = useState()
    const [paymentAddress, setPaymentAddress] = useState()
    const [paymentAssignedTo, setPaymentAssignedTo] = useState()
    const [paymentDoneBy, setPaymentDoneBy] = useState()
    const [paymentCharge, setPaymentCharge] = useState()
    const [paymentNote, setPaymentNote] = useState()
    // delivery
    const [delivery, setDelivery] = useState()
    const [deliverOn, setDeliverOn] = useState()
    const [deliveryTitle, setDeliveryTitle] = useState()
    const [deliveryMethod, setDeliveryMethod] = useState()
    const [deliveryDuration, setDeliveryDuration] = useState()
    const [deliveryAddress, setDeliveryAddress] = useState()
    const [deliveryAssignedTo, setDeliveryAssignedTo] = useState()
    const [deliveryDoneBy, setDeliveryDoneBy] = useState()
    const [deliveryCharge, setDeliveryCharge] = useState()
    const [deliveryNote, setDeliveryNote] = useState()
    // cart
    const [cart, setCart] = useState()
    const [items, setItems] = useState()
    /*const [nameEn, setNameEn] = useState()
    const [image, setImage] = useState()
    const [brand, setBrand] = useState()
    const [category, setCategory] = useState()
    const [unit, setUnit] = useState()
    const [discount, setDiscount] = useState()
    const [count, setCount] = useState()
    const [priceUsd, setPriceUsd] = useState()
    const [refundable, setRefundable] = useState()*/
    const [cartAssignedTo, setCartAssignedTo] = useState()
    const [cartDoneBy, setCartDoneBy] = useState()
    const [cartQty, setCartQty] = useState()
    const [cartAmount, setCartAmount] = useState()
    const [cartNote, setCartNote] = useState()

    //
    const [city, setCity] = useState()
    const [region, setRegion] = useState()
    const [building, setBuilding] = useState()
    const [addressVisible, setAddressVisible] = useState()
    //

    const { time } = useSelector(state => state.clock)
    const { success: successSave } = useSelector(state => state.orderSave)
    const { success: successDelete } = useSelector(state => state.orderDelete)
    const { orders } = useSelector(state => state.orderList)
    const { userInfo } = useSelector(state => state.userSignin)
    const { cartItems } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.userDetails)

    const dispatch = useDispatch()
    useEffect(() => {
        if (successSave || successDelete) {
            dispatch(saveOrder('clear'))
            setFormAlertVisible(false)
            modelVisible && setModelVisible(false)
            setActionNote(`Attendance ${formAction}d succefully`)
            setActionNoteVisible(true)
            setInterval(() => setActionNoteVisible(false), 5000)
            setFormAction('')
            dispatch(listOrders())
        }
        return () => {
            //
        }
    }, [])

    useEffect(() => {
        if (user) {
            setCustomerUserId(user._id)
            setCustomerPhone(user.phone)
            setCustomerEmail(user.email)
            setAddress(user.address)
            setCustomerName(user.name)
        }
        return () => {
            //
        }
    }, [user])

    const openOrderModel = (order) => {

        setModelVisible(true)
        setId(order._id ? order._id : undefined)
        setRequest(order.request ? order.request : [])

        if (order.request) {
            setIsPrepare(order.request.isPrepare ? order.request.isPrepare : undefined)
            setIsPlace(order.request.isPlace ? order.request.isPlace : undefined)
            setIsCancel(order.request.isCancel ? order.request.isCancel : undefined)
            setIsReturn(order.request.isReturn ? order.request.isReturn : undefined)
        }

        setPaymentStatus(order.paymentStatus ? order.paymentStatus : undefined)
        setDeliveryStatus(order.deliveryStatus ? order.deliveryStatus : undefined)
        setCartStatus(order.cartStatus ? order.cartStatus : undefined)

        /*setPlaced(order.status.place ? order.status.placed : false)
        setCompleted(order.status.completed ? order.status.completed : undefined)
        setConfirmed(order.status.confirmed ? order.status.confirmed : undefined)
        setRejected(order.status.rejected ? order.status.rejected : undefined)
        setCanceled(order.status.canceled ? order.status.canceled : undefined)*/

        //setOperatedBy(order.operatedBy ? order.operatedBy : undefined)
        setcustomer(order.customer ? order.customer : undefined)
        if (order.customer) {
            setCustomerUserId(order.customer.userId ? order.customer.userId : undefined)
            setCustomerName(order.customer.name ? order.customer.name : undefined)
            setCustomerPhone(order.customer.phone ? order.customer.phone : undefined)
            setCustomerEmail(order.customer.email ? order.customer.email : undefined)
            setDeliveryAddress(order.customer.deliveryAddress ? order.customer.deliveryAddress : undefined)
            setPaymentAddress(order.customer.paymentAddress ? order.customer.paymentAddress : undefined)
        } else {
            setCustomerUserId(undefined)
            setCustomerPhone(undefined)
            setCustomerEmail(undefined)
            setDeliveryAddress(undefined)
            setCustomerName(undefined)
        }
        /*
        setPayment(order.payment ? order.payment : undefined)
        setDelivery(order.delivery ? order.delivery : undefined)
        setCart(order.cart ? order.cart : undefined)

        if (order.payment) {
            setcollectOn(order.payment.collectOn ? order.payment.collectOn : undefined)
            setPaymentTitle(order.payment.title ? order.payment.title : undefined)
            setPaymentMethod(order.payment.method ? order.payment.method : undefined)
            setPaymentAssignedTo(order.payment.assignedTo ? order.payment.assignedTo : undefined)
            setPaymentDoneBy(order.payment.doneBy ? order.payment.doneBy : undefined)
            setPaymentCharge(order.payment.charge ? order.payment.charge : undefined)
        }

        if (order.delivery) {
            setDeliverOn(order.delivery.deliverOn ? order.delivery.deliverOn : undefined)
            setDeliveryTitle(order.delivery.title ? order.delivery.title : undefined)
            setDeliveryMethod(order.delivery.method ? order.delivery.method : undefined)
            setDeliveryDuration(order.delivery.duration ? order.delivery.duration : undefined)
            setDeliveryAssignedTo(order.delivery.assignedTo ? order.delivery.assignedTo : undefined)
            setDeliveryDoneBy(order.delivery.doneBy ? order.delivery.doneBy : undefined)
            setDeliveryCharge(order.delivery.charge ? order.delivery.charge : undefined)
        }

        if (order.cart) {
            setItems(order.cart.itmes ? order.cart.items : undefined)
            setCartAssignedTo(order.cart.assignedTo ? order.cart.assignedTo : undefined)
            setCartDoneBy(order.cart.doneBy ? order.cart.doneBy : undefined)
            setCartQty(order.cart.count ? order.cart.count : undefined)
            setCartAmount(order.cart.amount ? order.cart.amount : undefined)
        }*/

        setInvoiceAmount(order.invoiceAmount ? order.invoiceAmount : undefined)
        setCustomerNote(order.customerNote ? order.customerNote : undefined)
        setAdminNote(order.adminNote ? order.adminNote : undefined)
        setFormAlertVisible(false)
    }

    const submitHandler = (e) => {
        if (customer && request && cart && invoiceAmount) {
            if (_id) {
                dispatch(saveOrder({
                    closed: closed,
                    userId: customerUserId,
                    name: customerName,
                    phone: customerPhone,
                    email: customerEmail,
                    deliveryAddress: deliveryAddress,
                    paymentAddress: paymentAddress,// usually the same as delivery address
                    request: request,
                    invoiceAmount: invoiceAmount,
                    customerNote: customerNote,
                    adminNote: adminNote,
                    closed: closed,
                }))
            } else {
                dispatch(saveOrder({
                    creation_date: time,
                    created_by: userInfo ? userInfo.name : Date.now(),
                    userId: customerUserId,
                    name: customerName,
                    phone: customerPhone,
                    email: customerEmail,
                    deliveryAddress: deliveryAddress,
                    paymentAddress: paymentAddress,// usually the same as delivery address
                    request: [{
                        creation_date: time,
                        created_by: userInfo ? userInfo.name : Date.now(),
                        isPrepare: isPrepare,
                        isPlace: isPlace,
                        confirmation: {
                            placement: placement
                        },
                        operatedBy: {
                            date: userInfo.isAdmin ? time : undefined,
                            employeeName: userInfo.isAdmin ? userInfo.employeeName : undefined,
                            employeeId: userInfo.isAdmin ? userInfo.employeeId : undefined
                        },
                        payment: {
                            status: paymentStatus,
                            collectOn: collectOn, // usually the same as delivery date
                            title: paymentTitle,
                            method: paymentMethod,
                            charge: paymentCharge,
                        },
                        delivery: {
                            status: deliveryStatus,
                            deliverOn: deliverOn,
                            title: deliveryTitle,
                            method: deliveryMethod,
                            duration: deliveryDuration,
                            charge: deliveryCharge,
                        },
                        cart: {
                            status: cartStatus,
                            items: cartItems,
                            qty: cartQty,
                            amount: cartAmount,
                        },
                        totalAmount: totalAmount,
                    }],
                    invoiceAmount: invoiceAmount,
                    customerNote: customerNote,
                    adminNote: adminNote,
                    closed: closed,
                }))
            }
        }
        userModified() &&
            dispatch(saveUser({ _id: customerUserId, address: address, name: customerName }))
    }

    const userModified = () => {
        if (user.name != customerName) return true
        user.address.map(add => {
            var i = user.address.indexOf(add)
            if (add.city !== address[i].city || add.region !== address[i].region || add.building !== address[i].building)
                return true
        })
        if (address.length !== user.address.length) return true
    }

    const createHandler = (e) => {
        setModelVisible(true)
        openOrderModel({})
    }

    const deleteHandler = (e, _id) => {
        e.preventDefault()
        setFormAction('Delet')
        dispatch(deleteOrder(_id))
    }

    const searchUser = (e) => {
        e.preventDefault()
        dispatch(getUser(customerPhone))
    }


    const showAddressEditor = (add) => {
        if (add && addressVisible !== address.indexOf(add)) {
            setCity(add.city)
            setRegion(add.region)
            setBuilding(add.building)
            setAddressVisible(address.indexOf(add))
        } else if (!add && addressVisible !== 'newAddress') {
            setCity(undefined)
            setRegion(undefined)
            setBuilding(undefined)
            setAddressVisible('newAddress')
        } else {
            setCity(undefined)
            setRegion(undefined)
            setBuilding(undefined)
            setAddressVisible()
        }
    }

    return (
        <div>
            {actionNoteVisible && <div className="action-note">{actionNote}</div>}
            <div className="control-page-header">
                <h3 className="header-title">Order Manager</h3>
                <button type="button" className="header-button" onClick={() => createHandler()}>Create Order</button>
            </div>
            {
                modelVisible &&
                <form className="form-form" onSubmit={(e) => submitHandler(e)}>
                    <ul className="form-container-manager">
                        <FontAwesome name="fa-window-close" className="far fa-window-close fa-lg" onClick={() => setModelVisible(false)} />
                        <li>
                            <h2>{formAction == 'Copy' ? 'Create' : formAction} Order</h2>
                        </li>
                        <li>
                            <label className="label" htmlFor="phone">Phone#<p className="required">*</p></label>
                            <div className='order-phone-search'>
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    className='orders-user-phone'
                                    value={customerPhone}
                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                ></input>
                                <button
                                    className="button orders-search-btn"
                                    onClick={searchUser}
                                >Search</button>
                            </div>
                        </li>
                        <li>
                            <label className="label" htmlFor="name">Name<p className="required">*</p></label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                            ></input>
                        </li>
                        <li>
                            <label className="label" htmlFor="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                value={customerEmail}
                                onChange={(e) => setCustomerEmail(e.target.value)}
                            ></input>
                        </li>
                        <li>
                            <div className='flex-align'>
                                <FontAwesomeIcon
                                    onClick={() => showAddressEditor(undefined)}
                                    className='cursor-color-margin fa-lg'
                                    icon={faPlusCircle} />
                                <div>New Address</div>
                            </div>
                            {addressVisible === 'newAddress' &&
                                <div className='address-details'>
                                    <label className="label" htmlFor="city">City<p className="required">*</p></label>
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    ></input>
                                    <label className="label" htmlFor="region">Region<p className="required">*</p></label>
                                    <textarea
                                        type="text"
                                        name="region"
                                        id="region"
                                        value={region}
                                        onChange={(e) => setRegion(e.target.value)}
                                    ></textarea>
                                    <label className="label" htmlFor="building">Building<p className="required">*</p></label>
                                    <input
                                        type="text"
                                        name="building"
                                        id="building"
                                        value={building}
                                        onChange={(e) => setBuilding(e.target.value)}
                                    ></input>
                                    <button className='button width'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            city && region && building &&
                                                setAddress(
                                                    [...address, { city: city, region: region, building: building }]
                                                )
                                        }}>Add Address</button>
                                </div>}
                        </li>
                        {address.length > 0 &&
                            <li className='border-padding'>
                                {address.map((add) => (
                                    <div>
                                        <div className='flex-align'>
                                            <div className="label margin-right">
                                                Address {address.indexOf(add) + 1}</div>
                                            <FontAwesomeIcon icon={faTrashAlt}
                                                className='cursor-color-absolute right'
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    address.splice(address.indexOf(add), 1)
                                                }} />
                                            <FontAwesomeIcon icon={faEdit}
                                                className='cursor-color-absolute'
                                                onClick={() => showAddressEditor(add)} />
                                        </div>
                                        <div className='user-address'
                                            key={address.indexOf(add)}
                                            value={add}>
                                            {add.city + ', ' +
                                                add.region + ', ' +
                                                add.building}
                                        </div>
                                        {addressVisible === address.indexOf(add) &&
                                            <div className='address-details'>
                                                <label className="label" htmlFor="city">City<p className="required">*</p></label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    id="city"
                                                    value={city}
                                                    onChange={(e) => {
                                                        setCity(e.target.value)
                                                        var i = address.indexOf(add)
                                                        address[i] = {
                                                            ...address[i],
                                                            city: e.target.value
                                                        }
                                                        setAddress(address)
                                                        setDeliveryAddress(undefined)
                                                    }}
                                                ></input>
                                                <label className="label" htmlFor="region">Region<p className="required">*</p></label>
                                                <textarea
                                                    type="text"
                                                    name="region"
                                                    id="region"
                                                    value={region}
                                                    onChange={(e) => {
                                                        setRegion(e.target.value)
                                                        var i = address.indexOf(add)
                                                        address[i] = {
                                                            ...address[i],
                                                            region: e.target.value
                                                        }
                                                        setAddress(address)
                                                        setDeliveryAddress(undefined)
                                                    }}
                                                ></textarea>
                                                <label className="label" htmlFor="building">Building<p className="required">*</p></label>
                                                <input
                                                    type="text"
                                                    name="building"
                                                    id="building"
                                                    value={building}
                                                    onChange={(e) => {
                                                        setBuilding(e.target.value)
                                                        var i = address.indexOf(add)
                                                        address[i] = {
                                                            ...address[i],
                                                            building: e.target.value
                                                        }
                                                        setAddress(address)
                                                        setDeliveryAddress(undefined)
                                                    }}
                                                ></input>
                                            </div>}
                                    </div>
                                ))}
                            </li>}
                        <li>
                            <div className="label">Delivery Address</div>
                            <select
                                value={deliveryAddress}
                                onChange={(e) => {
                                    setDeliveryAddress(
                                        e.target.selectedIndex ?
                                            e.target.options[e.target.selectedIndex].value :
                                            e.target.value)
                                    setPaymentAddress(
                                        e.target.selectedIndex ?
                                            e.target.options[e.target.selectedIndex].value :
                                            e.target.value)
                                }}
                            >
                                <option key='' value=''>
                                    Select...
                                </option>
                                {address
                                    && address.map((add) => (
                                        <option key={address.indexOf(add)}
                                            value={add.city + ', ' + add.region + ', ' + add.building}>
                                            {'Address ' + (address.indexOf(add) + 1)}
                                        </option>
                                    ))}
                            </select>
                        </li>
                        <li>
                            <div className="label">Payment Address</div>
                            <select
                                value={paymentAddress}
                                onChange={(e) => {
                                    setPaymentAddress(
                                        e.target.selectedIndex ?
                                            e.target.options[e.target.selectedIndex].value :
                                            e.target.value)
                                }}
                            >
                                <option key='' value=''>
                                    Select...
                                </option>
                                {address
                                    && address.map((add) => (
                                        <option key={address.indexOf(add)}
                                            value={add.city + ', ' + add.region + ', ' + add.building}>
                                            {'Address ' + (address.indexOf(add) + 1)}
                                        </option>
                                    ))}
                            </select>
                        </li>
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
        </div>
    );
}

export default OrdersManager;
