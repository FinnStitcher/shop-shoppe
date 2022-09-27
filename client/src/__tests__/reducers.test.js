import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY
} from '../utils/actions';
import {reducer} from '../utils/reducers';

// we can get away with having this universal object bc we're doing immutable objects
const initialState = {
    products: [],
    categories: [{ name: 'Food' }],
    currentCategory: '1'
};

// reducer() takes two params:
// - the current state
// - an object with the type of action we want to perform (predefined), and a value (here 'products') that contains the new data

test('UPDATE_PRODUCTS', () => {
    let newState = reducer(initialState, {
        type: UPDATE_PRODUCTS,
        products: [{}, {}]
    });

    expect(newState.products.length).toBe(2);
    expect(initialState.products.length).toBe(0);
});

test('UPDATE_CATEGORIES', () => {
    let newState = reducer(initialState, {
        type: UPDATE_CATEGORIES,
        categories: [{}, {}]
    });

    expect(newState.categories.length).toBe(2);
    expect(initialState.categories.length).toBe(1);
});

test('UPDATE_CURRENT_CATEGORY', () => {
    let newState = reducer(initialState, {
        type: UPDATE_CURRENT_CATEGORY,
        currentCategory: '2'
    });

    expect(newState.currentCategory).toBe('2');
    expect(initialState.currentCategory).toBe('1');
});