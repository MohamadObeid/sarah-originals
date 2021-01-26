import mongoose from "mongoose";

const TitleSchema = new mongoose.Schema({
    viewPort: String,
    display: String,
    name: String,
    design: String,// 'Classic' },
    border: String,// '0' },
    borderSide: String,
    backgroundColor: String,//'inherit' },
    alignItems: String,//'center' },
    justifyContent: String,// 'space-between' },
    padding: String,// '0' },
    margin: String,
    borderRadius: String,// '0' },
    width: String,
    flexDirection: String,
    title: {
        color: String,// '#404040' },
        position: String,// 'relative' },
        fontSize: String,//'1.9rem' },
        border: String,// '0' },
        padding: String,// '0' },
        margin: String,
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
        fontSize: String,// '1.3rem' },
        color: String,// '#00000080' },
        border: String,// '0' },
        text: String,// 'show all' },
        padding: String,// '0' },
        margin: String,
    },
    chevron: {
        display: String,// 'flex' },
        color: String,// 'blue' },
        fontSize: String,// '1.9rem' },
        transform: String
    }
})

const btnStyles = {
    btn: String,
    fontSize: String,
    height: String,
    width: String,
    margin: String,
    border: String,
    borderRadius: String,
    color: String,
    backgroundColor: String,
    hoverBackgroundColor: String,
}

const addToCartSchema = new mongoose.Schema({
    viewPort: String,
    name: String,
    display: String,
    design: String,
    margin: String,
    padding: String,
    flexDirection: String,
    add: btnStyles,
    delete: btnStyles,
    plus: btnStyles,
    minus: btnStyles,
    num: btnStyles,
})

const stylesSchema = new mongoose.Schema({
    viewPort: String,
    name: { type: String, unique: true },
    display: String,//'flex' },
    flexDirection: String,// default: 'column' },
    overlayPadding: String,// '0' },
    background: {
        color: String,//'inherit' },
        isImage: Boolean,//false },
        title: String,//''
        src: String,//''
    },
    paddingAround: String,//'0' },
    paddingBetween: String,// '0' },
    borderRadius: String,// '0.2rem' },
    height: String,//'fit-content' },
    width: String,// 'fit-content' },
    title: TitleSchema,
    slideBox: [{
        type: { type: String },// 'Image' },
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
        title: TitleSchema,
        // slide
        slide: [{
            isDefault: Boolean,
            index: Number,
            borderRadius: String,// '0' },
            border: String,// '0' },
            height: String,// 'auto' },
            width: String,// 'auto' },
            backgroundColor: String,// 'inherit' },
            justifyContent: String,// 'flex-start' },
            productVisible: Boolean,
            // slide Title
            title: TitleSchema,
            // image
            image: {
                borderRadius: String,// '0' },
                height: String,// 'auto' },
                width: String,// 'auto' },
                forceWidth: Boolean,//false },
                forceHeight: Boolean,
                animation: Boolean,//true },
            },
        }],
        // product
        product: {
            display: String,// 'flex' },
            addToCart: addToCartSchema,
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
            backgroundColors: [String],// ['red', 'orangered', 'orange'] },
            color: String,// '#fff' },
            fontSize: String,// '2rem' },
            badgeWidth: String,// '5rem' },
            badgeHeight: String,// '3.5rem' },
            badges: [String],// [] },
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
        }
    }]
})

const AddToCart = mongoose.model("AddToCart", addToCartSchema)
const Title = mongoose.model("Title", TitleSchema)
const Styles = mongoose.model("Styles", stylesSchema)

export { Title, Styles, AddToCart }

