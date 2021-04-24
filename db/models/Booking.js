module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define("Booking", {
    dateFrom: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    dateTo: {
      type: DataTypes.DATEONLY,
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
