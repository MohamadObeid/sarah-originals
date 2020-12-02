export const defaultControls = {
    active: true,
    addToCartBtnsStyle: 'Right-Top', // Top-Center, Right-Top, Left, Top, Bottom-Right, None, Bottom-Center
    homePageCollections: ['Featured', 'New Arrival', 'Popular'],
    productSwiperMaxLength: 10,
    homePageViews: [
        { type: 'Slide Ribbon', name: 'Product Images Slide' },
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
    navigationBar: {
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

    slideRibbon: [{
        name: 'Product Images Slide',
        ribbon: {
            width: '94vw',
        },
        title: {
            title: 'Surprising Products',
            design: 'fish',
            backgroundColor: '#d3b25d',
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