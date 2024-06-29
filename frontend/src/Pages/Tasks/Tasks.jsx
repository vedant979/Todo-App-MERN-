import React from "react";
import axios from "axios";

import { useEffect, useState} from "react";
import "./Tasks.css";
import { NavBar } from "../../Components/NavBar/NavBar";
import { Row } from "../../Components/Row/Row";
import { useNavigate } from "react-router";
export const Tasks = () => {
  //VARIABLE, STATE DECLARATION
  const [db, setDb] = useState([]);
  const [path, setPath] = useState(window.location.pathname);
  const navigate = useNavigate()
  const [userId, setUserId] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    pass: "",
    token: "",
  });
  const [formData, setformData] = useState({
    todo: "",
    marked: false,
    isActive: false,
    user_id: "",
  });
  //-------------------------------------------------------
    useEffect(()=>{
        getUser();
    },[])
    useEffect(()=>{
      getData();
  },[userId])


  //C-CREATE
  async function addData(data) {
    if (data.todo == "") {
      return;
    }
    const response = await axios.post(import.meta.env.VITE_LOCALHOST, data, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    setDb(response.data);
  }

  //R-READ
  async function getData() {
      const params = { _id: userId._id };
      // console.log(params)
      await axios.get(import.meta.env.VITE_LOCALHOST+"/get", { params }).then((res) => {
        // console.log(res)
        setDb([...res.data]);
      });
    // }
  }
  //-------------------------------------------------------

  //--------------Functions Declaration---------------------
  function handleSubmit(e) {
    e.preventDefault();
    addData(formData);
    // window.location.reload();
    navigate("/todo");
    // getUser();
  }
  // console.log(import.meta.env.VITE_LOCALHOST)
  function handleChange(e) {
    setformData({
      [e.target.name]: e.target.value,
      marked: false,
      isActive: false,
    });
  }
  async function getUser() {
    const res = await axios.get(import.meta.env.VITE_LOCALHOST+"/signup", {
      headers: { Authorization: localStorage.getItem("token") },
    });
    setUserId(...res.data);
  }
  //-------------------------------------------------------

  //USE EFFECTS

  //-------------------------------------------------------

  // console.log(userId)
  // console.log(db)

  return (
    <div className="container-wrapper">
      <div className="main-container">
        <div className="side-menu">
          <NavBar />
        </div>
        <div className="right-menu">
          <div className="menu-container">
            <div className="wrapper">
              <div className="top-wrapper">
                <div className="title">
                  <h1>Things to do:</h1>
                </div>
                <div className="form-container">
                  <form className="todo-form" onSubmit={handleSubmit}>
                    <input
                      type="text"
                      className="inputArea"
                      placeholder="Enter new Todo..."
                      name="todo"
                      value={formData.todo}
                      onChange={handleChange}
                    ></input>
                    <button className="submit-btn">New Task</button>
                  </form>
                </div>
              </div>
              <div className="bottom-wrapper">
                <div className="row-container">
                  {db.length > 0 &&
                    db.map((data) => {
                      // console.log(data)
                      return (
                        data.isActive == false &&
                        data.marked == false && (
                          <Row
                            id={data._id}
                            path={path == "/" && path}
                            key={data._id}
                            title={data.todo}
                            marked={data.marked}
                            isActive={data.isActive}
                          />
                        )
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
