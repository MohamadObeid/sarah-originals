import { faMinus, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import FontAwesome from 'react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart, updateCart } from '../../actions/cartActions'

export const AddToCart = React.memo(({ product, styles }) => {
    const item = useSelector(state =>
        state.cart.cartItems.find(item => item._id === product._id))
    //console.log(item)
    const dispatch = useDispatch()
    var message

    // Minus Handler
    const handleMinus = (product, e) => {
        e.preventDefault()
        if (item) {
            // remove from cart
            if (item.qty === 1) {
                dispatch(removeFromCart({ _id: item._id }))
                message = 'Product Removed Successfully!'
            }
            // decrease qty by 1
            else if (item.qty > 1) {
                dispatch(updateCart({ _id: item._id, qty: item.qty - 1 }))
                message = 'Quantity Reduced Successfully!'
            }
            // display action note
            dispatch({ type: 'UPDATE_ACTIONS', payload: { actionNote: { title: message } } })
        }
    }

    // Plus Handler
    const handlePlus = (product, e) => {
        e.preventDefault()
        if (item) {
            // no more qty is available
            if (item.qty < product.countInStock) {
                dispatch(updateCart({ _id: item._id, qty: item.qty + 1 }))
                message = 'Quantity Added Successfully!'
            } // add qty
            else {
                dispatch(updateCart({ _id: item._id, qty: product.countInStock }))
                message = 'Only ' + item.qty + product.unit + ' ' + product.nameEn + ' are available in stock!'
            }
        } else {// add to cart
            dispatch(addToCart({ _id: product._id, qty: 1 }))
            message = 'Product Added Successfully!'
        }
        // display action note
        dispatch({ type: 'UPDATE_ACTIONS', payload: { actionNote: { title: message } } })
    }

    const hide = item ? { display: 'none' } : {}
    const show = item ? {} : { display: 'none' }

    // Add to Cart Btns Designs Handler
    return (<div className="add-to-cart-btns-wrap" style={styles.addToCartWrap}>
        <button style={{ ...styles.addToCartBtn, ...hide }}
            type="button"
            className='add-to-cart-btn'
            value={product._id}
            onClick={(e) => handlePlus(product, e)}
            onMouseOver={e => { e.currentTarget.style.backgroundColor = styles.addToCartBtn.hoverBackgroundColor }}
            onMouseOut={e => { e.currentTarget.style.backgroundColor = styles.addToCartBtn.backgroundColor }}>
            {styles.addToCartBtn.btn !== 'none' ? (styles.addToCartBtn.btn === 'plus'
                ? <FontAwesomeIcon icon={faPlus} />
                : 'Add To Cart')
                : ''}
        </button>
        <div className='add-to-cart-btns' style={{ ...styles.btnsWrap, ...show }}>
            <button style={styles.minusBtn}
                type="button"
                className="minus"
                onClick={(e) => handleMinus(product, e)}
                onMouseOver={e => { e.currentTarget.style.backgroundColor = styles.minusBtn.hoverBackgroundColor }}
                onMouseOut={e => { e.currentTarget.style.backgroundColor = styles.minusBtn.backgroundColor }}>
                {styles.minusBtn.btn !== 'none' && <FontAwesomeIcon icon={faMinus} />}
            </button>
            <p className="add-to-cart-qty" style={styles.qtyBtn}>
                {styles.qtyBtn.btn == 'times' && <FontAwesomeIcon icon={faTimes}
                    style={{ fontSize: '1.2rem', color: styles.qtyBtn.color }} />}
                {item && item.qty}
            </p>
            <button style={styles.plusBtn}
                type="button"
                className="plus"
                onClick={(e) => handlePlus(product, e)}
                onMouseOver={e => { e.currentTarget.style.backgroundColor = styles.plusBtn.hoverBackgroundColor }}
                onMouseOut={e => { e.currentTarget.style.backgroundColor = styles.plusBtn.backgroundColor }} >
                {styles.plusBtn.btn !== 'none' && <FontAwesomeIcon icon={faPlus} />}
            </button>
        </div>
    </div>)
})
