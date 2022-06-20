const Router = require("express");
const auth = require("../middlware/auth.middlware");
const shortId = require("shortid");
const router = new Router();
const { Link, User } = require("../models/models");

//обработка генерации ссылки
router.post("/generate", auth, async (req, res) => {
  try {
    const baseUrl = "http://localhost:5000";

    //с фронтэнда получаем ссылку from
    const { from } = req.body;

    //создаем короткой код для ссылки
    const code = shortId.generate();
    //проверяем есть ли такой from уже в БД
    const existed = await Link.findOne({ where: { from: from } });

    if (existed) {
      return res.json({ link: existed });
    }
    //если from в БД нет, формируем короткую ссылку
    const to = baseUrl + "/t/" + code;

    const link = await Link.create({
      from,
      to,
      code,
      userId: req.user.userId,
    });

    return res.status(201).json(link);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//запрос на получение всех ссылок
router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.findAll({
      include: {
        model: User,
        where: {
          id: req.user.userId,
        },
      },
    });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: "Some goes wrong" });
  }
});

//запрос на получение ссылки по id
router.get("/:id", auth, async (req, res) => {
  try {
    const link = await Link.findOne({ where: { id: req.params.id } });
    return res.status(200).json(link);
  } catch (error) {
    res.status(500).json({ message: "Some goes wrong" });
  }
});
module.exports = router;
