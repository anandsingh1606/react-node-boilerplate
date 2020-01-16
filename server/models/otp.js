import db from "Db";
import Sequelize from "sequelize";
import { withCommonOperation } from "Utils/model";

// schema
const Otp = db.define(
  "Otp",
  {
    // attributes
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    sendTo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.ENUM,
      values: ["mobile", "email"],
      defaultValue: "mobile",
    },
    otp: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM,
      values: ["created", "verified"],
      defaultValue: "created",
    },
  },
  {
    // options
  }
);


export default withCommonOperation(Otp);
