//данные формы регистрции
import styles from './Registration.module.css'
import ModalRegistration from '../UI/ModalRegistration'
import {useState} from 'react';
import $api from '../../http';

const Registration = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onClick = async () => {
        await $api.post('/user/registration', {username, password}).then((response) => {
            props.onHideRegistration();
        })
    }

    const onChangeUsername = (event) => {
        event.preventDefault();
        setUsername(event.target.value);
    }
    const onChangePassword = (event) => {
        event.preventDefault();
        setPassword(event.target.value);
    }

    return <ModalRegistration onHideRegistration={props.onHideRegistration}>
    <div className={styles['new-registration__controls']}>
        {/*<div className={styles['new-registration__control']}>*/}
        {/*    <label>Электронная почта</label>*/}
        {/*    <input type="text"/>*/}
        {/*</div>*/}
        <div className={styles['new-registration__control']}>
            <label>Имя</label>
            <input value={username} type="text" onChange={onChangeUsername}/>
        </div>
        <div className={styles['new-registration__control']}>
            <label>Пароль</label>
            <input value={password} onChange={onChangePassword} type="password"/>
        </div>
    </div>
    <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={onClick}>Зарегистрироваться</button>
    </div>
            </ModalRegistration>
};

export default Registration;