import todoModel from "../Models/todoModel.js";
import userModel from "../Models/userModel.js";
import { ObjectId } from "mongodb"
//C-CREATE 
const create= async (req, res)=>{
    const user = await userModel.findOneAndUpdate({"token":`${req.get("Authorization")}`}, {"data_id":[req.body]});
    const data = new todoModel(req.body);
    data.user_id = user._id;
    await data.save();
    res.status(201);
}
//R-READ 
const getAll = async(req, res)=>{ 
    try{ 
        const id = await `${req.query._id}`
        // console.log(id);
        const hex = /[0-9A-Fa-f]{6}/;

        if(hex.test(id)){
            // console.log(hex.test(id)+" "+id);
            const allData = await todoModel.find({"user_id":id});
            // hex.test(id) && console.log(allData); 
            res.status(201).send(allData); 
        }
 
    }catch(err){
        // console.log(err)
    }
}  
//P-PATCH
const patch = async(req, res)=>{
    const id = req.params.id;
    const body = req.body;
    const updatedData = await todoModel.findByIdAndUpdate(id, body, {new:"true"});
    res.status(201);
}

//MARKING MARKING DONE 
const markDoneTask = async (req, res)=>{
    const query = req.params.id;
    const resp = await todoModel.findByIdAndUpdate(query,{"marked":true});
    res.status(201);
}

//D-DELETE 
//DELETING ONE 
const del=async(req, res)=>{
    const id = req.params.id; 
    await todoModel.findByIdAndDelete(id);
    res.status(201);
}
export {create, getAll, patch, del, markDoneTask};