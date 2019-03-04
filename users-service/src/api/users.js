const { validate } = require('../models');

module.exports = ({ repo }, app) => {

    app.post('/users/signup', (req, res, next) => {
        return validate(req.body.userObject, 'user')
            .then(user => {
                return repo.createUser(user)
                    .then(savedUser => {
                        return res.status(201).json({
                            success: true,
                            message: 'User created successfully'
                        });
                    })
                    .catch(next);
            })
    });

    app.get('/users', (req, res, next) => {
        return repo.getUsers()
            .then(users => {
                res.status(200).json({
                    success: true,
                    data: users
                });
            })
            .catch(next);
    });

    app.get('/users/:id', (req, res, next) => {
       
        return repo.getUserById(req.params.id)
            .then(user => {
                res.status(200).json({
                    success: true,
                    data: user
                });
            })
            .catch(next);
    });

    //ToDo: move them to a seperate file src/api/assignments.js
    app.post('/users/assignment', (req, res, next) => {
        
        const assignmentObject = req.body.assignmentObject,
            userId = assignmentObject.userId;

        delete assignmentObject.userId;
        
        return validate(assignmentObject, 'assignment')
            .then(assignment => {
                return repo.createAssignment(userId, assignment)
                    .then(savedAssignment => {
                        return res.status(201).json({
                            success: true,
                            message: 'Task is Assigned to the user successfully'
                        })
                    })
            })

            .catch(next);
    });

    app.get('/users/:id/assignments', (req, res, next)=> {
        return repo.getUserAssignments(req.params.id)
            .then(userAssignments => {
                res.status(201).json({
                    success: true,
                    data: userAssignments
                })
            })
            .catch(next);
    });

    app.put('/users/:userid/assignments/:taskid', (req, res, next) => {
        const params = req.params,
            userId = params.userid,
            taskId = params.taskid,
            isFinished = req.body.finished,
            tasksService = req.container.resolve('tasksService');

        return repo.setAssignmentSatatus(userId, taskId, isFinished)
            .then(updatedStatus => {
               
                // request to update the task in tasks-service 
                const taskStatus = {
                    taskId,
                    status: isFinished
                }
                return tasksService(taskStatus)
                    .then((updatedStatus) => {
                        res.status(200).json({
                            success: true,
                            message: 'Task status updated successfuly',
                            data: updatedStatus
                        })
                    })
                
            })
            .catch(next);
    });


}