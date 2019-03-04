const MongoClient = require('mongodb');
const {dbSettings, serverSettings} = require('../config');

const connect = (options, mediator) => {
    mediator.once('boot.ready', () => {
        MongoClient.connect(dbSettings.database, (err, db) => {
            if (err) {
                mediator.emit('db.error', err);
            }
            mediator.emit('db.ready', db);
            console.log(".... Connected to db ....")
        })
    })
}

module.exports = Object.assign({}, { connect });