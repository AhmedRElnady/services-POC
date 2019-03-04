const assignmentSchema = (joi) => ({
    // assignments: joi.array().items(joi.object().keys({
        task: joi.object().keys({
            id: joi.string(),
            name: joi.string()
        }),
        startedAt: joi.date(),
        finished: joi.boolean()
    // }))
})

module.exports = assignmentSchema;