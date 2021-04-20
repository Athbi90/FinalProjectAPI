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
      defaultValue: `${ip.address()}:${
        process.env.PORT
      }/media/profileImage.jpeg`,
    },
  });
  return PetHost;
};
