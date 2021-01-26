import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
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

    // Minus Handler
    const handleMinus = (product, e) => {
        e.preventDefault()
        if (item) {
            // remove from cart
            if (item.qty === 1)
                dispatch(removeFromCart({ _id: item._id, message: 'Product Removed Successfully!' }))
            // decrease qty by 1
            else if (item.qty > 1)
                dispatch(updateCart({ _id: item._id, qty: item.qty - 1, message: 'Quantity Reduced Successfully!' }))
        }
    }

    // Plus Handler
    const handlePlus = (product, e) => {
        e.preventDefault()
        if (item) {
            // no more qty is available
            if (item.qty < product.countInStock)
                dispatch(updateCart({ _id: item._id, qty: item.qty + 1, message: 'Quantity Added Successfully!' }))
            // add qty
            else dispatch(updateCart({ _id: item._id, qty: product.countInStock, message: 'Only ' + item.qty + product.unit + ' ' + product.nameEn + ' are available in stock!' }))
        } else {// add to cart
            dispatch(addToCart({ _id: product._id, qty: 1, message: 'Product Added Successfully!' }))
        }
    }

    // Add to Cart Btns design 1
    const BottomCenter = () =>
        <div className="add-to-cart-btns-wrap" style={styles.addToCartWrap}>
            <button style={styles.addToCartBtn}
                type="button"
                className={'add-to-cart-btn ' + (item ? 'hide' : '')}
                value={product._id}
                onClick={(e) => handlePlus(product, e)}>
                Add To Cart
            </button>
            <div className={'add-to-cart-btns ' + (item ? '' : 'hide')}>
                <button style={styles.minusBtn}
                    type="button"
                    className="minus"
                    onClick={(e) => handleMinus(product, e)}>
                    <FontAwesomeIcon icon={faMinus} />
                </button>
                <p className="add-to-cart-qty show-qty" style={styles.qtyBtn}>{item && item.qty}</p>
                <button style={styles.plusBtn}
                    type="button"
                    className="plus show-plus"
                    onClick={(e) => handlePlus(product, e)}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </div>

    // Add to Cart Btns design 2
    const RightTopBtnsDesign = (product) => {
        return (
            <>
                <div className='product-plus' onClick={(e) => handlePlus(product, e)}>
                    <FontAwesome name='fa-plus' className="fas fa-plus" />
                </div>
                <div>
                    <div className={'product-new-qty right-qty-btn-transform ' +
                        (product.qty >= 1 ? 'animate' : '')}>
                        {product.qty}
                    </div>
                    <div className={'product-minus right-minus-btn-transform ' +
                        (product.qty >= 1 ? 'animate' : '')}
                        onClick={(e) => handleMinus(product, e)}>
                        <FontAwesome name='fa-minus' className="fas fa-minus" />
                    </div>
                </div>
            </>
        )
    }

    // Add to Cart Btns Designs Handler
    return <BottomCenter />
    /*return (
        styles.design === 'Bottom-Center'
            ? BottomCenterBtnsDesign(product)
            : styles.design === 'Right-Top'
                ? RightTopBtnsDesign(product)
                : <></>
    )*/
})
