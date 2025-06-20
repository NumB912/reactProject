// src/models/imageAssociation.model.js
module.exports = (sequelize, DataTypes) => {
  const ImageAssociation = sequelize.define('ImageAssociation', {
    ImageAssociationID: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    ImageAssociationName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'IMAGE_ASSOCIATION',
    timestamps: false,
  });

  ImageAssociation.associate = (models) => {
    ImageAssociation.hasMany(models.Client, { foreignKey: 'ImageAssociationID' });
    ImageAssociation.hasMany(models.Service, { foreignKey: 'ImageAssociationID' });
  };

  return ImageAssociation;
};
