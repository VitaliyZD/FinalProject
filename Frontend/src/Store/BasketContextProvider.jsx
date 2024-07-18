//управление данными контекста корзины
import { useReducer } from "react";//управление состоянием для непростой логики
import BasketContext from "./Basket-context";
//Состояние корзины по умолчанию
const defaultBasketState = {
    items: [],
    totalAmount: 0,
}
//возвращаем новое состояние
const basketReducer = (state, action) => {
    if(action.type === 'ADD_ITEM') {
//обновленная итоговая сумма
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount
        
//индекс существующего элемента корзины
        const existingBasketItemIndex = state.items.findIndex(item => {
//получаем элемент на данном шаге перебора === 
//получаем ID элемент, который добавляется в корзину
            return item.id === action.item.id;
        })
//здесь будет существующий элемент корзины или null
        const existingBasketItem = state.items[existingBasketItemIndex]

        let updatedItem;//обновленный элемент
        let updatedItems;
//если не null, то есть элемент есть в корзине
        if(existingBasketItem) {
//помещаем новый объект, который имеет все свойства из existingBasketItem
            updatedItem = {
                ...existingBasketItem,
                //изменяем количество
                amount: existingBasketItem.amount + action.item.amount,
            }
//помещаем копию существующего массива items
            updatedItems = [...state.items]
//помещаем новый элемент, который есть в updatedItem
            updatedItems[existingBasketItemIndex] = updatedItem;
        } else {
//если новый элемент, то updatedItem имеет другое значение
            updatedItem = {
                ...action.item
            }
            updatedItems = state.items.concat(updatedItem);
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }
    }
//логика удаления элемента из корзины
    if(action.type === 'REMOVE_ITEM') {
        
        const existingBasketItemIndex = state.items.findIndex((item) => {
            return item.id === action.id;
        });
        const existingBasketItem = state.items[existingBasketItemIndex];
        const updatedTotalAmount = state.totalAmount - existingBasketItem.price;
        let updatedItems;
//когда кол-во элементов равно 1, мы удаляем весь элемент с корзины
        if(existingBasketItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id)
        } else {
//когда количество элементов больше 1, мы не удаляем элемент, а уменьшаеи количество в корзине
            const updatedItem = {...existingBasketItem, amount: existingBasketItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingBasketItemIndex] = updatedItem;
        };
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }
    }
    return defaultBasketState;
}

const BasketContextProvider = (props) =>{
//последнее состояние корзины, отправка корзины - действие
    const [basketState, dispatchBasketAction] = useReducer(basketReducer, defaultBasketState)

//работаем с элементом и добавляем в корзину
    const addItemHandler = (item) => {
        dispatchBasketAction({
            type: 'ADD_ITEM',
            item: item,
        })
    }
    
//работаем с элементом и удаляем из корзины
    const removeItemHandler = (id) => {
        dispatchBasketAction({
            type: 'REMOVE_ITEM',
            id: id,
        })
    }
//данные корзины получаем из массива состояния
    const basketContext = {
        items: basketState.items,
        totalAmount: basketState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler
    }

    return <BasketContext.Provider value={basketContext}>{props.children}</BasketContext.Provider>
};

export default BasketContextProvider;