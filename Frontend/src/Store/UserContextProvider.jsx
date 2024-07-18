import { useReducer } from "react";
import UserContext from "./User-context";
import {API_URL} from '../http';
import axios from "axios";
const defaultUserState = {
  user: {},
  isAuth: false,
}
const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        ...state,
        isAuth: action.isAuth
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
};

const UserContextProvider = (props) => {
  const [userState, dispatchUserAction] = useReducer(userReducer, defaultUserState);

  const checkAuthHandler = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/refresh`, {
        withCredentials: true
      });
      localStorage.setItem('token', response.data.accessToken);

      dispatchUserAction({ type: 'SET_USER', user: response.data.user });
      dispatchUserAction({ type: 'SET_AUTH', isAuth: true });
    } catch (error) {
      console.error('Error while checking authentication:', error);
    }
  };

  const userContext = {
    user: userState.user,
    isAuth: userState.isAuth,
    setAuth: (isAuth) => dispatchUserAction({ type: 'SET_AUTH', isAuth }),
    setUser: (user) => dispatchUserAction({ type: 'SET_USER', user }),
    checkAuth: checkAuthHandler
  };

  return <UserContext.Provider value={userContext}>{props.children}</UserContext.Provider>;
};

export default UserContextProvider;