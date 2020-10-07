import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveDelivery, listDelivery, deleteDelivery } from "../../actions/deliveryActions";
import FontAwesome from 'react-fontawesome';
import { listZone } from "../../actions/zoneActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function DeliveryManager(props) {
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

    // delivery consts
    const [_id, set_id] = useState();
    const [active, setActive] = useState(false);
    const [title, setTitle] = useState();
    const [zone, setZone] = useState();
    const [type, setType] = useState();
    const [duration, setDuration] = useState();
    const [timeFormat, setTimeFormat] = useState('min');
    const [rateType, setRateType] = useState('Flat');
    const [flatRate, setFlatRate] = useState(undefined);
    const [rates, setRates] = useState([]);

    // rates consts
    const [rates_id, setRates_id] = useState();
    const [basedOn, setBasedOn] = useState('Value');
    const [min, setMin] = useState();
    const [max, setMax] = useState();
    const [rate, setRate] = useState();

    const { success: successSave } = useSelector(state => state.deliverySave);
    const { success: successDelete } = useSelector(state => state.deliveryDelete);
    const { delivery } = useSelector(state => state.deliveryList);

    // List consts
    const rateTypeList = ['Flat', 'Custom'];
    const typeList = ['Fast', 'Standard', 'Return', 'Prepare'];
    const basedOnList = ['Value', 'Quantity', 'Weight', 'Percentage'];
    const timeFormatList = ['min', 'hr', 'day', 'week', 'month'];

    const dispatch = useDispatch();
    useEffect(() => {
        if ((successSave && (formAction || ratesManagerVisible)) || successDelete) {
            setFormAlertVisible(false)
            setModelVisible(false);
            setRatesModelVisible(false);
            dispatch(listDelivery())
            setFormNote(`Delivery Method ${(formAction === 'Create' || formAction === 'Copy') ? 'Creat' : formAction}ed succefully`)
            setFormNoteVisible(true);
            setInterval(() => setFormNoteVisible(false), 5000)
            setFormAction('');
        }
        dispatch(listZone())
        return () => {
            //
        };
    }, [successSave, successDelete]);

    // Delivery

    const openModel = (delivery) => {
        setRatesModelVisible(false);
        setFormAlertVisible(false);

        set_id(delivery._id ? delivery._id : undefined);
        setActive(delivery.active ? delivery.active : false)
        setTitle(delivery.title ? delivery.title : '');
        setZone(delivery.zone ? delivery.zone : []);
        setType(delivery.type ? delivery.type : 'Fast');
        setDuration(parseInt(delivery.duration) ? parseInt(delivery.duration) : 45)
        setTimeFormat(delivery.timeFormat ? delivery.timeFormat : 'min')
        setRateType(delivery.rateType ? delivery.rateType : 'Flat');
        setFlatRate(parseFloat(delivery.flatRate) === 0 ? parseFloat(delivery.flatRate) : delivery.flatRate ? parseFloat(delivery.flatRate) : 0);
        setRates(delivery.rates ? delivery.rates : []);
        // filter citylist
        (delivery.zone) &&
            (delivery.zone).forEach(zExist => {
                cityList = cityList.filter(c => c !== zExist && c)
            })
        setDropdownList(cityList.sort());

        setModelVisible(true);
    };

    const setDeliveryValues = (delivery) => {
        set_id(delivery._id);
        setActive(delivery.active)
        setTitle(delivery.title);
        setZone(delivery.zone);
        setType(delivery.type)
        setDuration(parseInt(delivery.duration))
        setTimeFormat(delivery.timeFormat)
        setRateType(delivery.rateType);
        setFlatRate(parseFloat(delivery.flatRate));
        setRates(delivery.rates);
    }

    // delivery buttons handlers
    const createHandler = () => {
        setFormAction('Create')
        openModel({})
    }

    const editHandler = (delivery) => {
        setFormAction('Edit');
        openModel(delivery);
    }

    const deleteHandler = (e, _id) => {
        e.preventDefault();
        setFormAction('Delet')
        dispatch(deleteDelivery(_id));
    }

    const copyHandler = (delivery) => {
        setFormAction('Copy')
        openModel(delivery)
    }

    const showRatesHandler = async (delivery) => {
        setModelVisible(false);
        await setDeliveryValues(delivery);
        setRatesManagerVisible(true);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const titleExist = delivery.find(delivery => delivery.title == title);
        if (!titleExist || (titleExist && formAction === 'Edit')) {
            if (title && zone && rateType && (flatRate || flatRate === 0)) {
                (formAction === 'Create' || formAction === 'Copy') ?
                    dispatch(saveDelivery({ title: title, active: active, zone: zone, type: type, duration: duration, timeFormat: timeFormat, rateType: rateType, flatRate: flatRate, rates: rates }))
                    : dispatch(saveDelivery({ _id: _id, title: title, active: active, zone: zone, type: type, duration: duration, timeFormat: timeFormat, rateType: rateType, flatRate: flatRate, rates: rates }))
            } else {
                setFormAlert('Kindly fill all required blanks!');
                setFormAlertVisible(true);
            }
        } else {
            setFormAlert('There exist another delivery title with same title.');
            setFormAlertVisible(true);
        }
    };

    const activationHandler = (e, delivery) => {
        e.preventDefault()
        if (delivery.active) {
            setFormAction('Deactivat')
            delivery.active = false
        } else {
            setFormAction('Activat')
            delivery.active = true
        }
        dispatch(saveDelivery({ ...delivery, activation: true }))
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

    const editratesHandler = (rates) => {
        setFormAction('Edit');
        openratesModel(rates);
    }

    const deleteratesHandler = (e, _id_) => {
        e.preventDefault();
        dispatch(saveDelivery({
            _id: _id, title: title, zone: zone, rateType: rateType, flatRate: flatRate,
            rates: rates.filter(rates => rates._id !== _id_ && rates), active: active
        }));
        setRates(rates.filter(rates => rates._id !== _id_ && rates))
    }

    const addratesHandler = (e) => {
        setFormAction('Add');
        openratesModel({});
    }

    const ratesSubmitHandler = async (e) => {
        e.preventDefault()
        setRatesModelVisible(false);
        if (formAction === 'Edit') {
            if (rates_id) {
                await dispatch(saveDelivery({
                    _id: _id, title: title, active: active, zone: zone, type: type, duration: duration, timeFormat: timeFormat, rateType: rateType, flatRate: flatRate,
                    rates: [...rates.map(rates => rates._id === rates_id ? { _id: rates_id, active: active, basedOn: basedOn, min: min, max: max, rate: rate } : rates)]
                }))
                setRates([...rates.map(rates => rates._id === rates_id ? { _id: rates_id, active: active, basedOn: basedOn, min: min, max: max, rate: rate } : rates)])
            }
        } else {
            await dispatch(saveDelivery({
                _id: _id, title: title, active: active, zone: zone, type: type, duration: duration, timeFormat: timeFormat, rateType: rateType, flatRate: flatRate,
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
                <h3 className="header-title">Delivery Manager</h3>
                <button type="button" className="header-button" onClick={() => createHandler()}>Create delivery</button>
            </div>
            {
                modelVisible &&
                <form className="form-form"
                    onSubmit={(e) => submitHandler(e)}>
                    <ul className="form-container-manager">
                        <FontAwesome name="fa-window-close" className="far fa-window-close fa-lg" onClick={() => setModelVisible(false)} />
                        <li>
                            <h2>{formAction == 'Copy' ? 'Create' : formAction} Delivery</h2>
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
                            <div className='dropdown-label'>zone<p className="required">*</p></div>
                            <div className='dropdown-overlay'></div>
                            <div className='dropdown-container'>
                                <div className='dropdown-input' onClick={() => {
                                    if (dropdownListVisible) {
                                        setDropdownListVisible(false)
                                        document.querySelector('.dropdown-overlay').style.display = 'none';
                                    } else {
                                        setDropdownListVisible(true)
                                        document.querySelector('.dropdown-overlay').style.display = 'block';
                                    }
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
                            <label className="label" htmlFor="duration">Duration<p className="required">*</p></label>
                            <div className="flex-div">
                                <input
                                    type="number"
                                    name="duration"
                                    id="duration"
                                    value={duration}
                                    onChange={(e) => setDuration(parseFloat(e.target.value))}
                                ></input>
                                <select
                                    value={timeFormat}
                                    onChange={(e) => {
                                        setTimeFormat(
                                            e.target.selectedIndex ?
                                                e.target.options[e.target.selectedIndex].value :
                                                e.target.value);
                                    }}>
                                    {timeFormatList.map(timeFormat => (
                                        <option key={timeFormat} value={timeFormat}>
                                            {timeFormat}
                                        </option>
                                    ))}
                                </select>
                            </div>
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
                        <th style={{ paddingRight: '0.5rem' }}>Active</th>
                        <th>Title</th>
                        <th>Zone</th>
                        <th>Type</th>
                        <th>Duration</th>
                        <th>Rate Type</th>
                        <th>Rate</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {delivery.map((delivery) => (
                        <tr key={delivery._id}>
                            <td className='td-active'>
                                <input
                                    className='switch'
                                    type="checkbox"
                                    name={delivery._id}
                                    id="active s2"
                                    value={delivery.active}
                                    checked={delivery.active}
                                    onChange={(e) => activationHandler(e, delivery)}
                                ></input>
                            </td>
                            <td>{delivery.title}</td>
                            <td style=
                                {{ maxWidth: '30rem' }}>
                                {delivery.zone.map(name =>
                                    (delivery.zone).indexOf(name) == ((delivery.zone).length - 1) ?
                                        name
                                        : name + '/ ')
                                }
                            </td>
                            <td>{delivery.type}</td>
                            <td>{delivery.duration} {delivery.timeFormat}</td>
                            <td>{delivery.rateType}</td>
                            <td>{delivery.rateType === 'Flat' ? delivery.flatRate :
                                <button className="show-rates"
                                    onClick={() => showRatesHandler(delivery)}>
                                    Show Rates
                                    <FontAwesome className='fas fa-exclamation-circle' />
                                </button>}
                            </td>
                            <td>
                                <button className="table-btns" onClick={() => editHandler(delivery)}>Edit</button>
                                <button className="table-btns" onClick={(e) => deleteHandler(e, delivery._id)}>Delete</button>
                                <button className="table-btns" onClick={() => copyHandler(delivery)}>Copy</button>
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
                            <label className="label" htmlFor="title">Delivery Title<p className="required">*</p></label>
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
                                        <th>{rateType === 'Percentage' ? 'Rate(%)' : 'Rate'}</th>
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
                                                <td>{rates.rate.toFixed(2) + ' $'}</td>
                                                <td>
                                                    <button className="table-btns" onClick={() => editratesHandler(rates)}>Edit</button>
                                                    <button className="table-btns" onClick={(e) => deleteratesHandler(e, rates._id)}>Delete</button>
                                                    <button className="table-btns" onClick={() => addratesHandler()}>Add Range</button>
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

export default DeliveryManager;
