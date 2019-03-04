const {validate} = require('../models');

module.exports = ({repo}, app) => {

    
    app.post('/tasks', (req, res, next) => {
        return validate(req.body.taskObject, 'tasks')
            .then(task => {
                return repo.createTask(task)
                    .then(savedTask => {
                        return res.status(201).json({
                            success: true,
                            message: 'Task created successfully'
                        })
                    })
            })
    });

    app.get('/tasks', (req, res, next) => {
        return repo.getAllTasks()
            .then(tasks => {
                res.status(200).json({
                    sucess: true,
                    data: tasks
                })
            })
    });

    app.get('/tasks/:id', (req, res, next) => {
        return repo.getTaskById(req.params.id)
            .then(task => {
                res.status(200).json({
                    success: true, 
                    data: task
                })
            })
            .catch(next);
    });
    
     /*
    This Function is supposed to handle Only the request form the other service (user)
    This function can't be accessed directly from the tasks-service 
    */
    //Todo: separate it


    app.patch('/tasks/updatestatus', (req, res, next) => {
        
        const {taskId, status} = req.body.taskStatus;
        
        return repo.updateTask(taskId, status)
            .then(updatedStatus => {
                Promise.resolve(updatedStatus);
            })
            .catch(next);
    })


}