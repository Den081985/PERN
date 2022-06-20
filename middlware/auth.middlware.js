const jwt = require("jsonwebtoken");

//мидлвэр для работы с токеном
module.exports = (req, res, next) => {
  //пропускаем метод options-метод, проверяющий доступность сервера
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    //парсинг строки, содержащей токен,для получения токена
    const token = req.headers.authorization.split(" ")[1]; // Bearer token

    //401- нет авторизации
    if (!token) {
      return res.status(401).json({ message: "No authorization" });
    }
    //раскодирование токена
    let decoded_token = jwt.verify(token, process.env.SECRET_KEY);
    //раскодированный токен добвляется в объект запроса
    req.user = decoded_token;
    next();
  } catch (error) {
    return res.status(401).json({ message: "No authorization" });
  }
};
