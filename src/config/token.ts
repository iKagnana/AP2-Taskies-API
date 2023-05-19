import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

const key = process.env.KEY || "";

export const getToken = (payload: object) => {
    console.log(payload)
    jwt.sign(payload, key, {
        expiresIn: "1d"
    }, (err, token) => {
        if (!err) {
            console.log("here", token)
            return token
        } else {
            console.log(err)
        }
    })
}