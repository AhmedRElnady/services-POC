const { createContainer, asValue } = require('awilix');

function initDI ({serverSettings, dbSettings, database, models, services}, mediator) {
    mediator.once('init', () => {
        mediator.on('db.ready', db => {
            const container = createContainer();

            container.register({
                serverSettings: asValue(serverSettings),
                database: asValue(db),
                validate: asValue(models.validate),
                user: asValue(models.user),
                ObjectID: asValue(database.ObjectID),

                tasksService: asValue(services.tasksService)
            
            });

            mediator.emit('di.ready', container);
        });

        mediator.on('db.error', (err) => {
            mediator.emit('di.error', err);
        })

        database.connect(dbSettings.database, mediator);

        mediator.emit('boot.ready');
    })
}

module.exports.initDI = initDI;

