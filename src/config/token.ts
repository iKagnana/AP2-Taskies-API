import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const key = process.env.KEY || "";

export const getToken = (payload: object) => {
    const accessToken = jwt.sign(payload, key, { expiresIn: "1d" })
    return accessToken
}