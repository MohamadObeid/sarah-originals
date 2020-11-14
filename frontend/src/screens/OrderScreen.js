import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FontAwesome from 'react-fontawesome';
import Delivery from './OrderComponents/DeliveryTag';
import Payment from './OrderComponents/PaymentTag';
import PlaceOrder from './OrderComponents/PlaceOrderTag';

function OrderScreen() {
    const { orderScreen } = useSelector(state => state.orderScreen);

    return (
        <div>
            <div className="back-to-result">
                <Link to="/">
                    <FontAwesome
                        name="fa-chevron-left"
                        className="fas fa-chevron-left fa-lg"
                    />
                    Home
                </Link>
            </div>
            {orderScreen === 'delivery' && <Delivery />}
            {orderScreen === 'payment' && <Payment />}
            {orderScreen === 'placeOrder' && <PlaceOrder />}
        </div>
    );
}
export default OrderScreen;
