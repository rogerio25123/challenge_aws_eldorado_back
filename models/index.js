const { Sequelize } = require("sequelize");
const config = require("../config/database.js").development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: false
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importação dos modelos
db.Category = require("./Category.model.js")(sequelize, Sequelize);
db.Device = require("./Device.model.js")(sequelize, Sequelize);

// Aplicação das associações
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
