import React from 'react'
import { NavBar } from '../../Components/NavBar/NavBar';
import { Row } from '../../Components/Row/Row';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const Done = () => {
      //VARIABLE, STATE DECLARATION
      const[db, setDb] = useState();
      const[path, setPath] = useState(window.location.pathname);

      //-------------------------------------------------------
  
  

      
      //R-READ
      async function getData(){
          try{
              // console.log("Fetching DB Data...")
              const response = await axios.get('http://localhost:3000');
              // console.log("Setting Data...")
              setDb(response.data);
              // console.log("Data Set")
  
          }catch(err){
              console.log(err)
          }
      }
      //-------------------------------------------------------
  
  
      //USE EFFECTS
      useEffect(()=>{
          try{
              getData();
          }catch(err){
              console.log(err)
          }
      },[]) 
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
                        <h1>Things Done:</h1>
                    </div>

                </div>
                <div className='bottom-wrapper'>
                    <div className='row-container'>
                        {db &&
                        db.map((data)=>{
                          
                            return(
                              data.marked &&
                                <Row id={data._id} path={path=="/done" && path} title={data.todo} marked={data.marked} isActive={data.isActive}/>  
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
