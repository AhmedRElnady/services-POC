const { EventEmitter } = require('events');
const test = require('assert');
const mongo = require('./mongo');
const { dbSettings } = require('./config');

describe('Mongo Connection', () => {
    it('should emit db object with an EventEmitter', (done) => {
        const mediator = new EventEmitter();

        mediator.on('db.ready', db => {
            test.equal(null, err);

            db.close();
            done()
        })

        mediator.on('db.error', (err) => {
            console.log(err)
        })

        mongo.connect(dbSettings.database, mediator)

        mediator.emit('boot.ready')
    })
})


