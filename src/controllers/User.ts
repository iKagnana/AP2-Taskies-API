import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import {CodeEmail} from "~/models/CodeEmail";
import express, {Request, Response} from "express";
import jwt from "jsonwebtoken"
import transporter from "~/config/mailConfig";
import Sqids from "sqids";

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

    //send email in order to change user's password
    transporter.sendMail({
        from: '"administrateur GSB" <kagnana.ith@ecole-isitech.fr>',
        to: user.email,
        subject: "Modification du mot de passe",
        text: "Voici votre mot de passe : " + password,
    })
        .then(info => console.log("Message sended !"))
        .catch((err) => console.log("Message cannot be sended"))

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

const getCodeEmail = (req: Request, res: Response) => {
    User.find({email : req.body.email})
        .then((user) => {
            if (user) {
                const sqids = new Sqids({
                    minLength : 10
                })
                const id = sqids.encode([req.body.email.length, Math.floor(Math.random() * 9)])

                const newCode = new CodeEmail({code: id, user: req.body.email})
                newCode.save()
                transporter.sendMail({
                    from: '"administrateur GSB" <kagnana.ith@ecole-isitech.fr>',
                    to: req.body.email,
                    subject: "Réinitialisation de votre mot de passe",
                    text: "Cher utilisateur, suite à la perte de votre mot de passe voici le lien pour réinitialiser votre mot de passe : " +
                        "http://localhost:5173/reset-password/id=" + id
                })
                    .then(info => {
                        res.send("Email bien envoyé.")
                        console.log("Message sended !")
                    })
                    .catch((err) => console.log("Message cannot be sended"))




            }

        })
        .catch((err) => {
            console.log(err)
            res.status(204).send("Couldn't find the user.")
        })
}
//#endregion POST
//#region PUT
const changePassword = (req: Request, res: Response) => {
    const search = {email: req.body.email}
    const password = req.body.password;
    bcrypt.hash(password, 10)
        .then((hashedPassword) => {
            User.findOneAndUpdate(search, { $set: { password: hashedPassword } })
                .then((docs) => {
                    transporter.sendMail({
                        from: '"administrateur GSB" <kagnana.ith@ecole-isitech.fr>',
                        to: req.body.email,
                        subject: "Réinitialisation de votre mot de passe",
                        text: "Cher utilisateur, votre mot de passe a bien été réinitialisé."
                    })
                        .then(info => {
                            res.status(203).send(docs)
                            console.log("Message sended !")
                        })
                        .catch((err) => console.log("Message cannot be sended"))

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
    const password = req.body.password;

    if (password !== "") {
        //send email in order to change user's password
        transporter.sendMail({
            from: '"administrateur GSB" <kagnana.ith@ecole-isitech.fr>',
            to: req.body.email,
            subject: "Modification du mot de passe",
            text: "Cher utilisateur votre mot de passe a été modifié. \n Votre identifiant :" + req.body.email + " \n Votre mot de passe : " + password,
        })
            .then(info => console.log("Message sended !"))
            .catch((err) => console.log("Message cannot be sended"))

        bcrypt.hash(password, 10)
            .then((hashedPassword) => {
                req.body.password = hashedPassword
                User.findByIdAndUpdate(req.params.id, req.body, {new: true})
                    .then((data) => res.status(301).send(data))
                    .catch((err) => {
                        res.status(401).send(err)
                        console.log(err)
                    })
            })
    } else {
        const updatedUser = {
            lastname : req.body.lastname,
            firstname : req.body.firstname,
            email : req.body.email,
            pole : req.body.pole,
            role : req.body.role,
        }
        User.findByIdAndUpdate(req.params.id, updatedUser, {new: true})
            .then((data) => res.status(301).send(data))
            .catch((err) => {
                res.status(401).send(err)
                console.log(err)
            })
    }


}
//#endregion PUT
//#region DELETE
const deleteUserById = (req: Request, res: Response) => {
    User.findByIdAndDelete(req.params.id)
        .then((value) => console.log(value))
}
//#endregion DELETE

//#region 
export const userController = {
    getUsers,
    getUsersByPole,
    getUserById,
    addUser,
    changePassword,
    getCodeEmail,
    login,
    updateUserById,
    deleteUserById
}