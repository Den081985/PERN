import { createContext } from "react";

//функция заглушка для дефолтного значения
const noop = () => {};
//контекст для авторизации
export const AuthContext = createContext({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
});
