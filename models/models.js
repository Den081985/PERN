const sequelize = require("../db");
const { DataTypes } = require("sequelize");

//модель авторизации пользователя
const User = sequelize.define("user", {
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
});

const Link = sequelize.define("link", {
  from: { type: DataTypes.STRING, allowNull: false },
  to: { type: DataTypes.STRING, allowNull: false, unique: true },
  code: { type: DataTypes.STRING, allowNull: false, unique: true },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  clicks: { type: DataTypes.INTEGER, defaultValue: 0 },
});

User.hasMany(Link);
Link.belongsTo(User);

module.exports = { User, Link };
//links: [{ type: DataTypes.STRING, references: { model: Link } }],
//id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
