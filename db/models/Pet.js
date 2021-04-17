// Slug
const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Pet = sequelize.define("Pet", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
    },
    vaccinated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    allergies: {
      type: DataTypes.STRING,
    },
    personality: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    walkingHours: {
      type: DataTypes.STRING,
    },
    medication: {
      type: DataTypes.STRING,
    },
    mealTime: {
      type: DataTypes.STRING,
    },
    allowedSnackPerDays: {
      type: DataTypes.STRING,
    },
  });
  return Pet;
};
