import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartAmountCalc, creationDatePrettier, date, dayConverter, deliveryCalc, discountCalc, paymentCalc, qtyCalc, timeDiffCalc, totalAmountCalc } from "../../methods/methods";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircle, faEye, faEyeSlash, faPlus } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import { backupActiveOrders, listActiveOrders, saveOrder } from "../../actions/orderActions";
import FontAwesome from "react-fontawesome";
import { cartStatusList, deliveryStatusList, paymentStatusList, requestStatusList } from "../../constants/lists";
import { detailsProduct } from "../../actions/productActions";
import { packItems } from "../../actions/cartActions"

function AssignmentManager(props) {
    const [hidden, setHidden] = useState(JSON.parse(localStorage.getItem('hiddenAss')) || [])
    const imageUrl = window.location.origin + '/api/uploads/image/'
    const [timeOut, setTimeOut] = useState()
    const [actionNoteVisible, setActionNoteVisible] = useState()
    const [actionNote, setActionNote] = useState()
    const [formAction, setFormAction] = useState()
    const [modelVisible, setModelVisible] = useState()
    const [formAlertVisible, setFormAlertVisible] = useState(false)
    const [formAlert, setFormAlert] = useState()
    const [command, setCommand] = useState()
    const [searchKeyword, setSearchKeyword] = useState()
    const [productsListVisible, setProductsListVisible] = useState()
    const [hiddenListVisible, setHiddenListVisible] = useState()
    const [receiptNum, setReceiptNum] = useState()
    const [requestFormVisible, setRequestFormVisible] = useState()

    const [active, setActive] = useState()
    const [_id, setId] = useState()
    const [orderId, setOrderId] = useState()
    const [type, setType] = useState()
    const [status, setReqStatus] = useState()
    const [note, setNote] = useState()
    const [closedDate, setClosedDate] = useState()
    const [assigned, setAssigned] = useState()
    const [packed, setPacked] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [requestStatus, setRequestStatus] = useState()
    const [cancelRequest, setCancelRequest] = useState()
    const [canceledItemList, setCanceledItemList] = useState([])
    const [requestType, setRequestType] = useState()
    const [modifiedRequestNum, setModifiedRequestNum] = useState()
    const [paymentStatus, setPaymentStatus] = useState()
    const [collectOn, setCollectOn] = useState()
    const [paymentTitle, setPaymentTitle] = useState()
    const [paymentType, setPaymentType] = useState()
    const [paymentDescription, setPaymentDescription] = useState()
    const [cartStatus, setCartStatus] = useState()
    const [prepareOn, setPrepareOn] = useState()
    const [paymentValues, setPaymentValues] = useState()
    const [deliveryStatus, setDeliveryStatus] = useState()
    const [deliveryTitle, setDeliveryTitle] = useState()
    const [deliveryValues, setDeliveryValues] = useState()
    const [deliverOn, setDeliverOn] = useState()
    const [requestIndex, setRequestIndex] = useState()
    const [requestId, setRequestId] = useState()
    const [requestNum, setRequestNum] = useState()
    const [requestItems, setRequestItems] = useState()
    const [itemsQty, setItemsQty] = useState()
    const [requestList, setRequestList] = useState([])

    const [request, setRequest] = useState()
    const [assignment, setAssignment] = useState()
    const [order, setOrder] = useState()
    const [assignments, setAssignments] = useState([])

    const { orders, loading } = useSelector(state => state.orderList)
    const { success: successSave, order: UpdatedOrder } = useSelector(state => state.orderSave)
    const { success: successDelete } = useSelector(state => state.orderDelete)
    const { employees: handlers } = useSelector(state => state.employeeList)
    const { userInfo } = useSelector(state => state.userSignin)
    const { employee } = useSelector(state => state.employeeDetails)
    const { packedItems } = useSelector(state => state.packed)
    const { storedActiveOrders } = useSelector(state => state.storedActiveOrders)
    const { payment: paymentList } = useSelector(state => state.paymentList)
    //const { time } = useSelector(state => state.clock)

    const dispatch = useDispatch()
    useEffect(() => {
        if (successSave || successDelete) {
            if (UpdatedOrder && UpdatedOrder._id) {
                dispatch(listActiveOrders())
                setActionNote(`Assignment ${formAction} succefully`)
                setFormAction('Updated')
                setFormAlertVisible(false)
                modelVisible && setModelVisible(false)
            } else setActionNote(UpdatedOrder)
            dispatch(saveOrder('clear'))
            actionNoteHandler()
        }
        if (orders && !loading) {
            dispatch(backupActiveOrders(orders))
            var assignmentList = []
            orders.map(order => {
                const ass = order.assignment.filter(ass => !ass.closedDate)
                assignmentList = [...assignmentList, ...ass]
            })
            setAssignments(assignmentList)
            hidden.map(_id => {
                const assExists = assignmentList.find(ass => ass._id == _id) || false
                if (!assExists) setHidden(hidden.filter(_id0 => _id0 !== _id))
            })
        }
        console.log(orders)
    }, [successSave, successDelete, orders])

    useEffect(() => {
        packedItems && setPacked(packedItems)
        if (hidden.length > 0)
            localStorage.setItem('hiddenAss', JSON.stringify(hidden))
        else {
            localStorage.removeItem('hiddenAss')
            setHiddenListVisible(false)
        }
    }, [packedItems, hidden])

    const actionNoteHandler = () => {
        setActionNoteVisible(true)
        clearTimeout(timeOut)
        setTimeOut(setTimeout(() => setActionNoteVisible(false), 6000))
    }

    const statusHandler = async (e, request, order, ass) => {
        e.preventDefault()
        if (ass.setReqStatus === 'on Hold' && ass.onHold) {
            setActionNote('Assignment is already on hold!')
            actionNoteHandler()
            return
        } else if (ass.onHold && ass.type !== 'Request') {
            const requestAss = order.assignment.find(ass0 => ass0.req_id == ass.req_id && ass0.type === 'Request' && ass0.onHold)
            if (requestAss) {
                setActionNote('Only request handler can set request progress!')
                actionNoteHandler()
                return
            }
        } else if (ass.type === 'Cart' && (ass.setReqStatus === 'Packed' || ass.setReqStatus === 'Unpacked')) {
            await setItemsMaxQty(order, request)
            const storedItems = JSON.parse(window.sessionStorage.getItem('storedItems'))
            var allItemsArePacked = true
            storedItems.map(item => {
                const itemPacked = packed.find(i => i._id == item._id)
                if (item.qty != itemPacked.qty) allItemsArePacked = false
            })
            if (!allItemsArePacked) {
                setActionNote('Check if all items are ' + ass.setReqStatus + '!')
                actionNoteHandler()
            }
        }

        if (handlerApproved(ass)) {
            if (ass.setReqStatus !== ass.status) {
                dispatch(saveOrder({
                    _id: order._id, req_id: request._id, ass_id: ass._id,
                    employeeName: employee.firstName + ' ' + employee.lastName,
                    employeeId: employee._id, status: ass.setReqStatus, type: ass.setType
                }))
                setFormAction('Updated')
            } else {
                setActionNote(ass.setType + ' is already ' + ass.setReqStatus + '!')
                actionNoteHandler()
            }
        } else {
            setActionNote('You do not have permission to handle this assignment!')
            actionNoteHandler()
        }
    }

    /*var jsonarr = [];
    var jobj = null;
    for (var x in sessionStorage) // Iterate through each session key
    {
        jobj = {};
        jobj[x] = sessionStorage.getItem(x); //because key will also occupy some memory
        jsonarr.push(jobj);
        jobj = null;
    }
    //https://developer.mozilla.org/en/docs/Web/JavaScript/Data_structures 
    //JavaScript's String type is used to represent textual data. It is a set of "elements" of 16-bit unsigned integer values. 
    var size = JSON.stringify(jsonarr).length * 2; //16-bit that's why multiply by 2
    var arr = ["bytes", "KB", "MB", "GB", "TB"]; // Define Units
    var sizeUnit = 0;
    while (size > 1024) { // To get result in Proper Unit
        sizeUnit++;
        size /= 1024;
    }
    alert(size.toFixed(2) + " " + arr[sizeUnit]);*/

    const RequestStatus = (ass, request, order) => {
        if (!request) request = order.request.find(req => req._id == ass.req_id || req.receiptNum == ass.receiptNum)
        ass.setType = ass.type
        if (ass.status === 'Unassigned' || ass.status === 'Assigned') ass.setType = 'Assignment'
        if (ass.onHold) ass.setReqStatus = 'Progress'
        if (!ass.setReqStatus) {
            if (ass.status === 'Unassigned' || ass.status === 'Assigned' || ass.status === 'Pending') ass.setReqStatus = 'Accepted'
            else if (ass.type === 'Request') {
                if (request.status === 'Confirmed') ass.setReqStatus = 'Completed'
                else ass.setReqStatus = 'Confirmed'
            } else if (ass.type === 'Delivery') {
                if (request.type === 'Return') ass.setReqStatus = 'Returned'
                else if (request.delivery.status === 'On Road') ass.setReqStatus = 'Delivered'
                else ass.setReqStatus = 'On Road'
            } else if (request.type === 'Prepare' || request.type === 'Place') {
                if (ass.status === 'Canceled' || ass.status === 'Rejected')
                    ass.setReqStatus = undefined
                else if (ass.type === 'Cart') {
                    if (request.cart.status === 'Packing') ass.setReqStatus = 'Packed'
                    else ass.setReqStatus = 'Packing'
                } else if (ass.type === 'Payment') {
                    ass.setReqStatus = 'Collected'
                }
            } else if (request.type === 'Return' || request.type === 'Cancel') {
                if (ass.type === 'Payment') {
                    if (order.request[request.modifiedRequestNum - 1].payment.status === 'Collected')
                        ass.setReqStatus = 'Refunded'
                    else ass.setReqStatus = 'Uncollected'
                } else if (ass.type === 'Cart') ass.setReqStatus = 'Unpacked'
            }
        }
    }

    const statusApproved = (ass, request) => {
        if (ass.status === 'Rejected' || ass.status === 'Canceled') return false
        if (ass.type === 'Request' && (request.status === 'Canceled' || request.status === 'Completed')) return false
        if (ass.type === 'Cart' && (request.cart.status === 'Packed' || request.cart.status === 'Unpacked')) return false
        if (ass.type === 'Payment' && (request.payment.status === 'Collected' || request.payment.status === 'Refunded')) return false
        if (ass.type === 'Delivery' && (request.delivery.status === 'Delivered' || request.delivery.status === 'Returned')) return false
        return true
    }

    const handlerApproved = (ass) => {
        var permissionAccepted = false
        if (ass.employeeId) { if (ass.employeeId == employee._id) permissionAccepted = true }
        else permissionAccepted = true

        if (employee && permissionAccepted) {
            if (ass.type === 'Cart') if (employee.cartHandler) return true
            if (ass.type === 'Payment') if (employee.paymentHandler) return true
            if (ass.type === 'Delivery') if (employee.deliveryHandler) return true
            if (ass.type === 'Request') if (employee.requestHandler) return true
        }
        return false
    }

    const hideAssingment = (e, ass) => {
        e.preventDefault()
        setHidden([...hidden, ass._id])
    }

    const editHandler = (e, request, order, ass) => {
        e.preventDefault()
        if (modelVisible) {
            setModelVisible(false)
            setCanceledItemList([])
            window.sessionStorage.removeItem('storedItems')
            dispatch(backupActiveOrders())
        } else {
            setRequest(request)
            setOrder(order)
            setAssignment(ass)
            setModelVisible(true)
            setFormAction('Update')
            setCommand(undefined)
            setItemsMaxQty(order, request)
            setTotalCharges(order, request)
            dispatch(backupActiveOrders(orders, 'store'))
        }
    }

    const cancelItemListHandler = () => {
        const storedItems = JSON.parse(window.sessionStorage.getItem('storedItems'))
        const storedPackedItems = packedItems.filter(list => list.req_id == request._id) || undefined
        var canceledItems = []
        if (storedPackedItems) {
            storedPackedItems.map(i => {
                const storedItem = storedItems.find(item => i._id == item._id)
                const orderItem = request.cart.items.find(item => item._id == i._id)
                if (storedItem) {
                    var canceledItem = storedItem
                    canceledItem.qty = canceledItem.qty - i.qty
                    orderItem.qty = i.qty
                    if (canceledItem.qty > 0)
                        canceledItems = [...canceledItems, canceledItem]
                }
            })
        }
        setCanceledItemList(canceledItems)
    }

    useEffect(() => {
        if (storedActiveOrders && order && request)
            cancelItemListHandler()
    }, [storedActiveOrders, order, request])

    const submitHandler = async (e) => {
        e.preventDefault()
        // check if all items are packed => set cart status to packed, and all cancel request to unpacked
        const storedItems = JSON.parse(window.sessionStorage.getItem('storedItems'))
        const updateRequest = order.request.find(req => req._id == request._id)
        var allItemsArePacked = true
        storedItems.map(item => {
            const itemPacked = packed.find(i => i._id == item._id && i.req_id == request._id)
            if (item.qty !== itemPacked.qty) allItemsArePacked = false
        })

        if (allItemsArePacked) {

            if (assignment.type === 'Request' || assignment.type === 'Cart') {
                if (updateRequest.type === 'Prepare' || updateRequest.type === 'Place') {
                    updateRequest.cart.status = 'Packed' // cart status set packed
                    const index = order.request.indexOf(request)
                    order.request.map(req => { // cancel request? => cart.status = unpacked
                        if (req.type === 'Cancel' && (req.modifiedRequestNum === index + 1) && req.status !== 'Completed' && req.status !== 'Rejected') {
                            req.cart.status = 'Unpacked'
                        }
                    })
                } else if (updateRequest.type === 'Cancel' || updateRequest.type === 'Return')
                    updateRequest.cart.status = 'Unpacked'

            } else if (assignment.type === 'Payment' || assignment.type === 'Delivery') {
                // delivery charge selected
                // payment charge selected
                // items selected
            }

        } else {
            assignment.type === 'Cart' && setActionNote('Check all items to set cart completed')
            assignment.type === 'Payment' && setActionNote('Check all items to set payment completed')
            assignment.type === 'Delivery' && setActionNote('Check all items to set order completed')
            actionNoteHandler()
        }
        setModelVisible(false)
        // items in edit form are modified due to cancel requests => reset values to its original ones
        const activeOrders = JSON.parse(window.sessionStorage.getItem('activeOrders'))
        const activeOrder = activeOrders.find(ord => order._id == ord._id)
        const activeRequest = activeOrder.request.find(req => request._id == req._id)
        const selectedRequest = order.request.find(req => req._id == request._id)
        selectedRequest.cart.items = activeRequest.cart.items
        selectedRequest.amount = activeRequest.amount
        selectedRequest.payment.charge = activeRequest.payment.charge
        selectedRequest.delivery.charge = activeRequest.delivery.charge

        dispatch(saveOrder({
            ...order, req_id: request._id, command,
            assignedBy: employee.firstName + ' ' + employee.lastName,
        }))
        setCommand(undefined)
    }

    const searchItem = async (e) => {
        e.preventDefault()
        searchKeyword &&
            await dispatch(detailsProduct({ searchKeyword: searchKeyword }))
        setSearchKeyword('')
        setProductsListVisible(true)
    }

    const handleMinus = (e, item, itemType) => {
        e.preventDefault()
        if (request.cart.status === 'Packed' || request.cart.status === 'Unpacked') {
            setActionNote("You can't edit cart after it is " + request.cart.status + '!')
            actionNoteHandler()
            return
        }
        const conditions = (i) => { return i._id == item._id && i.req_id == request._id }
        // check if product is packed
        const productPacked = packed.find(i => conditions(i)) || false
        // if product is set packed => remove 1 item from qty
        item.qty = item.qty - 1
        if (item.qty === 0) {
            if (itemType !== 'canceled')
                request.cart.items = request.cart.items.filter(i => i._id !== item._id)
            else setCanceledItemList(canceledItemList.filter(i => i._id !== item._id))
        }

        if (productPacked) {
            if (itemType !== 'canceled') {
                if (productPacked.qty === 1) {
                    dispatch(packItems(packed.filter(i => !conditions(i))))
                } else {
                    productPacked.qty = productPacked.qty - 1
                    dispatch(packItems(packed))
                }
            } else {
                if (itemType === 'canceled' || item.qty > 0) {
                    productPacked.qty = productPacked.qty + 1
                    dispatch(packItems(packed))
                }
            }
        }

        cancelItem(item, itemType)
    }

    const handlePlus = (e, item, itemType) => {
        e.preventDefault()
        if (request.cart.status === 'Packed' || request.cart.status === 'Unpacked') {
            setActionNote("You can't edit cart after it is " + request.cart.status + '!')
            actionNoteHandler()
            return
        }
        const conditions = (i) => { return i._id == item._id && i.req_id == request._id }
        // check if product is packed
        const productPacked = packed.find(i => conditions(i)) || false
        const storedItems = JSON.parse(window.sessionStorage.getItem('storedItems'))
        const storedItem = storedItems.find(i => i._id == item._id)
        if (storedItem && storedItem.qty === item.qty) {
            setActionNote("You can't add more than " + storedItem.qty + storedItem.unit)
            actionNoteHandler()
            return
        }

        if (productPacked && storedItem) {
            if (productPacked.qty === storedItem.qty) {
                setActionNote("You can't add more than " + item.qty + item.unit)
                actionNoteHandler()
                return
            } else if (productPacked.qty < storedItem.qty) {
                if (itemType !== 'canceled')
                    productPacked.qty = productPacked.qty + 1
                else
                    productPacked.qty = productPacked.qty - 1
                if (productPacked.qty === 0)
                    dispatch(packItems(packed.filter(i => !conditions(i))))
                else dispatch(packItems(packed))
            }
        }

        if (item.qty <= storedItem.qty)
            item.qty = item.qty + 1
        cancelItem(item, itemType)
    }

    const setTotalCharges = (order, request) => {
        // place/prepare request ? decrease amount
        if (request.type === 'Place' || request.type === 'Prepare') {
            const selectedRequestIndex = order.request.indexOf(request)
            const cancelRequests = order.request.filter(req =>
                req.type === 'Cancel' && req.modifiedRequestNum === selectedRequestIndex + 1 &&
                req.status !== 'Canceled' && req.status !== 'Rejected') || []

            if (cancelRequests.length > 0) {
                cancelRequests.map(req => {
                    request.payment.charge = request.payment.charge + req.payment.charge
                    if (req.delivery && request.delivery)
                        request.delivery.charge = request.delivery.charge + req.delivery.charge
                    //request.amount = request.amount + req.amount
                })
            }
        }
    }

    const setItemsMaxQty = (order, request) => {
        const selectedOrder = JSON.parse(window.sessionStorage.getItem('activeOrders'))
            .find(o => o._id == order._id)
        const selectedReq = selectedOrder.request.find(req => req._id == request._id)
        var storedItems = selectedReq.cart.items.map(i => { return i })
        // Note: storedItem.qty is considered the max.qty
        // decrease the canceled qty from the storedItem.qty according to existing cancel requests
        const selectedRequestIndex = order.request.indexOf(request)
        const cancelRequests = order.request.filter(req =>
            req.type === 'Cancel' && req.modifiedRequestNum === selectedRequestIndex + 1 &&
            req.status !== 'Canceled' && req.status !== 'Rejected') || []

        if (cancelRequests.length > 0) {
            cancelRequests.map(req => {
                req.cart.items.map(i => {
                    const storedItem = storedItems.find(item => item._id == i._id)
                    storedItem.qty = storedItem.qty - i.qty
                    if (storedItem.qty === 0) {
                        storedItems = storedItems.filter(item => item._id !== i._id)
                    }
                })
            })
        }
        window.sessionStorage.setItem('storedItems', JSON.stringify(storedItems))
        request.cart.items.map(i => {
            const storedItem = storedItems.find(item => item._id == i._id) || undefined
            if (storedItem)
                i.qty = storedItem.qty
            else i.qty = 0
        })
        request.cart.items = request.cart.items.filter(item => item.qty !== 0)
        // if cart.status === Packed/unpacked => set items packed
        if (selectedReq.cart.status === 'Packed' || selectedReq.cart.status === 'Unpacked') {
            var updatePacked = packedItems
            request.cart.items.map(item => {
                const itemPacked = updatePacked.find(i => i.req_id == request._id && i._id == item._id)
                if (itemPacked) itemPacked.qty = item.qty
                else updatePacked = [...updatePacked, { req_id: request._id, _id: item._id, qty: item.qty }]
            })
            dispatch(packItems(updatePacked))
        }
    }

    const dueDate = (ass, request) => {
        var date
        if (ass.type === 'Request') date = request.creation_date
        else if (ass.type === 'Cart') date = request.cart.prepareOn
        else if (ass.type === 'Payment') date = request.payment.collectOn
        else if (ass.type === 'Delivery') date = request.delivery.deliverOn
        return date
    }

    const setItemPacked = (e, packed) => {
        e.preventDefault()
        dispatch(packItems(packed))
    }

    const showHidden = (e, ass_id) => {
        e.preventDefault()
        setHidden(hidden.filter(_id => _id !== ass_id))
    }

    const PackedItems = (_id, item, method, e) => {
        const itemPacked = packed.find(i => i._id == item._id && i.req_id == request._id)

        if (method === 'find') {
            return itemPacked

        } else if (method === 'filter') {
            if (request.cart.status === 'Packed' || request.cart.status === 'Unpacked') {
                setActionNote("You can't deselect item after cart is " + request.cart.status + '!')
                actionNoteHandler()
                return
            } else if (itemPacked) {
                setItemPacked(e, packed.filter(i =>
                    i._id !== item._id && i.req_id == request._id))
                //item.qty = item0.qty

            } else
                setItemPacked(e, [...packed, { req_id: request._id, _id: item._id, qty: item.qty }])
        }
    }

    const canceledItemsQty = () => {
        var qty = 0
        canceledItemList.length > 0 &&
            canceledItemList.map(i => {
                qty = qty + i.qty
            })
        return qty
    }

    const cancelItem = (item, itemType) => {
        const storedItems = JSON.parse(window.sessionStorage.getItem('storedItems'))
        const storedItem = storedItems.find(i => i._id == item._id) // is qty stored

        const itemExist = itemType === 'canceled'
            ? request.cart.items.find(i => i._id == item._id)
            : canceledItemList.find(i => i._id == item._id)

        if (storedItem.qty === item.qty) {
            if (itemExist)
                if (itemType === 'canceled')
                    request.cart.items = request.cart.items.filter(i => i._id !== item._id)
                else setCanceledItemList(canceledItemList.filter(i => i._id !== item._id))

        } else if (storedItem.qty > item.qty) {
            storedItem.qty = storedItem.qty - item.qty

            if (itemType === 'canceled') {
                if (itemExist)
                    itemExist.qty = storedItem.qty
                else request.cart.items.push(storedItem)

            } else {
                if (itemExist) itemExist.qty = storedItem.qty
                else canceledItemList.push(storedItem)

                setCanceledItemList(canceledItemList)
            }
        }
    }

    const showCancelRequestForm = async () => {
        if (requestFormVisible)
            setRequestFormVisible(false)
        else {
            setRequestFormVisible(true)
            var d = Date.now() + 7200000
            setReceiptNum('RE-' + d)
            setRequestType('Cancel')
            setRequestStatus('Pending')
            order.request.map(req => {
                if (request._id == req._id) {
                    setModifiedRequestNum(order.request.indexOf(req) + 1)
                    return
                }
            })
            setRequestId(undefined)
            setPaymentStatus('Pending')
            setCollectOn(date()) //here it is refund on
            setPaymentTitle('Cancel Payment')
            setPaymentType(request.payment.type)
            // get payment description of cancel payment
            var payment = await paymentList.find(pay => pay.title === 'Cancel Payment')
            if (payment) {
                setPaymentValues(payment)
                setPaymentDescription(payment.description)
            }
            // payment charge is remaining
            setCartStatus('Pending')
            setPrepareOn(date()) // in this case unpack on
            // set canceled Items
            ////////////////////////////
            /*setDeliveryStatus('Pending')
            setDeliverOn(request.delivery.deliverOn)
            setDeliveryTitle()
            setDeliveryValues()*/

            const selectedOrder = JSON.parse(window.sessionStorage.getItem('activeOrders'))
                .find(o => o._id == order._id)
            const selectedReq = selectedOrder.request.find(req => req._id == request._id)
            setItemsQty(selectedReq.cart.items)

            setRequestNum(selectedOrder.request.indexOf(selectedReq) + 1)
            setRequestIndex(selectedOrder.request.length)
            setRequestList(selectedOrder.request)
        }
    }

    const addRequestHandler = (e) => {
        e.preventDefault()
        // add note for cancelation
        const paymentCharge = paymentCalc(paymentValues, paymentType, canceledItemList, requestType)
        const deliveryCharge = deliveryCalc(deliveryValues, canceledItemList, requestType, itemsQty, requestList, requestNum, requestIndex)
        const requestAmount = totalAmountCalc(canceledItemList, deliveryCharge, paymentCharge, paymentValues, requestList, requestType, paymentType, itemsQty, requestNum, requestIndex, deliveryValues)

        if (qtyCalc(canceledItemList) > 0) {
            requestList[requestIndex] = {
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
                    charge: paymentCharge,
                },

                cart: {
                    status: cartStatus,
                    prepareOn: prepareOn,
                    items: canceledItemList,
                    qty: qtyCalc(canceledItemList),
                    amount: cartAmountCalc(canceledItemList, requestType),
                    discountAmount: discountCalc(canceledItemList, requestType),
                },

                amount: requestAmount,
                receiptNum: receiptNum,
            }

            if (requestType !== 'Prepare' && requestList[0].type !== 'Prepare' && requestType !== 'Cancel')
                requestList[requestIndex].delivery = {
                    status: deliveryStatus,
                    deliverOn: deliverOn,
                    title: deliveryTitle,
                    //type: deliveryType,
                    duration: deliveryValues && (deliveryValues.duration + ' ' + deliveryValues.timeFormat),
                    charge: deliveryCharge,
                }
            console.log(order.request)
            order.request = requestList
            dispatch(saveOrder(order))

        }
    }

    return (
        <div>
            {actionNoteVisible && <div className="action-note">
                <div>{actionNote}</div>
            </div>}
            <div className="control-page-header relative">
                <h3 className="header-title">Assignment Manager</h3>
                <button type="button" className="header-button show-ass"
                    onClick={e => hiddenListVisible
                        ? setHiddenListVisible(false)
                        : setHiddenListVisible(true)}
                    disabled={hidden.length === 0}>
                    Hidden
                    <div className='ass-count'>{hidden.length}</div>
                </button>
                {hiddenListVisible && hidden.length > 0 &&
                    <div className='hidden-list'>
                        {hidden.map(_id => {
                            const assignment = assignments.find(ass => ass._id == _id)
                            return (<div className='hidden-ass-line' key={assignment._id}>
                                <FontAwesomeIcon icon={faEye} className='faEye'
                                    onClick={e => showHidden(e, assignment._id)}
                                    data-tip data-for={assignment._id} />
                                <ReactTooltip id={assignment._id} place="top" effect="float">Show</ReactTooltip>
                                <div className='hidden-ass-type'>{assignment.type}</div>
                                <div className='hidden-ass-status'>{assignment.status}</div>
                            </div>)
                        })
                        }
                    </div>}
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ textAlign: 'center', width: '4rem' }}>Active</th>
                        <th style={{ width: '10rem' }}>Due Date</th>
                        <th style={{ width: '12rem' }}>Customer</th>
                        <th style={{ width: '10rem' }}>Request</th>
                        <th style={{ width: '10rem' }}>Assignment</th>
                        <th className='align-width width-6rem align-right'>Amount</th>
                        <th style={{ width: '20rem' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {assignments.length > 0 &&
                        assignments.map(ass => {
                            var request, order
                            orders && orders.map(order0 => {
                                if (request) return
                                request = order0.request.find(req => req._id == ass.req_id || req.receiptNum == ass.receiptNum) || undefined
                                order = order0
                            })
                            request && RequestStatus(ass, request, order)
                            const isHidden = hidden.find(_id => _id == ass._id) || false
                            if (request && statusApproved(ass, request) && handlerApproved(ass) && !isHidden)
                                return (<tr key={ass._id} className={ass.onHold && ass.type !== 'Request' ? 'ass-onhold' : ''}>
                                    <td style={{ textAlign: 'center' }}>
                                        <FontAwesomeIcon
                                            className={`${ass.status !== 'Unassigned' ? 'faCircle' : 'farCircle'}`}
                                            icon={faCircle} />
                                    </td>
                                    <td data-tip data-for={ass._id + 'due-date'}>
                                        {dayConverter(dueDate(ass, request))}
                                        <ReactTooltip id={ass._id + 'due-date'} place="top" effect="float">
                                            {creationDatePrettier(dueDate(ass, request))}
                                        </ReactTooltip>
                                    </td>
                                    <td data-tip data-for={ass._id + 'name'}>{order.name}
                                        <ReactTooltip id={ass._id + 'name'} place="top" effect="float" className='width-30rem'>
                                            {'Phone# ' + order.phone}<br />
                                            {'Address: ' + (order.deliveryAddress || order.paymentAddress)}
                                        </ReactTooltip>
                                    </td>
                                    <td>{request.type + ' Order : '}<br />{(ass.type === 'Request'
                                        ? request.status : ass.type === 'Cart'
                                            ? request.cart.status : ass.type === 'Payment'
                                                ? request.payment.status : ass.type === 'Delivery' && request.delivery.status)
                                    }</td>
                                    <td>{ass.type + ' : '}<br />{ass.status}</td>
                                    <td style={{ textAlign: 'end', paddingRight: '0.8rem' }}>{order.amount + ' $'}</td>
                                    <td className='td-selects'>{
                                        (ass.status === 'Unassigned' || ass.status === 'Assigned' || ass.status === 'Pending') ?
                                            (ass.employeeId ?
                                                <select
                                                    value={ass.setReqStatus || 'Accepted'}
                                                    onChange={e => {
                                                        ass.setReqStatus = e.target.selectedIndex ?
                                                            e.target.options[e.target.selectedIndex].value :
                                                            e.target.value
                                                    }}>
                                                    <option value='Accepted'>Accept</option>
                                                    <option value='Rejected'>Reject</option>
                                                </select>
                                                : <button className='accept-btn'>Accept</button>)
                                            : (ass.status === 'Canceled' || ass.status === 'Rejected') ? ''
                                                : ass.type === 'Request' ?
                                                    ass.onHold ?
                                                        <button className='accept-btn'>Progress</button>
                                                        : <select
                                                            value={ass.setReqStatus || 'Confirmed'}
                                                            onChange={e => {
                                                                ass.setReqStatus = e.target.selectedIndex ?
                                                                    e.target.options[e.target.selectedIndex].value :
                                                                    e.target.value
                                                            }}>
                                                            {request.status !== 'Confirmed' &&
                                                                <option value='Confirmed'>Confirmed</option>}
                                                            <option value='Completed'>Completed</option>
                                                            <option value='on Hold'>on Hold</option>
                                                            <option value='Canceled'>Canceled</option>
                                                            <option value='Rejected'>Rejected</option>
                                                        </select> : ass.type === 'Cart' ?
                                                        ass.onHold ?
                                                            <button className='accept-btn'>Progress</button>
                                                            : <select
                                                                value={ass.setReqStatus || 'Packing'}
                                                                onChange={e => {
                                                                    ass.setReqStatus = e.target.selectedIndex ?
                                                                        e.target.options[e.target.selectedIndex].value :
                                                                        e.target.value
                                                                }}>
                                                                {request.cart.status !== 'Packing' &&
                                                                    <option value='Packing'>Packing</option>}
                                                                <option value='Packed'>Packed</option>
                                                                <option value='on Hold'>Hold on</option>
                                                                <option value='Unpacked'>Unpacked</option>
                                                            </select> : ass.type === 'Payment' ?
                                                            ass.onHold ?
                                                                <button className='accept-btn'>Progress</button>
                                                                : <select
                                                                    value={ass.setReqStatus || 'Collected'}
                                                                    onChange={e => {
                                                                        ass.setReqStatus = e.target.selectedIndex ?
                                                                            e.target.options[e.target.selectedIndex].value :
                                                                            e.target.value
                                                                    }}>
                                                                    <option value='Collected'>Collected</option>
                                                                    <option value='on Hold'>Hold on</option>
                                                                    <option value='Uncollected'>Uncollected</option>
                                                                    <option value='Refunded'>Refunded</option>
                                                                </select> : ass.type === 'Delivery' &&
                                                                    ass.onHold ?
                                                                <button className='accept-btn'>Progress</button>
                                                                : <select
                                                                    value={ass.setReqStatus || 'On Road'}
                                                                    onChange={e => {
                                                                        ass.setReqStatus = e.target.selectedIndex ?
                                                                            e.target.options[e.target.selectedIndex].value :
                                                                            e.target.value
                                                                    }}>
                                                                    {request.delivery.status !== 'On Road' &&
                                                                        <option value='On Road'>on Road</option>}
                                                                    <option value='Delivered'>Delivered</option>
                                                                    <option value='on Hold'>Hold on</option>
                                                                    <option value='Undelivered'>Undelivered</option>
                                                                    <option value='Returned'>Returned</option>
                                                                </select>}
                                        <button onClick={e => statusHandler(e, request, order, ass)}
                                            className='button set-btn'>Save
                                            </button>
                                        <button onClick={e => editHandler(e, request, order, ass)}
                                            className='button set-btn secondary'>Edit
                                            </button>
                                        <button onClick={e => hideAssingment(e, ass)}
                                            className='button set-btn secondary'><FontAwesomeIcon icon={faEyeSlash} />
                                        </button>
                                    </td>
                                </tr>)
                        })}
                </tbody>
            </table>
            {modelVisible &&
                <form className="form-form" onSubmit={(e) => submitHandler(e)}>
                    <ul className="form-container-manager">
                        <FontAwesome name="fa-window-close" className="far fa-window-close fa-lg" onClick={() => {
                            setModelVisible(false)
                            setCanceledItemList([])
                            dispatch(backupActiveOrders())
                            window.sessionStorage.removeItem('storedItems')
                        }} />
                        <li>
                            <h2>{formAction == 'Copy' ? 'Create' : formAction} Assignment</h2>
                        </li>
                        {assignment.type === 'Request' && <li>
                            <label className="label">Handlers</label>
                            <div className='status-container border-padding'>
                                {order && order.assignment.map(ass => (
                                    (ass.req_id == request._id || ass.receiptNum == request.receiptNum) && !ass.closedDate &&
                                    <div className='status-flex' key={ass._id}>
                                        <label className='label line-des'>{ass.type}</label>
                                        <div className='select-confirmation employee-name-dorpdown'>
                                            <select
                                                value={ass.employeeId || ''}
                                                onChange={(e) => {
                                                    ass.employeeId =
                                                        e.target.selectedIndex ?
                                                            e.target.options[e.target.selectedIndex].value :
                                                            e.target.value
                                                    var assignedHandler = handlers.find(hand => hand._id === ass.employeeId)
                                                    if (assignedHandler) ass.employeeName = assignedHandler.firstName + ' ' + assignedHandler.lastName
                                                    else ass.employeeName = ''
                                                    setCommand('Update Handlers')
                                                }}>
                                                {ass.employeeId &&
                                                    <option value={ass.employeeId}>
                                                        {ass.employeeName}
                                                    </option>}
                                                {handlers
                                                    && handlers.map(handler => (handler._id != ass.employeeId &&
                                                        (ass.type === 'Request' ? handler.requestHandler : ass.type === 'Cart' ? handler.cartHandler : ass.type === 'Payment' ? handler.paymentHandler : ass.type === 'Delivery' && handler.deliveryHandler) &&
                                                        <option key={handler._id} value={handler._id}>
                                                            {handler.firstName + ' ' + handler.lastName}
                                                        </option>
                                                    ))}
                                                <option value={''}>
                                                    Unassigned...
                                                </option>
                                            </select>
                                        </div>
                                    </div>))}
                            </div>
                        </li>}
                        {assignment.type === 'Request' &&
                            <li className='margin-top-1rem'>
                                <label className="label">Status</label>
                                <div className='status-container border-padding'>
                                    <div className='status-flex'>
                                        <label className='label line-des'>Request</label>
                                        <div className='select-confirmation'>
                                            <select
                                                value={request.status}
                                                onChange={(e) => {
                                                    request.status =
                                                        e.target.selectedIndex ?
                                                            e.target.options[e.target.selectedIndex].value :
                                                            e.target.value
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
                                        <label className='label line-des'>Cart</label>
                                        <div className='select-confirmation'>
                                            <select
                                                value={request.cart.status}
                                                onChange={(e) => {
                                                    request.cart.status =
                                                        e.target.selectedIndex ?
                                                            e.target.options[e.target.selectedIndex].value :
                                                            e.target.value
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
                                    {request.type !== 'Prepare' && request.delivery &&
                                        <div className='status-flex'>
                                            <label className='label line-des'>Delivery</label>
                                            <div className='select-confirmation'>
                                                <select
                                                    value={request.delivery.status}
                                                    onChange={(e) => {
                                                        request.delivery.status =
                                                            e.target.selectedIndex ?
                                                                e.target.options[e.target.selectedIndex].value :
                                                                e.target.value
                                                    }}>
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
                                        <label className='label line-des'>Payment</label>
                                        <div className='select-confirmation'>
                                            <select
                                                value={request.payment.status}
                                                onChange={(e) => {
                                                    request.payment.status =
                                                        e.target.selectedIndex ?
                                                            e.target.options[e.target.selectedIndex].value :
                                                            e.target.value
                                                }}>
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
                            </li>}
                        {canceledItemList.length > 0 &&
                            <li>
                                <div className='flex-align'>
                                    <FontAwesomeIcon
                                        onClick={() => showCancelRequestForm()}
                                        className='cursor-color-margin fa-lg'
                                        icon={faPlus} />
                                    <div>Place Cancel Request
                                        {' (' + canceledItemsQty() +
                                            (canceledItemsQty() === 1 ? ' item)' : ' items)')}
                                    </div>
                                </div>
                                {requestFormVisible && canceledItemList.length > 0 &&
                                    <div className='cancel-req'>
                                        {canceledItemList.map(item => (
                                            <div key={'item' + canceledItemList.indexOf(item)}
                                                className='border-padding back-white border-red'>
                                                {item.discount > 0 &&
                                                    <div className='product-discount order-discount'>
                                                        <div>{item.discount}</div>
                                                        <div>%</div>
                                                    </div>}
                                                <div className='cart-list-items cart-list-order'>
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
                                                    </div>
                                                    <div className='cart-btns cart-btns-order'>
                                                        <button
                                                            type="button"
                                                            className="plus plus-cart plus-cart-order"
                                                            value={item._id}
                                                            onClick={(e) => handlePlus(e, item, 'canceled')}>
                                                            <FontAwesome name='fa-plus' className="fas fa-plus" />
                                                        </button>
                                                        <p className="add-to-cart-qty float-bottom count count-order">{item.qty}</p>
                                                        <button
                                                            type="button"
                                                            className="minus minus-cart minus-cart-order"
                                                            value={item._id}
                                                            onClick={(e) => handleMinus(e, item, 'canceled')}>
                                                            <FontAwesome name='fa-minus' className="fas fa-minus" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>))}
                                        <button type="button" className="button width"
                                            onClick={e => addRequestHandler(e)}>Submit</button>
                                        <button type="button" className="button secondary width"
                                            style={{ marginTop: '1rem' }}
                                            onClick={e => setRequestFormVisible(false)}>Close</button>
                                    </div>}
                            </li>}
                        <li>
                            <label className="label" htmlFor="searchKeyword">
                                {(request.type === 'Cancel' ? 'Canceled ' : '') + 'Cart Items'}
                                <p className="required">*</p>
                            </label>
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
                            </div>
                            {request.cart.items &&
                                request.cart.items.map((item) => (
                                    item && item.qty > 0 &&
                                    <div key={'item' + request.cart.items.indexOf(item)}
                                        className={'border-padding back-white' +
                                            (PackedItems(_id, item, 'find') ? (request.type === 'Cancel'
                                                ? ' red-border ' : ' green-border ') : '')}>
                                        {item.discount > 0 &&
                                            <div className='product-discount order-discount'>
                                                <div>{item.discount}</div>
                                                <div>%</div>
                                            </div>}
                                        <div className='cart-list-items cart-list-order'>
                                            <div className={'packed-btn' + (PackedItems(_id, item, 'find') ? ' packed-background' : '')}
                                                onClick={e => PackedItems(_id, item, 'filter', e)}>
                                                {PackedItems(_id, item, 'find') &&
                                                    <FontAwesomeIcon icon={faCheckCircle}
                                                        className={'fa-2x' + (PackedItems(_id, item, 'find')
                                                            ? (request.type === 'Cancel' ? ' red ' : ' green ') : '')} />}
                                            </div>
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
                                            </div>
                                            <div className='cart-btns cart-btns-order'>
                                                <button
                                                    type="button"
                                                    className="plus plus-cart plus-cart-order"
                                                    value={item._id}
                                                    onClick={(e) => handlePlus(e, item)}>
                                                    <FontAwesome name='fa-plus' className="fas fa-plus" />
                                                </button>
                                                <p className="add-to-cart-qty float-bottom count count-order">{
                                                    PackedItems(_id, item, 'find')
                                                        ? PackedItems(_id, item, 'find').qty
                                                        : item.qty
                                                }</p>
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
                        </li>
                        <li>
                            <label className="label">Charges</label>
                            <div className='status-container border-padding'>
                                <div className='status-flex'>
                                    <label className='label line-des'>Total Amount</label>
                                    <div className='select-confirmation employee-name-dorpdown select-width'>
                                        <select defaultValue={order.amount}>
                                            <option>{order.amount} $</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='status-flex'>
                                    <label className='label line-des'>Payment Charge</label>
                                    <div className='select-confirmation employee-name-dorpdown select-width'>
                                        <select defaultValue={request.payment.charge}>
                                            <option>{request.payment.charge} $</option>
                                        </select>
                                    </div>
                                </div>
                                {request.delivery && <div className='status-flex'>
                                    <label className='label line-des'>Delivery Charge</label>
                                    <div className='select-confirmation employee-name-dorpdown select-width'>
                                        <select defaultValue={request.delivery.charge}>
                                            <option>{request.delivery.charge} $</option>
                                        </select>
                                    </div>
                                </div>}
                            </div>
                        </li>
                        <li>
                            {formAlertVisible && <div className="invalid">{formAlert}</div>}
                            <button type="submit" className="button primary">
                                {
                                    formAction == 'Copy' ? 'Create' :
                                        formAction == 'Update' ? 'Save' : formAction
                                }
                            </button>
                            <button type="button" className="button secondary" onClick={() => {
                                setModelVisible(false)
                                setCanceledItemList([])
                                dispatch(backupActiveOrders())
                                window.sessionStorage.removeItem('storedItems')
                            }}>
                                Back
                            </button>
                        </li>
                    </ul>
                </form>
            }
        </div >
    );
}

export default AssignmentManager;
