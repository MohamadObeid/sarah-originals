import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveBrand, listBrand, deleteBrand } from "../../actions/brandActions";
import FontAwesome from 'react-fontawesome';
import axios from "axios";

function BrandManager(props) {
    const imageUrl = window.location.origin + '/api/uploads/image/'
    const [formAction, setFormAction] = useState('Create')
    const [formNote, setFormNote] = useState()
    const [formNoteVisible, setFormNoteVisible] = useState(false)
    const [formAlert, setFormAlert] = useState()
    const [formAlertVisible, setFormAlertVisible] = useState()
    const [modelVisible, setModelVisible] = useState(false)
    const [historyVisible, setHistoryVisible] = useState(false)
    const [uploading, setUploading] = useState()

    const [_id, setId] = useState()
    const [modified, setModified] = useState()
    const [name, setName] = useState()
    const [origin, setOrigin] = useState()
    const [supplier, setSupplier] = useState()
    const [phone, setPhone] = useState()
    const [description, setDescription] = useState()
    const [brandValues, setBrandValues] = useState()
    const [image, setImage] = useState()
    const [active, setActive] = useState(false)

    const { success: successSave } = useSelector(state => state.brandSave)
    const { success: successDelete } = useSelector(state => state.brandDelete)
    const { userInfo } = useSelector(state => state.userSignin)
    const { brand } = useSelector(state => state.brandList)

    const dispatch = useDispatch();
    useEffect(() => {
        if (successSave || successDelete) {
            setFormAlertVisible(false)
            setModelVisible(false);
            dispatch(listBrand())
            setFormNote(`Brand ${formAction == 'Create' ? 'Creat' : formAction}ed succefully`)
            setFormNoteVisible(true);
            setInterval(() => setFormNoteVisible(false), 5000)
            setFormAction('')
            dispatch(saveBrand('clear'))
        }
        return () => {
            //
        };
    }, [successSave, successDelete]);

    const modifiedArray = (brand) => {
        let modifiedNote = []
        if (active !== brand.active) modifiedNote = [...modifiedNote, 'Activation']
        if (name !== brand.name) modifiedNote = [...modifiedNote, 'Name']
        if (origin !== brand.origin) modifiedNote = [...modifiedNote, 'Origin']
        if (supplier !== brand.supplier) modifiedNote = [...modifiedNote, 'Supplier']
        if (phone !== brand.phone) modifiedNote = [...modifiedNote, 'Phone']
        if (image !== brand.image) modifiedNote = [...modifiedNote, 'Image']
        if (description !== brand.description) modifiedNote = [...modifiedNote, 'Description']
        return [...modified, { modified_date: Date.now() + 10800000, modified_by: userInfo.name, modified_note: modifiedNote }]
    }

    const openModel = async (brand) => {
        setFormAlertVisible(false)
        setModelVisible(true)
        setId(brand._id ? brand._id : '')
        setModified(brand.modified ? brand.modified : [])
        setName(brand.name ? brand.name : '')
        setActive(brand.active ? brand.active : false)
        setOrigin(brand.origin ? brand.origin : '')
        setSupplier(brand.supplier ? brand.supplier : '')
        setPhone(brand.phone ? brand.phone : undefined)
        setImage(brand.image ? brand.image : undefined)
        setDescription(brand.description ? brand.description : '')
    };

    const submitHandler = (e) => {
        e.preventDefault()
        const brandExist = brand.find(brand => brand._id === _id)
        const nameExist = brand.find(brand => brand.name === name)

        if (!brandExist || brandExist && formAction == 'Edit') {
            if (formAction == 'Copy' || formAction == 'Create')
                dispatch(saveBrand({ modified: [], created_by: userInfo.name, creation_date: Date.now() + 10800000, active, name, origin, supplier, phone, image, description }))
            else {
                // set modified
                dispatch(saveBrand({ modified: modifiedArray(brandExist), created_by: brandExist.created_by, creation_date: userInfo.creation_date, _id, active, name, origin, supplier, phone, image, description }))
            }
        } else if (nameExist) {
            setFormAlert('The brand name already exists.')
            setFormAlertVisible(true)
        }
    }

    const createHandler = () => {
        setFormAction('Create')
        openModel({})
    }

    const editHandler = (brand) => {
        setFormAction('Edit')
        openModel(brand)
    }

    const deleteHandler = (e, _id) => {
        e.preventDefault()
        setFormAction('Delete')
        dispatch(deleteBrand(_id))
    }

    const copyHandler = (brand) => {
        setFormAction('Copy')
        openModel(brand)
    }

    const showHistoryHandler = (brand) => {
        setHistoryVisible(true)
        setBrandValues(brand)
    }

    const activationHandler = (e, brand) => {
        e.preventDefault()
        if (brand.active) {
            setFormAction('Deactivat')
            brand.active = false
        } else {
            setFormAction('Activat')
            brand.active = true
        }
        brand.modified = [...brand.modified, {
            modified_date: Date.now() + 10800000,
            modified_by: userInfo.name, modified_note: ['Activation']
        }]
        dispatch(saveBrand(brand))
    }

    window.addEventListener('click', (e) => {
        const rangeOverlay = document.querySelector('.range-overlay');
        if (e.target === rangeOverlay) {
            setHistoryVisible(false)
            setModelVisible(false)
        }
    })

    const fetchRecent = () => {
        axios.get('/api/uploads/recent')
            .then((response) => {
                setImage(response.data.image.filename);
            })
            .catch(err => alert('Error: ' + err));
    }

    const uploadImageHandler = (e) => {
        e.preventDefault();
        const bodyFormData = new FormData();
        bodyFormData.append('file', image);
        setUploading(true);

        axios
            //.post('/api/uploads/s3', bodyFormData, {
            .post('/api/uploads', bodyFormData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((response) => {
                response.data.success && alert('File successfully uploaded');
                fetchRecent();
                setUploading(false)
            })
            .catch((err) => {
                console.log(err);
                setUploading(false);
            });
    };

    const modifiedNoteHandler = (modified) => {
        return (
            (modified.modified_by && modified.modified_by + ' ')
            + (modified.modified_note[0] && (modified.modified_note[0].includes("'", 0) ? ' commented ' : ' edited '))
            + modified.modified_note.map(note =>
                (modified.modified_note.indexOf(note) < (modified.modified_note).length - 1
                    ? ' ' + note
                    : (modified.modified_note).length === 1 ? note : ' and ' + note))
        )
    }

    return (
        <div>
            {formNoteVisible && <div className="action-note">{formNote}</div>}
            <div className="control-page-header">
                <h3 className="header-title">Brand Manager</h3>
                <button type="button" className="header-button" onClick={() => createHandler()}>Create Brand</button>
            </div>
            {
                modelVisible &&
                <form className="form-form" onSubmit={(e) => submitHandler(e)}>
                    <ul className="form-container-manager">
                        <FontAwesome name="fa-window-close" className="far fa-window-close fa-lg" onClick={() => setModelVisible(false)} />
                        <li>
                            <h2>{formAction == 'Copy' ? 'Create' : formAction} brand</h2>
                        </li>
                        <li>
                            <label className="label" htmlFor="name">Brand Name<p className="required">*</p></label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                                }} src={imageUrl + image} alt='employee' />
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
                            >Upload Photo</button>
                        </li>
                        <li>
                            <label className="label" htmlFor="origin">Origin<p className="required">*</p></label>
                            <input
                                type="text"
                                name="origin"
                                id="origin"
                                value={origin}
                                onChange={(e) => setOrigin(e.target.value)}
                            ></input>
                        </li>
                        <li>
                            <label className="label" htmlFor="supplier">Supplier<p className="required">*</p></label>
                            <input
                                type="text"
                                name="supplier"
                                id="supplier"
                                value={supplier}
                                onChange={(e) => setSupplier(e.target.value)}
                            ></input>
                        </li>
                        <li>
                            <label className="label" htmlFor="phone">Phone #</label>
                            <input
                                type='number'
                                name="phone"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            ></input>
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
                            {formAlertVisible &&
                                <div className="invalid">{formAlert}</div>}
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
                        <th style={{ paddingRight: '0.5rem' }}>Active</th>
                        <th style={{ textAlign: 'center' }}>Image</th>
                        <th>Brand</th>
                        <th>Origin</th>
                        <th>Supplier</th>
                        <th>Phone#</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {brand.map((brand) => (
                        <tr key={brand._id}>
                            <td className='td-active'>
                                <input
                                    className='switch'
                                    type="checkbox"
                                    name={brand._id}
                                    id="active s2"
                                    value={brand.active}
                                    checked={brand.active}
                                    onChange={(e) => activationHandler(e, brand)}
                                ></input>
                            </td>
                            <td className='td-img'>
                                <img
                                    className='employee-image'
                                    src={imageUrl + brand.image} alt={brand.name} />
                            </td>
                            <td>{brand.name}</td>
                            <td>{brand.origin}</td>
                            <td>{brand.supplier}</td>
                            <td>{brand.phone}</td>
                            <td style={{ maxWidth: '17rem' }}>
                                <button className="table-btns" onClick={() => editHandler(brand)}>Edit</button>
                                <button className="table-btns" onClick={(e) => deleteHandler(e, brand._id)}>Delete</button>
                                <button className="table-btns" onClick={() => copyHandler(brand)}>Copy</button>
                                <button className="table-btns" onClick={() => showHistoryHandler(brand)}>History</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                historyVisible &&
                <div className='range'>
                    <div className='range-overlay history-overlay' style={{ zIndex: '4' }}>
                        <div className='range-form'>
                            <div className='history-title' style={{ margin: '1rem' }}>{brandValues.name} History</div>
                            <table className="range-table">
                                <thead>
                                    <tr>
                                        <th style={{ width: '15rem' }}>Date</th>
                                        <th>Note</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={brandValues._id}>
                                        <td>{brandValues.creation_date && brandValues.creation_date.split("T", 1) + '  '
                                            + brandValues.creation_date.slice(brandValues.creation_date.indexOf('T') + 1, -1).slice(0, 5)}
                                        </td>
                                        <td>{brandValues.created_by && brandValues.created_by} added {brandValues.firstName + ' ' + brandValues.lastName}.</td>
                                    </tr>
                                    {brandValues.modified &&
                                        brandValues.modified.map(modified => (
                                            <tr>
                                                <td>{modified.modified_date && modified.modified_date.split("T", 1) + '  '
                                                    + modified.modified_date.slice(modified.modified_date.indexOf('T') + 1, -1).slice(0, 5)}
                                                </td>
                                                <td>{modifiedNoteHandler(modified)}
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
    )
}
export default BrandManager;
