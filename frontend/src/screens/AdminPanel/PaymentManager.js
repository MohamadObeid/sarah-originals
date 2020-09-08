import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { savePayment, listPayment, deletePayment } from "../../actions/paymentActions";
import FontAwesome from 'react-fontawesome';
import { listZone } from "../../actions/zoneActions";

function PaymentManager(props) {
    const { zone: zoneList } = useSelector(state => state.zoneList);

    var cityList = [];

    zoneList.forEach(zone => {
        cityList = [...cityList, zone.zone]
    })

    const [formAction, setFormAction] = useState();
    const [formNote, setFormNote] = useState();
    const [formNoteVisible, setFormNoteVisible] = useState(false);
    const [formAlert, setFormAlert] = useState();
    const [formAlertVisible, setFormAlertVisible] = useState();
    const [modelVisible, setModelVisible] = useState(false);
    const [ratesManagerVisible, setRatesManagerVisible] = useState(false);
    const [ratesModelVisible, setRatesModelVisible] = useState(false);
    const [dropdownList, setDropdownList] = useState();
    const [dropdownListVisible, setDropdownListVisible] = useState(false);

    // payment consts
    const [_id, set_id] = useState();
    const [active, setActive] = useState(false);
    const [title, setTitle] = useState();
    const [zone, setZone] = useState();
    const [type, setType] = useState();
    const [rateType, setRateType] = useState('Flat');
    const [flatRate, setFlatRate] = useState(undefined);
    const [rates, setRates] = useState([]);

    // rates consts
    const [rates_id, setRates_id] = useState();
    const [basedOn, setBasedOn] = useState('Value');
    const [min, setMin] = useState();
    const [max, setMax] = useState();
    const [rate, setRate] = useState();

    const { success: successSave } = useSelector(state => state.paymentSave);
    const { success: successDelete } = useSelector(state => state.paymentDelete);
    const { payment } = useSelector(state => state.paymentList);

    // List consts
    const rateTypeList = ['Flat', 'Custom', 'Percentage'];
    const typeList = ['CashUsd', 'CashLbp', 'Credit', 'Check'];
    const basedOnList = ['Value', 'Quantity', 'Weight'];

    const dispatch = useDispatch();
    useEffect(() => {
        if ((successSave && (formAction || ratesManagerVisible)) || successDelete) {
            setFormAlertVisible(false)
            setModelVisible(false);
            setRatesModelVisible(false);
            dispatch(listPayment())
            setFormNote(`Payment Method ${(formAction === 'Create' || formAction === 'Copy') ? 'Creat' : formAction}ed succefully`)
            setFormNoteVisible(true);
            setInterval(() => setFormNoteVisible(false), 5000)
            setFormAction('');
        }
        return () => {
            //
        };
    }, [successSave, successDelete]);

    useEffect(() => {
        dispatch(listZone())
        return () => {
            //
        };
    }, []);

    // payment
    const openModel = (payment) => {
        setRatesModelVisible(false);
        setFormAlertVisible(false);

        set_id(payment._id ? payment._id : undefined);
        setActive(payment.active ? payment.active : false)
        setTitle(payment.title ? payment.title : '');
        setZone(payment.zone ? payment.zone : []);
        setType(payment.type ? payment.type : 'CashLbp');
        setRateType(payment.rateType ? payment.rateType : 'Flat');
        setFlatRate(parseFloat(payment.flatRate) === 0 ? parseFloat(payment.flatRate) : payment.flatRate ? parseFloat(payment.flatRate) : 0);
        setRates(payment.rates ? payment.rates : []);
        // filter citylist
        (payment.zone) &&
            (payment.zone).forEach(zExist => {
                cityList = cityList.filter(c => c !== zExist && c)
            })
        setDropdownList(cityList.sort());

        setModelVisible(true);
    };

    const setPaymentValues = (payment) => {
        set_id(payment._id);
        setActive(payment.active)
        setTitle(payment.title);
        setZone(payment.zone);
        setType(payment.type)
        setRateType(payment.rateType);
        setFlatRate(parseFloat(payment.flatRate));
        setRates(payment.rates);
    }

    // payment buttons handlers

    const createHandler = () => {
        setFormAction('Create')
        openModel({})
    }

    const editHandler = (payment) => {
        setFormAction('Edit');
        openModel(payment);
    }

    const deleteHandler = (e, _id) => {
        e.preventDefault();
        setFormAction('Delet')
        dispatch(deletePayment(_id));
    }

    const copyHandler = (payment) => {
        setFormAction('Copy')
        openModel(payment)
    }

    const showRatesHandler = async (payment) => {
        setModelVisible(false);
        await setPaymentValues(payment);
        setRatesManagerVisible(true);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const titleExist = payment.find(payment => payment.title == title);
        if (!titleExist || (titleExist && formAction === 'Edit')) {
            if (title && zone && rateType && (flatRate || flatRate === 0)) {
                (formAction === 'Create' || formAction === 'Copy') ?
                    dispatch(savePayment({ title: title, active: active, zone: zone, type: type, rateType: rateType, flatRate: flatRate, rates: rates }))
                    : dispatch(savePayment({ _id: _id, title: title, active: active, zone: zone, type: type, rateType: rateType, flatRate: flatRate, rates: rates }))
            } else {
                setFormAlert('Kindly fill all required blanks!');
                setFormAlertVisible(true);
            }
        } else {
            setFormAlert('There exist another payment title with same title.');
            setFormAlertVisible(true);
        }
    };

    const activationHandler = (e, payment) => {
        e.preventDefault()
        if (payment.active) {
            setFormAction('Deactivat')
            payment.active = false
        } else {
            setFormAction('Activat')
            payment.active = true
        }
        dispatch(savePayment({ ...payment, activation: true }))
    }

    // rates

    const openratesModel = (rates) => {
        setFormAlertVisible(false);

        setRates_id(rates._id ? rates._id : '');
        setBasedOn(rates.basedOn ? rates.basedOn : 'Value');
        setMin(rates.min === 0 ? 0 : rates.min ? rates.min : '');
        setMax(rates.max === 0 ? 0 : rates.max ? rates.max : '');
        setRate(rates.rate === 0 ? 0 : rates.rate ? rates.rate : '');

        setRatesModelVisible(true);
    };

    // rates buttons Handlers

    const createRatesHandler = () => {
        setFormAction('Create');
        openratesModel({});
    }

    const editRatesHandler = (rates) => {
        setFormAction('Edit');
        openratesModel(rates);
    }

    const deleteRatesHandler = (e, _id_) => {
        e.preventDefault();
        dispatch(savePayment({
            _id: _id, title: title, zone: zone, rateType: rateType, flatRate: flatRate,
            rates: rates.filter(rates => rates._id !== _id_ && rates), active: active
        }));
        setRates(rates.filter(rates => rates._id !== _id_ && rates))
    }

    const addRatesHandler = (e) => {
        setFormAction('Add');
        openratesModel({});
    }

    const ratesSubmitHandler = async (e) => {
        e.preventDefault()
        setRatesModelVisible(false);
        if (formAction === 'Edit') {
            if (rates_id) {
                await dispatch(savePayment({
                    _id: _id, title: title, active: active, zone: zone, type: type, rateType: rateType, flatRate: flatRate,
                    rates: [...rates.map(rates => rates._id === rates_id ? { _id: rates_id, active: active, basedOn: basedOn, min: min, max: max, rate: rate } : rates)]
                }))
                setRates([...rates.map(rates => rates._id === rates_id ? { _id: rates_id, active: active, basedOn: basedOn, min: min, max: max, rate: rate } : rates)])
            }
        } else {
            await dispatch(savePayment({
                _id: _id, title: title, active: active, zone: zone, type: type, rateType: rateType, flatRate: flatRate,
                rates: [...rates, { active: active, basedOn: basedOn, min: min, max: max, rate: rate }]
            }))
            setRates([...rates, { active: active, basedOn: basedOn, min: min, max: max, rate: rate }]);
        }
    }

    window.addEventListener('click', (e) => {
        const rangeOverlay = document.querySelector('.range-overlay');
        if (e.target === rangeOverlay) {
            setRatesManagerVisible(false)
            setRatesModelVisible(false)
        }
    });

    // Dropdown

    const addZone = (zoneAdded) => {
        setZone([...zone, zoneAdded])
        setDropdownList(
            dropdownList.filter(drop => drop !== zoneAdded && drop)
        )
    }

    const removeZone = (zoneRemoved) => {
        setDropdownList([...dropdownList, zoneRemoved].sort())
        setZone(
            zone.filter(zone => zone !== zoneRemoved && zone)
        )
    }

    window.addEventListener('click', (e) => {
        const dropdownOverlay = document.querySelector('.dropdown-overlay');
        if (e.target === dropdownOverlay) {
            setDropdownListVisible(false)
            dropdownOverlay.style.display = 'none'
        }
    });

    return (
        <div>
            {formNoteVisible && <div className="action-note">{formNote}</div>}
            <div className="control-page-header">
                <h3 className="header-title">Payment Manager</h3>
                <button type="button" className="header-button" onClick={() => createHandler()}>Create Payment</button>
            </div>
            {
                modelVisible &&
                <form className="form-form"
                    onSubmit={(e) => submitHandler(e)}>
                    <ul className="form-container-manager">
                        <FontAwesome name="fa-window-close" className="far fa-window-close fa-lg" onClick={() => setModelVisible(false)} />
                        <li>
                            <h2>{formAction == 'Copy' ? 'Create' : formAction} Payment</h2>
                        </li>
                        <li>
                            <label className="label" htmlFor="title">Title<p className="required">*</p></label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            ></input>
                        </li>
                        <div className='dropdown'>
                            <div className='dropdown-label'>Zone<p className="required">*</p></div>
                            <div className='dropdown-overlay'></div>
                            <div className='dropdown-container'>
                                <div className='dropdown-input' onClick={() => {
                                    document.querySelector('.dropdown-overlay').style.display = 'block';
                                    setDropdownListVisible(true)
                                }}>
                                    {zone.map(zone => (
                                        <div
                                            key={zone}
                                            className='dropdown-checked'>
                                            {zone}
                                            <FontAwesome className='fas fa-close dropdown-checked-close'
                                                onClick={() => removeZone(zone)} />
                                        </div>
                                    ))}
                                    <FontAwesome className='fas fa-chevron-down' />
                                </div>
                                {dropdownListVisible &&
                                    <div className='dropdown-list'>
                                        {dropdownList.map(drop => (
                                            <div
                                                key={drop}
                                                className='dropdown-choice'
                                                onClick={() => addZone(drop)}
                                            >
                                                {drop}
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                        </div>
                        <li>
                            <label className="label" htmlFor="type">Type
                            <p className="required">*</p>
                            </label>
                            <select
                                value={type}
                                onChange={(e) => {
                                    setType(
                                        e.target.selectedIndex ?
                                            e.target.options[e.target.selectedIndex].value :
                                            e.target.value);
                                }}>
                                {typeList.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </li>
                        <li>
                            <label className="label" htmlFor="rateType">Rate Type
                            <p className="required">*</p>
                            </label>
                            <select
                                value={rateType}
                                onChange={(e) => {
                                    setRateType(
                                        e.target.selectedIndex ?
                                            e.target.options[e.target.selectedIndex].value :
                                            e.target.value);
                                }}>
                                {rateTypeList.map((rateType) => (
                                    <option key={rateType} value={rateType}>
                                        {rateType}
                                    </option>
                                ))}
                            </select>
                        </li>
                        {rateType === 'Flat' &&
                            <li>
                                <label className="label" htmlFor="flat-rate">Flat Rate<p className="required">*</p></label>
                                <input
                                    type="number"
                                    name="flat-rate"
                                    id="flat-rate"
                                    value={flatRate}
                                    onChange={(e) => setFlatRate(parseFloat(e.target.value))}
                                ></input>
                            </li>}
                        <li>
                            {formAlertVisible &&
                                <div className="invalid">{formAlert}</div>}
                            <button type="submit" className="button primary">
                                {
                                    formAction == 'Copy' ? 'Create' :
                                        formAction == 'Edit' ? 'Apply Changes' : formAction
                                }
                            </button>
                            <button type="button" className="button secondary"
                                onClick={() => {
                                    setModelVisible(false)
                                    setFormAlertVisible(false)
                                }}>
                                Back
                            </button>
                        </li>
                    </ul>
                </form>
            }
            <table className="table">
                <thead>
                    <tr>
                        <th>Active</th>
                        <th>Title</th>
                        <th>Zone</th>
                        <th>Type</th>
                        <th>Rate Type</th>
                        <th>Rate</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payment.map((payment) => (
                        <tr key={payment._id}>
                            <td className='td-active'>
                                <input
                                    className='switch'
                                    type="checkbox"
                                    name={payment._id}
                                    id="active s2"
                                    value={payment.active}
                                    checked={payment.active}
                                    onChange={(e) => activationHandler(e, payment)}
                                ></input>
                            </td>
                            <td>{payment.title}</td>
                            <td style={
                                { maxWidth: '30rem' }}>
                                {payment.zone.map(name =>
                                    (payment.zone).indexOf(name) === ((payment.zone).length - 1) ?
                                        name
                                        : name + '/ ')
                                }
                            </td>
                            <td>{payment.type}</td>
                            <td>{payment.rateType}</td>
                            <td>{payment.rateType === 'Flat' ? payment.flatRate :
                                <button className="show-rates"
                                    onClick={(e) => showRatesHandler(payment)}>
                                    Show Rates
                                    <FontAwesome className='fas fa-exclamation-circle' />
                                </button>}
                            </td>
                            <td>
                                <button className="table-btns" onClick={() => editHandler(payment)}>Edit</button>
                                <button className="table-btns" onClick={(e) => deleteHandler(e, payment._id)}>Delete</button>
                                <button className="table-btns" onClick={() => copyHandler(payment)}>Copy</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/*rates Model */}
            {
                ratesModelVisible &&
                <form className="form-form rate-range-form" onSubmit={(e) => ratesSubmitHandler(e)}>
                    <ul className="form-container-manager">
                        <FontAwesome name="fa-window-close" className="far fa-window-close fa-lg" onClick={() => setRatesModelVisible(false)} />
                        <li>
                            <h2>{formAction} Rate Range</h2>
                        </li>
                        <li>
                            <label className="label" htmlFor="title">Payment Title<p className="required">*</p></label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={title}
                            ></input>
                        </li>
                        <li>
                            <label className="label" htmlFor="basedon">Based On<p className="required">*</p></label>
                            <select
                                value={basedOn}
                                onChange={(e) => {
                                    setBasedOn(
                                        e.target.selectedIndex ?
                                            e.target.options[e.target.selectedIndex].value :
                                            e.target.value);
                                }}
                            >
                                {basedOnList.map(basedOn =>
                                    <option key={basedOn} value={basedOn}>
                                        {basedOn}
                                    </option>)}
                            </select>
                        </li>
                        <li>
                            <label className="label" htmlFor="minimum">Minimum<p className="required">*</p></label>
                            <input
                                type="number"
                                name="minimum"
                                id="minimum"
                                value={min}
                                onChange={(e) => setMin(parseFloat(e.target.value))}
                            ></input>
                        </li>
                        <li>
                            <label className="label" htmlFor="maximum">Maximum<p className="required">*</p></label>
                            <input
                                type="number"
                                name="maximum"
                                id="maximum"
                                value={max}
                                onChange={(e) => setMax(parseFloat(e.target.value))}
                            ></input>
                        </li>
                        <li>
                            <label className="label" htmlFor="rate">Rate<p className="required">*</p></label>
                            <input
                                type="number"
                                name="rate"
                                id="rate"
                                value={rate}
                                onChange={(e) => setRate(parseFloat(e.target.value))}
                            ></input>
                        </li>
                        <li>
                            {formAlertVisible &&
                                <div className="invalid">{formAlert}</div>}
                            <button type="submit" className="button primary">
                                {
                                    formAction == 'Edit' ? 'Apply Changes' : formAction
                                }
                            </button>
                            <button type="button" className="button secondary" onClick={() => setRatesModelVisible(false)}>
                                Back
                            </button>
                        </li>
                    </ul>
                </form>
            }
            {
                ratesManagerVisible &&
                <div className='range'>
                    <div className='range-overlay'>
                        <div className='range-form'>
                            <div className="control-page-header">
                                <h3 className="header-title">Rates Manager</h3>
                                <button type="button" className="header-button range-header-button" onClick={() => createRatesHandler()}>Add Rate Range</button>
                            </div>
                            <table className="range-table">
                                <thead>
                                    <tr>
                                        <th>Based On</th>
                                        <th>Minimum</th>
                                        <th>Maximum</th>
                                        <th>{rateType === 'Percentage' ? 'Rate(%)' : 'Rate($)'}</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rates &&
                                        rates.map((rates) => (
                                            <tr key={rates._id}>
                                                <td>{rates.basedOn}</td>
                                                <td>{rates.min}</td>
                                                <td>{rates.max}</td>
                                                <td>{rates.rate}</td>
                                                <td>
                                                    <button className="table-btns" onClick={() => editRatesHandler(rates)}>Edit</button>
                                                    <button className="table-btns" onClick={(e) => deleteRatesHandler(e, rates._id)}>Delete</button>
                                                    <button className="table-btns" onClick={() => addRatesHandler()}>Add Range</button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            }
        </div >
    );
}

export default PaymentManager;
