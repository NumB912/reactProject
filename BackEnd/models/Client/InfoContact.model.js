// src/models/infoContact.model.js
module.exports = (sequelize, DataTypes) => {
  const InfoContact = sequelize.define('InfoContact', {
    InfoContactID: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    PhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'INFO_CONTACT',
    timestamps: false,
  });

  InfoContact.associate = (models) => {
    InfoContact.hasMany(models.Client, { foreignKey: 'InfoContactID' });
  };

  return InfoContact;
};
