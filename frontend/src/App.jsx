import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import deleteIcon from "./assets/deleteIcon.png";
import editIcon from "./assets/edit.png";
import {Routings} from "./Routes/Routings";
function App() {

  const[DbData, setDbData] = useState();
  const [formData, setFormData] = useState({
    "todo":"",
    "marked":false ,
    "isActive":false
  });
  const elem = document.getElementsByClassName("data-container");


  const getData= async()=>{
    const res = await axios.get('http://localhost:3000')
    setDbData(res.data);
  }
  useEffect(()=>{
    getData();
  },[])



  function handleChange(event){
      setFormData(
          {
            [event.target.name]:event.target.value,
            "marked":false,
            "isActive":false
          }
      )
  }
  function handleSubmit(event){
    event.preventDefault(); 
    addData(formData);
    window.location.reload();
  }
  const addData = async(data)=>{
    if(data.todo==""){
      return;
    }
      await axios.post("http://localhost:3000/", data)
      console.log(data);
    
    }


  //DELETE FUNCTIONALITY
  const delData = async(key)=>{
    await axios.delete('http://localhost:3000/'+key);
  }
  // function handleDelete(id){
  //   // const id = e.target.id
  //   delData(id);
  //   window.location.reload();
  // }

  //MARK DONE
  function handleClick(e, id){
    const para = document.getElementsByClassName(id);
    para[0].style.textDecoration="line-through";
    updateDb(id);
  }
  async function updateDb(id){
    await axios.patch(`http://localhost:3000/${id}`,{"marked":true});
  }
  return (
    <>
      <Routings/>
    </>
    // <>
    //   <div className='main-container'>
    //     <div className='todo-container'> 
    //       <h1>TodoList</h1>
    //       <div className='todo-card'>
    //         <form className='todo-form' onSubmit={handleSubmit}>
    //             <input type="text" className='inputArea' placeholder='Enter new Todo...' name="todo"  value={formData.todo}
    //           onChange={handleChange}></input>
    //          </form>
    //       </div>
    //       <div className='data-area' >
    //           {DbData && DbData.map((data)=>{
    //             return(
    //               !data.isActive &&
    //               <>
    //                 <div className='data-container' key={data._id} >
    //                   <p className={`data-para ${data._id} `} style={{textDecoration:(data.marked)?"line-through":""}}>{data.todo}</p>
    //                   <div className='utils'>
    //                     <div className='mark-read'>
    //                       <img src={editIcon} className='icons'  onClick={()=>handleClick(event,data._id)}></img>
    //                     </div>
    //                     <div className='delete'>
    //                       <img src={deleteIcon} className='icons' onClick={()=>handleDelete(data._id)}></img>
    //                     </div>
    //                   </div>
    //                 </div>
    //                 </>
    //               )
                  
    //           })
    //           }
    //       </div>
    //     </div>
    //   </div>
    // </>
  )
}

export default App
