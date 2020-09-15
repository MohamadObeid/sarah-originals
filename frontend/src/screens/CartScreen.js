import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, updateCart } from "../actions/cartActions";
import { Link } from "react-router-dom";
import FontAwesome from 'react-fontawesome';

function CartScreen(props) {
  const [formNote, setFormNote] = useState();
  const [formNoteVisible, setFormNoteVisible] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=order");
  };

  const handleMinus = (e, item) => {
    if (item.qty === 0) {
      dispatch(removeFromCart(item._id));
      setFormNote(`Product Deleted Succefully`);
      setFormNoteVisible(true);
      setInterval(() => setFormNoteVisible(false), 3000);
    }
    else {
      dispatch(updateCart(item));
    }
  }

  const handleRemove = () => {
    setFormNote(`Product Deleted Succefully`);
    setFormNoteVisible(true);
    setInterval(() => setFormNoteVisible(false), 3000);
  }

  return (
    <div>
      {formNoteVisible && <div className="action-note">{formNote}</div>}
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
              <h3>Shopping Cart</h3>
            </li>

            {cartItems.length == 0 ? (
              <div>Cart is Empty</div>
            ) : (
                cartItems.map((item) => (
                  item && item.qty > 0 &&
                  <li>
                    <div className="cart-list-items">
                      <div className="cart-image">
                        <img src={item.image} alt={item.nameEn} />
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
                          onClick={(e) => {
                            item.qty += 1;
                            dispatch(updateCart(item));
                          }
                          }>
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
