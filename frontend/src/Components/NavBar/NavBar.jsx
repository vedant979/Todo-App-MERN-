import React from 'react';
import "./NavBar.css";
import { Link } from 'react-router-dom';
import deleteIcon from "../../assets/deleteBlack.svg";
import list from "../../assets/list.svg";
import done from "../../assets/done.svg";
import hamburger from "../../assets/hamburger.svg";
export const NavBar = () => {
  return (
    <div className='nav-container'>
      <div className='container'>
        <div className='wrapper'>
          <div className='border-btm'>
            <div className='app-title'>
              <Link to="/"> 
                <img src={hamburger}></img>
              </Link>
            </div>
          </div>
          <div className='nav-links'>
            <div className='l1'>
              <Link to="/"> 
                <img src={list}></img>
              </Link>
            </div>
            <div className='l2'>
              <Link to="/done">
                <img src={done}></img>
              </Link>
            </div>
            <div className='l3'>
              <Link to="/deleted">
                <img src={deleteIcon}></img>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
