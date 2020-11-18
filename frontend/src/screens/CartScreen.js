import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, updateCart } from "../actions/cartActions";
import { Link } from "react-router-dom";
import FontAwesome from 'react-fontawesome';
import { detailsProduct } from "../actions/productActions";

function CartScreen(props) {
  const imageUrl = window.location.origin + '/api/uploads/image/'
  const [actionNote, setActionNote] = useState();
  const [actionNoteVisible, setActionNoteVisible] = useState(false);
  const [timeOut, setTimeOut] = useState()

  const { cartItems } = useSelector((state) => state.cart)
  const { product: productList } = useSelector(state => state.productDetails)
  const [products, setProducts] = useState([])

  const dispatch = useDispatch();

  useEffect(() => {
    if (cartItems) {
      const IDList = cartItems.map(item => {
        return item._id
      })
      IDList.length > 0
        ? dispatch(detailsProduct(IDList))
        : setProducts([])
    }
  }, [])

  useEffect(() => {
    if (productList.length > 0 && cartItems.length > 0) {
      cartItems.map(item => {
        const product = productList.find(product => product._id == item._id)
        if (product) {
          if (item.qty > product.countInStock) item.qty = product.countInStock
          product.qty = item.qty
          item.countInStock = product.countInStock
        }
      })
      setProducts(productList)
    }
  }, [productList])

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=order");
  };

  const handleMinus = (e, item) => {
    if (item.qty === 0) {
      dispatch(removeFromCart(item._id))
      setProducts(products.filter(product => { return product._id !== item._id && product }))
      setActionNote(`Product removed succefully!`);
      setActionNoteVisible(true);
      clearTimeout(timeOut)
      setTimeOut(setInterval(() => setActionNoteVisible(false), 3000))
    }
    else {
      dispatch(updateCart(item));
    }
  }

  const handleRemove = (item) => {
    dispatch(removeFromCart(item._id))
    setProducts(products.filter(product => { return product._id !== item._id && product }))
    setActionNote(`Product removed succefully!`);
    setActionNoteVisible(true);
    clearTimeout(timeOut)
    setTimeOut(setInterval(() => setActionNoteVisible(false), 3000))
  }

  const handleplus = (item) => {
    if (item.countInStock > item.qty) {
      item.qty++
      dispatch(updateCart(item));
    } else {
      setActionNote('Only ' + item.qty + item.unit + ' ' + item.nameEn + ' are Available in Stock')
      setActionNoteVisible(true);
      clearTimeout(timeOut)
      setTimeOut(setInterval(() => setActionNoteVisible(false), 3000))
    }
  }

  const qtyCalc = () => {
    var totalqty = 0
    products.map(item => {
      totalqty = totalqty + item.qty
    })
    return totalqty
  }

  const discountCalc = (products) => {
    var discountAmount = 0
    products.map(item => {
      if (item.discount > 0) {
        discountAmount = discountAmount + item.priceUsd * item.discount * 0.01 * item.qty
      }
    })
    return discountAmount.toFixed(2)
  }

  const amountCalc = (products) => {
    var cartAmount = 0
    products.map(item => {
      cartAmount = cartAmount + item.priceUsd * item.qty
    })
    cartAmount = cartAmount - discountCalc(products)
    return cartAmount.toFixed(2)
  }

  return (
    <div>
      {actionNoteVisible && <div className="action-note">{actionNote}</div>}
      <div className="back-to-result">
        <Link to="/">
          <FontAwesome name="fa-chevron-left" className="fas fa-chevron-left fa-lg" />
          Home
        </Link>
      </div>
      <div className="cart">
        <div className="cart-list">
          <ul className="cart-list-container">
            <li>
              <h4>Shopping Cart</h4>
            </li>
            {products.length === 0 ? (
              <div style={{ paddingLeft: '1rem' }}>Cart is Empty</div>
            ) : (cartItems &&
              products.map((item) => (
                item && item.qty > 0 &&
                <li style={{ position: 'relative' }} key={item._id}>
                  {item.discount > 0 &&
                    <div className='product-discount order-discount'>
                      <div>{item.discount}</div>
                      <div>%</div>
                    </div>}
                  <div className="cart-list-items">
                    <div className="cart-image">
                      <img src={imageUrl + item.image} alt={item.nameEn} />
                    </div>
                    <div className="cart-name">
                      <Link to={"/product/" + item._id}>
                        <div className="item-name">{item.nameEn}</div>
                      </Link>
                      <div className="cart-price-cart">
                        ${item.priceUsd}<p className="cart-price-unit">/{item.unit}</p>
                      </div>
                      <FontAwesome name='fa-trash' className="fas fa-trash fa-lg"
                        onClick={() => handleRemove(item)}
                      />
                    </div>

                    <div className='cart-btns'>
                      <button
                        type="button"
                        className="plus plus-cart"
                        value={item._id}
                        onClick={(e) => handleplus(item)}>
                        <FontAwesome name='fa-plus' className="fas fa-plus" />
                      </button>
                      <p className="add-to-cart-qty float-bottom count">{item.qty}</p>
                      <button
                        type="button"
                        className="minus minus-cart"
                        value={item._id}
                        onClick={(e) => {
                          item.qty -= 1;
                          handleMinus(e, item)
                        }
                        }>
                        <FontAwesome name='fa-minus' className="fas fa-minus" />
                      </button>
                    </div>
                  </div>
                </li>
              )))}
          </ul>
        </div>
        {products.length > 0 &&
          <div className="cart-action">
            <div className='no-border'>
              <div className='cart-total-qty'>
                <div className='cart-total-label font-size'>Items</div>
                <div className='total-num font-size'>{qtyCalc() + ' items'}</div>
              </div>
              <div className='cart-total-qty'>
                <div className='cart-total-label font-size'>Discount</div>
                <div className='total-num font-size'>{discountCalc(products) + ' $'}</div>
              </div>
              <div className='cart-total-qty cart-total'>
                <div className='cart-total-label font-size'>Total</div>
                <div className='total-num font-size'>{amountCalc(products) + ' $'}</div>
              </div>
            </div>
            <button
              onClick={checkoutHandler}
              className="button primary cart-proceed-btn"
              disabled={products.length == 0}>
              Checkout
            </button>
          </div>
        }
      </div>
    </div>
  );
}

export default CartScreen;
