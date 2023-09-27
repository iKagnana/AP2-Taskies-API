import express from "express";
import cors from "cors";
import * as dotenv from "dotenv"; //permet d'utiliser les variables d'environnement depuis le fichier .env
import "./config/database"

//#region CONFIG
dotenv.config()
const app = express();
const PORT = process.env.PORT || 6666
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//#endregion
//#region IMPORT ROUTES
import { userRoute } from "./routes/User";
import {taskRoute} from "~/routes/Task";
import {codeEmailRoute} from "~/routes/CodeEmailRoute";
//#region ROUTES
app.use("/users", userRoute);
app.use("/tasks", taskRoute);
app.use("/codeEmail", codeEmailRoute);

app.all("*", function (req: any, res: any) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
});

app.listen(PORT, () => {
    console.log(`The app listening at http://localhost:${PORT}`);
});