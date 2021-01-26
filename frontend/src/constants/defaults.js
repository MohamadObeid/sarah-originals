export const defaultTitleStyles = {
    // Default styles
    name: 'Default Title Desktop Styles',
    display: 'flex',
    padding: '1rem',
    design: 'Classic',
    border: '0',
    borderSide: 'Around',
    width: '100%',
    backgroundColor: 'inherit',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '0',
    flexDirection: 'row',
    title: {
        color: '#404040',
        position: 'relative',
        fontSize: '1.9rem',
        border: '0',
        padding: '0',
        margin: '0 2rem 0 0',
    },
    strokeLine: {
        display: 'flex',
        color: 'blue',
        height: '2px',
        width: '100%',
    },
    showAll: {
        display: 'flex',
        position: 'relative',
        direction: 'X',
        fontSize: '1.3rem',
        color: '#00000080',
        border: '0',
        text: 'show all',
        padding: '0',
        margin: '0 0 0 2rem',
    },
    chevron: {
        display: 'flex',
        color: 'blue',
        fontSize: '1.9rem',
    }
}

export const defaultAddToCartStyles = {
    viewPort: 'desktop',
    name: 'Default Desktop AddToCart',
    display: 'flex',
    design: 'Bottom Center',
    margin: '0',
    padding: '1rem 0',
    border: '0',
    borderRadius: '0.5rem',
    flexDirection: 'row',
    position: 'unset',
    top: '0',
    right: '0',
    add: {
        btn: 'Add To Cart',
        fontSize: '1.5rem',
        height: '4.2rem',
        width: '14rem',
        margin: '0',
        border: '0',
        borderRadius: '0.5rem',
        color: '#fff',
        backgroundColor: '#f0c040',
        hoverBackgroundColor: '#c8960b'
    },
    delete: {
        btn: 'none',
        fontSize: '1.5rem',
        height: '4.2rem',
        width: '14rem',
        margin: '0',
        border: '0',
        borderRadius: '0.5rem',
        color: '#fff',
        backgroundColor: '#f0c040',
        hoverBackgroundColor: '#c8960b'
    },
    plus: {
        btn: 'plus',
        fontSize: '1.4rem',
        height: '4.2rem',
        width: '4.7rem',
        margin: '0',
        border: '0',
        borderRadius: '0.5rem',
        color: '#fff',
        backgroundColor: '#f0c040',
        hoverBackgroundColor: '#c8960b'
    },
    minus: {
        btn: 'minus',
        fontSize: '1.4rem',
        height: '4.2rem',
        width: '4.7rem',
        margin: '0',
        border: '0',
        borderRadius: '0.5rem',
        color: '#fff',
        backgroundColor: '#f0c040',
        hoverBackgroundColor: '#c8960b'
    },
    num: {
        btn: '',
        fontSize: '1.7rem',
        height: '4.2rem',
        width: '4.7rem',
        margin: '0 0.2rem',
        border: '0',
        borderRadius: '0.5rem',
        color: '#444444',
        backgroundColor: '#00000000',
        hoverBackgroundColor: '#fff'
    },
}

export const defaultStyles = {
    // default desktop styles
    viewPort: 'desktop',
    name: 'Default Desktop Styles',
    display: 'flex',
    flexDirection: 'column',
    overlayPadding: '0',
    background: {
        color: 'inherit',
        isImage: false,
        title: '',
        src: '',
    },
    paddingAround: '0',
    paddingBetween: '0',
    borderRadius: '0.2rem',
    height: 'fit-content',
    width: 'fit-content',
    slideBox: [{
        type: 'Image',
        display: 'none',
        height: 'auto',
        width: 'auto',
        flexWrap: 'nowrap',
        border: '0',
        backgroundColor: 'inherit',
        overlayPadding: '0',
        paddingAround: '0',
        paddingBetween: '0',
        overflow: 'hidden',
        borderRadius: '0.5rem',
        // slide
        slide: [{
            isDefault: true,
            borderRadius: '0',
            border: '0',
            height: 'auto',
            width: 'auto',
            backgroundColor: 'inherit',
            justifyContent: 'flex-start',
            productVisible: true,
            // image
            image: {
                borderRadius: '0',
                height: 'auto',
                width: 'auto',
                forceWidth: false,
                forceHeight: false,
                animation: true,
            },
        }],
        // product
        product: {
            display: 'flex',
            justifyContent: 'center',
            addToCart: { display: 'flex' },
            padding: '1rem',
            name: {
                fontSize: '1.4rem',
                color: '#444444',
                hoverColor: 'blue',
                textAlign: 'center',
            },
            brand: {
                display: 'flex',
                fontSize: '1.2rem',
                color: '#444444',
                hoverColor: 'blue',
            },
            price: {
                fontSize: '2rem',
                color: '#444444',
                hoverColor: 'blue',
                textAlign: 'center',
                beforeDiscount: {
                    fontSize: '1.7rem',
                    color: '#999999',
                },
                unit: {
                    fontSize: '1.2rem',
                    color: '#999999',
                }
            },
            rating: {
                display: 'flex',
                fontSize: '1.4rem',
                color: '#444444',
            },
            reviews: {
                display: 'flex',
                fontSize: '1.2rem',
                color: '#444444',
            },
        },
        // skeleton
        skeleton: {
            fontSize: '1.2rem',
        },
        // badges
        badges: {
            display: 'grid',
            top: '0.4rem',
            left: '0.4rem',
            borderRadius: '0.5rem',
            backgroundColors: ['red', 'orangered', 'orange'],
            color: '#fff',
            fontSize: '2rem',
            badgeWidth: '5rem',
            badgeHeight: '3.5rem',
            badges: [],
            paddingBetween: '0.5rem',
        },
        // swiper
        swiper: {
            swipable: true,
            direction: 'X',
            skip: 1,
            skipMore: 0,
            chevrons: {
                display: 'none',
                color: '#fff',
                height: '8rem',
                width: '4rem',
                backgroundColor: '#00000040',
                hoverBackgroundColor: '#00000060',
                autoToggle: true,
                boxShadow: true,
            },
            autoPlay: {
                duration: '2000',
                run: false,
                stopOnHover: false,
            },
            scroll: {
                behavior: 'auto',
                autoToggle: true,
            },
            bullets: {
                display: 'none',
                bottom: '1rem',
                paddingBetween: '0.8rem',
                fontSize: '1rem',
            },
            timerBar: {
                display: 'none',
                margin: '0',
            }
        },
    }]
}

