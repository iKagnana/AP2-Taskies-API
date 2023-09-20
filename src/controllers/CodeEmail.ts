import {CodeEmail} from "~/models/CodeEmail";
import {Request, Response} from "express"

//#region GET
const getCodeEmailByCode = (req: Request, res: Response) => {
    CodeEmail.findOne({code: req.params.code})
        .then((docs) => {
            console.log(docs)
            res.status(201).send(docs)
        })
        .catch((err) => {
            console.log(err)
        })
}

//#region POST
const desactivedCode = (req: Request, res: Response) => {
    CodeEmail.findByIdAndUpdate(req.params.id, {active : false})
        .then(() => {
            res.send(203)
            console.log("Code désactivé")
        })
}

//#region DELETE
const deleteCodeById = (req: Request, res: Response) => {
    CodeEmail.findByIdAndDelete(req.params.id)
        .then(() => {
            res.send(204)
            console.log("Code supprimé")
        })
}

export const codeEmailController = {
    getCodeEmailByCode,
    desactivedCode,
    deleteCodeById
}