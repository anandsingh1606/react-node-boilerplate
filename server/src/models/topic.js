
import db from "Db";
import Sequelize from "sequelize";
import { withCommonOperation } from "Utils/model";

// schema
const Topic = db.define(
  "Topic",
  {
    // attributes
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    displayText: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    systemText: {
      type: Sequelize.STRING,
      allowNull: true,
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


export default withCommonOperation(Topic);
