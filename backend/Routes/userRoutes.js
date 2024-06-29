import express from "express"
import { create, getAll ,getAll2, login} from "../Controllers/userAuth.js";

const userRouter = express.Router();
// const loginRouter = express.Router();

//CRUD
// userRouter.post("/login",login);
userRouter.post("/signup", create);
userRouter.get("/signup", getAll);
userRouter.get("/signup/2", getAll2);
export {userRouter};