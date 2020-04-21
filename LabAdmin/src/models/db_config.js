const Sequelize = require('sequelize');
const {DataTypes} = Sequelize

const db = new Sequelize('student',"root",null,{ dialect: 'mysql', host: "localhost",logging: false});

const secondYear = db.define('secondyear',{
    studentRegId:{
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
        primaryKey: true,
        get() {
            const rawValue = this.getDataValue(studentRegId);
            return rawValue ? rawValue.toUpperCase() : null;
          }
    },
    studentName:{
        type: DataTypes.STRING(30),
        allowNull: false,
        get() {
            const rawValue = this.getDataValue(studentName);
            return rawValue ? rawValue.toUpperCase() : null;
          }
    },
    studentSection:{
        type: DataTypes.STRING(1),
        allowNull: false,
        get() {
            const rawValue = this.getDataValue(studentSection);
            return rawValue ? rawValue.toUpperCase() : null;
          }
    },
    studentMail:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        },
        get() {
            const rawValue = this.getDataValue(studentMail);
            return rawValue ? rawValue : null;
          }
    },
    studentDOB:{
        type: DataTypes.DATE,
        allowNull: false,
        set: function(val){
            this.setDataValue('studentDOB',require('moment')(val).format("YYYY-MM-DD"));
        },
        get: function(){
            return this.getDataValue('studentDOB',require('moment')(val).format("YYYY-MM-DD"));
        }
    }
},{freezeTableName: true});

const thirdYear = db.define('thirdyear',{
    studentRegId:{
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    studentName:{
        type: DataTypes.STRING(30),
        allowNull: false
    },
    studentSection:{
        type: DataTypes.STRING(1),
        allowNull: false
    },
    studentMail:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    studentDOB:{
        type: DataTypes.DATE,
        allowNull: false,
        set: function(val){
            this.setDataValue('studentDOB',require('moment')(val).format("YYYY-MM-DD"));
        }
    }
},{freezeTableName: true});

const fourthYear = db.define('fourthyear',{
    studentRegId:{
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    studentName:{
        type: DataTypes.STRING(30),
        allowNull: false
    },
    studentSection:{
        type: DataTypes.STRING(1),
        allowNull: false
    },
    studentMail:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    studentDOB:{
        type: DataTypes.DATE,
        allowNull: false,
        set: function(val){
            this.setDataValue('studentDOB',require('moment')(val).format("YYYY-MM-DD"));
        }
    }
},{freezeTableName: true});

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

},{freezeTableName: true});


module.exports = {db, User, secondYear, thirdYear, fourthYear};

