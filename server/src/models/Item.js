// const { Project } = require('../models')

module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    // projectId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    dueDate: DataTypes.DATE
  })

  Item.associate = function (models) {
    Item.belongsTo(models.Project)
  }

  return Item
}
