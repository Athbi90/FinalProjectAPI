module.exports = (sequelize, Datatypes) => {
  const HostImage = sequelize.define("HostImage", {
    image: {
      type: Datatypes.STRING,
    },
  });
  return HostImage;
};
