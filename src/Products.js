import React, {useEffect, useState} from 'react';
import axios from "axios";

function Products() {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            setError(null);
            setProducts(null);
            setLoading(true);
            const response = await axios.get(
                'http://13.209.50.192:8080/api/products/'
            );
            setProducts(response.data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

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