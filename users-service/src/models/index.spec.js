const {validate} = require('./index');

describe('Schemas validation', () => {
    it('can validate a user object', done => {

        const testUser = {
            firstName: 'Ahmed',
            lastName: 'Elnady',
            email: 'dev.elnady@gmail.com',
            assignments: []
        }

        validate(testUser, 'user')
            .then(value => {
                console.log('Valid user', value);
                done()
            })
            .catch(err => {
                console.log(err);
                done();
            })
    })
}) // end describe