const ip = require("ip");
require("dotenv").config();
module.exports = (sequelize, DataTypes) => {
  const PetOwner = sequelize.define("PetOwner", {
    bio: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: `${ip.address()}:${
        process.env.PORT
      }/media/profileImage.jpeg`,
    },
  });
  return PetOwner;
};
