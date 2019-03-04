const taskSchema = (joi) => ({
    name: joi.string(),
    description: joi.string(),
    dueAt: joi.date(),
    done: joi.boolean().default(false)
});

module.exports = taskSchema;