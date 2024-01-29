const { Sequelize, Model, DataTypes} = require("sequelize");

const { DB } = require("../config/db");

const UserModel = DB.define('user', 
  {
    first_name: {
        type: DataTypes.STRING,
        validate: {
          min: 2,
        },
      },

    last_name: {
        type: DataTypes.STRING,
        validate: {
          min: 2,
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          name: "email",
          msg: "An account already exists with this email address.",
        },
  
        validate: {
          isEmail: { msg: "Please check this is a valid email" },
          notEmpty: { msg: "email can't be empty" },
        }
    },
    phone_number: {
        type: Sequelize.STRING(20),
        validate: {
          isNumeric: {
            msg: "Please confirm phone number contains valid characters",
          },
        },
      },
    password: {
      type: DataTypes.STRING
    },
   country: {
    type: DataTypes.STRING
   },
    account_type: {
      type: DataTypes.ENUM({
        values: [
          "client",
          "therapist",
        ],
      }),
      defaultValue: "client",
    },
    activation_token: {
        type: DataTypes.STRING,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
  },
  passwordResetToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  passwordResetTokenExpiration: {
    type: DataTypes.DATE,
    allowNull: true,
}
});


UserModel.sync({ alter: true }).then(() => {
    console.log('User table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
 
 module.exports = { UserModel }