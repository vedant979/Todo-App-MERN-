import express from "express"
import {create, getAll, patch, del, markDoneTask} from "../Controllers/todoData.js";

const todoRouter = express.Router();
//CRUD
todoRouter.post("/", create);
todoRouter.get("/get", getAll);  
todoRouter.patch("/:id", patch);
todoRouter.put("/:id", markDoneTask);
todoRouter.delete("/:id", del);
export {todoRouter};