const { createContainer, asValue } = require('awilix');

function initDI ({serverSettings, dbSettings, database, models}, mediator) {
    mediator.once('init', () => {
        mediator.on('db.ready', db => {
            const container = createContainer();

            container.register({
                serverSettings: asValue(serverSettings),
                database: asValue(db),
                validate: asValue(models.validate),
                task: asValue(models.task),
                ObjectID: asValue(database.ObjectID),
        
            }); // end register

            mediator.emit('di.ready', container);
        });

        mediator.on('db.error', (err) => {
            mediator.emit('di.error', err);
        })

        database.connect(dbSettings.database, mediator);

        mediator.emit('boot.ready');
    })
} // end initDI function 

module.exports.initDI = initDI;