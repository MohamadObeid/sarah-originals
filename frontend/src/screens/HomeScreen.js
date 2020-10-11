import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Swiper from 'react-id-swiper';
import HeroBanners from "./Components/HeroBanners";
import FontAwesome from 'react-fontawesome';
import { addToCart, removeFromCart, updateCart } from "../actions/cartActions";

function HomeScreen(props) {
  const imageUrl = window.location.origin + '/api/uploads/image/'

  const swiper = {
    shortSwipes: true,
    slidesOffsetAfter: -35,
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

  const { products, loading, error } = useSelector((state) => state.productList);

  const { cartItems } = useSelector(state => state.cart);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
    return () => {
      //
    }
  }, [])

  useEffect(() => {
    if (products && cartItems) {
      cartItems.map(item => {
        products.map(product => {
          if (product._id === item._id) {
            if (item.qty > product.countInStock) {
              console.log(product.countInStock)
              item.qty = product.countInStock
            }
            item.countInStock = product.countInStock
            return
          }
        })
      })
    }
    return () => {
      //
    };
  }, [])

  const inCartHandler = () => {
    products.map(product => {
      cartItems.map(item => {
        if (item._id === product._id) {
          toggleCartBtns(product)
          product.qty = item.qty
          return
        }
      })
    })
  }

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
        _id: product._id, qty: product.qty,
      }))
    else {
      dispatch(addToCart({
        _id: product._id, qty: product.qty,
      }))
    }
    setActionNote('Product added Successfully')
    setActionNoteVisible(true)
    setInterval(() => setActionNoteVisible(false), 3000)
  }

  const handleMinus = (product) => {
    product.qty--
    toggleCartBtns(product);
    if (product.qty === 0) {
      dispatch(removeFromCart(product._id))
      setActionNote('Product removed Successfully')
      setActionNoteVisible(true);
      setInterval(() => setActionNoteVisible(false), 3000);
    }
    else dispatch(updateCart({
      _id: product._id, nameEn: product.nameEn, image: product.image, qty: product.qty,
      priceUsd: product.priceUsd, unit: product.unit
    }));
  }

  const handlePlus = (product) => {
    if (product.countInStock > product.qty) {
      product.qty++
      dispatch(updateCart({
        _id: product._id, nameEn: product.nameEn, image: product.image, qty: product.qty,
        priceUsd: product.priceUsd, unit: product.unit
      }));
    } else {
      setActionNote('Quantity Available in Stock is ' + product.qty)
      setActionNoteVisible(true);
      setInterval(() => setActionNoteVisible(false), 3000);
    }
  }

  /* Quick View */

  const handleQuickView = (product) => {
    document.querySelector('.quick-view').innerHTML =
      `<div class="quick-view-overlay">
        <div class="quick-view-container">
          <div class="quick-view-product">
            <div class='product-discount pdqv'>
              <div>${product.discount}</div>
              <div>%</div>
            </div>
            <div class="quick-view-image">
              <img src=${imageUrl + product.image} alt="product" />
            </div>
            <div class='quick-view-details'>
            <table class='quick-view-table'>
              <tr>
              <th>Name</th>
              <td class='quick-view-header'>${product.nameEn}</td>
              </tr>
              <tr>
              <th>Brand</th>
              <td class='quick-view-brand'>${product.brand}</td>
              </tr>
              <tr>
              <th>Price</th>
              <td class='quick-view-price'>$${product.priceUsd}
                <div class='quick-view-unit'>/${product.unit}</div>
              </td>
              <tr>
              <th>Rate</th>
              <td>${product.rating} Stars</td>
              </tr>
              <tr>
              <th>Reviews</th>
              <td>${product.numReviews}</td>
              </tr>
              <tr>
              <th>Description</th>
              <td>${product.description}</td>
              </tr>
              </table>
              <div class="product-add-to-cart quick-view-add-container">
                <button
                  type="button"
                  class="add-to-cart-btn quick-view-add-to-cart"
                  value=${product._id}>
                    Add To Cart
                </button>
                <div class='add-to-cart-btns quick-view-btns hide'>
                  <button
                    type="button"
                    class="minus quick-view-minus"
                    value=${product._id}>
                      -
                  </button>
                  <p class="add-to-cart-qty count qty-cart">${product.qty}</p>
                  <button
                    type="button"
                    class="plus  quick-view-plus"
                    value=${product._id}>
                      +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="quick-view-bar">
            <div>Add to WishList</div>
            <div>More Details</div>
          </div>
        </div>
      </div>`;

    if (product.qty > 0) {
      document.querySelector('.add-to-cart-btns').classList.remove('hide');
      document.querySelector('.add-to-cart-btn').classList.add('hide');
    }

    if (product.discount === 0) {
      document.querySelector('.pdqv').style.display = 'none';
    }

    document.querySelector('.add-to-cart-btn').addEventListener('click', () => {
      handleAddToCart(product);
      document.querySelector('.count').innerText = product.qty;
      document.querySelector('.add-to-cart-btns').classList.remove('hide');
      document.querySelector('.add-to-cart-btn').classList.add('hide');
    })

    document.querySelector('.minus').addEventListener('click', () => {
      handleMinus(product);
      document.querySelector('.count').innerText = product.qty;
      if (product.qty === 0) {
        document.querySelector('.add-to-cart-btns').classList.add('hide');
        document.querySelector('.add-to-cart-btn').classList.remove('hide');
      }
    })

    document.querySelector('.plus').addEventListener('click', () => {
      handlePlus(product);
      document.querySelector('.count').innerText = product.qty;
    })

    window.addEventListener('click', (e) => {
      const quickViewOverlay = document.querySelector('.quick-view-overlay');
      if (e.target === quickViewOverlay)
        document.querySelector('.quick-view').innerHTML = '';
    })
  }

  /* End Quick View */

  return loading ? (
    <div>loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
        <div>
          {products && cartItems && inCartHandler()}
          {actionNoteVisible &&
            <div className="action-note">
              <div>{actionNote}</div>
            </div>}
          <HeroBanners />
          <div className='quick-view'></div>
          <div className="products-slider-container">
            <div className="products">
              <Swiper {...swiper}>
                {products && cartItems && products.map((product) => (
                  <div className="product" key={product._id}>
                    {inCartHandler()}
                    {product.countInStock === 0 && <div className="product-out-of-stock"></div>}
                    {product.discount > 0 &&
                      <div className='product-discount'>
                        <div>{product.discount}</div>
                        <div>%</div>
                      </div>
                    }
                    <div className="product-image" style={{ display: 'flex', alignItems: 'center' }}>
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
                          value={product._id}
                          onClick={() => handleMinus(product)}>
                          <FontAwesome name='fa-minus' className="fas fa-minus" />
                        </button>
                        <p className="add-to-cart-qty qty-cart count">{product.qty}</p>
                        <button
                          type="button"
                          className="plus"
                          value={product._id}
                          onClick={() => handlePlus(product)}>
                          <FontAwesome name='fa-plus' className="fas fa-plus" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      );
}

export default HomeScreen;
