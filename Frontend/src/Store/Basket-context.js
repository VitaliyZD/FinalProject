import React from "react";

//данные, которые не используются, но помогают автозаполнению кода
const BasketContext = React.createContext({
    items: [],
    totalAmount: 0,
    //функции, которые помогают обновлять контекст
    //помогает добавлять элемент
    addItem: (item) => {},
    //помогает удалять элемент
    removeItem: (id) => {},
});

export default BasketContext;