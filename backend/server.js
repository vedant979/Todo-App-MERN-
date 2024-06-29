import "dotenv/config"
import express from "express";
import mongoose from "mongoose";
import {todoRouter} from "./Routes/todoListRoutes.js"; 
import {userRouter} from "./Routes/userRoutes.js"; 
import {loginRouter} from "./Routes/loginRoute.js"; 
import  jwt  from "jsonwebtoken";
import cors from "cors";
 
const server = express(); 
   
//DB CONNECTION 
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGODB_URI_123); 
}

//FUNCTIONS   
const auth = (req,res,next)=>{ 
  // console.log(req.get("Authorization"))
  try{ 
    const token = req.get('Authorization').split("Bearer ")[1];
    const decoded =  jwt.verify(token, process.env.SECRET_KEY);
    if(decoded.email){ 
      next();
      res.status(201); 
    }
    else
    {
        res.sendStatus(401);
    }
    }
    catch(err)
    { 
    console.log(err)
      res.sendStatus(404);
    }
};  
 
//BODY PARSER AND MIDDLEWARE   
server.get("/testing",(req,res)=>{
  res.send("Successfull!!");
});
server.use(cors());    
server.use(express.json()); 
server.use(express.static(process.env.PUBLIC_DIR)) 
server.use("/", todoRouter);  
server.use("/",userRouter);   
server.use("/",auth,loginRouter);   


//  console.log(process.env.PUBLIC_DIR)
  
 
//Defining PORT Number
const port = process.env.PORT; 
server.listen(process.env.PORT, () => { 
    console.log(`App listening on port ${port}`);  
});  