const Sequelize = require('sequelize');
const {DataTypes} = Sequelize

const db = new Sequelize('student',"root",null,{ dialect: 'mysql', host: "localhost"});

const User = db.define('User',{

  userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
  },
  userPassword: {
      type: DataTypes.STRING,
      allowNull: false
  },
  firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      set: function(val){
          this.setDataValue('firstName',val.toUpperCase());
      }
  },
  lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      set: function(val){
          this.setDataValue('lastName',val.toUpperCase());
      }
  },
  emailId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          isEmail: true
      }
  },
  status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
  }

});


module.exports = {db, User};