'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class tbl_post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    tbl_post.init({
        iPostID: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        vTitle: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter Title'
                },
                notEmpty: {
                    msg: 'Do not allow empty Title'
                }
            }
        },
        vSlug: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter Slug'
                },
                notEmpty: {
                    msg: 'Do not allow empty Slug'
                }
            }
        },
        tBody: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter Content'
                },
                notEmpty: {
                    msg: 'Do not allow empty Content'
                }
            }
        },
        isActive: {
            type: DataTypes.INTEGER,  // ('0','1')
            allowNull: false,
            defaultValue: 1
        },
        isDeleted: {
            type: DataTypes.INTEGER,  // ('0','1')
            allowNull: false,
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
        modelName: 'tbl_post',
        timestamps: false
    });
    return tbl_post;
};