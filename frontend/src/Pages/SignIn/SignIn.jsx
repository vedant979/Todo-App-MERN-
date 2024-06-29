import React, { useEffect, useState } from 'react'
import { NavBar } from '../../Components/NavBar/NavBar'
import { Link, useNavigate } from 'react-router-dom';
import "./SignIn.css";
import axios from 'axios';
export const SignIn = () => {
    //STATE VARS------------------------------------ 
    const navigate = useNavigate();
    const[userData, setUserData] = useState(
        {
            firstName:"",
            lastName:"",
            email:"",
            pass:"",
            token:""
        }
    );
    const[formData, setFormData] = useState(
        {
            email:"",
            pass:""
        }
    );
    useEffect(()=>{
        getData();
    },[])
//POSTING DB DATA------------------------------------ 
    async function addData(data){
        const uData = userData.find((x)=>{
            return x.email==data.email && x.token;
        }) 
        console.log(uData.token); 
        localStorage.setItem("token",`${uData.token}`)
        await axios.post(import.meta.env.VITE_LOCALHOST+"/login", data,{ headers: { "Authorization": `Bearer ${uData.token}` }}).then((res)=>{
            res.data=='Created' && navigate("/todo");
            // console.log(localStorage.getItem("token"));
        });
    } 



//FUNCTIONS------------------------------------ 
    const getData = async()=>{
        const resp = await axios.get(import.meta.env.VITE_LOCALHOST+"/signup/2");
        setUserData(resp.data);
        console.log(...userData)
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
        addData(formData)
        e.preventDefault();
    }

  return (
    <div className='container-wrapper'>
    <div className='main-signin-container'>
        <div className='auth-right-menu'>
            <div className='menu-container'>
                <div className='auth-wrapper'>
                    <div className='signin-wrapper'>
                        <div className='title'>
                            <h1>Login:</h1>
                        </div>
                        <div className='signin-container'>
                            <form className='signin-form' onSubmit={handleSubmit}>
                            <input type="email" className='inputArea' placeholder='Email' name="email"
                                    value={formData.email} 
                                    onChange={handleChangeEmail}  

                                    ></input>

                                    <input type="password" className='inputArea' placeholder='Password' name="pass"
                                    value={formData.pass}
                                    onChange={handleChangePass}  

                                    ></input>
                                <button className='submit-btn'>Login</button>
                                <div className='signup-option'>
                                    <p>Not registered yet?, Click here <Link to="/signup">Register</Link></p>
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
