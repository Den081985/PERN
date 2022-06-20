require("dotenv").config();
const sequelize = require("./db");
const path = require("path");
const cors = require("cors");
const express = require("express");
const router = require("./routes/auth.routes");
const link_router = require("./routes/link.routes");
const redirect_router = require("./routes/redirect.routes");
// const config = require("config");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json({ extended: true }));
app.use("/api/auth", router);
app.use("/api/links", link_router);
app.use("/t", redirect_router);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.resolve(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () =>
      console.log(`Server has been started on port ${PORT} `)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
