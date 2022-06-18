import React, {createContext, useContext, useReducer} from 'react';
import axios from "axios";

const initialState = {
    products: {
        loading: false,
        data: null,
        error: null
    },
    product: {
        loading: false,
        data: null,
        error: null
    }
};

const loadingState = {
    loading: true,
    data: null,
    error: null
};

const success = data => ({
    loading: false,
    data,
    error: null
});

const error = error => ({
    loading: false,
    data: null,
    error: error
});

function productsReducer(state, action) {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return {
                ...state,
                products: loadingState
            };
        case 'GET_PRODUCTS_SUCCESS':
            return {
                ...state,
                products: success(action.data)
            };
        case 'GET_PRODUCTS_ERROR':
            return {
                ...state,
                products: error(action.error)
            };
        case 'GET_PRODUCT':
            return {
                ...state,
                product: loadingState
            };
        case 'GET_PRODUCT_SUCCESS':
            return {
                ...state,
                product: success(action.data)
            };
        case 'GET_PRODUCT_ERROR':
            return {
                ...state,
                product: error(action.error)
            };
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

export async function getProducts(dispatch) {
    dispatch({type: 'GET_PRODUCTS'});
    try {
        const response = await axios.get(
            'http://13.209.50.192:8080/api/products/'
        );
        dispatch({type: 'GET_PRODUCTS_SUCCESS', data: response.data});
    } catch (e) {
        dispatch({type: 'GET_PRODUCTS_ERROR', error: e});
    }
}

export async function getProduct(dispatch, id) {
    dispatch({type: 'GET_PRODUCT'});
    try {
        const response = await axios.get(
            `http://13.209.50.192:8080/api/products/${id}`
        );
        dispatch({type: 'GET_PRODUCT_SUCCESS', data: response.data});
    } catch (e) {
        dispatch({type: 'GET_PRODUCT_ERROR', error: e});
    }
}