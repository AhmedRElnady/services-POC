const joi = require('joi');
const tasks = require('./tasks.model') (joi);

const schemas = Object.create({tasks});

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
} // end schemaValidator

module.exports = Object.create({validate: schemaValidator, schemas}); 