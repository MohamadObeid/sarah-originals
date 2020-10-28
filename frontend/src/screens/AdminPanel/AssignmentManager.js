import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveAssignment } from "../../actions/assignmentActions"
import { creationDatePrettier, dayConverter, timeDiffCalc } from "../../methods/methods";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faEdit, faPaperPlane, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import { listActiveOrders, saveOrder } from "../../actions/orderActions";

function AssignmentManager(props) {
    const imageUrl = window.location.origin + '/api/uploads/image/'
    const d = new Date()
    const [timeOut, setTimeOut] = useState()
    const [actionNoteVisible, setActionNoteVisible] = useState()
    const [actionNote, setActionNote] = useState()
    const [formAction, setFormAction] = useState()
    const [modelVisible, setModelVisible] = useState()
    const [formAlertVisible, setFormAlertVisible] = useState()

    const [active, setActive] = useState()
    const [_id, setId] = useState()
    const [orderId, setOrderId] = useState()
    const [type, setType] = useState()
    const [dueDate, setDueDate] = useState()
    const [status, setStatus] = useState()
    const [note, setNote] = useState()
    const [closedDate, setClosedDate] = useState()
    const [assigned, setAssigned] = useState()

    const { orders } = useSelector(state => state.orderList)
    const { success: successSave, order } = useSelector(state => state.orderSave)
    const { success: successDelete } = useSelector(state => state.orderDelete)
    const { userInfo } = useSelector(state => state.userSignin)
    //const { order } = useSelector(state => state.orderDetails)
    const { employee } = useSelector(state => state.employeeDetails)
    const { time } = useSelector(state => state.clock)

    const dispatch = useDispatch()
    useEffect(() => {
        if (successSave || successDelete) {
            if (order._id) {
                dispatch(listActiveOrders())
                setActionNote(`Assignment ${formAction} succefully`)
                setFormAction('Updated')
                setFormAlertVisible(false)
                modelVisible && setModelVisible(false)
            } else setActionNote(order)
            dispatch(saveOrder('clear'))
            setActionNoteVisible(true)
            clearTimeout(timeOut)
            setTimeOut(setTimeout(() => setActionNoteVisible(false), 6000))
        }
        console.log(orders)
    }, [successSave, successDelete, orders])

    const statusHandler = (e, request, order, ass, status, type) => {
        e.preventDefault()

        if (type === 'Assignment') {
            setFormAction(status)
            dispatch(saveOrder({
                _id: order._id, req_id: request._id, ass_id: ass._id,
                employeeName: employee.firstName + ' ' + employee.lastName,
                employeeId: employee._id, status, type
            }))
        }
    }

    return (
        <div>
            {actionNoteVisible && <div className="action-note">
                <div>{actionNote}</div>
            </div>}
            <div className="control-page-header">
                <h3 className="header-title">Assignment Manager</h3>
                {/*<button type="button" className="header-button" onClick={() => createHandler()}>Create Order</button>*/}
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ textAlign: 'center', width: '4rem' }}>Active</th>
                        <th style={{ width: '8rem' }}>Time</th>
                        <th style={{ width: '12rem' }}>Customer</th>
                        <th style={{ width: '6rem' }}>Request</th>
                        <th style={{ width: '6rem' }}>Assignment</th>
                        <th style={{ width: '5rem' }}>Status</th>
                        <th style={{ width: '10rem' }}>Due Date</th>
                        <th className='align-width width-6rem align-right'>Amount</th>
                        <th style={{ width: '16rem' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.length > 0 &&
                        orders.map(order => (
                            order.assignment.length > 0 &&
                            order.assignment.map(ass => {
                                const request = order.request.find(req => req._id == ass.req_id || req.receiptNum == ass.receiptNum)
                                if (ass.status !== 'Canceled' && ass.status !== 'Rejected' && ass.status !== 'Completed')
                                    return (<tr key={ass._id}>
                                        <td style={{ textAlign: 'center' }}>
                                            <FontAwesomeIcon
                                                className={`${ass.status !== 'Unassigned' ? 'faCircle' : 'farCircle'}`}
                                                icon={faCircle} />
                                        </td>
                                        <td data-tip data-for={ass._id + 'date'}>
                                            {dayConverter(ass.date)}
                                            <ReactTooltip id={ass._id + 'date'} place="top" effect="float">
                                                {creationDatePrettier(ass.date)}
                                            </ReactTooltip>
                                        </td>
                                        <td data-tip data-for={ass._id + 'name'}>{order.name}
                                            <ReactTooltip id={ass._id + 'name'} place="top" effect="float" className='width-30rem'>
                                                {'Phone# ' + order.phone}<br />
                                                {'Address: ' + order.deliveryAddress}
                                            </ReactTooltip>
                                        </td>
                                        <td>{request.type}</td>
                                        <td>{ass.type}</td>
                                        <td>{ass.status}</td>
                                        <td>{
                                            (ass.type === 'Request' && request.delivery) ? creationDatePrettier(request.delivery.deliverOn)
                                                : (ass.type === 'Request' && !request.delivery) ? creationDatePrettier(request.cart.prepareOn)
                                                    : (ass.type === 'Cart') ? creationDatePrettier(request.cart.prepareOn)
                                                        : (ass.type === 'Payment') ? creationDatePrettier(request.payment.collectOn)
                                                            : (ass.type === 'Delivery') && creationDatePrettier(request.delivery.deliverOn)
                                        }</td>
                                        <td style={{ textAlign: 'end', paddingRight: '0.4rem' }}>{request.amount + ' $'}</td>
                                        <td>{(ass.status === 'Unassigned' || ass.status === 'Assigned' || ass.status === 'Pending') ? (
                                            <div className='flex-center'>
                                                <button className="table-btns" onClick={(e) => statusHandler(e, request, order, ass, 'Accepted', 'Assignment')}>Accept</button>
                                                <button className="table-btns" onClick={(e) => statusHandler(e, request, order, ass, 'Accepted', 'Assignment')}>Reject</button>
                                            </div>) : (ass.status === 'Canceled' || ass.status === 'Rejected') ? ''
                                                : ass.type === 'Request' ? (
                                                    <div className='flex-center'>
                                                        <button className="table-btns" onClick={(e) => statusHandler(e, request, order, ass, 'Confirmed', 'Request')}>Confirm</button>
                                                        <button className="table-btns" onClick={(e) => statusHandler(e, request, order, ass, 'Completed', 'Request')}>Complete</button>
                                                        <button className="table-btns" onClick={(e) => statusHandler(e, request, order, ass, 'on Hold', 'Request')}>Hold on</button>
                                                        <button className="table-btns" onClick={(e) => statusHandler(e, request, order, ass, 'Rejected', 'Request')}>Reject</button>
                                                        <button className="table-btns" onClick={(e) => statusHandler(e, request, order, ass, 'Canceled', 'Request')}>Cancel</button>
                                                    </div>)
                                                    : ass.type === 'Cart' ? (
                                                        <div className='flex-center'>
                                                            <button className="table-btns" onClick={(e) => statusHandler(e, request, order, ass, 'Packing', 'Cart')}>Packing</button>
                                                            <button className="table-btns" onClick={(e) => statusHandler(e, request, order, ass, 'Packed', 'Cart')}>Packed</button>
                                                            <button className="table-btns" onClick={(e) => statusHandler(e, request, order, ass, 'on Hold', 'Cart')}>Hold on</button>
                                                            <button className="table-btns" onClick={(e) => statusHandler(e, request, order, ass, 'Unpacked', 'Cart')}>Unpacked</button>
                                                        </div>)
                                                        : ass.type === 'Payment' ? (
                                                            <div className='flex-center'>
                                                                <button className="table-btns" onClick={(e) => statusHandler(e, request, order, ass, 'Collected', 'Payment')}>Collected</button>
                                                                <button className="table-btns" onClick={(e) => statusHandler(e, request, order, ass, 'on Hold', 'Payment')}>Hold on</button>
                                                                <button className="table-btns" onClick={(e) => statusHandler(e, request, order, ass, 'Uncollected', 'Payment')}>Uncollected</button>
                                                                <button className="table-btns" onClick={(e) => statusHandler(e, request, order, ass, 'Refunded', 'Payment')}>Refunded</button>
                                                            </div>)
                                                            : ass.type === 'Delivery' && (
                                                                <div className='flex-center'>
                                                                    <button className="table-btns" onClick={(e) => statusHandler(e, request, order, ass, 'On Road', 'Delivery')}>On Road</button>
                                                                    <button className="table-btns" onClick={(e) => statusHandler(e, request, order, ass, 'Delivered', 'Delivery')}>Delivered</button>
                                                                    <button className="table-btns" onClick={(e) => statusHandler(e, request, order, ass, 'on Hold', 'Delivery')}>Hold on</button>
                                                                    <button className="table-btns" onClick={(e) => statusHandler(e, request, order, ass, 'Undelivered', 'Delivery')}>Undelivered</button>
                                                                    <button className="table-btns" onClick={(e) => statusHandler(e, request, order, ass, 'Returned', 'Delivery')}>Returned</button>
                                                                </div>)
                                        }</td>
                                    </tr>)
                            })
                        ))}
                </tbody>
            </table>
        </div >
    );
}

export default AssignmentManager;
