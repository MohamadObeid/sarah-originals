import React from 'react';
import FontAwesome from 'react-fontawesome';

function QuickView(props) {
    document.querySelector('.quick-view').innerHTML =
        `<div class="quick-view-overlay">
        <div class="quick-view-container">
          <div class="quick-view-product">
            <div class="quick-view-image">
              <img src=${product.image} alt="product" />
            </div>
            <div class='quick-view-details'>
              <div>${product.nameEn}</div>
              <div>${product.brand}</div>
              <div>${product.priceUsd}</div>
              <div>${product.rating} Stars (${product.numReviews} Reviews)</div>
              Description:
              <div>${product.description}</div>
            </div>
            <div class="product-add-to-cart">
              <button
                type="button"
                class="add-to-cart-btn"
                value=${product._id}>
                  Add To Cart
              </button>
                <div class='add-to-cart-btns hide'>
                  <button
                    type="button"
                    class="minus"
                    value=${product._id}>
                      -
                  </button>
                  <p class="add-to-cart-qty count">${product.qty}</p>
                  <button
                    type="button"
                    class="plus"
                    value=${product._id}>
                      +
                  </button>
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
    });

    return (
        <div class="quick-view-overlay">
            <div class="quick-view-container">
                <div class="quick-view-product">
                    <div class="quick-view-image">
                        <img src={product.image} alt="product" />
                    </div>
                    <div class='quick-view-details'>
                        <div>${product.nameEn}</div>
                        <div>${product.brand}</div>
                        <div>${product.priceUsd}</div>
                        <div>${product.rating} Stars (${product.numReviews} Reviews)</div>
                        Description:
                        <div>${product.description}</div>
                    </div>
                    <div class="product-add-to-cart">
                        <button
                            type="button"
                            class="add-to-cart-btn"
                            value={product._id}
                            onClick={() => handleAddToCart()}>
                            Add To Cart
                        </button>
                        <div class='add-to-cart-btns hide'>
                            <button
                                type="button"
                                class="minus"
                                value={product._id}
                                onClick={() => handleMinus()}>
                                <FontAwesome className='fas fa-minus' />
                            </button>
                            <p class="add-to-cart-qty count">${product.qty}</p>
                            <button
                                type="button"
                                class="plus"
                                value={product._id}
                                onClick={() => handleMinus()}>
                                <FontAwesome className='fas fa-plus' />
                            </button>
                        </div>
                    </div>
                </div>
                <div class="quick-view-bar">
                    <div>Add to WishList</div>
                    <div>More Details</div>
                </div>
            </div>
        </div>
    )
}

export default QuickView;