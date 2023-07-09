import joi from "joi";

export const schemaSignup = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.required(),
})

export const schemaSignin = joi.object({
    email: joi.string().email().required(),
    password: joi.required()
})

