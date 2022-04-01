import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import {
  productDetailReducer,
  productListReducer,
} from "./reducers/productReducers"
import { cartReducer } from "./reducers/cartReducers"
import {
  userDetailReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducers"
import { orderCreateReducer } from "./reducers/orderReducers"

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : []

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null

const shippingInfoFromStorage = localStorage.getItem("shippingInfo")
  ? JSON.parse(localStorage.getItem("shippingInfo"))
  : {}

const paymentInfoFromStorage = localStorage.getItem("paymentInfo")
  ? JSON.parse(localStorage.getItem("paymentInfo"))
  : ""

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetail: userDetailReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
})

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shipping: shippingInfoFromStorage,
    payment: paymentInfoFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
