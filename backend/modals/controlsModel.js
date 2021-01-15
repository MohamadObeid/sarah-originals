import mongoose from "mongoose";

const controlsSchema = new mongoose.Schema({
    active: { type: Boolean, required: false },
    backgroundColor: { type: String, required: false, default: '#f9f9f9' },
    addToCartBtnsStyle: { type: String, required: false },
    homePageViews: {
        type: [{
            active: { type: Boolean, required: false },
            type: { type: String, required: false },
            name: { type: String, required: false },
            limit: { type: Number, required: false, default: 10 },
            sort: { type: String, required: false, default: 'Newest' },
            collections: { type: Array, required: false, default: [] },
        }], required: false
    },
    // Top Ribbon
    topRibbonVisible: { type: Boolean, required: false },
    topRibbon: {
        icon: { type: String, required: false },
        backgroundColor: { type: String, required: false },
        text: { type: String, required: false },
        fontSize: { type: String, required: false },
        mobile: {
            fontSize: { type: String, required: false },
        },
        height: { type: String, required: false },
    },
    // Navigation Bar
    navigationBar: {
        active: { type: Boolean, required: false },
        mainHeader: {
            title: { type: String, required: false },
        },
        headers: {
            content: {
                type: [{
                    title: { type: String, required: false },
                    icon: { type: String, required: false },
                }], required: false
            },
            borderColor: { type: String, required: false },
            fontSize: { type: String, required: false },
            padding: { type: String, required: false },
        },
        searchBar: {
            mostSearchedWords: { type: Array, required: false },
        }
    },
    // Hero Banner 
    imageBox: {
        type: [{
            name: { type: String, required: false, default: '' },
            display: { type: String, required: false, default: 'flex' },
            flexDirection: { type: String, required: false, default: 'column' },
            overlayPadding: { type: String, required: false, default: '0' },
            background: {
                color: { type: String, required: false, default: 'inherit' },
                image: { type: Boolean, required: false, default: false },
                title: { type: String, required: false, default: '' },
                src: { type: String, required: false, default: '' },
            },
            paddingAround: { type: String, required: false, default: '0' },
            paddingBetween: { type: String, required: false, default: '0' },
            borderRadius: { type: String, required: false, default: '0.2rem' },
            height: { type: String, required: false, default: 'fit-content' },
            width: { type: String, required: false, default: 'fit-content' },
            title: {
                display: { type: String, required: false, default: 'flex' },
                paddingAround: { type: String, required: false, default: '1rem' },
                design: { type: String, required: false, default: 'Classic' },
                border: { type: String, required: false, default: '0' },
                backgroundColor: { type: String, required: false, default: 'inherit' },
                alignItems: { type: String, required: false, default: 'center' },
                justifyContent: { type: String, required: false, default: 'space-between' },
                title: {
                    text: { type: String, required: false, default: 'Container Title' },
                    color: { type: String, required: false, default: '#404040' },
                    position: { type: String, required: false, default: 'relative' },
                    fontSize: { type: String, required: false, default: '1.9rem' },
                    border: { type: String, required: false, default: '0' },
                    padding: { type: String, required: false, default: '0' },
                },
                strokeLine: {
                    display: { type: String, required: false, default: 'flex' },
                    color: { type: String, required: false, default: 'blue' },
                    height: { type: String, required: false, default: '2px' },
                    width: { type: String, required: false, default: '100%' },
                },
                showAll: {
                    display: { type: String, required: false, default: 'flex' },
                    position: { type: String, required: false, default: 'relative' },
                    direction: { type: String, required: false, default: 'X' },
                    fontSize: { type: String, required: false, default: '1.3rem' },
                    color: { type: String, required: false, default: '#00000080' },
                    border: { type: String, required: false, default: '0' },
                    text: { type: String, required: false, default: 'show all' },
                    padding: { type: String, required: false, default: '0' },
                },
                chevron: {
                    display: { type: String, required: false, default: 'flex' },
                    color: { type: String, required: false, default: 'blue' },
                    fontSize: { type: String, required: false, default: '1.9rem' },
                }
            },
            mobile: {
                display: { type: String, required: false, default: 'flex' },
                flexDirection: { type: String, required: false, default: 'column' },
                overlayPadding: { type: String, required: false, default: '0' },
                paddingAround: { type: String, required: false, default: '0' },
                paddingBetween: { type: String, required: false, default: '0' },
                background: {
                    color: { type: String, required: false, default: 'inherit' },
                    image: { type: Boolean, required: false, default: false },
                    title: { type: String, required: false, default: '' },
                    src: { type: String, required: false, default: '' },
                },
                borderRadius: { type: String, required: false, default: '0rem' },
                height: { type: String, required: false, default: 'fit-content' },
                width: { type: String, required: false, default: 'fit-content' },
                title: {
                    display: { type: String, required: false, default: 'flex' },
                    paddingAround: { type: String, required: false, default: '0.5rem' },
                    design: { type: String, required: false, default: 'Classic' },
                    border: { type: String, required: false, default: '0' },
                    backgroundColor: { type: String, required: false, default: 'inherit' },
                    alignItems: { type: String, required: false, default: 'center' },
                    justifyContent: { type: String, required: false, default: 'space-between' },
                    title: {
                        text: { type: String, required: false, default: 'Container Title' },
                        color: { type: String, required: false, default: '#404040' },
                        position: { type: String, required: false, default: 'relative' },
                        fontSize: { type: String, required: false, default: '1.5rem' },
                        border: { type: String, required: false, default: '0' },
                        padding: { type: String, required: false, default: '0' },
                    },
                    strokeLine: {
                        display: { type: String, required: false, default: 'flex' },
                        color: { type: String, required: false, default: 'blue' },
                        height: { type: String, required: false, default: '2px' },
                        width: { type: String, required: false, default: '100%' },
                    },
                    showAll: {
                        display: { type: String, required: false, default: 'flex' },
                        position: { type: String, required: false, default: 'relative' },
                        direction: { type: String, required: false, default: 'X' },
                        fontSize: { type: String, required: false, default: '1rem' },
                        color: { type: String, required: false, default: '#00000080' },
                        border: { type: String, required: false, default: '0' },
                        text: { type: String, required: false, default: 'show all' },
                        padding: { type: String, required: false, default: '0' },
                    },
                    chevron: {
                        display: { type: String, required: false, default: 'flex' },
                        color: { type: String, required: false, default: 'blue' },
                        fontSize: { type: String, required: false, default: '1.9rem' },
                    }
                },
            },
            slideBox: {
                type: [{
                    type: { type: String, required: false, default: 'Image' },
                    collection_: { type: String, required: false, default: '' },
                    display: { type: String, required: false, default: 'none' },
                    height: { type: String, required: false, default: 'auto' },
                    width: { type: String, required: false, default: 'auto' },
                    flexWrap: { type: String, required: false, default: 'nowrap' },
                    border: { type: String, required: false, default: '0' },
                    backgroundColor: { type: String, required: false, default: 'inherit' },
                    paddingAround: { type: String, required: false, default: '0' },
                    paddingBetween: { type: String, required: false, default: '0' },
                    overflow: { type: String, required: false, default: 'hidden' },
                    borderRadius: { type: String, required: false, default: '0.5rem' },
                    // Box Title
                    title: {
                        display: { type: String, required: false, default: 'none' },
                        paddingAround: { type: String, required: false, default: '1rem' },
                        design: { type: String, required: false, default: 'Classic' },
                        border: { type: String, required: false, default: '0' },
                        backgroundColor: { type: String, required: false, default: 'inherit' },
                        alignItems: { type: String, required: false, default: 'center' },
                        justifyContent: { type: String, required: false, default: 'space-between' },
                        title: {
                            text: { type: String, required: false, default: 'Container Title' },
                            color: { type: String, required: false, default: '#404040' },
                            position: { type: String, required: false, default: 'relative' },
                            fontSize: { type: String, required: false, default: '1.9rem' },
                            border: { type: String, required: false, default: '0' },
                            padding: { type: String, required: false, default: '0' },
                            margin: { type: String, required: false, default: '0 2rem 0 0' },
                        },
                        strokeLine: {
                            display: { type: String, required: false, default: 'flex' },
                            color: { type: String, required: false, default: 'blue' },
                            height: { type: String, required: false, default: '2px' },
                            width: { type: String, required: false, default: '100%' },
                        },
                        showAll: {
                            display: { type: String, required: false, default: 'flex' },
                            position: { type: String, required: false, default: 'relative' },
                            direction: { type: String, required: false, default: 'X' },
                            fontSize: { type: String, required: false, default: '1.3rem' },
                            color: { type: String, required: false, default: '#00000080' },
                            border: { type: String, required: false, default: '0' },
                            text: { type: String, required: false, default: 'show all' },
                            padding: { type: String, required: false, default: '0' },
                        },
                        chevron: {
                            display: { type: String, required: false, default: 'flex' },
                            color: { type: String, required: false, default: 'blue' },
                            fontSize: { type: String, required: false, default: '1.6rem' },
                        }
                    },
                    // slide
                    slide: {
                        type: [{
                            borderRadius: { type: String, required: false, default: '0' },
                            border: { type: String, required: false, default: '0' },
                            height: { type: String, required: false, default: 'auto' },
                            width: { type: String, required: false, default: 'auto' },
                            backgroundColor: { type: String, required: false, default: 'inherit' },
                            justifyContent: { type: String, required: false, default: 'flex-start' },
                            title: {
                                display: { type: String, required: false, default: 'none' },
                                backgroundColor: { type: String, required: false, default: 'inherit' },
                                color: { type: String, required: false, default: '#444444' },
                                fontSize: { type: String, required: false, default: '1.5rem' },
                                height: { type: String, required: false, default: 'fit-content' },
                                margin: { type: String, required: false, default: '0' },
                                border: { type: String, required: false, default: '0' },
                                borderRadius: { type: String, required: false, default: '0.5rem' },
                                padding: { type: String, required: false, default: '0' },
                                chevron: {
                                    display: { type: String, required: false, default: 'flex' },
                                    color: { type: String, required: false, default: '#444444' },
                                    fontSize: { type: String, required: false, default: '1.5rem' },
                                }
                            },
                            // image
                            image: {
                                borderRadius: { type: String, required: false, default: '0' },
                                height: { type: String, required: false, default: 'auto' },
                                width: { type: String, required: false, default: 'auto' },
                                forceWidth: { type: Boolean, required: false, default: false },
                                animation: { type: Boolean, required: false, default: true },
                            },
                        }], required: false
                    },
                    // product
                    product: {
                        display: { type: String, required: false, default: 'flex' },
                        justifyContent: { type: String, required: false, default: 'flex-start' },
                        padding: { type: String, required: false, default: '1rem' },
                        name: {
                            fontSize: { type: String, required: false, default: '1.4rem' },
                            color: { type: String, required: false, default: '#444444' },
                            hoverColor: { type: String, required: false, default: 'blue' },
                            textAlign: { type: String, required: false, default: 'center' },
                        },
                        brand: {
                            display: { type: String, required: false, default: 'flex' },
                            fontSize: { type: String, required: false, default: '1.2rem' },
                            color: { type: String, required: false, default: '#444444' },
                            hoverColor: { type: String, required: false, default: 'blue' },
                        },
                        price: {
                            fontSize: { type: String, required: false, default: '2rem' },
                            color: { type: String, required: false, default: '#444444' },
                            hoverColor: { type: String, required: false, default: 'blue' },
                            textAlign: { type: String, required: false, default: 'center' },
                            beforeDiscount: {
                                fontSize: { type: String, required: false, default: '1.7rem' },
                                color: { type: String, required: false, default: '#999999' },
                            },
                            unit: {
                                fontSize: { type: String, required: false, default: '1.2rem' },
                                color: { type: String, required: false, default: '#999999' },
                            }
                        },
                        rating: {
                            display: { type: String, required: false, default: 'flex' },
                            fontSize: { type: String, required: false, default: '1.4rem' },
                            color: { type: String, required: false, default: '#444444' },
                        },
                        reviews: {
                            display: { type: String, required: false, default: 'flex' },
                            fontSize: { type: String, required: false, default: '1.2rem' },
                            color: { type: String, required: false, default: '#444444' },
                        },
                    },
                    // skeleton
                    skeleton: {
                        fontSize: { type: String, required: false, default: '1.2rem' },
                    },
                    // badges
                    badges: {
                        display: { type: String, required: false, default: 'grid' },
                        top: { type: String, required: false, default: '0.4rem' },
                        left: { type: String, required: false, default: '0.4rem' },
                        borderRadius: { type: String, required: false, default: '0.5rem' },
                        backgroundColors: { type: Array, required: false, default: ['red', 'orangered', 'orange'] },
                        color: { type: String, required: false, default: '#fff' },
                        fontSize: { type: String, required: false, default: '2rem' },
                        badgeWidth: { type: String, required: false, default: '5rem' },
                        badgeHeight: { type: String, required: false, default: '3.5rem' },
                        badges: { type: Array, required: false, default: [] },
                        paddingBetween: { type: String, required: false, default: '0.5rem' },
                    },
                    // swiper
                    swiper: {
                        swipable: { type: Boolean, required: false, default: true },
                        direction: { type: String, required: false, default: 'X' },
                        skip: { type: Number, required: false, default: 1 },
                        skipMore: { type: Number, required: false, default: 0 },
                        chevrons: {
                            display: { type: String, required: false, default: 'none' },
                            color: { type: String, required: false, default: '#fff' },
                            height: { type: String, required: false, default: '8rem' },
                            width: { type: String, required: false, default: '4rem' },
                            backgroundColor: { type: String, required: false, default: '#00000040' },
                            hoverBackgroundColor: { type: String, required: false, default: '#00000060' },
                            autoToggle: { type: Boolean, required: false, default: true },
                            boxShadow: { type: Boolean, required: false, default: true },
                        },
                        autoPlay: {
                            duration: { type: String, required: false, default: '2000' },
                            run: { type: Boolean, required: false, default: false },
                            stopOnHover: { type: Boolean, required: false, default: false },
                        },
                        scroll: {
                            behavior: { type: String, required: false, default: 'auto' },
                            autoToggle: { type: Boolean, required: false, default: true },
                        },
                        bullets: {
                            display: { type: String, required: false, default: 'flex' },
                            bottom: { type: String, required: false, default: '1rem' },
                            paddingBetween: { type: String, required: false, default: '0.8rem' },
                            fontSize: { type: String, required: false, default: '1rem' },
                        },
                        timerBar: {
                            display: { type: String, required: false, default: 'none' },
                            margin: { type: String, required: false, default: '0' },
                        }
                    },
                    mobile: {
                        display: { type: String, required: false, default: 'none' },
                        height: { type: String, required: false, default: 'auto' },
                        justifyContent: { type: String, required: false, default: 'unset' },
                        backgroundColor: { type: String, required: false, default: 'inherit' },
                        width: { type: String, required: false, default: 'auto' },
                        border: { type: String, required: false, default: '0' },
                        paddingAround: { type: String, required: false, default: '0' },
                        paddingBetween: { type: String, required: false, default: '0' },
                        overflow: { type: String, required: false, default: 'hidden' },
                        borderRadius: { type: String, required: false, default: '0.5rem' },
                        // Box Title
                        title: {
                            display: { type: String, required: false, default: 'none' },
                            paddingAround: { type: String, required: false, default: '1rem' },
                            design: { type: String, required: false, default: 'Classic' },
                            border: { type: String, required: false, default: '0' },
                            backgroundColor: { type: String, required: false, default: 'inherit' },
                            alignItems: { type: String, required: false, default: 'center' },
                            justifyContent: { type: String, required: false, default: 'space-between' },
                            title: {
                                text: { type: String, required: false, default: 'Container Title' },
                                color: { type: String, required: false, default: '#404040' },
                                position: { type: String, required: false, default: 'relative' },
                                fontSize: { type: String, required: false, default: '1.9rem' },
                                border: { type: String, required: false, default: '0' },
                                padding: { type: String, required: false, default: '0' },
                                margin: { type: String, required: false, default: '0 2rem 0 0' },
                            },
                            strokeLine: {
                                display: { type: String, required: false, default: 'flex' },
                                color: { type: String, required: false, default: 'blue' },
                                height: { type: String, required: false, default: '2px' },
                                width: { type: String, required: false, default: '100%' },
                            },
                            showAll: {
                                display: { type: String, required: false, default: 'flex' },
                                position: { type: String, required: false, default: 'relative' },
                                direction: { type: String, required: false, default: 'X' },
                                fontSize: { type: String, required: false, default: '1.3rem' },
                                color: { type: String, required: false, default: '#00000080' },
                                border: { type: String, required: false, default: '0' },
                                text: { type: String, required: false, default: 'show all' },
                                padding: { type: String, required: false, default: '0' },
                            },
                            chevron: {
                                display: { type: String, required: false, default: 'flex' },
                                color: { type: String, required: false, default: 'blue' },
                                fontSize: { type: String, required: false, default: '1.3rem' },
                            }
                        },
                        // slide
                        slide: {
                            type: [{
                                borderRadius: { type: String, required: false, default: '0.5rem' },
                                border: { type: String, required: false, default: '0' },
                                height: { type: String, required: false, default: 'auto' },
                                width: { type: String, required: false, default: 'auto' },
                                backgroundColor: { type: String, required: false, default: 'inherit' },
                                justifyContent: { type: String, required: false, default: 'flex-start' },
                                title: {
                                    display: { type: String, required: false, default: 'none' },
                                    backgroundColor: { type: String, required: false, default: 'inherit' },
                                    color: { type: String, required: false, default: '#444444' },
                                    fontSize: { type: String, required: false, default: '1.5rem' },
                                    fontSize: { type: String, required: false, default: '1.5rem' },
                                    height: { type: String, required: false, default: 'fit-content' },
                                    margin: { type: String, required: false, default: '0' },
                                    border: { type: String, required: false, default: '0' },
                                    borderRadius: { type: String, required: false, default: '0.5rem' },
                                    padding: { type: String, required: false, default: '0' },
                                    chevron: {
                                        display: { type: String, required: false, default: 'flex' },
                                        color: { type: String, required: false, default: '#444444' },
                                        fontSize: { type: String, required: false, default: '1.5rem' },
                                    }
                                },
                                // image
                                image: {
                                    borderRadius: { type: String, required: false, default: '0.5rem' },
                                    height: { type: String, required: false, default: 'auto' },
                                    width: { type: String, required: false, default: 'auto' },
                                    forceWidth: { type: Boolean, required: false, default: false },
                                    animation: { type: Boolean, required: false, default: true },
                                },
                            }], required: false
                        },// product
                        product: {
                            display: { type: String, required: false, default: 'flex' },
                            justifyContent: { type: String, required: false, default: 'flex-start' },
                            padding: { type: String, required: false, default: '0.5rem' },
                            name: {
                                fontSize: { type: String, required: false, default: '1.4rem' },
                                color: { type: String, required: false, default: '#444444' },
                                hoverColor: { type: String, required: false, default: 'blue' },
                                textAlign: { type: String, required: false, default: 'center' },
                            },
                            brand: {
                                display: { type: String, required: false, default: 'flex' },
                                fontSize: { type: String, required: false, default: '1.1rem' },
                                color: { type: String, required: false, default: '#444444' },
                                hoverColor: { type: String, required: false, default: 'blue' },
                            },
                            price: {
                                fontSize: { type: String, required: false, default: '1.5rem' },
                                color: { type: String, required: false, default: '#444444' },
                                hoverColor: { type: String, required: false, default: 'blue' },
                                textAlign: { type: String, required: false, default: 'center' },
                                beforeDiscount: {
                                    fontSize: { type: String, required: false, default: '1.2rem' },
                                    color: { type: String, required: false, default: '#999999' },
                                },
                                unit: {
                                    fontSize: { type: String, required: false, default: '1rem' },
                                    color: { type: String, required: false, default: '#999999' },
                                }
                            },
                            rating: {
                                display: { type: String, required: false, default: 'flex' },
                                fontSize: { type: String, required: false, default: '1rem' },
                                color: { type: String, required: false, default: '#444444' },
                            },
                            reviews: {
                                display: { type: String, required: false, default: 'flex' },
                                fontSize: { type: String, required: false, default: '0.9rem' },
                                color: { type: String, required: false, default: '#444444' },
                            },
                        },
                        // skeleton
                        skeleton: {
                            fontSize: { type: String, required: false, default: '1rem' },
                        },
                        // badges
                        badges: {
                            display: { type: String, required: false, default: 'grid' },
                            top: { type: String, required: false, default: '0.2rem' },
                            left: { type: String, required: false, default: '0.2rem' },
                            borderRadius: { type: String, required: false, default: '0.5rem' },
                            backgroundColors: { type: Array, required: false, default: ['red', 'orangered', 'orange'] },
                            color: { type: String, required: false, default: '#fff' },
                            fontSize: { type: String, required: false, default: '1.4rem' },
                            paddingBetween: { type: String, required: false, default: '0.5rem' },
                            badgeWidth: { type: String, required: false, default: '3rem' },
                            badgeHeight: { type: String, required: false, default: '2rem' },
                            badges: { type: Array, required: false, default: [] },
                        },
                        // swiper
                        swiper: {
                            swipable: { type: Boolean, required: false, default: true },
                            direction: { type: String, required: false, default: 'X' },
                            skip: { type: Number, required: false, default: 1 },
                            skipMore: { type: Number, required: false, default: 0 },
                            chevrons: {
                                display: { type: String, required: false, default: 'none' },
                                color: { type: String, required: false, default: '#fff' },
                                height: { type: String, required: false, default: '6rem' },
                                width: { type: String, required: false, default: '3rem' },
                                backgroundColor: { type: String, required: false, default: '#00000000' },
                                hoverBackgroundColor: { type: String, required: false, default: '#00000000' },
                                autoToggle: { type: Boolean, required: false, default: true },
                                boxShadow: { type: Boolean, required: false, default: true },
                            },
                            autoPlay: {
                                duration: { type: Number, required: false, default: 2000 },
                                run: { type: Boolean, required: false, default: false },
                                stopOnHover: { type: Boolean, required: false, default: false },
                            },
                            scroll: {
                                behavior: { type: String, required: false, default: 'smooth' },
                                autoToggle: { type: Boolean, required: false, default: true },
                            },
                            bullets: {
                                display: { type: String, required: false, default: 'flex' },
                                bottom: { type: String, required: false, default: '0.5rem' },
                                paddingBetween: { type: String, required: false, default: '0.5rem' },
                                fontSize: { type: String, required: false, default: '0.5rem' },
                            },
                            timerBar: {
                                display: { type: String, required: false, default: 'none' },
                                margin: { type: String, required: false, default: '0' },
                            }
                        },
                    },
                    slides: {
                        type: [{
                            title: { type: String, required: false },
                            src: { type: String, required: false },
                            link: { type: String, required: false },
                        }], required: false, default: []
                    },
                }], required: false, default: []
            },

        }], required: false, default: []
    },
})

const Controls = mongoose.model("Controls", controlsSchema);

export default Controls;