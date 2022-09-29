import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import {QUERY_PRODUCTS} from '../utils/queries';
import {UPDATE_PRODUCTS, UPDATE_CART_QUANTITY, REMOVE_FROM_CART, ADD_TO_CART} from '../utils/actions';
import {useStoreContext} from '../utils/GlobalState';

import spinner from '../assets/spinner.gif';
import Cart from '../components/Cart';

function Detail() {
    const {id} = useParams();
    const [currentProduct, setCurrentProduct] = useState({});

    const [state, dispatch] = useStoreContext();
    const {products, cart} = state;
    const {loading, data} = useQuery(QUERY_PRODUCTS);

    useEffect(() => {
        // first check if tehre's anything in the global products array, and find the current one in there
        if (products.length) {
            setCurrentProduct(products.find(product => product._id === id));
        } else if (data) {
            // if there's nothing in global state - that is, if you've never been here before, because state isn't the database! -
            // it gets all the product data to update global state
            // now there's something in the products array, and useEffect will ee it update and the first if statement will run
            dispatch({
                type: UPDATE_PRODUCTS,
                products: data.products
            });
        }
    }, [products, data, dispatch, id]);
    // watching for changes in:
    // - global products array
    // - database products array
    // - dispatch object, no idea how that works out here
    // - id in the url

    const addToCart = () => {
        const itemInCart = cart.find((cartItem) => cartItem._id === id);

        if (itemInCart) {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: id,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
        } else {
            dispatch({
                type: ADD_TO_CART,
                product: {
                    ...currentProduct,
                    purchaseQuantity: 1
                }
            });            
        }
    };

    const removeFromCart = () => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: currentProduct._id
        })
    }

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button
                disabled={!cart.find(p => p._id === currentProduct._id)}
                onClick={removeFromCart}
            >Remove from Cart</button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}

      <Cart />
    </>
  );
}

export default Detail;
