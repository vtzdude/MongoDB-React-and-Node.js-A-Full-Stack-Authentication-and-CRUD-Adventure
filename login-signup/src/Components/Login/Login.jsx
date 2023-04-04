import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { Outlet, useNavigate } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
  } from 'mdb-react-ui-kit';
import { Link, Navigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length<8) {
      errors.password = 'Password must contain atleast 8 characters';
    }
    
  return errors;
};
function Login() {
  const navigate = useNavigate();
 const url="http://localhost:5432/home/login";
  const formik = useFormik({
    initialValues: {
      email: '',
      password:''
    },validate,
    onSubmit: values => {
        axios.post(url,values).then((res)=>{
          console.log(res);
          // I have used res.data as res is an object and data contains the value expected and res as a whole contains the status codes etc.
          if(res.data.auth)
        { 
          console.log(res.data);
          alert("Successfully logged in");
          //console.log(res.data.id);
          navigate('/dashboard ',{
            state:{
                id:res.data.id
            }
          });
          
        }
        else{
          alert("Incorrect email or password");
        }
        });
        
        
        
    },
  });
  return (
    
    <MDBContainer fluid>
      <MDBRow>

        <MDBCol sm='6'>

          <div className='d-flex flex-row ps-5 pt-5'>
            <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }}/>
            
          </div>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>Log in</h3>

            <form onSubmit={formik.handleSubmit}>
                
                <MDBInput wrapperClass='mb-4 mx-5 w-100'
                    id="email"
                    name="email"
                    type="email"
                    label='Email address'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    size="lg"/>
                {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                <MDBInput wrapperClass='mb-4 mx-5 w-100'
                    id="password"
                    name="password"
                    type="password"
                    label='Password'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    size="lg"/>
                {formik.errors.password ? <div>{formik.errors.password}</div> : null} 
            <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg' type="submit">Login</MDBBtn>
            
            </form>
             {/* <p className="small mb-5 pb-lg-3 ms-5"><a class="text-muted" href="#!">Forgot password?</a></p>  */}
             <p className='ms-5'>Don't have an account? <Link to="signup" class="link-info">Register here</Link></p>

          </div>
          
        </MDBCol>

        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
            alt="Login image" className="w-100" style={{objectFit: 'cover', objectPosition: 'left',height:650}} />
        </MDBCol>

      </MDBRow>
      
    </MDBContainer>
    
    
    
  )
}

export default Login