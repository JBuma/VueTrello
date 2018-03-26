module.exports = (sequelize, DataTypes) => {
	const Project = sequelize.define('Project', {
		name: DataTypes.STRING,
		description: DataTypes.STRING,
		authorId: DataTypes.INTEGER,
	});

	return Project;
};
