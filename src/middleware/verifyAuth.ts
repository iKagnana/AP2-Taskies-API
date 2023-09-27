import jwt from "jsonwebtoken"
import {Request, Response, NextFunction} from "express"

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"]

    if (authHeader) {
        const bearer = authHeader.split(" ")
        const token = bearer[1]
        jwt.verify(token, process.env.SECRET_KEY!, (err, result) => {
            if (err) {
                res.status(401).send("Vous n'avez pas les accès.")
            } else {
                next()
            }
        })
    } else {
        res.status(401).send("Vous n'avez pas les accès.")
    }

}