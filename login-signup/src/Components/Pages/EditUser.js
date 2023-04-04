import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
function EditUser() {
  const {id}=useParams();
  
  const navigate=useNavigate();
  const [fname,setFname]=useState("");
  const [lname,setLname]=useState("");
  const [email,setEmail]=useState("");
  const [mobile,setMobile]=useState("");
  
  const updateUser=async (e)=>{
    e.preventDefault();
    try{
    const response=await axios.patch(`http://localhost:5432/home/${id}`,{fname,lname,email,mobile});
    console.log("updated");
    navigate('/dashboard/Allusers')
  }
  catch(err)
  {
    console.log(err);
  }
  }
  
  
  return (

    <div className="columns mt-5 is-centered">
    <div className="column is-half">
      <form onSubmit={updateUser}>
        <div className="field">
          <label className="label">First Name</label>
          <div className="control">
            <input
              type="text"
              className="input"
              onChange={(e) => setFname(e.target.value)}
              placeholder="First Name"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Last Name</label>
          <div className="control">
            <input
              type="text"
              className="input"
              onChange={(e) => setLname(e.target.value)}
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              type="text"
              className="input"
        
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Contact Number</label>
          <div className="control">
            <input
              type="text"
              className="input"
      
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Contact Number"
            />
          </div>
        </div>
       
        <div className="field">
          <div className="control">
            <button type="submit" className="button is-success">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  );

  }
export default EditUser