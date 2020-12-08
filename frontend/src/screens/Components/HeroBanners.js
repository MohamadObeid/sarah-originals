import React from 'react';
import Swiper from 'react-id-swiper';
import img1 from '../../images/sample-1.jpg';
import img2 from '../../images/sample-2.jpg';
import img3 from '../../images/sample-3.jpg';

const HeroBanners = React.memo(props => {
    const {
        imageUrl, heroBanner, heroBannersStyle, mainHeroBannerStyle, submainHeroBannerStyle,
        bannerMarginStyle, heroSubmainImgStyle, swiperSlides, fixedSlides
    } = props.heroBannerProps

    const swiper = {
        height: 200,
        slidesPerView: 1,
        spaceBetween: 10,
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

    const linkSlide = (e, src) => {

    }

    const url = (src) => {
        return (
            src === '../../images/sample-1.jpg'
                ? img1
                : src === '../../images/sample-2.jpg'
                    ? img2
                    : src === '../../images/sample-3.jpg'
                    && img3
        )
    }

    return (
        <>
            <div className="hero-banners" style={heroBannersStyle}>
                <div className="hero-banner-main" style={mainHeroBannerStyle}>
                    <Swiper {...swiper}>
                        {swiperSlides.length > 0 && swiperSlides.map(slide => (
                            <img src={/*imageUrl + slide.src*/url(slide.src)}
                                className="hero-main-img"
                                onClick={e => linkSlide(e, slide.link)}
                                key={slide.title}>
                            </img>))}
                    </Swiper>
                </div>
                <div className='banner-margin' style={bannerMarginStyle}></div>
                <div className="hero-banner-submain" style={submainHeroBannerStyle}>
                    {fixedSlides.length > 0 && fixedSlides.map(slide => (
                        <img src={/*imageUrl + slide.src*/url(slide.src)}
                            className="hero-submain-img"
                            style={heroSubmainImgStyle}
                            onClick={e => linkSlide(e, slide.link)}>
                        </img>
                    ))}
                </div>
            </div>
        </>
    )
})

export default HeroBanners;