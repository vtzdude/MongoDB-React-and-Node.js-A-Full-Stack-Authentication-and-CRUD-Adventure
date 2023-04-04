import React from 'react'
import axios from 'axios';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
  } from 'mdb-react-ui-kit';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
const url="http://localhost:5432/home/signup";
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
function Signup() {
  const navigate=useNavigate();
    const formik = useFormik({
        initialValues: {
          email: '',
          password:''
        },validate,
        onSubmit: values => {
            //console.log(values);
            axios.post(url,values).then((res)=>{
              if(res.data===false)
              {
                alert("Email already exists");
            }
            else{
              alert("User successfully registered");
              navigate('/')
            
            }
          }
            )


          
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

            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>Signup</h3>
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
            <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg' type="submit">Register</MDBBtn>
            </form>
             <p className='ms-5'>Already have an account? <Link to="/" class="link-info">Login</Link></p>

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

export default Signup