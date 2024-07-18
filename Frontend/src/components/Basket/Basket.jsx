//отображение всех элементов карзины
import styles from './Basket.module.css';
import Modal from '../UI/Modal'
import { useContext } from 'react';
import BasketContext from '../../Store/Basket-context';
import BasketItem from './BasketItem';

const Basket = (props) => {

    const basketContext = useContext(BasketContext);

    //отображение суммы ИТОГО
    const totalAmount = `${basketContext.totalAmount.toFixed(2)}р`;

    //кнопка ЗАКАЗАТЬ, если что-то есть в корзине
    const hasItems = basketContext.items.length > 0;

    //функция для добавления элементов из корзины
    const removeBasketItemHandler = (id) => {
        basketContext.removeItem(id);
    }
    //функция для удаления элементов из корзины
    const addBasketItemHandler = (item) => {
        basketContext.addItem({...item, amount: 1})
    }
    
    const basketItems = <ul className={styles['basket-items']}>
        {basketContext.items.map((item) => (
        <BasketItem 
        key={item.id} 
        name={item.name} 
        amount={item.amount} 
        price={item.price}
        onAdd={addBasketItemHandler.bind(null, item)}
        onRemove={removeBasketItemHandler.bind(null, item.id)}
        />
))}
</ul>;
    //прикликании на фон, корзина закрывается
    return <Modal onHideBasket={props.onHideBasket}>
        {basketItems}
    <div className={styles.total}>
        <span>Итого</span>
        <span>{totalAmount}</span>
    </div>
    <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={props.onHideBasket}>Закрыть</button>
        {hasItems && <button className={styles.button}>Заказать</button>}
    </div>
    </Modal>
};
export default Basket; 