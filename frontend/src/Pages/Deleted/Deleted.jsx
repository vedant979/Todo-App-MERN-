import React from 'react'
import { NavBar } from '../../Components/NavBar/NavBar';
import { Row } from '../../Components/Row/Row';
import axios from 'axios';
import { useEffect, useState } from 'react';


export const Deleted = () => {
    //VARIABLE, STATE DECLARATION
    const[db, setDb] = useState();
    const[path, setPath] = useState(window.location.pathname);
    const [user, setUser] = useState({
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        pass: "",
        token: "",
        });
      //-------------------------------------------------------
      useEffect(()=>{
        getUser();
      },[])

    //R-READ
    async function getData(){
        const params = { _id: user._id };
        try{
            const response = await axios.get(import.meta.env.VITE_LOCALHOST+"/get",{params:params});
            setDb(response.data);
        }catch(err){
            console.log(err)
        }
    }
    async function getUser() {
        const res = await axios.get(import.meta.env.VITE_LOCALHOST+"/signup", {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setUser(...res.data);
      }
    //-------------------------------------------------------


    //USE EFFECTS
    useEffect(()=>{
        try{
            getData();
        }catch(err){
            console.log(err)
        }
    },[user]) 
    //-------------------------------------------------------
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
                        <h1>Things Deleted:</h1>
                    </div>

                </div>
                <div className='bottom-wrapper'>
                    <div className='row-container'>
                        {db && db.map((data)=>{
                            return(
                              data.isActive &&
                                <Row key={data._id}id={data._id} path={path=="/deleted" && path} title={data.todo} marked={data.marked} isActive={data.isActive}/>  
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
