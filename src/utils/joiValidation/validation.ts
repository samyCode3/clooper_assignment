import Joi from 'joi'
const validator = (schema: any) => (payload: any) => schema.validate(payload, { abortEarly: false });
const userSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone : Joi.number().required(),
});

export = {
UserValidation : validator(userSchema),
}

