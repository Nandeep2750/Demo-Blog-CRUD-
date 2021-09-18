'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('tbl_users', {
            iUserID: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            vUserName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            vEmail: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            vPassword: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            isDeleted: {
                type: Sequelize.INTEGER,  // ('0','1')
                allowNull: false,
                defaultValue: 0
            },
            dtCreatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()
            },
            dtUpdatedAt: {
                type: Sequelize.DATE,
            },
            dtDeletedAt: {
                type: Sequelize.DATE,
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('tbl_users');
    }
};