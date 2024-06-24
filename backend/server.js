import "dotenv/config"
import express from "express";
import mongoose from "mongoose";
import {todoRouter} from "./Routes/todoListRoutes.js"; 
import cors from "cors";

const server = express();

//DB CONNECTION 
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGODB_URL); 
}

//BODY PARSER AND MIDDLEWARE      
server.use(cors());   
server.use(express.json()); 
server.use("/",todoRouter);  
 
 

//Defining PORT Number
const port = process.env.PORT; 
server.listen(process.env.PORT, () => { 
    console.log(`App listening on port ${port}`);  
});  