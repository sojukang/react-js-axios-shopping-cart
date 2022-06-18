import React, {useState} from 'react';
import Product from "./Product";
import {getProducts, useProductsDispatch, useProductsState} from "./ProductsContext";

function Products() {
    const [productId, setProductId] = useState(null);
    const state = useProductsState();
    const dispatch = useProductsDispatch();

    const {loading, data: products, error} = state.products;
    const fetchData = () => {
        getProducts(dispatch);
    };

    if (loading) return <div>로딩 중..</div>;
    if (error) return <div>에러가 발생했습니다.</div>;
    if (!products) return <button onClick={fetchData}>불러오기</button>

    return (
        <>
            <ul>
                {products.map(product => (
                    <li
                        key={product.productId}
                        onClick={() => setProductId(product.productId)}
                        style={{cursor: 'pointer'}}
                    >
                        {product.name}
                    </li>
                ))}
            </ul>
            <button onClick={fetchData}>다시 불러오기</button>
            {productId && <Product id={productId}/>}
        </>
    )
}

export default Products;