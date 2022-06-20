import React from "react";
import "materialize-css";
import { useRoutes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "./hooks/auth.hooks";
import { AuthContext } from "./context/AuthContext";
import { NavBar } from "./components/NavBar";
import { Loader } from "./components/Loader";

function App() {
  //информация из хука авторизации
  const { login, logout, token, userId, ready } = useAuth();
  //переменная авторизации
  const isAuthenticated = !!token; //true/false
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader />;
  }
  return (
    <AuthContext.Provider
      value={{ login, logout, token, userId, isAuthenticated }}
    >
      <BrowserRouter>
        {isAuthenticated && <NavBar />}
        <div className="container">{routes}</div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
