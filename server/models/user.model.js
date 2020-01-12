import db from "Db";
import Sequelize from "sequelize";
import { withCommonOperation } from "Utils/model.util";

// schema
const User = db.define(
  "User",
  {
    // attributes
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    displayName: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
    },
    mobileNumber: {
      type: Sequelize.STRING,
    },
    countryCode: {
      type: Sequelize.INTEGER(4).UNSIGNED,
    },
    emailId: {
      type: Sequelize.STRING,
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue:true,
    },
  },
  {
    // options
  }
);
 
export default withCommonOperation(User);
