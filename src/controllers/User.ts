import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import express, {Request, Response} from "express";
import jwt from "jsonwebtoken"

const ObjectId = mongoose.Types.ObjectId;

//#region GET
const getUsers = (req: Request, res: Response) => {
    User.find({})
        .then((docs) => res.status(201).send(docs))
        .catch((err) => {
            console.log(err)
            res.status(501).send("Erreur dans la récupération de données")
        })
};

const getUsersByPole = (req: Request, res: Response) => {
    User.find({ pole: req.params.pole }, (err: any, docs: any) => {
        if (!err) {
            res.status(201).send(docs)
        } else {
            res.status(505).send(`Nous n'avons pas pu récupérer les données pour le pole ${req.params.pole}`)
        }
    })

}

const getUserById = (req: Request, res: Response) => {
    User.findOne({ _id: req.params.id }, (err: any, docs: any) => {
        if (!err) {
            res.status(201).send(docs)
        } else {
            res.status(505).send({
                message: `Nous n'avons pas pu récupérer l'utilisateur avec l'identifiant ${req.params.id}`,
                err
            })
        }
    })
}

//#endregion GET
//#region POST
const addUser = (req: Request, res: Response) => {
    let user = req.body;
    let password = req.body.password

    //hash password
    bcrypt
        .hash(password, 10)
        .then((hashedPw) => {
            user.password = hashedPw
            let newUser = new User(user);
            return newUser.save();
        })
        .then((docs) => {
            res.status(201).send(docs);
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
}

const login = (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    let isEqual : Promise<boolean>
    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                return res.status(404).send("Aucun utilisateur trouvé")
            }
            bcrypt.compare(password, user.password)
            .then((isEqual) => {
                if (!isEqual) {
                    return res.status(401).send("Mauvais mot de passe")
                }
                const token = jwt.sign(
                    { email: email, _id: user._id },
                    process.env.SECRET_KEY!,
                    { expiresIn: "5h" }
                );

                res.status(200).send({ user: user, token: token, message: "Vous êtes connecté", status: true });
            })

        });
}
//#endregion POST
//#region PUT
const changePassword = (req: Request, res: Response) => {
    const id = req.params.id;

    //permet de vérifier si le string est bien un _id
    if (!ObjectId.isValid(id)) {
        return res.status(505).send(`Aucun utilisateur trouvé pour l'id : ${id}`);
    }

    const password = req.body.password;
    bcrypt.hash(password, 10)
        .then((hashedPassword) => {
            User.findByIdAndUpdate(id, { $set: { password: hashedPassword } })
                .then((docs) => {
                    res.status(203).send(docs)
                })
        })
        .catch((err) => {
            return res.status(401).send({
                message: "Impossible de changer de mot de passe.",
                err
            })
        })
}

const updateUserById = (req: Request, res: Response) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then((data) => res.status(301).send(data))
        .catch((err) => {
            res.status(401).send(err)
            console.log(err)
        })
}
//#endregion PUT
//#region DELETE
const deleteUserById = (req: Request, res: Response) => {
    User.findByIdAndDelete(req.params.id)
}
//#endregion DELETE

//#region 
export const userController = {
    getUsers,
    getUsersByPole,
    getUserById,
    addUser,
    changePassword,
    login,
    updateUserById,
    deleteUserById
}