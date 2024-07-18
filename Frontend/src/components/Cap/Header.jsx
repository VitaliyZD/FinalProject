//Здесь компоненты шапки и фона, включая кнопки корзина. Сама корзина в Basket
import React, {useContext} from "react";
import background from '../../images/final.jpg';//фон страницы
import styles from './Header.module.css'
import HeaderBasketButton from "./HeaderBasketButton";
import HeaderRegistrationButton from "./HeaderRegistrationButton";
import HeaderAuthorizationButton from "./HeaderAuthorizationButton";
import Filter from "./Filter";
import UserContext from '../../Store/User-context';
import Logout from '../Logout/Logout';

const Header = (props) => {
    const userContext = useContext(UserContext);

    const сategoryСhangeHandler = (сategory) => {
        props.setSelectedCategory(сategory);
      };

    console.log(userContext)
    
    return (
    <React.Fragment>
        <header className={styles.header}>
            <h1>Team Pass</h1>
            <Filter сategory={props.selectedCategory} onChangeCategory={сategoryСhangeHandler}/>
            {userContext.isAuth && userContext?.user?.username ? (<div className={styles['header_right']}>
                Привет {userContext?.user?.username}
                <Logout />
                <HeaderBasketButton onClick={props.onShow}/>
            </div>) : (<>
                    <HeaderAuthorizationButton onClick={props.onShowAuthorization}/>
                    <HeaderRegistrationButton onClick={props.onShowRegistration}/>
                </>)}
        </header>
        <div className={styles['main-image']}>
            <img src={background} alt="Картинка фона"/>
        </div>
    </React.Fragment>
    );
};

export default Header;