module.exports = (sequelize, DataTypes) => {
	const Item = sequelize.define('Item', {
		name: DataTypes.STRING,
		description: DataTypes.STRING,
		dueDate: DataTypes.DATE,
	});

	Item.associate = function (models) {
		Item.belongsTo(models.Project);
		Item.hasMany(models.Task);
		Item.belongsTo(models.User);
	};

	return Item;
};
