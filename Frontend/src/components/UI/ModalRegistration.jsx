//страница модального окна
import styles from './ModalRegistration.module.css';
import React from 'react';
import ReactDOM from 'react-dom'

//фон, который покрывает всю страницу
const BackdropRegistration = (props) => {
    return <div className={styles.backdrop} onClick={props.onHideRegistration}></div>
};
//модальное окно
const ModalWindowRegistration = (props) => {
    return (
    <div className={styles.modal}>
        <div className={styles.content}>{props.children}</div>
    </div>
    );
};

const portalElementRegistration = document.getElementById('overlays');

const ModalRegistration = (props) => {
    return (
    <React.Fragment>
        {ReactDOM.createPortal(<BackdropRegistration onHideRegistration={props.onHideRegistration}/>, portalElementRegistration)}
        {ReactDOM.createPortal(<ModalWindowRegistration>{props.children}</ModalWindowRegistration>, portalElementRegistration)}
    </React.Fragment>
    );
};
export default ModalRegistration; 