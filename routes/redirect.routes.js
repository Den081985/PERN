const { Router } = require("express");
const { Link } = require("../models/models");
const router = new Router();

router.get("/:code", async (req, res) => {
  try {
    const link = await Link.findOne({ where: { code: req.params.code } });

    if (link) {
      link.clicks++;
      link.save();
      return res.redirect(link.from);
    }
    return res.status(404).json("link's not found");
  } catch (error) {
    res.status(500).json({ message: "Some goes wrong" });
  }
});

module.exports = router;
