import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import cookie from "js-cookie";
import { clockReducer, timeReducer } from './reducers/timeReducer'
import {
  productListReducer,
  productDetailsReducer,
  productSaveReducer,
  productDeleteReducer,
} from "./reducers/productReducers";

import {
  slidesReducer
} from "./reducers/slidesReducer";

import {
  assignmentListReducer,
  assignmentDetailsReducer,
  assignmentSaveReducer,
  assignmentDeleteReducer,
} from "./reducers/assignmentReducer";

import {
  chatListReducer,
  chatDetailsReducer,
  chatSaveReducer,
  chatDeleteReducer,
  liveUserListReducer,
  liveUserSaveReducer,
  liveUserDeleteReducer,
  liveUserDetailsReducer,
} from "./reducers/chatReducer";

import {
  attendanceListReducer,
  attendanceDetailsReducer,
  attendanceSaveReducer,
  attendanceDeleteReducer,
} from "./reducers/attendanceReducer";

import {
  employeeListReducer,
  employeeDetailsReducer,
  employeeSaveReducer,
  employeeDeleteReducer,
} from "./reducers/employeeReducer";

import { cartReducer, packedReducer } from "./reducers/cartReducer";

import {
  addressReducer,
  paymentMethodReducer,
  orderScreenReducer,
  orderListReducer,
  orderSaveReducer,
  orderDeleteReducer,
  orderDetailsReducer,
  storedOrderListReducer
} from "./reducers/orderReducer";

import {
  usersListReducer,
  userDeleteReducer,
  userSigninReducer,
  userRegisterReducer,
  userSaveReducer,
  userDetailsReducer,
} from "./reducers/userReducers";

import {
  categoryListReducer,
  categorySaveReducer,
  categoryDeleteReducer,
} from "./reducers/categoryReducer";

import {
  brandListReducer,
  brandSaveReducer,
  brandDeleteReducer,
} from "./reducers/brandReducer";

import {
  zoneListReducer,
  zoneSaveReducer,
  zoneDeleteReducer,
} from "./reducers/zoneReducer";

import {
  paymentListReducer,
  paymentSaveReducer,
  paymentDeleteReducer,
} from "./reducers/paymentReducer";

import {
  deliveryListReducer,
  deliverySaveReducer,
  deliveryDeleteReducer,
} from "./reducers/deliveryReducer";

import {
  reviewListReducer,
  reviewDetailsReducer,
  reviewSaveReducer,
  reviewDeleteReducer,
} from "./reducers/reviewReducer";

import {
  controlsReducer,
  controlsSaveReducer,
  actions,
} from "./reducers/controlsReducer"

import { viewsReducer } from './reducers/viewsReducer'
import {
  stylesReducer,
  stylesSaveReducer
} from "./reducers/stylesReducer";

const cartItems = cookie.getJSON("cartItems") || []
const userInfo = cookie.getJSON("userInfo") || {}
const address = cookie.getJSON("address") || undefined
const paymentMethod = cookie.getJSON("paymentMethod") || undefined
const packedItems = JSON.parse(localStorage.getItem('packedItems')) || []

const initialState = {
  cart: { cartItems },
  userSignin: { userInfo },
  address: { address },
  paymentMethod: { paymentMethod },
  packed: { packedItems },
}

const reducer = combineReducers({
  actions: actions,
  views: viewsReducer,
  time: timeReducer,
  clock: clockReducer,

  controls: controlsReducer,
  controlSave: controlsSaveReducer,
  styles: stylesReducer,
  stylesSave: stylesSaveReducer,

  productList: productListReducer,
  productDetails: productDetailsReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer,

  slides: slidesReducer,

  cart: cartReducer,
  packed: packedReducer,

  usersList: usersListReducer,
  userDelete: userDeleteReducer,
  userSave: userSaveReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,

  address: addressReducer,

  paymentMethod: paymentMethodReducer,

  categoryList: categoryListReducer,
  categorySave: categorySaveReducer,
  categoryDelete: categoryDeleteReducer,

  brandList: brandListReducer,
  brandSave: brandSaveReducer,
  brandDelete: brandDeleteReducer,

  zoneList: zoneListReducer,
  zoneSave: zoneSaveReducer,
  zoneDelete: zoneDeleteReducer,

  deliveryList: deliveryListReducer,
  deliverySave: deliverySaveReducer,
  deliveryDelete: deliveryDeleteReducer,

  paymentList: paymentListReducer,
  paymentSave: paymentSaveReducer,
  paymentDelete: paymentDeleteReducer,

  orderScreen: orderScreenReducer,
  orderList: orderListReducer,
  orderSave: orderSaveReducer,
  orderDelete: orderDeleteReducer,
  orderDetails: orderDetailsReducer,
  storedActiveOrders: storedOrderListReducer,

  employeeList: employeeListReducer,
  employeeDetails: employeeDetailsReducer,
  employeeSave: employeeSaveReducer,
  employeeDelete: employeeDeleteReducer,

  assignmentList: assignmentListReducer,
  assignmentDetails: assignmentDetailsReducer,
  assignmentSave: assignmentSaveReducer,
  assignmentDelete: assignmentDeleteReducer,

  attendanceList: attendanceListReducer,
  attendanceDetails: attendanceDetailsReducer,
  attendanceSave: attendanceSaveReducer,
  attendanceDelete: attendanceDeleteReducer,

  reviewList: reviewListReducer,
  reviewDetails: reviewDetailsReducer,
  reviewSave: reviewSaveReducer,
  reviewDelete: reviewDeleteReducer,

  chatList: chatListReducer,
  chatDetails: chatDetailsReducer,
  chatSave: chatSaveReducer,
  chatDelete: chatDeleteReducer,

  liveUserList: liveUserListReducer,
  liveUserSave: liveUserSaveReducer,
  liveUserDelete: liveUserDeleteReducer,
  liveUserDetails: liveUserDetailsReducer,
});


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  // allows us to run async operation inside action in the redux
  composeEnhancer(applyMiddleware(thunk))
)

export default store
