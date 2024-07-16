//данные формы регистрции
import styles from './Registration.module.css'
import ModalRegistration from '../UI/ModalRegistration'

const Registration = (props) => {

    return <ModalRegistration onHideRegistration={props.onHideRegistration}>
    <div className={styles['new-registration__controls']}>
        <div className={styles['new-registration__control']}>
            <label>Электронная почта</label>
            <input type="text"/>
        </div>
        <div className={styles['new-registration__control']}>
            <label>Имя</label>
            <input type="text"/>
        </div>
        <div className={styles['new-registration__control']}>
            <label>Пароль</label>
            <input type="text"/>
        </div>
    </div>
    <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={props.onHideRegistration}>Войти</button>
    </div>
            </ModalRegistration>
};

export default Registration;