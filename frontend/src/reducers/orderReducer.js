import {
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    SAVE_DELIVERY_ADDRESS,
    TOGGLE_ORDER_SCREEN,
    SAVE_PAYMENT_METHOD
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
            return state;
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
            return { paymentMethod: action.payload };
        default:
            return state;
    }
}

export {
    addressReducer,
    orderScreenReducer,
    paymentMethodReducer,
    orderListReducer
}