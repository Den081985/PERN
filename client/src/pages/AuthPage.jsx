import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
// import { registration } from "../http/userApi";
import { useHttp } from "../hooks/http.hooks";
import { useMessage } from "../hooks/message.hook";

// const url = "api/auth/register";

const AuthPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  //кастомный хук работы с запросами
  const { request, loading, error, cleanError } = useHttp();
  //хук вывода ошибок
  const message = useMessage();

  const auth = useContext(AuthContext);

  //метод обработки изменения в инпуте
  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  //метод регистрации
  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      // const data = await registration(email, password);
      message(data.message);
    } catch (e) {}
  };

  //метод авторизации
  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });

      auth.login(data.token, data.userId);
      message(data.message);
    } catch (e) {}
  };

  //Отслеживание ошибки
  useEffect(() => {
    message(error);
    cleanError();
  }, [error, message, cleanError]);

  //добавляем активность инпутам. M.updateTextFields - добавляет активность инпутам при переходе на страницу
  useEffect(() => {
    window.M.updateTextFields();
  }, []);
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h3 style={{ textAlign: "center" }}>Shorten Link</h3>
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  className="validate"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  className="validate"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="waves-effect waves-light btn"
              style={{ marginRight: 10 }}
              onClick={loginHandler}
            >
              Enter
            </button>
            <button
              className="waves-effect waves-light btn"
              onClick={registerHandler}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
