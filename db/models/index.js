"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//db.User.hasOne(db.Bakery, { as: "bakery", foreignKey: "userId" });
//db.Bakery.belongsTo(db.User, { as: "user" });

// models relations
// User to PetOwner relation (1-1)
db.User.hasOne(db.PetOwner, {
  as: "petOwner",
  foreignKey: {
    name: "userId",
  },
});
db.PetOwner.belongsTo(db.User, {
  as: "user",
});

// User to PetHost relation (1-1)
db.User.hasOne(db.PetHost, {
  as: "petHost",
  foreignKey: {
    name: "userId",
  },
});
db.PetHost.belongsTo(db.User, {
  as: "user",
});

// PetOwner to Pets (1-M)
db.PetOwner.hasMany(db.Pet, {
  as: "petOwner",
  foreignKey: {
    name: "petOwnerId",
  },
});
db.Pet.belongsTo(db.PetOwner, {
  foreignKey: {
    name: "petOwnerId",
  },
});

module.exports = db;
