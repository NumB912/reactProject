
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    ProductID: {
      type: DataTypes.STRING,       // character varying
      primaryKey: true,
      allowNull: false,
    },
    NameProduct: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Price: {
      type: DataTypes.DECIMAL(100, 3),
      allowNull: false,
    },
    ServiceID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'PRODUCT',     // đúng với tên bảng trong DB (chú ý chữ hoa)
    timestamps: false,        // bảng bạn không có createdAt/updatedAt
    underscored: false,       // theo kiểu camelCase, vì cột DB viết hoa
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Service, { foreignKey: 'ServiceID' });
  };

  return Product;
};
