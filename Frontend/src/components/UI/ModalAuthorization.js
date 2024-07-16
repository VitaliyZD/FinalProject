//страница модального окна авторизации
import styles from './ModalAuthorization.module.css';
import React from 'react';
import ReactDOM from 'react-dom'

//фон, который покрывает всю страницу
const BackdropAuthorization = (props) => {
    return <div className={styles.backdrop} onClick={props.onHideAuthorization}></div>
};
//модальное окно авторизации
const ModalWindowAuthorization = (props) => {
    return (
    <div className={styles.modal}>
        <div className={styles.content}>{props.children}</div>
    </div>
    );
};

const portalElementAuthorization = document.getElementById('overlays3');

const ModalAuthorization = (props) => {
    return (
    <React.Fragment>
        {ReactDOM.createPortal(<BackdropAuthorization 
        onHideAuthorization={props.onHideAuthorization}/>, portalElementAuthorization)}
        {ReactDOM.createPortal(<ModalWindowAuthorization>{props.children}</ModalWindowAuthorization>, 
        portalElementAuthorization)}
    </React.Fragment>
    );
};
export default ModalAuthorization; 