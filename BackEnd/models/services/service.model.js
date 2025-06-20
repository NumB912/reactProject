// src/models/service.model.js
module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    ServiceID: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    SupplierID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ServiceName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    StatusID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ServiceTypeID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ImageAssociationID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LocationID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Discription: {       // chú ý bạn viết "Discription", mình giữ nguyên
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'SERVICE',
    timestamps: false,
  });

  Service.associate = (models) => {
    Service.belongsTo(models.ImageAssociation, { foreignKey: 'ImageAssociationID' });
    Service.belongsTo(models.Location, { foreignKey: 'LocationID' });
    Service.belongsTo(models.ServiceType, { foreignKey: 'ServiceTypeID' });
    Service.belongsTo(models.StatusService, { foreignKey: 'StatusID' });
    Service.belongsTo(models.Supplier, { foreignKey: 'SupplierID' });

    Service.hasMany(models.Product, { foreignKey: 'ServiceID' });
  };

  return Service;
};
