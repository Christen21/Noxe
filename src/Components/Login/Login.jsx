import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


export default function Login({saveUserData}) {

  let navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState('');

  let validationSchema = Yup.object({
      email : Yup.string().required("Email is Required").email("This Email is Invalid"),
      password : Yup.string().required("Password is Required").matches(/^[A-Z][a-z0-9]{5,20}$/ , "Password Must Start With UpperCase") ,
  })

  const Formik = useFormik({
    initialValues : {
      email : '',
      password : ''
    },
    onSubmit : handleLogin,
    validationSchema : validationSchema
  });

  async function handleLogin(values){
      setisLoading(true);

      let {data} = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signin' , values).catch( (err) =>{
        setError( err.response.data.message );
        setisLoading(false)
      });

      setisLoading(false);

      console.log(data);

      if(data.message == 'success'){
        localStorage.setItem('userToken' , data.token);
        saveUserData();
        navigate('/home')
      }
  }

  return <>
    <div className='w-75 text-white'>
          <h2 className='py-3'>Login :</h2>

          {error ? <div className='alert alert-warning'> {error} </div> : ""}

          <form onSubmit={Formik.handleSubmit}>
              
              <label htmlFor="email">Email :</label>
              <input type="email" id='email' className='form-control my-2' value={Formik.values.email} onChange={Formik.handleChange} onBlur={Formik.handleBlur} />
              {Formik.errors.email && Formik.touched.email ? <div className='alert alert-danger'>{Formik.errors.email}</div> : ""}

              <label htmlFor="password">Password :</label>
              <input type="password" id='password' className='form-control my-2' value={Formik.values.password} onChange={Formik.handleChange} onBlur={Formik.handleBlur} />
              {Formik.errors.password && Formik.touched.password ? <div className='alert alert-danger'>{Formik.errors.password}</div> : ""}

              { isLoading ? <button type='button' className='btn btn-success my-2'><i className='fa-solid fa-spinner fa-spin-pulse text-white '></i></button> : <button type='submit' className='btn btn-success my-2'>Login</button>}
          
          </form>

        </div>
  </>
}

