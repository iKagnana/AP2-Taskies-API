import mongoose from 'mongoose';
const {Schema} = mongoose;

const TaskSchema = new Schema({
    index : {type: Number, required: true},
    title : {type : String, required : true},
    status : {type: String, required : true},
    assignee : {type : String, required : true},
    desc : {type : String, required : false},
    comment : {type : String, required : false},
    pole: {type: String, required: true},
    files: {type: Array, required: false}
});
export const Task =  mongoose.model("Task", TaskSchema);