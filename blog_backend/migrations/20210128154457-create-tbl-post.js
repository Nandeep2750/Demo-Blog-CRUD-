'use strict';
module.exports = {
     up: async (queryInterface, Sequelize) => {
          await queryInterface.createTable('tbl_posts', {
               iPostID: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
               },
               vTitle: {
                    type: Sequelize.STRING,
                    allowNull: false,
               },
               vSlug: {
                    type: Sequelize.STRING,
                    allowNull: false,
               },
               tBody: {
                    type: Sequelize.TEXT,
                    allowNull: false,
               },
               isActive: {
                    type: Sequelize.INTEGER,  // ('0','1')
                    allowNull: false,
                    defaultValue: 1
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
          await queryInterface.dropTable('tbl_posts');
     }
};