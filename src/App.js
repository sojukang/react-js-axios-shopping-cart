import React from "react";
import Products from "./Products";
import {ProductsProvider} from "./ProductsContext";

function App() {
    return (
        <ProductsProvider>
            <Products/>
        </ProductsProvider>
    )
}

export default App;
