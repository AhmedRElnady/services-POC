const repository = (container) => {

    const {ObjectID, database: db} = container.cradle;
    const collection = db.collection('tasks');

    const createTask = (taskDetails) => {
        return new Promise((resolve, reject) => {

            const task = {
                name: taskDetails.name,
                description: taskDetails.description,
                dueAt: taskDetails.dueAt,
                done: taskDetails.done
            }

            collection.insertOne(task, (err, savedTask) => {
                if(err) {
                    reject(new Error('An error occurered during adding new task'))
                }
                resolve(task);
            })
        })
    }


    const getAllTasks = () => {
        return new Promise((resolve, reject) => {

            const cb = (err, tasks) => {
                if(err) {
                    reject(new Error('An error ocurered during retriving tasks !'));
                }
                resolve(tasks);
            }
            collection.find({}, {name: 1, dueAt: 1, done: 1}).toArray(cb); 
        })
    }

    const getTaskById = (id) => {
        return new Promise((resolve, reject) => {
            const cb = (err, taskDetails) => {
                if (err) {
                    reject(new Error('An error ocurered during retriving the task !'));
                }
                resolve(taskDetails);
            }

            collection.findOne({_id: new ObjectID(id)}, {}, cb);
        });
    }

    const updateTask = (taskId, status) => {
 
        return new Promise((resolve, reject) => {
            
            const cb = (err, updatedTask) => {
                if (err) {
                    reject(new Error('An error ocurered during updating the task !'))
                }
                resolve(updatedTask);
            }

            collection.updateOne({_id: new ObjectID(taskId)}, 
            {
                $set: {
                    done: status
                }
            }, cb)
        })
    }


    const disconnect = () => {
        db.close();
    }

    return Object.create({ 
        createTask,
        getAllTasks,
        getTaskById,
        updateTask,
        disconnect
    })

    
} // end repository

const connect = (connection) => {
    return new Promise((resolve, reject) => {
        if(!connection) {
            reject(new Error('There are no DB connection !'));
        }
        resolve(repository(connection))
    })
}


module.exports = Object.assign({}, {connect});
