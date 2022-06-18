import React from 'react';
import axios from "axios";
import useAsync from "./useAsync";

async function getProducts() {
    const response = await axios.get(
        'http://13.209.50.192:8080/api/products/'
    );
    return response.data;
}

function Products() {
    const [state, refetch] = useAsync(getProducts, []);

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
            <button onClick={refetch}>다시 불러오기</button>
        </>
    )
}

export default Products;