//функции внутри карточек товаров
import styles from './ProductItem.module.css';
import ProductItemForm from './ProductItemForm'
import { useContext } from 'react';
import BasketContext from '../../../Store/Basket-context';
import React from "react";

const ProductItem = (props) => {

    const basketContext = useContext(BasketContext);
    
    const formattedPrice = `${props.price.toFixed(0)}р`;

    const addToBasketHandler = (amount) => {
        basketContext.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price,
            img: props.img
        })
    }

    //4 div - форма для добавления товаров в корзину
    return <li className={styles.product}>
                <div className={styles.right}>  
                    <div><h3>{props.name}</h3></div>
                    <div className={styles.description}>{props.description}</div>
                    <div className={styles.price}>{formattedPrice}</div>
                    <div><ProductItemForm onAddToBasket={addToBasketHandler} id={props.id} /></div>
                </div>      
                    {/* <div>
                        <img src={props.img}
                        className={styles['product-image']} />
                    </div> */}
            </li>;
};
export default ProductItem;