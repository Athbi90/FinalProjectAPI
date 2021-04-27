// Slug
const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Pet = sequelize.define("Pet", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 15],
          msg: `The Pet name must contain between 2 to 15 characters`,
        },
      },
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
      type: DataTypes.DATEONLY,
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
      defaultValue: "/media/petProfile.png",
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
