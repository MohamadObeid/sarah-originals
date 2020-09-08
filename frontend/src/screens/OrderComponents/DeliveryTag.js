import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import cookie, { set } from "js-cookie";
import { saveAddress, toggleOrderScreen } from "../../actions/orderActions";
import FontAwesome from 'react-fontawesome';
import CheckoutSteps from "../Components/CheckoutSteps";

function Delivery() {
    const [city, setCity] = useState("");
    const [region, setRegion] = useState("");
    const [building, setBuilding] = useState("");
    const [alertVisbile, setAlertVisible] = useState(false);
    const [newAddress, setNewAddress] = useState(false);

    const { address } = useSelector(state => state.address);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();

        if (city && region && building) {
            dispatch(saveAddress({ city, region, building }))
            cookie.set("deliveryAddress", JSON.stringify({ city, region, building }));
            dispatch(toggleOrderScreen('payment'));
        } else (setAlertVisible(true))
    }

    return (
        <div>
            <CheckoutSteps step1 step2 />
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h2>Delivery Address</h2>
                        </li>
                        <li>
                            {address && address.map(addressItem => (
                                <div className="radio-choice">
                                    <input
                                        className="radio-input"
                                        type="radio"
                                        name="address"
                                        id={addressItem.region + addressItem.building}
                                        value={addressItem.region}
                                        onChange={() => {
                                            setNewAddress(false)
                                            setCity(addressItem.city)
                                            setRegion(addressItem.region)
                                            setBuilding(addressItem.building)
                                        }}
                                    ></input>
                                    <label className="radio-label" htmlFor={addressItem.region + addressItem.building}>
                                        {addressItem.city + ', ' + addressItem.region + ', ' + addressItem.building}
                                    </label>
                                </div>
                            ))}
                            <div className="radio-choice">
                                <input
                                    className="checked"
                                    type="radio"
                                    name="address"
                                    id='address'
                                    value=''
                                    onClick={() => setNewAddress(true)}>
                                </input>
                                <label className="radio-label" htmlFor='address'>
                                    <FontAwesome className="fas fa-plus-circle fa-lg" />
                                    New Address
                                </label>
                            </div>
                        </li>
                        {newAddress &&
                            <li>
                                <div>
                                    <li>
                                        <label htmlFor="city">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            id="city"
                                            onChange={(e) => setCity(e.target.value)}
                                        ></input>
                                    </li>
                                    <li>
                                        <label htmlFor="region">Region {'&'} Street</label>
                                        <input
                                            type="text"
                                            name="region"
                                            id="region"
                                            onChange={(e) => setRegion(e.target.value)}
                                        ></input>
                                    </li>
                                    <li>
                                        <label htmlFor="building">Building {'&'} Floor</label>
                                        <input
                                            type="text"
                                            name="building"
                                            id="building"
                                            onChange={(e) => setBuilding(e.target.value)}
                                        ></input>
                                    </li>
                                </div>
                            </li>
                        }
                        <li>
                            {alertVisbile && <div className="invalid">Kindly fill all address inputs, or choose any available address.</div>}
                            <button type="submit" className="button primary">
                                Continue
                        </button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    )
}

export default Delivery;