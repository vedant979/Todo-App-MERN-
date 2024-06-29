import mongoose from "mongoose";
import { Schema } from "mongoose";


const todoListSchema = new Schema({
    todo:{type:String, required:true},
    marked:{type:Boolean, default:false},
    isActive:{type:Boolean, default:false},
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
});
const todoData  = mongoose.model("todoData", todoListSchema);
export default todoData;