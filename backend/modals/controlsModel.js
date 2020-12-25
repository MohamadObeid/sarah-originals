import mongoose from "mongoose";

const controlsSchema = new mongoose.Schema({
    active: { type: Boolean, required: false },
    backgroundColor: { type: String, required: false, default: '#f9f9f9' },
    addToCartBtnsStyle: { type: String, required: false },
    homePageCollections: { type: Array, required: false },
    homePageViews: {
        type: [{
            active: { type: Boolean, required: false },
            type: { type: String, required: false },
            name: { type: String, required: false },
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
            paddingAround: { type: String, required: false, default: '0' },
            paddingBetween: { type: String, required: false, default: '0' },
            backgroundColor: { type: String, required: false, default: 'inherit' },
            title: {
                display: { type: String, required: false, default: 'none' },
                title: { type: String, required: false, default: '' },
                fontSize: { type: String, required: false, default: '1.5rem' },
                design: { type: String, required: false, default: 'fish' },
                backgroundColor: { type: String, required: false, default: 'inherit' },
            },
            mobile: {
                display: { type: String, required: false, default: 'flex' },
                flexDirection: { type: String, required: false, default: 'column' },
                overlayPadding: { type: String, required: false, default: '0' },
                paddingAround: { type: String, required: false, default: '0' },
                paddingBetween: { type: String, required: false, default: '0' },
                backgroundColor: { type: String, required: false, default: 'inherit' },
                title: {
                    display: { type: String, required: false, default: 'none' },
                    title: { type: String, required: false, default: '' },
                    fontSize: { type: String, required: false, default: '1.2rem' },
                    design: { type: String, required: false, default: 'fish' },
                    backgroundColor: { type: String, required: false, default: 'inherit' },
                },
            },
            slideBox: {
                type: [{
                    display: { type: String, required: false, default: 'none' },
                    height: { type: String, required: false, default: 'auto' },
                    width: { type: String, required: false, default: 'auto' },
                    flexWrap: { type: String, required: false, default: 'nowrap' },
                    backgroundColor: { type: String, required: false, default: 'inherit' },
                    paddingAround: { type: String, required: false, default: '0' },
                    paddingBetween: { type: String, required: false, default: '0' },
                    overflowY: { type: String, required: false, default: 'hidden' },
                    // slide
                    slideBorderRadius: { type: String, required: false, default: '0' },
                    slideBorder: { type: String, required: false, default: '0' },
                    slideHeight: { type: String, required: false, default: 'auto' },
                    slideWidth: { type: String, required: false, default: 'auto' },
                    slideBackgroundColor: { type: String, required: false, default: 'inherit' },
                    // image
                    imgBorderRadius: { type: String, required: false, default: '0' },
                    imgHeight: { type: String, required: false, default: 'auto' },
                    imgWidth: { type: String, required: false, default: 'auto' },
                    imgForceWidth: { type: Boolean, required: false, default: false },
                    imgAnimation: { type: Boolean, required: false, default: true },
                    // slide title
                    slideTitle: {
                        display: { type: String, required: false, default: 'none' },
                        backgroundColor: { type: String, required: false, default: 'inherit' },
                        color: { type: String, required: false, default: '#707070' },
                        fontSize: { type: String, required: false, default: '1.5rem' },
                        height: { type: String, required: false, default: 'fit-content' },
                    },
                    // show more
                    showMore: {
                        display: { type: String, required: false, default: 'none' },
                        design: { type: String, required: false, default: 'Classic' },
                        color: { type: String, required: false, default: 'inherit' },
                        fontSize: { type: String, required: false, default: '1.5rem' },
                        moreText: { type: String, required: false, default: 'show more' },
                        lessText: { type: String, required: false, default: 'show less' },
                    },
                    // swiper
                    swiper: {
                        swipable: { type: Boolean, required: false, default: false },
                        direction: { type: String, required: false, default: 'X' },
                        chevrons: {
                            display: { type: String, required: false, default: 'none' },
                            color: { type: String, required: false, default: '#fff' },
                            height: { type: String, required: false, default: '8rem' },
                            width: { type: String, required: false, default: '4rem' },
                            backgroundColor: { type: String, required: false, default: '#00000040' },
                            hoverBackgroundColor: { type: String, required: false, default: '#00000060' },
                            autoToggle: { type: Boolean, required: false, default: true },
                            skip: { type: Number, required: false, default: 1 },
                        },
                        autoPlay: {
                            duration: { type: String, required: false, default: '2000' },
                            run: { type: Boolean, required: false, default: false },
                        },
                        scroll: {
                            behavior: { type: String, required: false, default: 'auto' },
                            autoToggle: { type: Boolean, required: false, default: true },
                        },
                    },
                    mobile: {
                        display: { type: String, required: false, default: 'none' },
                        height: { type: String, required: false, default: 'auto' },
                        justifyContent: { type: String, required: false, default: 'unset' },
                        backgroundColor: { type: String, required: false, default: 'inherit' },
                        width: { type: String, required: false, default: 'auto' },
                        paddingAround: { type: String, required: false, default: '0' },
                        paddingBetween: { type: String, required: false, default: '0' },
                        overflowY: { type: String, required: false, default: 'hidden' },
                        // slide
                        slideBorderRadius: { type: String, required: false, default: '0' },
                        slideBorder: { type: String, required: false, default: '0' },
                        slideHeight: { type: String, required: false, default: 'auto' },
                        slideWidth: { type: String, required: false, default: 'auto' },
                        slideBackgroundColor: { type: String, required: false, default: 'inherit' },
                        // image
                        imgBorderRadius: { type: String, required: false, default: '0' },
                        imgHeight: { type: String, required: false, default: 'auto' },
                        imgWidth: { type: String, required: false, default: 'auto' },
                        imgForceWidth: { type: Boolean, required: false, default: false },
                        imgAnimation: { type: Boolean, required: false, default: true },
                        // show more
                        showMore: {
                            display: { type: String, required: false, default: 'none' },
                            design: { type: String, required: false, default: 'Classic' },
                            color: { type: String, required: false, default: 'inherit' },
                            fontSize: { type: String, required: false, default: '1.3rem' },
                            moreText: { type: String, required: false, default: 'show more' },
                            lessText: { type: String, required: false, default: 'show less' },
                        },
                        // swiper
                        swiper: {
                            swipable: { type: Boolean, required: false, default: false },
                            direction: { type: String, required: false, default: 'X' },
                            chevrons: {
                                display: { type: String, required: false, default: 'none' },
                                color: { type: String, required: false, default: '#fff' },
                                height: { type: String, required: false, default: '6rem' },
                                width: { type: String, required: false, default: '3rem' },
                                backgroundColor: { type: String, required: false, default: '#00000000' },
                                hoverBackgroundColor: { type: String, required: false, default: '#00000000' },
                                autoToggle: { type: Boolean, required: false, default: true },
                                skip: { type: Number, required: false, default: 1 },
                            },
                            autoPlay: {
                                duration: { type: Number, required: false, default: 2000 },
                                run: { type: Boolean, required: false, default: false },
                            },
                            scroll: {
                                behavior: { type: String, required: false, default: 'smooth' },
                                autoToggle: { type: Boolean, required: false, default: true },
                            },
                        },
                        // slide title
                        slideTitle: {
                            display: { type: String, required: false, default: 'none' },
                            backgroundColor: { type: String, required: false, default: 'inherit' },
                            color: { type: String, required: false, default: '#707070' },
                            fontSize: { type: String, required: false, default: '1.3rem' },
                            height: { type: String, required: false, default: 'fit-content' },
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
    // slide Ribbons
    slideRibbon: {
        type: [{
            active: { type: Boolean, required: false },
            name: { type: String, required: false },
            title: {
                title: { type: String, required: false },
                design: { type: String, required: false },
                backgroundColor: { type: String, required: false },
            },
            ribbon: {
                width: { type: String, required: false },
            },
            slide: {
                width: { type: String, required: false },
                border: { type: String, required: false },
                backgroundColor: { type: String, required: false },
                flexDirection: { type: String, required: false },
                title: {
                    display: { type: String, required: false },
                    justifyContent: { type: String, required: false },
                }
            },
            image: {
                maxHeight: { type: String, required: false },
                maxWidth: { type: String, required: false },
                containerHeight: { type: String, required: false },
                containerWidth: { type: String, required: false },
            },
            mobile: {
                ribbon: {
                    width: { type: String, required: false },
                },
                slide: {
                    width: { type: String, required: false },
                },
                image: {
                    maxHeight: { type: String, required: false },
                    maxWidth: { type: String, required: false },
                    containerHeight: { type: String, required: false },
                    containerWidth: { type: String, required: false },
                },
            },
            slides: {
                type: [{
                    _id: { type: String, required: false },
                    title: { type: String, required: false },
                    image: { type: String, required: false }
                }], required: false
            }
        }], required: false
    }
})

const Controls = mongoose.model("Controls", controlsSchema);

export default Controls;