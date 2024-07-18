//текст страницы
import styles from './Text.module.css';

const Text = () => {
    return <section className={styles.text}>
        <h2>Онлайн магазин товаров для спортивного туризма, альпинизма и скалолазания</h2>
        <p>Team Pass - магазин сертифицированного снаряжения, предназначенного для экстремальных 
            видов спорта, а также для промышленного альпинизма
        </p>
    </section>
};

export default Text;