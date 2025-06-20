
module.exports = (sequelize, DataTypes) => {
  const TypeAccount = sequelize.define('TypeAccount', {
    TypeAccountID: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    TypeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'TYPE_ACCOUNT',
    timestamps: false,
  });

  TypeAccount.associate = (models) => {
    TypeAccount.hasMany(models.Client, { foreignKey: 'TypeAccountID' });
  };

  return TypeAccount;
};
