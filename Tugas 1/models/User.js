const Sequelize = require('sequelize');
const { db } = require('../util/database');

const User = db.define('users', {
    username: {
        type: Sequelize.STRING,
        allowNull:false,
        primaryKey: true
    },
    email: {
        type:Sequelize.STRING,
        allowNull:false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    full_name: {
        type:Sequelize.STRING,
        allowNull:false
    },
    npm: {
        type:Sequelize.STRING,
        allowNull:false
    },
    client_id: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    client_secret: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

exports.User = User
