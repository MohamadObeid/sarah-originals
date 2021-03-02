import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { Timer } from './Timer'
import { AddToCart } from './AddToCart'

export const Product = ({ product, styles, timer }) => {

    const {
        productWrap, productName, productBrand, productPrice, productPriceBeforeDiscount,
        productPriceUnit, productReviews, productRating, priceAndAddToCartWrapper,
        productPriceWrap, addToCartStyles
    } = styles

    product.discounted = timer.active && product.onSale.amount >= product.discount
        ? product.onSale.amount : (product.discount || 0)

    product.priceAfterDiscount = product.discounted > 0
        ? (product.priceUsd - (product.priceUsd * product.discount / 100).toFixed(2))
        : false

    return <div className='product-details-wrap' style={productWrap}>
        {controller
            ? <div className='product-name' style={productName}>{product.nameEn}</div>
            : <Link to={"/product/" + product._id}>
                <div className='product-name' style={productName}>{product.nameEn}</div>
            </Link>
        }
        <div className="product-brand" style={productBrand}>{product.brand}</div>
        <div className='product-det-price-reviews-cont' style={priceAndAddToCartWrapper}>
            <div className="product-det-price-reviews-wrap">
                <div className="product-price" style={productPriceWrap}>
                    <div className={product.discounted ? 'before-discount' : ''}
                        style={product.discounted ? productPriceBeforeDiscount : productPrice}>{product.priceUsd}
                        <div className='price-unit' style={productPriceUnit}>${!product.priceAfterDiscount ? '/' + product.unit : ''}</div>
                    </div>
                    {product.priceAfterDiscount &&
                        <div className='after-discount' style={productPrice}>
                            {product.priceAfterDiscount}
                            <div className='price-unit' style={productPriceUnit}>$/{product.unit}</div>
                        </div>}
                </div>
                <div className='product-review-container'>
                    <div className='product-review' style={productRating}>
                        <FontAwesomeIcon icon={faStar} className='faStar' />
                                4.5</div>
                    <div className='product-review-qty' style={productReviews}>(21)</div>
                </div>
            </div>
            {/* Add To Cart */}
            {addToCartStyles && <AddToCart product={product} styles={addToCartStyles} />}
        </div>

        {/* Timer */}
        {!timer.ended && product.onSale.amount >= product.discount &&
            <Timer slide={product} slider_id={_id} />}

    </div>
}