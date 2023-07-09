import { db } from "../database/database.connection.js";

export async function validateAuth(req, res, next){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if(!token) return res.status(401).send("não autorizado");
    console.log(token);

    try {
        const session = await db.collection("sessoes").findOne({ token });
        if (!session) return res.status(401).send("não autorizado");
    
        next();
    } catch (err){
        res.status(500).send(err.message);
    }

}