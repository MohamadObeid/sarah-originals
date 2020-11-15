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
    requestStatusList, requestTypeList, orderStatusList, assignmentStatusList
} from '../../constants/lists'
import ReactTooltip from "react-tooltip";
import {
    creationDatePrettier, dayConverter, updateRequestStatus, statusModifier, date,
    qtyCalc, paymentCalc, cartAmountCalc, discountCalc, totalAmountCalc, deliveryCalc
} from "../../methods/methods";
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
    const [timeOut, setTimeOut] = useState()
    const [orderList, setOrderList] = useState([])

    const [requestNum, setRequestNum] = useState()
    const [_id, setId] = useState()
    const [invoiceNum, setinvoiceNum] = useState()
    const [customerName, setCustomerName] = useState()
    const [customerUserId, setCustomerUserId] = useState()
    const [customerPhone, setCustomerPhone] = useState()
    const [orderStatus, setorderStatus] = useState()
    const [assignment, setAssignment] = useState([])

    const [paymentStatus, setPaymentStatus] = useState()
    const [deliveryStatus, setDeliveryStatus] = useState()
    const [cartStatus, setCartStatus] = useState()
    const [amount, setamount] = useState()
    const [request, setRequest] = useState([])
    const [receiptNum, setReceiptNum] = useState()
    const [requestStatus, setRequestStatus] = useState()
    const [requestType, setRequestType] = useState()
    const [itemsQty, setItemsQty] = useState()
    const [note, setNote] = useState()
    const [noteText, setNoteText] = useState()
    const [prepareOn, setPrepareOn] = useState()
    const [requestId, setRequestId] = useState()

    // payment
    const [payment, setPayment] = useState()
    const [paymentValues, setPaymentValues] = useState()
    const [collectOn, setcollectOn] = useState() //date
    const [paymentTitle, setPaymentTitle] = useState()
    const [paymentType, setPaymentType] = useState()
    const [paymentAddress, setPaymentAddress] = useState()
    const [paymentCharge, setPaymentCharge] = useState()
    const [paymentTypeList, setPaymentTypeList] = useState()
    const [paymentDescription, setPaymentDescription] = useState()

    // delivery
    const [delivery, setDelivery] = useState()
    const [deliveryValues, setDeliveryValues] = useState()
    const [deliverOn, setDeliverOn] = useState()
    const [deliveryTitle, setDeliveryTitle] = useState()
    const [deliveryAddress, setDeliveryAddress] = useState()
    const [deliveryCharge, setDeliveryCharge] = useState()

    //
    const [city, setCity] = useState()
    const [region, setRegion] = useState()
    const [building, setBuilding] = useState()
    const [addressVisible, setAddressVisible] = useState()
    const [address, setAddress] = useState([])

    //const { time } = useSelector(state => state.clock)
    const { success: successSave, order, error } = useSelector(state => state.orderSave)
    const { success: successDelete } = useSelector(state => state.orderDelete)
    const { orders, loading } = useSelector(state => state.orderList)
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
            if ((order && order._id) || successDelete) {
                dispatch(listOrders())
                userModified() &&
                    dispatch(saveUser({
                        _id: customerUserId, address: address, name: customerName, orderList: order._id
                    }))
                setActionNote(`Order ${formAction}d succefully`)
                setFormAction('Create')
                setFormAlertVisible(false)
                modelVisible && setModelVisible(false)
            } else setActionNote(order)
            setIsDeliveryAddress(undefined)
            setIsPaymentAddress(undefined)
            dispatch(saveOrder('clear'))
            setActionNoteVisible(true)
            clearTimeout(timeOut)
            setTimeOut(setTimeout(() => setActionNoteVisible(false), 6000))
        }

        if (error) {
            setModelVisible(false)
            dispatch(listOrders())
        }

        orders && !loading && setOrderList(orders)
        console.log(orders)

    }, [successSave, successDelete, orders, error])

    useEffect(() => {
        if (deliveryTitle) {
            deliveryList.map(del => {
                if (del.title === deliveryTitle) {
                    setDeliveryValues(del)
                    setDeliverOn(date({
                        duration: del.duration,
                        timeFormat: del.timeFormat
                    }))
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
                }
            })
        }

        if (paymentType && paymentValues) {
            setPaymentDescription(paymentValues.description)
            if (paymentValues.rates.length > 0) {
                paymentValues.rates.map(rate => {
                    if (rate.paymentType === paymentType) {
                        setPaymentDescription(rate.description)
                    }
                })
            }
        }

        if (deliverOn || prepareOn) {
            setcollectOn(deliverOn ? deliverOn : prepareOn && prepareOn)
        }

        if (user) {
            setCustomerUserId(user._id)
            setCustomerPhone(user.phone)
            setAddress(user.address.length > 0 ? user.address : address)

            if (user.address.length > 0) {
                if (user.address.length === 1) {
                    const address1 = user.address[0].city + ', ' + user.address[0].region + ', ' + user.address[0].building
                    setIsDeliveryAddress(0)
                    setDeliveryAddress(address1)
                    setIsPaymentAddress(0)
                    setPaymentAddress(address1)
                } else {
                    user.address.map(add => {
                        var delPayAdd = add.city + ', ' + add.region + ', ' + add.building
                        if (delPayAdd === deliveryAddress)
                            setIsDeliveryAddress(user.address.indexOf(add))

                        if (delPayAdd === paymentAddress)
                            setIsPaymentAddress(user.address.indexOf(add))
                    })
                }
            }
            setCustomerName(user.name)
        }

        if (cartItems.length > 0)
            setRequestItems(cartItems)


    }, [deliveryTitle, paymentTitle, user, deliverOn, prepareOn, cartItems, paymentType])

    const openOrderModel = async (order) => {
        setModelVisible(true)
        setRequestFormVisible(false)
        setOrderValues(order._id ? order : undefined)
        setId(order._id ? order._id : undefined)
        setinvoiceNum(order.invoiceNum ? order.invoiceNum : 'INV-' + (Date.now() + 7200000))
        setRequest(order.request ? order.request : [])
        setCity(undefined)
        setRegion(undefined)
        setBuilding(undefined)
        setAddress([])
        setAddressVisible(false)
        setorderStatus(order.orderStatus ? order.orderStatus : 'Pending')
        setDeliveryAddress(order.deliveryAddress ? order.deliveryAddress : undefined)
        setPaymentAddress(order.paymentAddress ? order.paymentAddress : undefined)
        setIsDeliveryAddress(undefined)
        setIsPaymentAddress(undefined)
        await dispatch(getUser(order.phone ? order.phone : 'clear'))
        setCustomerUserId(order.userId ? order.userId : undefined)
        setCustomerName(order.name ? order.name : '')
        setCustomerPhone(order.phone ? order.phone : '')
        setamount(order.amount ? order.amount : undefined)
        setNote(order.note ? order.note : [])
        order.note ? setNoteIndex(order.note.length) : setNoteIndex(0)
        setFormAlertVisible(false)
        setNoteText(undefined)
        setAssignment(order.assignment ? order.assignment : [])
    }

    const submitHandler = (e) => {
        e.preventDefault()
        //console.log(request)
        if (customerName && customerPhone && request.length > 0 &&
            (!request[0].delivery ? true : deliveryAddress)
            && paymentAddress && request.length > 0) {
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
                    amount: amountCalc(request),
                    invoiceNum: invoiceNum,
                    note: note,
                    //status: orderStatus
                }))
            } else {
                dispatch(saveOrder({
                    creation_date: Date.now() + 7200000,
                    created_by: userInfo.name,
                    userId: customerUserId,
                    name: customerName,
                    phone: customerPhone,
                    //email: customerEmail,
                    deliveryAddress: deliveryAddress,
                    paymentAddress: paymentAddress,// usually the same as delivery address
                    request: request,
                    amount: amountCalc(request),
                    invoiceNum: 'INV-' + d,
                    note: note,
                    //status: orderStatus
                }))
            }
        } else {
            if (request.length === 0) {
                setActionNote(`Order must have at least 1 request!`)
            } else if (!deliveryAddress) {
                setActionNote(`Order must have a delivery/payment address!`)
            }
            setFormAlertVisible(false)
            modelVisible && setModelVisible(false)
            setActionNoteVisible(true)
            clearTimeout(timeOut)
            setTimeOut(setTimeout(() => setActionNoteVisible(false), 6000))
            dispatch(listOrders())
        }
    }

    const userModified = () => {
        if (user) {
            if (user.phone !== customerPhone) return false
            if (user.name !== customerName) return true
            //console.log(user.address, '||' + address)

            user.address.length > 0 &&
                user.address.map(add => {
                    var i = user.address.indexOf(add)
                    if (add.city !== address[i].city || add.region !== address[i].region || add.building !== address[i].building)
                        return true
                })

            // add new addresses
            if (user.address.length < address.length) return true
            if (address.length !== user.address.length) return true
        } else return false
    }

    const createHandler = (e) => {
        setModelVisible(true)
        openOrderModel({})
    }

    const deleteHandler = (e, _id) => {
        e.preventDefault()
        setFormAction('Delete')
        dispatch(deleteOrder(_id))
    }

    const editHandler = (order) => {
        setFormAction('Edite')
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

        if (status === 'Place' || status === 'Return') {
            deliveryList.map(del => {
                if (del.title === deliveryTitle) {
                    setDeliveryValues(del)
                    setDeliverOn(date({
                        duration: del.duration,
                        timeFormat: del.timeFormat
                    }))
                }
            })
        } else if (status === 'Prepare') {
            setPrepareOn(date())
            setDeliveryAddress(undefined)
            setIsDeliveryAddress(undefined)
        } else if (status === 'Cancel') {
            setPrepareOn(undefined)
        }
    }

    const showRequestForm = (req) => {
        var d = Date.now() + 7200000
        cartItems.length > 0 && dispatch(updateCart('clear'))
        setRequestTypeDisabled(false)
        setReceiptNum('RE-' + d)

        if (!requestFormVisible) {
            if (req) {
                setRequestTypeDisabled(true)
                openRequestModal(req)
                setRequestIndex(request.indexOf(req))
            } else {
                setRequestType('Place')
                setRequestNum(undefined)
                request.length > 0 ? setRequestIndex(request.length) : setRequestIndex(0)
                if (deliveryList.length > 0) {
                    if (request.length === 0)
                        setDeliveryTitle(deliveryList[0].title) //cosidered deliveryList[0] is default delivery
                    else request[0].delivery && setDeliveryTitle(request[0].delivery.title)
                    request[0] && request[0].delivery ? setDeliverOn(date({
                        duration: deliveryList[0].duration,
                        timeFormat: deliveryList[0].timeFormat
                    })) : setDeliverOn(date())
                }
                if (paymentList.length > 0) {
                    setPaymentTitle(paymentList[0].title)
                }
                clearRequestValues()
            } setRequestFormVisible(true)
        } else {
            //console.log('close Model')
            setRequestFormVisible(false)
            clearRequestValues()
            setRequestType(undefined)
            setItemsQty(undefined)
            setRequestNum(undefined)
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
            openRequestModal(request[requestNum - 1])
        }
    }, [requestNum, requestTypeDisabled])

    const openRequestModal = async (req) => {
        // console.log(req)
        !requestType && setRequestType(req.type ? req.type : 'Place')

        if (!requestNum) {
            setRequestId(req._id ? req._id : undefined)
            setRequestStatus(req.status ? req.status : 'Pending')
            setReceiptNum(req.receiptNum ? req.receiptNum : receiptNum)
            setRequestNum(req.modifiedRequestNum ? req.modifiedRequestNum : undefined)
            setCartStatus(req.cart.status ? req.cart.status : 'Pending')
        } else {
            setRequestId(undefined)
        }

        if (req.payment && !requestNum) {
            setPayment(req.payment ? req.payment : undefined)
            setPaymentStatus(req.payment.status ? req.payment.status : 'Pending')
            setcollectOn(req.payment.collectOn ? req.payment.collectOn : undefined)
            setPaymentTitle(req.payment.title ? req.payment.title : undefined)
            setPaymentDescription(req.payment.description ? req.payment.description : '')
            setPaymentType(req.payment.type ? req.payment.type : 'Place')
            setPaymentCharge(req.payment.charge ? req.payment.charge : undefined)
        } else if (requestNum) {
            setPayment(undefined)
            setPaymentStatus('Pending')
            setcollectOn(undefined)
            setPaymentTitle(undefined)
            setPaymentCharge(undefined)
        }

        if (req.delivery && !requestNum) {
            setDelivery(req.delivery ? req.delivery : undefined)
            setDeliveryStatus(req.delivery.status ? req.delivery.status : (req.status ? undefined : 'Pending'))
            setDeliverOn(req.delivery.deliverOn ? req.delivery.deliverOn : undefined)
            setDeliveryTitle(req.delivery.title ? req.delivery.title : undefined)
            setDeliveryCharge(req.delivery.charge ? req.delivery.charge : undefined)
        } else if (requestNum) {
            setDelivery(undefined)
            setDeliveryStatus('Pending')
            setDeliverOn(date())
            setDeliveryTitle(requestType === 'Return' ? 'Return Delivery' : undefined)
            setDeliveryCharge(undefined)
        }

        !requestNum &&
            setPrepareOn(req.cart.prepareOn ? req.cart.prepareOn : date())

        if (req.cart.items.length > 0) {
            const productIdList = await req.cart.items.map(item => { return item._id })
            const { data } = await Axios.post("/api/products/getproducts", productIdList)
            await data.map(product => {
                var theItem = req.cart.items.find(item => item._id === product._id)
                theItem.countInStock = product.countInStock
                if (theItem.qty > product.countInStock) theItem.qty = product.countInStock
            })
            await dispatch(addToCart(req.cart.items));

            var reqType = requestType
                ? requestType === 'Cancel' || requestType === 'Return'
                : req.type === 'Cancel' || req.type === 'Return'
            if (reqType) {
                var index = requestNum ? requestNum - 1 : req.modifiedRequestNum - 1
                var items = request[index].cart.items
                setItemsQty(items.map(item => {
                    return { _id: item._id, qty: item.qty }
                }))
            }

        } else dispatch(updateCart('clear'))
    }

    /*
        const setItemsMaxQty = (order, request) => {
            const currOrder = JSON.parse(window.sessionStorage.getItem('activeOrders'))
                .find(o => o._id == order._id)
            const currReq = currOrder.request.find(req => req._id == request._id)
            const storedItems = currReq.cart.items.map(i => { return i })
            // Note: storedItem.qty is considered the max.qty
            // decrease the canceled qty from the storedItem.qty according to existing cancel requests
            const currentRequestIndex = order.request.indexOf(request)
            const cancelRequests = order.request.filter(req =>
                req.type === 'Cancel' && req.modifiedRequestNum === currentRequestIndex + 1 &&
                req.status !== 'Canceled' && req.status !== 'Rejected') || []
    
            if (cancelRequests.length > 0) {
                cancelRequests.map(req => {
                    req.cart.items.map(i => {
                        const storedItem = storedItems.find(item => item._id == i._id)
                        storedItem.qty = storedItem.qty - i.qty
                    })
                })
            }
            window.sessionStorage.setItem('storedItems', JSON.stringify(storedItems))
            request.cart.items.map(i => {
                const storedItem = storedItems.find(item => item._id == i._id)
                i.qty = storedItem.qty
            })
        }
    */
    const searchItem = async (e) => {
        e.preventDefault()
        searchKeyword &&
            await dispatch(detailsProduct({ searchKeyword: searchKeyword }))
        setSearchKeyword('')
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
        clearTimeout(timeOut)
        setTimeOut(setTimeout(() => setActionNoteVisible(false), 3000))
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
            clearTimeout(timeOut)
            setTimeOut(setTimeout(() => setActionNoteVisible(false), 3000))
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
        if (product.countInStock > product.qty) {
            if (requestType === 'Place' || requestType === 'Prepare' || (item && product.qty < item.qty)) {
                var qty = parseInt(product.qty) + 1
                //console.log(product.qty)
                dispatch(updateCart({
                    _id: product._id, nameEn: product.nameEn, image: product.image, qty: qty,
                    priceUsd: product.priceUsd, unit: product.unit, countInStock: product.countInStock,
                    discount: product.discount
                }))
            } else {
                setActionNote('The quantity you ordered before is ' + item.qty)
                setActionNoteVisible(true)
                clearTimeout(timeOut)
                setTimeOut(setTimeout(() => setActionNoteVisible(false), 3000))
                return
            }
        } else {
            setActionNote('Quantity Available in Stock is ' + product.qty)
            setActionNoteVisible(true);
            clearTimeout(timeOut)
            setTimeOut(setTimeout(() => setActionNoteVisible(false), 3000))
        }
    }

    const handleRemove = (e, item) => {
        e.preventDefault()
        dispatch(removeFromCart(item._id))
        setActionNote(`Product Removed Succefully`);
        setActionNoteVisible(true);
        clearTimeout(timeOut)
        setTimeOut(setTimeout(() => setActionNoteVisible(false), 3000))
    }

    window.addEventListener('click', (e) => {
        const overlay = document.querySelector('.full-background')
        if (e.target === overlay)
            setProductsListVisible(false)
    })

    const amountCalc = (request) => {
        var amount = 0
        request.map(req => {
            if (req.status !== 'Pending')
                amount = amount + parseFloat(req.amount)
        })
        return amount.toFixed(2)
    }

    ////////////////////////////////////////////////////////

    const addRequestHandler = (e) => {
        e.preventDefault()

        if (qtyCalc(cartItems) > 0) {
            request[requestIndex] = {
                _id: requestId && requestId,
                creation_date: date(),
                created_by: userInfo ? userInfo.name : Date.now() + 7200000,
                type: requestType,
                status: requestStatus,
                modifiedRequestNum: (requestType === 'Cancel' || requestType === 'Return') ?
                    requestNum : undefined, // index of request

                payment: {
                    status: paymentStatus,
                    collectOn: collectOn, // usually the same as delivery date
                    title: paymentTitle,
                    description: paymentDescription,
                    type: paymentType,
                    charge: paymentCalc(paymentValues, paymentType, cartItems, requestType),
                },

                cart: {
                    status: cartStatus,
                    prepareOn: prepareOn ? prepareOn : date(),
                    items: requestItems,
                    qty: qtyCalc(cartItems),
                    amount: cartAmountCalc(cartItems, requestType),
                    discountAmount: discountCalc(cartItems, requestType),
                },

                amount: totalAmountCalc(cartItems, deliveryCharge, paymentCharge, paymentValues, request, requestType, paymentType, itemsQty, requestNum, requestIndex, deliveryValues),
                receiptNum: receiptNum,
            }
            if (requestType !== 'Prepare' && request[0].type !== 'Prepare' && requestType !== 'Cancel')
                request[requestIndex].delivery = {
                    status: deliveryStatus || undefined,
                    deliverOn: deliverOn || undefined,
                    title: deliveryTitle || undefined,
                    //type: deliveryType,
                    duration: deliveryValues && (deliveryValues.duration + ' ' + deliveryValues.timeFormat),
                    charge: deliveryCalc(deliveryValues, cartItems, requestType, itemsQty, request, requestNum, requestIndex),
                }

            //console.log(request)
            dispatch(updateCart('clear'))
            setRequestIndex(requestIndex + 1)
            setRequest(request)
            setRequestNum(undefined)
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
                    date: date(),
                    showTo: 'Order Manager',
                }
            } else if (editNoteText) {
                note[noteIndex] = {
                    name: userInfo.name,
                    text: noteText,
                    date: date(),
                    showTo: 'Order Manager',
                    edited: true
                }
            }
            setNote(note)
            setNoteText('')
            setNoteIndex(note.length)
        }
    }

    const requestStatusEditor = (e, order, req, type) => {
        const requestStat = e.target.selectedIndex ?
            e.target.options[e.target.selectedIndex].value :
            e.target.value
        //console.log(status)
        var confirmed = ((requestStat === 'Canceled' || requestStat === 'Rejected') && type === 'Request') ?
            window.confirm('You are setting request ' + requestStat + '!') : true

        var operatedBy
        if (requestStat === 'Confirmed' && type === 'Request') {
            operatedBy = {
                date: date(),
                employeeName: userInfo.name,
                employeeId: userInfo.employeeId
            }
        }
        if (confirmed) {
            dispatch(saveOrder({
                _id: order._id, req_id: req._id, type: type, status: requestStat, operatedBy
            }))
            setFormAction('update')
        }
    }

    const closeModel = () => {
        setModelVisible(false)
        dispatch(listOrders())
        setIsDeliveryAddress(undefined)
        setIsPaymentAddress(undefined)
    }

    const assignRequest = (e, request) => {
        e.preventDefault()
        dispatch(saveOrder({ _id, req_id: request._id, status: 'Reassign' }))
        setFormAction('Assigne')
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
                        <FontAwesome name="fa-window-close" className="far fa-window-close fa-lg" onClick={() => closeModel()} />
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
                                    value={customerPhone || ''}
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
                                value={customerName || ''}
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
                        {/*orderValues &&
                            <li>
                                <label className="label" htmlFor="city">Address<p className="required">*</p></label>
                                <div className='user-address' >
                                    {deliveryAddress}
                                </div>
                        </li>*/}

                        {address.length > 0 &&
                            <li className='border-padding padding-bottom'>
                                {address.map(add => (
                                    <div key={address.indexOf(add)}>
                                        <div className='flex-align'>
                                            <div className="label margin-right">
                                                Address #{address.indexOf(add) + 1}</div>
                                            <FontAwesomeIcon icon={faTrashAlt}
                                                className='cursor-color-absolute right'
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    address.splice(address.indexOf(add), 1)
                                                    if ((add.city + ', ' + add.region + ', ' + add.building) === deliveryAddress) {
                                                        setDeliveryAddress(undefined)
                                                        setIsDeliveryAddress(undefined)
                                                    }
                                                    if ((add.city + ', ' + add.region + ', ' + add.building) === paymentAddress) {
                                                        setPaymentAddress(undefined)
                                                        setIsPaymentAddress(undefined)
                                                    }
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
                                        value={city || ''}
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
                                            if (city && region && building) {
                                                setAddress([...address, { city: city, region: region, building: building }])
                                                setAddressVisible(false)
                                                setDeliveryAddress(city + ', ' + region + ', ' + building)
                                                setPaymentAddress(city + ', ' + region + ', ' + building)
                                                setIsDeliveryAddress(address.length)
                                                setIsPaymentAddress(address.length)
                                            }
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
                                    <div style={{ margin: '0.5rem 0' }} key={req.receiptNum}>
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
                                                <div className='cart-total-qty'>
                                                    <div className='cart-total-label'>Payment Status</div>
                                                    <div className='total-num'
                                                        style={{ fontSize: '1.1rem' }}>{req.payment.status}</div>
                                                </div>}
                                            {assignment.length > 0 &&
                                                <div className='cart-total-qty receipt-title'>
                                                    <div className="label">Assignments</div>
                                                    <div className='total-num'
                                                        style={{ fontSize: '1.2rem' }}>Status</div>
                                                    {/*req.status === 'Confirmed' && <div className='total-num assign-btn'
                                                        style={{ fontSize: '1.2rem' }}
                                                        onClick={e => assignRequest(e, req)}>Reassign</div>*/}
                                                </div>}
                                            {assignment.length > 0 &&
                                                assignment.map(ass => ((ass.status !== 'Canceled' && ass.status !== 'Rejected' && ass.status !== 'Pending' && ass.status !== 'Unassigned' && ass.req_id == req._id) &&
                                                    <div key={ass._id}>
                                                        <div className='cart-total-qty ass-form-hovered' key={ass._id} data-tip data-for={ass._id}>
                                                            <div className='cart-total-label'>{ass.type}</div>
                                                            <div className='total-num'
                                                                style={{ fontSize: '1.1rem' }}>{ass.status}</div>
                                                        </div>
                                                        <ReactTooltip id={ass._id} place="top" effect="float" className='width-30rem'>
                                                            {ass.employeeName}
                                                        </ReactTooltip>
                                                    </div>))}
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
                                            {(req.delivery && (req.type === 'Cancel' ? req.delivery.charge !== 0 : true)) &&
                                                <div className='cart-total-qty'>
                                                    <div className='cart-total-label'>Delivery Charge
                                                        <div className='pay-desc'>
                                                            {req.delivery.title
                                                                ? req.delivery.title + ' (' + req.delivery.duration + ')'
                                                                : ''}</div>
                                                    </div>
                                                    <div className='total-num'>{req.delivery.charge !== 0
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
                                                <div className='total-num'>{req.amount + ' $'}</div>
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
                                                        onChange={(e) =>
                                                            setRequestNum(e.target.selectedIndex ?
                                                                e.target.options[e.target.selectedIndex].value :
                                                                e.target.value)}
                                                        disabled={requestTypeDisabled}>
                                                        <option key='' value=''>
                                                            Select...
                                                        </option>
                                                        {request
                                                            && request.map((req) => (
                                                                req.type == request[0].type &&
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
                                                        const status = statusModifier(e.target.options[e.target.selectedIndex].value, cartStatus, paymentStatus, deliveryStatus)
                                                        setCartStatus(status.cartStatus)
                                                        setPaymentStatus(status.payStatus)
                                                        setDeliveryStatus(status.delStatus)
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
                                                        setRequestStatus(updateRequestStatus(e.target.options[e.target.selectedIndex].value, paymentStatus, deliveryStatus))
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
                                                            setRequestStatus(updateRequestStatus(cartStatus, paymentStatus, e.target.options[e.target.selectedIndex].value))
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
                                                        setRequestStatus(updateRequestStatus(cartStatus, e.target.options[e.target.selectedIndex].value, deliveryStatus))
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
                                    {requestType !== 'Cancel' && requestType !== 'Return' &&
                                        <div className='order-searchKeyword'>
                                            <input
                                                type="text"
                                                name="searchKeyword"
                                                id="searchKeyword"
                                                className='orders-user-phone'
                                                value={searchKeyword || ''}
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
                                                (request.length > 0 ? request[0].type !== 'Prepare' : true) &&
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
                                                        }}>
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
                                                                    ? (deliverOn.length > 16 ? deliverOn.slice(0, 16) : deliverOn)
                                                                    : requestType === 'Prepare'
                                                                    && (prepareOn.length > 16 ? prepareOn.slice(0, 16) : prepareOn)
                                                            }
                                                            onChange={(e) => {
                                                                requestType === 'Place'
                                                                    ? setDeliverOn(e.target.value)
                                                                    : requestType === 'Prepare'
                                                                    && setPrepareOn(e.target.value)
                                                            }}
                                                            min={date()}
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
                                                            {receiptNum ? receiptNum : 'RE-' + (d + 7200000)}
                                                        </div>
                                                    </div>
                                                    <div className='cart-total-qty'>
                                                        <div className='cart-total-label'>Items</div>
                                                        <div className='total-num'>{qtyCalc(cartItems) +
                                                            (qtyCalc(cartItems) === 1 ? ' item' : ' items')}</div>
                                                    </div>
                                                    <div className='cart-total-qty'>
                                                        <div className='cart-total-label'>Cart Amount</div>
                                                        <div className='total-num'>{cartAmountCalc(cartItems, requestType) + ' $'}</div>
                                                    </div>
                                                    <div className='cart-total-qty'>
                                                        <div className='cart-total-label'>
                                                            {(requestType === 'Cancel' || requestType === 'Return')
                                                                ? 'Discount Lost' : 'Discount Earned'}
                                                        </div>
                                                        <div className='total-num'>{discountCalc(cartItems, requestType) + ' $'}</div>
                                                    </div>
                                                    {deliveryValues && (deliveryCharge ? parseFloat(deliveryCharge) !== 0 :
                                                        parseFloat(deliveryCalc(deliveryValues, cartItems, requestType, itemsQty, request, requestNum, requestIndex)) !== 0) &&
                                                        <div className='cart-total-qty'>
                                                            <div className='cart-total-label'>
                                                                Delivery charge
                                                                <div className='pay-desc'>{
                                                                    deliveryTitle ? deliveryTitle + ' (' + deliveryValues.duration + deliveryValues.timeFormat + ')'
                                                                        : ''}</div>
                                                            </div>
                                                            <div className='total-num'>{
                                                                deliveryCharge ? deliveryCharge + ' $' :
                                                                    (deliveryCalc(deliveryValues, cartItems, requestType, itemsQty, request, requestNum, requestIndex) !== 0
                                                                        ? deliveryCalc(deliveryValues, cartItems, requestType, itemsQty, request, requestNum, requestIndex) + ' $'
                                                                        : 'Free')}
                                                            </div>
                                                        </div>}
                                                    {paymentValues && paymentCharge ? parseFloat(paymentCharge) !== 0
                                                        : parseFloat(paymentCalc(paymentValues, paymentType, cartItems, requestType)) !== 0 &&
                                                        <div className='cart-total-qty'>
                                                            <div className='cart-total-label'>Payment Charge
                                                                <div className='pay-desc'>{paymentDescription ? paymentDescription : ''}</div>
                                                            </div>
                                                            <div className='total-num'>
                                                                {paymentCharge ? paymentCharge + ' $'
                                                                    : paymentCalc(paymentValues, paymentType, cartItems, requestType) + ' $'}
                                                            </div>
                                                        </div>}
                                                    <div className='cart-total-qty border-top'>
                                                        <div className='cart-total-label'>Total Amount</div>
                                                        <div className='total-num'>{totalAmountCalc(cartItems, deliveryCharge, paymentCharge, paymentValues, request, requestType, paymentType, itemsQty, requestNum, requestIndex, deliveryValues) + ' $'}
                                                        </div>
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
                                    <div className='cart-total-qty' key={req.receiptNum}>
                                        <div className='cart-total-label '>
                                            {'Request #' + (request.indexOf(req) + 1) + '  -  ' + req.status}
                                        </div>
                                        <div className='total-num'>{req.amount + ' $'}</div>
                                    </div>
                                ))}
                                <div className='cart-total-qty border-top'>
                                    <div className='cart-total-label '>Invoice Amount</div>
                                    <div className='total-num'>{amountCalc(request) + ' $'}</div>
                                </div>
                            </div>
                        </li>}
                        <li>
                            {formAlertVisible && <div className="invalid">{formAlert}</div>}
                            <button type="submit" className="button primary">
                                {
                                    formAction == 'Copy' ? 'Create' :
                                        formAction == 'Edite' ? 'Save' : formAction
                                }
                            </button>
                            <button type="button" className="button secondary" onClick={() => closeModel()}>
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
                        <th style={{ width: '13.5rem' }}>Customer</th>
                        <th className='width-8rem'>Type</th>
                        <th className='align-width'>Status</th>
                        <th className='align-width'>Cart</th>
                        <th className='align-width'>Payment</th>
                        <th className='align-width'>Delivery</th>
                        <th className='align-width width-5rem align-right'>Amount</th>
                        <th className='align-width width-7rem align-right'>Total</th>
                        <th style={{ width: '20rem' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orderList && orderList.map(order => (
                        <tr key={order._id}>
                            <td style={{ textAlign: 'center' }}>
                                <FontAwesomeIcon
                                    className={`${order.active ? 'faCircle' : 'farCircle'}`}
                                    icon={faCircle} />
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
                                    {order.deliveryAddress && ('Address: ' + order.deliveryAddress)}
                                </ReactTooltip>
                            </td>
                            <td className='status-border text-align-start'>
                                {order.request.map(req => (
                                    <div disabled={req.status === 'Completed' || req.status === 'Canceled' || req.status === 'Rejected'}
                                        key={req.receiptNum}>{req.type}</div>
                                ))}
                            </td>
                            <td className='status-border'>{order.request.map(req => (
                                <select
                                    value={req.status}
                                    onChange={e => requestStatusEditor(e, order, req, 'Request')}
                                    key={req._id}
                                    disabled={req.status === 'Completed' || req.status === 'Canceled' || req.status === 'Rejected'}>
                                    {requestStatusList.map(status => (
                                        <option key={requestStatusList.indexOf(status)} value={status}>
                                            {status}
                                        </option>))}
                                </select>
                            ))}</td>
                            <td className='status-border'>{order.request.map(req => (
                                req.cart.status ?
                                    <select
                                        value={req.cart.status}
                                        onChange={e => requestStatusEditor(e, order, req, 'Cart')}
                                        key={req._id}
                                        disabled={req.cart.status === 'Packed' || req.cart.status === 'Canceled' || req.cart.status === 'Unpacked'}>
                                        {cartStatusList.map(status => (
                                            <option key={cartStatusList.indexOf(status)} value={status}>
                                                {status}
                                            </option>))}
                                    </select>
                                    : <div key={req._id}>-</div>
                            ))}</td>
                            <td className='status-border'>{order.request.map(req => (
                                req.payment.status ?
                                    <select
                                        value={req.payment.status}
                                        onChange={e => requestStatusEditor(e, order, req, 'Payment')}
                                        key={req._id}
                                        disabled={req.payment.status === 'Collected' || req.payment.status === 'Canceled' || req.payment.status === 'Uncollected'}>
                                        {paymentStatusList.map(status => (
                                            <option key={paymentStatusList.indexOf(status)} value={status}>
                                                {status}
                                            </option>))}
                                    </select>
                                    : <div key={req._id}>-</div>
                            ))}</td>
                            <td className='status-border'>{order.request.map(req => (
                                req.delivery && req.delivery.status ?
                                    <select
                                        value={req.delivery.status}
                                        onChange={e => requestStatusEditor(e, order, req, 'Delivery')}
                                        key={req._id}
                                        disabled={req.delivery.status === 'Delivered' || req.delivery.status === 'Undelivered' || req.delivery.status === 'Canceled' || req.delivery.status === 'Returned'}>
                                        {deliveryStatusList.map(status => (
                                            <option key={deliveryStatusList.indexOf(status)} value={status}>
                                                {status}
                                            </option>))}
                                    </select>
                                    : <div key={req.receiptNum}>-</div>
                            ))}</td>
                            <td className='status-border'>
                                {order.request.map(req => (
                                    <div style={{ textAlign: 'end' }}
                                        key={req._id}>{req.amount + ' $'}</div>
                                ))}</td>
                            <td style={{ textAlign: 'end', paddingRight: '0.4rem', fontSize: '1.5rem' }}>
                                {order.amount + ' $'}
                            </td>
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
                    ))}
                </tbody>
            </table>
        </div >
    );
}

export default OrdersManager;
