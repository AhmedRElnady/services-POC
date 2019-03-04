
const repository = (container) => {

    const {ObjectID, database: db} = container.cradle;
    const collection = db.collection('users');
 
    const createUser = (userDetails) => {
        return new Promise((resolve, reject) => {

            const user = {
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                email: userDetails.email,
                assignments: []
            }

            collection.insertOne(user, (err, savedUser) => {
                if (err) {
                    reject(new Error('An error occurered during registering new user'));
                }
                resolve(user)
            });
        })
    }

    const getUsers = () => {
        return new Promise((resolve, reject) => {
            const cb = (err, usersDetails) => {
                if(err) {
                    reject(new Error('An error ocurered during retriving the users !'));
                }
                resolve(usersDetails);
            }

            collection.find({}, {}).toArray(cb);
        })
    }


    const getUserById = (id) => {
        return new Promise((resolve, reject) => {
            // const ObjectID = container.resolve('ObjectID');

            const cb = (err, userDetails) => {
                if (err) {
                    reject(new Error('An error ocurered during retriving the user !'));
                }
                resolve(userDetails);
            }

            collection.findOne({_id: new ObjectID(id)}, {}, cb);
        })
    }


    const createAssignment = (userId, assignmentDetails) => {    
        return new Promise((resolve, reject) => {
            const cb = (err, createdAssignment) => {
                if (err) {
                    reject(new Error('An error ocurered during assign the task to the user!'))
                }
                resolve(createdAssignment);
            }

            collection.updateOne({ _id: new ObjectID(userId) }, 
            {
                $push: {
                    assignments: assignmentDetails
                }
            }, cb);

        });
    }

    const getUserAssignments = (userId) => {
        return new Promise((resolve, reject) => {
            const cb = (err, userAssignments) => {
                if (err) {
                    reject(new Error('An error ocurered retrieving the user assignments!'))
                }
                resolve(userAssignments);
            }

            collection.findOne({_id: new ObjectID(userId)}, {
                _id: 0,
                assignments: 1,
            }, cb);
        })
    }

    const setAssignmentSatatus = (userId, taskId, status) => {
       
        return new Promise((resolve, reject) => {
            const cb = (err, updatedStatus) => {
                if (err) {
                    reject(new Error('An error ocurered during updating the task status!'))
                }
                resolve(updatedStatus);
            }

            collection.findOneAndUpdate(
                { _id: new ObjectID(userId), 'assignments.task.id': taskId },
                { $set: { 
                   'assignments.$.finished': status 
                    } 
                }, cb);
        })
        
    };


    const disconnect = () => {
        db.close();
    }

    return Object.create({
        createUser,
        getUsers,
        getUserById,
        // seperate them
        createAssignment,
        getUserAssignments,
        setAssignmentSatatus,

        disconnect
    })


}

const connect = (connection) => {
    return new Promise((resolve, reject) => {
        if(!connection) {
            reject(new Error('There are no DB connection !'));
        }
        resolve(repository(connection))
    })
}

module.exports = Object.assign({}, {connect});
