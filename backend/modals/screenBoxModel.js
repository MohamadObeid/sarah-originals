import mongoose from "mongoose";

const screenBoxSchema = new mongoose.Schema({
    name: String,
    display: String,//'flex' },
    flexDirection: String,// default: 'column' },
    overlayPadding: String,// '0' },
    background: {
        color: String,//'inherit' },
        image: Boolean,//false },
        title: String,//''
        src: String,//''
    },
    paddingAround: String,//'0' },
    paddingBetween: String,// '0' },
    borderRadius: String,// '0.2rem' },
    height: String,//'fit-content' },
    width: String,// 'fit-content' },
    title: {
        display: String,// 'flex' },
        paddingAround: String,// '1rem' },
        design: String,// 'Classic' },
        border: String,// '0' },
        backgroundColor: String,//'inherit' },
        alignItems: String,//'center' },
        justifyContent: String,// 'space-between' },
        title: {
            text: String,// 'Container Title' },
            color: String,// '#404040' },
            position: String,// 'relative' },
            fontSize: String,//'1.9rem' },
            border: String,// '0' },
            padding: String,// '0' },
        },
        strokeLine: {
            display: String,// 'flex' },
            color: String,// 'blue' },
            height: String,// '2px' },
            width: String,// '100%' },
        },
        showAll: {
            display: String,// 'flex' },
            position: String,// 'relative' },
            direction: String,// 'X' },
            fontSize: String,// '1.3rem' },
            color: String,// '#00000080' },
            border: String,// '0' },
            text: String,// 'show all' },
            padding: String,// '0' },
        },
        chevron: {
            display: String,// 'flex' },
            color: String,// 'blue' },
            fontSize: String,// '1.9rem' },
        }
    },
    mobile: {
        display: String,// 'flex' },
        flexDirection: String,// 'column' },
        overlayPadding: String,// '0' },
        paddingAround: String,// '0' },
        paddingBetween: String,// '0' },
        background: {
            color: String,// 'inherit' },
            image: Boolean,//false },
            title: String,// '' },
            src: String,// '' },
        },
        borderRadius: String,// '0rem' },
        height: String,// 'fit-content' },
        width: String,// 'fit-content' },
        title: {
            display: String,// 'flex' },
            paddingAround: String,// '0.5rem' },
            design: String,// 'Classic' },
            border: String,// '0' },
            backgroundColor: String,// 'inherit' },
            alignItems: String,// 'center' },
            justifyContent: String,// 'space-between' },
            title: {
                text: String,// 'Container Title' },
                color: String,// '#404040' },
                position: String,// 'relative' },
                fontSize: String,// '1.5rem' },
                border: String,// '0' },
                padding: String,// '0' },
            },
            strokeLine: {
                display: String,// 'flex' },
                color: String,// 'blue' },
                height: String,// '2px' },
                width: String,// '100%' },
            },
            showAll: {
                display: String,// 'flex' },
                position: String,// 'relative' },
                direction: String,// 'X' },
                fontSize: String,// '1rem' },
                color: String,// '#00000080' },
                border: String,// '0' },
                text: String,// 'show all' },
                padding: String,// '0' },
            },
            chevron: {
                display: String,// 'flex' },
                color: String,// 'blue' },
                fontSize: String,// '1.9rem' },
            }
        },
    },
    slideBox: {
        type: [{
            type: { type: String },// 'Image' },
            collection_: String,// '' },
            display: String,// 'none' },
            height: String,// 'auto' },
            width: String,// 'auto' },
            flexWrap: String,// 'nowrap' },
            border: String,// '0' },
            backgroundColor: String,// 'inherit' },
            paddingAround: String,// '0' },
            paddingBetween: String,// '0' },
            overflow: String,// 'hidden' },
            borderRadius: String,// '0.5rem' },
            // Box Title
            title: {
                display: String,// 'none' },
                paddingAround: String,// '1rem' },
                design: String,// 'Classic' },
                border: String,// '0' },
                backgroundColor: String,// 'inherit' },
                alignItems: String,// 'center' },
                justifyContent: String,// 'space-between' },
                title: {
                    text: String,// 'Container Title' },
                    color: String,// '#404040' },
                    position: String,// 'relative' },
                    fontSize: String,// '1.9rem' },
                    border: String,// '0' },
                    padding: String,// '0' },
                    margin: String,// '0 2rem 0 0' },
                },
                strokeLine: {
                    display: String,// 'flex' },
                    color: String,// 'blue' },
                    height: String,// '2px' },
                    width: String,// '100%' },
                },
                showAll: {
                    display: String,// 'flex' },
                    position: String,// 'relative' },
                    direction: String,// 'X' },
                    fontSize: String,// '1.3rem' },
                    color: String,// '#00000080' },
                    border: String,// '0' },
                    text: String,// 'show all' },
                    padding: String,// '0' },
                },
                chevron: {
                    display: String,// 'flex' },
                    color: String,// 'blue' },
                    fontSize: String,// '1.6rem' },
                }
            },
            // slide
            slide: {
                type: [{
                    borderRadius: String,// '0' },
                    border: String,// '0' },
                    height: String,// 'auto' },
                    width: String,// 'auto' },
                    backgroundColor: String,// 'inherit' },
                    justifyContent: String,// 'flex-start' },
                    title: {
                        display: String,// 'none' },
                        backgroundColor: String,// 'inherit' },
                        color: String,// '#444444' },
                        fontSize: String,// '1.5rem' },
                        height: String,// 'fit-content' },
                        margin: String,// '0' },
                        border: String,// '0' },
                        borderRadius: String,// '0.5rem' },
                        padding: String,// '0' },
                        chevron: {
                            display: String,// 'flex' },
                            color: String,// '#444444' },
                            fontSize: String,// '1.5rem' },
                        }
                    },
                    // image
                    image: {
                        borderRadius: String,// '0' },
                        height: String,// 'auto' },
                        width: String,// 'auto' },
                        forceWidth: Boolean,//false },
                        animation: Boolean,//true },
                    },
                }]
            },
            // product
            product: {
                display: String,// 'flex' },
                justifyContent: String,// 'flex-start' },
                padding: String,// '1rem' },
                name: {
                    fontSize: String,// '1.4rem' },
                    color: String,// '#444444' },
                    hoverColor: String,// 'blue' },
                    textAlign: String,// 'center' },
                },
                brand: {
                    display: String,// 'flex' },
                    fontSize: String,// '1.2rem' },
                    color: String,// '#444444' },
                    hoverColor: String,// 'blue' },
                },
                price: {
                    fontSize: String,// '2rem' },
                    color: String,// '#444444' },
                    hoverColor: String,// 'blue' },
                    textAlign: String,// 'center' },
                    beforeDiscount: {
                        fontSize: String,// '1.7rem' },
                        color: String,// '#999999' },
                    },
                    unit: {
                        fontSize: String,// '1.2rem' },
                        color: String,// '#999999' },
                    }
                },
                rating: {
                    display: String,// 'flex' },
                    fontSize: String,// '1.4rem' },
                    color: String,// '#444444' },
                },
                reviews: {
                    display: String,// 'flex' },
                    fontSize: String,// '1.2rem' },
                    color: String,// '#444444' },
                },
            },
            // skeleton
            skeleton: {
                fontSize: String,// '1.2rem' },
            },
            // badges
            badges: {
                display: String,// 'grid' },
                top: String,// '0.4rem' },
                left: String,// '0.4rem' },
                borderRadius: String,// '0.5rem' },
                backgroundColors: Array,// ['red', 'orangered', 'orange'] },
                color: String,// '#fff' },
                fontSize: String,// '2rem' },
                badgeWidth: String,// '5rem' },
                badgeHeight: String,// '3.5rem' },
                badges: Array,// [] },
                paddingBetween: String,// '0.5rem' },
            },
            // swiper
            swiper: {
                swipable: Boolean,//true },
                direction: String,// 'X' },
                skip: Number,// 1 },
                skipMore: Number,// 0 },
                chevrons: {
                    display: String,// 'none' },
                    color: String,// '#fff' },
                    height: String,// '8rem' },
                    width: String,// '4rem' },
                    backgroundColor: String,// '#00000040' },
                    hoverBackgroundColor: String,// '#00000060' },
                    autoToggle: Boolean,//true },
                    boxShadow: Boolean,//true },
                },
                autoPlay: {
                    duration: String,// '2000' },
                    run: Boolean,//false },
                    stopOnHover: Boolean,//false },
                },
                scroll: {
                    behavior: String,// 'auto' },
                    autoToggle: Boolean,//true },
                },
                bullets: {
                    display: String,// 'flex' },
                    bottom: String,// '1rem' },
                    paddingBetween: String,// '0.8rem' },
                    fontSize: String,// '1rem' },
                },
                timerBar: {
                    display: String,// 'none' },
                    margin: String,// '0' },
                }
            },
            mobile: {
                display: String,// 'none' },
                height: String,// 'auto' },
                justifyContent: String,// 'unset' },
                backgroundColor: String,// 'inherit' },
                width: String,// 'auto' },
                border: String,// '0' },
                paddingAround: String,// '0' },
                paddingBetween: String,// '0' },
                overflow: String,// 'hidden' },
                borderRadius: String,// '0.5rem' },
                // Box Title
                title: {
                    display: String,// 'none' },
                    paddingAround: String,// '1rem' },
                    design: String,// 'Classic' },
                    border: String,// '0' },
                    backgroundColor: String,// 'inherit' },
                    alignItems: String,// 'center' },
                    justifyContent: String,// 'space-between' },
                    title: {
                        text: String,// 'Container Title' },
                        color: String,// '#404040' },
                        position: String,// 'relative' },
                        fontSize: String,// '1.9rem' },
                        border: String,// '0' },
                        padding: String,// '0' },
                        margin: String,// '0 2rem 0 0' },
                    },
                    strokeLine: {
                        display: String,// 'flex' },
                        color: String,// 'blue' },
                        height: String,// '2px' },
                        width: String,// '100%' },
                    },
                    showAll: {
                        display: String,// 'flex' },
                        position: String,// 'relative' },
                        direction: String,// 'X' },
                        fontSize: String,// '1.3rem' },
                        color: String,// '#00000080' },
                        border: String,// '0' },
                        text: String,// 'show all' },
                        padding: String,// '0' },
                    },
                    chevron: {
                        display: String,// 'flex' },
                        color: String,// 'blue' },
                        fontSize: String,// '1.3rem' },
                    }
                },
                // slide
                slide: {
                    type: [{
                        borderRadius: String,// '0.5rem' },
                        border: String,// '0' },
                        height: String,// 'auto' },
                        width: String,// 'auto' },
                        backgroundColor: String,// 'inherit' },
                        justifyContent: String,// 'flex-start' },
                        title: {
                            display: String,// 'none' },
                            backgroundColor: String,// 'inherit' },
                            color: String,// '#444444' },
                            fontSize: String,// '1.5rem' },
                            fontSize: String,// '1.5rem' },
                            height: String,// 'fit-content' },
                            margin: String,// '0' },
                            border: String,// '0' },
                            borderRadius: String,// '0.5rem' },
                            padding: String,// '0' },
                            chevron: {
                                display: String,// 'flex' },
                                color: String,// '#444444' },
                                fontSize: String,// '1.5rem' },
                            }
                        },
                        // image
                        image: {
                            borderRadius: String,// '0.5rem' },
                            height: String,// 'auto' },
                            width: String,// 'auto' },
                            forceWidth: Boolean,//false },
                            animation: Boolean,//true },
                        },
                    }]
                },// product
                product: {
                    display: String,// 'flex' },
                    justifyContent: String,// 'flex-start' },
                    padding: String,// '0.5rem' },
                    name: {
                        fontSize: String,// '1.4rem' },
                        color: String,// '#444444' },
                        hoverColor: String,// 'blue' },
                        textAlign: String,// 'center' },
                    },
                    brand: {
                        display: String,// 'flex' },
                        fontSize: String,// '1.1rem' },
                        color: String,// '#444444' },
                        hoverColor: String,// 'blue' },
                    },
                    price: {
                        fontSize: String,// '1.5rem' },
                        color: String,// '#444444' },
                        hoverColor: String,// 'blue' },
                        textAlign: String,// 'center' },
                        beforeDiscount: {
                            fontSize: String,// '1.2rem' },
                            color: String,// '#999999' },
                        },
                        unit: {
                            fontSize: String,// '1rem' },
                            color: String,// '#999999' },
                        }
                    },
                    rating: {
                        display: String,// 'flex' },
                        fontSize: String,// '1rem' },
                        color: String,// '#444444' },
                    },
                    reviews: {
                        display: String,// 'flex' },
                        fontSize: String,// '0.9rem' },
                        color: String,// '#444444' },
                    },
                },
                // skeleton
                skeleton: {
                    fontSize: String,// '1rem' },
                },
                // badges
                badges: {
                    display: String,// 'grid' },
                    top: String,// '0.2rem' },
                    left: String,// '0.2rem' },
                    borderRadius: String,// '0.5rem' },
                    backgroundColors: Array,// ['red', 'orangered', 'orange'] },
                    color: String,// '#fff' },
                    fontSize: String,// '1.4rem' },
                    paddingBetween: String,// '0.5rem' },
                    badgeWidth: String,// '3rem' },
                    badgeHeight: String,// '2rem' },
                    badges: Array,// [] },
                },
                // swiper
                swiper: {
                    swipable: Boolean,//true },
                    direction: String,// 'X' },
                    skip: Number,// 1 },
                    skipMore: Number,// 0 },
                    chevrons: {
                        display: String,// 'none' },
                        color: String,// '#fff' },
                        height: String,// '6rem' },
                        width: String,// '3rem' },
                        backgroundColor: String,// '#00000000' },
                        hoverBackgroundColor: String,// '#00000000' },
                        autoToggle: Boolean,//true },
                        boxShadow: Boolean,//true },
                    },
                    autoPlay: {
                        duration: Number,// 2000 },
                        run: Boolean,//false },
                        stopOnHover: Boolean,//false },
                    },
                    scroll: {
                        behavior: String,// 'smooth' },
                        autoToggle: Boolean,//true },
                    },
                    bullets: {
                        display: String,// 'flex' },
                        bottom: String,// '0.5rem' },
                        paddingBetween: String,// '0.5rem' },
                        fontSize: String,// '0.5rem' },
                    },
                    timerBar: {
                        display: String,// 'none' },
                        margin: String,// '0' },
                    }
                },
            },
            slides: {
                type: [{
                    title: String,
                    src: String,
                    link: String,
                }], //default: []
            },
        }], //default: []
    }
})

const ScreenBox = mongoose.model("ScreenBox", screenBoxSchema)

export default ScreenBox