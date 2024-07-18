//Компонент кнопки Регистрация
import { useEffect, useState } from 'react';
import styles from './HeaderRegistrationButton.module.css'

const HeaderRegistrationButton = (props) => {
    const [isButtonAnimated, setIsButtonAnimated] = useState(false);


//анимация кнопки
const buttonClasses = `${styles.button} ${isButtonAnimated ? styles.bump : ''}`;

useEffect(() => {


    const timer = setTimeout(() => {
        setIsButtonAnimated(false);
    }, 300);
})

    return (<button className={buttonClasses} onClick={props.onClick}> 
        <span>Регистрация</span>
            </button>);
};

export default HeaderRegistrationButton;