export const defaultControls = {
    active: true,
    addToCartBtnsStyle: 'Right-Top', // Top-Center, Right-Top, Left, Top, Bottom-Right, None, Bottom-Center
    homePageCollections: ['Featured', 'New Arrival', 'Popular'],
    productSwiperMaxLength: 10,
    homePageViews: [
        { active: true, type: 'Light Box', name: 'Top Ribbon' },
        { active: true, type: 'Navigation Bar', name: 'Secondary Navigation Bar' },
        { active: true, type: 'Image Box', name: 'Surprizing Products' },
        { active: true, type: 'Image Box', name: 'Hero' },
        { active: true, type: 'Product Box', name: 'Featured' },
        { active: true, type: 'Image Box', name: 'Categories' },
        { active: true, type: 'Product Box', name: 'New Arrival' },
        { active: true, type: 'Image Box', name: 'Banners' },
        { active: true, type: 'Product Box', name: 'Popular' },
    ],
    topRibbonVisible: true,
    topRibbon: {
        icon: 'faGift',
        backgroundColor: '#ff8000f1',
        text: 'Your first order is Delivery Free!',
        fontSize: '2.8rem',
        height: '50px',
        mobile: {
            fontSize: '2rem'
        }
    },
    imageBox: [{
        active: true,
        name: 'Hero',
        width: '100vw',
        flexDirection: 'row',
        overlayPadding: '2rem 4rem',
        paddingAround: '1rem',
        paddingBetween: '1rem',
        backgroundColor: '#f9f9f9',
        animateImage: false,
        title: { //
            display: 'none', //
            title: '', //
            design: '', //
            backgroundColor: '', //
        },
        swiper: { //
            display: 'block',
            height: '40rem',
            width: '70%',
            borderRadius: '0.5rem',
        },
        fixed: {
            display: 'grid',
            height: '40rem',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            backgroundColor: 'inherit',
            width: '30%',
            paddingAround: '0',
            paddingBetween: '0',
            slideBorderRadius: '0.5rem',
            slideHeight: 'calc((40rem/2) - 0.5rem)',
            slideWidth: '100%',
            slideBackgroundColor: '#fff',
            imgBorderRadius: '0.5rem',
            imgHeight: '100%',
            imgWidth: '100%',
            slideTitle: {
                display: 'none',
            }
        },
        mobile: {
            flexDirection: 'column',
            overlayPadding: '0',
            paddingAround: '0.5rem',
            paddingBetween: '0.5rem',
            backgroundColor: '#fff',
            swiper: { //
                display: 'block',
                height: '19rem',
                width: '100vw',
                borderRadius: '0',
            },
            fixed: { //
                display: 'grid',
                height: '10rem',
                flexWrap: 'nowrap',
                justifyContent: 'space-around',
                backgroundColor: 'inherit',
                width: '100%',
                paddingAround: '0 0.25rem',
                paddingBetween: '0.5rem',
                slideBorderRadius: '0.5rem',
                slideHeight: 'inherit',
                slideWidth: 'calc(50% - 0.25rem)',
                slideBackgroundColor: '#fff',
                imgBorderRadius: '0.5rem',
                imgHeight: '100%',
                imgWidth: '100%',
                swipable: false,
            }
        },
        swiperSlides: [{ //
            title: 'Frozen Cocktail',
            src: '../../images/sample-1.jpg',
            link: ''
        }, {
            title: 'Cashews Raw',
            src: '../../images/sample-2.jpg',
            link: ''
        }, {
            title: 'Light FruDoza',
            src: '../../images/sample-3.jpg',
            link: ''
        }],
        fixedSlides: [{
            title: 'Frozen Cocktail',
            src: '../../images/sample-1.jpg',
            link: ''
        }, {
            title: 'Cashews Raw',
            src: '../../images/sample-2.jpg',
            link: ''
        }],
    },
    {
        active: true,
        name: 'Categories',
        flexDirection: 'column',
        overlayPadding: '2rem 4rem',
        paddingAround: '1rem',
        paddingBetween: '0',
        backgroundColor: '#f9f9f9',
        animateImage: true,
        title: { //
            display: 'flex', //
            title: 'Product Categories', //
            fontSize: '1.5rem',
            design: 'Classic', //
            backgroundColor: '#d3b25d', //
        },
        // show more button
        showMore: {
            display: 'flex',
            color: '#d3b25d',
            moreText: 'show more',
            lessText: 'show less',
        },
        fixed: {
            display: 'grid',
            height: 'fit-content',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            backgroundColor: 'inherit',
            width: '100%',
            paddingAround: '0',
            paddingBetween: '1rem',
            slideBorderRadius: '0.5rem',
            slideBorder: '0',
            slideHeight: '20rem',
            slideWidth: '30rem',
            slideBackgroundColor: '#fff',
            imgBorderRadius: '0',
            imgHeight: '100%',
            imgWidth: '100%',
            slideTitle: {
                display: 'flex',
                backgroundColor: 'inherit',
                color: '#707070',
                fontSize: '1.5rem',
                mobileFontSize: '1.1rem',
                height: '3rem',
                mobileHeight: '2rem',
            },
            swipable: false,
        },
        mobile: {
            overlayPadding: '0',
            paddingAround: '1rem',
            fixed: {
                display: 'grid',
                height: 'fit-content',
                width: '100%',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                backgroundColor: 'inherit',
                paddingAround: '0rem',
                paddingBetween: '0.5rem',
                slideBorderRadius: '0.5rem',
                slideBorder: '0',
                slideHeight: '11rem',
                slideWidth: '11rem',
                imgBorderRadius: '0',
                imgHeight: '100%',
                imgWidth: '100%',
                slideTitle: {
                    fontSize: '1.2rem',
                },
                swipable: false,
            },
        },
        fixedSlides: [{
            title: 'category-sample-1',
            src: '../../images/category-sample-1.jpg',
            link: ''
        }, {
            title: 'category-sample-2',
            src: '../../images/category-sample-2.jpg',
            link: ''
        }, {
            title: 'category-sample-3',
            src: '../../images/category-sample-3.jpg',
            link: ''
        }, {
            title: 'category-sample-4',
            src: '../../images/category-sample-4.jpg',
            link: ''
        }, {
            title: 'category-sample-5',
            src: '../../images/category-sample-5.jpg',
            link: ''
        }, {
            title: 'category-sample-6',
            src: '../../images/category-sample-6.png',
            link: ''
        }, {
            title: 'category-sample-7',
            src: '../../images/category-sample-7.jpg',
            link: ''
        }, {
            title: 'category-sample-8',
            src: '../../images/category-sample-8.jpg',
            link: ''
        }, {
            title: 'category-sample-9',
            src: '../../images/category-sample-9.png',
            link: ''
        }, {
            title: 'category-sample-10',
            src: '../../images/category-sample-10.png',
            link: ''
        }, {
            title: 'category-sample-11',
            src: '../../images/category-sample-11.png',
            link: ''
        }],
    },
    {
        active: true,
        name: 'Banners',
        flexDirection: 'column',
        overlayPadding: '2rem 4rem',
        paddingAround: '1rem',
        paddingBetween: '0',
        backgroundColor: '#f9f9f9',
        animateImage: false,
        // box title
        title: {
            display: 'none',
        },
        // show more button
        showMore: {
            display: 'none',
        },
        fixed: {
            display: 'flex',
            height: 'fit-content',
            width: '100%',
            flexWrap: 'nowrap',
            justifyContent: 'unset',
            backgroundColor: 'inherit',
            paddingAround: '0',
            paddingBetween: '1rem',
            slideBorderRadius: '1.5rem',
            slideBorder: '0',
            slideHeight: '28rem',
            slideWidth: '60rem',
            slideBackgroundColor: '#fff',
            imgBorderRadius: '1.5rem',
            imgHeight: '100%',
            imgWidth: '100%',
            slideTitle: {
                display: 'none',
            },
            swipable: true,
            swiper: {
                chevrons: {
                    display: 'flex',
                    color: '#fff',
                    height: '8rem',
                    width: '4rem',
                    backgroundColor: '#00000040',
                    hoverBackgroundColor: '#00000060',
                }
            },
        },
        mobile: {
            overlayPadding: '0',
            paddingAround: '0.5rem',
            fixed: {
                display: 'flex',
                height: 'fit-content',
                width: '100%',
                flexWrap: 'wrap',
                justifyContent: 'unset',
                backgroundColor: 'inherit',
                paddingAround: '0',
                paddingBetween: '0.5rem',
                slideBorderRadius: '0.5rem',
                slideBorder: '0',
                slideHeight: '17rem',
                slideWidth: '34rem',
                imgBorderRadius: '0.5rem',
                imgHeight: '100%',
                imgWidth: '100%',
                swipable: true,
                swiper: {
                    chevrons: {
                        display: 'flex',
                        color: '#fff',
                        height: '6rem',
                        width: '3rem',
                        backgroundColor: '#00000000',
                        hoverBackgroundColor: '#00000000',
                    }
                }
            },
        },
        fixedSlides: [{
            title: 'banner-sample-1',
            src: '../../images/banner-sample-1.jpg',
            link: ''
        }, {
            title: 'banner-sample-2',
            src: '../../images/banner-sample-2.jpg',
            link: ''
        }, {
            title: 'banner-sample-3',
            src: '../../images/banner-sample-3.jpg',
            link: ''
        }, {
            title: 'banner-sample-4',
            src: '../../images/banner-sample-4.jpg',
            link: ''
        }, {
            title: 'banner-sample-5',
            src: '../../images/banner-sample-5.jpg',
            link: ''
        }],
    }],

    // navigation bar
    navigationBar: {
        active: true,
        backgroundColor: '#fff',
        width: '95%',
        mainHeader: {
            title: 'Product Categories',
        },
        headers: {
            content: [
                { title: 'Special Offers', icon: '' },
                { title: 'Sarah Club', icon: '' },
                { title: 'Track Order', icon: '' },
                { title: 'Any Question?', icon: '' },
                { title: 'Contact us', icon: '' },
            ],
            borderColor: '#ff8000',
            fontSize: '1.4rem',
            padding: '1.5rem',
        },
        searchBar: {
            mostSearchedWords: ['Apple', 'Adidas', 'Vegetables'],
        }
    },

    slideRibbon: [{ // must become imageSwiper
        active: true,
        name: 'Surprising Products',
        ribbon: {
            width: '94vw',
        },
        title: {
            title: 'Surprising Products',
            design: 'fish',
            backgroundColor: '#d3b25d',
            fontSize: '1.6rem',
        },
        image: {
            containerHeight: '8rem',
            containerWidth: '10rem',
            maxHeight: '6.5rem',
            maxWidth: '9rem',
        },
        slide: {
            width: '10rem',
            border: '0',
            backgroundColor: '#fff',
            flexDirection: 'column',
            title: {
                display: 'none',
                justifyContent: 'center',
            }
        },
        //
        mobile: {
            ribbon: {
                width: '100vw',
            },
            slide: {
                width: '9rem',
            },
            image: {
                containerHeight: '7rem',
                containerWidth: '9rem',
                maxHeight: '6rem',
                maxWidth: '8rem',
            }
        },
        //
        slides: [{
            _id: '5f639d4c7da24a1e24d39fc0',
            title: 'Water 10L',
            image: '2c9715de81974fbb60fb5b8cbb5dff95.png'
        },
        {
            _id: '5f64b462725f1400048ecf86',
            title: 'Banana',
            image: '3b3fd4de00c72733f5b8961cd594ef29.jpg'
        },
        {
            _id: "5f64fec55547e61e3c657e3e",
            title: 'Red Apples',
            image: '3f9a3606bc1ecfdfec637fd0a9c48e37.jpg'
        },
        {
            _id: "5f64ff0b5547e61e3c657e42",
            title: 'Carrots',
            image: 'fc79b085f28b9d9fa39d09ca90dceccf.png'
        },
        {
            _id: "5f64ff925547e61e3c657e47",
            title: 'Watermelon',
            image: "44406ebd3aab50d0f0f50d15aa028842.jpg",
        },
        {
            _id: "5f6502955547e61e3c657e4b",
            title: 'Lemon',
            image: "c4bca1772631e2d3ba2fc483e411b286.jpg"
        },
        {
            _id: "5f65037f5547e61e3c657e4f",
            title: 'Brown Onions',
            image: "532bdb7e06e0841c1a1866a31dfb30cc.png"
        },
        {
            _id: "5fbc691cf4505f0e1826eb51",
            title: 'Cucumber',
            image: "27e95dea0bc4bf8912799d21a6e9f8da.png"
        },
        {
            _id: "5fbc694ef4505f0e1826eb55",
            title: 'Eggplant',
            image: "f39088bffff8bdc2bc10a4c283df0d7c.png"
        },
        {
            _id: "5fbc6987f4505f0e1826eb59",
            title: 'Black Grapes',
            image: "7087adce560b81fb48583cb1bbf0bf7c.jpg"
        },
        {
            _id: "5fbc69ccf4505f0e1826eb5e",
            title: "Grape Fruits",
            image: "c8ccd74b95cee6e419f43cdb5819e5c0.png"
        },
        {
            _id: "5fbc6a11f4505f0e1826eb68",
            title: 'Lettuce',
            image: "1f934f4ee1beb9e4a8a74e9c7e34d8e8.png"
        },],
    }]
}

export const swiper = {
    shortSwipes: true,
    slidesOffsetAfter: 0,
    freeMode: true,
    freeModeMomentumRatio: 1,
    grabCursor: true,
    slidesPerView: 'auto',
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'bullets',
        dynamicBullets: true,
    },
}