module.exports = (sequelize, DataTypes) => {
	const Project = sequelize.define('Project', {
		name: DataTypes.STRING,
		description: DataTypes.STRING,
	});

	Project.associate = function (models) {
		Project.hasMany(models.Item);
		Project.belongsTo(models.User);
	};

	return Project;
};
