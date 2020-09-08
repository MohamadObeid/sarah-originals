import React from 'react';
import Swiper from 'react-id-swiper';
import img1 from '../../images/sample-1.jpg';
import img2 from '../../images/sample-2.jpg';
import img3 from '../../images/sample-3.jpg';

function HeroBanners(props) {

    const swiper = {
        height: 200,
        slidesPerView: 1,
        spaceBetween: 20,
        grabCursor: true,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type: 'bullets',
            dynamicBullets: true,
        },
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
    };
    return (
        <div className="hero">
            <div className="hero-banners">
                <Swiper {...swiper}>
                    <img src={img1} className="hero-main-img"></img>
                    <img src={img2} className="hero-main-img"></img>
                    <img src={img3} className="hero-main-img"></img>
                </Swiper>
                <div className="hero-banner-submain">
                    <img src={img2} className="hero-submain-img"></img>
                    <img src={img3} className="hero-submain-img"></img>
                </div>
            </div>
        </div>
    )
}

export default HeroBanners;