import { Task } from "../models/Task";
import {User} from "~/models/User";
import {Request, Response} from "express"

//#region GET
const getTasksByAssignee = (req: Request, res: Response) => {
    Task.find({assignee: req.body.assignee})
        .then((tasks) => res.send(tasks))
        .catch((err) => console.log(err))

}

const getTasksByPole = (req: Request, res: Response) => {
    Task.find({pole: req.body.pole})
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
//#endregion PUT
//#region DELETE
const deleteTaskById = (req: Request, res : Response) => {
    User.findOneAndUpdate({tasks: req.params.id}, {$pull : {tasks : req.params.id}})
    Task.findByIdAndDelete(req.params.id)


}
//#endregion DELETE

export const taskController = {
    getTasksByAssignee,
    getTasksByPole,
    updateTaskById,
    deleteTaskById,
    addTask
}