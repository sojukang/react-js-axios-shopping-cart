import React, {useEffect} from "react";
import {getProduct, useProductsDispatch, useProductsState} from "./ProductsContext";

function Product({id}) {
    const state = useProductsState();
    const dispatch = useProductsDispatch();

    useEffect(() => {
        getProduct(dispatch, id);
    }, [dispatch, id]);

    const {data: product, loading, error} = state.product;

    if (loading) return <div>로딩 중..</div>;
    if (error) return <div>에러가 발생했습니다.</div>;
    if (!product) return null;

    return (
        <div>
            <h2>{product.productId}</h2>
            <p>
                <b>Product name: </b> {product.name}
            </p>
        </div>
    );
}

export default Product;