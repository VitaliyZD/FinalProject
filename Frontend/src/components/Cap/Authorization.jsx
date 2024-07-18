//данные формы регистрции
import styles from './Authorization.module.css'
import ModalAuthorization from '../UI/ModalAuthorization'
import {useContext, useState} from 'react';
import $api from '../../http';
import UserContext from '../../Store/User-context';

const Authorization = (props) => {
    const userContext = useContext(UserContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onChangeUsername = (event) => {
        event.preventDefault();
        setUsername(event.target.value);
    }
    const onChangePassword = (event) => {
        event.preventDefault();
        setPassword(event.target.value);
    }

    const onClick = async () => {
        await $api.post('/user/login', {username, password}).then((response) => {
            localStorage.setItem('token', response.data.accessToken);
            userContext.setAuth(true);
            userContext.setUser(response.data.user);
            props.onHideAuthorization();
        })
    }

    return <ModalAuthorization onHideAuthorization={props.onHideAuthorization}>
    <div className={styles['new-authorization__controls']}>
        {/*<div className={styles['new-authorization__control']}>*/}
        {/*    <label>Электронная почта</label>*/}
        {/*    <input type="text"/>*/}
        {/*</div>*/}
        <div className={styles['new-authorization__control']}>
            <label>Имя</label>
            <input value={username} type="text" onChange={onChangeUsername}/>
        </div>
        <div className={styles['new-authorization__control']}>
            <label>Пароль</label>
            <input value={password} onChange={onChangePassword} type="password"/>
        </div>
    </div>
    <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={onClick}>Войти</button>
    </div>
            </ModalAuthorization>
};

export default Authorization;