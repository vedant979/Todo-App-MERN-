import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import "./Tasks.css";
import { NavBar } from '../../Components/NavBar/NavBar';
import { Row } from '../../Components/Row/Row';
export const Tasks = () => {

    //VARIABLE, STATE DECLARATION
    const[db, setDb] = useState([]);
    const[path, setPath] = useState(window.location.pathname);
    const[formData, setformData] = useState(
        {
            "todo":"",
            "marked":false,
            "isActive":false
        }
    
    );
    //-------------------------------------------------------


    //CRUD OPERATIONS
    //C-CREATE
    async function addData(data){
        if(data.todo==""){
            return;
        }
        try{
            // console.log("Fetching DB Data...")
            const response = await axios.post('http://localhost:3000',data);
            // console.log("Setting Data...")
            setDb(response.data);
        }catch(err){
            // console.log(err)
        }

    }
    
    //R-READ
    async function getData(){
        await axios.get('http://localhost:3000').then((res)=>{setDb([...res.data])});
    }
    //-------------------------------------------------------
    

    //--------------Functions Declaration---------------------
    function handleSubmit(e){
        e.preventDefault();
        addData(formData);
        window.location.reload();
    }
    function handleChange(e){
        setformData(
            {
                [e.target.name]:e.target.value,
                "marked":false,
                "isActive":false
            }
        )
    }
    //-------------------------------------------------------


    //USE EFFECTS
    useEffect(()=>{
        getData();
    },[]) 
    //-------------------------------------------------------


    // console.log(db)
    // console.log(db)

  return (
    <div className='container-wrapper'>
        <div className='main-container'>
            <div className='side-menu'>
                <NavBar/>
            </div>
            <div className='right-menu'>
                <div className='menu-container'>
                    <div className='wrapper'>
                        <div className='top-wrapper'>

                            <div className='title'>
                                <h1>Things to do:</h1>
                            </div>
                            <div className='form-container'>
                            <form className='todo-form' onSubmit={handleSubmit}>
                                <input type="text" className='inputArea' placeholder='Enter new Todo...' name="todo"  value={formData.todo} onChange={handleChange}></input>
                                <button className='submit-btn'>New Task</button>
                            </form>
                            </div>
                        </div>
                        <div className='bottom-wrapper'>
                            <div className='row-container'>
                                {db.length>0 &&
                                db.map((data)=>{
                                    // console.log(data)
                                    return(
                                        // (data.isActive==false && data.marked==false) && 
                                        <Row id={data._id} path={path=="/" && path}key={data._id} title={data.todo} marked={data.marked} isActive={data.isActive}/>     
                                    )
                                })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
