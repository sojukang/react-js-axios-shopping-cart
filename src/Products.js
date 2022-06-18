import React, {useEffect, useReducer} from 'react';
import axios from "axios";

function reducer(state, action) {
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                data: null,
                error: null
            };
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null
            };
        case 'ERROR':
            return {
                loading: false,
                data: null,
                error: action.error
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

function Products() {
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: null
    });

    const fetchProducts = async () => {
        dispatch({type: 'LOADING'});
        try {
            const response = await axios.get(
                'http://13.209.50.192:8080/api/products/'
            );
            dispatch({type: 'SUCCESS', data: response.data});
        } catch (e) {
            dispatch({type: 'ERROR', error: e});
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const {loading, data: products, error} = state;

    if (loading) return <div>로딩 중..</div>;
    if (error) return <div>에러가 발생했습니다.</div>;
    if (!products) return null;

    return (
        <>
            <ul>
                {products.map(product => (
                    <li key={product.productId}>
                        {product.name}
                    </li>
                ))}
            </ul>
            <button onClick={fetchProducts}>다시 불러오기</button>
        </>
    )
}

export default Products;