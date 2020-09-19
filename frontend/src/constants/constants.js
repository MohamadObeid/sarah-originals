// This constants are action types of dispatching server, and used for reducers.
// They are declared in a separated file, since they are used in more than 1 file.
export const GET_CURRENT_TIME = 'GET_CURRENT_TIME'
export const PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST";
export const PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS";
export const PRODUCT_LIST_FAIL = "PRODUCT_LIST_FAIL";

export const PRODUCT_DETAILS_REQUEST = "PRODUCT_DETAILS_REQUEST";
export const PRODUCT_DETAILS_SUCCESS = "PRODUCT_DETAILS_SUCCESS";
export const PRODUCT_DETAILS_FAIL = "PRODUCT_DETAILS_FAIL";
export const PRODUCTS_DETAILS_SUCCESS = 'PRODUCTS_DETAILS_SUCCESS'

export const PRODUCT_SAVE_REQUEST = "PRODUCT_SAVE_REQUEST";
export const PRODUCT_SAVE_SUCCESS = 'PRODUCT_SAVE_SUCCESS';
export const PRODUCT_SAVE_FAIL = 'PRODUCT_SAVE_FAIL';
export const PRODUCT_ACTIVATION_SUCCESS = 'PRODUCT_ACTIVATION_SUCCESS';

export const PRODUCT_DELETE_REQUEST = 'PRODUCT_DELETE_REQUEST';
export const PRODUCT_DELETE_SUCCESS = 'PRODUCT_DELETE_SUCCESS';
export const PRODUCT_DELETE_FAIL = 'PRODUCT_DELETE_FAIL';

export const IMAGE_SAVE_SUCCESS = 'IMAGE_SAVE_SUCCESS';
export const IMAGE_SAVE_REQUEST = 'IMAGE_SAVE_REQUEST';

// Cart

export const CART_ADD_ITEM = "CART_ADD_ITEM";
export const CART_REMOVE_ITEM = "CART_REMOVE_ITEM";
export const CART_UPDATE_ITEM = 'CART_UPDATE_ITEM';

// Users

export const USER_SIGNIN_REQUEST = "USER_SIGNIN_REQUEST";
export const USER_SIGNIN_SUCCESS = "USER_SIGNIN_SUCCESS";
export const USER_SIGNIN_FAIL = "USER_SIGNIN_FAIL";

export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAIL = "USER_REGISTER_FAIL";

export const USER_DELETE_REQUEST = "USER_DELETE_REQUEST";
export const USER_DELETE_SUCCESS = "USER_DELETE_SUCCESS";
export const USER_DELETE_FAIL = "USER_DELETE_FAIL";

export const USERS_LIST_REQUEST = "USER_LIST_REQUEST";
export const USERS_LIST_SUCCESS = "USER_LIST_SUCCESS";
export const USERS_LIST_FAIL = "USER_LIST_FAIL";

export const SAVE_ZONE_ADDRESS = 'SAVE_ZONE_ADDRESS';
export const USER_SAVE_REQUEST = 'USER_SAVE_REQUEST';
export const USER_SAVE_SUCCESS = 'USER_SAVE_SUCCESS';
export const USER_SAVE_FAIL = 'USER_SAVE_FAIL';
export const USER_ACTIVATION_SUCCESS = 'USER_ACTIVATION_SUCCESS';
export const CLEAR_SAVE_USER = 'CLEAR_SAVE_USER'

export const USER_DETAILS_REQUEST = 'USER_DETAILS_REQUEST';
export const USER_DETAILS_SUCCESS = 'USER_DETAILS_SUCCESS';
export const USER_DETAILS_FAIL = 'USER_DETAILS_FAIL';

// Payment Methods

export const PAYMENT_LIST_SUCCESS = 'PAYMENT_LIST_SUCCESS';
export const PAYMENT_LIST_REQUEST = 'PAYMENT_LIST_REQUEST';
export const PAYMENT_LIST_FAIL = 'PAYMENT_LIST_FAIL';

export const PAYMENT_SAVE_REQUEST = 'PAYMENT_SAVE_REQUEST';
export const PAYMENT_SAVE_SUCCESS = 'PAYMENT_SAVE_SUCCESS';
export const PAYMENT_SAVE_FAIL = 'PAYMENT_SAVE_FAIL';
export const PAYMENT_ACTIVATION_SUCCESS = 'PAYMENT_ACTIVATION_SUCCESS';

export const PAYMENT_DELETE_REQUEST = 'PAYMENT_DELETE_REQUEST';
export const PAYMENT_DELETE_SUCCESS = 'PAYMENT_DELETE_SUCCESS';
export const PAYMENT_DELETE_FAIL = 'PAYMENT_DELETE_FAIL';

// Category

export const CATEGORY_LIST_SUCCESS = 'CATEGORY_LIST_SUCCESS';
export const CATEGORY_LIST_REQUEST = 'CATEGORY_LIST_REQUEST';
export const CATEGORY_LIST_FAIL = 'CATEGORY_LIST_FAIL';

export const CATEGORY_SAVE_REQUEST = 'CATEGORY_SAVE_REQUEST';
export const CATEGORY_SAVE_SUCCESS = 'CATEGORY_SAVE_SUCCESS';
export const CATEGORY_ACTIVATION_SUCCESS = 'CATEGORY_ACTIVATION_SUCCESS';
export const CATEGORY_SAVE_FAIL = 'CATEGORY_SAVE_FAIL';

export const CATEGORY_DELETE_REQUEST = 'CATEGORY_DELETE_REQUEST';
export const CATEGORY_DELETE_SUCCESS = 'CATEGORY_DELETE_SUCCESS';
export const CATEGORY_DELETE_FAIL = 'CATEGORY_DELETE_FAIL';

// Brand

export const BRAND_LIST_SUCCESS = 'BRAND_LIST_SUCCESS';
export const BRAND_LIST_REQUEST = 'BRAND_LIST_REQUEST';
export const BRAND_LIST_FAIL = 'BRAND_LIST_FAIL';

export const BRAND_SAVE_REQUEST = 'BRAND_SAVE_REQUEST';
export const BRAND_SAVE_SUCCESS = 'BRAND_SAVE_SUCCESS';
export const BRAND_SAVE_FAIL = 'BRAND_SAVE_FAIL';
export const BRAND_SAVE_CLEAR = 'BRAND_SAVE_CLEAR';

export const BRAND_DELETE_REQUEST = 'BRAND_DELETE_REQUEST';
export const BRAND_DELETE_SUCCESS = 'BRAND_DELETE_SUCCESS';
export const BRAND_DELETE_FAIL = 'BRAND_DELETE_FAIL';

export const TOGGLE_ORDER_SCREEN = 'TOGGLE_ORDER_SCREEN';
export const SAVE_PAYMENT_METHOD = 'SAVE_PAYMENT_METHOD';

// Unit

export const UNIT_LIST_REQUEST = 'UNIT_LIST_REQUEST';
export const UNIT_LIST_SUCCESS = 'UNIT_LIST_SUCCESS';
export const UNIT_LIST_FAIL = 'UNIT_LIST_FAIL';

export const UNIT_SAVE_REQUEST = 'UNIT_SAVE_REQUEST';
export const UNIT_SAVE_SUCCESS = 'UNIT_SAVE_SUCCESS';
export const UNIT_SAVE_FAIL = 'UNIT_SAVE_FAIL';

// Zone

export const ZONE_LIST_SUCCESS = 'ZONE_LIST_SUCCESS';
export const ZONE_LIST_REQUEST = 'ZONE_LIST_REQUEST';
export const ZONE_LIST_FAIL = 'ZONE_LIST_FAIL';

export const ZONE_SAVE_REQUEST = 'ZONE_SAVE_REQUEST';
export const ZONE_SAVE_SUCCESS = 'ZONE_SAVE_SUCCESS';
export const ZONE_SAVE_FAIL = 'ZONE_SAVE_FAIL';
export const ZONE_ACTIVATION_SUCCESS = 'ZONE_ACTIVATION_SUCCESS';

export const ZONE_DELETE_REQUEST = 'ZONE_DELETE_REQUEST';
export const ZONE_DELETE_SUCCESS = 'ZONE_DELETE_SUCCESS';
export const ZONE_DELETE_FAIL = 'ZONE_DELETE_FAIL';

// Delivery

export const DELIVERY_LIST_SUCCESS = 'DELIVERY_LIST_SUCCESS';
export const DELIVERY_LIST_REQUEST = 'DELIVERY_LIST_REQUEST';
export const DELIVERY_LIST_FAIL = 'DELIVERY_LIST_FAIL';

export const DELIVERY_SAVE_REQUEST = 'DELIVERY_SAVE_REQUEST';
export const DELIVERY_SAVE_SUCCESS = 'DELIVERY_SAVE_SUCCESS';
export const DELIVERY_SAVE_FAIL = 'DELIVERY_SAVE_FAIL';
export const DELIVERY_ACTIVATION_SUCCESS = 'DELIVERY_ACTIVATION_SUCCESS';

export const DELIVERY_DELETE_REQUEST = 'DELIVERY_DELETE_REQUEST';
export const DELIVERY_DELETE_SUCCESS = 'DELIVERY_DELETE_SUCCESS';
export const DELIVERY_DELETE_FAIL = 'DELIVERY_DELETE_FAIL';

// Order

export const SAVE_DELIVERY_ADDRESS = 'SAVE_DELIVERY_ADDRESS'
export const ORDER_LIST_SUCCESS = 'ORDER_LIST_SUCCESS'
export const ORDER_LIST_FAIL = 'ORDER_LIST_FAIL'
export const ORDER_LIST_REQUEST = 'ORDER_LIST_REQUEST'

// Employee

export const EMPLOYEE_LIST_SUCCESS = 'EMPLOYEE_LIST_SUCCESS'
export const EMPLOYEE_LIST_FAIL = 'EMPLOYEE_LIST_FAIL'
export const EMPLOYEE_LIST_REQUEST = 'EMPLOYEE_LIST_REQUEST'
export const EMPLOYEE_SAVE_FAIL = 'EMPLOYEE_SAVE_FAIL'
export const EMPLOYEE_SAVE_SUCCESS = 'EMPLOYEE_SAVE_SUCCESS'
export const EMPLOYEE_SAVE_REQUEST = 'EMPLOYEE_SAVE_REQUEST'
export const EMPLOYEE_SAVE_CLEAR = 'EMPLOYEE_SAVE_CLEAR'
export const EMPLOYEE_DELETE_REQUEST = 'EMPLOYEE_DELETE_REQUEST'
export const EMPLOYEE_DELETE_SUCCESS = 'EMPLOYEE_DELETE_SUCCESS'
export const EMPLOYEE_DELETE_FAIL = 'EMPLOYEE_DELETE_FAIL'
export const EMPLOYEE_DETAILS_REQUEST = 'EMPLOYEE_DETAILS_REQUEST'
export const EMPLOYEE_DETAILS_SUCCESS = 'EMPLOYEE_DETAILS_SUCCESS'
export const EMPLOYEE_DETAILS_FAIL = 'EMPLOYEE_DETAILS_FAIL'

// Attendance

export const ATTENDANCE_LIST_SUCCESS = 'ATTENDANCE_LIST_SUCCESS'
export const ATTENDANCE_LIST_FAIL = 'ATTENDANCE_LIST_FAIL'
export const ATTENDANCE_LIST_REQUEST = 'ATTENDANCE_LIST_REQUEST'
export const ATTENDANCE_SAVE_FAIL = 'ATTENDANCE_SAVE_FAIL'
export const ATTENDANCE_SAVE_SUCCESS = 'ATTENDANCE_SAVE_SUCCESS'
export const ATTENDANCE_SAVE_REQUEST = 'ATTENDANCE_SAVE_REQUEST'
export const ATTENDANCE_DELETE_REQUEST = 'ATTENDANCE_DELETE_REQUEST'
export const ATTENDANCE_DELETE_SUCCESS = 'ATTENDANCE_DELETE_SUCCESS'
export const ATTENDANCE_DELETE_FAIL = 'ATTENDANCE_DELETE_FAIL'
export const ATTENDANCE_DETAILS_REQUEST = 'ATTENDANCE_DETAILS_REQUEST'
export const ATTENDANCE_DETAILS_SUCCESS = 'ATTENDANCE_DETAILS_SUCCESS'
export const ATTENDANCE_DETAILS_FAIL = 'ATTENDANCE_DETAILS_FAIL'
export const ATTENDANCE_SAVE_CLEAR = 'ATTENDANCE_SAVE_CLEAR'

// Assignment

export const ASSIGNMENT_LIST_SUCCESS = 'ASSIGNMENT_LIST_SUCCESS'
export const ASSIGNMENT_LIST_FAIL = 'ASSIGNMENT_LIST_FAIL'
export const ASSIGNMENT_LIST_REQUEST = 'ASSIGNMENT_LIST_REQUEST'
export const ASSIGNMENT_SAVE_FAIL = 'ASSIGNMENT_SAVE_FAIL'
export const ASSIGNMENT_SAVE_SUCCESS = 'ASSIGNMENT_SAVE_SUCCESS'
export const ASSIGNMENT_SAVE_REQUEST = 'ASSIGNMENT_SAVE_REQUEST'
export const ASSIGNMENT_DELETE_REQUEST = 'ASSIGNMENT_DELETE_REQUEST'
export const ASSIGNMENT_DELETE_SUCCESS = 'ASSIGNMENT_DELETE_SUCCESS'
export const ASSIGNMENT_DELETE_FAIL = 'ASSIGNMENT_DELETE_FAIL'
export const ASSIGNMENT_DETAILS_REQUEST = 'ASSIGNMENT_DETAILS_REQUEST'
export const ASSIGNMENT_DETAILS_SUCCESS = 'ASSIGNMENT_DETAILS_SUCCESS'
export const ASSIGNMENT_DETAILS_FAIL = 'ASSIGNMENT_DETAILS_FAIL'

// Reviews

export const REVIEW_LIST_SUCCESS = 'REVIEW_LIST_SUCCESS'
export const REVIEW_LIST_FAIL = 'REVIEW_LIST_FAIL'
export const REVIEW_LIST_REQUEST = 'REVIEW_LIST_REQUEST'
export const REVIEW_SAVE_FAIL = 'REVIEW_SAVE_FAIL'
export const REVIEW_SAVE_SUCCESS = 'REVIEW_SAVE_SUCCESS'
export const REVIEW_SAVE_REQUEST = 'REVIEW_SAVE_REQUEST'
export const REVIEW_DELETE_REQUEST = 'REVIEW_DELETE_REQUEST'
export const REVIEW_DELETE_SUCCESS = 'REVIEW_DELETE_SUCCESS'
export const REVIEW_DELETE_FAIL = 'REVIEW_DELETE_FAIL'
export const REVIEW_DETAILS_REQUEST = 'REVIEW_DETAILS_REQUEST'
export const REVIEW_DETAILS_SUCCESS = 'REVIEW_DETAILS_SUCCESS'
export const REVIEW_DETAILS_FAIL = 'REVIEW_DETAILS_FAIL'

// Chat

export const CHAT_LIST_SUCCESS = 'CHAT_LIST_SUCCESS'
export const CHAT_LIST_FAIL = 'CHAT_LIST_FAIL'
export const CHAT_LIST_REQUEST = 'CHAT_LIST_REQUEST'
export const CHAT_SAVE_FAIL = 'CHAT_SAVE_FAIL'
export const CHAT_SAVE_SUCCESS = 'CHAT_SAVE_SUCCESS'
export const CHAT_SAVE_REQUEST = 'CHAT_SAVE_REQUEST'
export const CLEAR_CHAT_SAVE = 'CLEAR_CHAT_SAVE'
export const CHAT_DELETE_REQUEST = 'CHAT_DELETE_REQUEST'
export const CHAT_DELETE_SUCCESS = 'CHAT_DELETE_SUCCESS'
export const CHAT_DELETE_FAIL = 'CHAT_DELETE_FAIL'
export const CHAT_DETAILS_REQUEST = 'CHAT_DETAILS_REQUEST'
export const CHAT_DETAILS_SUCCESS = 'CHAT_DETAILS_SUCCESS'
export const CHAT_DETAILS_FAIL = 'CHAT_DETAILS_FAIL'
export const CLEAR_CHAT_DETAILS = 'CLEAR_CHAT_DETAILS'

// live chat

export const LIVE_USER_LIST_SUCCESS = 'LIVE_USER_LIST_SUCCESS'
export const LIVE_USER_LIST_FAIL = 'LIVE_USER_LIST_FAIL'
export const LIVE_USER_LIST_REQUEST = 'LIVE_USER_LIST_REQUEST'
export const LIVE_USER_SAVE_FAIL = 'LIVE_USER_SAVE_FAIL'
export const LIVE_USER_SAVE_SUCCESS = 'LIVE_USER_SAVE_SUCCESS'
export const PASS_LIVE_USER = 'PASS_LIVE_USER'
export const LIVE_USER_SAVE_REQUEST = 'LIVE_USER_SAVE_REQUEST'
export const LIVE_USER_DELETE_REQUEST = 'LIVE_USER_DELETE_REQUEST'
export const LIVE_USER_DELETE_SUCCESS = 'LIVE_USER_DELETE_SUCCESS'
export const LIVE_USER_DELETE_FAIL = 'LIVE_USER_DELETE_FAIL'
export const LIVE_USER_DETAILS_REQUEST = 'LIVE_USER_DETAILS_REQUEST'
export const LIVE_USER_DETAILS_SUCCESS = 'LIVE_USER_DETAILS_SUCCESS'
export const LIVE_USER_DETAILS_FAIL = 'LIVE_USER_DETAILS_FAIL'
export const CLEAR_LIVE_USER_DETAILS = 'CLEAR_LIVE_USER_DETAILS'
export const CLEAR_LIVE_USER_LIST = 'CLEAR_LIVE_USER_LIST'
export const CLEAR_LIVE_USER_SAVE = 'CLEAR_LIVE_USER_SAVE'