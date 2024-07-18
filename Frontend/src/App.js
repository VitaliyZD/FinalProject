import React, {useState} from 'react';
import Header from './components/Cap/Header';
import Products from './components/Products/Products';
import Basket from './components/Basket/Basket';
import BasketContextProvider from './Store/BasketContextProvider';
import Registration from './components/Cap/Registration';
import Authorization from './components/Cap/Authorization';



function App() {

  const [basketIsVisible, setBasketIsVisible] = useState(false) 
  // начальное состояние - окно не видно
  const showBasketHandler = () => {
    setBasketIsVisible(true)
  };
  const hideBasketHandler = () => {
    setBasketIsVisible(false)
  };

  const [registrationIsVisible, setRegistrationIsVisible] = useState(false) 
  // начальное состояние - окно не видно
  const showRegistrationHandler = () => {
    setRegistrationIsVisible(true)
  };
  const hideRegistrationHandler = () => {
    setRegistrationIsVisible(false)
  };

  const [authorizationIsVisible, setAuthorizationIsVisible] = useState(false) 
  // начальное состояние - окно не видно
  const showAuthorizationHandler = () => {
    setAuthorizationIsVisible(true)
  };
  const hideAuthorizationHandler = () => {
    setAuthorizationIsVisible(false)
  };
  
  const [selectedCategory, setSelectedCategory ] = useState('Веревка');

  return (
    <BasketContextProvider>
      {basketIsVisible && <Basket onHideBasket={hideBasketHandler} />}
      {registrationIsVisible && <Registration onHideRegistration={hideRegistrationHandler} />}
      {authorizationIsVisible && <Authorization onHideAuthorization={hideAuthorizationHandler} />}
      <Header onShow={showBasketHandler} 
      onShowRegistration={showRegistrationHandler} 
      onShowAuthorization={showAuthorizationHandler} 
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
       />
      <main>
        <Products selectedCategory={selectedCategory}/>

      </main>

    </BasketContextProvider>
  );
}

export default App;