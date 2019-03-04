const supertest = require('supertest');

module.exports = (taskStatus) => { // taskId and status
    console.log(".... msg from task serveice ... form user ");

    return new Promise((resolve, reject) => {
        supertest('http://localhost:4000')
            .put('/tasks/updateStatus')
            .send({taskStatus})
            .end((err, res) => {
                if(err) {
                    reject(new Error ('An error occured with the tasks service'))
                }
                resolve(res)
            })
    })

}

