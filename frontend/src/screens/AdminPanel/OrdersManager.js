import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { months, weekDays } from '../../constants/lists'
import { deleteOrder, listOrders, saveOrder } from '../../actions/orderActions'
import FontAwesome from "react-fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { getUser, saveUser } from "../../actions/userActions";
import { detailsProduct } from "../../actions/productActions";
import Swiper from 'react-id-swiper';
import { addToCart, removeFromCart, updateCart } from "../../actions/cartActions";
import { typeList, cartStatusList, paymentStatusList, deliveryStatusList } from '../../constants/lists'

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
    const [isBtn, setIsBtn] = useState(undefined)
    const [productsListVisible, setProductsListVisible] = useState(false)
    const [noteIndex, setNoteIndex] = useState()
    const [requestIndex, setRequestIndex] = useState()
    const [editNoteText, setEditNoteText] = useState()
    const [requestValues, setRequestValues] = useState()

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
    const [request, setRequest] = useState([]) //
    const [address, setAddress] = useState([])
    const [receiptNum, setReceiptNum] = useState()

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
    const [note, setNote] = useState()
    const [noteText, setNoteText] = useState()
    const [prepareOn, setPrepareOn] = useState()
    // payment
    const [payment, setPayment] = useState()
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
    const [discountAmount, setDiscountAmount] = useState()

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
    const { product: products } = useSelector(state => state.productDetails)
    const { delivery: deliveryList } = useSelector(state => state.deliveryList)
    const { payment: paymentList } = useSelector(state => state.paymentList)

    const dispatch = useDispatch()
    useEffect(() => {
        typeList && setPaymentTypeList(typeList)
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
        if (deliveryTitle) {
            deliveryList.map(del => {
                if (del.title === deliveryTitle) {
                    setDelivery(del)
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
                    setPayment(pay)
                    setPaymentTypeList(pay.type)
                    setPaymentType(pay.type[0])
                    pay.type.map(type => {
                        type === 'Cash' && setPaymentType('Cash')
                    })
                    //console.log(pay)
                }
            })
        }

        if (deliverOn || prepareOn) {
            setcollectOn(deliverOn ? deliverOn : prepareOn && prepareOn)
        }

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
    }, [deliveryTitle, paymentTitle, user, deliverOn, prepareOn])

    const openOrderModel = (order) => {

        setModelVisible(true)
        setRequestFormVisible(false)
        setId(order._id ? order._id : undefined)
        setRequest(order.request ? order.request : [])
        setCity(undefined)
        setRegion(undefined)
        setBuilding(undefined)
        setAddress([])
        setAddressVisible(false)
        if (order.request) {
            setIsPrepare(order.request.isPrepare ? order.request.isPrepare : undefined)
            setPrepareOn(order.request.prepareOn ? order.request.prepareOn : undefined)
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
        setNote(order.note ? order.note : [])
        order.note ? setNoteIndex(order.note.length) : setNoteIndex(0)
        setFormAlertVisible(false)
        setNoteText(undefined)
    }

    const submitHandler = (e) => {
        if (customer && request && cart && invoiceAmount) {
            if (_id) {
                dispatch(saveOrder({
                    _id: _id,
                    closed: closed,
                    userId: customerUserId,
                    name: customerName,
                    phone: customerPhone,
                    email: customerEmail,
                    deliveryAddress: deliveryAddress,
                    paymentAddress: paymentAddress,// usually the same as delivery address
                    request: request,
                    invoiceAmount: invoiceAmountCalc(),
                    note: note.length > 0 && note,
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
                    request: request,
                    invoiceAmount: invoiceAmountCalc(),
                    note: note.length > 0 && note,
                    //closed: closed,
                }))
            }
        }
        /*userModified() &&
            dispatch(saveUser({ _id: customerUserId, address: address, name: customerName }))*/
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

    const toggleIsBtns = (checked, isBtn) => {
        if (isBtn === 'isPlace' && checked) {
            setIsPlace(true)
            setIsBtn('isPlace')
            deliveryList.map(del => {
                if (del.title === deliveryTitle) {
                    setDelivery(del)
                    setDeliverOn(deliveryDurationInDate({
                        duration: del.duration,
                        timeFormat: del.timeFormat
                    }))
                }
            })
        } else setIsPlace(false)

        if (isBtn === 'isPrepare' && checked) {
            setIsPrepare(true)
            setIsBtn('isPrepare')
            setDelivery(undefined)
            setDeliverOn(undefined)
            setPrepareOn(deliveryDurationInDate())
            setPaymentTypeList(typeList)
        } else setIsPrepare(false)

        if (isBtn === 'isCancel' && checked) {
            setIsCancel(true)
            setIsBtn('isCancel')
        } else setIsCancel(false)

        if (isBtn === 'isReturn' && checked) {
            setIsReturn(true)
            setIsBtn('isReturn')
        } else setIsReturn(false)

        !checked && setIsBtn(undefined)
    }

    const showRequestForm = (req) => {
        cartItems.length > 0 && dispatch(updateCart('clear'))
        if (!requestFormVisible) {
            //console.log('open Model')
            setRequestFormVisible(true)
            if (req) {
                //console.log(req)
                setRequestIndex(request.indexOf(req))
                openRequestModal(req)
            } else {
                setIsPlace(true)
                setIsPrepare(undefined)
                setIsReturn(undefined)
                setIsCancel(undefined)
                setIsBtn('isPlace')
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
                setReceiptNum(undefined)
                setDeliveryCharge(undefined)
                setPaymentCharge(undefined)
            }
        } else {
            //console.log('close Model')
            setRequestFormVisible(false)
            //console.log(requestValues)
            //request[requestIndex].cart.items = items
            //setRequest(request)
        }
    }

    const openRequestModal = (req) => {
        setIsPrepare(req.isPrepare ? req.isPrepare : undefined)
        setPrepareOn(req.prepareOn ? req.prepareOn : undefined)
        setIsPlace(req.isPlace ? req.isPlace : undefined)
        setIsCancel(req.isCancel ? req.isCancel : undefined)
        setIsReturn(req.isReturn ? req.isReturn : undefined)
        setPayment(req.payment ? req.payment : undefined)
        if (req.payment) {
            setcollectOn(req.payment.collectOn ? req.payment.collectOn : undefined)
            setPaymentTitle(req.payment.title ? req.payment.title : undefined)
            setPaymentType(req.payment.type ? req.payment.type : undefined)
            setPaymentCharge(req.payment.charge ? req.payment.charge : undefined)
        }
        setDelivery(req.delivery ? req.delivery : undefined)
        if (req.delivery) {
            setDeliverOn(req.delivery.deliverOn ? req.delivery.deliverOn : undefined)
            setDeliveryTitle(req.delivery.title ? req.delivery.title : undefined)
            setDeliveryCharge(req.delivery.charge ? req.delivery.charge : undefined)
        }
        setReceiptNum(req.receiptNum ? req.receiptNum : undefined)
        req.cart.items.length > 0 && dispatch(addToCart(req.cart.items))
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

    const handleAddToCart = (product) => {
        product.qty = 1;
        toggleCartBtns(product);
        const inCart = cartItems.find(item => item._id === product._id)
        if (inCart)
            dispatch(updateCart({
                _id: product._id, nameEn: product.nameEn, image: product.image, qty: product.qty,
                priceUsd: product.priceUsd, unit: product.unit, countInStock: product.countInStock,
                discount: product.discount
            }))
        else {
            dispatch(addToCart({
                _id: product._id, nameEn: product.nameEn, image: product.image, qty: product.qty,
                priceUsd: product.priceUsd, unit: product.unit, countInStock: product.countInStock,
                discount: product.discount
            }))
        }
        setActionNote('Product added Successfully')
        setActionNoteVisible(true)
        setInterval(() => setActionNoteVisible(false), 3000)
    }

    const handleMinus = (product) => {
        product.qty--
        //console.log(product.qty)
        toggleCartBtns(product);
        if (product.qty === 0) {
            dispatch(removeFromCart(product._id))
            setActionNote('Product removed Successfully')
            setActionNoteVisible(true);
            setInterval(() => setActionNoteVisible(false), 3000);
        }
        else dispatch(updateCart({
            _id: product._id, nameEn: product.nameEn, image: product.image, qty: product.qty,
            priceUsd: product.priceUsd, unit: product.unit, countInStock: product.countInStock,
            discount: product.discount
        }));
    }

    const handlePlus = (product) => {
        if (product.countInStock > product.qty) {
            product.qty++
            //console.log(product.qty)
            dispatch(updateCart({
                _id: product._id, nameEn: product.nameEn, image: product.image, qty: product.qty,
                priceUsd: product.priceUsd, unit: product.unit, countInStock: product.countInStock,
                discount: product.discount
            }));
        } else {
            setActionNote('Quantity Available in Stock is ' + product.qty)
            setActionNoteVisible(true);
            setInterval(() => setActionNoteVisible(false), 3000);
        }
    }

    const handleRemove = (item) => {
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
        return discountAmount.toFixed(2)
    }

    const cartAmountCalc = () => {
        var cartAmount = 0
        cartItems.map(item => {
            cartAmount = cartAmount + item.priceUsd * item.qty
        })
        cartAmount = cartAmount - discountCalc()
        return cartAmount.toFixed(2)
    }

    const deliveryCalc = () => {
        var rateMin /* = default delivery rate */
        var currentRate
        if (delivery.rateType === 'Flat') {
            return parseInt(delivery.flatRate)
        } else if (delivery.rateType === 'Custom') {
            rateMin = 1000000000
            if (delivery.rates) {
                delivery.rates.map(rate => {
                    if (rate.basedOn === 'Value') {
                        if (cartAmountCalc() >= rate.min && cartAmountCalc() <= rate.max) {
                            currentRate = rate.rate
                            if (currentRate < rateMin) rateMin = currentRate
                        }
                    } else if (rate.basedOn === 'Quantity') {
                        if (qtyCalc() >= rate.min && qtyCalc() <= rate.max) {
                            currentRate = rate.rate
                            if (currentRate < rateMin) rateMin = currentRate
                        }
                    } else if (rate.basedOn === 'Percentage') {
                        if (cartAmountCalc() >= rate.min && cartAmountCalc() <= rate.max) {
                            currentRate = rate.rate * cartAmountCalc() * 0.01
                            if (currentRate < rateMin) rateMin = currentRate
                        }
                    }
                })
            } else rateMin = 0
        }
        return parseInt(rateMin)
    }

    const paymentCalc = () => {
        var rateMin /* = default payment rate */
        var currentRate
        if (payment.rateType === 'Flat') {
            return parseInt(payment.flatRate)
        } else if (payment.rateType === 'Custom') {
            rateMin = 1000000000
            if (payment.rates) {
                payment.rates.map(rate => {
                    if (rate.basedOn === 'Value') {
                        if (cartAmountCalc() >= rate.min && cartAmountCalc() <= rate.max) {
                            currentRate = rate.rate
                            if (currentRate < rateMin) rateMin = currentRate
                        }
                    } else if (rate.basedOn === 'Quantity') {
                        if (qtyCalc() >= rate.min && qtyCalc() <= rate.max) {
                            currentRate = rate.rate
                            if (currentRate < rateMin) rateMin = currentRate
                        }
                    } else if (rate.basedOn === 'Percentage') {
                        if (cartAmountCalc() >= rate.min && cartAmountCalc() <= rate.max) {
                            currentRate = rate.rate * cartAmountCalc() * 0.01
                            if (currentRate < rateMin) rateMin = currentRate
                        }
                    }
                })
            } else rateMin = 0
        }
        return parseInt(rateMin)
    }

    const totalAmountCalc = () => {
        var deliveryCharg = deliveryCharge ? deliveryCharge : deliveryCalc()
        var totalAmount = delivery
            ? deliveryCharg + parseFloat(cartAmountCalc()) - discountCalc()
            : parseFloat(cartAmountCalc()) - discountCalc()
        //console.log(deliveryCalc(), cartAmountCalc())
        return totalAmount.toFixed(2)
    }

    const invoiceAmountCalc = () => {
        var invoiceAmount = 0
        request.map(req => {
            invoiceAmount = invoiceAmount + parseFloat(req.totalAmount)
        })
        return invoiceAmount
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
        if (qtyCalc() > 0 && cartAmountCalc() > 0) {
            //console.log(requestIndex)
            request[requestIndex] = {
                creation_date: time,
                created_by: userInfo ? userInfo.name : Date.now() + 10800000,
                isPrepare: isPrepare !== undefined && isPrepare,
                prepareOn: prepareOn !== undefined && prepareOn,
                isPlace: isPlace !== undefined && isPlace,
                /*confirmation: {
                    placement: placement
                },*/
                operatedBy: userInfo.isOrderManager !== undefined && {
                    date: time,
                    employeeName: userInfo.name,
                    employeeId: userInfo.employeeId
                },
                payment: {
                    //status: paymentStatus,
                    collectOn: collectOn, // usually the same as delivery date
                    title: paymentTitle,
                    type: paymentType,
                    charge: paymentCalc(),
                },
                delivery: isPlace && {
                    //status: deliveryStatus,
                    deliverOn: deliverOn,
                    title: deliveryTitle,
                    //type: deliveryType,
                    duration: delivery.duration + ' ' + delivery.timeFormat,
                    charge: deliveryCalc(),
                },
                cart: {
                    //status: cartStatus,
                    items: cartItems,
                    qty: qtyCalc(),
                    amount: cartAmountCalc(),
                    discountAmount: discountCalc(),
                },
                totalAmount: totalAmountCalc(),
                receiptNum: d,
            }
            //console.log(request)
            dispatch(updateCart('clear'))
            setRequestIndex(requestIndex + 1)
            setRequest(request)
            setRequestFormVisible(false)
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
                                        }}>Add Address
                                    </button>
                                    <button type="button" className="button secondary width"
                                        style={{ marginTop: '1rem' }}
                                        onClick={() => setAddressVisible(false)}>
                                        Back
                                    </button>
                                </div>}
                        </li>
                        <li>
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
                        </li>
                        {request.length > 0 &&
                            <li className='border-padding'>
                                {request.map(req => (
                                    <div>
                                        <div className='flex-align'>
                                            <div className="label margin-right">
                                                {'Request ' + (request.indexOf(req) + 1)}</div>
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
                                            <div className='cart-total-qty'>
                                                <div className='cart-total-label'>Discount Earned</div>
                                                <div className='total-num'>{req.cart.discountAmount + ' $'}</div>
                                            </div>
                                            {req.delivery &&
                                                <div className='cart-total-qty'>
                                                    <div className='cart-total-label'>Delivery Charge</div>
                                                    <div className='total-num'>{req.delivery.charge > 0
                                                        ? req.delivery.charge + ' $' : 'Free'}</div>
                                                </div>}
                                            {req.payment && req.payment.charge > 0 && <div className='cart-total-qty'>
                                                <div className='cart-total-label'>Payment Charge</div>
                                                <div className='total-num'>{req.payment.charge + ' $'}</div>
                                            </div>}
                                            <div className='cart-total-qty border-top'>
                                                <div className='cart-total-label'>Total Amount</div>
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
                                    {(!isBtn || isBtn === 'isPrepare') &&
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
                                    <label className='label line-des'>Status</label>
                                    <div className='status-select'>
                                        <div className='select-zone'>
                                            <div className="label">Cart</div>
                                            <select
                                                value={cartStatus}
                                                onChange={(e) => {
                                                    setCartStatus(
                                                        e.target.selectedIndex ?
                                                            e.target.options[e.target.selectedIndex].value :
                                                            e.target.value)
                                                }}
                                            >
                                                <option key='' value=''>
                                                    Select...
                                                    </option>
                                                {cartStatusList
                                                    && cartStatusList.map((status) => (
                                                        <option key={cartStatusList.indexOf(status)} value={status}>
                                                            {status}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                        <div className='select-zone'>
                                            <div className="label">Delivery</div>
                                            <select
                                                value={deliveryStatus}
                                                onChange={(e) => {
                                                    setDeliveryStatus(
                                                        e.target.selectedIndex ?
                                                            e.target.options[e.target.selectedIndex].value :
                                                            e.target.value)
                                                }}
                                            >
                                                <option key='' value=''>
                                                    Select...
                                                    </option>
                                                {deliveryStatusList
                                                    && deliveryStatusList.map((status) => (
                                                        <option key={deliveryStatusList.indexOf(status)} value={status}>
                                                            {status}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                        <div className='select-zone'>
                                            <div className="label">Payment</div>
                                            <select
                                                value={paymentStatus}
                                                onChange={(e) => {
                                                    setPaymentStatus(
                                                        e.target.selectedIndex ?
                                                            e.target.options[e.target.selectedIndex].value :
                                                            e.target.value)
                                                }}
                                            >
                                                <option key='' value=''>
                                                    Select...
                                                    </option>
                                                {paymentStatusList
                                                    && paymentStatusList.map((status) => (
                                                        <option key={paymentStatusList.indexOf(status)} value={status}>
                                                            {status}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                    </div>
                                    <label className="label" htmlFor="searchKeyword">Cart Items<p className="required">*</p></label>
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
                                    </div>
                                    {cartItems &&
                                        cartItems.map((item) => (
                                            item && item.qty > 0 &&
                                            <li className='border-padding back-white'>
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
                                                        <FontAwesome className="fas fa-trash fa-trash-order fa-lg"
                                                            onClick={() => handleRemove(item)}
                                                        />
                                                    </div>
                                                    <div className='cart-btns cart-btns-order'>
                                                        <button
                                                            type="button"
                                                            className="plus plus-cart plus-cart-order"
                                                            value={item._id}
                                                            onClick={(e) => handlePlus(item)}>
                                                            <FontAwesome className="fas fa-plus" />
                                                        </button>
                                                        <p className="add-to-cart-qty float-bottom count count-order">{item.qty}</p>
                                                        <button
                                                            type="button"
                                                            className="minus minus-cart minus-cart-order"
                                                            value={item._id}
                                                            onClick={(e) => handleMinus(item)}>
                                                            <FontAwesome className="fas fa-minus" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    {cartItems &&
                                        <div style={{ margin: '2rem 0' }}>
                                            {deliveryList && isBtn !== 'isPrepare' &&
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
                                            {(isBtn === 'isPlace' || isBtn === 'isPrepare') &&
                                                <div style={{ margin: '2rem 0 0 0' }}>
                                                    <div className="label">
                                                        {isBtn === 'isPlace'
                                                            ? 'Delivery Date'
                                                            : isBtn === 'isPrepare' && 'Preparation Date'}
                                                        <p className="required">*</p></div>
                                                    <div>
                                                        <input
                                                            type="datetime-local"
                                                            name="datePicker"
                                                            id="datePicker"
                                                            className='orders-user-phone'
                                                            style={{ marginBottom: '0' }}
                                                            value={
                                                                isBtn === 'isPlace'
                                                                    ? deliverOn
                                                                    : isBtn === 'isPrepare'
                                                                    && prepareOn
                                                            }
                                                            onChange={(e) => {
                                                                isBtn === 'isPlace'
                                                                    ? setDeliverOn(e.target.value)
                                                                    : isBtn === 'isPrepare'
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
                                                            {receiptNum ? receiptNum : d + 10800000}
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
                                                        <div className='cart-total-label'>Discount Earned</div>
                                                        <div className='total-num'>{discountCalc() + ' $'}</div>
                                                    </div>
                                                    {delivery &&
                                                        <div className='cart-total-qty'>
                                                            <div className='cart-total-label'>Delivery Charge</div>
                                                            <div className='total-num'>{
                                                                deliveryCharge ? deliveryCharge : (deliveryCalc() > 0
                                                                    ? deliveryCalc() + ' $' : 'Free')}</div>
                                                        </div>}
                                                    {payment && (paymentCalc() > 0 || (paymentCharge && paymentCharge > 0)) &&
                                                        <div className='cart-total-qty'>
                                                            <div className='cart-total-label'>Payment Charge</div>
                                                            <div className='total-num'>{
                                                                paymentCharge ? paymentCharge : paymentCalc() + ' $'
                                                            }</div>
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
                                                onClick={() => setRequestFormVisible(false)}>
                                                Back
                                            </button>
                                        </div>}
                                </div>}
                        </li>
                        <li>
                            <label className="label" htmlFor="note">Note Box</label>
                            <div className='border'>
                                {note && note.length > 0 &&
                                    note.map(not => (
                                        <div className='admin-note-line '>
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
                                                        setNoteText(not.text)
                                                        setNoteIndex(note.indexOf(not))
                                                        setEditNoteText(true)
                                                    }} />
                                            </div>
                                            <div className='admin-note-text'>
                                                {not.text}
                                            </div>
                                            <div className='note-date'>
                                                {not.date}
                                            </div>
                                        </div>))}
                                <textarea
                                    type="text"
                                    name="note"
                                    id="note"
                                    value={noteText}
                                    onChange={(e) => setNoteText(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && saveNoteHandler(e)}
                                ></textarea>
                                <button className='button width'
                                    style={{ marginTop: '0' }}
                                    onClick={(e) => saveNoteHandler(e)}>Save Note
                                </button>
                            </div>
                        </li>
                        <li>
                            <div className='inovice-num'>Invoice#</div>
                            <div className='cart-total-qty border-top'>
                                <div className='cart-total-label '>Invoice Amount</div>
                                <div className='total-num'>{invoiceAmountCalc() + ' $'}</div>
                            </div>
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
            {productsListVisible &&
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
                                            onClick={() => handleAddToCart(product)}>
                                            Add To Cart
                                        </button>
                                        <div className={`add-to-cart-btns hide ${product.PlusMinusClass} btns-orders`}>
                                            <button
                                                type="button"
                                                className="minus minus-orders"
                                                value={product._id}
                                                onClick={() => handleMinus(product)}>
                                                <FontAwesome name='fa-minus' className="fas fa-minus" />
                                            </button>
                                            <p className="add-to-cart-qty qty-cart count qty-cart-orders">{product.qty}</p>
                                            <button
                                                type="button"
                                                className="plus plus-orders"
                                                value={product._id}
                                                onClick={() => handlePlus(product)}>
                                                <FontAwesome name='fa-plus' className="fas fa-plus" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Swiper>
                    </div>
                </div>}
        </div>
    );
}

export default OrdersManager;
