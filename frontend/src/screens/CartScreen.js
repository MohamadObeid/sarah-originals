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

  const { cartItems } = useSelector((state) => state.cart)
  const { product: products } = useSelector(state => state.productDetails)

  const dispatch = useDispatch();

  useEffect(() => {
    if (cartItems) {
      const IDList = cartItems.map(item => {
        return item._id
      })
      dispatch(detailsProduct(IDList))
    }
    return () => {
      //
    };
  }, [])



  useEffect(() => {
    if (products) {
      cartItems.map(item => {
        products.map(product => {
          if (item.qty > product.countInStock) {
            console.log(product.countInStock)
            item.qty = product.countInStock
          }
          item.countInStock = product.countInStock
        })
      })
    }
    return () => {
      //
    };
  }, [products])

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=order");
  };

  const handleMinus = (e, item) => {
    if (item.qty === 0) {
      dispatch(removeFromCart(item._id));
      setActionNote(`Product Deleted Succefully`);
      setActionNoteVisible(true);
      setInterval(() => setActionNoteVisible(false), 3000);
    }
    else {
      dispatch(updateCart(item));
    }
  }

  const handleRemove = () => {
    setActionNote(`Product Deleted Succefully`);
    setActionNoteVisible(true);
    setInterval(() => setActionNoteVisible(false), 3000);
  }

  const handleplus = (item) => {
    if (item.countInStock >= item.qty) {
      item.qty++
      dispatch(updateCart(item));
    } else {
      setActionNote('Quantity Available in Stock is ' + item.qty)
      setActionNoteVisible(true);
      setInterval(() => setActionNoteVisible(false), 3000);
    }
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

            {cartItems.length == 0 ? (
              <div style={{ paddingLeft: '1rem' }}>Cart is Empty</div>
            ) : (cartItems &&
              cartItems.map((item) => (
                item && item.qty > 0 &&
                <li>
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
                      <FontAwesome className="fas fa-trash fa-lg"
                        onClick={() => {
                          dispatch(removeFromCart(item._id))
                          handleRemove();
                        }}
                      />
                    </div>

                    <div>
                      <button
                        type="button"
                        className="plus plus-cart"
                        value={item._id}
                        onClick={(e) => handleplus(item)}>
                        <FontAwesome className="fas fa-plus" />
                      </button>
                      <p className="add-to-cart-qty qty-cart count">{item.qty}</p>
                      <button
                        type="button"
                        className="minus minus-cart"
                        value={item._id}
                        onClick={(e) => {
                          item.qty -= 1;
                          handleMinus(e, item)
                        }
                        }>
                        <FontAwesome className="fas fa-minus" />
                      </button>
                    </div>
                  </div>
                </li>
              ))
              )}
          </ul>
        </div>
        <div className="cart-action">
          <h3>
            Subtotal ( {cartItems.reduce((total, item) => total + item.qty, 0)}{" "}
            items ): $
            {cartItems.reduce((sum, item) => sum + item.priceUsd * item.qty, 0)}
          </h3>
          <button
            onClick={checkoutHandler}
            className="button primary"
            disabled={cartItems.length == 0}
          >
            Proceed To Checkout
        </button>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
