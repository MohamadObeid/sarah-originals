import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleOrderScreen, savePaymentMethod } from "../../actions/orderActions";
import FontAwesome from 'react-fontawesome';
import CheckoutSteps from "../Components/CheckoutSteps";

function Payment() {
    const [alertVisbile, setAlertVisible] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState();
    const [subFormVisible, setSubFormVisible] = useState();

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        if (!paymentMethod) {
            setAlertVisible(true);
        } else if (paymentMethod) {
            dispatch(savePaymentMethod(paymentMethod));
            dispatch(toggleOrderScreen('placeOrder'));
        }
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 />
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h2>Payment Method</h2>
                        </li>
                        <li>
                            <div>
                                <input
                                    className="radio-input"
                                    type="radio"
                                    name="payment-method"
                                    id='credit'
                                    value='Credit Card'
                                    onChange={(e) => {
                                        setPaymentMethod(e.target.value)
                                        setSubFormVisible(false)
                                    }}
                                ></input>
                                <label className="radio-label" htmlFor='credit'>
                                    Credit Card : Free of Charge
                                </label><br />
                                <input
                                    className="radio-input"
                                    type="radio"
                                    name="payment-method"
                                    id='prepareOrder'
                                    value='Prepare My Order'
                                    onChange={(e) => {
                                        setPaymentMethod(e.target.value)
                                        setSubFormVisible(false)
                                    }}
                                ></input>
                                <label className="radio-label" htmlFor='prepareOrder'>
                                    Prepare My Order : Free of Charge
                                </label><br />
                                <input
                                    className="radio-input"
                                    type="radio"
                                    name="payment-method"
                                    id='cashOnDelivery'
                                    value='Cash On Delivery'
                                    onChange={(e) => {
                                        setPaymentMethod(e.target.value)
                                        setSubFormVisible(true)
                                    }}
                                ></input>
                                <label className="radio-label" htmlFor='cashOnDelivery'>
                                    Cash on Delivery : 1$
                                </label><br />
                                {subFormVisible &&
                                    <div className="subform-container">
                                        <input
                                            className="subform-radio-input"
                                            type="radio"
                                            name="payment-method-delivery"
                                            id='cashOnDeliveryFast'
                                            value='Cash On Delivery: Fast'
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        ></input>
                                        <label className="subform-radio-label" htmlFor='cashOnDeliveryFast'>
                                            Fast Delivery : within max. 1hr (inside Beirut) : 3$
                                            </label><br />
                                        <input
                                            className="subform-radio-input"
                                            type="radio"
                                            name="payment-method-delivery"
                                            id='cashOnDeliveryNormal'
                                            value='Cash On Delivery: Normal'
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        ></input>
                                        <label className="subform-radio-label" htmlFor='cashOnDeliveryNormal'>
                                            Normal Delivery : max. 1day (inside Beirut) : 1$
                                        </label><br />
                                    </div>
                                }
                            </div>
                        </li>
                        <li>
                            {alertVisbile && <div className="invalid">Kindly choose a payment method.</div>}
                            <button type="submit" className="button primary">
                                Continue
                            </button>
                            <button type="button" className="button secondary" onClick={() => dispatch(toggleOrderScreen('delivery'))}>
                                Back To Delivery Address
                            </button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    )
}

export default Payment;