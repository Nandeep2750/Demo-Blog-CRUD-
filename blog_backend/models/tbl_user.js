'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class tbl_user extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    tbl_user.init({
        iUserID: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        vUserName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter UserName'
                },
                notEmpty: {
                    msg: 'Do not allow empty UserName'
                }
            }
        },
        vEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter Email'
                },
                notEmpty: {
                    msg: 'Do not allow empty Email'
                },
                isEmail: {
                    msg: 'Please enter valid Email'
                }
            }
        },
        vPassword: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter Password'
                },
                notEmpty: {
                    msg: 'Do not allow empty Password'
                }
            }
        },
        isDeleted: {
            type: DataTypes.INTEGER,  // ('0','1')
            defaultValue: 0
        },
        dtCreatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: new Date()
        },
        dtUpdatedAt: DataTypes.DATE,
        dtDeletedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'tbl_user',
        timestamps: false
    });
    return tbl_user;
};