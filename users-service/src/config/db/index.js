// const {dbSettings, serverSettings} = require('./config');
const {connect} = require('./mongo');
const {ObjectID} = require('mongodb');

module.exports = Object.assign({}, {connect, ObjectID});