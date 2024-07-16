//данные формы регистрции
import styles from './Authorization.module.css'
import ModalAuthorization from '../UI/ModalAuthorization'

const Authorization = (props) => {

    return <ModalAuthorization onHideRAuthorization={props.onHideAuthorization}>
    <div className={styles['new-authorization__controls']}>
        <div className={styles['new-authorization__control']}>
            <label>Электронная почта</label>
            <input type="text"/>
        </div>
        <div className={styles['new-authorization__control']}>
            <label>Придумайте имя</label>
            <input type="text"/>
        </div>
        <div className={styles['new-authorization__control']}>
            <label>Придумайте пароль</label>
            <input type="text"/>
        </div>
    </div>
    <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={props.onHideAuthorization}>Войти</button>
    </div>
            </ModalAuthorization>
};

export default Authorization;