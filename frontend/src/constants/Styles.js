/*export const graveyardDefaultControls = {
    active: true,
    backgroundColor: '#fff',
    addToCartBtnsStyle: 'Right-Top', // Top-Center, Right-Top, Left, Top, Bottom-Right, None, Bottom-Center
    productSwiperMaxLength: 10,
    homePageViews: [
        { active: true, type: 'Light Box', name: 'Top Ribbon' },
        { active: true, type: 'Navigation Bar', name: 'Secondary Navigation Bar' },
        { active: true, type: 'Image Box', name: 'Image Ribbon' },
        { active: true, type: 'Image Box', name: 'Surprizing Products' },
        { active: true, type: 'Image Box', name: 'Hero' },
        { active: true, type: 'Product Box', name: 'Featured', collections: ['Featured'] },
        { active: true, type: 'Product Box', name: 'Moment Suggestions', collections: ['Special Offer', 'Moment Suggestions'] },
        { active: true, type: 'Image Box', name: 'Categories' },
        { active: true, type: 'Image Box', name: 'Sub_Banners' },
        { active: true, type: 'Product Box', name: 'New Arrival', collections: ['New Arrival'] },
        { active: true, type: 'Image Box', name: 'Banners' },
        { active: true, type: 'Product Box', name: 'Popular', collections: ['Popular'] },
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
        name: 'Hero',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        overlayPadding: '2rem 4rem',
        paddingAround: '1rem',
        paddingBetween: '1rem',
        background: { color: '#f9f9f9' },
        title: {
            display: 'none',
        },
        mobile: {
            display: 'flex',
            flexWrap: 'wrap',
            paddingAround: '0',
            paddingBetween: '0',
            flexDirection: 'column',
            background: { color: '#f9f9f9' },
            title: {
                display: 'none',
            }
        },
        slideBox: [{
            display: 'flex',
            height: '40rem',
            width: '70%',
            flexWrap: 'nowrap',
            paddingAround: '0',
            paddingBetween: '1rem',
            borderRadius: '0.5rem',
            overflow: 'hidden',
            slide: [{
                borderRadius: '0.5rem',
                border: '0',
                height: '40rem',
                width: '100%',
                backgroundColor: '#fff',
                image: {
                    borderRadius: '0.5rem',
                    height: '100%',
                    width: '100%',
                    animation: false,
                    forceWidth: true,
                },
            }],
            // skeleton
            skeleton: {
                fontSize: '1.2rem',
            },
            // slide Title
            slideTitle: {
                display: 'none',
            },
            swiper: {
                swipable: true,
                direction: 'X',
                chevrons: {
                    display: 'flex',
                    color: '#444444',
                    height: '8rem',
                    width: '4rem',
                    backgroundColor: '#f9f9f9',
                    hoverBackgroundColor: '#f9f9f9',
                    skip: 1,
                    autoToggle: false
                },
                autoPlay: {
                    duration: 3000,
                    run: true,
                },
                scroll: {
                    behavior: 'smooth',
                    autoToggle: true,
                },
                bullets: {
                    display: 'flex',
                    bottom: '1rem',
                    paddingBetween: '0.8rem',
                    fontSize: '1rem',
                }
            },
            mobile: {
                display: 'flex',
                height: '18rem',
                width: '100%',
                flexWrap: 'wrap',
                paddingAround: '0',
                paddingBetween: '0.5rem',
                borderRadius: '0',
                overflow: 'hidden',
                slide: [{
                    borderRadius: '0',
                    border: '0',
                    height: '100%',
                    width: '100%',
                    backgroundColor: '#fff',
                    image: {
                        borderRadius: '0',
                        height: '100%',
                        width: '100%',
                        animation: false,
                        forceWidth: true,
                    },
                }],
                // slide Title
                slideTitle: {
                    display: 'none',
                },
                showMore: {
                    display: 'none'
                },
                swiper: {
                    swipable: true,
                    direction: 'X',
                    chevrons: {
                        display: 'none',
                        color: '#fff',
                        height: '8rem',
                        width: '4rem',
                        backgroundColor: '#00000000',
                        hoverBackgroundColor: '#00000000',
                        skip: 1,
                        autoToggle: true
                    },
                    autoPlay: {
                        duration: 3000,
                        run: true,
                    },
                    scroll: {
                        behavior: 'smooth',
                        autoToggle: true,
                    },
                    bullets: {
                        paddingBetween: '0.5rem',
                        fontSize: '0.8rem',
                    }
                },
            },
            // slides
            slide: [{
                title: 'Frozen Cocktail',
                src: '../../images/sample-1.jpg',
                link: ''
            }, {
                title: 'Light FruDoza',
                src: '../../images/sample-3.jpg',
                link: ''
            }, {
                title: 'Cashews Raw',
                src: '../../images/sample-2.jpg',
                link: ''
            }],
        }, {
            display: 'grid',
            height: '40rem',
            width: '30%',
            flexWrap: 'wrap',
            backgroundColor: 'inherit',
            paddingAround: '0',
            paddingBetween: '1rem',
            slide: [{
                borderRadius: '0.5rem',
                border: '0',
                height: '19.5rem',
                width: '100%',
                backgroundColor: '#fff',
                image: {
                    borderRadius: '0.5rem',
                    height: '100%',
                    width: '100%',
                    animation: false,
                    forceWidth: true,
                },
            }],
            // skeleton
            skeleton: {
                fontSize: '1.2rem',
            },
            // show more
            showMore: {
                display: 'none'
            },
            mobile: {
                display: 'flex',
                height: '10rem',
                width: '100%',
                flexWrap: 'wrap',
                backgroundColor: 'inherit',
                paddingAround: '0.5rem',
                paddingBetween: '0.5rem',
                slide: [{
                    borderRadius: '0.5rem',
                    border: '0',
                    height: '100%',
                    width: '16.5rem',
                    backgroundColor: '#fff',
                    image: {
                        borderRadius: '0.5rem',
                        height: '100%',
                        width: '100%',
                        animation: false,
                        forceWidth: true,
                    },
                }],
                // show more
                showMore: {
                    display: 'none'
                },
                swiper: {
                    swipable: true,
                    direction: 'X',
                    chevrons: {
                        display: 'none',
                        color: '#fff',
                        height: '8rem',
                        width: '4rem',
                        backgroundColor: '#00000000',
                        hoverBackgroundColor: '#00000000',
                        boxShadow: false,
                        skip: 1,
                        autoToggle: true
                    },
                    autoPlay: {
                        run: false,
                    },
                    scroll: {
                        behavior: 'auto',
                        autoToggle: false,
                    },
                    bullets: {
                        display: 'none'
                    }
                },
            },
            swiper: {
                swipable: true,
                direction: 'Y',
                chevrons: {
                    display: 'none',
                    color: '#444444',
                    height: '8rem',
                    width: '4rem',
                    backgroundColor: '#f9f9f9',
                    hoverBackgroundColor: '#f9f9f9',
                    skip: 1,
                    autoToggle: false
                },
                autoPlay: {
                    duration: 3000,
                    run: true,
                },
                scroll: {
                    behavior: 'smooth',
                    autoToggle: false,
                },
            },
            slideTitle: {
                display: 'none',
            },
            // slides
            slide: [{
                title: 'banner-sample-7',
                src: '../../images/banner-sample-7.jpg',
                link: ''
            }, {
                title: 'banner-sample-8',
                src: '../../images/banner-sample-8.jpg',
                link: ''
            }, {
                title: 'banner-sample-9',
                src: '../../images/banner-sample-9.jpg',
                link: ''
            }, {
                title: 'banner-sample-10',
                src: '../../images/banner-sample-10.jpg',
                link: ''
            }, {
                title: 'banner-sample-11',
                src: '../../images/banner-sample-11.jpg',
                link: ''
            }]
        }],
    }, {
        name: 'Categories',
        flexDirection: 'column',
        overlayPadding: '2rem 4rem',
        paddingAround: '1rem',
        paddingBetween: '0',
        background: { color: '#f9f9f9' },
        // box title
        title: {
            display: 'none'
        },
        mobile: {
            overlayPadding: '0',
            paddingAround: '0.5rem',
            background: { color: '#f9f9f9' },
            // box title
            title: {
                display: 'none'
            },
        },
        slideBox: [{
            display: 'grid',
            height: '23rem',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            backgroundColor: 'inherit',
            width: '100%',
            paddingAround: '0',
            paddingBetween: '1rem',
            overflow: 'hidden',
            title: {
                display: 'flex',
                title: {
                    text: 'Product Categories'
                },
                strokeLine: {
                    color: '#d3b25d',
                },
                showAll: {
                    direction: 'Y'
                },
                chevron: {
                    color: '#d3b25d',
                }
            },
            slide: [{
                borderRadius: '0.5rem',
                border: '0',
                height: 'fit-content',
                width: '30rem',
                backgroundColor: '#fff',
                title: {
                    display: 'flex',
                    backgroundColor: 'inherit',
                    color: '#444444',
                    fontSize: '1.5rem',
                    height: '3rem',
                },
                image: {
                    borderRadius: '0.5rem',
                    height: '20rem',
                    width: 'unset',
                    animation: true,
                    forceWidth: false,
                },
            }],
            swiper: {
                swipable: true,
                direction: 'Y',
                autoPlay: {
                    duration: 3000,
                    run: true
                },
                chevrons: {
                    display: 'none'
                },
                scroll: {
                    autoToggle: false,
                    behavior: 'smooth',
                },
                bullets: {
                    display: 'none',
                }
            },
            mobile: {
                display: 'grid',
                height: 'fit-content',
                width: '100%',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                backgroundColor: 'inherit',
                paddingAround: '0',
                paddingBetween: '0.5rem',
                overflow: 'auto',
                slide: [{
                    borderRadius: '0.5rem',
                    border: '0',
                    height: '11rem',
                    width: '11rem',
                    backgroundColor: '#fff',
                    image: {
                        borderRadius: '0.5rem',
                        height: '100%',
                        width: 'unset',
                        animation: false,
                        forceWidth: false,
                    },
                }],
                slideTitle: {
                    display: 'none',
                },
                swiper: {
                    swipable: true,
                    direction: 'Y',
                    autoPlay: {
                        duration: 3000,
                        run: false
                    },
                    chevrons: {
                        display: 'none'
                    },
                    scroll: {
                        autoToggle: false,
                        behavior: 'smooth',
                    },
                    bullets: {
                        display: 'none',
                    }
                },
            },
            slide: [{
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
        }],
    }, {
        active: true,
        name: 'Banners',
        flexDirection: 'column',
        overlayPadding: '2rem 4rem',
        paddingAround: '1rem',
        paddingBetween: '0',
        background: { color: '#f9f9f9' },
        // box title
        title: {
            display: 'none',
        },
        mobile: {
            overlayPadding: '0',
            paddingAround: '1rem 0.5rem',
            background: { color: '#f9f9f9' },
        },
        slideBox: [{
            display: 'flex',
            height: 'fit-content',
            width: '100%',
            flexWrap: 'nowrap',
            justifyContent: 'unset',
            backgroundColor: 'inherit',
            paddingAround: '0',
            paddingBetween: '1rem',
            overflow: 'hidden',
            slide: [{
                borderRadius: '1.5rem',
                border: '0',
                height: '28rem',
                width: '60rem',
                backgroundColor: '#fff',
                image: {
                    borderRadius: '1.5rem',
                    height: '100%',
                    width: '100%',
                    animation: false,
                    forceWidth: true,
                },
            }],
            // title
            slideTitle: {
                display: 'none',
            },
            // swiper
            swiper: {
                swipable: true,
                direction: 'X',
                chevrons: {
                    display: 'flex',
                    color: '#fff',
                    height: '8rem',
                    width: '4rem',
                    backgroundColor: '#00000040',
                    hoverBackgroundColor: '#00000060',
                },
                autoPlay: {
                    duration: 3000,
                    run: false,
                },
                scroll: {
                    behavior: 'smooth',
                    autoToggle: false,
                },
                bullets: {
                    display: 'none'
                }
            },
            mobile: {
                display: 'flex',
                height: '17rem',
                width: '100%',
                flexWrap: 'wrap',
                justifyContent: 'unset',
                backgroundColor: 'inherit',
                paddingAround: '0',
                paddingBetween: '0.5rem',
                overflow: 'auto',
                slide: [{
                    borderRadius: '1.5rem',
                    border: '0',
                    height: '100%',
                    width: '34rem',
                    backgroundColor: '#fff',
                    image: {
                        borderRadius: '1.5rem',
                        height: '100%',
                        width: '100%',
                        animation: false,
                        forceWidth: true,
                    },
                }],
                swiper: {
                    swipable: true,
                    direction: 'X',
                    chevrons: {
                        display: 'none',
                        color: '#fff',
                        height: '6rem',
                        width: '3rem',
                        backgroundColor: '#00000000',
                        hoverBackgroundColor: '#00000000',
                        autoToggle: true,
                        boxShadow: false
                    },
                    autoPlay: {
                        duration: 2000,
                        run: true,
                    },
                    scroll: {
                        behavior: 'smooth',
                        autoToggle: true,
                    },
                }
            },
            slide: [{
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
    }, {
        active: true,
        name: 'Image Ribbon',
        flexDirection: 'column',
        overlayPadding: '2rem 4rem',
        paddingAround: '1rem',
        paddingBetween: '0',
        background: { color: '#f9f9f9' },
        // box title
        title: {
            design: 'Fish',
            title: {
                fontSize: '1.5rem',
                text: 'Surprising Products',
                color: '#d3b25d',
            },
        },
        mobile: {
            flexDirection: 'column',
            overlayPadding: '0',
            paddingAround: '0',
            paddingBetween: '0',
            background: { color: '#f9f9f9' },
            // box title
            title: {
                display: 'flex',
                title: 'Surprising Products',
                fontSize: '1.2rem',
                design: 'Fish',
                color: '#d3b25d',
            },
        },
        slideBox: [{
            display: 'flex',
            height: 'fit-content',
            width: '100%',
            flexWrap: 'nowrap',
            backgroundColor: 'inherit',
            paddingAround: '0',
            paddingBetween: '0.5rem',
            overflow: 'hidden',
            slide: [{
                borderRadius: '0.5rem',
                border: '0',
                height: '8rem',
                width: '10rem',
                backgroundColor: '#fff',
                justifyContent: 'center',
                image: {
                    borderRadius: '0.5rem',
                    height: '6.5rem',
                    width: '9rem',
                    animation: true,
                    forceWidth: false,
                },
            }],
            // title
            slideTitle: {
                display: 'none',
            },
            // show more button
            showMore: {
                display: 'none',
            },
            // swiper
            swiper: {
                swipable: true,
                direction: 'X',
                chevrons: {
                    display: 'none',
                },
                autoPlay: {
                    run: false,
                },
                scroll: {
                    behavior: 'smooth',
                    autoToggle: false,
                },
                bullets: {
                    display: 'none'
                }
            },
            mobile: {
                display: 'flex',
                height: 'fit-content',
                width: '100%',
                flexWrap: 'wrap',
                justifyContent: 'unset',
                backgroundColor: 'inherit',
                paddingAround: '0.5rem',
                paddingBetween: '0.5rem',
                overflow: 'hidden',
                slide: [{
                    borderRadius: '0.5rem',
                    border: '0',
                    height: '7rem',
                    width: '9rem',
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                    image: {
                        borderRadius: '0.5rem',
                        height: '6rem',
                        width: '8rem',
                        animation: false,
                        forceWidth: false,
                    },
                }],
                swiper: {
                    swipable: true,
                    direction: 'X',
                    chevrons: {
                        display: 'none',
                    },
                    autoPlay: {
                        run: false,
                    },
                    scroll: {
                        behavior: 'auto',
                        autoToggle: false,
                    },
                    bullets: {
                        display: 'none'
                    }
                }
            },
            slide: [{
                _id: '5f639d4c7da24a1e24d39fc0',
                title: 'Water 10L',
                src: '2c9715de81974fbb60fb5b8cbb5dff95.png'
            },
            {
                _id: '5f64b462725f1400048ecf86',
                title: 'Banana',
                src: '3b3fd4de00c72733f5b8961cd594ef29.jpg'
            },
            {
                _id: "5f64fec55547e61e3c657e3e",
                title: 'Red Apples',
                src: '3f9a3606bc1ecfdfec637fd0a9c48e37.jpg'
            },
            {
                _id: "5f64ff0b5547e61e3c657e42",
                title: 'Carrots',
                src: 'fc79b085f28b9d9fa39d09ca90dceccf.png'
            },
            {
                _id: "5f64ff925547e61e3c657e47",
                title: 'Watermelon',
                src: "44406ebd3aab50d0f0f50d15aa028842.jpg",
            },
            {
                _id: "5f6502955547e61e3c657e4b",
                title: 'Lemon',
                src: "c4bca1772631e2d3ba2fc483e411b286.jpg"
            },
            {
                _id: "5f65037f5547e61e3c657e4f",
                title: 'Brown Onions',
                src: "532bdb7e06e0841c1a1866a31dfb30cc.png"
            },
            {
                _id: "5fbc691cf4505f0e1826eb51",
                title: 'Cucumber',
                src: "27e95dea0bc4bf8912799d21a6e9f8da.png"
            },
            {
                _id: "5fbc694ef4505f0e1826eb55",
                title: 'Eggplant',
                src: "f39088bffff8bdc2bc10a4c283df0d7c.png"
            },
            {
                _id: "5fbc6987f4505f0e1826eb59",
                title: 'Black Grapes',
                src: "7087adce560b81fb48583cb1bbf0bf7c.jpg"
            },
            {
                _id: "5fbc69ccf4505f0e1826eb5e",
                title: "Grape Fruits",
                src: "c8ccd74b95cee6e419f43cdb5819e5c0.png"
            },
            {
                _id: "5fbc6a11f4505f0e1826eb68",
                title: 'Lettuce',
                src: "1f934f4ee1beb9e4a8a74e9c7e34d8e8.png"
            }],
        }],
    }, {
        name: 'Featured',
        flexDirection: 'row',
        overlayPadding: '2rem 4rem',
        paddingAround: '0.5rem',
        paddingBetween: '0',
        height: 'fit-content',
        background: { color: '#6bb927' },
        borderRadius: '0.5rem',
        boxShadow: false,
        // box title
        title: {
            display: 'none',
            title: 'Featured Products',
            fontSize: '1.7rem',
            design: 'Stunning',
            textAlign: 'center',
            showAll: {
                fontSize: '1.3rem',
                color: '#fff',
                border: '1px solid #fff',
                button: true
            }
        },
        mobile: {
            flexDirection: 'row',
            overlayPadding: '0',
            paddingAround: '0',
            background: { color: '#6bb927' },
            // box title
            title: {
                display: 'flex',
                title: 'Featured Products',
                padding: '0.5rem',
                fontSize: '1.3rem',
                design: 'Stunning',
                border: '1px solid #fff',
                iconColor: '#fff',
                textAlign: 'center',
                showAll: {
                    fontSize: '1.3rem',
                    color: '#fff',
                    border: '1px solid #fff'
                },
            },
        },
        slideBox: [{
            type: 'Product',
            collection_: 'Featured',
            display: 'flex',
            height: 'fit-content',
            width: '100%',
            flexWrap: 'nowrap',
            justifyContent: 'unset',
            backgroundColor: 'inherit',
            paddingAround: '2rem 0.5rem',
            paddingBetween: '1rem',
            overflow: 'hidden',
            badges: {
                display: 'grid'
            },
            slide: [{
                borderRadius: '0.5rem',
                border: '0',
                height: 'fit-content',
                width: '25rem',
                backgroundColor: '#6bb927',
                justifyContent: 'space-around',
                title: {
                    display: 'flex',
                    margin: '0 0 0.5rem 0',
                    border: '1px solid #fff',
                    borderRadius: '1rem',
                    padding: '0.7rem 2rem',
                    color: '#fff',
                    fontSize: '1.3rem'
                },
                image: {
                    borderRadius: '0.5rem',
                    height: '25rem',
                    width: '25rem',
                    animation: false,
                    forceWidth: false,
                },
            }, {
                borderRadius: '0.5rem',
                border: '0',
                height: 'fit-content',
                width: '25rem',
                backgroundColor: '#fff',
                image: {
                    borderRadius: '0.5rem',
                    height: '20rem',
                    width: '20rem',
                    animation: true,
                    forceWidth: false,
                },
            }],
            // title
            slideTitle: {
                display: 'none',
            },
            // swiper
            swiper: {
                swipable: true,
                direction: 'X',
                chevrons: {
                    display: 'flex',
                    color: '#fff',
                    height: '10rem',
                    width: '5rem',
                    backgroundColor: '#6bb927',
                    hoverBackgroundColor: '#6bb927',
                    boxShadow: false,
                },
                autoPlay: {
                    duration: 3000,
                    run: false,
                },
                scroll: {
                    behavior: 'smooth',
                    autoToggle: false,
                },
                bullets: {
                    display: 'none'
                }
            },
            mobile: {
                display: 'flex',
                height: 'fit-content',
                width: '100%',
                flexWrap: 'wrap',
                justifyContent: 'unset',
                backgroundColor: 'inherit',
                paddingAround: '0.5rem',
                paddingBetween: '0.5rem',
                overflow: 'auto',
                slide: [{
                    borderRadius: '0.5rem',
                    border: '0',
                    height: 'fit-content',
                    width: '16rem',
                    backgroundColor: '#fff',
                    image: {
                        borderRadius: '0.5rem',
                        height: '12rem',
                        width: '12rem',
                        animation: false,
                        forceWidth: false,
                    },
                }],
                swiper: {
                    swipable: true,
                    direction: 'X',
                    skipMore: 20,
                    chevrons: {
                        display: 'none',
                    },
                    autoPlay: {
                        run: false,
                    },
                    scroll: {
                        behavior: 'smooth',
                        autoToggle: true,
                    },
                    bullets: {
                        display: 'flex'
                    }
                }
            },
            slide: [{
                title: 'show all',
                src: '../../images/stunning.png'
            }]
        }],
    }, {
        active: true,
        name: 'New Arrival',
        flexDirection: 'column',
        overlayPadding: '2rem 4rem',
        paddingAround: '0.5rem',
        paddingBetween: '0',
        background: { color: '#f9f9f9' },
        // box title
        title: {
            display: 'none'
        },
        mobile: {
            overlayPadding: '0',
            paddingAround: '0',
            background: { color: '#f9f9f9' },
            // box title
            title: {
                display: 'none'
            },
        },
        slideBox: [{
            type: 'Product',
            collection_: 'New Arrival',
            display: 'flex',
            height: 'fit-content',
            width: '100%',
            flexWrap: 'nowrap',
            justifyContent: 'unset',
            backgroundColor: 'inherit',
            paddingAround: '0.5rem',
            paddingBetween: '1rem',
            overflow: 'hidden',
            title: {
                display: 'flex',
                title: {
                    text: 'New Arrival Products'
                },
                strokeLine: {
                    color: '#d3b25d',
                },
                chevron: {
                    color: '#d3b25d',
                }
            },
            slide: [{
                borderRadius: '0.5rem',
                border: '0',
                height: 'fit-content',
                width: '25rem',
                backgroundColor: '#fff',
                image: {
                    borderRadius: '0.5rem',
                    height: '20rem',
                    width: '20rem',
                    animation: true,
                    forceWidth: false,
                },
            }],
            // title
            slideTitle: {
                display: 'none',
            },
            // show more button
            showMore: {
                display: 'none',
            },
            // swiper
            swiper: {
                swipable: true,
                direction: 'X',
                chevrons: {
                    display: 'flex',
                    color: '#444444',
                    height: '9rem',
                    width: '4.5rem',
                    backgroundColor: '#f9f9f9',
                    hoverBackgroundColor: '#f9f9f9',
                },
                autoPlay: {
                    duration: 3000,
                    run: false,
                },
                scroll: {
                    behavior: 'smooth',
                    autoToggle: false,
                },
                bullets: {
                    display: 'none'
                }
            },
            mobile: {
                display: 'flex',
                height: 'fit-content',
                width: '100%',
                flexWrap: 'wrap',
                justifyContent: 'unset',
                backgroundColor: 'inherit',
                paddingAround: '0.5rem',
                paddingBetween: '0.5rem',
                overflow: 'hidden',
                slide: [{
                    borderRadius: '0.5rem',
                    border: '0',
                    height: 'fit-content',
                    width: '16rem',
                    backgroundColor: '#fff',
                    image: {
                        borderRadius: '0.5rem',
                        height: '12rem',
                        width: '12rem',
                        animation: false,
                        forceWidth: false,
                    },
                }],
                swiper: {
                    swipable: true,
                    direction: 'X',
                    chevrons: {
                        display: 'none',
                    },
                    autoPlay: {
                        run: false,
                    },
                    scroll: {
                        behavior: 'auto',
                        autoToggle: false,
                    },
                    bullets: {
                        display: 'flex'
                    }
                }
            }
        }],
    }, {
        name: 'Popular',
        flexDirection: 'column',
        overlayPadding: '2rem 4rem',
        paddingAround: '1rem',
        paddingBetween: '0',
        background: { color: '#f9f9f9' },
        // box title
        title: {
            paddingAround: '0 3rem',
            border: '0',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            title: {
                text: 'Popular Products',
                border: '1px solid red',
                padding: '1.2rem 2rem 1.2rem 0'
            },
            strokeLine: {
                height: '1px',
                color: '#00000020'
            },
            showAll: {
                display: 'flex',
                position: 'absolute',
                color: '#00000090',
                fontSize: '1.3rem',
                padding: '1.2rem 1rem',
            },
            chevron: {
                color: '#00000080',
                fontSize: '1.6rem'
            }
        },
        mobile: {
            overlayPadding: '0',
            paddingAround: '0',
            background: { color: '#f9f9f9' },
            // box title
            title: {
                title: {
                    text: 'Popular Products',
                },
                strokeLine: {
                    color: '#d3b25d',
                },
            },
        },
        slideBox: [{
            type: 'Product',
            collection_: 'Popular',
            display: 'flex',
            height: 'fit-content',
            width: '100%',
            flexWrap: 'nowrap',
            justifyContent: 'unset',
            backgroundColor: 'inherit',
            paddingAround: '0.5rem',
            paddingBetween: '1rem',
            overflow: 'hidden',
            slide: [{
                borderRadius: '0.5rem',
                border: '0',
                height: 'fit-content',
                width: '25rem',
                backgroundColor: '#fff',
                image: {
                    borderRadius: '0.5rem',
                    height: '20rem',
                    width: '20rem',
                    animation: true,
                    forceWidth: false,
                },
            }],
            // swiper
            swiper: {
                swipable: true,
                direction: 'X',
                chevrons: {
                    display: 'flex',
                    color: '#444444',
                    height: '9rem',
                    width: '4.5rem',
                    backgroundColor: '#f9f9f9',
                    hoverBackgroundColor: '#f9f9f9',
                },
                autoPlay: {
                    duration: 3000,
                    run: false,
                },
                scroll: {
                    behavior: 'smooth',
                    autoToggle: false,
                },
                bullets: {
                    display: 'none'
                },
            },
            mobile: {
                display: 'flex',
                height: 'fit-content',
                width: '100%',
                flexWrap: 'wrap',
                justifyContent: 'unset',
                backgroundColor: 'inherit',
                paddingAround: '0.5rem',
                paddingBetween: '0.5rem',
                overflow: 'hidden',
                slide: [{
                    borderRadius: '0.5rem',
                    border: '0',
                    height: 'fit-content',
                    width: '16rem',
                    backgroundColor: '#fff',
                    image: {
                        borderRadius: '0.5rem',
                        height: '12rem',
                        width: '12rem',
                        animation: false,
                        forceWidth: false,
                    },
                }],
                swiper: {
                    swipable: true,
                    direction: 'X',
                    chevrons: {
                        display: 'none',
                    },
                    autoPlay: {
                        run: false,
                    },
                    scroll: {
                        behavior: 'auto',
                        autoToggle: false,
                    },
                    bullets: {
                        display: 'flex'
                    }
                }
            }
        }],
    }, {
        name: 'Moment Suggestions',
        flexDirection: 'row',
        overlayPadding: '2rem 4rem',
        paddingAround: '0',
        paddingBetween: '2%',
        background: { color: '#fff' },
        // box title
        title: {
            display: 'none',
        },
        slideBox: [{
            type: 'Product',
            collection_: 'Special Offer',
            display: 'flex',
            height: 'fit-content',
            width: '78%',
            flexWrap: 'nowrap',
            justifyContent: 'unset',
            backgroundColor: '#f9f9f9',
            border: '0',
            paddingAround: '1rem',
            paddingBetween: '1rem',
            overflow: 'hidden',
            slide: [{
                borderRadius: '0.5rem',
                border: '0',
                height: 'fit-content',
                width: '25rem',
                backgroundColor: '#f9f9f9',
                justifyContent: 'space-between',
                title: {
                    display: 'flex',
                    margin: '0 0 2rem 0',
                    border: '1px solid #00000080',
                    borderRadius: '2rem',
                    padding: '0.8rem 3rem'
                },
                image: {
                    borderRadius: '0.5rem',
                    height: '15rem',
                    width: '15rem',
                    animation: false,
                    forceWidth: false,
                },
            }, {
                borderRadius: '0.5rem',
                border: '0',
                height: 'fit-content',
                width: '25rem',
                backgroundColor: '#fff',
                title: {
                    display: 'none',
                },
                image: {
                    borderRadius: '0.5rem',
                    height: '20rem',
                    width: '20rem',
                    animation: true,
                    forceWidth: false,
                },
            }],
            // slide box title: 
            title: {
                display: 'flex',
                paddingAround: '0 3rem',
                border: '0',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                title: {
                    text: 'Special Products',
                    border: '1px solid red',
                    padding: '1.2rem 2rem 1.2rem 0'
                },
                strokeLine: {
                    height: '1px',
                    color: '#00000020'
                },
                showAll: {
                    display: 'none',
                    position: 'absolute',
                    color: '#00000080',
                    fontSize: '1.4rem',
                    padding: '1.2rem 0',
                },
                chevron: {
                    color: '#00000080',
                    fontSize: '1.6rem'
                }
            },
            // swiper
            swiper: {
                swipable: true,
                direction: 'X',
                chevrons: {
                    display: 'flex',
                    color: '#444444',
                    height: '9rem',
                    width: '4.5rem',
                    backgroundColor: '#f9f9f9',
                    hoverBackgroundColor: '#f9f9f9',
                },
                autoPlay: {
                    duration: 3000,
                    run: false,
                },
                scroll: {
                    behavior: 'smooth',
                    autoToggle: false,
                },
                bullets: {
                    display: 'none'
                }
            },
            mobile: {
                display: 'flex',
                height: 'fit-content',
                width: '100%',
                flexWrap: 'wrap',
                justifyContent: 'unset',
                backgroundColor: 'inherit',
                paddingAround: '0.5rem',
                paddingBetween: '0.5rem',
                overflow: 'hidden',
                slide: [{
                    borderRadius: '0.5rem',
                    border: '0',
                    height: 'fit-content',
                    width: '16rem',
                    backgroundColor: '#fff',
                    image: {
                        borderRadius: '0.5rem',
                        height: '12rem',
                        width: '12rem',
                        animation: false,
                        forceWidth: false,
                    },
                }],
                swiper: {
                    swipable: true,
                    direction: 'X',
                    chevrons: {
                        display: 'none',
                    },
                    autoPlay: {
                        run: false,
                    },
                    scroll: {
                        behavior: 'auto',
                        autoToggle: false,
                    },
                    bullets: {
                        display: 'flex'
                    }
                }
            },
            slide: [{
                link: '',
                title: 'Adidas',
                src: '4940604d493ce2d94e1b53cb293a6168.png'
            }]
        }, {
            type: 'Product',
            collection_: 'Moment Suggestions',
            display: 'flex',
            height: 'fit-content',
            width: '20%',
            border: '1px solid #00000020',
            flexWrap: 'nowrap',
            justifyContent: 'unset',
            backgroundColor: '#fff',
            paddingAround: '1rem',
            paddingBetween: '1rem',
            overflow: 'hidden',
            slide: [{
                borderRadius: '0.5rem',
                border: '0',
                height: 'fit-content',
                width: '100%',
                backgroundColor: '#fff',
                title: {
                    display: 'none',
                },
                image: {
                    borderRadius: '0.5rem',
                    height: '20rem',
                    width: '20rem',
                    animation: true,
                    forceWidth: false,
                },
            }],
            // slide title: 
            title: {
                display: 'flex',
                paddingAround: '1.5rem 0',
                border: '0',
                alignItems: 'flex-start',
                justifyContent: 'center',
                title: {
                    fontSize: '1.4rem',
                    position: 'absolute',
                    text: 'Moment Suggestions',
                    padding: '0',
                    margin: '0',
                    color: '#606060'
                },
                strokeLine: {
                    width: '0%'
                },
                showAll: {
                    display: 'none',
                },
                chevron: {
                    display: 'none'
                }
            },
            // swiper
            swiper: {
                swipable: true,
                direction: 'X',
                chevrons: {
                    display: 'none',
                },
                autoPlay: {
                    duration: 7000,
                    run: true,
                    stopOnHover: true
                },
                scroll: {
                    behavior: 'smooth',
                    autoToggle: false,
                },
                bullets: {
                    display: 'none'
                },
                timerBar: {
                    display: 'flex',
                    margin: '1rem 0'
                }
            },
            mobile: {
                display: 'flex',
                height: 'fit-content',
                width: '100%',
                flexWrap: 'wrap',
                justifyContent: 'unset',
                backgroundColor: 'inherit',
                paddingAround: '0.5rem',
                paddingBetween: '0.5rem',
                overflow: 'hidden',
                slide: [{
                    borderRadius: '0.5rem',
                    border: '0',
                    height: 'fit-content',
                    width: '16rem',
                    backgroundColor: '#fff',
                    title: {
                        display: 'none'
                    },
                    image: {
                        borderRadius: '0.5rem',
                        height: '12rem',
                        width: '12rem',
                        animation: false,
                        forceWidth: false,
                    },
                }],
                swiper: {
                    swipable: true,
                    direction: 'X',
                    chevrons: {
                        display: 'none',
                    },
                    autoPlay: {
                        run: false,
                    },
                    scroll: {
                        behavior: 'auto',
                        autoToggle: false,
                    },
                    bullets: {
                        display: 'flex'
                    },
                    timerBar: {
                        display: 'flex'
                    }
                }
            },
            slide: []
        }],
    }, {
        name: 'Sub_Banners',
        flexDirection: 'column',
        overlayPadding: '2rem 4rem',
        paddingAround: '1rem',
        paddingBetween: '0',
        background: { color: '#f9f9f9' },
        // box title
        title: {
            display: 'none'
        },
        mobile: {
            overlayPadding: '0',
            paddingAround: '0.5rem',
            background: { color: '#f9f9f9' },
            // box title
            title: {
                display: 'none'
            },
        },
        slideBox: [{
            display: 'grid',
            height: 'fit-content',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            backgroundColor: 'inherit',
            width: '100%',
            paddingAround: '0',
            paddingBetween: '1rem',
            overflow: 'hidden',
            title: {
                display: 'none'
            },
            slide: [{
                borderRadius: '1.5rem',
                border: '00',
                height: '23rem',
                width: '30rem',
                backgroundColor: '#fff',
                title: {
                    display: 'none',
                },
                image: {
                    borderRadius: '1.5rem',
                    height: '100%',
                    width: '100%',
                    animation: false,
                    forceWidth: true,
                },
            }],
            swiper: {
                swipable: false
            },
            mobile: {
                display: 'grid',
                height: 'fit-content',
                width: '100%',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                backgroundColor: 'inherit',
                paddingAround: '0',
                paddingBetween: '0.5rem',
                overflow: 'auto',
                slide: [{
                    borderRadius: '0.5rem',
                    border: '0',
                    height: '11rem',
                    width: '11rem',
                    backgroundColor: '#fff',
                    image: {
                        borderRadius: '0.5rem',
                        height: '100%',
                        width: 'unset',
                        animation: false,
                        forceWidth: false,
                    },
                }],
                slideTitle: {
                    display: 'none',
                },
                swiper: {
                    swipable: true,
                    direction: 'Y',
                    autoPlay: {
                        duration: 3000,
                        run: false
                    },
                    chevrons: {
                        display: 'none'
                    },
                    scroll: {
                        autoToggle: false,
                        behavior: 'smooth',
                    },
                    bullets: {
                        display: 'none',
                    }
                },
            },
            slide: [{
                title: 'sub-banner-1',
                src: '../../images/sub-banner-1.jpg',
                link: ''
            }, {
                title: 'sub-banner-2',
                src: '../../images/sub-banner-2.jpg',
                link: ''
            }, {
                title: 'sub-banner-3',
                src: '../../images/sub-banner-3.jpg',
                link: ''
            }, {
                title: 'sub-banner-4',
                src: '../../images/sub-banner-4.jpg',
                link: ''
            }],
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
    }
}*/

//////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

export const Styles = [{
    viewPort: 'desktop',
    name: 'Hero',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    overlayPadding: '2rem 4rem',
    paddingAround: '1rem',
    paddingBetween: '1rem',
    background: { color: '#f9f9f9' },
    slideBox: [{
        type: 'Image',
        display: 'flex',
        height: '40rem',
        width: '70%',
        flexWrap: 'nowrap',
        paddingAround: '0',
        paddingBetween: '1rem',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        slide: [{
            isDefault: true,
            borderRadius: '0.5rem',
            border: '0',
            height: '40rem',
            width: '100%',
            backgroundColor: '#fff',
            image: {
                borderRadius: '0.5rem',
                height: '100%',
                width: '100%',
                animation: false,
                forceWidth: true,
                forceHeight: true,
            },
        }],
        // skeleton
        skeleton: {
            fontSize: '1.2rem',
        },
        swiper: {
            swipable: true,
            direction: 'X',
            chevrons: {
                display: 'flex',
                color: '#444444',
                height: '8rem',
                width: '4rem',
                backgroundColor: '#f9f9f9',
                hoverBackgroundColor: '#f9f9f9',
                skip: 1,
                autoToggle: false
            },
            autoPlay: {
                duration: 3000,
                run: true,
            },
            scroll: {
                behavior: 'smooth',
                autoToggle: true,
            },
            bullets: {
                display: 'flex',
                bottom: '1rem',
                paddingBetween: '0.8rem',
                fontSize: '1rem',
            }
        },
    }, {
        type: 'Image',
        display: 'grid',
        height: '40rem',
        width: '30%',
        flexWrap: 'wrap',
        backgroundColor: 'inherit',
        paddingAround: '0',
        paddingBetween: '1rem',
        slide: [{
            isDefault: true,
            borderRadius: '0.5rem',
            border: '0',
            height: '19.5rem',
            width: '100%',
            backgroundColor: '#fff',
            productVisible: false,
            image: {
                borderRadius: '0.5rem',
                height: '100%',
                width: '100%',
                animation: false,
                forceWidth: true,
                forceHeight: true,
            },
        }],
        // skeleton
        skeleton: {
            fontSize: '1.2rem',
        },
        // show more
        showMore: {
            display: 'none'
        },
        swiper: {
            swipable: true,
            direction: 'Y',
            chevrons: {
                display: 'none',
                color: '#444444',
                height: '8rem',
                width: '4rem',
                backgroundColor: '#f9f9f9',
                hoverBackgroundColor: '#f9f9f9',
                skip: 1,
                autoToggle: false
            },
            autoPlay: {
                duration: 3000,
                run: true,
            },
            scroll: {
                behavior: 'smooth',
                autoToggle: false,
            },
            bullets: {
                display: 'flex',
            }
        },
    }],
}, /*{
    viewPort: 'mobile',
    name: 'Hero mobile',
    display: 'flex',
    flexWrap: 'wrap',
    paddingAround: '0',
    paddingBetween: '0',
    flexDirection: 'column',
    background: { color: '#f9f9f9' },
    slideBox: [{
        type: 'Image',
        display: 'flex',
        height: '18rem',
        width: '100%',
        flexWrap: 'wrap',
        paddingAround: '0',
        paddingBetween: '0.5rem',
        borderRadius: '0',
        overflow: 'hidden',
        slide: [{
            borderRadius: '0',
            border: '0',
            height: '100%',
            width: '100%',
            backgroundColor: '#fff',
            image: {
                borderRadius: '0',
                height: '100%',
                width: '100%',
                animation: false,
                forceWidth: true,
            },
        }],
        showMore: {
            display: 'none'
        },
        swiper: {
            swipable: true,
            direction: 'X',
            chevrons: {
                display: 'none',
                color: '#fff',
                height: '8rem',
                width: '4rem',
                backgroundColor: '#00000000',
                hoverBackgroundColor: '#00000000',
                skip: 1,
                autoToggle: true
            },
            autoPlay: {
                duration: 3000,
                run: true,
            },
            scroll: {
                behavior: 'smooth',
                autoToggle: true,
            },
            bullets: {
                paddingBetween: '0.5rem',
                fontSize: '0.8rem',
            }
        },
    }, {
        type: 'Image',
        display: 'flex',
        height: '10rem',
        width: '100%',
        flexWrap: 'wrap',
        backgroundColor: 'inherit',
        paddingAround: '0.5rem',
        paddingBetween: '0.5rem',
        slide: [{
            borderRadius: '0.5rem',
            border: '0',
            height: '100%',
            width: '16.5rem',
            backgroundColor: '#fff',
            image: {
                borderRadius: '0.5rem',
                height: '100%',
                width: '100%',
                animation: false,
                forceWidth: true,
            },
        }],
        // show more
        showMore: {
            display: 'none'
        },
        swiper: {
            swipable: true,
            direction: 'X',
            chevrons: {
                display: 'none',
                color: '#fff',
                height: '8rem',
                width: '4rem',
                backgroundColor: '#00000000',
                hoverBackgroundColor: '#00000000',
                boxShadow: false,
                skip: 1,
                autoToggle: true
            },
            autoPlay: {
                run: false,
            },
            scroll: {
                behavior: 'auto',
                autoToggle: false,
            },
            bullets: {
                display: 'none'
            }
        }
    }]
}, */{
    viewPort: 'desktop',
    name: 'Categories',
    flexDirection: 'column',
    overlayPadding: '2rem 4rem',
    paddingAround: '0.5rem',
    paddingBetween: '0',
    background: { color: '#f9f9f9' },
    title: { display: 'none' },
    slideBox: [{
        type: 'Image',
        display: 'grid',
        height: 'slideHeight',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        backgroundColor: 'inherit',
        width: '100%',
        paddingAround: '0.5rem',
        paddingBetween: '1rem',
        overflow: 'hidden',
        title: {
            name: 'Center Stroke 100',
            strokeLine: {
                color: '#d3b25d',
            },
            chevron: {
                color: '#d3b25d',
                transform: 'rotate(90deg)'
            }
        },
        slide: [{
            isDefault: true,
            borderRadius: '0.5rem',
            border: '0',
            height: 'fit-content',
            width: '30rem',
            backgroundColor: '#fff',
            productVisible: false,
            title: {
                name: 'Simple Slide Title',
                margin: '0 0 1rem 0',
                justifyContent: 'center',
                title: {
                    fontSize: '1.5rem',
                    margin: '0',
                },
                strokeLine: {
                    display: 'none'
                },
                showAll: {
                    text: '',
                    margin: '0'
                },
                chevron: {
                    color: '#d3b25d',
                    fontSize: '1.7rem'
                }
            },
            image: {
                borderRadius: '0.5rem',
                height: '20rem',
                width: 'unset',
                animation: true,
                forceWidth: false,
            },
        }],
        swiper: {
            swipable: true,
            direction: 'Y',
            autoPlay: {
                duration: 3000,
                run: true
            },
            chevrons: {
                display: 'none'
            },
            scroll: {
                autoToggle: false,
                behavior: 'smooth',
            },
            bullets: {
                display: 'none',
            }
        },
    }],
}, /*{
    viewPort: 'mobile',
    name: 'Categories mobile',
    overlayPadding: '0',
    paddingAround: '0.5rem',
    background: { color: '#f9f9f9' },
    // box title
    title: {
        display: 'none'
    },
    slideBox: [{
        type: 'Image',
        display: 'grid',
        height: 'fit-content',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        backgroundColor: 'inherit',
        paddingAround: '0',
        paddingBetween: '0.5rem',
        overflow: 'auto',
        slide: [{
            borderRadius: '0.5rem',
            border: '0',
            height: '11rem',
            width: '11rem',
            backgroundColor: '#fff',
            image: {
                borderRadius: '0.5rem',
                height: '100%',
                width: 'unset',
                animation: false,
                forceWidth: false,
            },
        }],
        slideTitle: {
            display: 'none',
        },
        swiper: {
            swipable: true,
            direction: 'Y',
            autoPlay: {
                duration: 3000,
                run: false
            },
            chevrons: {
                display: 'none'
            },
            scroll: {
                autoToggle: false,
                behavior: 'smooth',
            },
            bullets: {
                display: 'none',
            }
        }
    }]
}, */{
    viewPort: 'desktop',
    name: 'Banners',
    flexDirection: 'column',
    overlayPadding: '2rem 4rem',
    paddingAround: '1rem',
    paddingBetween: '0',
    background: { color: '#f9f9f9' },
    slideBox: [{
        type: 'Image',
        display: 'flex',
        height: 'fit-content',
        width: '100%',
        flexWrap: 'nowrap',
        justifyContent: 'unset',
        backgroundColor: 'inherit',
        paddingAround: '0',
        paddingBetween: '1rem',
        overflow: 'hidden',
        slide: [{
            isDefault: true,
            borderRadius: '1.5rem',
            border: '0',
            height: '28rem',
            width: '60rem',
            backgroundColor: '#fff',
            image: {
                borderRadius: '1.5rem',
                height: '100%',
                width: '100%',
                animation: false,
                forceWidth: true,
                forceHeight: true,
            },
        }],
        // swiper
        swiper: {
            swipable: true,
            direction: 'X',
            chevrons: {
                display: 'flex',
                color: '#fff',
                height: '8rem',
                width: '4rem',
                backgroundColor: '#00000040',
                hoverBackgroundColor: '#00000060',
            },
            autoPlay: {
                duration: 3000,
                run: false,
            },
            scroll: {
                behavior: 'smooth',
                autoToggle: false,
            },
            bullets: {
                display: 'none'
            }
        },
    }],
}, /*{
    viewPort: 'mobile',
    name: 'Banners mobile',
    slideBox: [{
        type: 'Image',
        display: 'flex',
        height: '17rem',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'unset',
        backgroundColor: 'inherit',
        paddingAround: '0',
        paddingBetween: '0.5rem',
        overflow: 'auto',
        slide: [{
            borderRadius: '1.5rem',
            border: '0',
            height: '100%',
            width: '34rem',
            backgroundColor: '#fff',
            image: {
                borderRadius: '1.5rem',
                height: '100%',
                width: '100%',
                animation: false,
                forceWidth: true,
            },
        }],
        swiper: {
            swipable: true,
            direction: 'X',
            chevrons: {
                display: 'none',
                color: '#fff',
                height: '6rem',
                width: '3rem',
                backgroundColor: '#00000000',
                hoverBackgroundColor: '#00000000',
                autoToggle: true,
                boxShadow: false
            },
            autoPlay: {
                duration: 2000,
                run: true,
            },
            scroll: {
                behavior: 'smooth',
                autoToggle: true,
            },
        }
    }]
}, */{
    viewPort: 'desktop',
    name: 'Image Ribbon',
    flexDirection: 'column',
    overlayPadding: '2rem 4rem',
    paddingAround: '1rem',
    paddingBetween: '0',
    background: { color: '#f9f9f9' },
    title: {
        name: 'Top-Fish-100',
        design: 'Fish',
        title: {
            fontSize: '1.5rem',
            text: 'Surprising Products',
            color: '#d3b25d',
        },
    },
    slideBox: [{
        type: 'Image',
        display: 'flex',
        height: 'fit-content',
        width: '100%',
        flexWrap: 'nowrap',
        backgroundColor: 'inherit',
        paddingAround: '0',
        paddingBetween: '0.5rem',
        overflow: 'hidden',
        slide: [{
            isDefault: true,
            borderRadius: '0.5rem',
            border: '0',
            height: '8rem',
            width: '10rem',
            backgroundColor: '#fff',
            justifyContent: 'center',
            productVisible: false,
            image: {
                borderRadius: '0.5rem',
                height: '6.5rem',
                width: '9rem',
                animation: true,
                forceWidth: false,
            },
        }],
        badges: {
            display: 'none',
        },
        // swiper
        swiper: {
            swipable: true,
            direction: 'X',
            chevrons: {
                display: 'none',
            },
            autoPlay: {
                run: false,
            },
            scroll: {
                behavior: 'smooth',
                autoToggle: false,
            },
            bullets: {
                display: 'none'
            }
        },
    }],
}, /*{
    viewPort: 'mobile',
    name: 'Image Ribbon mobile',
    flexDirection: 'column',
    overlayPadding: '0',
    paddingAround: '0',
    paddingBetween: '0',
    background: { color: '#f9f9f9' },
    // box title
    title: {
        display: 'flex',
        title: 'Surprising Products',
        fontSize: '1.2rem',
        design: 'Fish',
        color: '#d3b25d',
    },
    slideBox: [{
        type: 'Image',
        display: 'flex',
        height: 'fit-content',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'unset',
        backgroundColor: 'inherit',
        paddingAround: '0.5rem',
        paddingBetween: '0.5rem',
        overflow: 'hidden',
        slide: [{
            borderRadius: '0.5rem',
            border: '0',
            height: '7rem',
            width: '9rem',
            backgroundColor: '#fff',
            justifyContent: 'center',
            image: {
                borderRadius: '0.5rem',
                height: '6rem',
                width: '8rem',
                animation: false,
                forceWidth: false,
            },
        }],
        swiper: {
            swipable: true,
            direction: 'X',
            chevrons: {
                display: 'none',
            },
            autoPlay: {
                run: false,
            },
            scroll: {
                behavior: 'auto',
                autoToggle: false,
            },
            bullets: {
                display: 'none'
            }
        }
    }]
}, */{
    viewPort: 'desktop',
    name: 'Featured',
    flexDirection: 'row',
    overlayPadding: '2rem 4rem',
    paddingAround: '0.5rem',
    paddingBetween: '0',
    height: 'fit-content',
    background: { color: '#6bb927' },
    borderRadius: '0.5rem',
    boxShadow: false,
    slideBox: [{
        type: 'Product',
        display: 'flex',
        height: 'fit-content',
        width: '100%',
        flexWrap: 'nowrap',
        justifyContent: 'unset',
        backgroundColor: 'inherit',
        paddingAround: '2rem 0.5rem',
        paddingBetween: '1rem',
        overflow: 'hidden',
        badges: {
            display: 'grid'
        },
        slide: [{
            index: 0,
            borderRadius: '0.5rem',
            border: '0',
            height: 'fit-content',
            width: '25rem',
            backgroundColor: '#6bb927',
            justifyContent: 'space-around',
            productVisible: false,
            image: {
                borderRadius: '0.5rem',
                height: '25rem',
                width: '25rem',
                animation: false,
                forceWidth: false,
            },
        }, {
            isDefault: true,
            borderRadius: '0.5rem',
            border: '0',
            height: 'fit-content',
            width: '25rem',
            backgroundColor: '#fff',
            image: {
                borderRadius: '0.5rem',
                height: '20rem',
                width: '20rem',
                animation: true,
                forceWidth: false,
            },
        }],
        product: {
            // add to cart
            addToCart: {
                position: 'absolute',
                name: 'Top Right Animated',
                design: 'Top Right',
                padding: '0.5rem',
                flexDirection: 'column-reverse',
                add: {
                    btn: 'plus',
                    fontSize: '1.4rem',
                    width: '4.7rem',
                },
                num: {
                    margin: '0.3rem 0',
                    border: '1px solid #dddddd',
                }
            },
        },
        // swiper
        swiper: {
            swipable: true,
            direction: 'X',
            chevrons: {
                display: 'flex',
                color: '#fff',
                height: '10rem',
                width: '5rem',
                backgroundColor: '#6bb927',
                hoverBackgroundColor: '#6bb927',
                boxShadow: false,
            },
            autoPlay: {
                duration: 3000,
                run: false,
            },
            scroll: {
                behavior: 'smooth',
                autoToggle: false,
            },
            bullets: {
                display: 'none'
            }
        }
    }],
}, /*{
    viewPort: 'mobile',
    name: 'Featured mobile',
    flexDirection: 'row',
    overlayPadding: '0',
    paddingAround: '0',
    background: { color: '#6bb927' },
    // box title
    title: {
        display: 'flex',
        title: 'Featured Products',
        padding: '0.5rem',
        fontSize: '1.3rem',
        design: 'Stunning',
        border: '1px solid #fff',
        iconColor: '#fff',
        textAlign: 'center',
        showAll: {
            fontSize: '1.3rem',
            color: '#fff',
            border: '1px solid #fff'
        },
    },
    slideBox: [{
        type: 'Product',
        display: 'flex',
        height: 'fit-content',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'unset',
        backgroundColor: 'inherit',
        paddingAround: '0.5rem',
        paddingBetween: '0.5rem',
        overflow: 'auto',
        slide: [{
            borderRadius: '0.5rem',
            border: '0',
            height: 'fit-content',
            width: '16rem',
            backgroundColor: '#fff',
            image: {
                borderRadius: '0.5rem',
                height: '12rem',
                width: '12rem',
                animation: false,
                forceWidth: false,
            },
        }],
        swiper: {
            swipable: true,
            direction: 'X',
            skipMore: 20,
            chevrons: {
                display: 'none',
            },
            autoPlay: {
                run: false,
            },
            scroll: {
                behavior: 'smooth',
                autoToggle: true,
            },
            bullets: {
                display: 'flex'
            }
        }
    }]
}, */{
    viewPort: 'desktop',
    name: 'New Arrival',
    flexDirection: 'column',
    overlayPadding: '2rem 4rem',
    paddingAround: '0.5rem',
    paddingBetween: '0',
    background: { color: '#f9f9f9' },
    slideBox: [{
        type: 'Product',
        display: 'flex',
        height: 'fit-content',
        width: '100%',
        flexWrap: 'nowrap',
        justifyContent: 'unset',
        backgroundColor: 'inherit',
        paddingAround: '0.5rem',
        paddingBetween: '1rem',
        overflow: 'hidden',
        title: {
            name: 'Center Stroke 100',
            strokeLine: {
                color: '#d3b25d',
            },
            chevron: {
                color: '#d3b25d',
            }
        },
        slide: [{
            isDefault: true,
            borderRadius: '0.5rem',
            border: '0',
            height: 'fit-content',
            width: '25rem',
            backgroundColor: '#fff',
            image: {
                borderRadius: '0.5rem',
                height: '20rem',
                width: '20rem',
                animation: true,
                forceWidth: false,
            },
        }],
        // show more button
        showMore: {
            display: 'none',
        },
        // swiper
        swiper: {
            swipable: true,
            direction: 'X',
            chevrons: {
                display: 'flex',
                color: '#444444',
                height: '9rem',
                width: '4.5rem',
                backgroundColor: '#f9f9f9',
                hoverBackgroundColor: '#f9f9f9',
            },
            autoPlay: {
                duration: 3000,
                run: false,
            },
            scroll: {
                behavior: 'smooth',
                autoToggle: false,
            },
            bullets: {
                display: 'none'
            }
        },
    }],
}, /*{
    viewPort: 'mobile',
    name: 'New Arrival mobile',
    overlayPadding: '0',
    paddingAround: '0',
    background: { color: '#f9f9f9' },
    // box title
    title: {
        display: 'none'
    },
    slideBox: [{
        type: 'Product',
        display: 'flex',
        height: 'fit-content',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'unset',
        backgroundColor: 'inherit',
        paddingAround: '0.5rem',
        paddingBetween: '0.5rem',
        overflow: 'hidden',
        slide: [{
            borderRadius: '0.5rem',
            border: '0',
            height: 'fit-content',
            width: '16rem',
            backgroundColor: '#fff',
            image: {
                borderRadius: '0.5rem',
                height: '12rem',
                width: '12rem',
                animation: false,
                forceWidth: false,
            },
        }],
        swiper: {
            swipable: true,
            direction: 'X',
            chevrons: {
                display: 'none',
            },
            autoPlay: {
                run: false,
            },
            scroll: {
                behavior: 'auto',
                autoToggle: false,
            },
            bullets: {
                display: 'flex'
            }
        }
    }]
}, */{
    viewPort: 'desktop',
    name: 'Popular',
    flexDirection: 'column',
    overlayPadding: '2rem 4rem',
    paddingAround: '0',
    paddingBetween: '0',
    background: { color: '#f9f9f9' },
    slideBox: [{
        type: 'Product',
        display: 'flex',
        height: 'fit-content',
        width: '100%',
        flexWrap: 'nowrap',
        justifyContent: 'unset',
        backgroundColor: 'inherit',
        paddingAround: '1rem',
        paddingBetween: '1rem',
        overflow: 'hidden',
        title: {
            name: 'Light Bottom Stroke 100',
            padding: '1rem 1rem 0 1rem',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            title: {
                border: '1px solid red',
                padding: '1.2rem 2rem 1.2rem 0'
            },
            strokeLine: {
                height: '1px',
                color: '#00000020'
            },
            showAll: {
                position: 'absolute',
                color: '#00000090',
                padding: '1.2rem 1rem',
            },
            chevron: {
                color: '#00000080',
                fontSize: '1.6rem'
            }
        },
        slide: [{
            isDefault: true,
            borderRadius: '0.5rem',
            border: '0',
            height: 'fit-content',
            width: '25rem',
            backgroundColor: '#fff',
            image: {
                borderRadius: '0.5rem',
                height: '20rem',
                width: '20rem',
                animation: true,
                forceWidth: false,
            },
        }],
        // swiper
        swiper: {
            swipable: true,
            direction: 'X',
            chevrons: {
                display: 'flex',
                color: '#444444',
                height: '9rem',
                width: '4.5rem',
                backgroundColor: '#f9f9f9',
                hoverBackgroundColor: '#f9f9f9',
            },
            autoPlay: {
                duration: 3000,
                run: false,
            },
            scroll: {
                behavior: 'smooth',
                autoToggle: false,
            },
            bullets: {
                display: 'none'
            },
        },
    }],
}, /*{
    viewPort: 'mobile',
    name: 'Popular mobile',
    overlayPadding: '0',
    paddingAround: '0',
    background: { color: '#f9f9f9' },
    // box title
    title: {
        title: {
            text: 'Popular Products',
        },
        strokeLine: {
            color: '#d3b25d',
        },
    },
    slideBox: [{
        type: 'Product',
        display: 'flex',
        height: 'fit-content',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'unset',
        backgroundColor: 'inherit',
        paddingAround: '0.5rem',
        paddingBetween: '0.5rem',
        overflow: 'hidden',
        slide: [{
            borderRadius: '0.5rem',
            border: '0',
            height: 'fit-content',
            width: '16rem',
            backgroundColor: '#fff',
            image: {
                borderRadius: '0.5rem',
                height: '12rem',
                width: '12rem',
                animation: false,
                forceWidth: false,
            },
        }],
        swiper: {
            swipable: true,
            direction: 'X',
            chevrons: {
                display: 'none',
            },
            autoPlay: {
                run: false,
            },
            scroll: {
                behavior: 'auto',
                autoToggle: false,
            },
            bullets: {
                display: 'flex'
            }
        }
    }]
}, */{
    viewPort: 'desktop',
    name: 'Moment Suggestions',
    flexDirection: 'row',
    overlayPadding: '2rem 4rem',
    paddingAround: '0',
    paddingBetween: '2%',
    background: { color: '#fff' },
    slideBox: [{
        type: 'Product',
        display: 'flex',
        height: 'fit-content',
        width: '78%',
        flexWrap: 'nowrap',
        justifyContent: 'unset',
        backgroundColor: '#f9f9f9',
        border: '0',
        paddingAround: '1rem',
        paddingBetween: '1rem',
        overflow: 'hidden',
        title: {
            name: 'Light Bottom Stroke 100 (No show more)',
            display: 'flex',
            padding: '1rem 1rem 0 1rem',
            border: '0',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            title: {
                border: '1px solid red',
                padding: '1.2rem 2rem 1.2rem 0'
            },
            strokeLine: {
                height: '1px',
                color: '#00000020'
            },
            showAll: {
                display: 'none',
                position: 'absolute',
                color: '#00000080',
                fontSize: '1.4rem',
                padding: '1.2rem 0',
            },
            chevron: {
                color: '#00000080',
                fontSize: '1.6rem'
            }
        },
        slide: [{
            index: 0,
            borderRadius: '2rem',
            border: '0',
            height: 'fit-content',
            width: '25rem',
            backgroundColor: '#f9f9f9',
            justifyContent: 'space-between',
            productVisible: false,
            image: {
                borderRadius: '0.5rem',
                height: '15rem',
                width: '15rem',
                animation: false,
                forceWidth: false,
            },
            title: {
                name: 'Simple Slide Title',
                margin: '0 0 1rem 0',
                justifyContent: 'center',
                title: {
                    fontSize: '1.6rem',
                    margin: '0',
                },
                strokeLine: {
                    display: 'none'
                },
                showAll: {
                    text: '',
                    margin: '0'
                },
                chevron: {
                    color: '#444444',
                    fontSize: '1.7rem'
                }
            },
        }, {
            isDefault: true,
            borderRadius: '0.5rem',
            border: '0',
            height: 'fit-content',
            width: '25rem',
            backgroundColor: '#fff',
            title: {
                name: 'none',
                display: 'none',
            },
            image: {
                borderRadius: '0.5rem',
                height: '20rem',
                width: '20rem',
                animation: true,
                forceWidth: false,
            },
        }],
        // swiper
        swiper: {
            swipable: true,
            direction: 'X',
            chevrons: {
                display: 'flex',
                color: '#444444',
                height: '9rem',
                width: '4.5rem',
                backgroundColor: '#f9f9f9',
                hoverBackgroundColor: '#f9f9f9',
            },
            autoPlay: {
                duration: 3000,
                run: false,
            },
            scroll: {
                behavior: 'smooth',
                autoToggle: false,
            },
            bullets: {
                display: 'none'
            }
        }
    }, {
        type: 'Product',
        display: 'flex',
        height: 'fit-content',
        width: '20%',
        border: '1px solid #00000020',
        flexWrap: 'nowrap',
        justifyContent: 'unset',
        backgroundColor: '#fff',
        paddingAround: '1rem',
        paddingBetween: '1rem',
        overflow: 'hidden',
        title: {
            name: 'Simple Title',
            display: 'flex',
            padding: '1rem 0',
            border: '0',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '1rem 0 0 0',
            title: {
                fontSize: '1.4rem',
                position: 'relative',
                padding: '0',
                margin: '0',
                color: '#606060'
            },
            strokeLine: {
                width: '0%'
            },
            showAll: {
                display: 'none',
            },
            chevron: {
                display: 'none'
            }
        },
        slide: [{
            isDefault: true,
            borderRadius: '0.5rem',
            border: '0',
            height: 'fit-content',
            width: '100%',
            backgroundColor: '#fff',
            title: {
                display: 'none',
            },
            image: {
                borderRadius: '0.5rem',
                height: '20rem',
                width: '20rem',
                animation: true,
                forceWidth: false,
            },
        }],
        // swiper
        swiper: {
            swipable: true,
            direction: 'X',
            chevrons: {
                display: 'none',
            },
            autoPlay: {
                duration: 7000,
                run: true,
                stopOnHover: true
            },
            scroll: {
                behavior: 'smooth',
                autoToggle: false,
            },
            bullets: {
                display: 'none'
            },
            timerBar: {
                display: 'flex',
                margin: '0 0 1rem 0'
            }
        },
    }],
}, /*{
    viewPort: 'mobile',
    name: 'Moment Suggestions Mobile',
    slideBox: [{
        type: 'Product',
        display: 'flex',
        height: 'fit-content',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'unset',
        backgroundColor: 'inherit',
        paddingAround: '0.5rem',
        paddingBetween: '0.5rem',
        overflow: 'hidden',
        slide: [{
            borderRadius: '0.5rem',
            border: '0',
            height: 'fit-content',
            width: '16rem',
            backgroundColor: '#fff',
            image: {
                borderRadius: '0.5rem',
                height: '12rem',
                width: '12rem',
                animation: false,
                forceWidth: false,
            },
        }],
        swiper: {
            swipable: true,
            direction: 'X',
            chevrons: {
                display: 'none',
            },
            autoPlay: {
                run: false,
            },
            scroll: {
                behavior: 'auto',
                autoToggle: false,
            },
            bullets: {
                display: 'flex'
            }
        }
    }, {
        type: 'Product',
        display: 'flex',
        height: 'fit-content',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'unset',
        backgroundColor: 'inherit',
        paddingAround: '0.5rem',
        paddingBetween: '0.5rem',
        overflow: 'hidden',
        slide: [{
            borderRadius: '0.5rem',
            border: '0',
            height: 'fit-content',
            width: '16rem',
            backgroundColor: '#fff',
            title: {
                display: 'none'
            },
            image: {
                borderRadius: '0.5rem',
                height: '12rem',
                width: '12rem',
                animation: false,
                forceWidth: false,
            },
        }],
        swiper: {
            swipable: true,
            direction: 'X',
            chevrons: {
                display: 'none',
            },
            autoPlay: {
                run: false,
            },
            scroll: {
                behavior: 'auto',
                autoToggle: false,
            },
            bullets: {
                display: 'flex'
            },
            timerBar: {
                display: 'flex'
            }
        }
    }]
}, */{
    viewPort: 'desktop',
    name: 'Sub_Banners',
    flexDirection: 'column',
    overlayPadding: '2rem 4rem',
    paddingAround: '1rem',
    paddingBetween: '0',
    background: { color: '#f9f9f9' },
    slideBox: [{
        type: 'Image',
        display: 'grid',
        height: 'fit-content',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        backgroundColor: 'inherit',
        width: '100%',
        paddingAround: '0',
        paddingBetween: '1rem',
        overflow: 'hidden',
        slide: [{
            isDefault: true,
            borderRadius: '1.5rem',
            border: '00',
            height: '23rem',
            width: '30rem',
            backgroundColor: '#fff',
            title: {
                display: 'none',
            },
            image: {
                borderRadius: '1.5rem',
                height: '100%',
                width: '100%',
                animation: false,
                forceWidth: true,
            },
        }],
        swiper: {
            swipable: false
        }
    }],
}, /*{
    viewPort: 'mobile',
    name: 'Sub_Banners mobile',
    overlayPadding: '0',
    paddingAround: '0.5rem',
    background: { color: '#f9f9f9' },
    // box title
    title: {
        display: 'none'
    },
    slideBox: [{
        type: 'Image',
        display: 'grid',
        height: 'fit-content',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        backgroundColor: 'inherit',
        paddingAround: '0',
        paddingBetween: '0.5rem',
        overflow: 'auto',
        slide: [{
            borderRadius: '0.5rem',
            border: '0',
            height: '11rem',
            width: '11rem',
            backgroundColor: '#fff',
            image: {
                borderRadius: '0.5rem',
                height: '100%',
                width: 'unset',
                animation: false,
                forceWidth: false,
            },
        }],
        slideTitle: {
            display: 'none',
        },
        swiper: {
            swipable: true,
            direction: 'Y',
            autoPlay: {
                duration: 3000,
                run: false
            },
            chevrons: {
                display: 'none'
            },
            scroll: {
                autoToggle: false,
                behavior: 'smooth',
            },
            bullets: {
                display: 'none',
            }
        },
    }]
}*/]

export const defaultMobileStyles = {
    viewPort: 'mobile',
    name: 'Default Mobile Styles',
    display: 'flex',
    flexDirection: 'column',
    overlayPadding: '0',
    background: {
        color: 'inherit',
        isImage: false,
        title: '',
        src: '',
    },
    paddingAround: '0',//'0' },
    paddingBetween: '0',// '0' },
    borderRadius: '0',// '0.2rem' },
    height: 'fit-content',//'fit-content' },
    width: 'fit-content',// 'fit-content' },
    title: {
        display: 'flex',// 'flex' },
        padding: '1rem',// '1rem' },
        design: 'Classic',// 'Classic' },
        border: '0',// '0' },
        borderSide: 'Bottom',
        backgroundColor: 'inherit',//'inherit' },
        alignItems: 'center',//'center' },
        justifyContent: 'space-between',// 'space-between' },
        title: {
            text: 'Container Title',// 'Container Title' },
            color: '#404040',// '#404040' },
            position: 'relative',// 'relative' },
            fontSize: '1.5rem',//'1.9rem' },
            border: '0',// '0' },
            padding: '0',// '0' },
            margin: String,
        },
        strokeLine: {
            display: 'flex',// 'flex' },
            color: 'blue',// 'blue' },
            height: '2px',// '2px' },
            width: '100%',// '100%' },
        },
        showAll: {
            display: 'flex',// 'flex' },
            position: 'relative',// 'relative' },
            direction: 'X',// 'X' },
            fontSize: '1rem',// '1.3rem' },
            color: '#00000080',// '#00000080' },
            border: '0',// '0' },
            text: 'show all',// 'show all' },
            padding: '0',// '0' },
            margin: String,
        },
        chevron: {
            display: 'flex',// 'flex' },
            color: 'blue',// 'blue' },
            fontSize: '1.6rem',// '1.9rem' },
        }
    },
    slideBox: [{
        type: 'Image',// 'Image' },
        display: 'none',// 'none' },
        height: 'auto',// 'auto' },
        width: 'auto',// 'auto' },
        flexWrap: 'nowrap',// 'nowrap' },
        border: '0',// '0' },
        backgroundColor: 'inherit',// 'inherit' },
        overlayPadding: '0',
        paddingAround: '0',// '0' },
        paddingBetween: '0',// '0' },
        overflow: 'hidden',// 'hidden' },
        borderRadius: '0.5rem',// '0.5rem' },
        // Box Title
        title: {
            display: 'none',// 'none' },
            padding: '1rem',// '1rem' },
            design: 'Classic',// 'Classic' },
            border: '0',// '0' },
            borderSide: 'Bottom',
            backgroundColor: 'inherit',// 'inherit' },
            alignItems: 'center',// 'center' },
            justifyContent: 'space-between',// 'space-between' },
            title: {
                text: 'Container Title',// 'Container Title' },
                color: '#404040',// '#404040' },
                position: 'relative',// 'relative' },
                fontSize: '1.9rem',// '1.9rem' },
                border: '0',// '0' },
                padding: '0',// '0' },
                margin: String,
            },
            strokeLine: {
                display: 'flex',// 'flex' },
                color: 'blue',// 'blue' },
                height: '2px',// '2px' },
                width: '100%',// '100%' },
            },
            showAll: {
                display: 'flex',// 'flex' },
                position: 'relative',// 'relative' },
                direction: 'X',// 'X' },
                fontSize: '1.3rem',// '1.3rem' },
                color: '#00000080',// '#00000080' },
                border: '0',// '0' },
                text: 'show all',// 'show all' },
                padding: '0',// '0' },
                margin: '0 0 0 2rem'
            },
            chevron: {
                display: 'flex',// 'flex' },
                color: 'blue',// 'blue' },
                fontSize: '1.6rem',// '1.6rem' },
            }
        },
        // slide
        slide: [{
            borderRadius: '0',// '0' },
            border: '0',// '0' },
            height: 'auto',// 'auto' },
            width: 'auto',// 'auto' },
            backgroundColor: 'inherit',// 'inherit' },
            justifyContent: 'flex-start',// 'flex-start' },
            productVisible: true,
            /*title: {
                display: 'none',// 'none' },
                backgroundColor: 'inherit',// 'inherit' },
                color: '#444444',// '#444444' },
                fontSize: '1.5rem',// '1.5rem' },
                height: 'fit-content',// 'fit-content' },
                margin: '0',// '0' },
                border: '0',// '0' },
                borderRadius: '0.5rem',// '0.5rem' },
                padding: '0',// '0' },
                chevron: {
                    display: 'flex',// 'flex' },
                    color: '#444444',// '#444444' },
                    fontSize: '1.5rem',// '1.5rem' },
                }
            },*/
            // image
            image: {
                borderRadius: '0',// '0' },
                height: 'auto',// 'auto' },
                width: 'auto',// 'auto' },
                forceWidth: false,//false },
                forceHeight: false,
                animation: true,//true },
            },
        }],
        // product
        product: {
            display: 'flex',// 'flex' },
            justifyContent: 'center',// 'flex-start' },
            padding: '1rem',// '1rem' },
            name: {
                fontSize: '1.4rem',// '1.4rem' },
                color: '#444444',// '#444444' },
                hoverColor: 'blue',// 'blue' },
                textAlign: 'center',// 'center' },
            },
            brand: {
                display: 'flex',// 'flex' },
                fontSize: '1.2rem',// '1.2rem' },
                color: '#444444',// '#444444' },
                hoverColor: 'blue',// 'blue' },
            },
            price: {
                fontSize: '2rem',// '2rem' },
                color: '#444444',// '#444444' },
                hoverColor: 'blue',// 'blue' },
                textAlign: 'center',// 'center' },
                beforeDiscount: {
                    fontSize: '1.7rem',// '1.7rem' },
                    color: '#999999',// '#999999' },
                },
                unit: {
                    fontSize: '1.2rem',// '1.2rem' },
                    color: '#999999',// '#999999' },
                }
            },
            rating: {
                display: 'flex',// 'flex' },
                fontSize: '1.4rem',// '1.4rem' },
                color: '#444444',// '#444444' },
            },
            reviews: {
                display: 'flex',// 'flex' },
                fontSize: '1.2rem',// '1.2rem' },
                color: '#444444',// '#444444' },
            },
        },
        // skeleton
        skeleton: {
            fontSize: '1.2rem',// '1.2rem' },
        },
        // badges
        badges: {
            display: 'grid',// 'grid' },
            top: '0.4rem',// '0.4rem' },
            left: '0.4rem',// '0.4rem' },
            borderRadius: '0.5rem',// '0.5rem' },
            backgroundColors: ['red', 'orangered', 'orange'],// ['red', 'orangered', 'orange'] },
            color: '#fff',// '#fff' },
            fontSize: '2rem',// '2rem' },
            badgeWidth: '5rem',// '5rem' },
            badgeHeight: '3.5rem',// '3.5rem' },
            badges: [],// [] },
            paddingBetween: '0.5rem',// '0.5rem' },
        },
        // swiper
        swiper: {
            swipable: true,//true },
            direction: 'X',// 'X' },
            skip: 1,// 1 },
            skipMore: 0,// 0 },
            chevrons: {
                display: 'none',// 'none' },
                color: '#fff',// '#fff' },
                height: '8rem',// '8rem' },
                width: '4rem',// '4rem' },
                backgroundColor: '#00000040',// '#00000040' },
                hoverBackgroundColor: '#00000060',// '#00000060' },
                autoToggle: true,//true },
                boxShadow: true,//true },
            },
            autoPlay: {
                duration: '2000',// '2000' },
                run: false,//false },
                stopOnHover: false,//false },
            },
            scroll: {
                behavior: 'auto',// 'auto' },
                autoToggle: true,//true },
            },
            bullets: {
                display: 'none',// 'flex' },
                bottom: '1rem',// '1rem' },
                paddingBetween: '0.8rem',// '0.8rem' },
                fontSize: '1rem',// '1rem' },
            },
            timerBar: {
                display: 'none',// 'none' },
                margin: '0',// '0' },
            }
        },
    }]
}