import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
//cria o banco
const mongoClient = new MongoClient(process.env.DATABASE_URL);

//conecta com o banco
try {
    await mongoClient.connect();
    console.log("mongoDB conectado!");
} catch (err) {
    (err) => console.log(err.message);
}
export const db = mongoClient.db()