import React, { useState,useEffect } from 'react'
import { useFormik } from 'formik';
import { Link,useLocation } from 'react-router-dom';
 import axios from 'axios';
function Allusers() {
  const url="http://localhost:5432/home";
  // const location=useLocation();
  //  const curr_id=location.state.curr_id;
  // console.log("hello");
  const [users,setUsers]=useState([]);
  useEffect(()=>{
    getAllUsers();
  },[])
  const getAllUsers=async ()=>{
      const res=await axios.get(url);
      setUsers(res.data);
    }
    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:5432/home/${id}`);
        getAllUsers();
      
    };
   
  return (
<div className="columns mt-5">
                  <Link
                    to="/dashboard"
                    className="button is-info is-small mr-1"
                  >
                    Home
                  </Link>
      <div className="column ">
        
        <table className="table is-striped is-fullwidth mt-2">
          <thead>
            <tr>
              <th>No</th>
              <th>First Name</th>
              <th>Last Name</th> 
              <th>Email</th>
              <th>Mobile</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.fname}</td> 
                <td>{user.lname}</td> 
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>
                  <Link
                    to={`edit/${user._id}`}
                    className="button is-info is-small mr-1"
                  >
                    Edit
                  </Link>
                  
                  
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="button is-danger is-small"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Allusers