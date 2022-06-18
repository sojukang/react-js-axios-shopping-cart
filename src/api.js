import axios from "axios";

export async function getProducts() {
    const response = await axios.get(
        'http://13.209.50.192:8080/api/products/'
    );
    return response.data;
}

export async function getProduct(id) {
    const response = await axios.get(
        `http://13.209.50.192:8080/api/products/${id}`
    );
    return response.data;
}