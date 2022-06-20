import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hooks";

const CreatePage = () => {
  const [link, setLink] = useState("");
  //метод для запросов
  const { request } = useHttp();

  const navigate = useNavigate();

  //получаем токен из контекста
  const auth = useContext(AuthContext);

  //функция, срабатывающая на нажатие Enter
  const pressHandler = async (event) => {
    //проверка нажатия Enter
    if (event.key === "Enter") {
      try {
        // console.log(auth.token);
        const data = await request(
          "/api/links/generate",
          "POST",
          {
            from: link,
          },
          { Authorization: `Bearer ${auth.token}` }
        );

        console.log(data);
        //редирект на страницу ссылки
        navigate(`/detail/${data.link.id}`);
      } catch (error) {}
    }
  };
  return (
    <div className="row" style={{ paddingTop: "2rem" }}>
      <div className="col s8 offset-s2">
        <div className="input-field">
          <input
            id="link"
            type="text"
            className="validate"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Enter Link</label>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
