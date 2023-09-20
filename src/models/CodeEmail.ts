import mongoose from "mongoose";
import { Schema } from "mongoose";

const CodeEmailModel = new Schema({
    code: {type: String, required: true},
    active: {type: Boolean, required: true, default: true},
    user: {type: String, require: true},

});

export const CodeEmail = mongoose.model("CodeEmail", CodeEmailModel);