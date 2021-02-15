export const magicBoxStyles = [{
    viewPort: 'desktop',
    type: 'MagicBox',
    name: 'Hero',
    display: 'flex',
    flexDirection: 'row',
    overlayPadding: '2rem 4rem',
    paddingAround: '1rem',
    paddingBetween: '1rem',
    slider: [{
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
                height: '9rem',
                width: '4.5rem',
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
    slider: [{
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
    type: 'MagicBox',
    name: 'Categories',
    flexDirection: 'column',
    overlayPadding: '2rem 4rem',
    paddingAround: '0.5rem',
    paddingBetween: '0',
    title: { display: 'none' },
    slider: [{
        type: 'Image',
        display: 'grid',
        height: 'slideHeight',
        flexWrap: 'wrap',
        backgroundColor: 'inherit',
        width: '100%',
        paddingAround: '0.5rem',
        paddingBetween: '1rem',
        overflow: 'hidden',
        title: {
            display: 'flex',
            name: 'Center Stroke 100',
            strokeLine: {
                color: '#d3b25d',
            },
            showAll: {
                direction: 'Y',
                chevron: {
                    color: '#d3b25d',
                    transform: 'rotate(90deg)'
                }
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
                display: 'flex',
                name: 'Simple Slide Title',
                margin: '0 0 1rem 0',
                justifyContent: 'center',
                title: {
                    margin: '0',
                    text: {
                        fontSize: '1.5rem'
                    }
                },
                strokeLine: {
                    display: 'none'
                },
                showAll: {
                    margin: '0',
                    text: {
                        text: 'none'
                    },
                    chevron: {
                        color: '#d3b25d',
                        fontSize: '1.7rem'
                    }
                },
            },
            image: {
                borderRadius: '0.5rem',
                height: '20rem',
                width: 'initial',
                animation: true,
                forceWidth: false,
            },
        }],
        swiper: {
            swipable: true,
            direction: 'Y',
            autoPlay: {
                duration: 3000,
                run: true,
                stopOnHover: true
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
    slider: [{
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
                width: 'initial',
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
    type: 'MagicBox',
    name: 'Banners',
    flexDirection: 'column',
    overlayPadding: '2rem 4rem',
    paddingAround: '1rem',
    paddingBetween: '0',
    slider: [{
        type: 'Image',
        display: 'flex',
        height: 'fit-content',
        width: '100%',
        flexWrap: 'nowrap',
        justifyContent: 'initial',
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
            skipMore: 30,
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
    slider: [{
        type: 'Image',
        display: 'flex',
        height: '17rem',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'initial',
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
    type: 'MagicBox',
    name: 'Image Ribbon',
    flexDirection: 'column',
    overlayPadding: '2rem 4rem',
    paddingAround: '1rem',
    paddingBetween: '0',
    title: {
        name: 'Top-Fish-100',
        display: 'flex',
        padding: '0',
        design: 'Classic',
        position: 'absolute',
        alignItems: 'flex-start',
        title: {
            position: 'absolute',
            margin: '0 0 0 10rem',
            backgroundColor: '#00000000',
            text: {
                fontSize: '1.6rem',
                color: '#fff',
                backgroundColor: '#d3b25d',
                padding: '0.2rem 1.5rem',
                borderRadius: '0 0 1.7rem 1.7rem',
                fontWeight: '500'
            },
            textBorder: {
                display: 'flex',
                position: 'unset',
                width: '4rem',
                height: '2.8rem',
                borderRadius: '0 1.8rem 0 0',
                boxShadow: '1.5rem -1.4rem 0 0 #d3b25d',
                backgroundColor: '#00000000',
            },
            secondBorder: {
                display: 'flex',
                position: 'unset',
                width: '4rem',
                height: '2.8rem',
                borderRadius: '1.8rem 0 0 0',
                boxShadow: '-1.5rem -1.4rem 0 0 #d3b25d',
                backgroundColor: '#00000000',
            }
        },
        strokeLine: {
            top: '0',
        },
        showAll: {
            display: 'none',
        }
    },
    slider: [{
        type: 'Image',
        display: 'flex',
        minHeight: '5rem',
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
    slider: [{
        type: 'Image',
        display: 'flex',
        height: 'fit-content',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'initial',
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
    type: 'MagicBox',
    name: 'Featured',
    flexDirection: 'row',
    overlayPadding: '2rem 4rem',
    paddingAround: '0.5rem',
    paddingBetween: '0',
    height: 'fit-content',
    backgroundColor: '#6bb927',
    borderRadius: '0.5rem',
    boxShadow: false,
    slider: [{
        type: 'Product',
        display: 'flex',
        height: 'fit-content',
        width: '100%',
        flexWrap: 'nowrap',
        justifyContent: 'initial',
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
                backgroundColor: '#6bb927',
                hoverBackgroundColor: '#6bb927',
                boxShadow: '0',
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
    slider: [{
        type: 'Product',
        display: 'flex',
        height: 'fit-content',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'initial',
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
    type: 'MagicBox',
    name: 'New Arrival',
    flexDirection: 'column',
    overlayPadding: '2rem 4rem',
    paddingAround: '0.5rem',
    paddingBetween: '0',
    slider: [{
        type: 'Product',
        display: 'flex',
        height: 'fit-content',
        width: '100%',
        flexWrap: 'nowrap',
        justifyContent: 'initial',
        backgroundColor: 'inherit',
        paddingAround: '0.5rem',
        paddingBetween: '1rem',
        overflow: 'hidden',
        title: {
            name: 'Center Stroke 100',
            display: 'flex',
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
        product: {},
        // swiper
        swiper: {
            swipable: true,
            direction: 'X',
            chevrons: {
                display: 'flex',
                color: '#444444',
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
    slider: [{
        type: 'Product',
        display: 'flex',
        height: 'fit-content',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'initial',
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
    type: 'MagicBox',
    name: 'Popular',
    flexDirection: 'column',
    overlayPadding: '2rem 4rem',
    paddingAround: '0',
    paddingBetween: '0',
    slider: [{
        type: 'Product',
        display: 'flex',
        height: 'fit-content',
        width: '100%',
        flexWrap: 'nowrap',
        justifyContent: 'initial',
        backgroundColor: 'inherit',
        paddingAround: '1rem',
        paddingBetween: '1rem',
        overflow: 'hidden',
        title: {
            name: 'Light Bottom Stroke 100',
            display: 'flex',
            padding: '1rem 2rem',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            title: {
                border: '0',
                padding: '1.2rem 2rem 1.2rem 0',
                textBorder: {
                    display: 'flex',
                    backgroundColor: 'red'
                }
            },
            strokeLine: {
                height: '1px',
                backgroundColor: '#cccccc'
            },
            showAll: {
                position: 'absolute',
                color: '#00000090',
                padding: '1.2rem 1rem',
                chevron: {
                    color: '#00000080',
                    fontSize: '1.6rem'
                }
            },
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
        product: {
            position: 'initial',
            addToCart: {
                position: 'initial',
                flexDirection: 'column-reverse',
                padding: '.5rem',
                add: {
                    btn: 'none',
                    position: 'absolute',
                    left: '0',
                    bottom: '0',
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#00000000',
                    hoverBackgroundColor: '#00000000'
                },
                plus: {
                    btn: 'none',
                    position: 'absolute',
                    left: '0',
                    bottom: '0',
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#00000000',
                    hoverBackgroundColor: '#00000000'
                },
                num: {
                    btn: 'times',
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    margin: '0'
                },
                minus: {
                    position: 'absolute',
                    top: '5rem',
                    right: '0.5rem'
                }
            },

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
    slider: [{
        type: 'Product',
        display: 'flex',
        height: 'fit-content',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'initial',
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
    type: 'MagicBox',
    name: 'Moment Suggestions',
    flexDirection: 'row',
    overlayPadding: '2rem 4rem',
    paddingAround: '0',
    paddingBetween: '2%',
    backgroundColor: 'inherit',
    slider: [{
        type: 'Product',
        display: 'flex',
        height: 'fit-content',
        width: '77%',
        flexWrap: 'nowrap',
        justifyContent: 'initial',
        backgroundColor: '#f9f9f9',
        border: '0',
        paddingAround: '1rem',
        paddingBetween: '1rem',
        overflow: 'hidden',
        title: {
            name: 'Light Bottom Stroke 100 (No show more)',
            display: 'flex',
            padding: '1rem',
            borderBottom: '0',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            title: {
                border: '0',
                padding: '1.2rem 2rem 1.2rem 0',
                textBorder: {
                    display: 'flex',
                    backgroundColor: 'red',
                }
            },
            strokeLine: {
                height: '1px',
                backgroundColor: '#cccccc'
            },
            showAll: {
                display: 'none'
            },
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
                display: 'flex',
                name: 'Simple Slide Title',
                margin: '0 0 1rem 0',
                justifyContent: 'center',
                border: '1px solid #aaaaaa',
                borderBottom: '1px solid #aaaaaa',
                borderRadius: '1rem',
                width: 'fit-content',
                padding: '0.8rem 2.5rem',
                margin: '0 0 3rem 0',
                title: {
                    text: { fontSize: '1.4rem' },
                    margin: '0',
                },
                strokeLine: {
                    display: 'none'
                },
                showAll: {
                    margin: '0',
                    text: {
                        text: 'none',
                    },
                    chevron: {
                        color: '#d3b25d',
                        fontSize: '1.7rem'
                    }
                },
            },
        }, {
            isDefault: true,
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
        product: {
            priceAndAddToCartWrapper: {
                padding: '1rem',
                flexDirection: 'row',
                justifyContent: 'space-between'
            },
            price: {
                flexDirection: 'column',
                textAlign: 'left',
            },
            reviews: {
                display: 'none'
            },
            rating: {
                display: 'none'
            },
            addToCart: {
                name: 'AddToCart DigiStyle',
                add: {
                    btn: 'plus',
                    fontSize: '1.4rem',
                    height: '4.3rem',
                    width: '5.5rem',
                    borderRadius: '.8rem'
                },
                plus: {
                    height: '3.5rem',
                    width: '4rem',
                },
                minus: {
                    height: '3.5rem',
                    width: '4rem',
                },
                num: {
                    height: '3.5rem',
                    width: '4rem',
                }
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
        }
    }, {
        type: 'Product',
        display: 'flex',
        height: 'fit-content',
        width: '21%',
        border: '1px solid #00000020',
        flexWrap: 'nowrap',
        justifyContent: 'initial',
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
            margin: '1rem',
            title: {
                text: {
                    fontSize: '1.4rem',
                    color: '#606060',
                },
                padding: '0',
                margin: '0',
            },
            strokeLine: {
                display: 'none'
            },
            showAll: {
                display: 'none',
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
                height: '22rem',
                width: '22rem',
                animation: true,
                forceWidth: false,
            },
        }],
        product: {
            priceAndAddToCartWrapper: {
                padding: '0',
                flexDirection: 'row',
                justifyContent: 'space-between'
            },
            price: {
                flexDirection: 'column',
                textAlign: 'left',
            },
            reviews: {
                display: 'none'
            },
            rating: {
                display: 'none'
            },
            addToCart: {
                name: 'AddToCart DigiStyle',
                add: {
                    btn: 'plus',
                    fontSize: '1.4rem',
                    height: '4.3rem',
                    width: '5.5rem',
                    borderRadius: '.8rem'
                },
                plus: {
                    height: '3.5rem',
                    width: '4rem',
                },
                minus: {
                    height: '3.5rem',
                    width: '4rem',
                },
                num: {
                    height: '3.5rem',
                    width: '4rem',
                }
            }
        },
        // timer bar
        timerBar: {
            display: 'flex',
            position: 'unset',
            margin: '0 0 1rem 0',
            height: '1px',
            transition: 'all 7s',
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
            }
        },
    }],
}, /*{
    viewPort: 'mobile',
    name: 'Moment Suggestions Mobile',
    slider: [{
        type: 'Product',
        display: 'flex',
        height: 'fit-content',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'initial',
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
        justifyContent: 'initial',
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
    type: 'MagicBox',
    name: 'Sub_Banners',
    flexDirection: 'column',
    overlayPadding: '2rem 4rem',
    paddingAround: '1rem',
    paddingBetween: '0',
    background: { color: '#f9f9f9' },
    slider: [{
        type: 'Image',
        display: 'grid',
        height: 'fit-content',
        flexWrap: 'wrap',
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
            productVisible: false,
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
    slider: [{
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
                width: 'initial',
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
}*/ {
    name: 'Action Note Desktop',
    type: 'MagicBox',
    viewPort: 'desktop',
    position: 'fixed',
    paddingAround: '0',
    borderRadius: '0 0 2rem 2rem',
    width: 'fit-content',
    maxWidth: '40rem',
    minWidth: '40rem',
    transform: 'translateY(-100%)',
    after: {
        transform: 'translateY(0)',
        boxShadow: '0 0 4px rgba(33, 33, 33, 0.431)',
    },
    boxShadow: 'unset',
    backgroundColor: '#f0c040ec',
    zIndex: '999',
    canHide: true,
    timerBar: {
        display: 'flex',
    },
    closeBtn: {
        display: 'flex'
    },
    title: {
        display: 'flex',
        design: 'Classic',
        backgroundColor: 'unset',
        padding: '0.8rem 2.5rem',
        justifyContent: 'center',
        margin: '0',
        title: {
            color: '#222222',
            fontSize: '1.5rem',
            margin: '0',
            textBorder: {
                display: 'none'
            }
        },
        strokeLine: {
            display: 'none',
        },
        showAll: {
            display: 'none'
        }
    }
},
//
//
//
//
//
//
//
//
//
{
    name: '2controlBox',
    type: 'MagicBox',
    viewPort: 'desktop',
    overlayPadding: '2rem 4rem',
    paddingAround: '0',
    paddingBetween: '0',
    backgroundColor: '#f9f9f9',
    border: '1px solid #eeeeee',
    title: {
        display: 'none',
    },
    slider: [{
        //borderBottom: '1px solid #eeeeee',
        borderRadius: '0.2rem 0.2rem 0 0',
        type: 'Product',
        display: 'flex',
        width: '100%',
        overlayPadding: '0',
        paddingAround: '0 3rem 0 0',
        paddingBetween: '1rem',
        flexDirection: 'row',
        backgroundColor: '#f9f9f9',
        justifyContent: 'flex-start',
        alignItems: 'center',
        title: {
            display: 'flex',
            width: 'auto',
            margin: '0 2rem',
            padding: '0',
            title: {
                padding: '0',
                margin: '0',
                icon: {
                    display: 'flex',
                    fontSize: '1.8rem',
                    margin: '0 1rem 0 0',
                    color: '#aaaaaa',
                    hover: {
                        color: '#444444'
                    }
                },
                text: {
                    fontSize: '1.5rem'
                }
            },
            strokeLine: {
                display: 'none'
            },
            showAll: {
                display: 'none'
            }
        },
        slide: [{
            isDefault: true,
            width: 'auto',
            justifyContent: 'center',
            productVisible: false,
            title: {
                display: 'flex',
                width: 'fit-content',
                justifyContent: 'center',
                position: 'unset',
                margin: '0.5rem 0',
                padding: '0',
                title: {
                    backgroundColor: 'inherit',
                    click: {
                        backgroundColor: '#00bfd6',
                    },
                    hover: {
                        backgroundColor: '#cccccc',
                    },
                    padding: '0.2rem 2rem',
                    borderRadius: '1rem',
                    margin: '0',
                    text: {
                        fontSize: '1.4rem',
                        color: '#444444',
                        fontWeight: '400',
                        click: {
                            fontWeight: '500',
                            color: '#fff',
                        }
                    },
                },
                strokeLine: {
                    display: 'none',
                },
                showAll: {
                    display: 'none',
                }
            },
            // image
            image: {
                display: 'none'
            },
        }],
        badges: {
            display: 'none',
        }
    }, {
        type: 'Product',
        display: 'flex',
        height: 'auto',
        width: '100%',
        flexWrap: 'nowrap',
        justifyContent: 'initial',
        backgroundColor: '#f9f9f9',
        paddingAround: '0',
        paddingBetween: '0',
        overflow: 'hidden',
        fixBorder: true,
        slide: [{
            isDefault: true,
            borderRadius: '0',
            border: '1px solid #eeeeee',
            height: 'fit-content',
            width: '25rem',
            backgroundColor: '#fff',
            transition: 'all .5s',
            padding: '0.5rem 0 0 0',
            title: {
                display: 'none',
            },
            image: {
                borderRadius: '0.5rem',
                height: '20rem',
                width: '20rem',
                padding: '1rem',
                animation: true,
                forceWidth: false,
            },
        }],
        product: {
            padding: '0 1rem',
            priceAndAddToCartWrapper: {
                padding: '0 1rem',
                flexDirection: 'row',
                justifyContent: 'space-between'
            },
            price: {
                flexDirection: 'column',
                textAlign: 'left',
            },
            reviews: {
                display: 'none'
            },
            rating: {
                display: 'none'
            },
            addToCart: {
                name: 'AddToCart DigiStyle',
                add: {
                    btn: 'plus',
                    fontSize: '1.4rem',
                    height: '4.3rem',
                    width: '5.5rem',
                    borderRadius: '.8rem',
                },
                plus: {
                    height: '3.5rem',
                    width: '4rem',
                },
                minus: {
                    height: '3.5rem',
                    width: '4rem',
                },
                num: {
                    height: '3.5rem',
                    width: '4rem',
                }
            }
        },
        swiper: {
            swipable: true,
            direction: 'X',
            chevrons: {
                display: 'flex',
                backgroundColor: '#f9f9f9',
                hoverBackgroundColor: '#f9f9f9',
                color: '#444444',
                border: '1px solid #eeeeee'
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
    }]
},
//
//
//
//
//
//
//
//
//
//
//
{
    type: 'MagicBox',
    name: 'digikala style',
    display: 'flex',
    viewPort: 'desktop',
    overlayPadding: '2rem 4rem',
    backgroundColor: '#fff',
    paddingAround: '4rem',
    border: '1px solid #f9f9f9',
    paddingBetween: '0',
    flexDirection: 'row',
    title: {
        display: 'flex',
        padding: '0',
        position: 'absolute',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        title: {
            position: 'absolute',
            margin: '0 0 0 2rem',
            backgroundColor: 'unset',
            text: {
                fontSize: '1.9rem',
                color: '#fff',
                backgroundColor: '#6bb927',
                padding: '0.8rem 3.5rem',
                borderRadius: '0 0 5rem 5rem',
                fontWeight: '400'
            },
            textBorder: {
                display: 'flex',
                transform: 'translateX(1.2rem) translateY(-1px)',
                position: 'unset',
                width: '4rem',
                height: '4rem',
                borderRadius: '0 5rem 0 0',
                boxShadow: '0 -1.8rem 0 0 #6bb927',
                backgroundColor: '#00000000',
            },
            secondBorder: {
                display: 'flex',
                transform: 'translateX(-1.2rem) translateY(-1px)',
                position: 'unset',
                width: '4rem',
                height: '4rem',
                borderRadius: '5rem 0 0 0',
                boxShadow: '0 -1.8rem 0 0 #6bb927',
                backgroundColor: '#00000000',
            }
        },
        strokeLine: {
            display: 'flex',
            backgroundColor: '#6bb927',
            top: '0',
        },
        showAll: {
            display: 'flex',
            position: 'absolute',
            right: '3rem',
            top: '1.5rem',
            text: {
                fontSize: '1.5rem',
                color: '#999999'
            },
            chevron: {
                display: 'flex',
                color: '#999999',
                fontSize: '1.6rem'
            }
        }
    },
    slider: [{
        display: 'flex',
        width: '60%',
        height: '30rem',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#fff',
        paddingAround: '2rem',
        borderRadius: '0 0.2rem 0.2rem 0',
        slide: [{
            isDefault: true,
            flexDirection: 'row',
            borderRadius: '0.5rem',
            width: '100%',
            height: '100%',
            productVisible: true,
            image: {
                borderRadius: '0.2rem',
                height: '30rem',
                width: '30rem',
                padding: '0.5rem',
                animation: true,
            },
        }],
        product: {
            padding: '0 1rem',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            name: {
                textAlign: 'left',
                fontSize: '1.6rem',
                fontWeight: '400',
                color: '#222222',
                margin: '1rem 1rem 1rem 0'
            },
            brand: {
                fontSize: '1.4rem',
                color: '#444444',
                alignSelf: 'flex-start'
            },
            priceAndAddToCartWrapper: {
                padding: '2rem 1rem',
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 'fit-content'
            },
            price: {
                flexDirection: 'column',
                textAlign: 'left',
                fontSize: '2.5rem',
                padding: '0',
                beforeDiscount: {
                    fontSize: '1.8rem',
                },
                unit: {
                    fontSize: '1.5rem',
                }
            },
            reviews: {
                display: 'none'
            },
            rating: {
                display: 'none'
            },
            addToCart: {
                name: 'AddToCart DigiStyle',
                padding: '0',
                add: {
                    btn: 'plus',
                    fontSize: '1.8rem',
                    height: '5.2rem',
                    width: '7rem',
                    borderRadius: '.8rem',
                },
                plus: {
                    height: '4.5rem',
                    width: '5.2rem',
                },
                minus: {
                    height: '4.5rem',
                    width: '5.2rem',
                },
                num: {
                    height: '4.5rem',
                    width: '5.2rem',
                }
            }
        },
        badges: {
            badgeWidth: '6rem',// '5rem' },
            badgeHeight: '4rem',// '3.5rem' },
            fontSize: '2.2rem',// '2rem' },
        }
    }, {
        display: 'flex',
        width: '40%',
        height: '30rem',
        borderLeft: '1px solid #eeeeee',
        backgroundColor: '#fff',
        paddingBetween: '0',
        flexWrap: 'wrap',
        flexDirection: 'column',
        transition: 'all 0.5s',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderRadius: '0.2rem 0 0 0.2rem',
        paddingAround: '2rem',
        paddingBetween: '0',
        slide: [{
            isDefault: true,
            borderRadius: '0.5rem',
            width: '100%',
            forceWidth: true,
            height: '6rem',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            title: { display: 'none' },
            transition: 'all 0.5s',
            border: '1px solid #00000000',
            padding: '1rem',
            image: {
                borderRadius: '0.2rem',
                height: '4.5rem',
                width: '4.5rem',
                padding: '0.5rem',
            },
        }],
        product: {
            display: 'flex',
            addToCart: { display: 'none' },
            alignItems: 'flex-start',
            name: {
                textAlign: 'left',
                fontWeight: '400'
            },
            brand: {
                display: 'none',
            },
            priceAndAddToCartWrapper: {
                display: 'none',
            }
        },
        badges: {
            display: 'none'
        },
        swiper: {
            swipable: false,
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            direction: 'Y',
            scroll: { autoToggle: false }
        },
        marker: {
            display: 'flex',
            autoPlay: true,
            border: '1px solid #6bb927',
            borderRadius: '0.5rem',
            duration: 5000,
            stopOnHover: true,
            transition: 'all 0.5s',
            type: 'box'
        },
    }]
},
//
//
//
//
//
//
//
//
//
{
    name: 'Secondary Navigation Bar',
    type: 'MagicBox',
    viewPort: 'desktop',
    overlayPadding: '0 0 2rem 0',
    paddingAround: '0',
    paddingBetween: '0',
    backgroundColor: '#fff',
    borderRadius: '0',
    border: 'unset',
    boxShadow: '0 0 4px rgba(33, 33, 33, 0.431)',
    title: {
        display: 'none',
    },
    slider: [{
        //borderBottom: '1px solid #eeeeee',
        display: 'flex',
        borderRadius: '0',
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'center',
        title: {
            display: 'none',
        },
        slide: [{
            isDefault: true,
            justifyContent: 'center',
            productVisible: false,
            title: {
                display: 'flex',
                width: 'fit-content',
                justifyContent: 'center',
                position: 'unset',
                margin: '0',
                padding: '0',
                title: {
                    backgroundColor: 'inherit',
                    transition: 'all 0.25s',
                    hover: {
                        backgroundColor: '#eeeeee',
                    },
                    padding: '1rem 2rem',
                    borderRadius: '0',
                    margin: '0',
                    icon: {
                        display: 'flex',
                        fontSize: '1.8rem',
                        margin: '0 0.7rem 0 0',
                        color: 'red',
                    },
                    text: {
                        fontSize: '1.4rem',
                        color: '#444444',
                        fontWeight: '400',
                        /*click: {
                            fontWeight: '500',
                            color: '#fff',
                        }*/
                    },
                },
                strokeLine: {
                    display: 'none',
                },
                showAll: {
                    display: 'none',
                }
            },
            // image
            image: {
                display: 'none'
            },
        }, {
            isDefault: false,
            index: 0,
            justifyContent: 'center',
            productVisible: false,
            margin: '0 1rem 0 0',
            title: {
                display: 'flex',
                width: 'fit-content',
                justifyContent: 'center',
                position: 'unset',
                margin: '0',
                padding: '0',
                title: {
                    backgroundColor: 'inherit',
                    transition: 'all 0.25s',
                    hover: {
                        backgroundColor: '#eeeeee',
                    },
                    padding: '1rem 2rem',
                    borderRadius: '0',
                    margin: '0',
                    icon: {
                        display: 'flex',
                        fontSize: '1.8rem',
                        margin: '0 1rem 0 0',
                        color: '#444444',
                    },
                    text: {
                        fontSize: '1.5rem',
                        color: '#444444',
                        fontWeight: '400',
                    },
                    textBorder: {
                        display: 'flex',
                        width: '2px',
                        height: '70%',
                        bottom: 'unset',
                        left: 'unset',
                        top: '15%',
                        right: '0',
                        borderRadius: '0',
                        backgroundColor: '#eeeeee',
                        transition: 'unset'
                    }
                },
                strokeLine: {
                    display: 'none',
                },
                showAll: {
                    display: 'none',
                }
            },
            // image
            image: {
                display: 'none'
            },
        }],
        marker: {
            display: 'flex',
            height: '2px',
            width: '0%',
            transition: 'all 0.5s',
            top: 'unset',
            left: '50%',
            bottom: '0',
            right: 'unset',
            backgroundColor: 'red',
            type: 'line',
            zIndex: '1000',
            hover: {
                width: 'slideWidth',
                left: '',
            },
        },
        badges: {
            display: 'none',
        }
    }]
}]