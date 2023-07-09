import { db } from "../database/database.connection.js";

export async function validateAuth(req, res, next){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if(!token) return res.status(401).send("não autorizado");

    try {
        const session = await db.collection("sessoes").findOne({ token });
        if (!session) return res.status(401).send("não autorizado");

        res.locals.user = session;
    
        next();
    } catch (err){
        res.status(500).send(err.message);
    }

}