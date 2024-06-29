import mongoose from "mongoose"; 
import { Schema } from "mongoose";

const userSchema = new Schema({
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    email:{
        type:String, 
        unique:true,
        required:true,
        validate: {
            validator: function(v) {
              return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); 
            },
            message: props => `${props.value} is not a valid Email!`
          },    
    },
    pass:{
      type:String, 
      required:true,
      minLength:6,
      validate:{
        validator:function(v){
          return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/gm.test(v);
        },
        message: props=> `${props.value} is too short!`
      }, 
    },
    token: {type:String}
}); 
const userModel = mongoose.model("user", userSchema);
export default userModel; 