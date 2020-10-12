import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { savePayment, listPayment, deletePayment } from "../../actions/paymentActions";
import FontAwesome from 'react-fontawesome';
import { rateTypeList, typeList, basedOnList, rateUnitList } from '../../constants/lists'
import { faChevronDown, faInfinity, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    const [typeDropdownList, setTypeDropdownList] = useState();
    const [typeDropdownListVisible, setTypeDropdownListVisible] = useState(false);

    // payment consts
    const [_id, set_id] = useState();
    const [active, setActive] = useState(false);
    const [title, setTitle] = useState();
    const [zone, setZone] = useState();
    const [type, setType] = useState();
    const [rateType, setRateType] = useState('Flat');
    const [flatRate, setFlatRate] = useState(undefined);
    const [rates, setRates] = useState([])
    const [unit, setunit] = useState()
    const [description, setDescription] = useState()

    // rates consts
    const [rates_id, setRates_id] = useState();
    const [basedOn, setBasedOn] = useState('Value');
    const [min, setMin] = useState();
    const [max, setMax] = useState();
    const [rate, setRate] = useState();
    const [paymentType, setPaymentType] = useState()
    const [ratesUnit, setRatesUnit] = useState()
    const [ratesDescription, setRatesDescription] = useState()
    const [paymentZone, setPaymentZone] = useState()

    const { success: successSave } = useSelector(state => state.paymentSave);
    const { success: successDelete } = useSelector(state => state.paymentDelete);
    const { payment } = useSelector(state => state.paymentList);

    // List consts

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

    // payment
    const openModel = (payment) => {
        setRatesModelVisible(false);
        setFormAlertVisible(false);

        set_id(payment._id ? payment._id : undefined);
        setActive(payment.active ? payment.active : false)
        setTitle(payment.title ? payment.title : undefined);
        setZone(payment.zone ? payment.zone : []);
        setType(payment.type ? payment.type : ['Cash']);
        setRateType(payment.rateType ? payment.rateType : 'Flat');
        setFlatRate(parseFloat(payment.flatRate) === 0 ? parseFloat(payment.flatRate) : payment.flatRate ? parseFloat(payment.flatRate) : 0);
        setRates(payment.rates ? payment.rates : []);
        setunit(payment.unit ? payment.unit : rateUnitList[0])
        setDescription(payment.description ? payment.description : undefined)
        // filter citylist
        payment.zone &&
            (payment.zone).forEach(zExist => {
                cityList = cityList.filter(c => c !== zExist && c)
            })
        setDropdownList(cityList.sort());

        var types = typeList
        payment.type &&
            payment.type.forEach(tExist => {
                types = types.filter(t => t !== tExist && t)
            })
        if (types.length === typeList.length) types = types.filter(t => t !== 'Cash' && t)
        setTypeDropdownList(types.sort());

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
        setRates(payment.rates)
        setType(payment.type)
        setDescription(payment.description)
        setPaymentZone(payment.zone)
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
                    dispatch(savePayment({ title, active, zone, type, rateType, flatRate, rates, unit, description }))
                    : dispatch(savePayment({ _id, title, active, zone, type, rateType, flatRate, rates, unit, description }))
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
        setBasedOn(rates.basedOn ? rates.basedOn : basedOnList[0]);
        setPaymentZone(rates.zone ? rates.zone : undefined)
        setMin(rates.min === 0 ? 0 : rates.min ? rates.min : '');
        setMax(rates.max === 0 ? 0 : rates.max ? rates.max : '');
        setRate(rates.rate === 0 ? 0 : rates.rate ? rates.rate : '');
        setPaymentType(rates.paymentType ? rates.paymentType : type[0])
        setRatesUnit(rates.unit ? rates.unit : rateUnitList[0])
        setRatesDescription(rates.description ? rates.description : undefined)

        setRatesModelVisible(true)
    };

    // rates buttons Handlers

    const createRatesHandler = () => {
        setFormAction('Create')
        openratesModel({})
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
                    _id, title, active, zone, type, rateType, flatRate, description, unit,
                    rates: [...rates.map(rates => rates._id === rates_id ? {
                        _id: rates_id, active, basedOn, min, max, rate, paymentType, unit: ratesUnit, description: ratesDescription, zone: paymentZone
                    } : rates)]
                }))
                setRates([...rates.map(rates => rates._id === rates_id ? {
                    _id: rates_id, active, basedOn, min, max, rate, paymentType, unit: ratesUnit, description: ratesDescription, zone: paymentZone
                } : rates)])
            }
        } else {
            await dispatch(savePayment({
                _id, title, active, zone, type, rateType, flatRate, description, unit,
                rates: [...rates, { active, basedOn, min, max, rate, paymentType, unit: ratesUnit, description: ratesDescription, zone: paymentZone }]
            }))
            setRates([...rates, { active, basedOn, min, max, rate, paymentType, unit: ratesUnit, description: ratesDescription, zone: paymentZone }]);
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
        const dropdownOverlay = document.querySelector('.dropdown-overlay-zone');
        if (e.target === dropdownOverlay) {
            setDropdownListVisible(false)
            dropdownOverlay.style.display = 'none'
        }
    })

    // Dropdown types

    const addType = (typeAdded) => {
        setType([...type, typeAdded])
        setTypeDropdownList(
            typeDropdownList.filter(drop => drop !== typeAdded && drop)
        )
    }

    const removeType = (typeRemoved) => {
        setTypeDropdownList([...typeDropdownList, typeRemoved].sort())
        setType(
            type.filter(type => type !== typeRemoved && type)
        )
    }

    window.addEventListener('click', (e) => {
        const dropdownOverlayType = document.querySelector('.dropdown-overlay-type');
        if (e.target === dropdownOverlayType) {
            setTypeDropdownListVisible(false)
            dropdownOverlayType.style.display = 'none'
        }
    })

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
                            <div className='dropdown-label'>Zone</div>
                            <div className='dropdown-overlay dropdown-overlay-zone'></div>
                            <div className='dropdown-container' style={{ zIndex: '4' }}>
                                <div className='dropdown-input' onClick={() => {
                                    document.querySelector('.dropdown-overlay-zone').style.display = 'block';
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
                                    <FontAwesomeIcon icon={faChevronDown} className='fas fa-chevron-down' />
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
                        <div className='dropdown'>
                            <div className='dropdown-label'>Type<p className="required">*</p></div>
                            <div className='dropdown-overlay dropdown-overlay-type'></div>
                            <div className='dropdown-container'>
                                <div className='dropdown-input' onClick={() => {
                                    document.querySelector('.dropdown-overlay-type').style.display = 'block';
                                    setTypeDropdownListVisible(true)
                                }}>
                                    {type.map(type => (
                                        <div
                                            key={type}
                                            className='dropdown-checked'>
                                            {type}
                                            <FontAwesome className='fas fa-close dropdown-checked-close'
                                                onClick={() => removeType(type)} />
                                        </div>
                                    ))}
                                    <FontAwesomeIcon icon={faChevronDown} className='fas fa-chevron-down' />
                                </div>
                                {typeDropdownListVisible &&
                                    <div className='dropdown-list'>
                                        {typeDropdownList.map(drop => (
                                            <div
                                                key={drop}
                                                className='dropdown-choice'
                                                onClick={() => addType(drop)}
                                            >
                                                {drop}
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                        </div>
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
                                <div className='rate-unit'>
                                    <div>
                                        <label className="label" htmlFor="flat-rate">Flat Rate<p className="required">*</p></label>
                                        <input
                                            type="number"
                                            name="flat-rate"
                                            id="flat-rate"
                                            value={flatRate}
                                            className='flat-rate'
                                            onChange={(e) => setFlatRate(parseFloat(e.target.value))}
                                        ></input>
                                    </div>
                                    <div style={{ width: '8rem' }}>
                                        <label className="label" htmlFor="unit">Unit<p className="required">*</p></label>
                                        <select
                                            value={unit}
                                            onChange={(e) => {
                                                setunit(
                                                    e.target.selectedIndex ?
                                                        e.target.options[e.target.selectedIndex].value :
                                                        e.target.value)
                                            }}>
                                            {rateUnitList.map(unit => (
                                                <option key={unit} value={unit}>
                                                    {unit}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </li>}
                        <li>
                            <label className="label" htmlFor="description">Description</label>
                            <textarea
                                type="text"
                                name="description"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </li>
                        <li>
                            {formAlertVisible &&
                                <div className="invalid">{formAlert}</div>}
                            <button type="submit" className="button primary"> {
                                formAction == 'Copy' ? 'Create' :
                                    formAction == 'Edit' ? 'Apply Changes' : formAction
                            } </button>
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
                        <th style={{ paddingRight: '0.5rem' }}>Active</th>
                        <th>Title</th>
                        <th>Zone</th>
                        <th>Type</th>
                        <th>Rate Type</th>
                        <th style={{ textAlign: 'center' }}>Rate</th>
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
                                {payment.zone.length > 0 ?
                                    payment.zone.map(name =>
                                        (payment.zone).indexOf(name) === ((payment.zone).length - 1) ?
                                            name
                                            : name + ', ')
                                    : '-'}
                            </td>
                            <td style={{ maxWidth: '30rem' }}>
                                {payment.type.map(name =>
                                    (payment.type).indexOf(name) === ((payment.type).length - 1) ?
                                        name
                                        : name + ', ')
                                }
                            </td>
                            <td>{payment.rateType}</td>
                            <td style={{ textAlign: 'center' }}>
                                {payment.rateType === 'Flat' ?
                                    (payment.flatRate + ' ' + payment.unit) :
                                    <FontAwesomeIcon icon={faPlus} className='show-rates-plus'
                                        onClick={(e) => showRatesHandler(payment)} />}
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
                            <label className="label" htmlFor="unit">Payment Type<p className="required">*</p></label>
                            <select
                                value={paymentType}
                                onChange={(e) => {
                                    setPaymentType(
                                        e.target.selectedIndex ?
                                            e.target.options[e.target.selectedIndex].value :
                                            e.target.value)
                                }}>
                                {type.map(t => (
                                    <option key={t} value={t}>
                                        {t}
                                    </option>
                                ))}
                            </select>
                        </li>
                        <li>
                            <label className="label" htmlFor="unit">Zone<p className="required">*</p></label>
                            <select
                                value={paymentZone}
                                onChange={(e) => {
                                    setPaymentZone(
                                        e.target.selectedIndex ?
                                            e.target.options[e.target.selectedIndex].value :
                                            e.target.value)
                                }}>

                                <option key={''} value={''}>
                                    Select...
                                </option>
                                {zone.map(zone => (
                                    <option key={zone} value={zone}>
                                        {zone}
                                    </option>
                                ))}
                            </select>
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
                            <div className='rate-unit'>
                                <div>
                                    <label className="label" htmlFor="rate">Rate<p className="required">*</p></label>
                                    <input
                                        type="number"
                                        name="rate"
                                        id="rate"
                                        value={rate}
                                        className='flat-rate'
                                        onChange={(e) => setRate(parseFloat(e.target.value))}
                                    ></input>
                                </div>
                                <div style={{ width: '8rem' }}>
                                    <label className="label" htmlFor="ratesUnit">Unit<p className="required">*</p></label>
                                    <select
                                        value={ratesUnit}
                                        onChange={(e) => {
                                            setRatesUnit(
                                                e.target.selectedIndex ?
                                                    e.target.options[e.target.selectedIndex].value :
                                                    e.target.value)
                                        }}>
                                        {rateUnitList.map(unit => (
                                            <option key={unit} value={unit}>
                                                {unit}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </li>
                        <li>
                            <label className="label" htmlFor="ratesDescription">Description</label>
                            <textarea
                                type="text"
                                name="ratesDescription"
                                id="ratesDescription"
                                value={ratesDescription}
                                onChange={(e) => setRatesDescription(e.target.value)}
                            ></textarea>
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
                                <div style={{ width: '100%', textAlign: 'center' }}>
                                    <h3 className="header-title">{title && title} Rates Manager</h3></div>
                                <button type="button" className="header-button range-header-button" onClick={() => createRatesHandler()}>Add Rate Range</button>
                            </div>
                            <table className="range-table">
                                <thead>
                                    <tr>
                                        <th>Zone</th>
                                        <th>Payment Type</th>
                                        <th>Based On</th>
                                        <th>Minimum</th>
                                        <th>Maximum</th>
                                        <th>Rate</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rates &&
                                        rates.map((rates) => (
                                            <tr key={rates._id}>
                                                <td>{rates.zone ? rates.zone : '-'}</td>
                                                <td>{rates.paymentType}</td>
                                                <td>{rates.basedOn}</td>
                                                <td>{rates.min}</td>
                                                <td>{rates.max >= 100000000 ?
                                                    <FontAwesomeIcon icon={faInfinity} /> : rates.max
                                                }</td>
                                                <td>{rates.rate + ' ' + rates.unit}</td>
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
