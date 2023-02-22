import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') 
  ? JSON.parse(localStorage.getItem('cartItems')) 
  : []

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
}

const middleware = [thunk]

// const store = configureStore({
//   reducer,
//   initialState
// })

const store = configureStore({
  reducer, 
  preloadedState: initialState
})

export default store