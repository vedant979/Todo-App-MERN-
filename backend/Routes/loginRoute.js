import express from "express"
import { login} from "../Controllers/userAuth.js";

const loginRouter = express.Router();
//CRUD
loginRouter.post("/login",login);

export {loginRouter};