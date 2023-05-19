import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as dotenv from "dotenv"; //permet d'utiliser les variables d'environnement depuis le fichier .env
import "./config/database"

//#region CONFIG
dotenv.config()
const app = express();
const PORT = process.env.PORT || 6666
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
//#endregion
//#region IMPORT ROUTES
import { userRoute } from "./routes/User";

//#region ROUTES
app.use("/users", userRoute);

app.listen(PORT, () => {
    console.log(`The app listening at http://localhost:${PORT}`);
});