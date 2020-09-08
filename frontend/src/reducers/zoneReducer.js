import {
    ZONE_LIST_SUCCESS,
    ZONE_LIST_REQUEST,
    ZONE_LIST_FAIL,
    ZONE_SAVE_REQUEST,
    ZONE_SAVE_SUCCESS,
    ZONE_SAVE_FAIL,
    ZONE_DELETE_REQUEST,
    ZONE_DELETE_SUCCESS,
    ZONE_DELETE_FAIL,
} from "../constants/constants";

function zoneListReducer(state = { zone: [] }, action) {
    switch (action.type) {
        case ZONE_LIST_REQUEST:
            return {
                loading: true,
                zone: [],
            };
        case ZONE_LIST_SUCCESS:
            return {
                loading: false,
                zone: action.payload,
            };
        case ZONE_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

function zoneSaveReducer(state = { zone: {} }, action) {

    switch (action.type) {
        case ZONE_SAVE_REQUEST:
            return {
                loading: true,
            };
        case ZONE_SAVE_SUCCESS:
            return {
                loading: false,
                success: true,
                zone: action.payload,
            };
        case ZONE_SAVE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

function zoneDeleteReducer(state = { data: {} }, action) {

    switch (action.type) {
        case ZONE_DELETE_REQUEST:
            return {
                loading: true,
            };
        case ZONE_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
                data: action.payload,
            };
        case ZONE_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export {
    zoneListReducer, zoneSaveReducer, zoneDeleteReducer
};