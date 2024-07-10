//Здесь компоненты шапки и фона, включая кнопки корзина. Сама корзина в Basket
import React from "react";
import background from '../../images/final.jpg';//фон страницы
import styles from './Header.module.css'
import HeaderBasketButton from "./HeaderBasketButton";

const Header = (props) => {
    return (
    <React.Fragment>
        <header className={styles.header}>
            <h1>Team Pass</h1>
            <HeaderBasketButton onClick={props.onShowBasket}/>
        </header>
        <div className={styles['main-image']}>
            <img src={background} alt="Картинка фона"/>
        </div>
    </React.Fragment>
    );
};

export default Header;