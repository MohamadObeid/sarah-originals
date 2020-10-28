import {
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    SAVE_DELIVERY_ADDRESS,
    TOGGLE_ORDER_SCREEN,
    SAVE_PAYMENT_METHOD,
    ORDER_SAVE_FAIL,
    ORDER_SAVE_SUCCESS,
    ORDER_SAVE_REQUEST,
    ORDER_DELETE_REQUEST,
    ORDER_DELETE_SUCCESS,
    ORDER_DELETE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_SAVE_CLEAR
}
    from "../constants/constants";

function orderListReducer(state = { orders: [] }, action) {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return {
                loading: true,
                orders: [],
            };
        case ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            };
        case ORDER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state
    }
}

function addressReducer(state = { address: [] }, action) {
    switch (action.type) {
        case SAVE_DELIVERY_ADDRESS: {
            const addressItem = action.payload;
            if (state.address) {
                const isAddress = state.address.find(i => i.region == addressItem.region && i.building == addressItem.building)
                if (!isAddress) { return { address: [...state.address, addressItem] } }
                else { return { address: [...state.address] } }
            }
            else { return { address: [addressItem] } }
        }
        default:
            return state;
    }
}

function orderScreenReducer(state = { orderScreen: 'delivery' }, action) {
    switch (action.type) {
        case TOGGLE_ORDER_SCREEN:
            return { orderScreen: action.payload };
        default:
            return state;
    }
}

function paymentMethodReducer(state = { paymentMethod: "" }, action) {
    switch (action.type) {
        case SAVE_PAYMENT_METHOD:
            return { paymentMethod: action.payload }
        default:
            return state;
    }
}

function orderSaveReducer(state = { order: {} }, action) {
    switch (action.type) {
        case ORDER_SAVE_REQUEST:
            return {
                loading: true,
            }
        case ORDER_SAVE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload,
            }
        case ORDER_SAVE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case ORDER_SAVE_CLEAR:
            return {
                success: false
            }
        default:
            return state;
    }
}

function orderDeleteReducer(state = { data: {} }, action) {
    switch (action.type) {
        case ORDER_DELETE_REQUEST:
            return {
                loading: true,
            };
        case ORDER_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
                data: action.payload,
            };
        case ORDER_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case ORDER_SAVE_CLEAR:
            return {
                success: false
            }
        default:
            return state;
    }
}

function orderDetailsReducer(state = { order: undefined }, action) {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                loading: true,
            };
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            };
        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export {
    addressReducer,
    orderScreenReducer,
    paymentMethodReducer,
    orderListReducer,
    orderSaveReducer,
    orderDeleteReducer,
    orderDetailsReducer,
}