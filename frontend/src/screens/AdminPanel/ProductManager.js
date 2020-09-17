import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveProduct, listProducts, deleteProduct } from "../../actions/productActions";
import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import { productFilters } from '../../constants/filters'
import { unitList } from '../../constants/lists'

function ProductManager() {
    const [formAction, setFormAction] = useState();
    const [actionNote, setActionNote] = useState();
    const [actionNoteVisible, setActionNoteVisible] = useState(false);
    const [formAlert, setFormAlert] = useState('Kindly fill all required blanks!');
    const [formAlertVisible, setFormAlertVisible] = useState(false);
    const [modelVisible, setModelVisible] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [dropdownList, setDropdownList] = useState();
    const [dropdownListVisible, setDropdownListVisible] = useState(false)
    const [filterDropdownVisible, setFilterDropdownVisible] = useState(false)
    const [filters, setFilters] = useState([])
    const [filterDropdownList, setFilterDropdownList] = useState(productFilters)
    const [historyVisible, setHistoryVisible] = useState(false)
    const [productValues, setProductValues] = useState()
    //const [brandList, setBrandList] = useState()

    const [_id, setId] = useState();
    const [modified, setModified] = useState()
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
    const [productProps, setProductProps] = useState();
    const [propertiesVisible, setPropertiesVisible] = useState(false);

    // for category inputs in form
    const { success: successSave } = useSelector(state => state.productSave);
    const { success: successDelete } = useSelector(state => state.productDelete);
    const { products } = useSelector(state => state.productList);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const { category: categoryList } = useSelector(state => state.categoryList);
    const { brand: brandlist } = useSelector(state => state.brandList);
    const { userInfo } = useSelector(state => state.userSignin)

    const dispatch = useDispatch();
    useEffect(() => {
        products &&
            filters
            ? filterProducts(filters)
            : setFilteredProducts(products)

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

    const openModel = (product) => {

        setModelVisible(true);
        setId(product._id ? product._id : '');
        setModified(product.modified ? product.modified : [])
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

    const modifiedArray = (product) => {
        let modifiedNote = []
        if (nameEn !== product.nameEn) modifiedNote = [...modifiedNote, 'Name(en)']
        if (nameAr !== product.nameAr) modifiedNote = [...modifiedNote, 'Name(ar)']
        if (image !== product.image) modifiedNote = [...modifiedNote, 'Image']
        if (brand !== product.brand) modifiedNote = [...modifiedNote, 'Brand']
        if (category !== product.category) modifiedNote = [...modifiedNote, 'Category']
        if (priceUsd !== product.priceUsd) modifiedNote = [...modifiedNote, 'Price(usd)']
        if (priceLbp !== product.priceLbp) modifiedNote = [...modifiedNote, 'Price(lbp)']
        if (discount !== product.discount) modifiedNote = [...modifiedNote, 'Discount']
        if (countInStock !== product.countInStock) modifiedNote = [...modifiedNote, 'Quantity in Stock']
        if (description !== product.description) modifiedNote = [...modifiedNote, 'Description']
        return [...modified, { modified_date: Date.now() + 10800000, modified_by: userInfo.name, modified_note: modifiedNote }]
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const productExist = products.find(product => product._id == _id)
        const nameExist = products.find(product => product.nameEn == nameEn)
        if (!productExist || productExist && formAction == 'Edit') {
            if (formAction == 'Copy' || formAction == 'Create')
                dispatch(saveProduct({ modified: [], created_by: userInfo.name, creation_date: Date.now() + 10800000, nameEn, nameAr, image, brand, category, priceUsd, priceLbp, discount, countInStock, unit, description, active, isFeatured, isPopular, newArrival, specialOffer }))
            else {
                // set modified
                dispatch(saveProduct({ modified: modifiedArray(productExist), created_by: productExist.created_by, creation_date: userInfo.creation_date, _id, nameEn, nameAr, image, brand, category, priceUsd, priceLbp, discount, countInStock, unit, description, active, isFeatured, isPopular, newArrival, specialOffer }))
            }
        } else if (nameExist) {
            setFormAlert('The product name already exists.')
            setFormAlertVisible(true)
        }
    }

    const activationHandler = (e, product) => {
        e.preventDefault()
        if (product.active) {
            setFormAction('Deactivat')
            product.active = false
        } else {
            setFormAction('Activat')
            product.active = true
        }
        product.modified = [...product.modified, { modified_date: Date.now() + 10800000, modified_by: userInfo.name, modified_note: ['Activation'] }]
        dispatch(saveProduct({ ...product, activation: 'active' }))
    }

    const createHandler = () => {
        setFormAction('Create')
        openModel({})
        setPropertiesVisible(false)
    }

    const editHandler = (product) => {
        setFormAction('Edit')
        openModel(product)
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

    const showHistoryHandler = (product) => {
        setHistoryVisible(true)
        setProductValues(product)
    }

    window.addEventListener('click', (e) => {
        const historyOverlay = document.querySelector('.history-overlay');
        if (e.target === historyOverlay) {
            setHistoryVisible(false)
            setModelVisible(false)
        }
    })

    const uploadImageHandler = (e) => {
        e.preventDefault();
        const bodyFormData = new FormData();
        bodyFormData.append('image', image);
        setUploading(true);

        axios
            //.post('/api/uploads/s3', bodyFormData, {
            .post('/api/uploads', bodyFormData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((response) => {
                setImage(response.data);
                console.log('response: ' + response.data)
                setUploading(false)
            })
            .catch((err) => {
                console.log(err);
                setUploading(false);
            });
    };

    const showPropertiesHandler = async (product) => {
        setModelVisible(false)
        await setProductProps(product)
        setDiscount(product.discount)
        product.modified
            ? setModified(product.modified)
            : setModified([])
        setPropertiesVisible(true)
    }

    //properties Handlers
    const featuredHandler = (e, product) => {
        e.preventDefault()
        const prop = 'Featured'
        if (product.isFeatured)
            product.isFeatured = false
        else product.isFeatured = true
        propHistoryHandler(prop, product)
    }

    const popularHandler = (e, product) => {
        e.preventDefault()
        const prop = 'Popular'
        if (product.isPopular)
            product.isPopular = false
        else product.isPopular = true
        propHistoryHandler(prop, product)
    }

    const newArrivalHandler = (e, product) => {
        e.preventDefault()
        const prop = 'New Arrival'
        if (product.newArrival)
            product.newArrival = false
        else product.newArrival = true
        propHistoryHandler(prop, product)
    }

    const specialOfferHandler = (e, product) => {
        e.preventDefault()
        const prop = 'Special Offer'
        if (product.specialOffer)
            product.specialOffer = false
        else product.specialOffer = true
        propHistoryHandler(prop, product)
    }

    const discountHandler = (e, product) => {
        e.preventDefault()
        const prop = 'Discount'
        product.discount = discount
        propHistoryHandler(prop, product)
    }

    const propHistoryHandler = (prop, product) => {
        setFormAction('Edit')
        product.modified = [...modified, { modified_date: Date.now() + 10800000, modified_by: userInfo.name, modified_note: [prop] }]
        dispatch(saveProduct(product))
        setModified(product.modified)
        setProductValues(product)
    }

    // Filter

    const filterProducts = (filters) => {
        let filtered = products
        filters &&
            filters.map(filter => {
                if (filter === 'Featured') filtered = filtered.filter(p => p.isFeatured === true)
                if (filter === 'Active') filtered = filtered.filter(p => p.active === true)
                if (filter === 'InActive') filtered = filtered.filter(p => p.active === false)
                if (filter === 'Popular') filtered = filtered.filter(p => p.isPopular === true)
                if (filter === 'New_Arrival') filtered = filtered.filter(p => p.newArrival === true)
                if (filter === 'Special_Offer') filtered = filtered.filter(p => p.specialOffer === true)
                if (filter === 'Discounted') filtered = filtered.filter(p => p.discount > 0)
            })
        setFilteredProducts(filtered)
    }

    // Filter Dropdown
    const addFilter = (filterAdded) => {
        let filters_1 = [...filters, filterAdded]
        filterProducts(filters_1)
        setFilters(filters_1)
        setFilterDropdownList(filterDropdownList.filter(drop => drop !== filterAdded && drop))
    }

    const removeFilter = (filterRemoved) => {
        let filters_1 = filters.filter(c => c !== filterRemoved && c)
        filterProducts(filters_1)
        setFilterDropdownList([...filterDropdownList, filterRemoved].sort())
        setFilters(filters_1)
    }

    if (filterDropdownVisible)
        window.addEventListener('click', (e) => {
            const dropdownOverlay = document.querySelector('.overlay-1');
            if (e.target === dropdownOverlay) {
                setFilterDropdownVisible(false)
                dropdownOverlay.style.display = 'none'
            }
        })
    else if (document.querySelector('.overlay-1'))
        document.querySelector('.overlay-1').style.display = 'none'

    // Category Dropdown
    const addCategory = (categoryAdded) => {
        setCategory([...category, categoryAdded])
        setDropdownList(dropdownList.filter(drop => drop !== categoryAdded && drop))
    }

    const removeCategory = (categoryRemoved) => {
        setDropdownList([...dropdownList, categoryRemoved].sort())
        setCategory(category.filter(c => c !== categoryRemoved && c))
    }

    window.addEventListener('click', (e) => {
        const dropdownOverlay = document.querySelector('.overlay-2');
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
                <div className='dropdown' style={{ display: 'flex', alignItems: 'center', height: '8rem' }}>
                    <div className='dropdown-label' style={{ margin: '1rem' }}>Filter By:</div>
                    <div className='dropdown-overlay overlay-1'></div>
                    <div className='dropdown-container' style={{ width: '30rem', cursor: 'pointer' }}>
                        <div
                            className='dropdown-input'
                            onClick={() => {
                                document.querySelector('.overlay-1').style.display = 'block';
                                setFilterDropdownVisible(true)
                            }}>
                            {filters.map(c => (
                                <div
                                    key={c}
                                    className='dropdown-checked'>
                                    {c}
                                    <FontAwesome className='fas fa-close dropdown-checked-close'
                                        onClick={() => removeFilter(c)} />
                                </div>
                            ))}
                            <FontAwesome className='fas fa-chevron-down' />
                        </div>
                        {filterDropdownVisible &&
                            <div className='dropdown-list'>
                                {filterDropdownList.map(drop => (
                                    <div
                                        key={drop}
                                        className='dropdown-choice'
                                        onClick={() => addFilter(drop)}
                                    >
                                        {drop}
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
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
                                name="image"
                                id="image"
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
                            <div className='dropdown-overlay overlay-2'></div>
                            <div className='dropdown-container'>
                                <div className='dropdown-input' onClick={() => {
                                    document.querySelector('.overlay-2').style.display = 'block';
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
                                <option key='' value=''>
                                    Select...
                                </option>
                                {brandlist
                                    && brandlist.map((brand) => (
                                        <option key={brand._id} value={brand.name}>
                                            {brand.name}
                                        </option>
                                    ))}
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
                                <button className="table-btns" onClick={() => showHistoryHandler(product)}>History</button>
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
                                <td>{productProps.nameEn}</td>
                            </tr>
                            <tr>
                                <th>Featured</th>
                                <td>
                                    <input
                                        className='switch'
                                        type='checkbox'
                                        name={productProps._id}
                                        id="active s2"
                                        value={productProps.isFeatured}
                                        checked={productProps.isFeatured}
                                        onChange={(e) => featuredHandler(e, productProps)}
                                    ></input>
                                </td>
                            </tr>
                            <tr>
                                <th>Popular</th>
                                <td>
                                    <input
                                        className='switch'
                                        type="checkbox"
                                        name={productProps._id}
                                        id="active s2"
                                        value={productProps.isPopular}
                                        checked={productProps.isPopular}
                                        onChange={(e) => popularHandler(e, productProps)}
                                    ></input>
                                </td>
                            </tr>
                            <tr>
                                <th>New Arrival</th>
                                <td>
                                    <input
                                        className='switch'
                                        type="checkbox"
                                        name={productProps._id}
                                        id="active s2"
                                        value={productProps.newArrival}
                                        checked={productProps.newArrival}
                                        onChange={(e) => newArrivalHandler(e, productProps)}
                                    ></input>
                                </td>
                            </tr>
                            <tr><th>Special Offer</th>
                                <td>
                                    <input
                                        className='switch'
                                        type="checkbox"
                                        name={productProps._id}
                                        id="active s2"
                                        value={productProps.specialOffer}
                                        checked={productProps.specialOffer}
                                        onChange={(e) => specialOfferHandler(e, productProps)}
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
                                        onClick={(e) => discountHandler(e, productProps)} className='primary button'>Save</button>
                                </td>
                            </tr>
                        </table>
                        <button style={{ marginTop: '3rem' }} type="button" className="button secondary" onClick={() => setPropertiesVisible(false)}>
                            Back
                        </button>
                    </div>
                </form>
            }
            {
                historyVisible &&
                <div className='range'>
                    <div className='range-overlay history-overlay' style={{ zIndex: '4' }}>
                        <div className='range-form'>
                            <div className='history-title' style={{ margin: '1rem' }}>{productValues.nameEn} History</div>
                            <table className="range-table">
                                <thead>
                                    <tr>
                                        <th style={{ width: '15rem' }}>Date</th>
                                        <th style={{ width: '20rem' }}>Admin</th>
                                        <th>Note</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={productValues._id}>
                                        <td>{productValues.creation_date && productValues.creation_date.split("T", 1) + '  '
                                            + productValues.creation_date.slice(productValues.creation_date.indexOf('T') + 1, -1).slice(0, 5)}
                                        </td>
                                        <td>{productValues.created_by && productValues.created_by}</td>
                                        <td>Product was Created</td>
                                    </tr>
                                    {productValues.modified &&
                                        productValues.modified.map(modified => (
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
        </div>
    );
}
export default ProductManager;
