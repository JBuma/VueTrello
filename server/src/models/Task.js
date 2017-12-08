module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: DataTypes.STRING,
    authorId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    dueDate: DataTypes.DATE,
    isFinished: DataTypes.BOOLEAN
  })

  Task.associate = function (models) {
    Task.belongsTo(models.Item)
  }

  return Task
}
