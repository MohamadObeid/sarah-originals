import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { months, weekDays } from '../../constants/lists'
import { listOrders, saveOrder } from '../../actions/orderActions'

function OrdersManager(props) {
    const imageUrl = window.location.origin + '/api/uploads/image/'
    var d = new Date()
    var currentYear = d.getFullYear()
    var currentMonth = months[d.getMonth()]
    var currentDay = d.getDate()
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
    const [orderValues, setOrderValues] = useState()

    const [_id, setId] = useState()
    const [status, setStatus] = useState()
    const [placed, setPlaced] = useState()
    const [confirmed, setConfirmed] = useState()
    const [canceled, setCanceled] = useState()
    const [rejected, setRejected] = useState()
    const [completed, setCompleted] = useState()
    const [cancelRequest, setCancelRequest] = useState()
    const [returnRequest, setReturnRequest] = useState()
    const [accomplishment, setAccomplishment] = useState()
    const [operatedBy, setOperatedBy] = useState()
    const [customerDetails, setCustomerDetails] = useState()
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
    const [isReturn, setIsReturn] = useState()
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

    const { time } = useSelector(state => state.clock)
    const { success: successSave } = useSelector(state => state.orderSave)
    const { success: successDelete } = useSelector(state => state.orderDelete)
    const { orders } = useSelector(state => state.orderList)
    const { userInfo } = useSelector(state => state.userSignin)
    const { cartItems } = useSelector(state => state.cart)

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

    const openOrderModel = (order) => {

        setModelVisible(true)
        setId(order._id ? order._id : undefined)
        setStatus(order.status ? order.status : undefined)
        setPlaced(order.status.place ? order.status.placed : false)
        setCompleted(order.status.completed ? order.status.completed : undefined)
        setConfirmed(order.status.confirmed ? order.status.confirmed : undefined)
        setRejected(order.status.rejected ? order.status.rejected : undefined)
        setCanceled(order.status.canceled ? order.status.canceled : undefined)
        setCancelRequest(order.status.cancelRequest ? order.status.cancelRequest : undefined)
        setReturnRequest(order.status.returnRequest ? order.status.returnRequest : undefined)
        setAccomplishment(order.status.accomplishment ? order.status.accomplishment : undefined)
        setOperatedBy(order.operatedBy ? order.operatedBy : undefined)
        setCustomerDetails(order.customerDetails ? order.customerDetails : undefined)
        setPayment(order.payment ? order.payment : undefined)
        setDelivery(order.delivery ? order.delivery : undefined)
        setCart(order.cart ? order.cart : undefined)

        if (order.payment) {
            setcollectOn(order.payment.collectOn ? order.payment.collectOn : undefined)
            setIsRefund(order.payment.isRefund ? order.payment.isRefund : undefined)
            setPaymentTitle(order.payment.title ? order.payment.title : undefined)
            setPaymentMethod(order.payment.method ? order.payment.method : undefined)
            setPaymentAddress(order.payment.address ? order.payment.address : undefined)
            setPaymentAssignedTo(order.payment.assignedTo ? order.payment.assignedTo : undefined)
            setPaymentDoneBy(order.payment.doneBy ? order.payment.doneBy : undefined)
            setPaymentCharge(order.payment.charge ? order.payment.charge : undefined)
            setPaymentNote(order.payment.note ? order.payment.note : undefined)
        }

        if (order.delivery) {
            setDeliverOn(order.delivery.deliverOn ? order.delivery.deliverOn : undefined)
            setIsReturn(order.delivery.isReturn ? order.delivery.isReturn : undefined)
            setDeliveryTitle(order.delivery.title ? order.delivery.title : undefined)
            setDeliveryMethod(order.delivery.method ? order.delivery.method : undefined)
            setDeliveryDuration(order.delivery.duration ? order.delivery.duration : undefined)
            setDeliveryAddress(order.delivery.address ? order.delivery.address : undefined)
            setDeliveryAssignedTo(order.delivery.assignedTo ? order.delivery.assignedTo : undefined)
            setDeliveryDoneBy(order.delivery.doneBy ? order.delivery.doneBy : undefined)
            setDeliveryCharge(order.delivery.charge ? order.delivery.charge : undefined)
            setDeliveryNote(order.delivery.note ? order.delivery.note : undefined)
        }

        if (order.cart) {
            setItems(order.cart.itmes ? order.cart.items : undefined)
            setCartAssignedTo(order.cart.assignedTo ? order.cart.assignedTo : undefined)
            setCartDoneBy(order.cart.doneBy ? order.cart.doneBy : undefined)
            setCartQty(order.cart.count ? order.cart.count : undefined)
            setCartAmount(order.cart.amount ? order.cart.amount : undefined)
            setCartNote(order.cart.note ? order.cart.note : undefined)
        }

        setTotalAmount(order.totalAmount ? order.totalAmount : undefined)
        setCustomerNote(order.customerNote ? order.customerNote : undefined)
        setAdminNote(order.adminNote ? order.adminNote : undefined)
        setFormAlertVisible(false)
    }

    const submitHandler = (e) => {
        if (customerDetails && payment && delivery && cart && totalAmount) {
            if (_id) {
                dispatch(saveOrder({
                    status: status,
                    operatedBy: operatedBy,
                    customerDetails: customerDetails,
                    payment: [{
                        collectOn: collectOn, // usually the same as delivery date
                        isRefund: isRefund,
                        title: paymentTitle,
                        method: paymentMethod,
                        address: paymentAddress, // usually the same as delivery address
                        assignedTo: paymentAssignedTo,
                        doneBy: paymentDoneBy,
                        charge: paymentCharge,
                        note: paymentNote,
                    }],
                    delivery: [{
                        deliverOn: deliverOn,
                        isReturn: isReturn,
                        title: deliveryTitle,
                        method: deliveryMethod,
                        address: deliveryAddress,
                        duration: deliveryDuration,
                        assignedTo: deliveryAssignedTo,
                        doneBy: deliveryDoneBy,
                        charge: deliveryCharge,
                        note: deliveryNote,
                    }],
                    cart: [{
                        isReturn: isReturn,
                        items: cartItems,
                        assignedTo: cartAssignedTo,
                        doneBy: cartDoneBy,
                        qty: cartQty,
                        amount: cartAmount,
                        note: cartNote
                    }],
                    totalAmount: totalAmount,
                    customerNote: customerNote,
                    adminNote: adminNote
                }))
            } else {
                dispatch(saveOrder({
                    creation_date: time,
                    created_by: userInfo.name,
                    customerDetails: customerDetails,
                    payment: [{
                        collectOn: collectOn, // usually the same as delivery date
                        isRefund: false,
                        title: paymentTitle,
                        method: paymentMethod,
                        address: paymentAddress, // usually the same as delivery address
                        charge: paymentCharge,
                        note: paymentNote,
                    }],
                    delivery: [{
                        deliverOn: deliverOn,
                        isReturn: false,
                        title: deliveryTitle,
                        method: deliveryMethod,
                        address: deliveryAddress,
                        duration: deliveryDuration,
                        charge: deliveryCharge,
                        note: deliveryNote,
                    }],
                    cart: [{
                        isReturn: false,
                        items: cartItems,
                        qty: cartQty,
                        amount: cartAmount,
                        note: cartNote
                    }],
                    totalAmount: totalAmount,
                    customerNote: customerNote,
                    adminNote: adminNote
                }))
            }
        }
    }

    return (
        <div>
        </div>
    );
}

export default OrdersManager;
