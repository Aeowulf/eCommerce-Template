import axios from 'axios'
import { 
  CART_ADD_ITEM, 
  CART_REMOVE_ITEM, 
  CART_SAVE_SHIPPING_ADDRESS 
} from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty
    }
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
// Created "removeFromCart" action, takes in an ID, uses dispatch to dispatch the reducer, uses getState to get all non-removed items from cart to reset local storage

  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
    // "payload" is the data this action will use when dispatching the CART_REMOVE_ITEM reducer, specifically the ID of the product being removed
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  // Updates localStorage State now that dispatch has removed targeted item from cartItems
}

export const saveShippingAddress = (data) => (dispatch) => {  
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data
    })
  
    localStorage.setItem('shippingAddress', JSON.stringify(data))
  }