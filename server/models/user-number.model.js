import db from "Db";
import Sequelize from "sequelize";
import { withCommonOperation } from "Utils/model.util";

// schema
const UserNumber = db.define(
  "UserNumber",
  {
    // attributes
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    userId: {
      type: Sequelize.UUID,
      references: {
        model: "Users",
        key: "id",
      }
    },
    mobileNumber: {
      type: Sequelize.STRING,
    },
    countryCode: {
      type: Sequelize.INTEGER(4).UNSIGNED,
    },
    verified: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: false,
    }
  },
  {
    // options
  }
);


export default withCommonOperation(UserNumber);
