import mongoose from "mongoose";

const controlsSchema = new mongoose.Schema({
    active: { type: Boolean, required: false },
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
            active: { type: Boolean, required: false, default: false },
            name: { type: String, required: false, default: '' },
            title: {
                display: { type: String, required: false, default: 'none' },
                title: { type: String, required: false, default: '' },
                fontSize: { type: String, required: false, default: '1.5rem' },
                design: { type: String, required: false, default: 'fish' },
                backgroundColor: { type: String, required: false, default: 'inherit' },
            },
            flexDirection: { type: String, required: false, default: 'column' },
            overlayPadding: { type: String, required: false, default: '0' },
            paddingAround: { type: String, required: false, default: '0' },
            paddingBetween: { type: String, required: false, default: '0' },
            backgroundColor: { type: String, required: false, default: 'inherit' },
            animateImage: { type: Boolean, required: false, default: true },
            showMore: {
                display: { type: String, required: false, default: 'none' },
                color: { type: String, required: false, default: 'inherit' },
                moreText: { type: String, required: false, default: 'show more' },
                lessText: { type: String, required: false, default: 'show less' },
            },
            swiper: {
                display: { type: String, required: false, default: 'none' },
                height: { type: String, required: false, default: 'auto' },
                width: { type: String, required: false, default: 'auto' },
                borderRadius: { type: String, required: false, default: '0' },
            },
            fixed: {
                display: { type: String, required: false, default: 'none' },
                height: { type: String, required: false, default: 'auto' },
                flexWrap: { type: String, required: false, default: 'wrap' },
                justifyContent: { type: String, required: false, default: 'space-around' },
                backgroundColor: { type: String, required: false, default: 'inherit' },
                width: { type: String, required: false, default: 'auto' },
                paddingAround: { type: String, required: false, default: '0' },
                paddingBetween: { type: String, required: false, default: '0' },
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
                // slide title
                slideTitle: {
                    display: { type: String, required: false, default: 'none' },
                    backgroundColor: { type: String, required: false, default: 'inherit' },
                    color: { type: String, required: false, default: '#707070' },
                    fontSize: { type: String, required: false, default: '1.5rem' },
                    mobileFontSize: { type: String, required: false, default: '1.3rem' },
                    height: { type: String, required: false, default: 'fit-content' },
                    mobileHeight: { type: String, required: false, default: 'fit-content' },
                },
                // swipable
                swipable: { type: Boolean, required: false, default: false },
                swiper: {
                    chevrons: {
                        display: { type: String, required: false, default: 'none' },
                        color: { type: String, required: false, default: '#fff' },
                        height: { type: String, required: false, default: '8rem' },
                        width: { type: String, required: false, default: '4rem' },
                        backgroundColor: { type: String, required: false, default: '#00000040' },
                        hoverBackgroundColor: { type: String, required: false, default: '#00000060' },
                    }
                }
            },
            mobile: {
                active: { type: Boolean, required: false, default: false },
                flexDirection: { type: String, required: false, default: 'column' },
                overlayPadding: { type: String, required: false, default: '0' },
                paddingAround: { type: String, required: false, default: '0' },
                paddingBetween: { type: String, required: false, default: '0' },
                backgroundColor: { type: String, required: false, default: 'inherit' },
                swiper: {
                    display: { type: String, required: false, default: 'none' },
                    height: { type: String, required: false, default: 'auto' },
                    width: { type: String, required: false, default: 'auto' },
                    borderRadius: { type: String, required: false, default: '0' },
                },
                fixed: {
                    display: { type: String, required: false, default: 'none' },
                    height: { type: String, required: false, default: 'auto' },
                    justifyContent: { type: String, required: false, default: 'center' },
                    backgroundColor: { type: String, required: false, default: 'inherit' },
                    width: { type: String, required: false, default: 'auto' },
                    paddingAround: { type: String, required: false, default: '0' },
                    paddingBetween: { type: String, required: false, default: '0' },
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
                    // swipable
                    swipable: { type: Boolean, required: false, default: false },
                    swiper: {
                        chevrons: {
                            display: { type: String, required: false, default: 'none' },
                            color: { type: String, required: false, default: '#fff' },
                            height: { type: String, required: false, default: '6rem' },
                            width: { type: String, required: false, default: '3rem' },
                            backgroundColor: { type: String, required: false, default: '#00000000' },
                            hoverBackgroundColor: { type: String, required: false, default: '#00000000' },
                        },
                    },
                    // slide title
                    slideTitle: {
                        display: { type: String, required: false, default: 'none' },
                        backgroundColor: { type: String, required: false, default: 'inherit' },
                        color: { type: String, required: false, default: '#707070' },
                        fontSize: { type: String, required: false, default: '1.5rem' },
                        mobileFontSize: { type: String, required: false, default: '1.3rem' },
                        height: { type: String, required: false, default: 'fit-content' },
                        mobileHeight: { type: String, required: false, default: 'fit-content' },
                    },
                },
            },
            swiperSlides: {
                type: [{
                    title: { type: String, required: false },
                    src: { type: String, required: false },
                    link: { type: String, required: false },
                }], required: false
            },

            fixedSlides: {
                type: [{
                    title: { type: String, required: false },
                    src: { type: String, required: false },
                    link: { type: String, required: false },
                }], required: false
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