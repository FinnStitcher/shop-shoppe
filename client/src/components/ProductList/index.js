import React, {useEffect} from 'react';
import { useQuery } from '@apollo/client';

import { QUERY_PRODUCTS } from '../../utils/queries';
import {UPDATE_PRODUCTS} from '../../utils/actions';
import {useStoreContext} from '../../utils/GlobalState';
import {idbPromise} from '../../utils/helpers';

import ProductItem from '../ProductItem';
import spinner from '../../assets/spinner.gif';

// displays products on main page

function ProductList() {
    const [state, dispatch] = useStoreContext();
    const {currentCategory} = state;
    const {loading, data} = useQuery(QUERY_PRODUCTS);

    // data = product data
    useEffect(() => {
        if (data) {
            // store in global state
            dispatch({
                type: UPDATE_PRODUCTS,
                products: data.products
            });

            // store with indexedDB for offline functionality
            data.products.forEach(product => {
                idbPromise('products', 'put', product);
            });
        } else if (!loading) {
            // if loading is undefined, we couldn't connect to the database
            idbPromise('products', 'get').then(products => {
                // run a fresh dispatch to maintain global state while offline
                dispatch({
                    type: UPDATE_PRODUCTS,
                    products
                });
            });
        }
    }, [data, loading, dispatch]);

    function filterProducts() {
        // if currentCategory is null, show everything
        if (!currentCategory) {
            return state.products;
        }

        return state.products.filter(product => product.category._id === currentCategory);
    };

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
