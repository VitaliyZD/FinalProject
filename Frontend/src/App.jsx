import React, {useContext, useEffect, useState} from 'react';
import Header from './components/Cap/Header';
import Products from './components/Products/Products';
import Basket from './components/Basket/Basket';
import Registration from './components/Cap/Registration';
import Authorization from './components/Cap/Authorization';
import UserContext from './Store/User-context';

function App() {
  const userContext = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      userContext.checkAuth();
    }
  }, []);

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
  
  const [selectedCategory, setSelectedCategory ] = useState('Усы и петли');

  return (
    <div>
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
    </div>
  );
}

export default App;