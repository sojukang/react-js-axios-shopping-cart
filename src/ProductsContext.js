import React, {createContext, useContext, useReducer} from 'react';
import createAsyncDispatcher, {createAsyncHandler, initialAsyncState} from "./asyncActionUtils";
import * as api from "./api";

const initialState = {
    products: initialAsyncState,
    product: initialAsyncState
};

const productsHandler =createAsyncHandler('GET_PRODUCTS', 'products');
const productHandler =createAsyncHandler('GET_PRODUCT', 'product');

function productsReducer(state, action) {
    switch (action.type) {
        case 'GET_PRODUCTS':
        case 'GET_PRODUCTS_SUCCESS':
        case 'GET_PRODUCTS_ERROR':
            return productsHandler(state, action);
        case 'GET_PRODUCT':
        case 'GET_PRODUCT_SUCCESS':
        case 'GET_PRODUCT_ERROR':
            return productHandler(state, action);
        default:
            throw new Error(`Unhanded action type: ${action.type}`);
    }
}

const ProductsStateContext = createContext(null);
const ProductsDispatchContext = createContext(null);

export function ProductsProvider({children}) {
    const [state, dispatch] = useReducer(productsReducer, initialState);
    return (
        <ProductsStateContext.Provider value={state}>
            <ProductsDispatchContext.Provider value={dispatch}>
                {children}
            </ProductsDispatchContext.Provider>
        </ProductsStateContext.Provider>
    );
}

export function useProductsState() {
    const state = useContext(ProductsStateContext);
    if (!state) {
        throw new Error('Cannot find ProductsProvider');
    }
    return state;
}

export function useProductsDispatch() {
    const dispatch = useContext(ProductsDispatchContext);
    if (!dispatch) {
        throw new Error('Cannot find ProductsProvider');
    }
    return dispatch;
}

export const getProducts = createAsyncDispatcher('GET_PRODUCTS', api.getProducts);
export const getProduct = createAsyncDispatcher('GET_PRODUCT', api.getProduct);
