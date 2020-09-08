import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import FontAwesome from 'react-fontawesome';
import { PromiseProvider } from "mongoose";
import cookie from 'js-cookie';
import { toggleOrderScreen } from "../../actions/orderActions";

function PlaceOrder(props) {
    const dispatch = useDispatch();

    const { cartItems } = useSelector(state => state.cart);
    var total = 0;

    const address = cookie.getJSON("deliveryAddress") || undefined;

    const { paymentMethod } = useSelector(state => state.paymentMethod);

    const history = useHistory();

    const submitHandler = () => {
        history.push('/');
    }

    return (
        <div>
            <div className="cart place-order-cart">
                <div className="cart-list place-order-cart-list">
                    <div className="cart-list-container place-order-cart-list-container">
                        <h4>Delivery Address</h4>
                        {address &&
                            <h5>{address.city}, {address.region}, {address.building}</h5>}
                    </div>
                    <div className="cart-list-container place-order-cart-list-container">
                        <h4>Payment Method</h4>
                        {paymentMethod &&
                            <h5>{paymentMethod}</h5>}
                    </div>
                    <ul className="cart-list-container place-order-cart-list-container">
                        <li className="place-order-headers">
                            <h4>Order Items</h4>
                            <h4>Price ($)</h4>
                        </li>
                        {cartItems &&
                            cartItems.map((item) => (
                                <li key={item._id}>
                                    <div className="cart-list-items place-order-cart-list-items">
                                        <div className="cart-image place-order-cart-image">
                                            <img src={item.image} alt={item.nameEn} />
                                        </div>
                                        <div className="cart-name place-order-cart-name">
                                            <div className="item-name place-order-item-name">{item.nameEn}</div>
                                            <div className="item-count place-order-item-count">Qty: {item.qty}/{item.unit}</div>
                                        </div>
                                        <div className="cart-price place-order-cart-price">${item.priceUsd}</div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="cart-action place-order-cart-action">
                    <table className="place-order-table">
                        <tr>
                            <th>Items:</th>
                            <td>
                                {cartItems.
                                    forEach(item => total += parseInt(item.qty))}
                                {total}{total <= 1 ? ' item' : ' items'}
                            </td>
                        </tr>
                        <tr>
                            <th>SubTotal:</th>
                            <td>
                                ${cartItems
                                    .reduce((sum, item) =>
                                        sum + item.priceUsd * item.qty, 0)}
                            </td>
                        </tr>
                        <tr>
                            <th>Delivery:</th>
                            <td>
                                $1
                            </td>
                        </tr>
                        <tbody>
                            <tr className="place-order-tr">
                                <th>Total:</th>
                                <td>
                                    $100
                            </td>
                            </tr>
                        </tbody>
                    </table>
                    <button
                        onClick={submitHandler}
                        className="button primary place-order-button"
                        disabled={cartItems.length == 0}
                    >
                        Place Order
                    </button>
                    <button type="button" className="button secondary place-order-btn" onClick={() => dispatch(toggleOrderScreen('payment'))}>
                        Back To Payment Method
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrder;