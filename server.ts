import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as dotenv from "dotenv"; //permet d'utiliser les variables d'environnement depuis le fichier .env

dotenv.config()

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

const PORT = process.env.PORT || 6666
