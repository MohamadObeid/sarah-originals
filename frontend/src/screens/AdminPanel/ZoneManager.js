import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveZone, listZone, deleteZone } from "../../actions/zoneActions";
import FontAwesome from 'react-fontawesome';
import { cityList } from '../../constants/lists.js';
import config from '../../config.js'
import MapGL, { Marker, GeolocateControl } from 'react-map-gl';
import dotenv from "dotenv";
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

function ZoneManager(props) {

    dotenv.config()
    const REACT_APP_MAPBOX_TOKEN = config.REACT_APP_MAPBOX_TOKEN

    const state = {
        viewport: {
            position: 'block',
            height: 400,
            width: 600,
            top: 100,
            zoom: 12,
            bearing: 0,
            pitch: 0,
        },
        lngLat: {
            latitude: 33.8938,
            longitude: 35.5018,
        },
        marker: {
            latitude: 33.8938,
            longitude: 35.5018,
        },
        events: {}
    };
    const [lngLat, setLngLat] = useState(state.lngLat)
    const [viewport, setViewPort] = useState(state.viewport)
    const [marker, setMarker] = useState(state.marker)
    const [events, setEvents] = useState(state.events)
    const [IP, setIP] = useState()

    const _updateViewport = (viewport) => {
        setViewPort(viewport)
        setLngLat({ latitude: viewport.latitude, longitude: viewport.longitude })
    };

    const _logDragEvent = (name, event) => {
        setEvents({
            ...events,
            [name]: event.lngLat
        })
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
        setLngLat({ latitude: event.lngLat[1], longitude: event.lngLat[0] })
        setLatitude(event.lngLat[1])
        setLongitude(event.lngLat[0])
    };

    const [formAction, setFormAction] = useState()
    const [formNote, setFormNote] = useState()
    const [formNoteVisible, setFormNoteVisible] = useState(false)
    const [formAlert, setFormAlert] = useState()
    const [formAlertVisible, setFormAlertVisible] = useState()
    const [modelVisible, setModelVisible] = useState(false)
    const [mapVisible, setMapVisible] = useState(false)
    const [mapSetVisible, setMapSetVisible] = useState(false)

    // Zone consts
    const [_id, set_id] = useState()
    const [active, setActive] = useState(false)
    const [zone, setZone] = useState()
    const [region, setRegion] = useState()
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()

    const { success: successSave } = useSelector(state => state.zoneSave)
    const { success: successDelete } = useSelector(state => state.zoneDelete)
    const { zone: zoneList } = useSelector(state => state.zoneList)

    const dispatch = useDispatch()

    useEffect(() => {
        if ((successSave && formAction) || successDelete) {
            setFormAlertVisible(false)
            setModelVisible(false);
            dispatch(listZone())
            setFormNote(`Zone Method ${(formAction === 'Create' || formAction === 'Copy') ? 'Creat' : formAction}ed succefully`)
            setFormNoteVisible(true);
            setInterval(() => setFormNoteVisible(false), 5000)
            setFormAction('');
        }
        fetch('https://geolocation-db.com/json/697de680-a737-11ea-9820-af05f4014d91')
            .then(res => res.json())
            .then(IP => setIP(IP))
        return () => {
            //
        };
    }, [successSave, successDelete])

    // Delivery Table Handlers
    const openModel = (zone) => {
        setFormAlertVisible(false)

        set_id(zone._id ? zone._id : undefined)
        setActive(zone.active ? zone.active : false)
        setZone(zone.zone ? zone.zone : 'Beirut')
        setRegion(zone.region ? zone.region : '')
        setLatitude(parseFloat(zone.latitude) ? parseFloat(zone.latitude) : 33.8938)
        setLongitude(parseFloat(zone.longitude) ? parseFloat(zone.longitude) : 35.5018)

        setModelVisible(true);
    };

    // zone button handlers
    const activationHandler = (e, zone) => {
        e.preventDefault()
        if (zone.active) {
            setFormAction('Deactivat')
            zone.active = false
        } else {
            setFormAction('Activat')
            zone.active = true
        }
        dispatch(saveZone(zone))
    }

    const showMapHandler = (zone) => {
        if (zone.latitude && zone.longitude) {
            setLngLat({ latitude: zone.latitude, longitude: zone.longitude })
        }
        setModelVisible(false)
        setMapVisible(true)
    }

    const mapSetHandler = async () => {
        if (latitude && longitude) {
            await setLngLat({ latitude: latitude, longitude: longitude })
        }
        setMapSetVisible(true)
    }

    const createHandler = () => {
        setFormAction('Create')
        openModel({})
    }

    const editHandler = (zone) => {
        setFormAction('Edit')
        openModel(zone)
    }

    const deleteHandler = (e, _id) => {
        e.preventDefault();
        setFormAction('Delet')
        dispatch(deleteZone(_id))
    }

    const copyHandler = (zone) => {
        setFormAction('Copy')
        openModel(zone)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const zoneExist = zoneList.find(zone_ => zone_.zone === zone)
        if (!zoneExist || (zoneExist && formAction === 'Edit')) {
            if (zone && region && latitude && longitude) {
                (formAction === 'Create' || formAction === 'Copy') ?
                    dispatch(saveZone({ active: active, zone: zone, region: region, latitude: latitude, longitude: longitude }))
                    : dispatch(saveZone({ _id: _id, active: active, zone: zone, region: region, latitude: latitude, longitude: longitude }))
            } else {
                setFormAlert('Kindly fill all required blanks!')
                setFormAlertVisible(true)
            }
        } else {
            setFormAlert('There exist another same Zone.')
            setFormAlertVisible(true)
        }
    };

    window.addEventListener('click', (e) => {
        const mapOverlay = document.querySelector('.map-overlay')
        if (e.target === mapOverlay) {
            setMapSetVisible(false)
            setMapVisible(false)
        }
    })

    return (
        <div>
            {formNoteVisible && <div className="action-note">{formNote}</div>}
            <div className="control-page-header">
                <h3 className="header-title">Zone Manager</h3>
                <button type="button" className="header-button" onClick={() => createHandler()}>New Zone</button>
            </div>
            {
                modelVisible &&
                <form className="form-form"
                    onSubmit={(e) => submitHandler(e)}>
                    <ul className="form-container-manager">
                        <FontAwesome name="fa-window-close" className="far fa-window-close fa-lg" onClick={() => setModelVisible(false)} />
                        <li>
                            <h2>{formAction == 'Copy' ? 'Create' : formAction} Zone</h2>
                        </li>
                        <li>
                            <label className="label" htmlFor="zone">Zone
                            <p className="required">*</p>
                            </label>
                            <select
                                value={zone}
                                onChange={(e) => {
                                    setZone(
                                        e.target.selectedIndex ?
                                            e.target.options[e.target.selectedIndex].value :
                                            e.target.value);
                                }}>
                                {cityList.map((zone) => (
                                    <option key={zone} value={zone}>
                                        {zone}
                                    </option>
                                ))}
                            </select>
                        </li>
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
                            <label className="label" htmlFor="latitude">Latitude<p className="required">*</p></label>
                            <input
                                type="text"
                                name="latitude"
                                id="latitude"
                                value={latitude}
                                onChange={(e) => {
                                    setLatitude(parseFloat(e.target.value))
                                    setLngLat({ latitude: parseFloat(e.target.value), longitude: longitude })
                                    setMarker({ latitude: parseFloat(e.target.value), longitude: longitude })
                                }}
                            ></input>
                        </li>
                        <li>
                            <label className="label" htmlFor="longitude">Longitude<p className="required">*</p></label>
                            <input
                                type="text"
                                name="longitude"
                                id="longitude"
                                value={longitude}
                                onChange={(e) => {
                                    setLongitude(parseFloat(e.target.value))
                                    setLngLat({ latitude: latitude, longitude: parseFloat(e.target.value) })
                                    setMarker({ latitude: latitude, longitude: parseFloat(e.target.value) })
                                }}
                            ></input>
                            <label
                                className='locate-label'
                                onClick={() => mapSetHandler()}>
                                <FontAwesome className="fas fa-map-marker form-marker fa-2x" />
                                Set Location on Map
                            </label>
                        </li>
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
            {mapSetVisible &&
                <div className='map-div'>
                    <div className='map-overlay'></div>
                    <div className='map-container'>
                        <MapGL
                            {...viewport}
                            {...lngLat}
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
                                        longitude: e.longitude,
                                        latitude: e.latitude,
                                    });
                                    setLatitude(e.latitude)
                                    setLongitude(e.longitude)
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
                                <FontAwesome className="fas fa-map-marker marker fa-3x" />
                            </Marker>
                        </MapGL>
                    </div>
                </div>
            }
            <table className="table">
                <thead>
                    <tr>
                        <th>Active</th>
                        <th>Zone</th>
                        <th>Region</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {zoneList &&
                        zoneList.map((zone) => (
                            <tr key={zone._id}>
                                <td className='td-active'>
                                    <input
                                        className='switch'
                                        type="checkbox"
                                        name={zone._id}
                                        id="active s2"
                                        value={zone.active}
                                        checked={zone.active}
                                        onChange={(e) => activationHandler(e, zone)}
                                    ></input>
                                </td>
                                <td>{zone.zone}</td>
                                <td>{zone.region}</td>
                                <td>
                                    <button className="show-rates"
                                        onClick={(e) => showMapHandler(zone)}>
                                        Show on Map
                                    <FontAwesome className='fas fa-exclamation-circle' />
                                    </button>
                                </td>
                                <td>
                                    <button className="table-btns" onClick={() => editHandler(zone)}>Edit</button>
                                    <button className="table-btns" onClick={(e) => deleteHandler(e, zone._id)}>Delete</button>
                                    <button className="table-btns" onClick={() => copyHandler(zone)}>Copy</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            {
                mapVisible &&
                <div className='map-div'>
                    <div className='map-overlay'></div>
                    <div className='map-container'>
                        <MapGL
                            {...viewport}
                            {...lngLat}
                            zoom={13}
                            container='map'
                            mapStyle='mapbox://styles/mapbox/streets-v11'
                            mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
                            language='ar-AR'
                        />
                    </div>
                </div>
            }
        </div >
    );
}

export default ZoneManager;
