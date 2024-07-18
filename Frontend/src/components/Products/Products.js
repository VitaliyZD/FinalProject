//функциональность карточек товаров
import Text from "./Text";
import ProductList from "./ProductList";
import React from "react";

const Products = (props) => {
    return <React.Fragment>
        <Text />
        <ProductList selectedCategory={props.selectedCategory}/>
    </React.Fragment>
};

export default Products;