import useAsync from "./useAsync";
import React from "react";
import axios from "axios";

async function getProduct(id) {
    const response = await axios.get(
        `http://13.209.50.192:8080/api/products/${id}`
    );
    return response.data;
}

function Product({id}) {
    const [state] = useAsync(() => getProduct(id), [id]);
    const {loading, data: product, error} = state;

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