const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Category = require("./category");

const Device = sequelize.define("Device", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    color: {
        type: DataTypes.STRING(16),
        allowNull: false,
        validate: {
            isAlpha: true,
            len: [1, 16]
        }
    },
    partNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            min: 1
        }
    }
}, {
    timestamps: false
});

// Relacionamento entre Device e Category
Device.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

module.exports = Device;
