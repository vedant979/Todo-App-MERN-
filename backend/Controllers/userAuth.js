import userModel from "../Models/userModel.js";
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
//C-CREATE
const create= async (req, res)=>{

    try{
        const data = new userModel(req.body); 
        //-HASHING PASS
        const hash = bcrypt.hashSync(req.body.pass, 10);
        data.pass = hash; 
        //------

        //SIGN IN
        jwt.sign({"email": req.body.email }, process.env.SECRET_KEY, function(err, token) {
            data.token = token;
            console.log(token);
        }); 
        //------


        await data.save();  
        res.status(201).send(data);
    }
    catch(err)
    {
        console.log(err)
        res.status(404).send(err);
    }
}  
const login =async (req, res)=>{
    
    try{
        try{
            const resp = await userModel.findOne({"email":`${req.body.email}`});
            //DECRYPTING PASS

            const isAuth = bcrypt.compareSync( req.body.pass, resp.pass);
            if(isAuth){
                // const token = jwt.sign({"email": req.body.email }, process.env.SECRET_KEY); 
                // resp.token = token;
                // resp.save();
 
                res.sendStatus(201); 
            }else{
                res.sendStatus(401);
            }
        }catch(err)
        {    
            console.log(err);
            res.sendStatus(404); 
        }
    }
    catch(err)
    {
        console.log(err)
        res.status(404);
    }
}
//R-READ
const getAll = async(req, res)=>{
    try{
        const allData = await userModel.find({"token":req.get('Authorization')});
        res.status(201).send(allData);
    }catch(err){
       res.sendStatus(404); 
    }
} 
const getAll2 = async(req, res)=>{
    try{
        const allData = await userModel.find();
        res.status(201).send(allData);
    }catch(err){
       res.sendStatus(404);
    }
} 
export {create, getAll, login, getAll2}; 