// Delivery Manager

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveDelivery, listDelivery, deleteDelivery } from "../../actions/deliveryActions";
import FontAwesome from 'react-fontawesome';
import { cityList } from '../../constants/lists';

function DeliveryManager(props) {
    const [formAction, setFormAction] = useState();
    const [formNote, setFormNote] = useState();
    const [formNoteVisible, setFormNoteVisible] = useState(false);
    const [formAlert, setFormAlert] = useState();
    const [formAlertVisible, setFormAlertVisible] = useState();
    const [modelVisible, setModelVisible] = useState(false);
    const [_id, set_id] = useState();
    const [title, setTitle] = useState();
    const [city, setCity] = useState([]);
    const [city_id, setCity_id] = useState();
    const [cityActive, setCityActive] = useState(false);
    const [cityName, setCityName] = useState([]);
    const [region, setRegion] = useState();
    const [duration, setDuration] = useState();
    const [timeFormat, setTimeFormat] = useState('min');
    const [rateType, setRateType] = useState('Flat');
    const [flatRate, setFlatRate] = useState(undefined);
    const [active, setActive] = useState(false);
    const [range, setRange] = useState([]);
    const [range_id, setRange_id] = useState();
    const [basedOn, setBasedOn] = useState('Order Value');
    const [min, setMin] = useState();
    const [max, setMax] = useState();
    const [rate, setRate] = useState();
    const [dropdownList, setDropdownList] = useState(cityList);
    const [cityNames, cetCityNames] = useState()

    const [rangeManagerVisible, setRangeManagerVisible] = useState(false);
    const [rangeModelVisible, setRangeModelVisible] = useState(false);

    const { success: successSave } = useSelector(state => state.deliverySave);

    const { success: successDelete } = useSelector(state => state.deliveryDelete);

    const { delivery } = useSelector(state => state.deliveryList);

    const rateTypeList = ['Flat', 'Custom', 'Percentage'];

    const basedOnList = ['Order Value', 'Quantity', 'Weight'];

    const dispatch = useDispatch();
    useEffect(() => {
        if (successSave && (formAction || rangeManagerVisible || cityModelVisible) || successDelete) {
            setFormAlertVisible(false)
            setModelVisible(false);
            setRangeModelVisible(false);
            setCityModelVisible(false);
            dispatch(listDelivery())
            setFormNote(`Delivery Method ${(formAction === 'Create' || formAction === 'Copy') ? 'Creat' : formAction}ed succefully`)
            setFormNoteVisible(true);
            setInterval(() => setFormNoteVisible(false), 5000)
            setFormAction('');
        }
        return () => {
            //
        };
    }, [successSave, successDelete]);

    // Delivery Table Handlers
    const openModel = (delivery) => {
        setRangeModelVisible(false);
        setFormAlertVisible(false);
        set_id(delivery._id ? delivery._id : undefined);
        setTitle(delivery.title ? delivery.title : '');
        setCity(delivery.city ? delivery.city : []);
        setRateType(delivery.rateType ? delivery.rateType : 'Flat');
        setFlatRate(parseFloat(delivery.flatRate) === 0 ? parseFloat(delivery.flatRate) : delivery.flatRate ? parseFloat(delivery.flatRate) : 0);
        setRange(delivery.range ? delivery.range : []);
        setActive(delivery.active ? delivery.active : false)
        setModelVisible(true);
    };

    const filterDropdownList = (city) => {

    }

    const setDeliveryValues = (delivery) => {
        set_id(delivery._id);
        setTitle(delivery.title);
        setCity(delivery.city);
        setRateType(delivery.rateType);
        setFlatRate(parseFloat(delivery.flatRate));
        setRange(delivery.range);
        setActive(delivery.active);


        /*delivery.city.forEach(city => {
            (city.cityName).forEach(name => {
                dropdownList.forEach(dropName => {
                    if (dropName !== name) {
                        filteredList = [...filteredList, dropName]
                    }
                })
            })
        })

        console.log(filteredList)
        setDropdownList(filteredList);*/
    }

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
        setRangeManagerVisible(true);
    }

    const showCityHandler = async (delivery) => {
        setModelVisible(false);
        await setDeliveryValues(delivery);
        setCitiesManagerVisible(true);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const titleExist = delivery.find(delivery => delivery.title == title);
        if (!titleExist || (titleExist && formAction === 'Edit')) {
            if (title && city && rateType && (flatRate || flatRate === 0)) {
                (formAction === 'Create' || formAction === 'Copy') ?
                    dispatch(saveDelivery({ title: title, city: city, rateType: rateType, flatRate: flatRate, range: range, active: active }))
                    : dispatch(saveDelivery({ _id: _id, title: title, city: city, rateType: rateType, flatRate: flatRate, range: range, active: active }))
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
        dispatch(saveDelivery({ ...delivery, activation: 'Delivery' }))
    }

    // Range Manager Handlers

    const openRangeModel = (range) => {
        setFormAlertVisible(false);
        setRange_id(range._id ? range._id : '');
        setBasedOn(range.basedOn ? range.basedOn : 'Value');
        setMin(range.min === 0 ? 0 : range.min ? range.min : '');
        setMax(range.max === 0 ? 0 : range.max ? range.max : '');
        setRate(range.rate === 0 ? 0 : range.rate ? range.rate : '');
        setRangeModelVisible(true);
    };

    const createRangeHandler = () => {
        setFormAction('Create');
        openRangeModel({});
    }

    const editRangeHandler = (range) => {
        setFormAction('Edit');
        openRangeModel(range);
    }

    const deleteRangeHandler = async (e, _id_) => {
        e.preventDefault();
        await dispatch(saveDelivery({
            _id: _id, title: title, city: city, rateType: rateType, flatRate: flatRate,
            range: range.filter(range => range._id !== _id_ && range), active: active
        }));
        setRange(range.filter(range => range._id !== _id_ && range))
    }

    const addRangeHandler = (e) => {
        setFormAction('Add');
        openRangeModel({});
    }

    const rangeSubmitHandler = async (e) => {
        e.preventDefault()
        setRangeModelVisible(false);
        if (formAction === 'Edit') {
            if (range_id) {
                await dispatch(saveDelivery({
                    _id: _id, title: title, city: city, rateType: rateType, flatRate: flatRate, active: active,
                    range: [...range.map(range => range._id === range_id ? { _id: range_id, title: title, basedOn: basedOn, min: min, max: max, rate: rate } : range)]
                }))
                setRange([...range.map(range => range._id === range_id ? { title: title, basedOn: basedOn, min: min, max: max, rate: rate } : range)])
            }
        } else {
            await dispatch(saveDelivery({
                _id: _id, title: title, city: city, rateType: rateType, flatRate: flatRate, active: active,
                range: [...range, { title: title, basedOn: basedOn, min: min, max: max, rate: rate }]
            }))
            setRange([...range, { title: title, basedOn: basedOn, min: min, max: max, rate: rate }]);
        }
    }

    window.addEventListener('click', (e) => {
        const rangeOverlay = document.querySelector('.range-overlay');
        if (e.target === rangeOverlay) {
            setRangeManagerVisible(false)
            setRangeModelVisible(false)
        }
    });

    // City Manager

    const [cityModelVisible, setCityModelVisible] = useState(false);
    const [CitiesManagerVisible, setCitiesManagerVisible] = useState(false);
    const timeFormatList = ['min', 'hr', 'day', 'week', 'month'];

    const openCityModel = (city) => {
        setFormAlertVisible(false);
        setCity_id(city._id ? city._id : '')
        setCityActive(city.active ? city.active : false);
        setCityName(city.cityName ? city.cityName : []);
        setRegion(city.region ? city.region : '');
        setDuration(city.duration ? city.duration : 45);
        setTimeFormat(city.timeFormat ? city.timeFormat : 'min');
        setCityModelVisible(true);
    };

    const activationCityHandler = async (e, cityActivated) => {
        e.preventDefault()
        if (cityActivated.active) {
            setFormAction('Deactivat')
            cityActivated.active = false
        } else {
            setFormAction('Activat')
            cityActivated.active = true
        }

        await dispatch(saveDelivery({
            _id: _id, title: title, rateType: rateType, flatRate: flatRate, active: active,
            range: range, city: city.map(city => (
                city._id === cityActivated._id ?
                    cityActivated
                    : city)),
            activation: 'City'
        }))
    }

    const createCityHandler = () => {
        setFormAction('Create');
        openCityModel({});
    }

    const editCityHandler = (city) => {
        setFormAction('Edit');
        openCityModel(city);
    }

    const deleteCityHandler = async (e, _id_) => {
        e.preventDefault();
        await dispatch(saveDelivery({
            city: city.filter(city => city._id !== _id_ && city),
            _id: _id, title: title, rateType: rateType, flatRate: flatRate, range: range, active: active
        }));
        setCity(city.filter(city => city._id !== _id_ && city))
    }

    const addCityHandler = (e) => {
        setFormAction('Add');
        openCityModel({});
    }

    const citySubmitHandler = async (e) => {
        e.preventDefault()
        if (formAction === 'Edit') {
            if (city_id) {
                await dispatch(saveDelivery({
                    _id: _id, title: title, range: range, rateType: rateType, flatRate: flatRate, active: active,
                    city: [...city.map(city => city._id === city_id ? { _id: city_id, active: cityActive, cityName: cityName, region: region, duration: duration, timeFormat: timeFormat } : city)]
                }))
                setCity([...city.map(city => city._id === city_id ? { _id: city_id, active: cityActive, cityName: cityName, region: region, duration: duration, timeFormat: timeFormat } : city)])
                setCityModelVisible(false);
            }
        } else if (cityName && region && duration && timeFormat) {
            await dispatch(saveDelivery({
                _id: _id, title: title, range: range, rateType: rateType, flatRate: flatRate, active: active,
                city: [...city, { active: cityActive, cityName: cityName, region: region, duration: duration, timeFormat: timeFormat }]
            }))
            setCity([...city, { active: cityActive, cityName: cityName, region: region, duration: duration, timeFormat: timeFormat }]);
            setCityModelVisible(false);
        } else {
            setFormAlert('Kindly fill all required blanks!');
            setFormAlertVisible(true);
        }
    }

    window.addEventListener('click', (e) => {
        const cityOverlay = document.querySelector('.city-overlay');
        if (e.target === cityOverlay) {
            setCitiesManagerVisible(false)
            setCityModelVisible(false)
        }
    });

    // Dropdown
    const [dropdownListVisible, setDropdownListVisible] = useState(false);

    const addCityName = (cityNameAdded) => {
        setCityName([...cityName, cityNameAdded])
        setDropdownList(
            dropdownList.filter(dropName => dropName !== cityNameAdded && dropName)
        )
    }

    const removeCityName = (cityNameRemoved) => {
        setDropdownList([...dropdownList, cityNameRemoved])
        setCityName(
            cityName.filter(cityName => cityName !== cityNameRemoved && cityName)
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
                <h3 className="header-title">Delivery Zone Manager</h3>
                <button type="button" className="header-button" onClick={() => createHandler()}>Create delivery Zone</button>
            </div>
            {
                modelVisible &&
                <form className="form-form"
                    onSubmit={(e) => submitHandler(e)}>
                    <ul className="form-container-manager">
                        <FontAwesome name="fa-window-close" className="far fa-window-close fa-lg" onClick={() => setModelVisible(false)} />
                        <li>
                            <h2>{formAction == 'Copy' ? 'Create' : formAction} Delivery Zone</h2>
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
                        <th>title</th>
                        <th>City</th>
                        <th>Rate Type</th>
                        <th>Delivery Charge</th>
                        <th>Payment Charge</th>
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
                            <td>
                                <button className="show-rates"
                                    onClick={(e) => showCityHandler(delivery)}>
                                    Show Cities
                                    <FontAwesome className='fas fa-exclamation-circle' />
                                </button>
                            </td>
                            <td>{delivery.rateType}</td>
                            <td>{delivery.rateType === 'Flat' ? delivery.flatRate :
                                <button className="show-rates"
                                    onClick={(e) => showRatesHandler(delivery)}>
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

            {/*Range Model */}

            {
                rangeModelVisible &&
                <form className="form-form rate-range-form" onSubmit={(e) => rangeSubmitHandler(e)}>
                    <ul className="form-container-manager">
                        <FontAwesome name="fa-window-close" className="far fa-window-close fa-lg" onClick={() => setRangeModelVisible(false)} />
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
                            <button type="button" className="button secondary" onClick={() => setRangeModelVisible(false)}>
                                Back
                            </button>
                        </li>
                    </ul>
                </form>
            }
            {
                rangeManagerVisible &&
                <div className='range'>
                    <div className='range-overlay'>
                        <div className='range-form'>
                            <div className="control-page-header">
                                <h3 className="header-title">Rate Ranges Manager</h3>
                                <button type="button" className="header-button range-header-button" onClick={() => createRangeHandler()}>Add Rate Range</button>
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
                                    {range &&
                                        range.map((range) => (
                                            <tr key={range._id}>
                                                <td>{range.basedOn}</td>
                                                <td>{range.min}</td>
                                                <td>{range.max}</td>
                                                <td>{range.rate}</td>
                                                <td>
                                                    <button className="table-btns" onClick={() => editRangeHandler(range)}>Edit</button>
                                                    <button className="table-btns" onClick={(e) => deleteRangeHandler(e, range._id)}>Delete</button>
                                                    <button className="table-btns" onClick={() => addRangeHandler()}>Add Range</button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            }

            {/* City Manager */}

            {
                cityModelVisible &&
                <form className="form-form rate-range-form" onSubmit={(e) => citySubmitHandler(e)}>
                    <ul className="form-container-manager">
                        <FontAwesome name="fa-window-close" className="far fa-window-close fa-lg" onClick={() => setCityModelVisible(false)} />
                        <li>
                            <h2>{formAction} City</h2>
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
                        <div className='dropdown'>
                            <div className='dropdown-label'>City<p className="required">*</p></div>
                            <div className='dropdown-overlay'></div>
                            <div className='dropdown-container'>
                                <div className='dropdown-input' onClick={() => {
                                    document.querySelector('.dropdown-overlay').style.display = 'block';
                                    setDropdownListVisible(true)
                                }}>
                                    {cityName.map(cityName => (
                                        <div
                                            key={cityName}
                                            className='dropdown-checked'>
                                            {cityName}
                                            <FontAwesome className='fas fa-close dropdown-checked-close'
                                                onClick={() => removeCityName(cityName)} />
                                        </div>
                                    ))}
                                </div>
                                {dropdownListVisible &&
                                    <div className='dropdown-list'>
                                        {dropdownList.map(city => (
                                            !cityName.find(cityName => cityName === city) &&
                                            <div
                                                key={city}
                                                className='dropdown-choice'
                                                onClick={() => addCityName(city)}
                                            >
                                                {city}
                                            </div>

                                        ))}
                                    </div>
                                }
                            </div>
                        </div>
                        <li>
                            <label className="label" htmlFor="region">Region<p className="required">*</p></label>
                            <input
                                type="text"
                                name="region"
                                id="region"
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}
                            ></input>
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
                            {formAlertVisible &&
                                <div className="invalid">{formAlert}</div>}
                            <button type="submit" className="button primary">
                                {
                                    formAction == 'Edit' ? 'Apply Changes' : formAction
                                }
                            </button>
                            <button type="button" className="button secondary" onClick={() => setCityModelVisible(false)}>
                                Back
                            </button>
                        </li>
                    </ul>
                </form>
            }
            {
                CitiesManagerVisible &&
                <div className='range'>
                    <div className='city-overlay'>
                        <div className='range-form'>
                            <div className="control-page-header">
                                <h3 className="header-title">Cities List Manager</h3>
                                <button type="button" className="header-button range-header-button" onClick={() => createCityHandler()}>New City List</button>
                            </div>
                            <table className="range-table">
                                <thead>
                                    <tr>
                                        <th>Active</th>
                                        <th>Cities</th>
                                        <th>Region</th>
                                        <th>Delivery Duration</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {city &&
                                        city.map((city) => (
                                            <tr key={city._id}>
                                                <td className='td-active'>
                                                    <input
                                                        className='switch'
                                                        type="checkbox"
                                                        name={city._id}
                                                        id="active s2"
                                                        value={city.active}
                                                        checked={city.active}
                                                        onChange={(e) => activationCityHandler(e, city)}
                                                    ></input>
                                                </td>
                                                <td style={{ maxWidth: '30rem' }}>{city.cityName.map(name => (city.cityName).indexOf(name) === ((city.cityName).length - 1) ? name : name + ', ')}</td>
                                                <td>{city.region}</td>
                                                <td>{city.duration + city.timeFormat}</td>
                                                <td>
                                                    <button className="table-btns" onClick={() => editCityHandler(city)}>Edit</button>
                                                    <button className="table-btns" onClick={(e) => deleteCityHandler(e, city._id)}>Delete</button>
                                                    <button className="table-btns" onClick={() => addCityHandler()}>New</button>
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

// Delivery Model

import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema({
    title: { type: String, required: true, default: '' },
    city: {
        type: [{
            active: { type: Boolean, required: true, default: false },
            cityName: { type: Array, required: true, default: [] },
            region: { type: String, required: true, default: '' },
            duration: { type: String, required: true, default: '' },
            timeFormat: { type: String, required: true, default: '' },
        }], required: true, default: []
    },
    rateType: { type: String, required: true, default: 'Flat' },
    flatRate: { type: Number, required: true, default: 0 },
    range: {
        type: [{
            title: { type: String, required: true, default: '' },
            basedOn: { type: String, required: true, default: 'Order Value' },
            min: { type: Number, required: true, default: null },
            max: { type: Number, required: true, default: null },
            rate: { type: Number, required: true, default: null },
        }], required: true, default: []
    },
    active: { type: Boolean, required: true, default: false },
})

const Delivery = mongoose.model("Delivery", deliverySchema);

export default Delivery;

// Delivery Route

import express from "express";
import Delivery from "../modals/deliveryModel";
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get("", async (req, res) => {
    const delivery = await Delivery.find({});
    res.send(delivery);
});

router.post("", isAuth, isAdmin, async (req, res) => {
    const delivery = new Delivery({
        title: req.body.title,
        city: req.body.city,
        rateType: req.body.rateType,
        flatRate: req.body.flatRate,
        range: req.body.range,
        active: req.body.active,
    })
    const newDelivery = await delivery.save();
    if (newDelivery) {
        return res.status(201).send({ message: "New delivery created!", data: newDelivery })
    }
    return res.status(500).send({
        message: "Error in creating delivery!"
    })
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
    const delivery = await Delivery.findOne({ _id: req.params.id });
    if (delivery.activation === 'Delivery') {
        delivery.active = req.body.active;
    } else
        if (delivery.activation === 'City') {
            delivery = req.body.delivery;
        } else
            if (delivery) {
                delivery.title = req.body.title;
                delivery.city = req.body.city;
                delivery.rateType = req.body.rateType;
                delivery.flatRate = req.body.flatRate;
                delivery.range = req.body.range;
                delivery.active = req.body.active;
            };

    const deliveryUpdated = await delivery.save();

    if (deliveryUpdated) {
        return res.status(200).send({ message: "Delivery has been updated!", data: deliveryUpdated })
    }
    return res.status(500).send({
        message: "Error in updating delivery!"
    })
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const deliveryDeleted = await Delivery.findByIdAndRemove(req.params.id);
    if (deliveryDeleted) {
        return res.status(200).send({ message: "Delivery has been deleted!", data: deliveryDeleted });
    }
    return res.status(500).send({
        message: "Error in deleting delivery!"
    })
});

export default router;

// Delviery Actions 
import axios from "axios";
import {
    ZONE_LIST_SUCCESS,
    ZONE_LIST_FAIL,
    ZONE_LIST_REQUEST,
    ZONE_SAVE_FAIL,
    ZONE_SAVE_SUCCESS,
    ZONE_SAVE_REQUEST,
    ZONE_DELETE_REQUEST,
    ZONE_DELETE_SUCCESS,
    ZONE_DELETE_FAIL,
} from "../constants/constants";

const listZone = () => async (dispatch) => {
    try {
        dispatch({ type: ZONE_LIST_REQUEST })
        const { data } = await axios.get("/api/zone");
        dispatch({ type: ZONE_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ZONE_LIST_FAIL, payload: error.message })
    }
}

const saveZone = (zone) => async (dispatch, getState) => {
    try {
        dispatch({ type: ZONE_SAVE_REQUEST, payload: zone });
        const { userSignin: { userInfo } } = getState();

        if (delivery.activation === 'Delivery') {
            const { data } = await axios.put('/api/delivery/' + delivery._id, delivery, {
                headers: { 'Authorization': 'Bearer ' + userInfo.token }
            });
            dispatch({ type: ZONE_ACTIVATION_SUCCESS, payload: data })
        } else
            if (delivery.activation === 'City') {
                const { data } = await axios.put('/api/delivery/' + delivery._id, delivery, {
                    headers: { 'Authorization': 'Bearer ' + userInfo.token }
                });
                dispatch({ type: ZONE_ACTIVATION_SUCCESS, payload: data })
            }
            else {

                if (delivery._id) {
                    const { data } = await axios.put('/api/delivery/' + delivery._id, delivery, {
                        headers: { 'Authorization': 'Bearer ' + userInfo.token }
                    });
                    dispatch({ type: ZONE_SAVE_SUCCESS, payload: data })
                }

                else {
                    const { data } = await axios.post('/api/delivery', delivery, {
                        headers: { 'Authorization': 'Bearer ' + userInfo.token }
                    });
                    dispatch({ type: ZONE_SAVE_SUCCESS, payload: data })
                }
            }

    } catch (error) {
        dispatch({ type: ZONE_SAVE_FAIL, payload: error.message })
    }
};

const deleteDelivery = (_id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ZONE_DELETE_REQUEST });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.delete("/api/delivery/" + _id, {
            headers: { Authorization: 'Bearer ' + userInfo.token }
        });
        dispatch({ type: ZONE_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ZONE_DELETE_FAIL, payload: error.message });
    }
};

export {
    listDelivery, saveDelivery, deleteDelivery
};

// products manager with horizontal filters
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveProduct, listProducts, deleteProduct } from "../../actions/productActions";
import FontAwesome from 'react-fontawesome';
import axios from 'axios';

function ProductManager(props) {
    const [formAction, setFormAction] = useState();
    const [actionNote, setActionNote] = useState();
    const [actionNoteVisible, setActionNoteVisible] = useState(false);
    const [formAlert, setFormAlert] = useState('Kindly fill all required blanks!');
    const [formAlertVisible, setFormAlertVisible] = useState(false);
    const [modelVisible, setModelVisible] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [dropdownList, setDropdownList] = useState();
    const [dropdownListVisible, setDropdownListVisible] = useState(false);
    //const [brandList, setBrandList] = useState();

    const [_id, setId] = useState();
    const [nameEn, setNameEn] = useState();
    const [nameAr, setNameAr] = useState();
    const [image, setImage] = useState();
    const [brand, setBrand] = useState();
    const [category, setCategory] = useState();
    const [priceUsd, setPriceUsd] = useState();
    const [priceLbp, setPriceLbp] = useState();
    const [discount, setDiscount] = useState();
    const [countInStock, setCountInStock] = useState();
    const [unit, setUnit] = useState();
    const [description, setDescription] = useState();
    const [active, setActive] = useState(false);
    const [isFeatured, setIsFeatured] = useState(false);
    const [isPopular, setIsPopular] = useState(false);
    const [newArrival, setNewArrival] = useState(false);
    const [specialOffer, setSpecialOffer] = useState(false);
    const [productValues, setProductValues] = useState();
    const [propertiesVisible, setPropertiesVisible] = useState(false);

    // for category inputs in form
    const { success: successSave } = useSelector(state => state.productSave);

    const { success: successDelete } = useSelector(state => state.productDelete);

    const { products } = useSelector(state => state.productList);

    const [filteredProducts, setFilteredProducts] = useState(products);

    const { category: categoryList } = useSelector(state => state.categoryList);

    const { brand: brandlist } = useSelector(state => state.brandList);

    const unitList = ['gr', 'kg', 'cm', 'm', 'km', 'cm^2', 'm^2', 'ml', 'lt', 'gallon',
        'piece', 'box', 'packet', 'pair', 'MB', 'GB', 'sec', 'min', 'hr', 'day', 'week',
        'month', 'year', 'ounce', 'Ampere', 'person', 'member', 'group', 'team', 'unit']

    const dispatch = useDispatch();
    useEffect(() => {
        products && setFilteredProducts(products)
        if (successSave && formAction || successDelete) {
            setFormAlertVisible(false)
            setModelVisible(false);
            dispatch(listProducts())
            setActionNote(`Product ${formAction == 'Create' ? 'Creat' : formAction}ed succefully`)
            setActionNoteVisible(true);
            setInterval(() => setActionNoteVisible(false), 5000)
            setFormAction('');
        }
        return () => {
            //
        };
    }, [products, successSave, successDelete]);

    const openModel = async (product) => {

        setModelVisible(true);
        setId(product._id ? product._id : '');
        setActive(product.active ? product.active : false)
        setNameEn(product.nameEn ? product.nameEn : '');
        setNameAr(product.nameAr ? product.nameAr : '');
        setImage(product.image ? product.image : '');
        setBrand(product.brand ? product.brand : '');
        setCategory(product.category ? product.category : []);
        setPriceUsd(product.priceUsd ? product.priceUsd : '');
        setPriceLbp(product.priceLbp ? product.priceLbp : '');
        setDiscount(product.discount ? product.discount : 0)
        setCountInStock(product.countInStock ? product.countInStock : '');
        setUnit(product.unit ? product.unit : '');
        setDescription(product.description ? product.description : '');
        setIsFeatured(product.isFeatured ? product.isFeatured : false)
        setIsPopular(product.isPopular ? product.isPopular : false)
        setNewArrival(product.newArrival ? product.newArrival : false)
        setSpecialOffer(product.specialOffer ? product.specialOffer : false)
        // filter dropdown from existed categories
        let catList = categoryList.map(cat => cat.name);
        (product.category) &&
            (product.category).forEach(cExist => {
                catList = catList.filter(c => c !== cExist && c)
            })
        setDropdownList(catList.sort());
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const product = { _id, nameEn, nameAr, image, brand, category, priceUsd, priceLbp, discount, countInStock, unit, description, active, isFeatured, isPopular, newArrival, specialOffer };
        formAction == 'Copy' && delete product._id;
        if (nameEn != '' && image != '' && category != '' && priceUsd != '' && countInStock != '' && unit != '') {
            dispatch(saveProduct(product))
        }
        else setFormAlertVisible(true)
    };

    const activationHandler = (e, product) => {
        e.preventDefault()
        if (product.active) {
            setFormAction('Deactivat')
            product.active = false
        } else {
            setFormAction('Activat')
            product.active = true
        }
        dispatch(saveProduct({ ...product, activation: 'active' }))
    }

    const createHandler = () => {
        setFormAction('Create')
        openModel({})
        setPropertiesVisible(false)
    }

    const editHandler = (product) => {
        setFormAction('Edit');
        openModel(product);
        setPropertiesVisible(false)
    }

    const deleteHandler = (e, _id) => {
        e.preventDefault();
        dispatch(deleteProduct(_id));
        setPropertiesVisible(false)
    }

    const copyHandler = (product) => {
        setFormAction('Copy')
        openModel(product)
        setPropertiesVisible(false)
    }

    const uploadImageHandler = (e) => {
        e.preventDefault();
        const bodyFormData = new FormData();
        bodyFormData.append('image', image);
        setUploading(true);

        axios.post('/api/uploads', bodyFormData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .then((response) => {
                setImage(response.data);
                console.log(response.data)
                setUploading(false);
            })
            .catch((err) => {
                console.log(err);
                setUploading(false);
            });
    };

    // filter handlers
    const featuredFilter = () => {
        setFilteredProducts(products.filter(p => p.isFeatured === true))
    }
    const popularFilter = () => {
        setFilteredProducts(products.filter(p => p.isPopular === true))
    }
    const newArrivalFilter = () => {
        setFilteredProducts(products.filter(p => p.newArrival === true))
    }
    const specialOfferFilter = () => {
        setFilteredProducts(products.filter(p => p.specialOffer === true))
    }
    const activeFilter = () => {
        setFilteredProducts(products.filter(p => p.active === true))
    }
    const inActiveFilter = () => {
        setFilteredProducts(products.filter(p => p.active === false))
    }

    const discountFilter = () => {
        setFilteredProducts(products.filter(p => p.discount > 0))
    }

    const showPropertiesHandler = async (product) => {
        setModelVisible(false);
        await setProductValues(product);
        setDiscount(product.discount)
        setPropertiesVisible(true);
    }

    //properties Handlers
    const featuredHandler = (e, product) => {
        e.preventDefault();
        if (product.isFeatured)
            product.isFeatured = false
        else product.isFeatured = true

        dispatch(saveProduct(product))
    }
    const popularHandler = (e, product) => {
        e.preventDefault();
        if (product.isPopular)
            product.isPopular = false
        else product.isPopular = true

        dispatch(saveProduct(product))
    }
    const newArrivalHandler = (e, product) => {
        e.preventDefault();
        if (product.newArrival)
            product.newArrival = false
        else product.newArrival = true

        dispatch(saveProduct(product))
    }
    const specialOfferHandler = (e, product) => {
        e.preventDefault();
        if (product.specialOffer)
            product.specialOffer = false
        else product.specialOffer = true

        dispatch(saveProduct(product))
    }

    const discountHandler = (e, product) => {
        e.preventDefault();
        product.discount = discount;
        dispatch(saveProduct(product));
    }

    // Dropdown
    const addCategory = (categoryAdded) => {
        setCategory([...category, categoryAdded])
        setDropdownList(dropdownList.filter(drop => drop !== categoryAdded && drop))
    }

    const removeCategory = (categoryRemoved) => {
        setDropdownList([...dropdownList, categoryRemoved].sort())
        setCategory(category.filter(c => c !== categoryRemoved && c))
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
            {actionNoteVisible && <div className="action-note">{actionNote}</div>}
            <div className="control-page-header">
                <h3 className="header-title">Products Manager</h3>
                <button type="button" className="header-button" onClick={() => createHandler()}>Create Product</button>
                <div style={{ margin: '1rem' }}>Filter By:
                    <button className='filter-btn' type='button' onClick={activeFilter}>Active</button>
                    <button className='filter-btn' type='button' onClick={inActiveFilter}>InActive</button>
                    <button className='filter-btn' type='button' onClick={featuredFilter}>Featured</button>
                    <button className='filter-btn' type='button' onClick={popularFilter}>Popular</button>
                    <button className='filter-btn' type='button' onClick={newArrivalFilter}>New Arrival</button>
                    <button className='filter-btn' type='button' onClick={specialOfferFilter}>Special Offer</button>
                    <button className='filter-btn' type='button' onClick={discountFilter}>Discounted</button>
                </div>
            </div>
            {
                modelVisible &&
                <form className="form-form" onSubmit={(e) => submitHandler(e)}>
                    <ul className="form-container-manager">
                        <FontAwesome name="fa-window-close" className="far fa-window-close fa-lg" onClick={() => setModelVisible(false)} />
                        <li>
                            <h2>{formAction == 'Copy' ? 'Create' : formAction} Product</h2>
                        </li>
                        <li>
                            <label className="label" htmlFor="nameEn">Name in English<p className="required">*</p></label>
                            <input
                                type="text"
                                name="nameEn"
                                id="nameEn"
                                value={nameEn}
                                onChange={(e) => setNameEn(e.target.value)}
                            ></input>
                        </li>
                        <li>
                            <label className="label" htmlFor="nameAr">Name in Arabic<p className="required">*</p></label>
                            <input
                                type="text"
                                name="nameAr"
                                id="nameAr"
                                value={nameAr}
                                onChange={(e) => setNameAr(e.target.value)}
                            ></input>
                        </li>
                        <li>
                            {image &&
                                <img style={{
                                    width: '100%',
                                    maxHeight: '30rem',
                                    background: '#fff',
                                    borderRadius: '0.5rem',
                                    border: '1px #c0c0c0 solid',
                                    marginBottom: '1rem',
                                }} src={image} alt='product' />
                            }
                            <label className="label" htmlFor="img">{image && 'Update '}Image<p className="required">*</p></label>
                            <input
                                style={{ cursor: 'pointer' }}
                                type="file"
                                name="img"
                                id="img"
                                onChange={(e) => {
                                    setImage(e.target.files[0])
                                }}
                            ></input>
                            <button
                                className="button primary"
                                onClick={uploadImageHandler}
                            >Upload Image</button>
                        </li>
                        <div className='dropdown'>
                            <div className='dropdown-label'>Category<p className="required">*</p></div>
                            <div className='dropdown-overlay'></div>
                            <div className='dropdown-container'>
                                <div className='dropdown-input' onClick={() => {
                                    document.querySelector('.dropdown-overlay').style.display = 'block';
                                    setDropdownListVisible(true)
                                }}>
                                    {category.map(c => (
                                        <div
                                            key={c}
                                            className='dropdown-checked'>
                                            {c}
                                            <FontAwesome className='fas fa-close dropdown-checked-close'
                                                onClick={() => removeCategory(c)} />
                                        </div>
                                    ))}
                                    <FontAwesome className='fas fa-chevron-down' />
                                </div>
                                {dropdownListVisible &&
                                    <div className='dropdown-list'>
                                        {dropdownList.map(drop => (
                                            //!(category.find(c => c === drop)) &&
                                            <div
                                                key={drop}
                                                className='dropdown-choice'
                                                onClick={() => addCategory(drop)}
                                            >
                                                {drop}
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                        </div>
                        <li>
                            <div className="label">Brand</div>
                            <select
                                value={brand}
                                onChange={(e) => {
                                    setBrand(
                                        e.target.selectedIndex ?
                                            e.target.options[e.target.selectedIndex].value :
                                            e.target.value);
                                }}
                            >
                                {brandlist
                                    && brandlist.map((brand) => (
                                        <option key={brand._id} value={brand.name}>
                                            {brand.name}
                                        </option>
                                    ))}
                                <option key='' value=''>
                                    Other...
                                </option>
                            </select>
                        </li>
                        <li>
                            <label className="label" htmlFor="priceUsd">Price ($)<p className="required">*</p></label>
                            <input
                                type="number"
                                name="priceUsd"
                                id="priceUsd"
                                value={priceUsd}
                                onChange={(e) => setPriceUsd(e.target.value)}
                            ></input>
                        </li>
                        <li>
                            <label className="label" htmlFor="priceLbp">Price (Lbp)</label>
                            <input
                                type="number"
                                name="priceLbp"
                                id="priceLbp"
                                value={priceLbp}
                                onChange={(e) => setPriceLbp(e.target.value)}
                            ></input>
                        </li>
                        <li>
                            <label className="label" htmlFor="discount">Discount (%)<p className="required">*</p></label>
                            <input
                                type="number"
                                name="discount"
                                id="discount"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                            ></input>
                        </li>
                        <li>
                            <label className="label" htmlFor="countInStock">Quantity in Stock<p className="required">*</p></label>
                            <input
                                type="number"
                                name="countInStock"
                                id="countInStock"
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            ></input>
                        </li>
                        <li>
                            <div className="label">Unit<p className="required">*</p></div>
                            <select
                                value={unit}
                                onChange={(e) => {
                                    setUnit(
                                        e.target.selectedIndex ?
                                            e.target.options[e.target.selectedIndex].value :
                                            e.target.value);
                                }}
                            >
                                {unitList
                                    && unitList.map((unit) => (
                                        <option key={unit} value={unit}>
                                            {unit}
                                        </option>
                                    ))}
                                <option key='' value=''>
                                    Other...
                                </option>
                            </select>
                        </li>
                        <li>
                            <label className="label" htmlFor="description">Description<p className="required">*</p></label>
                            <textarea
                                name="description"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </li>
                        <li>
                            {formAlertVisible && <div className="invalid">{formAlert}</div>}
                            <button type="submit" className="button primary">
                                {
                                    formAction == 'Copy' ? 'Create' :
                                        formAction == 'Edit' ? 'Save' : formAction
                                }
                            </button>
                            <button type="button" className="button secondary" onClick={() => setModelVisible(false)}>
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
                        <th>Name</th>
                        <th>Price</th>
                        <th>Unit</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>In Stock</th>
                        <th>Properties</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts && filteredProducts.map((product) => (
                        <tr key={product._id}>
                            <td className='td-active'>
                                <input
                                    className='switch'
                                    type="checkbox"
                                    name={product._id}
                                    id="active s2"
                                    value={product.active}
                                    checked={product.active}
                                    onChange={(e) => activationHandler(e, product)}
                                ></input>
                            </td>
                            <td style={{ maxWidth: '20rem' }}>{product.nameEn}</td>
                            <td>{product.priceUsd}</td>
                            <td>{product.unit}</td>
                            <td style={{ maxWidth: '12rem' }}>{product.category.map(c =>
                                (product.category).indexOf(c) < (product.category).length - 1 ?
                                    c + ' | '
                                    : c)}
                            </td>
                            <td>{product.brand}</td>
                            <td>{product.countInStock}</td>
                            <td>
                                <div className="props-tags"
                                    onClick={(e) => showPropertiesHandler(product)}>
                                    {product.isFeatured && <div className='prop-tag'>F</div>}
                                    {product.isPopular && <div className='prop-tag'>P</div>}
                                    {product.newArrival && <div className='prop-tag'>N</div>}
                                    {product.specialOffer && <div className='prop-tag'>S</div>}
                                    {product.discount > 0 && <div className='prop-tag' style={{ backgroundColor: 'rgb(255, 21, 21)' }}>{product.discount}%</div>}
                                    {!product.isFeatured && !product.isPopular && !product.newArrival && !product.specialOffer && product.discount < 1 &&
                                        <FontAwesome className='fas fa-exclamation-circle fa-lg' />}
                                </div>
                            </td>
                            <td>
                                <button className="table-btns" onClick={() => editHandler(product)}>Edit</button>
                                <button className="table-btns" onClick={(e) => deleteHandler(e, product._id)}>Delete</button>
                                <button className="table-btns" onClick={() => copyHandler(product)}>Copy</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                propertiesVisible &&
                <form className="form-form">
                    <div className="form-container-manager">
                        <FontAwesome name="fa-window-close" className="far fa-window-close fa-lg" onClick={() => setPropertiesVisible(false)} />
                        <h2 style={{ marginTop: '3rem' }}>Product Properties</h2>
                        <table className='properties-table'>
                            <tr>
                                <th>Name</th>
                                <td>{productValues.nameEn}</td>
                            </tr>
                            <tr>
                                <th>Featured</th>
                                <td>
                                    <input
                                        className='switch'
                                        type='checkbox'
                                        name={productValues._id}
                                        id="active s2"
                                        value={productValues.isFeatured}
                                        checked={productValues.isFeatured}
                                        onChange={(e) => featuredHandler(e, productValues)}
                                    ></input>
                                </td>
                            </tr>
                            <tr>
                                <th>Popular</th>
                                <td>
                                    <input
                                        className='switch'
                                        type="checkbox"
                                        name={productValues._id}
                                        id="active s2"
                                        value={productValues.isPopular}
                                        checked={productValues.isPopular}
                                        onChange={(e) => popularHandler(e, productValues)}
                                    ></input>
                                </td>
                            </tr>
                            <tr>
                                <th>New Arrival</th>
                                <td>
                                    <input
                                        className='switch'
                                        type="checkbox"
                                        name={productValues._id}
                                        id="active s2"
                                        value={productValues.newArrival}
                                        checked={productValues.newArrival}
                                        onChange={(e) => newArrivalHandler(e, productValues)}
                                    ></input>
                                </td>
                            </tr>
                            <tr><th>Special Offer</th>
                                <td>
                                    <input
                                        className='switch'
                                        type="checkbox"
                                        name={productValues._id}
                                        id="active s2"
                                        value={productValues.specialOffer}
                                        checked={productValues.specialOffer}
                                        onChange={(e) => specialOfferHandler(e, productValues)}
                                    ></input>
                                </td>
                            </tr>
                            <tr><th>Discount (%)</th>
                                <td>
                                    <input
                                        className='discount-input'
                                        type="text"
                                        id="discount"
                                        value={discount}
                                        onChange={(e) => setDiscount(e.target.value)}
                                    ></input>
                                    <button
                                        style={{ marginLeft: '1rem', padding: '0.9rem' }}
                                        onClick={(e) => discountHandler(e, productValues)} className='primary button'>Save</button>
                                </td>
                            </tr>
                        </table>
                        <button style={{ marginTop: '3rem' }} type="button" className="button secondary" onClick={() => setPropertiesVisible(false)}>
                            Back
                        </button>
                    </div>
                </form>
            }
        </div>
    );
}
export default ProductManager;

// Map Tag

import React, { useState } from 'react';
import config from '../../config.js'
import MapGL, { Marker, GeolocateControl } from 'react-map-gl';
import dotenv from "dotenv";
import FontAwesome from 'react-fontawesome';
import { setRTLTextPlugin } from 'react-map-gl';

setRTLTextPlugin(
    'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
    null,
    true
);

const geolocateStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 10,
    visibility: 'public'
};

function Map() {
    dotenv.config()
    const REACT_APP_MAPBOX_TOKEN = config.REACT_APP_MAPBOX_TOKEN

    const state = {
        viewport: {
            height: 300,
            width: 300,
            latitude: 33.8938,
            longitude: 35.5018,
            zoom: 15,
            bearing: 0,
            pitch: 0,
        },
        marker: {
            latitude: 33.8938,
            longitude: 35.5018,
        },
        events: {},
        IP: {
            country_code: "LB",
            country_name: "Lebanon",
            city: "Beirut",
            postal: "",
            latitude: "31",
            longitude: "35.5018",
            IP: "185.89.86.28",
            state: ""
        }
    };

    const [viewport, setViewPort] = useState(state.viewport)
    const [marker, setMarker] = useState(state.marker)
    const [events, setEvents] = useState(state.events)
    const [IP, setIP] = useState(state.IP)

    const _updateViewport = async (viewport) => {
        setViewPort(viewport)
        await fetch('https://geolocation-db.com/json/697de680-a737-11ea-9820-af05f4014d91')
            .then(res => res.json())
            .then(IP => setIP(IP))
        console.log(viewport)
    };

    const _logDragEvent = (name, event) => {
        setEvents({
            ...events,
            [name]: event.lngLat
        });
    }

    const _onMarkerDragStart = (event) => {
        _logDragEvent('onDragStart', event)
    };

    const _onMarkerDrag = (event) => {
        _logDragEvent('onDrag', event)
    };

    const _onMarkerDragEnd = event => {
        _logDragEvent('onDragEnd', event)
        setMarker({
            longitude: event.lngLat[0],
            latitude: event.lngLat[1],
        });
    };

    return (
        <div className='MapGl'>
            <MapGL
                {...viewport}
                container='map'
                mapStyle='mapbox://styles/mapbox/streets-v11'
                mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
                onViewportChange={e => _updateViewport(e)}
                language='ar-AR'
            >
                <GeolocateControl
                    style={geolocateStyle}
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation={true}
                    onViewportChange={e => {
                        _updateViewport(e)
                        setMarker({
                            longitude: viewport.longitude,
                            latitude: viewport.latitude,
                        });
                    }
                    }
                />
                <Marker
                    latitude={marker.latitude}
                    longitude={marker.longitude}
                    draggable
                    onDragStart={e => _onMarkerDragStart(e)}
                    onDrag={e => _onMarkerDrag(e)}
                    onDragEnd={e => _onMarkerDragEnd(e)}
                >
                    <FontAwesome className="fas fa-map-marker fa-3x" />
                </Marker>
            </MapGL>
            <div>{marker.longitude}</div>
            <div>{marker.latitude}</div>
        </div>
    );
}

export default Map;

((currentWeekDay === 'Monday' && employee.workTime.mon) ?
    (currentHour > employee.workTime.mon.from.slice(0, 2) || (currentHour == employee.workTime.mon.from.slice(0, 2) && currentMinutes >= employee.workTime.mon.from.slice(3, 5)))
    && (currentHour < employee.workTime.mon.to.slice(0, 2) || (currentHour == employee.workTime.mon.to.slice(0, 2)) && currentMinutes < employee.workTime.mon.to.slice(3, 5))
    && employee.workTime.mon.to

    : (currentWeekDay === 'Tuesday' && employee.workTime.tue) ?
        (currentHour > employee.workTime.tue.from.slice(0, 2) || (currentHour == employee.workTime.tue.from.slice(0, 2) && currentMinutes >= employee.workTime.tue.from.slice(3, 5)))
        && (currentHour < employee.workTime.tue.to.slice(0, 2) || (currentHour == employee.workTime.tue.to.slice(0, 2)) && currentMinutes < employee.workTime.tue.to.slice(3, 5))
        && employee.workTime.tue.to

        : (currentWeekDay === 'Wednesday' && employee.workTime.wed) ?
            (currentHour > employee.workTime.wed.from.slice(0, 2) || (currentHour == employee.workTime.wed.from.slice(0, 2) && currentMinutes >= employee.workTime.wed.from.slice(3, 5)))
            && (currentHour < employee.workTime.wed.to.slice(0, 2) || (currentHour == employee.workTime.wed.to.slice(0, 2)) && currentMinutes < employee.workTime.wed.to.slice(3, 5))
            && employee.workTime.wed.to

            : (currentWeekDay === 'Thursday' && employee.workTime.thu) ?
                (currentHour > employee.workTime.thu.from.slice(0, 2) || (currentHour == employee.workTime.thu.from.slice(0, 2) && currentMinutes >= employee.workTime.thu.from.slice(3, 5)))
                && (currentHour < employee.workTime.thu.to.slice(0, 2) || (currentHour == employee.workTime.thu.to.slice(0, 2)) && currentMinutes < employee.workTime.thu.to.slice(3, 5))
                && employee.workTime.thu.to

                : (currentWeekDay === 'Friday' && employee.workTime.fri) ?
                    (currentHour > employee.workTime.fri.from.slice(0, 2) || (currentHour == employee.workTime.fri.from.slice(0, 2) && currentMinutes >= employee.workTime.fri.from.slice(3, 5)))
                    && (currentHour < employee.workTime.fri.to.slice(0, 2) || (currentHour == employee.workTime.fri.to.slice(0, 2)) && currentMinutes < employee.workTime.fri.to.slice(3, 5))
                    && employee.workTime.fri.to

                    : (currentWeekDay === 'Saturday' && employee.workTime.sat) ?
                        (currentHour > employee.workTime.sat.from.slice(0, 2) || (currentHour == employee.workTime.sat.from.slice(0, 2) && currentMinutes >= employee.workTime.sat.from.slice(3, 5)))
                        && (currentHour < employee.workTime.sat.to.slice(0, 2) || (currentHour == employee.workTime.sat.to.slice(0, 2)) && currentMinutes < employee.workTime.sat.to.slice(3, 5))
                        && employee.workTime.sat.to

                        : (currentWeekDay === 'Sunday' && employee.workTime.sun) ?
                            (currentHour > employee.workTime.sun.from.slice(0, 2) || (currentHour == employee.workTime.sun.from.slice(0, 2) && currentMinutes >= employee.workTime.sun.from.slice(3, 5)))
                            && (currentHour < employee.workTime.sun.to.slice(0, 2) || (currentHour == employee.workTime.sun.to.slice(0, 2)) && currentMinutes < employee.workTime.sun.to.slice(3, 5))
                            && employee.workTime.sun.to
                            : undefined)

    ((currentWeekDay === 'Monday' && employee.workTime.mon) ? employee.workTime.mon.to
        : (currentWeekDay === 'Tuesday' && employee.workTime.tue) ? employee.workTime.tue.to
            : (currentWeekDay === 'Wednesday' && employee.workTime.wed) ? employee.workTime.wed.to
                : (currentWeekDay === 'Thursday' && employee.workTime.thu) ? employee.workTime.thu.to
                    : (currentWeekDay === 'Friday' && employee.workTime.fri) ? employee.workTime.fri.to
                        : (currentWeekDay === 'Saturday' && employee.workTime.sat) ? employee.workTime.sat.to
                            : (currentWeekDay === 'Sunday' && employee.workTime.sun) ? employee.workTime.sun.to
                                : undefined)



MONGODB_URL = mongodb + srv://mohamad-baker-obeid:Beirut@GroupTT123@cluster0.rddec.mongodb.net/sarahoriginals?retryWrites=true&w=majority
app.listen(config.PORT || 5000, () => {
    console.log("Server started at http://localhost:config.PORT||5000");
});