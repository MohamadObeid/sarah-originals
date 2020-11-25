import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Swiper from 'react-id-swiper';
import image from '../../images/df.jpg';

function ProductRibbon() {
    const imageUrl = window.location.origin + '/api/uploads/image/'

    const swiper = {
        shortSwipes: true,
        slidesOffsetAfter: 0,
        freeMode: true,
        freeModeMomentumRatio: 1,
        grabCursor: true,
        slidesPerView: 'auto',
    }

    const [productRibbon, setProductRibbon] = useState({})
    const [backgroundColor, setBackgroundColor] = useState()

    const { controls, loading } = useSelector(state => state.controls)

    useEffect(() => {
        if (backgroundColor) {
            console.log(backgroundColor)
            const toggleBackgroundColor = (colors) => {
                const index = colors.indexOf(backgroundColor)
                var newBackColorIndex = index + 1
                if (newBackColorIndex === colors.length)
                    newBackColorIndex = 0
                setBackgroundColor(colors[newBackColorIndex])
                console.log(colors[newBackColorIndex])
                setTimeout(toggleBackgroundColor(colors), controls.productRibbon.backgroundAutoPlay)
            }
        }

        if (controls && !loading) {
            setProductRibbon(controls.productRibbon)
            setBackgroundColor(controls.productRibbon.backgroundColor[0])
            //setTimeout(toggleBackgroundColor(controls.productRibbon.backgroundColor), controls.productRibbon.backgroundAutoPlay)
        }

    }, [controls, backgroundColor])



    return (
        <div>
            {controls.productRibbonVisible &&
                <div className='product-ribbon-overlay'>
                    <div className='product-ribbon-container'>
                        {/*<div className='product-ribbon-title'>{productRibbon.title}</div>*/}
                        <div className='fish-title-border'></div>
                        <div className='fish-title-cont'>
                            <div className='fish-title-left-border'></div>
                            <div className='fish-title'>{productRibbon.title}</div>
                            <div className='fish-title-right-border'></div>
                        </div>
                        <div className='product-swiper-container'>
                            {productRibbon.products &&
                                <Swiper {...swiper}>
                                    {productRibbon.products.map(product => (
                                        <div className='product-ribbon-image-container' key={productRibbon.products.indexOf(product)}>
                                            <img src={imageUrl + product.image} alt={product.nameEn} />
                                        </div>
                                    ))}
                                </Swiper>}
                        </div>
                    </div>
                </div>}
        </div >
    )
}

export default ProductRibbon