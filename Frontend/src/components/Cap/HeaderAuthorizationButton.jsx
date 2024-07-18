//Компонент кнопки авторизации
import { useEffect, useState } from 'react';
import styles from './HeaderAuthorizationButton.module.css'

const HeaderAuthorizationButton = (props) => {
    const [isButtonAnimated, setIsButtonAnimated] = useState(false);


//анимация кнопки
const buttonClasses = `${styles.button} ${isButtonAnimated ? styles.bump : ''}`;

useEffect(() => {


    const timer = setTimeout(() => {
        setIsButtonAnimated(false);
    }, 300);
})

    return (<button className={buttonClasses} onClick={props.onClick}> 
        <span>Авторизация</span>
            </button>);
};

export default HeaderAuthorizationButton;