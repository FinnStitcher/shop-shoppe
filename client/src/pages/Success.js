import React, { useEffect } from 'react';
import Jumbotron from '../components/Jumbotron';
import { useMutation } from '@apollo/client';

import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function Success() {
    const [addOrder] = useMutation(ADD_ORDER);

    useEffect(() => {
        async function saveOrder() {
            // getting everything from the idb cart store
            const cart = await idbPromise('cart', 'get');
            // turn it into an array of ids
            const products = cart.map(element => element._id);

            if (products.length) {
                // adding an order to the database
                const {data} = await addOrder({
                    variables: {products}
                });
                const productData = data.addOrder.products;

                // removing everything from the idb cart store
                productData.forEach(element => {
                    idbPromise('cart', 'delete', element);
                });
            }
        };

        saveOrder();

        setTimeout(() => {
            window.location.assign('/')
        }, 3000);
    }, [addOrder]);

    

    return (
      <div>
        <Jumbotron>
          <h1>Success!</h1>

          <h2>Thank you for your purchase!</h2>

          <h2>You will now be redirected to the homepage.</h2>
        </Jumbotron>
      </div>
    );
  };

export default Success;
