//хук для работы с авторизацией

import { useCallback, useEffect, useState } from "react";

export const useAuth = () => {
  //стейт для токена
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  //стейт для загруженных данных с помощью useEffect
  const [ready, setReady] = useState(false);

  //метод входа
  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(
      "userData",
      JSON.stringify({ token: jwtToken, userId: id })
    );
  }, []);

  //метод выхода
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem("userData");
  }, []);

  //наблюдение и загрузка из localStorage токена и id
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));

    if (data && data.token) {
      login(data.token, data.userId);
    }
    setReady(true);
  }, [login]);

  return { login, logout, token, userId, ready };
};
