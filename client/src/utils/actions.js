export const UPDATE_PRODUCTS = "UPDATE_PRODUCTS";
// used by ProductList component
// store product data
// will also enable offline retrieval of product data

export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
// store category data

export const UPDATE_CURRENT_CATEGORY = "UPDATE_CURRENT_CATEGORY";
// connect previous two actions
// select category from state created by UPDATE_CATEGORIE
// display products for that category from the list made by UPDATE_PRODUCTS

export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_MULTIPLE_TO_CART = 'ADD_MULTIPLE_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';
export const TOGGLE_CART = 'TOGGLE_CART';