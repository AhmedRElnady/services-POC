// const { createContainer, asValue } = require('awilix');
// const request = require('supertest');
// const server = require('../server/server');
// const models = require('../models');
// // const services = require('../services');

// describe('Tasks API', () => {
//     let app = null;

//     let testTask = {
//         id: '001',
//         name: 'task1',
//         description: 'description1',
//         dueAt: '2030-04-03',
//         done: false
//     }
    

//     let testRepo = {
//         createTask(testTask) {
//             return Promise.resolve(testTask);
//         },
//         getTaskById (id) {
//             return Promise.resolve(id);
//         }
//     }

//     beforeEach(() => {
//         const container = createContainer();

//         container.register({
//                 serverSettings: asValue(serverSettings),
//                 validate: asValue(models.validate),
//                 task: asValue(models.task),
//                 repo: asValue(testRepo)
//         }); // end register
//         return server.start(container) 
//             .then(_server => {
//                 app = _server
//             })
//     });

//     afterEach(() => {
//         app.close();
//         app = null;
//     });


//     it('should create a new task', (done) => {

//     });

//     it('should return the user by Id', (done) => {
//         request(app)
//             .get('/tasks/001')
//             .expect((res) => {
//                 res.body.should.containEql(testTask)
//             })
//             .expect(200, done);
//     })

// }) 