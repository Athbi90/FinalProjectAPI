module.exports = (sequelize, DataTypes) => {
  const PetOwner = sequelize.define("PetOwner", {
    bio: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
    },
  });
  return PetOwner;
};
