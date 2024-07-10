//Компонент кнопки Корзина
import { useContext, useEffect, useState } from 'react';
import BasketContext from '../../Store/Basket-context';
import styles from './HeaderBasketButton.module.css'

const HeaderBasketButton = (props) => {
    const [isButtonAnimated, setIsButtonAnimated] = useState(false);

    const basketContext = useContext(BasketContext);

    const basketItemsNumber = basketContext.items.reduce((currentValue, item) =>{
        return currentValue + item.amount;
    }, 0)
//анимация кнопки
const buttonClasses = `${styles.button} ${isButtonAnimated ? styles.bump : ''}`;

useEffect(() => {
    if(basketContext.items.length === 0) {
        return;
    }
    setIsButtonAnimated(true);

    const timer = setTimeout(() => {
        setIsButtonAnimated(false);
    }, 300);
//функция очистки от таймера
        return () => {
            clearTimeout(timer)
        }
}, [basketContext.items])

    return (<button className={buttonClasses} onClick={props.onClick}> 
        <span>Корзина</span>
        <span className={styles.badge}>{basketItemsNumber}</span>
    </button>);
};

export default HeaderBasketButton;