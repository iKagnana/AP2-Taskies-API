import mongoose from 'mongoose';
const {Schema} = mongoose;

const TaskSchema = new Schema({
    title : {type : String, required : true},
    status : {type: Number, required : true},
    assignee : {type : String, required : true},
    desc : {type : String, required : false}, 
    files : {type : Array, required : false},
    comment : {type : String, required : false},
});

export const Task =  mongoose.model("Task", TaskSchema);