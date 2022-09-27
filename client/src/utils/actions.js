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