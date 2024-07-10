import React, {useState} from 'react';
import Header from './components/Cap/Header';
import Products from './components/Products/Products';
import Basket from './components/Basket/Basket';
import BasketContextProvider from './Store/BasketContextProvider';


function App() {

  const [basketIsVisible, setBasketIsVisible] = useState(false) // начальное состояние - окно не видно

  const showBasketHandler = () => {
    setBasketIsVisible(true)
  };

  const hideBasketHandler = () => {
    setBasketIsVisible(false)
  };

  return (
    <BasketContextProvider>
      {basketIsVisible && <Basket onHideBasket={hideBasketHandler} />}
      <Header onShowBasket={showBasketHandler}/>
      <main>
        <Products />
      </main>
    </BasketContextProvider>
  );
}

export default App;