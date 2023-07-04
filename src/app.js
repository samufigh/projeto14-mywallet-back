import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

//cria o banco 
const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;

//conecta com o banco
mongoClient.connect()
    .then(() => db = mongoClient.db())
    .catch((err) => console.log(err.message));


const app = express();
app.use(cors());

app.listen (5000, console.log("Servidor rodando na porta 5000"));