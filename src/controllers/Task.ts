import { Task } from "../models/Task";
import {User} from "~/models/User";
import {Request, Response} from "express"
import {connect} from "mongoose";

//#region GET

const getTasks = (req: Request, res: Response) => {
    Task.find()
        .then((tasks) => res.status(200).send(tasks))
        .catch((err) => console.log(err))

}
const getTasksByAssignee = (req: Request, res: Response) => {
    Task.find({assignee: req.params.assignee})
        .then((tasks) => res.status(200).send(tasks))
        .catch((err) => console.log(err))

}

const getTasksByPole = (req: Request, res: Response) => {
    Task.find({pole: req.params.pole})
        .then((tasks) => res.send(tasks))
        .catch((err) => console.log(err))
}
//#endregion GET
//#region POST
const addTask = (req: Request, res: Response) => {
    let newTask = new Task(req.body)
    newTask.save().then(docs => {
        const assignee = req.body.assignee.split(" ")
        User.findOneAndUpdate({lastname: assignee[1]}, {$addToSet : {tasks: docs._id}})
        res.status(201).send(docs)
    })
}
//#endregion POST
//#region PUT
const updateTaskById = (req: Request, res: Response) => {
    Task.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then((data) => res.send(data))
        .catch((err) => {
            res.send(err)
            console.log(err)
        })
}

const changeStatusTaskById = (req: Request, res: Response) => {
    Task.findByIdAndUpdate(req.params.id, {index: req.body.index, status: req.body.status}, {new: true})
        .then((data) => res.send(data))
        .catch((err) => {
            res.send(err)
            console.log(err)
        })
}
//#endregion PUT
//#region DELETE
const deleteTaskById = (req: Request, res : Response) => {
    Task.findByIdAndDelete(req.params.id)
        .then(() => {
            res.send(204)
            console.log("Tâche supprimée")
        })




}
//#endregion DELETE

export const taskController = {
    getTasks,
    getTasksByAssignee,
    getTasksByPole,
    updateTaskById,
    changeStatusTaskById,
    deleteTaskById,
    addTask
}