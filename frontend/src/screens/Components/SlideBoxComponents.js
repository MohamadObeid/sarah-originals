import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { timer, showTimer } from '../../methods/methods'
import { faClock as farClock } from '@fortawesome/free-regular-svg-icons'

export const Timer = React.memo(({ slide, slideBox_id }) => {
    var element
    var timeLeft
    var timerVisible

    useEffect(() => {
        element = document.getElementsByClassName('slide-box-' + slideBox_id)[0]
        element = element.getElementsByClassName('timer-' + slide._id)[0]
        timerVisible = showTimer(slide.onSale).active
        timeLeft = timerVisible ? timer(slide.onSale.endDate) : timer(slide.onSale.startDate)

        if (timerVisible) {
            element.innerHTML = timeLeft
            setInterval(() => {
                timeLeft = timer(slide.onSale.endDate)
                element.innerHTML = timeLeft
            }, 1000)

        } else {
            element.innerHTML = 'Starts After : ' + timeLeft.split('left')[0]
            setInterval(() => {
                timeLeft = timer(slide.onSale.startDate).split('left')[0]
                if (timeLeft.includes('ago')) timeLeft = 'reload page'
                element.innerHTML = 'Starts After : ' + timeLeft
            }, 1000)
        }

    }, [])

    return (
        <div className={'product-timer-wrap ' + (showTimer(slide.onSale).active ? 'highlight' : '')}>
            <FontAwesomeIcon icon={farClock} className='product-fa-clock' />
            <div className={'product-timer timer-' + slide._id} />
        </div>
    )

})
/*
export const AddToCart = React.memo(({ slide }) => {
    // Add to Cart Handler
    const handleAddToCart = (product) => {
        products
            .filter(pro => product._id == pro._id)
            .map(pro => pro.qty = 1)

        const inCart = cartItems.find(item => item._id === product._id)
        if (inCart) dispatch(updateCart({ _id: product._id, qty: product.qty, message: 'Product Added Successfully!' }))
        else dispatch(addToCart({ _id: product._id, qty: product.qty, message: 'Product Added Successfully!' }))
    }

    // Minus Handler
    const handleMinus = (product, e) => {
        products
            .filter(pro => product._id == pro._id)
            .map(pro => pro.qty--)

        if (product.qty === 0) dispatch(removeFromCart({ _id: product._id, message: 'Product Removed Successfully!' }))
        else dispatch(updateCart({ _id: product._id, qty: product.qty, message: 'Quantity Reduced Successfully!' }))
    }

    // Plus Handler
    const handlePlus = (product, e) => {
        if ((!product.qty || product.qty === 0) && product.countInStock > 0) {// product doesnot exist in cart

            products
                .filter(pro => product._id == pro._id)
                .map(pro => pro.qty = 1)

            dispatch(addToCart({ _id: product._id, qty: product.qty, message: 'Product Added Successfully!' }))

        } else if (product.countInStock > product.qty) { // product exists in cart

            products
                .filter(pro => product._id == pro._id)
                .map(pro => pro.qty++)

            dispatch(updateCart({ _id: product._id, qty: product.qty, message: 'Quantity Added Successfully!' }))

        } else dispatch(updateCart({ _id: product._id, message: 'Only ' + product.qty + product.unit + ' ' + product.nameEn + ' are available in stock!' }))
    }
    // Add to Cart Btns design 1
    const BottomCenterBtnsDesign = (product) => {
        return (
            <div className="product-add-to-cart">
                <button
                    type="button"
                    className={`add-to-cart-btn ${product.AddToCartBtnsClass}`}
                    value={product._id}
                    onClick={() => dispatch(handleAddToCart(product))}>
                    Add To Cart
        </button>
                <div className={`add-to-cart-btns hide ${product.PlusMinusClass}`}>
                    <button
                        type="button"
                        className="minus"
                        onClick={(e) => handleMinus(product, e)}>
                        <FontAwesome name='fa-minus' className="fas fa-minus" />
                    </button>
                    <p className="add-to-cart-qty show-qty">{product.qty}</p>
                    <button
                        type="button"
                        className="plus show-plus"
                        onClick={() => handlePlus(product)}>
                        <FontAwesome name='fa-plus' className="fas fa-plus" />
                    </button>
                </div>
            </div>
        )
    }

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
    const AddToCartBtns = (product) => {
        return (
            controls.addToCartBtnsStyle === 'Bottom-Center'
                ? BottomCenterBtnsDesign(product)
                : controls.addToCartBtnsStyle === 'Right-Top'
                    ? RightTopBtnsDesign(product)
                    : <></>
        )
    }
})

/////////////// Quick View //////////////////

const QuickView = (product) => {
    return (
        <div className="quick-view-container">
            <div className="quick-view-product">
                {product.discount > 0 &&
                    <div className='product-discount pdqv'>
                        <div>{product.discount}%</div>
                    </div>}
                <div className="quick-view-image">
                    <img src={imageUrl + product.image} alt="product" />
                </div>
                <div className='quick-view-details'>
                    <table className='quick-view-table'>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td className='quick-view-header'>{product.nameEn}</td>
                            </tr>
                            <tr>
                                <th>Brand</th>
                                <td className='quick-view-brand'>{product.brand}</td>
                            </tr>
                            <tr>
                                <th>Price</th>
                                <td className='quick-view-price'>${product.priceUsd}
                                    <div className='quick-view-unit'>/{product.unit}</div>
                                </td>
                            </tr>
                            <tr>
                                <th>Rate</th>
                                <td>{product.rating} Stars</td>
                            </tr>
                            <tr>
                                <th>Reviews</th>
                                <td>{product.numReviews}</td>
                            </tr>
                            <tr>
                                <th>Description</th>
                                <td>{product.description}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="product-add-to-cart">
                        <button
                            type="button"
                            className={'add-to-cart-btn ' + product.qty <= 0 ? 'show' : 'hide'}
                            value={product._id}
                            onClick={() => handleAddToCart(product)}>
                            Add To Cart
              </button>
                        <div className={'add-to-cart-btns hide ' + product.qty <= 0 ? 'hide' : 'show'}>
                            <button
                                type="button"
                                className="minus"
                                onClick={(e) => handleMinus(product, e)}>
                                <FontAwesome name='fa-minus' className="fas fa-minus" />
                            </button>
                            <p className="add-to-cart-qty">{product.qty}</p>
                            <button
                                type="button"
                                className="plus"
                                onClick={() => handlePlus(product)}>
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
*/