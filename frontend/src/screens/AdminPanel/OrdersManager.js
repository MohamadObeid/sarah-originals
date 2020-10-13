import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { deleteOrder, listOrders, saveOrder } from '../../actions/orderActions'
import FontAwesome from "react-fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faEdit, faPaperPlane, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { getUser, saveUser } from "../../actions/userActions";
import { detailsProduct } from "../../actions/productActions";
import Swiper from 'react-id-swiper';
import { addToCart, removeFromCart, updateCart } from "../../actions/cartActions";
import {
    typeList, cartStatusList, paymentStatusList, deliveryStatusList,
    requestStatusList, requestTypeList, orderStatusList
} from '../../constants/lists'
import ReactTooltip from "react-tooltip";
import { creationDatePrettier, dayConverter } from "../../methods/methods";
import { Popconfirm } from 'antd'
import Axios from "axios";

function OrdersManager(props) {
    const imageUrl = window.location.origin + '/api/uploads/image/'

    const swiper = {
        shortSwipes: true,
        slidesOffsetAfter: -20,
        freeMode: true,
        freeModeMomentumRatio: 1,
        grabCursor: true,
        slidesPerView: 'auto',
        spaceBetween: 1,
    }

    var d = Date.now()
    /*
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
    const [requestFormVisible, setRequestFormVisible] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState(undefined)
    const [productsListVisible, setProductsListVisible] = useState(false)
    const [noteIndex, setNoteIndex] = useState()
    const [requestIndex, setRequestIndex] = useState()
    const [editNoteText, setEditNoteText] = useState()
    const [requestTypeDisabled, setRequestTypeDisabled] = useState(false)
    const [requestItems, setRequestItems] = useState()
    const [isDeliveryAddress, setIsDeliveryAddress] = useState()
    const [isPaymentAddress, setIsPaymentAddress] = useState()

    const [requestNum, setRequestNum] = useState()
    const [_id, setId] = useState()
    const [invoiceNum, setinvoiceNum] = useState()
    const [status, setStatus] = useState()
    const [closed, setClosed] = useState() //
    const [customerName, setCustomerName] = useState()
    const [customerUserId, setCustomerUserId] = useState()
    const [customerPhone, setCustomerPhone] = useState()
    //const [customerEmail, setCustomerEmail] = useState()
    const [orderStatus, setorderStatus] = useState()

    const [paymentStatus, setPaymentStatus] = useState()
    const [deliveryStatus, setDeliveryStatus] = useState()
    const [cartStatus, setCartStatus] = useState()
    const [amount, setamount] = useState()
    const [request, setRequest] = useState([])
    const [address, setAddress] = useState([])
    const [receiptNum, setReceiptNum] = useState()
    const [requestStatus, setRequestStatus] = useState()
    const [requestType, setRequestType] = useState()
    const [itemsQty, setItemsQty] = useState()

    const [operatedBy, setOperatedBy] = useState()
    const [customer, setcustomer] = useState()
    const [totalAmount, setTotalAmount] = useState()
    const [note, setNote] = useState()
    const [noteText, setNoteText] = useState()
    const [prepareOn, setPrepareOn] = useState()

    // payment
    const [payment, setPayment] = useState()
    const [paymentValues, setPaymentValues] = useState()
    const [collectOn, setcollectOn] = useState() //date
    const [isRefund, setIsRefund] = useState()
    const [paymentTitle, setPaymentTitle] = useState()
    const [paymentType, setPaymentType] = useState()
    const [paymentAddress, setPaymentAddress] = useState()
    const [paymentAssignedTo, setPaymentAssignedTo] = useState()
    const [paymentDoneBy, setPaymentDoneBy] = useState()
    const [paymentCharge, setPaymentCharge] = useState()
    const [paymentNote, setPaymentNote] = useState()
    const [paymentTypeList, setPaymentTypeList] = useState()
    const [paymentDescription, setPaymentDescription] = useState()

    // delivery
    const [delivery, setDelivery] = useState()
    const [deliveryValues, setDeliveryValues] = useState()
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
    const [discountAmount, setDiscountAmount] = useState()

    //
    const [city, setCity] = useState()
    const [region, setRegion] = useState()
    const [building, setBuilding] = useState()
    const [addressVisible, setAddressVisible] = useState()
    //

    const { time } = useSelector(state => state.clock)
    const { success: successSave, order } = useSelector(state => state.orderSave)
    const { success: successDelete } = useSelector(state => state.orderDelete)
    const { orders } = useSelector(state => state.orderList)
    const { userInfo } = useSelector(state => state.userSignin)
    const { cartItems } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.userDetails)
    const { product: products } = useSelector(state => state.productDetails)
    const { delivery: deliveryList } = useSelector(state => state.deliveryList)
    const { payment: paymentList } = useSelector(state => state.paymentList)

    const dispatch = useDispatch()
    useEffect(() => {
        typeList && setPaymentTypeList(typeList)
        if (successSave || successDelete) {
            userModified() &&
                dispatch(saveUser({
                    _id: customerUserId, address: address, name: customerName, orderList: order._id
                }))
            dispatch(saveOrder('clear'))
            setFormAlertVisible(false)
            modelVisible && setModelVisible(false)
            setActionNote(`Attendance ${formAction}d succefully`)
            setActionNoteVisible(true)
            setInterval(() => setActionNoteVisible(false), 5000)
            setFormAction('')
            dispatch(listOrders())
        }
    }, [successSave, successDelete])

    useEffect(() => {
        if (deliveryTitle) {
            deliveryList.map(del => {
                if (del.title === deliveryTitle) {
                    setDeliveryValues(del)
                    setDeliverOn(deliveryDurationInDate({
                        duration: del.duration,
                        timeFormat: del.timeFormat
                    }))
                    //console.log(del)
                }
            })
        }

        if (paymentTitle) {
            paymentList.map(pay => {
                if (pay.title === paymentTitle) {
                    setPaymentValues(pay)
                    setPaymentTypeList(pay.type)
                    if (!paymentType) {
                        setPaymentType(pay.type[0])
                        pay.type.map(type => {
                            type === 'Cash' && setPaymentType('Cash')
                        })
                    }
                    //console.log('reserting')
                }
            })
        }

        if (paymentType && paymentValues) {
            setPaymentDescription(paymentValues.description)
            if (paymentValues.rates.length > 0) {
                paymentValues.rates.map(rate => {
                    if (rate.paymentType === paymentType) {
                        setPaymentDescription(rate.description)
                        //console.log(rate.description)
                    }
                })
            }
        }

        if (deliverOn || prepareOn) {
            setcollectOn(deliverOn ? deliverOn : prepareOn && prepareOn)
        }

        if (user) {
            //console.log(user)
            setCustomerUserId(user._id)
            setCustomerPhone(user.phone)
            //setCustomerEmail(user.email)
            setAddress(user.address)
            setCustomerName(user.name)
        }

        if (cartItems && cartItems.length > 0) {
            setRequestItems(cartItems)
        }

    }, [deliveryTitle, paymentTitle, user, deliverOn, prepareOn, cartItems, paymentType])

    const openOrderModel = async (order) => {
        setModelVisible(true)
        setRequestFormVisible(false)
        setOrderValues(order._id ? order : undefined)
        setId(order._id ? order._id : undefined)
        setinvoiceNum(order.invoiceNum ? order.invoiceNum : 'INV-' + (Date.now() + 10800000))
        setRequest(order.request ? order.request : [])
        setCity(undefined)
        setRegion(undefined)
        setBuilding(undefined)
        setAddress([])
        setAddressVisible(false)
        setorderStatus(order.orderStatus ? order.orderStatus : 'Pending')
        await dispatch(getUser(order.phone ? order.phone : 'clear'))
        //setOperatedBy(order.operatedBy ? order.operatedBy : undefined)
        setCustomerUserId(order.userId ? order.userId : undefined)
        setCustomerName(order.name ? order.name : '')
        setCustomerPhone(order.phone ? order.phone : '')
        //setCustomerEmail(order.email ? order.email : undefined)
        setDeliveryAddress(order.deliveryAddress ? order.deliveryAddress : undefined)
        setPaymentAddress(order.paymentAddress ? order.paymentAddress : undefined)
        /*


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

        setamount(order.amount ? order.amount : undefined)
        setNote(order.note ? order.note : [])
        order.note ? setNoteIndex(order.note.length) : setNoteIndex(0)
        setFormAlertVisible(false)
        setNoteText(undefined)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (customerName && customerPhone && request.length > 0) {
            if (_id) {
                dispatch(saveOrder({
                    _id: _id,
                    userId: customerUserId,
                    name: customerName,
                    phone: customerPhone,
                    //email: customerEmail,
                    deliveryAddress: deliveryAddress,
                    paymentAddress: paymentAddress,// usually the same as delivery address
                    request: request,
                    amount: amountCalc(),
                    invoiceNum: invoiceNum,
                    note: note,
                    status: orderStatus
                }))
            } else {
                dispatch(saveOrder({
                    creation_date: Date.now() + 10800000,
                    created_by: userInfo.name,
                    userId: customerUserId,
                    name: customerName,
                    phone: customerPhone,
                    //email: customerEmail,
                    deliveryAddress: deliveryAddress,
                    paymentAddress: paymentAddress,// usually the same as delivery address
                    request: request,
                    amount: amountCalc(),
                    invoiceNum: 'INV-' + d,
                    note: note,
                    status: orderStatus
                }))
            }
            setModelVisible(false)
        }
    }

    const userModified = () => {
        if (user.phone !== customerPhone) return false
        if (user.name !== customerName) return true
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

    const editHandler = (order) => {
        setFormAction('Edit')
        openOrderModel(order)
    }

    const showHistoryHandler = (order) => {

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

    const toggleRequestType = (e) => {
        const status = e.target.selectedIndex ?
            e.target.options[e.target.selectedIndex].value :
            e.target.value
        setDelivery(undefined)
        setDeliverOn(undefined)
        setRequestNum(undefined)
        setRequestType(status)
        setPaymentTypeList(typeList)

        clearRequestValues()

        if (status === 'Place') {
            deliveryList.map(del => {
                if (del.title === deliveryTitle) {
                    setDeliveryValues(del)
                    setDeliverOn(deliveryDurationInDate({
                        duration: del.duration,
                        timeFormat: del.timeFormat
                    }))
                }
            })
        } else if (status === 'Prepare') {
            setPrepareOn(deliveryDurationInDate())
        } else if (status === 'Cancel') {
            setPrepareOn(undefined)
        }
    }

    const showRequestForm = (req) => {
        var d = Date.now() + 10800000
        cartItems.length > 0 && dispatch(updateCart('clear'))
        setRequestTypeDisabled(false)
        setReceiptNum('RE-' + d)
        if (!requestFormVisible) {
            //console.log('open Model')
            setRequestFormVisible(true)
            if (req) {
                //console.log(req)
                setRequestTypeDisabled(true)
                openRequestModal(req)
                setRequestIndex(request.indexOf(req))
            } else {
                setRequestType('Place')
                setRequestNum(undefined)
                request.length > 0 ? setRequestIndex(request.length) : setRequestIndex(0)
                if (deliveryList.length > 0) {
                    setDeliveryTitle(deliveryList[0].title) //cosidered deliveryList[0] is default delivery
                    setDeliverOn(deliveryDurationInDate({
                        duration: deliveryList[0].duration,
                        timeFormat: deliveryList[0].timeFormat
                    }))
                }
                if (paymentList.length > 0) {
                    setPaymentTitle(paymentList[0].title)
                }
                clearRequestValues()
            }
        } else {
            //console.log('close Model')
            if (requestNum) {
                openRequestModal(req)
                if (Object.keys(req).length === 0) clearRequestValues()
            } else {
                setRequestFormVisible(false)
                setRequestType(undefined)
                setItemsQty(undefined)
                setRequestNum(undefined)
            }
        }
    }

    const clearRequestValues = () => {
        //setReceiptNum(undefined)
        setDeliveryCharge(undefined)
        setPaymentCharge(undefined)
        setRequestStatus('Pending')
        setPaymentStatus('Pending')
        setDeliveryStatus('Pending')
        setCartStatus('Pending')
    }

    useEffect(() => {
        if (requestNum && !requestTypeDisabled) {
            console.log('showing again')
            showRequestForm(request[requestNum - 1])
        }
    }, [requestNum, requestTypeDisabled])

    const openRequestModal = async (req) => {
        !requestType && setRequestType(req.type ? req.type : 'Place')
        setRequestStatus(req.status ? req.status : 'Pending')
        setReceiptNum(req.receiptNum ? req.receiptNum : receiptNum)
        setRequestNum(req.canceledRequestNum ? req.canceledRequestNum : undefined)
        setPayment(req.payment ? req.payment : undefined)
        if (req.payment) {
            setPaymentStatus(req.payment.status ? req.payment.status : 'Pending')
            setcollectOn(req.payment.collectOn ? req.payment.collectOn : undefined)
            setPaymentTitle(req.payment.title ? req.payment.title : undefined)
            setPaymentDescription(req.payment.description ? req.payment.description : '')
            setPaymentType(req.payment.type ? req.payment.type : 'Place')
            setPaymentCharge(req.payment.charge ? req.payment.charge : undefined)
        }
        setDelivery(req.delivery ? req.delivery : undefined)
        if (req.delivery) {
            setDeliveryStatus(req.delivery.status ? req.delivery.status : 'Pending')
            setDeliverOn(req.delivery.deliverOn ? req.delivery.deliverOn : undefined)
            setDeliveryTitle(req.delivery.title ? req.delivery.title : undefined)
            setDeliveryCharge(req.delivery.charge ? req.delivery.charge : undefined)
        }
        setPrepareOn(req.cart.prepareOn ? req.cart.prepareOn : undefined)
        setCartStatus(req.cart.status ? req.cart.status : 'Pending')

        if (req.cart.items.length > 0) {
            var productIdList = await cartItems.map(item => { return item._id })
            const { data } = await Axios.post("/api/products/getproducts", productIdList)
            await data.map(product => {
                var theItem = req.cart.items.find(item => item._id === product._id)
                theItem.countInStock = product.countInStock
                if (theItem.qty > product.countInStock) theItem.qty = product.countInStock
            })
            await dispatch(addToCart(req.cart.items));

            if (req.type === 'Cancel' || req.type === 'Return') {
                var items = request[req.canceledRequestNum - 1].cart.items
                setItemsQty(items.map(item => {
                    return { _id: item._id, qty: item.qty }
                }))
            }

        } else dispatch(updateCart('clear'))
    }

    const searchItem = async (e) => {
        e.preventDefault()
        searchKeyword &&
            await dispatch(detailsProduct({ searchKeyword: searchKeyword }))
        setProductsListVisible(true)
    }

    const inCartHandler = () => {
        products.map(product => {
            cartItems.map(item => {
                if (item._id === product._id) {
                    toggleCartBtns(product)
                    product.qty = item.qty
                    return
                }
            })
        })
    }

    const toggleCartBtns = (product) => {
        if (product.qty === 0) {
            product.AddToCartClass = 'show';
            product.PlusMinusClass = 'hide';
        } else if (product.qty > 0) {
            product.AddToCartClass = 'hide';
            product.PlusMinusClass = 'show';
        }
    }

    const handleAddToCart = (e, product) => {
        e.preventDefault()
        toggleCartBtns(product);
        const inCart = cartItems.find(item => item._id === product._id)
        if (inCart)
            dispatch(updateCart({
                _id: product._id, nameEn: product.nameEn, image: product.image, qty: 1,
                priceUsd: product.priceUsd, unit: product.unit, countInStock: product.countInStock,
                discount: product.discount
            }))
        else {
            dispatch(addToCart({
                _id: product._id, nameEn: product.nameEn, image: product.image, qty: 1,
                priceUsd: product.priceUsd, unit: product.unit, countInStock: product.countInStock,
                discount: product.discount
            }))
        }
        setActionNote('Product added Successfully')
        setActionNoteVisible(true)
        setInterval(() => setActionNoteVisible(false), 3000)
    }

    const handleMinus = (e, product) => {
        e.preventDefault()
        var qty = product.qty - 1
        //console.log(product.qty)
        toggleCartBtns(product);
        if (product.qty === 0) {
            dispatch(removeFromCart(product._id))
            setActionNote('Product removed Successfully')
            setActionNoteVisible(true);
            setInterval(() => setActionNoteVisible(false), 3000);
        }
        else dispatch(updateCart({
            _id: product._id, nameEn: product.nameEn, image: product.image, qty: qty,
            priceUsd: product.priceUsd, unit: product.unit, countInStock: product.countInStock,
            discount: product.discount
        }))
    }

    const handlePlus = (e, product) => {
        e.preventDefault()
        const item = itemsQty ? itemsQty.find(item => {
            if (item._id === product._id) return item.qty
        }) : false
        //console.log(item)
        if (product.countInStock > product.qty) {
            if (requestType === 'Place' || requestType === 'Prepare' || (item && product.qty < item.qty)) {
                var qty = parseInt(product.qty) + 1
                //console.log(product.qty)
                dispatch(updateCart({
                    _id: product._id, nameEn: product.nameEn, image: product.image, qty: qty,
                    priceUsd: product.priceUsd, unit: product.unit, countInStock: product.countInStock,
                    discount: product.discount
                }))
            }
            else {
                setActionNote('The Quantity Ordered is Less Than the Requested Cancellation')
                setActionNoteVisible(true);
                setInterval(() => setActionNoteVisible(false), 3000)
                return
            }
        } else {
            setActionNote('Quantity Available in Stock is ' + product.qty)
            setActionNoteVisible(true);
            setInterval(() => setActionNoteVisible(false), 3000);
        }
    }

    const handleRemove = (e, item) => {
        e.preventDefault()
        dispatch(removeFromCart(item._id))
        setActionNote(`Product Removed Succefully`);
        setActionNoteVisible(true);
        setInterval(() => setActionNoteVisible(false), 3000);
    }

    window.addEventListener('click', (e) => {
        const overlay = document.querySelector('.full-background')
        if (e.target === overlay)
            setProductsListVisible(false)
    })

    const qtyCalc = () => {
        var totalqty = 0
        cartItems.map(item => {
            totalqty = totalqty + item.qty
        })
        return totalqty
    }

    const discountCalc = () => {
        var discountAmount = 0
        cartItems.map(item => {
            if (item.discount > 0) { discountAmount = discountAmount + item.priceUsd * item.discount * 0.01 * item.qty }
        })
        if (requestType && requestType !== 'Cancel' && requestType !== 'Return')
            discountAmount = discountAmount * (-1)
        return discountAmount.toFixed(2)
    }

    const cartAmountCalc = () => {
        var cartAmount = 0
        cartItems.map(item => {
            cartAmount = cartAmount + item.priceUsd * item.qty
        })
        //cartAmount = cartAmount - discountCalc()
        if (requestType === 'Cancel' || requestType === 'Return')
            cartAmount = cartAmount * (-1)
        return cartAmount.toFixed(2)
    }

    const deliveryCalc = () => {
        var rateMin = 100000000 /* = default delivery rate */
        var currentRate
        const cartAmountPlus = cartAmountCalc() < 0 ? (-1) * cartAmountCalc() : cartAmountCalc()

        // All Items in Cart are canceled
        if (requestType === 'Prepare') return 0
        else if (requestType === 'Cancel' && cartStatus !== 'Packed') return 0
        else if (requestType === 'Cancel' && cartStatus === 'Packed' && requestNum && itemsQty) { // all order is returned
            if (request[requestNum - 1].delivery && request[requestNum - 1].delivery.charge) {
                var noItemRemoved = true
                cartItems.map(item => {
                    var item0 = itemsQty.find(item0 => item0._id === item._id)
                    if (item.qty !== item0.qty) {
                        noItemRemoved = false
                        return
                    }
                })
                if (noItemRemoved === true) {
                    var delCharge = parseFloat(request[requestNum - 1].delivery.charge)
                    return delCharge * (-1)
                } else return 0
            } else return 0

            // Flat Rate
        } else if (deliveryValues && deliveryValues.rateType === 'Flat') {
            if (deliveryValues.unit === '%') {
                currentRate = delivery.flatRate * cartAmountPlus * 0.01
                if (currentRate < rateMin) rateMin = currentRate
            } else rateMin = parseFloat(deliveryValues.flatRate).toFixed(2)

            // Custom Rate
        } else if (deliveryValues && deliveryValues.rateType === 'Custom') {
            if (deliveryValues.rates) {
                deliveryValues.rates.map(rate => {

                    if (rate.basedOn === 'Value') {
                        if (cartAmountPlus >= rate.min && cartAmountPlus <= rate.max) {
                            if (rate.unit === '%')
                                currentRate = rate.rate * cartAmountPlus * 0.01
                            else currentRate = rate.rate
                            if (currentRate < rateMin) rateMin = currentRate
                        }

                    } else if (rate.basedOn === 'Quantity') {
                        if (qtyCalc() >= rate.min && qtyCalc() <= rate.max) {
                            if (rate.unit === '%') currentRate = rate.rate * qtyCalc() * 0.01
                            else currentRate = rate.rate
                            if (currentRate < rateMin) rateMin = currentRate
                        }

                    } /*else if (rate.basedOn === 'Weight') {
                        if (cartAmountPlus >= rate.min && cartAmountPlus <= rate.max) {
                            currentRate = rate.rate * cartAmountPlus * 0.01
                            if (currentRate < rateMin) rateMin = currentRate
                        }
                    }*/
                })
            } else rateMin = 0
        }
        return parseFloat(rateMin).toFixed(2)
    }

    const paymentCalc = () => {
        var rateMin = 1000000000 /* = default payment rate */
        var currentRate
        const cartAmountPlus = cartAmountCalc() < 0 ? (-1) * cartAmountCalc() : cartAmountCalc()
        // Flat Rate
        if (paymentValues && paymentValues.rateType === 'Flat') {
            if (paymentValues.unit === '%')
                rateMin = paymentValues.flatRate * 0.01 * cartAmountPlus
            else rateMin = paymentValues.flatRate

            // Custom Rate
        } else if (paymentValues && paymentValues.rateType === 'Custom') {
            if (paymentValues.rates) {
                paymentValues.rates.map(rate => {

                    if (rate.basedOn === 'Value') {
                        if (cartAmountPlus >= rate.min && cartAmountPlus <= rate.max && paymentType === rate.paymentType) {
                            if (rate.unit === '%')
                                currentRate = cartAmountPlus * rate.rate * 0.01
                            else currentRate = rate.rate
                            //console.log(rate.rate, currentRate)
                            if (currentRate < rateMin) rateMin = currentRate
                        }

                    } else if (rate.basedOn === 'Quantity') {
                        if (qtyCalc() >= rate.min && qtyCalc() <= rate.max && paymentType == rate.paymentType) {
                            if (rate.unit === '%')
                                currentRate = qtyCalc() * rate.rate * 0.0
                            else currentRate = rate.rate
                            if (currentRate < rateMin) rateMin = currentRate
                        }
                    }
                })
            }
        } else rateMin = 0
        //console.log(rateMin)
        return rateMin.toFixed(2)
    }

    const totalAmountCalc = (req) => {
        /*if (req) {
            var delCharge = req.delivery.charge ? req.delivery.charge : 0
            var payCharge = req.payment.charge ? req.payment.charge : 0
            var cartAm = req.cart.
        }*/
        var deliveryCharg = deliveryCharge ? deliveryCharge : deliveryCalc()
        deliveryCharg = parseFloat(deliveryCharg)
        if (request.type === 'Cancel') deliveryCharg = 0
        var paymentCharg = paymentCharge ? paymentCharge : paymentCalc()
        paymentCharg = parseFloat(paymentCharg)
        //console.log(paymentCalc())
        var totalAmount = deliveryCharg + paymentCharg + parseFloat(cartAmountCalc()) + parseFloat(discountCalc())
        //console.log(totalAmount)
        return totalAmount.toFixed(2)
    }

    const amountCalc = () => {
        var amount = 0
        request.map(req => {
            amount = amount + parseFloat(req.totalAmount)
        })
        return amount.toFixed(2)
    }

    ////////////////////////////////////////////////////////

    const deliveryDurationInDate = (delivery) => {
        var d = new Date()
        var currentYear = d.getFullYear()
        var currentMonth = d.getMonth() + 1 < 10 ? '0' + d.getMonth() + 1 : d.getMonth() + 1
        var currentDay = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
        var currentHour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
        var currentMinutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()

        if (delivery) {
            var n = d
            n.setDate(d.getDate() + 1)
            var tomorrowYear = n.getFullYear()
            var tomorrowMonth = n.getMonth() + 1 < 10 ? '0' + n.getMonth() + 1 : n.getMonth() + 1
            var tomorrowDay = n.getDate() < 10 ? '0' + n.getDate() : n.getDate()

            var duration = delivery.duration
            var timeFormat = delivery.timeFormat

            if (timeFormat === 'min') {
                //console.log(typeof currentMinutes, typeof duration)
                currentMinutes = parseInt(currentMinutes) + duration
                if (currentMinutes >= 60) {
                    while (currentMinutes >= 60) {
                        currentMinutes = currentMinutes - 60
                    }
                    currentHour++
                    if (currentHour >= 24) {
                        currentHour = '00'
                        currentDay = tomorrowDay
                        currentMonth = tomorrowMonth
                        currentYear = tomorrowYear
                    }
                }
            } else if (timeFormat === 'hr') {
                currentHour = parseInt(currentHour) + duration
                if (currentHour >= 24) {
                    while (currentHour >= 24) {
                        currentHour = currentHour - 24
                    }
                    currentDay = tomorrowDay
                    currentMonth = tomorrowMonth
                    currentYear = tomorrowYear
                }
            } else if (timeFormat === 'day') {
                currentDay = tomorrowDay
                currentMonth = tomorrowMonth
                currentYear = tomorrowYear
            }
        }
        if (typeof currentMinutes === 'number' && currentMinutes < 10) currentMinutes = '0' + currentMinutes
        if (typeof currentHour === 'number' && currentHour < 10) currentHour = '0' + currentHour
        //console.log(currentYear + '-' + currentMonth + '-' + currentDay + 'T' + currentHour + ':' + currentMinutes)
        return currentYear + '-' + currentMonth + '-' + currentDay + 'T' + currentHour + ':' + currentMinutes
    }

    const addRequestHandler = (e) => {
        e.preventDefault()
        if (qtyCalc() > 0) {
            //console.log(requestIndex)
            request[requestIndex] = {
                creation_date: time,
                created_by: userInfo ? userInfo.name : Date.now() + 10800000,
                type: requestType,
                status: requestStatus,
                canceledRequestNum: requestNum ? requestNum : undefined,

                operatedBy: userInfo.isOrderManager !== undefined && {
                    date: time,
                    employeeName: userInfo.name,
                    employeeId: userInfo.employeeId
                },
                payment: {
                    status: paymentStatus,
                    collectOn: collectOn, // usually the same as delivery date
                    title: paymentTitle,
                    description: paymentDescription,
                    type: paymentType,
                    charge: paymentCalc(),
                },
                delivery: (requestType === 'Place' || requestType === 'Return') &&
                {
                    status: deliveryStatus,
                    deliverOn: deliverOn,
                    title: deliveryTitle,
                    //type: deliveryType,
                    duration: deliveryValues.duration + ' ' + deliveryValues.timeFormat,
                    charge: deliveryCalc(),
                },
                cart: {
                    status: cartStatus,
                    prepareOn: prepareOn ? prepareOn : time,
                    items: requestItems,
                    qty: qtyCalc(),
                    amount: cartAmountCalc(),
                    discountAmount: discountCalc(),
                },
                totalAmount: totalAmountCalc(),
                receiptNum: receiptNum,
            }
            //console.log(request)
            dispatch(updateCart('clear'))
            setRequestIndex(requestIndex + 1)
            setRequest(request)
            setRequestFormVisible(false)
            setRequestType(undefined)
            setSearchKeyword('')
        }
    }

    const saveNoteHandler = (e) => {
        e.preventDefault()
        if (noteText) {
            editNoteText && setEditNoteText(false)
            if (!editNoteText) {
                note[noteIndex] = {
                    name: userInfo.name,
                    text: noteText,
                    date: time,
                    showTo: 'Order Manager',
                }
            } else if (editNoteText) {
                note[noteIndex] = {
                    name: userInfo.name,
                    text: noteText,
                    date: time,
                    showTo: 'Order Manager',
                    edited: true
                }
            }
            setNote(note)
            setNoteText('')
            setNoteIndex(note.length)
        }
    }

    const requestStatusEditor = (e) => {
        const status = e.target.selectedIndex ?
            e.target.options[e.target.selectedIndex].value :
            e.target.value
        //console.log(status)
        //dispatch()
    }

    return (
        <div>
            {actionNoteVisible && <div className="action-note">
                <div>{actionNote}</div>
            </div>}
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
                        {/*<li>
                            <label className="label" htmlFor="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                value={customerEmail}
                                onChange={(e) => setCustomerEmail(e.target.value)}
                            ></input>
                        </li>*/}
                        {orderValues &&
                            <li>
                                <label className="label" htmlFor="city">Delivery Address<p className="required">*</p></label>
                                <div className='user-address' >
                                    {deliveryAddress}
                                </div>
                            </li>}
                        {address.length > 0 && !orderValues &&
                            <li className='border-padding padding-bottom'>
                                {address.map((add) => (
                                    <div key={address.indexOf(add)}>
                                        <div className='flex-align'>
                                            <div className="label margin-right">
                                                Address #{address.indexOf(add) + 1}</div>
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
                                        <div className={isPaymentAddress === address.indexOf(add) ? 'pay-add' : ''}
                                            onClick={e => {
                                                if (!deliveryAddress) {
                                                    setDeliveryAddress(add.city + ', ' + add.region + ', ' + add.building)
                                                    setIsDeliveryAddress(address.indexOf(add))
                                                } else if (deliveryAddress && !paymentAddress) {
                                                    setPaymentAddress(add.city + ', ' + add.region + ', ' + add.building)
                                                    setIsPaymentAddress(address.indexOf(add))
                                                } else if (deliveryAddress && paymentAddress) {
                                                    setDeliveryAddress(undefined)
                                                    setPaymentAddress(undefined)
                                                    setIsDeliveryAddress(false)
                                                    setIsPaymentAddress(false)
                                                }
                                            }}>
                                            <div className={'user-address ' + (isDeliveryAddress === address.indexOf(add)
                                                ? 'del-add' : '')}>
                                                {add.city + ', ' + add.region + ', ' + add.building}
                                            </div>
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
                                <div className='fonts-del-pay'>
                                    <div className='del-add-font'>
                                        <div className='green-line'></div>
                                        <div>Delivery Address</div>
                                    </div>
                                    <div className='pay-add-font'>
                                        <div className='red-line'></div>
                                        <div>Payment Address</div>
                                    </div>
                                </div>
                            </li>}
                        <li>
                            <div className='flex-align'>
                                <FontAwesomeIcon
                                    onClick={() => showAddressEditor(undefined)}
                                    className='cursor-color-margin fa-lg'
                                    icon={faPlus} />
                                <div>Add Address</div>
                            </div>
                            {addressVisible === 'newAddress' &&
                                <div className='address-details border-padding'>
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
                                            setAddressVisible(false)
                                        }}>Add Address
                                    </button>
                                    <button type="button" className="button secondary width"
                                        style={{ marginTop: '1rem' }}
                                        onClick={() => setAddressVisible(false)}>
                                        Back
                                    </button>
                                </div>}
                        </li>
                        {/*<li>
                            <div className="label">Delivery Address<p className="required">*</p></div>
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
                            <div className="label">Payment Address<p className="required">*</p></div>
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
                        </li>*/}
                        {request.length > 0 &&
                            <li className='border-padding'>
                                {request.map(req => (
                                    <div style={{ margin: '0.5rem 0' }}>
                                        <div className='flex-align'>
                                            <div className="label margin-right">
                                                {'Request Summary #' + (request.indexOf(req) + 1)}</div>
                                            <FontAwesomeIcon icon={faTrashAlt}
                                                className='cursor-color-absolute right'
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    request.splice(request.indexOf(req), 1)
                                                    setRequestIndex(request.length)
                                                }} />
                                            <FontAwesomeIcon icon={faEdit}
                                                className='cursor-color-absolute'
                                                onClick={() => showRequestForm(req)} />
                                        </div>
                                        <div className='cart-receipt-orders margin-top-0'>
                                            <div className='cart-total-qty receipt-title'>
                                                <div className="label">Request Type</div>
                                                <div className='total-num'
                                                    style={{ fontSize: '1.2rem' }}>{req.type + ' Order'}</div>
                                            </div>
                                            <div className='cart-total-qty'>
                                                <div className='cart-total-label'>Request Status</div>
                                                <div className='total-num'
                                                    style={{ fontSize: '1.1rem' }}>{req.status}</div>
                                            </div>
                                            <div className='cart-total-qty'>
                                                <div className='cart-total-label'>Cart Status</div>
                                                <div className='total-num'
                                                    style={{ fontSize: '1.1rem' }}>{req.cart.status}</div>
                                            </div>
                                            {req.delivery && req.delivery.status &&
                                                <div className='cart-total-qty'>
                                                    <div className='cart-total-label'>Delivery Status</div>
                                                    <div className='total-num'
                                                        style={{ fontSize: '1.1rem' }}>{req.delivery.status}</div>
                                                </div>}
                                            {req.payment.status &&
                                                <div className='cart-total-qty border-bottom'>
                                                    <div className='cart-total-label'>Payment Status</div>
                                                    <div className='total-num'
                                                        style={{ fontSize: '1.1rem' }}>{req.payment.status}</div>
                                                </div>}
                                            <div className='cart-total-qty receipt-title'>
                                                <div className="label">Receipt#</div>
                                                <div className='total-num'
                                                    style={{ fontSize: '1.2rem' }}>{req.receiptNum}</div>
                                            </div>
                                            <div className='cart-total-qty'>
                                                <div className='cart-total-label'>Items</div>
                                                <div className='total-num'>{req.cart.qty +
                                                    (req.cart.qty === 1 ? ' item' : ' items')}</div>
                                            </div>
                                            <div className='cart-total-qty'>
                                                <div className='cart-total-label'>Cart Amount</div>
                                                <div className='total-num'>{req.cart.amount + ' $'}</div>
                                            </div>
                                            {req.cart.discountAmount !== 0 &&
                                                <div className='cart-total-qty'>
                                                    <div className='cart-total-label'>
                                                        {'Discount ' + (req.cart.discountAmount <= 0 ? 'Earned' : 'Lost')}
                                                    </div>
                                                    <div className='total-num'>{req.cart.discountAmount + ' $'}</div>
                                                </div>}
                                            {req.delivery &&
                                                <div className='cart-total-qty'>
                                                    <div className='cart-total-label'>Delivery Charge
                                                        <div className='pay-desc'>
                                                            {req.delivery.title
                                                                ? req.delivery.title + ' (' + req.delivery.duration + ')'
                                                                : ''}</div>
                                                    </div>
                                                    <div className='total-num'>{req.delivery.charge > 0
                                                        ? req.delivery.charge + ' $' : 'Free'}</div>
                                                </div>}
                                            {req.payment && req.payment.charge > 0 &&
                                                <div className='cart-total-qty'>
                                                    <div className='cart-total-label'>Payment Charge
                                                        <div className='pay-desc'>{req.payment.description}</div>
                                                    </div>
                                                    <div className='total-num'>
                                                        {req.payment.charge + ' $'}
                                                    </div>
                                                </div>}
                                            <div className='cart-total-qty border-top'>
                                                <div className='cart-total-label'
                                                    style={{ fontSize: '1.3rem' }}>Total Amount</div>
                                                <div className='total-num'>{req.totalAmount + ' $'}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </li>}
                        <li>
                            <div className='flex-align'>
                                <FontAwesomeIcon
                                    onClick={() => showRequestForm()}
                                    className='cursor-color-margin fa-lg'
                                    icon={faPlus} />
                                <div>Add Request</div>
                            </div>
                            {requestFormVisible &&
                                <div className='address-details border-padding padding-1rem'>
                                    {/*{(!isBtn || isBtn === 'isPrepare') &&
                                        <div className='li-users'>
                                            <input
                                                className='switch'
                                                type="checkbox"
                                                name="isPrepare"
                                                id="isPrepare s2"
                                                value={isPrepare}
                                                checked={isPrepare}
                                                onChange={(e) => toggleIsBtns(e.target.checked, 'isPrepare')}
                                            ></input>
                                            <label className="label switch-label" htmlFor="isPrepare">Prepare my Order</label>
                                        </div>}
                                    {(!isBtn || isBtn === 'isPlace') &&
                                        <div className='li-users'>
                                            <input
                                                className='switch'
                                                type="checkbox"
                                                name="isPlace"
                                                id="isPlace s2"
                                                value={isPlace}
                                                checked={isPlace}
                                                onChange={(e) => toggleIsBtns(e.target.checked, 'isPlace')}
                                            ></input>
                                            <label className="label switch-label" htmlFor="isPlace">Place Order</label>
                                        </div>}
                                    {(!isBtn || isBtn === 'isCancel') &&
                                        <div className='li-users'>
                                            <input
                                                className='switch'
                                                type="checkbox"
                                                name="isCancel"
                                                id="isCancel s2"
                                                value={isCancel}
                                                checked={isCancel}
                                                onChange={(e) => toggleIsBtns(e.target.checked, 'isCancel')}
                                            ></input>
                                            <label className="label switch-label" htmlFor="isCancel">Cancel my Order</label>
                                        </div>}
                                    {(!isBtn || isBtn === 'isReturn') &&
                                        <div className='li-users'>
                                            <input
                                                className='switch'
                                                type="checkbox"
                                                name="isReturn"
                                                id="isReturn s2"
                                                value={isReturn}
                                                checked={isReturn}
                                                onChange={(e) => toggleIsBtns(e.target.checked, 'isReturn')}
                                            ></input>
                                            <label className="label switch-label" htmlFor="isReturn">Return my Order</label>
                                        </div>}
                                        */}
                                    <div className='status-container border-padding'>
                                        <div className='status-flex'>
                                            <label className='label line-des'>Request Type<p className="required">*</p></label>
                                            <div className='select-confirmation'>
                                                <select
                                                    value={requestType}
                                                    onChange={toggleRequestType}
                                                    disabled={requestTypeDisabled}>
                                                    {requestTypeList
                                                        && requestTypeList.map(status => (
                                                            (status === 'Cancel' || status === 'Return') ? request.length > 0 &&
                                                                <option key={requestTypeList.indexOf(status)} value={status}>
                                                                    {status}
                                                                </option> :
                                                                <option key={requestTypeList.indexOf(status)} value={status}>
                                                                    {status}
                                                                </option>
                                                        ))}
                                                </select>
                                            </div>
                                        </div>
                                        {request && (requestType === 'Cancel' || requestType === 'Return') &&
                                            <div className='status-flex'>
                                                <label className='label line-des'>Request#<p className="required">*</p></label>
                                                <div className='select-confirmation'>
                                                    <select
                                                        value={requestNum}
                                                        onChange={(e) => setRequestNum(e.target.value)}
                                                        disabled={requestTypeDisabled}>
                                                        <option key='' value=''>
                                                            Select...
                                                        </option>
                                                        {request
                                                            && request.map((req) => (
                                                                <option key={request.indexOf(req)} value={request.indexOf(req) + 1}>
                                                                    {'Request #' + (request.indexOf(req) + 1)}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>
                                            </div>}
                                        <div className='status-flex'>
                                            <label className='label line-des'>Request Status</label>
                                            <div className='select-confirmation'>
                                                <select
                                                    value={requestStatus}
                                                    onChange={(e) => {
                                                        setRequestStatus(
                                                            e.target.selectedIndex ?
                                                                e.target.options[e.target.selectedIndex].value :
                                                                e.target.value)
                                                    }}>
                                                    {requestStatusList
                                                        && requestStatusList.map((status) => (
                                                            <option key={requestStatusList.indexOf(status)} value={status}>
                                                                {status}
                                                            </option>
                                                        ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className='status-flex'>
                                            <label className='label line-des'>Cart Status</label>
                                            <div className='select-confirmation'>
                                                <select
                                                    value={cartStatus}
                                                    onChange={(e) => {
                                                        setCartStatus(
                                                            e.target.selectedIndex ?
                                                                e.target.options[e.target.selectedIndex].value :
                                                                e.target.value)
                                                    }}>
                                                    {cartStatusList
                                                        && cartStatusList.map((status) => (
                                                            <option key={cartStatusList.indexOf(status)} value={status}>
                                                                {status}
                                                            </option>
                                                        ))}
                                                </select>
                                            </div>
                                        </div>
                                        {(requestType === 'Place' || requestType === 'Return') &&
                                            <div className='status-flex'>
                                                <label className='label line-des'>Delivery Status</label>
                                                <div className='select-confirmation'>
                                                    <select
                                                        value={deliveryStatus}
                                                        onChange={(e) => {
                                                            setDeliveryStatus(
                                                                e.target.selectedIndex ?
                                                                    e.target.options[e.target.selectedIndex].value :
                                                                    e.target.value)
                                                        }}
                                                    >
                                                        {deliveryStatusList
                                                            && deliveryStatusList.map((status) => (
                                                                <option key={deliveryStatusList.indexOf(status)} value={status}>
                                                                    {status}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>
                                            </div>}
                                        <div className='status-flex'>
                                            <label className='label line-des'>Payment Status</label>
                                            <div className='select-confirmation'>
                                                <select
                                                    value={paymentStatus}
                                                    onChange={(e) => {
                                                        setPaymentStatus(
                                                            e.target.selectedIndex ?
                                                                e.target.options[e.target.selectedIndex].value :
                                                                e.target.value)
                                                    }}
                                                >
                                                    {paymentStatusList
                                                        && paymentStatusList.map((status) => (
                                                            <option key={paymentStatusList.indexOf(status)} value={status}>
                                                                {status}
                                                            </option>
                                                        ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <label className="label" htmlFor="searchKeyword">
                                        {(requestType === 'Cancel' ? 'Canceled ' : '') + 'Cart Items'}
                                        <p className="required">*</p>
                                    </label>
                                    {requestType !== 'Cancel' &&
                                        <div className='order-searchKeyword'>
                                            <input
                                                type="text"
                                                name="searchKeyword"
                                                id="searchKeyword"
                                                className='orders-user-phone'
                                                value={searchKeyword}
                                                onChange={(e) => setSearchKeyword(e.target.value)}
                                            ></input>
                                            <button
                                                className="button orders-search-btn"
                                                onClick={searchItem}
                                            >Search</button>
                                        </div>}
                                    {cartItems &&
                                        cartItems.map((item) => (
                                            item && item.qty > 0 &&
                                            <div key={'item' + cartItems.indexOf(item)}
                                                className={'border-padding back-white' +
                                                    ((request && (requestType === 'Cancel' || requestType === 'Return'))
                                                        ? ' cancelled-items'
                                                        : '')}>
                                                {item.discount > 0 &&
                                                    <div className='product-discount order-discount'>
                                                        <div>{item.discount}</div>
                                                        <div>%</div>
                                                    </div>}
                                                <div className="cart-list-items cart-list-order">
                                                    <div className="cart-image cart-img-order">
                                                        <img src={imageUrl + item.image} alt={item.nameEn} />
                                                    </div>
                                                    <div className="cart-name cart-name-order">
                                                        <div className="item-name item-name-order">{item.nameEn}</div>
                                                        <div className="cart-price-cart cart-price-order">
                                                            ${item.discount > 0 ?
                                                                (<div style={{ display: 'flex' }}>
                                                                    <div className='original-price-order'>{item.priceUsd}</div>
                                                                    {(item.priceUsd - item.priceUsd * item.discount * 0.01).toFixed(2)}
                                                                </div>)
                                                                : item.priceUsd}
                                                            <p className="cart-price-unit">/{item.unit}</p>
                                                        </div>
                                                        <FontAwesome name='faTrash' className="fas fa-trash fa-trash-order fa-lg"
                                                            onClick={(e) => handleRemove(e, item)}
                                                        />
                                                    </div>
                                                    <div className='cart-btns cart-btns-order'>
                                                        <button
                                                            type="button"
                                                            className="plus plus-cart plus-cart-order"
                                                            value={item._id}
                                                            onClick={(e) => handlePlus(e, item)}>
                                                            <FontAwesome name='fa-plus' className="fas fa-plus" />
                                                        </button>
                                                        <p className="add-to-cart-qty float-bottom count count-order">{item.qty}</p>
                                                        <button
                                                            type="button"
                                                            className="minus minus-cart minus-cart-order"
                                                            value={item._id}
                                                            onClick={(e) => handleMinus(e, item)}>
                                                            <FontAwesome name='fa-minus' className="fas fa-minus" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    {cartItems &&
                                        <div style={{ margin: '2rem 0' }}>
                                            {deliveryList && requestType !== 'Prepare' && requestType !== 'Cancel' &&
                                                <div>
                                                    <div className="label">Delivery Title<p className="required">*</p></div>
                                                    <select
                                                        value={deliveryTitle}
                                                        style={{ width: '100%' }}
                                                        onChange={(e) => {
                                                            setDeliveryTitle(
                                                                e.target.selectedIndex ?
                                                                    e.target.options[e.target.selectedIndex].value :
                                                                    e.target.value)
                                                            setDeliveryCharge(undefined)
                                                        }}
                                                    >
                                                        {deliveryList
                                                            && deliveryList.map(del => (
                                                                <option key={deliveryList.indexOf(del)} value={del.title}>
                                                                    {del.title + ' (' + del.duration + del.timeFormat + ')'}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>}
                                            {(requestType === 'Place' || requestType === 'Prepare') &&
                                                <div style={{ margin: '2rem 0 0 0' }}>
                                                    <div className="label">
                                                        {requestType === 'Place'
                                                            ? 'Delivery Date'
                                                            : requestType === 'Prepare' && 'Preparation Date'}
                                                        <p className="required">*</p></div>
                                                    <div>
                                                        <input
                                                            type="datetime-local"
                                                            name="datePicker"
                                                            id="datePicker"
                                                            className='orders-user-phone'
                                                            style={{ marginBottom: '0' }}
                                                            value={
                                                                requestType === 'Place'
                                                                    ? deliverOn
                                                                    : requestType === 'Prepare'
                                                                    && prepareOn
                                                            }
                                                            onChange={(e) => {
                                                                requestType === 'Place'
                                                                    ? setDeliverOn(e.target.value)
                                                                    : requestType === 'Prepare'
                                                                    && setPrepareOn(e.target.value)
                                                            }}
                                                            min={deliveryDurationInDate()}
                                                        ></input>
                                                    </div>
                                                </div>}
                                            {paymentList &&
                                                <div style={{ margin: '2rem 0' }}>
                                                    <div className="label">Payment Title<p className="required">*</p></div>
                                                    <select
                                                        value={paymentTitle}
                                                        style={{ width: '100%' }}
                                                        onChange={(e) => {
                                                            setPaymentTitle(
                                                                e.target.selectedIndex ?
                                                                    e.target.options[e.target.selectedIndex].value :
                                                                    e.target.value)
                                                            setPaymentCharge(undefined)
                                                        }}
                                                    >
                                                        {paymentList
                                                            && paymentList.map(pay => (
                                                                <option key={paymentList.indexOf(pay)} value={pay.title}>
                                                                    {pay.title}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>}
                                            {paymentType &&
                                                <div style={{ margin: '2rem 0' }}>
                                                    <div className="label">Payment Type<p className="required">*</p></div>
                                                    <select
                                                        value={paymentType}
                                                        style={{ width: '100%' }}
                                                        onChange={(e) => {
                                                            setPaymentType(
                                                                e.target.selectedIndex ?
                                                                    e.target.options[e.target.selectedIndex].value :
                                                                    e.target.value)
                                                        }}
                                                    >
                                                        {paymentTypeList
                                                            && paymentTypeList.map(type => (
                                                                <option key={paymentTypeList.indexOf(type)} value={type}>
                                                                    {type}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>}
                                            {cartItems.length > 0 &&
                                                <div className='cart-receipt-orders'>
                                                    <div className='cart-total-qty receipt-title'>
                                                        <div className="label">Receipt#</div>
                                                        <div className='total-num'
                                                            style={{ fontSize: '1.2rem' }}>
                                                            {receiptNum ? receiptNum : 'RE-' + (d + 10800000)}
                                                        </div>
                                                    </div>
                                                    <div className='cart-total-qty'>
                                                        <div className='cart-total-label'>Items</div>
                                                        <div className='total-num'>{qtyCalc() +
                                                            (qtyCalc() === 1 ? ' item' : ' items')}</div>
                                                    </div>
                                                    <div className='cart-total-qty'>
                                                        <div className='cart-total-label'>Cart Amount</div>
                                                        <div className='total-num'>{cartAmountCalc() + ' $'}</div>
                                                    </div>
                                                    <div className='cart-total-qty'>
                                                        <div className='cart-total-label'>
                                                            {(requestType === 'Cancel' || requestType === 'Return')
                                                                ? 'Discount Lost' : 'Discount Earned'}
                                                        </div>
                                                        <div className='total-num'>{discountCalc() + ' $'}</div>
                                                    </div>
                                                    {deliveryValues && (deliveryCharge ? parseFloat(deliveryCharge) !== 0 : parseFloat(deliveryCalc()) !== 0) &&
                                                        <div className='cart-total-qty'>
                                                            <div className='cart-total-label'>
                                                                Delivery charge
                                                                <div className='pay-desc'>{
                                                                    deliveryTitle ? deliveryTitle + ' (' + deliveryValues.duration + deliveryValues.timeFormat + ')'
                                                                        : ''}</div>
                                                            </div>
                                                            <div className='total-num'>{
                                                                deliveryCharge ? deliveryCharge + ' $' : (deliveryCalc() !== 0
                                                                    ? deliveryCalc() + ' $' : 'Free')}</div>
                                                        </div>}
                                                    {paymentValues && paymentCharge ? parseFloat(paymentCharge) !== 0 : parseFloat(paymentCalc()) !== 0 &&
                                                        <div className='cart-total-qty'>
                                                            <div className='cart-total-label'>Payment Charge
                                                                <div className='pay-desc'>{paymentDescription ? paymentDescription : ''}</div>
                                                            </div>
                                                            <div className='total-num'>
                                                                {paymentCharge ? paymentCharge + ' $' : paymentCalc() + ' $'}
                                                            </div>
                                                        </div>}
                                                    <div className='cart-total-qty border-top'>
                                                        <div className='cart-total-label'>Total Amount</div>
                                                        <div className='total-num'>{totalAmountCalc() + ' $'}</div>
                                                    </div>
                                                    <button className='button width'
                                                        onClick={(e) => { addRequestHandler(e) }}>Save Request
                                                        </button>
                                                </div>}
                                            <button type="button" className="button secondary width"
                                                style={{ marginTop: '1rem' }}
                                                onClick={() => {
                                                    setRequestFormVisible(false);
                                                    setRequestType(undefined)
                                                }}>
                                                Back
                                            </button>
                                        </div>}
                                </div>}
                        </li>
                        <li>
                            {note && note.length > 0 &&
                                <div className='border'>
                                    {note.map(not => (
                                        <div className='admin-note-line'>
                                            <div className='flex-align'>
                                                <div className="label margin-right font-size-12rem">
                                                    {not.name}</div>
                                                <FontAwesomeIcon icon={faTrashAlt}
                                                    className='cursor-color-absolute right'
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        note.splice(note.indexOf(not), 1)
                                                        setNoteIndex(note.length)
                                                        setNoteText('')
                                                        editNoteText && setEditNoteText(false)
                                                    }} />
                                                <FontAwesomeIcon icon={faEdit}
                                                    className='cursor-color-absolute'
                                                    onClick={() => {
                                                        if (userInfo.isOrderManager || userInfo.name === not.name) {
                                                            setNoteText(not.text)
                                                            setNoteIndex(note.indexOf(not))
                                                            setEditNoteText(true)
                                                        }
                                                    }} />
                                            </div>
                                            <div className='admin-note-text'>
                                                {not.text}
                                            </div>
                                            <div className='note-date'>
                                                {not.date}
                                                {not.edited && ', Edited'}
                                            </div>
                                        </div>))}
                                </div>}
                            <label className="label" htmlFor="note">Note</label>
                            <div style={{ position: 'relative' }}>
                                <textarea placeholder='Type a note...'
                                    className='note-textarea'
                                    type="text"
                                    name="note"
                                    id="note"
                                    value={noteText}
                                    onChange={(e) => setNoteText(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && saveNoteHandler(e)}
                                ></textarea>
                                <FontAwesomeIcon
                                    onClick={(e) => saveNoteHandler(e)}
                                    className='note-paperplane' icon={faPaperPlane} />
                            </div>
                        </li>
                        {orderValues && <li>
                            <div className='cart-receipt-orders'>
                                <div className='cart-total-qty receipt-title margin-bottom'>
                                    <div className="label">Invoice#</div>
                                    <div className='total-num'
                                        style={{ fontSize: '1.2rem' }}>{invoiceNum}
                                    </div>
                                </div>
                                {request && request.map(req => (
                                    <div className='cart-total-qty'>
                                        <div className='cart-total-label '>
                                            {'Request #' + (request.indexOf(req) + 1) + '  -  ' + req.status}
                                        </div>
                                        <div className='total-num'>{req.totalAmount + ' $'}</div>
                                    </div>
                                ))}
                                <div className='cart-total-qty border-top'>
                                    <div className='cart-total-label '>Invoice Amount</div>
                                    <div className='total-num'>{amountCalc() + ' $'}</div>
                                </div>
                            </div>
                        </li>}
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
            {
                productsListVisible &&
                <div className='full-background'>
                    <div className='custom-background'>
                        <Swiper {...swiper}>
                            {products && products.map((product) => (
                                <div className="product" key={product._id}>
                                    {inCartHandler()}
                                    {product.countInStock === 0 && <div className="product-out-of-stock"></div>}
                                    {product.discount > 0 &&
                                        <div className='product-discount discount-order'>
                                            <div>{product.discount}</div>
                                            <div>%</div>
                                        </div>
                                    }
                                    <div className="product-image img-orders-swiper">
                                        <img src={imageUrl + product.image} alt="product" />
                                    </div>
                                    <div className='product-details-container'>
                                        <div className="product-name name-order">
                                            <div>{product.nameEn}</div>
                                        </div>
                                        <div className="product-brand brand-order">{product.brand}</div>
                                        <div className="product-price price-order">
                                            <div className={product.discount > 0 ? 'before-discount before-discount-order' : 'nothing'}>
                                                ${product.priceUsd}</div>
                                            {product.discount > 0 &&
                                                <div className='after-discount'>${Math.round(100 * (product.priceUsd - product.priceUsd * product.discount / 100)) / 100}</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="product-add-to-cart">
                                        <button
                                            type="button"
                                            className={`add-to-cart-btn ${product.AddToCartClass} add-to-cart-orders`}
                                            value={product._id}
                                            onClick={(e) => handleAddToCart(e, product)}>
                                            Add To Cart
                                        </button>
                                        <div className={`add-to-cart-btns hide ${product.PlusMinusClass} btns-orders`}>
                                            <button
                                                type="button"
                                                className="minus minus-orders"
                                                value={product._id}
                                                onClick={(e) => handleMinus(e, product)}>
                                                <FontAwesome name='fa-minus' className="fas fa-minus" />
                                            </button>
                                            <p className="add-to-cart-qty qty-cart count qty-cart-orders">{product.qty}</p>
                                            <button
                                                type="button"
                                                className="plus plus-orders"
                                                value={product._id}
                                                onClick={(e) => handlePlus(e, product)}>
                                                <FontAwesome name='fa-plus' className="fas fa-plus" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Swiper>
                    </div>
                </div>
            }
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ textAlign: 'center', width: '4rem' }}>Active</th>
                        <th style={{ width: '10rem' }}>Time</th>
                        <th style={{ width: '15rem' }}>Name</th>
                        <th className='width-8rem'>Type</th>
                        <th className='align-width'>Status</th>
                        <th className='align-width'>Cart</th>
                        <th className='align-width'>Payment</th>
                        <th className='align-width'>Delivery</th>
                        <th className='align-width width-7rem align-right'>Amount</th>
                        <th style={{ width: '20rem' }}>Actions</th>{/*Edit, Delete, History, Status*/}
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.map(order => (
                        <tr key={order._id}>
                            <td style={{ textAlign: 'center' }}
                                data-tip data-for={order._id + 'status'}>
                                <FontAwesomeIcon
                                    className={`${order.status === 'Open' ? 'faCircle' : 'farCircle'}`}
                                    icon={faCircle} />
                                <ReactTooltip id={order._id + 'status'} place="right" effect="float">
                                    {order.status}
                                </ReactTooltip>
                            </td>
                            <td data-tip data-for={order._id + 'date'}>
                                {dayConverter(order.creation_date, order.status === 'Open' ? true : false)}
                                <ReactTooltip id={order._id + 'date'} place="top" effect="float">
                                    {creationDatePrettier(order.creation_date)}
                                </ReactTooltip>
                            </td>
                            <td data-tip data-for={order._id + 'name'}>{order.name}
                                <ReactTooltip id={order._id + 'name'} place="top" effect="float" className='width-30rem'>
                                    {'Phone# ' + order.phone}<br />
                                    {'Address: ' + order.deliveryAddress}
                                </ReactTooltip>
                            </td>
                            <td className='status-border text-align-start'>
                                {order.request.map(req => (
                                    <div key={req._id}>{'#' + (order.request.indexOf(req) + 1) + ' ' + req.type}</div>
                                ))}</td>
                            <td className='status-border'>{order.request.map(req => (
                                <select
                                    value={req.status}
                                    onChange={requestStatusEditor}
                                    key={req._id}>
                                    {requestStatusList.map(status => (
                                        <option key={requestStatusList.indexOf(status)} value={status}>
                                            {status}
                                        </option>))}
                                </select>
                            ))}</td>
                            <td className='status-border'>{order.request.map(req => (
                                <div key={req._id}>{req.cart ? req.cart.status : '-'}</div>
                            ))}</td>
                            <td className='status-border'>{order.request.map(req => (
                                req.payment && <div key={req._id}>{req.payment.status}</div>
                            ))}</td>
                            <td className='status-border'>{order.request.map(req => (
                                <div key={req._id}>{req.delivery ? req.delivery.status : '-'}</div>
                            ))}</td>
                            <td style={{ textAlign: 'end', paddingRight: '0.4rem' }}>{order.amount.toFixed(2) + ' $'}</td>
                            <td>
                                <button className="table-btns" onClick={() => editHandler(order)}>Edit</button>
                                <Popconfirm
                                    placement="topRight"
                                    title="Are you sure?"
                                    onConfirm={(e) => deleteHandler(e, order._id)}
                                    okText="Delete"
                                    cancelText="Cancel"
                                >
                                    <button className="table-btns">Delete</button>
                                </Popconfirm>
                                <button className="table-btns" onClick={(e) => showHistoryHandler(order)}>History</button>
                            </td>
                        </tr>
                    )).reverse()}
                </tbody>
            </table>
        </div >
    );
}

export default OrdersManager;
