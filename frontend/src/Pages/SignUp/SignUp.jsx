import React, { useState } from 'react'
import "./SignUp.css";
import { NavBar } from '../../Components/NavBar/NavBar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import 'dotenv'
export const SignUp = () => {

//STATE VARS------------------------------------ 
const navigate = useNavigate();
    const[formData, setFormData] = useState(
        {
            firstName:"",
            lastName:"",
            email:"",
            pass:""
        }
    );
    console.log(import.meta.env.VITE_LOCALHOST)

//FETCHING DB DATA------------------------------------ 
const addData = async(data)=>{
    const resp = await axios.post(import.meta.env.VITE_LOCALHOST+"/signup",data);
    navigate("/");
}

//FUNCTIONS------------------------------------ 
    function handleChangeFname(e){
        setFormData({
            ...formData,
            [e.target.name]:e.target.value

        })
    }
    function handleChangeLname(e){
        setFormData({
            ...formData,
            [e.target.name]:e.target.value

        })
    }
    function handleChangeEmail(e){
        setFormData({
            ...formData,
            [e.target.name]:e.target.value

        })
    }
    function handleChangePass(e){
        setFormData({
            ...formData,
            [e.target.name]:e.target.value

        })
    }

    function handleSubmit(e){
        // console.log(formData)
        addData(formData)
        e.preventDefault();
    }



  return (
    <div className='container-wrapper'>
        <div className='main-signup-container'>
            <div className='auth-right-menu'>
                <div className='menu-container'>
                    <div className='auth-wrapper'>
                        <div className='signup-wrapper'>
                            <div className='title'>
                                <h1>Register Yourself:</h1>
                            </div>
                            <div className='signup-container'>
                                <form className='signup-form' onSubmit={handleSubmit}>
                                    <input 
                                    type="text" 
                                    className='inputArea' 
                                    placeholder='First Name'
                                    value={formData.firstName}
                                    onChange={handleChangeFname}  
                                    name="firstName"></input>

                                    <input type="text" className='inputArea' placeholder='Last Name' name="lastName"
                                    value={formData.lastName} 
                                    onChange={handleChangeLname}  

                                    ></input>

                                    <input type="email" className='inputArea' placeholder='Email' name="email"
                                    value={formData.email} 
                                    onChange={handleChangeEmail}  

                                    ></input>

                                    <input type="password" className='inputArea' placeholder='Password' name="pass"
                                    value={formData.pass}
                                    onChange={handleChangePass}  

                                    ></input>
                                    <button className='submit-btn'>Register</button>
                                    <div className='login-option'>
                                        <p>Already registered?, Click here to <Link to="/">Login</Link></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
