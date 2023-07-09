import { schemaSignin } from "../schemas/user.schemas.js";

export function validadeSchema(schema) {
    return (req, res, next) => {
        const { email, password } = req.body;
        const infoUser = { email, password};
    
        const validation = schemaSignin.validate(infoUser, {abortEarly: false});
                
            if (validation.error) {
                const errors = validation.error.details.map(detail => detail.message);
                return res.status(422).send(errors);
            }   
        next();
    }
}

