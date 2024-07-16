//Здесь компоненты шапки и фона, включая кнопки корзина. Сама корзина в Basket
import React, { useState } from "react";
import background from '../../images/final.jpg';//фон страницы
import styles from './Header.module.css'
import HeaderBasketButton from "./HeaderBasketButton";
import HeaderRegistrationButton from "./HeaderRegistrationButton";
import HeaderAuthorizationButton from "./HeaderAuthorizationButton";
import Filter from "./Filter";

const Header = (props) => {

    const [selectedCategory, setSelectedCategory] = useState('Веревки');
    
    const сategoryСhangeHandler = (сategory) => {
        setSelectedCategory(сategory);
      };

    //   const filteredProducts = props.products.filter(product => {
    //     return product.type === selectedCategory;
    //   })
    
    return (
    <React.Fragment>
        <header className={styles.header}>
            <h1>Team Pass</h1>
            <Filter сategory={selectedCategory} onChangeCategory={сategoryСhangeHandler}/>
            <HeaderAuthorizationButton onClick={props.onShowAuthorization}/>
            <HeaderRegistrationButton onClick={props.onShowRegistration}/>
            <HeaderBasketButton onClick={props.onShow}/>
        </header>
        <div className={styles['main-image']}>
            <img src={background} alt="Картинка фона"/>
        </div>
    </React.Fragment>
    );
};

export default Header;