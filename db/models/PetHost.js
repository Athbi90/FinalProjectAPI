const ip = require("ip");
require("dotenv").config();
module.exports = (sequelize, DataTypes) => {
  const PetHost = sequelize.define("PetHost", {
    bio: {
      type: DataTypes.TEXT,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    typeOfPets: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "/media/profileImage.jpeg",
    },
  });
  return PetHost;
};
