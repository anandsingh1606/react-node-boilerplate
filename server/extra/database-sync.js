import db from "Db";
import * as models from "Models";

/*=================================================================================
 ANCHOR Synchronizing Sequelize DB with force = true will create all tables
 with the same defined structure in models
===================================================================================*/
db.authenticate()
  .then(() => {
    db.sync({ force: true });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
