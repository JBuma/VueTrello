module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    authorId: DataTypes.INTEGER,
    content: DataTypes.STRING // TODO: change into JSON???? link to different table???? how do database
  })

  return Project
}
