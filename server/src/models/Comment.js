module.exports = (sequelize, DataTypes) => {
	const Comment = sequelize.define('Comment', {
		authorId: DataTypes.INTEGER,
		comment: DataTypes.STRING,
	});

	Comment.associate = function (models) {
		Comment.belongsTo(models.Task);
	};

	return Comment;
};
