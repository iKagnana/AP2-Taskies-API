import mongoose from 'mongoose';
const {Schema} = mongoose;

const TaskSchema = new Schema({
    title : {type : String, required : true},
    status : {type: String, required : true},
    assignee : {type : String, required : true},
    desc : {type : String, required : false},
    comment : {type : String, required : false},
    pole: {type: String, required: true}
});
export const Task =  mongoose.model("Task", TaskSchema);