import todoModel from "../Models/todoModel.js";

//C-CREATE
const create= async (req, res)=>{
    const data = new todoModel(req.body);
    await data.save();
    res.status(201).send(data);
}
//R-READ
const getAll = async(req, res)=>{
    const allData = await todoModel.find();
    res.status(201).send(allData);
    // console.log(allData);
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
    res.status(201).send("done");
}

//D-DELETE 
//DELETING ONE 
const del=async(req, res)=>{
    const id = req.params.id; 
    await todoModel.findByIdAndDelete(id);
    res.status(201);
}
//DELETING PERMANENTLY
// const deletePerm=async(req, res)=>{
//     const query = req.params.id;
//     const resp = await todoModel.findByIdAndDelete(query);
//     res.status(201).send("done");
// }
export {create, getAll, patch, del, markDoneTask};