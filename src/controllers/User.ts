import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { getToken } from "~/config/token";
import { User } from "../models/User";

const ObjectId = mongoose.Types.ObjectId;

//#region GET
const getUsers = (req: any, res: any) => {
    User.find((err: any, docs: any) => {
        if (!err) {
            res.status(201).send(docs);
        } else {
            console.log(err);
            res.status(505).send(err);
        }
    });
};

const getUsersByPole = (req: any, res: any) => {
    User.find({ pole: req.params.pole }, (err: any, docs: any) => {
        if (!err) {
            res.status(201).send(docs)
        } else {
            res.status(505).message(`Nous n'avons pas pu récupérer les données pour le pole ${req.params.pole}`)
        }
    })

}

const getUserById = (req: any, res: any) => {
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
const addUser = (req: any, res: any) => {
    let user = req.body;
    let newUser = new User(user);
    newUser.save()
        .then((docs) => {
            res.send(docs);
        })
        .catch(err => res.status(500).send(err));
}

const login = (req: any, res: any) => {
    const identifiant = req.body.email;
    console.log("hello")
    User.findOne({ email: identifiant })
        .then((user) => {
            if (user !== null) {
                bcrypt.compare(req.body.password, user.password)
                    .then((passwordCheck) => {
                        if (!passwordCheck) {
                            return res.status(500).send({
                                valid: false,
                                message: "Mauvais mot de passe"
                            })
                        }
                        console.log(getToken(req.body))
                        res.send({ valid: true, accessToken: getToken(req.body) })
                    })
            }

        })

}

//#endregion POST
//#region PUT
const changePassword = (req: any, res: any) => {
    const id = req.params.id;

    //permet de vérifier si le string est bien un _id
    if (!ObjectId.isValid(id)) {
        return res.status(505).send(`Aucun utilisateur trouvé pour l'id : ${id}`);
    }

    const password = req.body.password;
    bcrypt.hash(password, 10)
        .then((hashedPassword) => {
            User.findByIdAndUpdate(id, { $set: { passowrd: hashedPassword } })
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
//#endregion PUT

//#region 
export const userController = {
    getUsers,
    getUsersByPole,
    getUserById,
    addUser,
    login,
    changePassword,
}