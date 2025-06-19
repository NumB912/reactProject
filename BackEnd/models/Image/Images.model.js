const {DataTypes} = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    ImageID: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    ImageName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DateUpload: {
      type: DataTypes.TIME,  // time without time zone
      allowNull: false,
    },
    URL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ImageAssociationID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'IMAGE',
    timestamps: false,
  });

  Image.associate = (models) => {
    Image.belongsTo(models.ImageAssociation, { foreignKey: 'ImageAssociationID' });
  };

  return Image;
};
