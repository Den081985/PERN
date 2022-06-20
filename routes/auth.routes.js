const Router = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { User } = require("../models/models");
const router = new Router();
const SECRET_KEY = process.env.SECRET_KEY;

// /api/auth/register запрос на регистрацию с проверкой валидности данных и хэширванием пароля
router.post(
  "/register",
  [
    check("email", "Input correct email").isEmail(),
    check("password", "Input correct password").isLength({ min: 4 }),
  ],
  async (req, res) => {
    try {
      //данные валидации
      const errors = validationResult(req);
      //проверка наличия ошибок валидации
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Unvalid register data",
        });
      }
      const { email, password } = req.body;

      const candidate = await User.findOne({ where: { email: email } });
      //400-bad_request некорректный запрос к серверу
      if (candidate) {
        return res.status(400).json({ message: "The user is already exists" });
      }
      //хэширование полученного пароля;12 - salt(соль) для более надежного хэширования
      const hashed_password = await bcrypt.hash(password, 12);

      const user = await User.create({ email, password: hashed_password });
      return res.json({ message: "User is created" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// /api/auth/login проверка аутентификации и авторизации
router.post(
  "/login",
  [
    check("email", "Input correct email").normalizeEmail().isEmail(),
    check("password", "Input correct password").exists(),
  ],
  async (req, res) => {
    try {
      //данные валидации
      const errors = validationResult(req);
      //проверка наличия ошибок валидации
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Unvalid register data",
        });
      }
      const { email, password } = req.body;

      const candidate = await User.findOne({ where: { email: email } });

      if (!candidate) {
        return res.status(400).json({
          message: "You need to register before attempt to get eccess",
        });
      }
      //сравнение полученного пароля с паролем из базы данных
      const compared_password = await bcrypt.compare(
        password,
        candidate.password
      );
      if (!compared_password) {
        return res
          .status(400)
          .json({ message: "There's no such password.Try again" });
      }
      //создание пользовательского токена(payload, secret key, expiresIn - срок действия токена)
      const token = jwt.sign({ userId: candidate.id }, SECRET_KEY, {
        expiresIn: "10h",
      });

      return res.json({ token, userId: candidate.id });
    } catch (error) {
      return res.status(500).json("Some goes wrong.Try again.");
    }
  }
);
module.exports = router;
