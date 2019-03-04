const userSchema = (joi) => ({
    firstName: joi.string().regex(/^[a-zA-Z '-]+$/i).required(),
    lastName: joi.string().regex(/^[a-zA-Z '-]+$/i).required(),
    email: joi.string().email().required(),
    assignments: joi.array()
    // assignments: joi.array().items(joi.object().keys({
    //     task: joi.object().keys({
    //         id: joi.string(),
    //         name: joi.string()
    //     }),
    //     startedAt: joi.date(),
    //     finished: joi.boolean()
    // }))
})

module.exports = userSchema;