const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
 host: process.env.DB_HOST,
 dialect: process.env.DB_DIALECT
});

// const db = {};
// fs.readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

const db = {
 Sequelize,
 sequelize,
 Question: require('./question')(sequelize, Sequelize.DataTypes),
 Answer: require('./answer')(sequelize, Sequelize.DataTypes),
 // add other models here
};

module.exports = db;
