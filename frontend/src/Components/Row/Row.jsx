import React, { useState, useEffect } from 'react';
import "./Row.css";
import axios from 'axios';
import deleteIcon from "../../assets/deleteBlack.svg"
import markDone from "../../assets/done.svg"

export const Row = ({id,title, marked, isActive,path}) => {

    //VARS, STATE DECLARATION
    const[checkHover, setCheckHover] = useState(false);
    //-------------------------------------------------------


    //CRUD DECLARATION
    //P-PATCH
    async function markedDone(key){
        try{
            await axios.put('http://localhost:3000/'+key,{"marked":true});
        }catch(err){
            console.log(err)
        }
    }
    async function markIsActiveData(key){
            await axios.patch('http://localhost:3000/'+key,{"isActive":true});
    }

    //D-DELETE 
    async function deletePermanently(key){
        try{
            await axios.delete(`http://localhost:3000/`+key);
        }catch(err){
            console.log(err)
        }
    }



    //-------------------------------------------------------


    //FUNCTION DECLARATIONS

    //MOUSE ENTER AND LEAVE EVENTS
    function handleMEnter(){
        setCheckHover(true);
    }
    function handleMLeave(){
        setCheckHover(false);
    }
    //----------------------------

    function handleMarked(id){
        markedDone(id);
        window.location.reload();
    }
    function handleDelete(id){
        if(path=="/deleted" || path=="/done"){
            // console.log(id);
            deletePermanently(id);
        }else{
            markIsActiveData(id);
        }
        window.location.reload();
    }
    //-------------------------------------------------------

  return (
    <div className='data-wrapper' onMouseEnter={handleMEnter} onMouseLeave={handleMLeave} key={id}>
        <div className='data'>
            <div className='title'>
                <p>{title}</p>
            </div>
            <div className='option-wrapper' style={{display: checkHover ? "flex" : "none"}}>
                <div className='mark-done' onClick={()=>{handleMarked(id)}}>
                    <img src={markDone}></img>
                </div>
                <div className='delete' onClick={()=>{handleDelete(id)}}>
                    <img src={deleteIcon}></img>
                </div>
            </div>
        </div>
    </div>
  )
}

