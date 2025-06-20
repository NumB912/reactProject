// src/models/client.model.js
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    ClientID: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DateOfBirth: {
      type: DataTypes.TIME,  // time without time zone
      allowNull: true,
    },
    ImageAssociationID: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    UserName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    HashPassword: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    TypeAccountID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    InfoContactID: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    LocationID: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'CLIENT',
    timestamps: false,
  });

  Client.associate = (models) => {
    Client.belongsTo(models.ImageAssociation, { foreignKey: 'ImageAssociationID' });
    Client.belongsTo(models.InfoContact, { foreignKey: 'InfoContactID' });
    Client.belongsTo(models.Location, { foreignKey: 'LocationID' });
    Client.belongsTo(models.TypeAccount, { foreignKey: 'TypeAccountID' });
  };

  return Client;
};
