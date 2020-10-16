import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productActions";
import FontAwesome from 'react-fontawesome';
import { addToCart, removeFromCart } from "../actions/cartActions";

function ProductScreen(props) {
  const imageUrl = window.location.origin + '/api/uploads/image/'
  const [qty, setQty] = useState(1);
  const [formNote, setFormNote] = useState('Product Added Succefully');
  const [formNoteVisible, setFormNoteVisible] = useState(false);
  const [timeOut, setTimeOut] = useState()

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, []);

  const handleAddToCart = () => {
    setFormNoteVisible(true)
    clearTimeout(timeOut)
    setTimeOut(setInterval(() => setFormNoteVisible(false), 3000))
    dispatch(addToCart({ _id: product._id, qty }))
    /*props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);*/
  };

  return (
    <div>
      {formNoteVisible && <div className="form-note">{formNote}</div>}
      <div className="back-to-result">
        <Link to="/">
          <FontAwesome name="fa-chevron-left" className="fas fa-chevron-left fa-lg" />
          Home
        </Link>
      </div>
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
            <div className="details">
              <div className="details-image">
                <img src={imageUrl + product.image} alt={product.nameEn}></img>
              </div>
              <div className="details-info">
                <ul>
                  <li>
                    <h4>{product.nameEn}</h4>
                  </li>
                  <li>
                    {product.rating} Stars ({product.numReviews} Reviews)
                  </li>
                  <li>
                    <b>{product.priceUsd}</b>
                  </li>
                  <li>
                    Description:
                <div>{product.description}</div>
                  </li>
                </ul>
              </div>
              <div className="details-action">
                <ul>
                  <li>
                    Price: ${product.priceUsd}
                  </li>
                  <li>
                    Status:
                {product.countInStock > 0
                      ? " Available in Stock"
                      : " Out of Stock"}
                  </li>
                  <li>
                    Qty:{" "}
                    <select
                      value={qty}
                      onChange={(e) => {
                        setQty(e.target.selectedIndex ?
                          e.target.options[e.target.selectedIndex].value :
                          e.target.value)
                      }}
                    >
                      {[...Array(product.countInStock).keys()].map((i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </li>
                  <li>
                    {product.countInStock > 0 && ( // && means show and render...
                      <button onClick={handleAddToCart} className="button">
                        Add To Cart
                      </button>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          )}
    </div>
  );
}

export default ProductScreen;
