function stylesReducer(state = [], action) {
    switch (action.type) {
        case 'STYLES_GET_REQUEST':
            return state
        case 'STYLES_GET_SUCCESS':
            Array.isArray(action.payload)
                ? state.push(...action.payload)
                : state.push(action.payload)
            return state
        case 'STYLES_GET_FAIL':
            return state
        default:
            return state
    }
}

function defaultStylesReducer(state = {}, action) {
    switch (action.type) {
        case 'DEFAULT_STYLES_GET_SUCCESS':
            return { defaultStyles: action.payload }
        default:
            return state
    }
}

function stylesSaveReducer(state = {}, action) {
    switch (action.type) {
        case 'STYLES_SAVE_REQUEST':
            return state
        case 'STYLES_SAVE_SUCCESS':
            return action.payload
        case 'STYLES_SAVE_FAIL':
            return state
        default:
            return state
    }
}

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
//
//
//
//
//

function titleStylesReducer(state = [], action) {
    switch (action.type) {
        case 'TITLE_STYLES_GET_REQUEST':
            return state
        case 'TITLE_STYLES_GET_SUCCESS':
            Array.isArray(action.payload)
                ? state.push(...action.payload)
                : state.push(action.payload)
            return state
        case 'TITLE_STYLES_GET_FAIL':
            return state
        default:
            return state
    }
}

function defaultTitleStylesReducer(state = { defaultStyles: {} }, action) {
    switch (action.type) {
        case 'DEFAULT_TITLE_STYLES_GET_SUCCESS':
            return { defaultStyles: action.payload }
        default:
            return state
    }
}

function titleStylesSaveReducer(state = {}, action) {
    switch (action.type) {
        case 'TITLE_STYLES_SAVE_REQUEST':
            return state
        case 'TITLE_STYLES_SAVE_SUCCESS':
            return action.payload
        case 'TITLE_STYLES_SAVE_FAIL':
            return state
        default:
            return state
    }
}

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
//
//
//
//
//

function addToCartStylesReducer(state = [], action) {
    switch (action.type) {
        case 'ADDTOCART_TITLE_STYLES_GET_REQUEST':
            return state
        case 'ADDTOCART_TITLE_STYLES_GET_SUCCESS':
            Array.isArray(action.payload)
                ? state.push(...action.payload)
                : state.push(action.payload)
            return state
        case 'ADDTOCART_TITLE_STYLES_GET_FAIL':
            return state
        default:
            return state
    }
}

function defaultAddToCartStylesReducer(state = { defaultStyles: {} }, action) {
    switch (action.type) {
        case 'DEFAULT_ADDTOCART_TITLE_STYLES_GET_SUCCESS':
            return { defaultStyles: action.payload }
        default:
            return state
    }
}

function addToCartStylesSaveReducer(state = {}, action) {
    switch (action.type) {
        case 'ADDTOCART_TITLE_STYLES_SAVE_REQUEST':
            return state
        case 'ADDTOCART_TITLE_STYLES_SAVE_SUCCESS':
            return action.payload
        case 'ADDTOCART_TITLE_STYLES_SAVE_FAIL':
            return state
        default:
            return state
    }
}

export {
    stylesReducer, stylesSaveReducer, defaultStylesReducer,
    titleStylesReducer, defaultTitleStylesReducer, titleStylesSaveReducer,
    addToCartStylesReducer, defaultAddToCartStylesReducer, addToCartStylesSaveReducer
}