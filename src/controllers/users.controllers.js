import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { schemaSignup} from "../schemas/user.schemas.js";
import { v4 as uuid } from 'uuid';

export async function signup (req, res) {
    try {
        const {name, email, password} = req.body;
        const hash = bcrypt.hashSync(password, 10);
        const infoUser = {name, email, password: hash};
        const validation = schemaSignup.validate(infoUser, {abortEarly: false});

        if (validation.error) {
            const errors = validation.error.details.map(detail => detail.message);
            return res.status(422).send(errors);
        }

        if(password.length<3) return res.status(422).send("A senha deve conter no mínimo 3 caracteres");

        const registered = await db.collection("usuarios").findOne({email});
        if (registered) return res.status(409).send("e-mail de usuário já cadastrado")
        await db.collection("usuarios").insertOne(infoUser);

        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function signin (req, res) {
    try {
        const { email, password } = req.body;
        const user = await db.collection('usuarios').findOne({ email });
        

        if(user && bcrypt.compareSync(password, user.password)) {
            const token = uuid();
            await db.collection("sessoes").deleteMany({ userId: user._id });
			await db.collection("sessoes").insertOne({userId: user._id , token});
            res.status(200).send(token);
        } else if(!user) {
            res.status(404).send("usuário não encontrado (email incorreto)");
        } else {
            res.status(401).send("usuário não encontrado (senha incorreta)");
        }
    
        
    } catch (err) {
        res.status(500).send(err.message);
    }
}