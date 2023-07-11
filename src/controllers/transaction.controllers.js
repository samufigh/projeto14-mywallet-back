import dayjs from "dayjs";
import { db } from "../database/database.connection.js";

export async function transaction(req, res){
    const { tipo } = req.params;
    const { value, description } = req.body;
    const { user } = res.locals;
    const transaction = {
        date: dayjs().format("DD/MM"),
        userId: user._id,
        type: tipo,
        value,
        description,
      };    

    if(tipo !== "entrada" && tipo !== "saida") return res.sendStatus(400);

    try {
        await db.collection("transacoes").insertOne(transaction);
        res.sendStatus(201);
    } catch (err){
        res.status(500).send(err.message);
    }
}

export async function showTransactions(req, res){
    const { user } = res.locals;
    try {
        const transactions = await db.collection("transacoes").find({userId:user._id}).toArray();;
        const name = user.name
        const data = {transactions, name}
        console.log(data)
        res.send(data);

    } catch (err){
        res.status(500).send(err.message);
    }
}
