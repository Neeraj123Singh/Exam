module.exports = (sequelize, DataTypes) => {
 const User = sequelize.define('Candidate', {
   username: {
     type: DataTypes.STRING,
     allowNull: false,
     unique: true
   },
   email: {
     type: DataTypes.STRING,
     allowNull: false,
     unique: true
   },
   passwordHash: {
     type: DataTypes.STRING,
     allowNull: false
   }
 }, {
   timestamps: true
 });

 return User;
};
