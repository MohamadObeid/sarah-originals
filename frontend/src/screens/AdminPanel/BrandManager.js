import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveBrand, listBrand, deleteBrand } from "../../actions/brandActions";
import FontAwesome from 'react-fontawesome';

function BrandManager(props) {
    const [formAction, setFormAction] = useState('Create')
    const [formNote, setFormNote] = useState()
    const [formNoteVisible, setFormNoteVisible] = useState(false)
    const [formAlert, setFormAlert] = useState()
    const [formAlertVisible, setFormAlertVisible] = useState()
    const [modelVisible, setModelVisible] = useState(false)
    const [historyVisible, setHistoryVisible] = useState(false)

    const [_id, setId] = useState()
    const [modified, setModified] = useState()
    const [name, setName] = useState()
    const [origin, setOrigin] = useState()
    const [supplier, setSupplier] = useState()
    const [phone, setPhone] = useState()
    const [description, setDescription] = useState()
    const [historyDetails, setHistoryDetails] = useState()

    const { success: successSave } = useSelector(state => state.brandSave)
    const { success: successDelete } = useSelector(state => state.brandDelete)
    const { userInfo } = useSelector(state => state.userSignin)
    const { brand } = useSelector(state => state.brandList)

    const dispatch = useDispatch();
    useEffect(() => {
        if (successSave && modelVisible || successDelete) {
            setFormAlertVisible(false)
            setModelVisible(false);
            dispatch(listBrand())
            setFormNote(`Brand ${formAction == 'Create' ? 'Creat' : formAction}ed succefully`)
            setFormNoteVisible(true);
            setInterval(() => setFormNoteVisible(false), 5000)
            setFormAction('')
        }
        return () => {
            //
        };
    }, [successSave, successDelete]);

    const modifiedArray = (brand) => {
        let modifiedNote = []
        if (name !== brand.name) modifiedNote = [...modifiedNote, 'Name']
        if (origin !== brand.origin) modifiedNote = [...modifiedNote, 'Origin']
        if (supplier !== brand.supplier) modifiedNote = [...modifiedNote, 'Supplier']
        if (phone !== brand.phone) modifiedNote = [...modifiedNote, 'Phone']
        if (description !== brand.description) modifiedNote = [...modifiedNote, 'Description']
        return [...modified, { modified_date: Date.now() + 10800000, modified_by: userInfo.name, modified_note: modifiedNote }]
    }

    const openModel = async (brand) => {
        setFormAlertVisible(false)
        setModelVisible(true)
        setId(brand._id ? brand._id : '')
        setModified(brand.modified ? brand.modified : [])
        setName(brand.name ? brand.name : '')
        setOrigin(brand.origin ? brand.origin : '')
        setSupplier(brand.supplier ? brand.supplier : '')
        setPhone(brand.phone ? brand.phone : undefined)
        setDescription(brand.description ? brand.description : '')
    };

    const submitHandler = (e) => {
        e.preventDefault()
        const brandExist = brand.find(brand => brand._id === _id)
        const nameExist = brand.find(brand => brand.name === name)

        if (!brandExist || brandExist && formAction == 'Edit') {
            if (formAction == 'Copy' || formAction == 'Create')
                dispatch(saveBrand({ modified: [], created_by: userInfo.name, creation_date: Date.now() + 10800000, name, origin, supplier, phone, description }))
            else {
                // set modified
                dispatch(saveBrand({ modified: modifiedArray(brandExist), created_by: brandExist.created_by, creation_date: userInfo.creation_date, _id, name, origin, supplier, phone, description }))
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
        setHistoryDetails(brand)
    }

    window.addEventListener('click', (e) => {
        const rangeOverlay = document.querySelector('.range-overlay');
        if (e.target === rangeOverlay) {
            setHistoryVisible(false)
            setModelVisible(false)
        }
    })

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
                            <td>{brand.name}</td>
                            <td>{brand.origin}</td>
                            <td>{brand.supplier}</td>
                            <td>{brand.phone}</td>
                            <td style={{ maxWidth: '17rem' }}>
                                <button className="table-btns" onClick={() => editHandler(brand)}>Edit</button>
                                <button className="table-btns" onClick={(e) => deleteHandler(e, brand._id)}>Delete</button>
                                <button className="table-btns" onClick={() => copyHandler(brand)}>Copy</button>
                                <button className="table-btns" onClick={() => showHistoryHandler(brand)}>History
                                <FontAwesome style={{ cursor: 'pointer' }} className='fas fa-exclamation-circle' />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                historyVisible &&
                <div className='range'>
                    <div className='range-overlay'>
                        <div className='range-form'>
                            <table className="range-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Admin</th>
                                        <th>Note</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={historyDetails._id}>
                                        <td>{historyDetails.creation_date && historyDetails.creation_date.split("T", 1) + '  '
                                            + historyDetails.creation_date.slice(historyDetails.creation_date.indexOf('T') + 1, -1).slice(0, 5)}
                                        </td>
                                        <td>{historyDetails.created_by && historyDetails.created_by}</td>
                                        <td>Brand was Created</td>
                                    </tr>
                                    {historyDetails.modified &&
                                        historyDetails.modified.map(modified => (
                                            <tr>
                                                <td>{modified.modified_date && modified.modified_date.split("T", 1) + '  '
                                                    + modified.modified_date.slice(modified.modified_date.indexOf('T') + 1, -1).slice(0, 5)}
                                                </td>
                                                <td>{modified.modified_by && modified.modified_by}</td>
                                                <td>{modified.modified_note.map(note =>
                                                    (modified.modified_note.indexOf(note) < (modified.modified_note).length - 1 ? ((modified.modified_note).length === 2 ? note + ' ' : note + ', ') : ((modified.modified_note).length === 1 ? note + ' ' : 'and ' + note + ' ')))
                                                }was Edited</td>
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
