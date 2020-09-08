import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { saveCategory, listCategory, deleteCategory } from "../../actions/categoryActions"
import FontAwesome from 'react-fontawesome'

function CategoryManager(props) {
    const [formAction, setFormAction] = useState();
    const [formNote, setFormNote] = useState();
    const [formNoteVisible, setFormNoteVisible] = useState(false);
    const [formAlert, setFormAlert] = useState();
    const [formAlertVisible, setFormAlertVisible] = useState();
    const [modelVisible, setModelVisible] = useState(false);
    const [subCategoryFormVisible, setSubCategoryFormVisible] = useState(false);
    const [dropdownList, setDropdownList] = useState();
    const [dropdownListVisible, setDropdownListVisible] = useState(false)
    const [subCategoryVisible, setSubCategoryVisible] = useState(false)
    const [subCategoryList, setSubCategoryList] = useState();
    const [subSubCategoryVisible, setSubSubCategoryVisible] = useState(false)
    const [subSubCategoryList, setSubSubCategoryList] = useState()

    const [active, setActive] = useState(false);
    const [_id, setId] = useState();
    const [name, setName] = useState();
    const [headCategory, setHeadCategory] = useState();
    const [isSubCategory, setIsSubCategory] = useState();
    const [brand, setBrand] = useState();
    const [description, setDescription] = useState();

    const { success: successSave } = useSelector(state => state.categorySave);
    const { success: successDelete } = useSelector(state => state.categoryDelete);
    const { category } = useSelector(state => state.categoryList);
    const { brand: brandList } = useSelector(state => state.brandList);

    const dispatch = useDispatch();

    useEffect(() => {
        if ((successSave && formAction) || successDelete) {
            setFormAlertVisible(false)
            setModelVisible(false);
            dispatch(listCategory())
            setFormNote(`Category ${formAction == 'Create' ? 'Creat' : formAction}ed succefully`)
            setFormNoteVisible(true);
            setInterval(() => setFormNoteVisible(false), 5000)
            setFormAction('');
        }
        return () => {
            //
        };
    }, [successSave, successDelete]);

    const openModel = async (category) => {
        setFormAlertVisible(false)
        setModelVisible(true)
        setId(category._id ? category._id : '')
        setActive(category.active ? category.active : false)
        setName(category.name ? category.name : '')
        setHeadCategory(category.headCategory ? category.headCategory : '')
        setIsSubCategory(category.isSubCategory ? category.isSubCategory : false)
        setBrand(category.brand ? category.brand : [])
        setDescription(category.description ? category.description : '')
        // filter brands

        let brandFiltered = brandList.map(brand => brand.name);
        category.brand &&
            category.brand.forEach(brandExist => {
                brandFiltered = brandFiltered.filter(b => b !== brandExist && b)
            })

        setDropdownList(brandFiltered.sort())
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const categoryExist = category.find(category => category.name == name);
        if (!categoryExist || categoryExist && formAction == 'Edit') {
            if (formAction == 'Copy' || formAction == 'Create') setId(undefined);
            dispatch(saveCategory({ _id, active, name, headCategory, isSubCategory, brand, description }));
            setSubCategoryFormVisible(false)
        } else {
            setFormAlert('The category name already exists.');
            setFormAlertVisible(true);
        }
    };

    const createHandler = () => {
        setFormAction('Create')
        openModel({})
    }

    const editHandler = (category) => {
        setFormAction('Edit');
        openModel(category);
    }

    const deleteHandler = (e, _id) => {
        e.preventDefault();
        setFormAction('Delet')
        dispatch(deleteCategory(_id));
    }

    const copyHandler = (category) => {
        setFormAction('Copy')
        openModel(category)
    }

    const activationHandler = (e, category) => {
        e.preventDefault()
        if (category.active) {
            setFormAction('Deactivat')
            category.active = false
        } else {
            setFormAction('Activat')
            category.active = true
        }
        dispatch(saveCategory({ ...category, activation: true }))
    }

    // subCategory Table

    const showSubCategoryListHandler = (cat) => {
        setModelVisible(false);
        let subCategories = category.filter(sub => sub.headCategory === cat.name && sub)
        setSubCategoryList(subCategories)
        subCategories.length !== 0 &&
            setSubCategoryVisible(true);
    }

    window.addEventListener('click', (e) => {
        const rangeOverlay = document.querySelector('.range-overlay');
        if (e.target === rangeOverlay) {
            setSubCategoryVisible(false)
            setSubSubCategoryVisible(false)
        }
    });

    // Dropdown

    const addBrand = (brandAdded) => {
        setBrand([...brand, brandAdded])
        setDropdownList(
            dropdownList.filter(drop => drop !== brandAdded && drop)
        )
    }

    const removeBrand = (brandRemoved) => {
        setDropdownList([...dropdownList, brandRemoved].sort())
        setBrand(
            brand.filter(brand => brand !== brandRemoved && brand)
        )
    }

    window.addEventListener('click', (e) => {
        const dropdownOverlay = document.querySelector('.dropdown-overlay');
        if (e.target === dropdownOverlay) {
            setDropdownListVisible(false)
            dropdownOverlay.style.display = 'none'
        }
    });

    const showSubSubCategoryHandler = (e, cat) => {
        e.preventDefault()
        let subCategories = category.filter(sub => sub.headCategory === cat.name && sub)
        setSubSubCategoryList(subCategories)
        subCategories.length !== 0 ?
            setSubSubCategoryVisible(true)
            : setSubSubCategoryVisible(false)
    }

    return (
        <div>
            {formNoteVisible && <div className="action-note">{formNote}</div>}
            <div className="control-page-header">
                <h3 className="header-title">Categories Manager</h3>
                <button type="button" className="header-button" onClick={() => createHandler()}>Create Category</button>
            </div>
            {
                modelVisible &&
                <form style={{ zIndex: '3' }} className="form-form" onSubmit={(e) => submitHandler(e)}>
                    <ul className="form-container-manager">
                        <FontAwesome name="fa-window-close" className="far fa-window-close fa-lg" onClick={() => setModelVisible(false)} />
                        <li>
                            <h2>{formAction == 'Copy' ? 'Create' : formAction} Category</h2>
                        </li>
                        <li>
                            <label className="label" htmlFor="name">Category Name<p className="required">*</p></label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                        </li>
                        <li>
                            <div className="is-subcategory" onClick={() => setSubCategoryFormVisible(true)}>
                                <FontAwesome className="fas fa-plus-circle fa-lg" />
                                Is SubCategory of : </div>
                            {subCategoryFormVisible &&
                                <select
                                    value={headCategory}
                                    onChange={(e) => {
                                        setHeadCategory(
                                            e.target.selectedIndex ?
                                                e.target.options[e.target.selectedIndex].value :
                                                e.target.value);
                                        if (e.target.options[e.target.selectedIndex].value == '') {
                                            setSubCategoryFormVisible(false)
                                            setIsSubCategory(false)
                                        }
                                        else setIsSubCategory(true)
                                    }}
                                >
                                    {category.map((category) => (
                                        <option key={category._id} value={category.name}>
                                            {category.name}
                                        </option>
                                    ))}
                                    <option key='' value=''>
                                        is not SubCategory
                                    </option>
                                </select>
                            }
                        </li>
                        <div className='dropdown'>
                            <div className='dropdown-label'>Brand<p className="required">*</p></div>
                            <div className='dropdown-overlay'></div>
                            <div className='dropdown-container'>
                                <div className='dropdown-input' onClick={() => {
                                    document.querySelector('.dropdown-overlay').style.display = 'block';
                                    setDropdownListVisible(true)
                                }}>
                                    {brand.map(brand => (
                                        <div
                                            key={brand}
                                            className='dropdown-checked'>
                                            {brand}
                                            <FontAwesome className='fas fa-close dropdown-checked-close'
                                                onClick={() => removeBrand(brand)} />
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
                                                onClick={() => addBrand(drop)}
                                            >
                                                {drop}
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                        </div>
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
                        <th>Active</th>
                        <th>Category</th>
                        <th>Brands</th>
                        <th>SubCategories</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {category.map((cat) => (
                        cat.headCategory === '' &&
                        <tr key={cat._id}>
                            <td className='td-active'>
                                <input
                                    className='switch'
                                    type="checkbox"
                                    name={cat._id}
                                    id="active s2"
                                    value={cat.active}
                                    checked={cat.active}
                                    onChange={(e) => activationHandler(e, cat)}
                                ></input>
                            </td>
                            <td>{cat.name}</td>
                            <td style=
                                {{ maxWidth: '25rem' }}>
                                {cat.brand.map(b =>
                                    (cat.brand).indexOf(b) === ((cat.brand).length - 1) ?
                                        b
                                        : b + ' | ')
                                }
                            </td>
                            <td
                                onClick={() => showSubCategoryListHandler(cat)}
                                style={{ maxWidth: '25rem', cursor: 'pointer' }}>
                                {category.map(c => c.headCategory === cat.name && c.name + ' | ')}
                                {category.filter(c => c.headCategory === cat.name && c.name).length !== 0 &&
                                    <FontAwesome style={{ cursor: 'pointer' }} className='fas fa-exclamation-circle' />}
                            </td>
                            <td>
                                <button className="table-btns" onClick={() => editHandler(cat)}>Edit</button>
                                <button className="table-btns" onClick={(e) => deleteHandler(e, cat._id)}>Delete</button>
                                <button className="table-btns" onClick={(e) => copyHandler(cat)}>Copy</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                subCategoryVisible &&
                <div className='range'>
                    <div className='range-overlay'>
                        <div className='range-form'>
                            <div className="control-page-header">
                                <h3 className="header-title">{subCategoryList[0].headCategory} Category List</h3>
                            </div>
                            <table className="range-table">
                                <thead>
                                    <tr>
                                        <th>Active</th>
                                        <th>Category</th>
                                        <th>Sub Categories</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subCategoryList &&
                                        subCategoryList.map((subCategory) => (
                                            <tr key={subCategory._id}>
                                                <td className='td-active'>
                                                    <input
                                                        className='switch'
                                                        type="checkbox"
                                                        name={subCategory._id}
                                                        id="active s2"
                                                        value={subCategory.active}
                                                        checked={subCategory.active}
                                                        onChange={(e) => activationHandler(e, subCategory)}
                                                    ></input>
                                                </td>
                                                <td>{subCategory.name}</td>
                                                <td
                                                    onClick={(e) => showSubSubCategoryHandler(e, subCategory)}
                                                    style={{ maxWidth: '25rem', cursor: 'pointer' }}>
                                                    {category.map(sub => sub.headCategory === subCategory.name && sub.name + ' | ')}
                                                    {category.filter(c => c.headCategory === subCategory.name && c.name).length !== 0 &&
                                                        <FontAwesome style={{ cursor: 'pointer' }} className='fas fa-exclamation-circle' />}
                                                </td>
                                                <td>
                                                    <button className="table-btns" onClick={() => editHandler(subCategory)}>Edit</button>
                                                    <button className="table-btns" onClick={(e) => deleteHandler(e, subCategory._id)}>Delete</button>
                                                    <button className="table-btns" onClick={(e) => copyHandler(subCategory)}>Copy</button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            <hr />
                            {subSubCategoryVisible &&
                                <div style={{ width: 'inherit', marginLeft: '2rem' }}>
                                    <div style={{ textAlign: 'center' }} className="control-page-header">
                                        <h3 className="header-title">{subSubCategoryList[0].headCategory} Category List</h3>
                                    </div>
                                    <table className="range-table">
                                        <thead>
                                            <tr>
                                                <th>Active</th>
                                                <th>Category</th>
                                                <th>Sub Categories</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {subSubCategoryList &&
                                                subSubCategoryList.map((subCategory) => (
                                                    <tr key={subCategory._id}>
                                                        <td className='td-active'>
                                                            <input
                                                                className='switch'
                                                                type="checkbox"
                                                                name={subCategory._id}
                                                                id="active s2"
                                                                value={subCategory.active}
                                                                checked={subCategory.active}
                                                                onChange={(e) => activationHandler(e, subCategory)}
                                                            ></input>
                                                        </td>
                                                        <td>{subCategory.name}</td>
                                                        <td style={{ maxWidth: '20rem' }}>{category.map(sub => sub.headCategory === subCategory.name && sub.name + ' | ')}</td>
                                                        <td>
                                                            <button className="table-btns" onClick={() => editHandler(subCategory)}>Edit</button>
                                                            <button className="table-btns" onClick={(e) => deleteHandler(e, subCategory._id)}>Delete</button>
                                                            <button className="table-btns" onClick={(e) => copyHandler(subCategory)}>Copy</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
        </div >
    );
}
export default CategoryManager;
