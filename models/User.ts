import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema({
    lastName : {type : String, required : true}, 
    firstName : {type : String, required : true}, 
    email : {type : String, required : true}, 
    password : {type : String, required : true}, 
    pole : {type : String, required: true}, 
    tasks : [{type : Schema.Types.ObjectId, ref : "Task"}],
    role : {type : Number, requried : true}
});

export const User = mongoose.model("User", UserSchema);