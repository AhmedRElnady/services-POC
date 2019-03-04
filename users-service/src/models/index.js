
const joi = require('joi');
const user = require('./user.model') (joi);
const assignment = require('./assignment.model') (joi);

const schemas = Object.create({user, assignment});

const schemaValidator = (object, type) => {
    return new Promise((resolve, reject) => {
        if (!object) {
            reject(new Error('Object to validate not provided'));
        }
        if (!type) {
            reject(new Error('Schema type to validate not provided'));
        }

        const {error, value} = joi.validate(object, schemas[type]);

        if (error) {
            reject(new Error(`Invalid ${type} data`));
        }
        
        resolve(value);
    })
}

module.exports = Object.create({validate: schemaValidator, schemas});
