import Sequelize from "sequelize";

const {
  DB_USER, DB_HOST, DB_PASS, DB_NAME
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mysql",
});

export default sequelize;
