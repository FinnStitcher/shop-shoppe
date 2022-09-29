import React, {createContext, useContext} from 'react';
import {useProductReducer} from './reducers';

// making the context object
const StoreContext = createContext();
// pulling the provider component out
// we'll wrap the entire application in Provider to get our data around
const {Provider} = StoreContext;
// remember apollo provider?

// value is there if we need to provide more data for whatever reason
const StoreProvider = ({ value = [], ...props }) => {
    // instantiating the global state
    // state = most up-to-date version of it
    // dispatch = action object
    const [state, dispatch] = useProductReducer({
        products: [], // products = what is currently being displayed on the page
        categories: [],
        currentCategory: '',
        cartOpen: false,
        cart: []
    });

    // once useProductReducer has returned the updated state and dispatch, we feed them into Provider so it can do its thing
    return <Provider value={[state, dispatch]} {...props} />
};

const useStoreContext = () => {
    return useContext(StoreContext);
};
// useStoreContext will return the state and dispatch established up there ^
// no idea how this all works but ok!

export {StoreProvider, useStoreContext};