module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define("Booking", {
    dateFrom: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dateTo: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    bookingStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
  });
  return Booking;
};
