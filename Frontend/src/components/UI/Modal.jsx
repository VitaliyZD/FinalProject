//страница модального окна
import styles from './Modal.module.css';
import React from 'react';
import ReactDOM from 'react-dom'

//фон, который покрывает всю страницу
const Backdrop = (props) => {
    return <div className={styles.backdrop} onClick={props.onHideBasket}></div>
};
//модальное окно
const ModalWindow = (props) => {
    return (
    <div className={styles.modal}>
        <div className={styles.content}>{props.children}</div>
    </div>
    );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
    return (
    <React.Fragment>
        {ReactDOM.createPortal(<Backdrop onHideBasket={props.onHideBasket}/>, portalElement)}
        {ReactDOM.createPortal(<ModalWindow>{props.children}</ModalWindow>, portalElement)}
    </React.Fragment>
    );
};
export default Modal; 