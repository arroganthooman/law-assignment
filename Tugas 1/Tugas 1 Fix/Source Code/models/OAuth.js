const { User } = require('./User')
const Sequelize = require('sequelize');
const { db } = require('../util/database');

const OAuth = db.define('OAuth', {
    access_token: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    refresh_token: {
        type: Sequelize.STRING,
        allowNull: false,
    }, 
    date_created:{
        type:Sequelize.DATE,
        allowNull: false,
    }, 
    date_expires: {
        type: Sequelize.DATE,
        allowNull: false
    },
    userId: {
        type: Sequelize.STRING,
        references: {
            model: User,
            key:'username'
        }
    }
})


module.exports = {
    OAuth:OAuth
}
