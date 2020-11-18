import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Swiper from 'react-id-swiper';
import HeroBanners from "./Components/HeroBanners";
import FontAwesome from 'react-fontawesome';
import { addToCart, removeFromCart, updateCart } from "../actions/cartActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function HomeScreen(props) {
  const imageUrl = window.location.origin + '/api/uploads/image/'

  const swiper = {
    shortSwipes: true,
    slidesOffsetAfter: -28,
    freeMode: true,
    freeModeMomentumRatio: 1,
    grabCursor: true,
    slidesPerView: 'auto',
    spaceBetween: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'bullets',
      dynamicBullets: true,
    },
  }

  const [actionNote, setActionNote] = useState('Product Added Succefully');
  const [actionNoteVisible, setActionNoteVisible] = useState(false);
  const [timeOut, setTimeOut] = useState()
  const [quickViewVisible, setQuickViewVisible] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState({})

  const { products, loading } = useSelector((state) => state.productList);
  const { cartItems } = useSelector(state => state.cart);

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listProducts())
  }, [])

  useEffect(() => {
    if (products && cartItems) {
      cartItems.map(item => {
        const product = products.find(product => product._id === item._id)
        if (product) {
          if (item.qty > product.countInStock) item.qty = product.countInStock
          product.qty = item.qty
          toggleCartBtns(product)
        }
      })
    }
  }, [products])

  /*const inCartHandler = () => {
    products.map(product => {
      const item = cartItems.find(item => item._id === product._id)
      if (item) {
      }
    })
  }*/

  const toggleCartBtns = (product) => {
    if (product.qty === 0) {
      product.AddToCartClass = 'show';
      product.PlusMinusClass = 'hide';
    } else if (product.qty > 0) {
      product.AddToCartClass = 'hide';
      product.PlusMinusClass = 'show';
    }
  }

  const handleAddToCart = (product) => {
    product.qty = 1;
    toggleCartBtns(product);
    const inCart = cartItems.find(item => item._id === product._id)
    if (inCart)
      dispatch(updateCart({
        _id: product._id, qty: product.qty
      }))
    else {
      dispatch(addToCart({
        _id: product._id, qty: product.qty
      }))
    }
    setActionNote('Product added successfully!')
    setActionNoteVisible(true)
    clearTimeout(timeOut)
    setTimeOut(setInterval(() => setActionNoteVisible(false), 5000))
  }

  const handleMinus = (product) => {
    product.qty--
    toggleCartBtns(product);
    if (product.qty === 0) {
      dispatch(removeFromCart(product._id))
      setActionNote('Product removed successfully!')
      setActionNoteVisible(true);
      clearTimeout(timeOut)
      setTimeOut(setInterval(() => setActionNoteVisible(false), 5000))
    }
    else dispatch(updateCart({
      _id: product._id, qty: product.qty,
    }));
  }

  const handlePlus = (product) => {
    if ((!product.qty || product.qty === 0) && product.countInStock > 0) {
      product.qty = 1
      product.animate = true
      toggleCartBtns(product)
      dispatch(addToCart({
        _id: product._id, qty: product.qty
      }))
      setActionNote('Product added successfully!')
      setActionNoteVisible(true)
      clearTimeout(timeOut)
      setTimeOut(setInterval(() => setActionNoteVisible(false), 5000))

    } else if (product.countInStock > product.qty) {
      product.qty++
      dispatch(updateCart({
        _id: product._id, qty: product.qty,
      }))

    } else {
      setActionNote('Only ' + product.qty + product.unit + ' ' + product.nameEn + ' are available in stock!')
      setActionNoteVisible(true);
      clearTimeout(timeOut)
      setTimeOut(setInterval(() => setActionNoteVisible(false), 5000))
    }
  }

  /* Quick View */

  const quickView = () => {
    return (
      <div className="quick-view-container">
        <div className="quick-view-product">
          <div className='product-discount pdqv'>
            <div>{quickViewProduct.discount}</div>
            <div>%</div>
          </div>
          <div className="quick-view-image">
            <img src={imageUrl + quickViewProduct.image} alt="product" />
          </div>
          <div className='quick-view-details'>
            <table className='quick-view-table'>
              <tr>
                <th>Name</th>
                <td className='quick-view-header'>{quickViewProduct.nameEn}</td>
              </tr>
              <tr>
                <th>Brand</th>
                <td className='quick-view-brand'>{quickViewProduct.brand}</td>
              </tr>
              <tr>
                <th>Price</th>
                <td className='quick-view-price'>${quickViewProduct.priceUsd}
                  <div className='quick-view-unit'>/{quickViewProduct.unit}</div>
                </td>
              </tr>
              <tr>
                <th>Rate</th>
                <td>{quickViewProduct.rating} Stars</td>
              </tr>
              <tr>
                <th>Reviews</th>
                <td>{quickViewProduct.numReviews}</td>
              </tr>
              <tr>
                <th>Description</th>
                <td>{quickViewProduct.description}</td>
              </tr>
            </table>
            <div className="product-add-to-cart">
              <button
                type="button"
                className={`add-to-cart-btn ${quickViewProduct.AddToCartClass}`}
                value={quickViewProduct._id}
                onClick={() => handleAddToCart(quickViewProduct)}>
                Add To Cart
                      </button>
              <div className={`add-to-cart-btns hide ${quickViewProduct.PlusMinusClass}`}>
                <button
                  type="button"
                  className="minus"
                  onClick={() => handleMinus(quickViewProduct)}>
                  <FontAwesome name='fa-minus' className="fas fa-minus" />
                </button>
                <p className="add-to-cart-qty qty-cart count">{quickViewProduct.qty}</p>
                <button
                  type="button"
                  className="plus"
                  onClick={() => handlePlus(quickViewProduct)}>
                  <FontAwesome name='fa-plus' className="fas fa-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="quick-view-bar">
          <div>Add to WishList</div>
          <div>More Details</div>
        </div>
      </div>
    )
  }

  const handleQuickView = (product) => {
    setQuickViewProduct(product)
    setQuickViewVisible(true)
    window.addEventListener('click', (e) => {
      const quickViewOverlay = document.querySelector('.quick-view-overlay')
      if (e.target === quickViewOverlay) {
        setQuickViewVisible(false)
      }
    })
  }

  /////////////////////////////////////////
  //////////////ease-down//////////////////



  return (
    <div>
      {actionNoteVisible &&
        <div className="action-note">
          <div>{actionNote}</div>
        </div>}
      <HeroBanners />
      {/*<div className='quick-view'>*/}
      {quickViewVisible &&
        <div className="quick-view-overlay">
          {quickView()}
        </div>}
      <div className="products-slider-container">
        <div className="products">
          {products.length > 0 && !loading &&
            <Swiper {...swiper}>
              {products && cartItems && products.map((product) => (
                <div className="product" key={product._id}>
                  {product.countInStock === 0 && <div className="product-out-of-stock"></div>}
                  {product.discount > 0 &&
                    <div className='product-discount'>
                      <div>{product.discount}</div>
                      <div>%</div>
                    </div>
                  }
                  <div className="product-image">
                    <div className='title-skeleton'>Sarah Originals</div>
                    <img src={imageUrl + product.image} alt="product"
                      onClick={() => handleQuickView(product)} />
                  </div>
                  <div className='product-details-container'>
                    <div className="product-name">
                      <Link to={"/product/" + product._id}>{product.nameEn}</Link>
                    </div>
                    <div className="product-brand">{product.brand}</div>
                    <div className="product-price">
                      <div className={product.discount > 0 ? 'before-discount' : ''}>${product.priceUsd}</div>
                      {product.discount > 0 &&
                        <div className='after-discount'>${Math.round(100 * (product.priceUsd - product.priceUsd * product.discount / 100)) / 100}</div>
                      }
                      <div className='product-review-container'>
                        <FontAwesomeIcon icon={faStar} className='faStar' />
                        <div className='product-review'>4.5</div>
                        <div className='product-review-qty'>(21)</div>
                      </div>
                    </div>
                  </div>
                  <div className="product-add-to-cart">
                    <button
                      type="button"
                      className={`add-to-cart-btn ${product.AddToCartClass}`}
                      value={product._id}
                      onClick={() => handleAddToCart(product)}>
                      Add To Cart
                      </button>
                    <div className={`add-to-cart-btns hide ${product.PlusMinusClass}`}>
                      <button
                        type="button"
                        className="minus"
                        onClick={() => handleMinus(product)}>
                        <FontAwesome name='fa-minus' className="fas fa-minus" />
                      </button>
                      <p className="add-to-cart-qty qty-cart count">{product.qty}</p>
                      <button
                        type="button"
                        className="plus"
                        onClick={() => handlePlus(product)}>
                        <FontAwesome name='fa-plus' className="fas fa-plus" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Swiper>}
        </div>
      </div>
      {/*Test Slider*/}
      <br /><br />
      <div className="products-slider-container">
        <div className="products">
          {products.length > 0 && !loading &&
            <Swiper {...swiper}>
              {products && cartItems && products.map((product) => (
                <div className="product" key={product._id}>
                  {product.countInStock === 0 && <div className="product-out-of-stock"></div>}
                  {product.discount > 0 &&
                    <div className='product-discount'>
                      <div>{product.discount}</div>
                      <div>%</div>
                    </div>
                  }
                  <div className='product-plus' onClick={() => handlePlus(product)}>
                    <FontAwesome name='fa-plus' className="fas fa-plus" />
                  </div>
                  {product.qty > 0 &&
                    <div>
                      <div className={'product-new-qty ' + (product.animate ? 'af-qty' : 'ab-qty')}>
                        {product.qty}
                      </div>
                      <div className={'product-minus ' + (product.animate ? 'af-minus' : 'ab-minus')}
                        onClick={() => handleMinus(product)}>
                        <FontAwesome name='fa-minus' className="fas fa-minus" />
                      </div>
                    </div>}
                  <div className="product-image">
                    <div className='title-skeleton'>Sarah Originals</div>
                    <img src={imageUrl + product.image} alt="product"
                      onClick={() => handleQuickView(product)} />
                  </div>
                  <div className='product-details-container'>
                    <div className="product-name">
                      <Link to={"/product/" + product._id}>{product.nameEn}</Link>
                    </div>
                    <div className="product-brand">{product.brand}</div>
                    <div className="product-price">
                      <div className={product.discount > 0 ? 'before-discount' : 'nothing'}>${product.priceUsd}</div>
                      {product.discount > 0 &&
                        <div className='after-discount'>${Math.round(100 * (product.priceUsd - product.priceUsd * product.discount / 100)) / 100}</div>
                      }
                      <div className='product-review-container'>
                        <FontAwesomeIcon icon={faStar} className='faStar' />
                        <div className='product-review'>4.5</div>
                        <div className='product-review-qty'>(21)</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Swiper>}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
