export const defaultControls = {
    active: true,
    backgroundColor: '#fff',
    addToCartBtnsStyle: 'Right-Top', // Top-Center, Right-Top, Left, Top, Bottom-Right, None, Bottom-Center
    homePageCollections: ['Featured', 'New Arrival', 'Popular'],
    productSwiperMaxLength: 10,
    homePageViews: [
        { active: true, type: 'Light Box', name: 'Top Ribbon' },
        { active: true, type: 'Navigation Bar', name: 'Secondary Navigation Bar' },
        { active: true, type: 'Image Box', name: 'Image Ribbon' },
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
        name: 'Hero',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        overlayPadding: '2rem 4rem',
        paddingAround: '1rem',
        paddingBetween: '1rem',
        backgroundColor: '#f9f9f9',
        title: {
            display: 'none',
        },
        mobile: {
            display: 'flex',
            flexWrap: 'wrap',
            paddingAround: '0',
            paddingBetween: '0',
            flexDirection: 'column',
            backgroundColor: '#f9f9f9',
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
            overflowY: 'hidden',
            // slide
            slideBorderRadius: '0.5rem',
            slideBorder: '0',
            slideHeight: '40rem',
            slideWidth: '100%',
            slideBackgroundColor: '#fff',
            // image
            imgBorderRadius: '0.5rem',
            imgHeight: '100%',
            imgWidth: '100%',
            imgForceWidth: true,
            imgAnimation: false,
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
                overflowY: 'hidden',
                // slide
                slideBorderRadius: '0',
                slideBorder: '0',
                slideHeight: '100%',
                slideWidth: '100%',
                slideBackgroundColor: '#fff',
                // image
                imgBorderRadius: '0',
                imgHeight: '100%',
                imgWidth: '100%',
                imgForceWidth: true,
                imgAnimation: false,
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
            slides: [{
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
            // slide
            slideBorderRadius: '0.5rem',
            slideBorder: '0',
            slideHeight: '19.5rem',//calc(20rem - 0.5rem)
            slideWidth: '100%',
            slideBackgroundColor: '#fff',
            // image
            imgBorderRadius: '0.5rem',
            imgHeight: '100%',
            imgWidth: '100%',
            imgForceWidth: true,
            imgAnimation: false,
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
                // slide
                slideBorderRadius: '0.5rem',
                slideBorder: '0',
                slideHeight: '100%',
                slideWidth: '17rem',
                slideBackgroundColor: '#fff',
                // image
                imgBorderRadius: '0.5rem',
                imgHeight: '100%',
                imgWidth: '100%',
                imgForceWidth: true,
                imgAnimation: false,
                // show more
                showMore: {
                    display: 'none'
                },
                swiper: {
                    swipable: true,
                    direction: 'X',
                    chevrons: {
                        display: 'none',
                        color: '#444444',
                        height: '8rem',
                        width: '4rem',
                        backgroundColor: '#f9f9f9',
                        hoverBackgroundColor: '#f9f9f9',
                        skip: 1,
                        autoToggle: true
                    },
                    autoPlay: {
                        duration: 3000,
                        run: true,
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
            slides: [{
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
        backgroundColor: '#f9f9f9',
        title: {
            display: 'flex',
            title: 'Product Categories',
            fontSize: '1.5rem',
            design: 'Classic',
            backgroundColor: '#d3b25d',
        },
        mobile: {
            overlayPadding: '0',
            paddingAround: '1rem',
            title: {
                display: 'flex',
                title: 'Product Categories',
                fontSize: '1.2rem',
                design: 'Classic',
                backgroundColor: '#d3b25d',
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
            slideBorderRadius: '0.5rem',
            slideBorder: '0',
            slideHeight: '20rem',
            slideWidth: '30rem',
            slideBackgroundColor: '#fff',
            imgBorderRadius: '0.5rem',
            imgHeight: '100%',
            imgWidth: 'unset',
            slideTitle: {
                display: 'flex',
                backgroundColor: 'inherit',
                color: '#707070',
                fontSize: '1.5rem',
                mobileFontSize: '1.1rem',
                height: '3rem',
                mobileHeight: '2rem',
            },
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
            // show more button
            showMore: {
                display: 'flex',
                design: 'Classic',
                color: '#d3b25d',
                moreText: 'show more',
                lessText: 'show less',
                fontSize: '1.5rem',
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
                slideBorderRadius: '0.5rem',
                slideBorder: '0',
                slideHeight: '11rem',
                slideWidth: '11rem',
                slideBackgroundColor: '#fff',
                imgBorderRadius: '0.5rem',
                imgHeight: '100%',
                imgWidth: 'unset',
                slideTitle: {
                    display: 'none',
                    fontSize: '1.2rem',
                },
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
                // show more button
                showMore: {
                    display: 'flex',
                    design: 'Classic',
                    color: '#d3b25d',
                    moreText: 'show more',
                    lessText: 'show less',
                    fontSize: '1.2rem',
                },
            },
            slides: [{
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
        backgroundColor: '#f9f9f9',
        // box title
        title: {
            display: 'none',
        },
        mobile: {
            overlayPadding: '0',
            paddingAround: '0.5rem',
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
            overflow: 'auto',
            slideBorderRadius: '1.5rem',
            slideBorder: '0',
            slideHeight: '28rem',
            slideWidth: '60rem',
            slideBackgroundColor: '#fff',
            imgBorderRadius: '1.5rem',
            imgHeight: '100%',
            imgWidth: '100%',
            imgAnimation: false,
            imgForceWidth: true,
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
                    color: '#fff',
                    height: '8rem',
                    width: '4rem',
                    backgroundColor: '#00000040',
                    hoverBackgroundColor: '#00000060',
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
                slideBorderRadius: '0.5rem',
                slideBorder: '0',
                slideHeight: '100%',
                slideWidth: '34rem',
                imgBorderRadius: '0.5rem',
                imgHeight: '100%',
                imgWidth: '100%',
                imgAnimation: false,
                imgForceWidth: true,
                swiper: {
                    swipable: true,
                    direction: 'X',
                    chevrons: {
                        display: 'flex',
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
            slides: [{
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
        backgroundColor: '#f9f9f9',
        // box title
        title: {
            display: 'flex',
            title: 'Surprising Products',
            fontSize: '1.5rem',
            design: 'Fish',
            backgroundColor: '#d3b25d',
        },
        mobile: {
            flexDirection: 'column',
            overlayPadding: '0',
            paddingAround: '0',
            paddingBetween: '0',
            backgroundColor: '#f9f9f9',
            // box title
            title: {
                display: 'flex',
                title: 'Surprising Products',
                fontSize: '1.2rem',
                design: 'Fish',
                backgroundColor: '#d3b25d',
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
            overflow: 'auto',
            slideBorderRadius: '0.5rem',
            slideBorder: '0',
            slideHeight: '8rem',
            slideWidth: '10rem',
            slideBackgroundColor: '#fff',
            imgBorderRadius: '0.5rem',
            imgHeight: '6.5rem',
            imgWidth: '9rem',
            imgAnimation: true,
            imgForceWidth: false,
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
                overflow: 'auto',
                slideBorderRadius: '0.5rem',
                slideBorder: '0',
                slideHeight: '7rem',
                slideWidth: '9rem',
                slideBackgroundColor: '#fff',
                imgBorderRadius: '0.5rem',
                imgHeight: '6rem',
                imgWidth: '8rem',
                imgAnimation: false,
                imgForceWidth: false,
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
            slides: [{
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
            },],
        }],
    }, {
        name: 'Featured',
        flexDirection: 'row',
        overlayPadding: '0',
        paddingAround: '2rem 1rem',
        paddingBetween: '0.5rem',
        backgroundColor: '#6bb927',
        borderRadius: '0',
        boxShadow: false,
        // box title
        title: {
            display: 'flex',
            title: 'Featured Products',
            fontSize: '1.7rem',
            design: 'Stunning',
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
            // box title
            title: {
                display: 'flex',
                title: 'Featured Products',
                padding: '0.5rem',
                fontSize: '1.4rem',
                design: 'Stunning',
                border: '1px solid #fff',
                iconColor: '#fff',
                showAll: {
                    fontSize: '1.3rem',
                    color: '#fff',
                    border: '1px solid #fff'
                }
            },
        },
        slideBox: [{
            display: 'flex',
            height: 'fit-content',
            width: '100%',
            flexWrap: 'nowrap',
            justifyContent: 'unset',
            backgroundColor: 'inherit',
            paddingAround: '2rem 1rem',
            paddingBetween: '1rem',
            overflow: 'auto',
            slideBorderRadius: '1rem',
            slideBorder: '0',
            slideHeight: 'fit-content',
            slideWidth: '25rem',
            slideBackgroundColor: '#fff',
            imgBorderRadius: '0.5rem',
            imgHeight: '20rem',
            imgWidth: '20rem',
            imgAnimation: true,
            imgForceWidth: false,
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
                    color: '#fff',
                    height: '9rem',
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
                slideBorderRadius: '0.5rem',
                slideBorder: '0',
                slideHeight: 'fit-content',
                slideWidth: '16rem',
                slideBackgroundColor: '#fff',
                imgBorderRadius: '0.5rem',
                imgHeight: '12rem',
                imgWidth: '12rem',
                imgAnimation: false,
                imgForceWidth: false,
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
                        autoToggle: true,
                    },
                    bullets: {
                        display: 'flex'
                    }
                }
            }
        }],
    }, {
        active: true,
        name: 'New Arrival',
        flexDirection: 'column',
        overlayPadding: '2rem 4rem',
        paddingAround: '0.5rem',
        paddingBetween: '0',
        backgroundColor: '#f9f9f9',
        // box title
        title: {
            display: 'flex',
            title: 'New Arrival Products',
            padding: '2rem',
            fontSize: '1.6rem',
            design: 'Classic-1',
            border: '1px solid #d3b25d',
            iconColor: '#d3b25d',
            showAll: {
                fontSize: '1.3rem',
                color: '#00000080',
                border: '1px solid #00000020',
                button: false
            }
        },
        mobile: {
            overlayPadding: '0',
            paddingAround: '0',
            // box title
            title: {
                display: 'flex',
                title: 'New Arrival Products',
                padding: '0 1rem 0.5rem 0.5rem',
                fontSize: '1.4rem',
                design: 'Classic-1',
                border: '1px solid #d3b25d',
                iconColor: '#d3b25d',
                showAll: {
                    fontSize: '1rem',
                    color: '#00000080',
                    top: '0.5rem',
                    border: '0',
                    button: false
                }
            },
        },
        slideBox: [{
            type: 'Product',
            display: 'flex',
            height: 'fit-content',
            width: '100%',
            flexWrap: 'nowrap',
            justifyContent: 'unset',
            backgroundColor: 'inherit',
            paddingAround: '0.5rem',
            paddingBetween: '0.5rem',
            overflow: 'auto',
            slideBorderRadius: '0.5rem',
            slideBorder: '0',
            slideHeight: 'fit-content',
            slideWidth: '25rem',
            slideBackgroundColor: '#fff',
            imgBorderRadius: '0.5rem',
            imgHeight: '20rem',
            imgWidth: '20rem',
            imgAnimation: true,
            imgForceWidth: false,
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
                    height: '8rem',
                    width: '4rem',
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
                overflow: 'auto',
                slideBorderRadius: '0.5rem',
                slideBorder: '0',
                slideHeight: 'fit-content',
                slideWidth: '16rem',
                slideBackgroundColor: '#fff',
                imgBorderRadius: '0.5rem',
                imgHeight: '12rem',
                imgWidth: '12rem',
                imgAnimation: false,
                imgForceWidth: false,
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
                        autoToggle: true,
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
        backgroundColor: '#f9f9f9',
        // box title
        title: {
            display: 'none',
            title: 'Popular Products',
            fontSize: '1.5rem',
            design: 'Fish',
            backgroundColor: '#d3b25d'
        },
        mobile: {
            overlayPadding: '0',
            paddingAround: '0',
            // box title
            title: {
                display: 'flex',
                title: 'Popular Products',
                padding: '0 1rem 0.5rem 0.5rem',
                fontSize: '1.4rem',
                design: 'Classic-1',
                border: '1px solid #d3b25d',
                iconColor: '#d3b25d',
                showAll: {
                    fontSize: '1rem',
                    color: '#00000080',
                    top: '0.5rem',
                    border: '0',
                    button: false
                }
            },
        },
        slideBox: [{
            type: 'Product',
            display: 'flex',
            height: 'fit-content',
            width: '100%',
            flexWrap: 'nowrap',
            justifyContent: 'unset',
            backgroundColor: 'inherit',
            paddingAround: '0.5rem',
            paddingBetween: '0.5rem',
            overflow: 'auto',
            slideBorderRadius: '0.5rem',
            slideBorder: '0',
            slideHeight: 'fit-content',
            slideWidth: '25rem',
            slideBackgroundColor: '#fff',
            imgBorderRadius: '0.5rem',
            imgHeight: '20rem',
            imgWidth: '20rem',
            imgAnimation: true,
            imgForceWidth: false,
            // badges
            badges: {
                display: 'flex'
            },
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
                    height: '8rem',
                    width: '4rem',
                    backgroundColor: '#f9f9f9',
                    hoverBackgroundColor: '#f9f9f9',
                },
                autoPlay: {
                    duration: 3000,
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
                slideBorderRadius: '0.5rem',
                slideBorder: '0',
                slideHeight: 'fit-content',
                slideWidth: '16rem',
                slideBackgroundColor: '#fff',
                imgBorderRadius: '0.5rem',
                imgHeight: '12rem',
                imgWidth: '12rem',
                imgAnimation: false,
                imgForceWidth: false,
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
                        autoToggle: true,
                    },
                    bullets: {
                        display: 'flex'
                    }
                }
            }
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