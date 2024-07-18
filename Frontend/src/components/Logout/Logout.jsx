//данные формы регистрции
import styles from './Logout.module.css'
import {useContext, useState} from 'react';
import $api from '../../http';
import UserContext from '../../Store/User-context';

const Logout = (props) => {
  const userContext = useContext(UserContext);

  const onClick = async () => {
    await $api.post('/user/logout').then((response) => {
      localStorage.removeItem('token');
      userContext.setAuth(false);
      userContext.setUser({});
    })
  }

  return (
    <div>
      <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={onClick}>Выйти</button>
      </div>
    </div>
    );
};

export default Logout;