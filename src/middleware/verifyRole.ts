import {User} from "~/models/User";
import {Request, Response, NextFunction} from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    User.findById(req.params.userId)
        .then((docs) => {
            if (docs && docs.role === 0) {
                next()
            } else {
                res.status(401).send("Vous n'avez pas l'accès.")
            }
        })
        .catch((err) => {
            console.log(err)
        })
}