// форма заказа
import { useRef, useState } from 'react' //для получения введенного количества
import Input from '../../UI/Input';
import styles from './ProductItemForm.module.css';

const ProductItemForm = (props) => {
    const [isAmountValid, setIsAmountValid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = (event) => {
        debugger;
        event.preventDefault();

        const inputAmount = amountInputRef.current.value;
        if(inputAmount.trim().length === 0 || +inputAmount < 1 || +inputAmount > 10) {
            setIsAmountValid(false)
            return ;
        }

        props.onAddToBasket(+inputAmount)
    }

    return (
    <form className={styles.form} onSubmit={submitHandler}>
        <Input 
        ref={amountInputRef}
        label='Количество' input={{
            id: props.id,
            type: 'number',
            min: '1',
            step: '1',
            defaultValue: '1',
        }}/>
        <button>Добавить</button>
        {!isAmountValid && <p>Пожалуйста, введите количество от 1 до 10</p>}
    </form>
    )
};
export default ProductItemForm; 