import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema({
    lastname: { type: String, required: true },
    firstname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, default: "" },
    pole: { type: String, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    role: { type: Number, requried: true }
});

export const User = mongoose.model("User", UserSchema);