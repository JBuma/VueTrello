module.exports = (sequelize, DataTypes) => {
	const Comment = sequelize.define('Comment', {
		comment: DataTypes.STRING,
	});

	Comment.associate = function (models) {
		Comment.belongsTo(models.Task);
		Comment.belongsTo(models.User);
	};

	return Comment;
};
