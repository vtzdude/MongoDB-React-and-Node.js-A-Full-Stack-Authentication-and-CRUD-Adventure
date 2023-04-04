import React, { useState } from 'react'
import { Link, useNavigate ,useLocation} from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios'

function Dashboard() {

    const [mail,setData]=useState("");
   
    const navigate=useNavigate();
    const location=useLocation();
    const [userId, setUserId] = useState(() => {
      const savedUserId = localStorage.getItem("userId");
      return savedUserId ? JSON.parse(savedUserId) : location.state?.id || null;
    });
    useEffect(() => {
      if (location.state?.id ) {
        // id is null in location.state but we have a userId, so set it back to null
        setUserId(location.state.id);
      } 
    }, [location.state]);

  
   
    //  const {id}=location.state;
    
    // console.log(id);
    //const id="640daffa8f22ca84403ab65b";
   // console.log(id);
   useEffect(() => {
    if (!userId) {
      // user is not logged in, redirect to login page
      alert("User logged out");
      navigate('/'); 
    }
    else {
      localStorage.setItem("userId", JSON.stringify(userId));
      getUser();
    }
  }, [userId]);
    
  const getUser = () => {
    axios
      .get(`http://localhost:5432/home/${userId}`)
      .then((res) => {
        setData(res.data.email);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = () => {
    setUserId(null);
    localStorage.removeItem("userId");
    const response=axios.post("http://localhost:5432/home");
    navigate('/', { state: { id: null } });
  };
  
  return (
    <div>
  
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      
      <div className="collapse navbar-collapse" id="navbarButtonsExample">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          
          <li className="nav-item">
            <Link to={{ pathname: '/dashboard/Allusers', state: { curr_id: userId }  }}className="nav-link">
              All Users
            </Link>
          </li>
        </ul>
        {/* Left links */}
        <div className="d-flex align-items-center">
          <button type="button" className="btn btn-link px-3 me-2" onClick={handleChange}>
            Log Out
          </button>
          
        </div>
      </div>
      {/* Collapsible wrapper */}
    </div>
    
  </nav>

  <div className="card">
  <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
    <img
      src="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg"
      className="img-fluid" style={{objectFit: 'cover', objectPosition: 'center',height:300}}
    />
    <a href="#!">
      <div
        className="mask"
        style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
      />
    </a>
  </div>
  <div className="card-body">
    <h5 className="card-title">{mail}</h5>
    <p className="card-text">
      These are your details and below is button to update your details.
    </p>
    <Link to={`/dashboard/Allusers/edit/${userId}`} className="btn btn-primary">
      Edit Details
    </Link>
  </div>
</div>


    </div>
  );
  }

export default Dashboard