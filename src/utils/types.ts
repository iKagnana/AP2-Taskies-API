import {Schema} from "mongoose";

export interface Task {
    title: string
    status: number
    assignee: string
    desc: string
    files: []
    comment: string
}

export interface User {
    lastname: string
    firstname: string
    email: string
    password: string
    pole: string
    role: string
    tasks: Task[]
}

