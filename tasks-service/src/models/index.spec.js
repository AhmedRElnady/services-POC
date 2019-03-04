const {validate} = require('./index');

describe('Schemas validation', () => {
    it('can validate a task object', done => {

        const testTask = {
            name: 'task1',
            description: 'taks1_description',
            dueAt: '2069-07-06', 
            done: false,
        }

        validate(testTask, 'tasks')
            .then(value => {
                console.log('Valid task', value);
                done()
            })
            .catch(err => {
                console.log(err);
                done();
            })
    })
}) // end describe