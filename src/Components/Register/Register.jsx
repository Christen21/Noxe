import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


export default function Register() {

  let navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState('');

  let validationSchema = Yup.object({
      name : Yup.string().required("Name is Required").min(3 , "Minimum Letters is 3").max(12 , "Maximum Letters is 12") ,
      email : Yup.string().required("Email is Required").email("This Email is Invalid"),
      password : Yup.string().required("Password is Required").matches(/^[A-Z][a-z0-9]{5,10}$/ , "Password Must Start With UpperCase") ,
      rePassword : Yup.string().required("Repassword is Required").oneOf([Yup.ref("password")] , "Repassword Doesn't match with Password") ,
      phone : Yup.string().required("Phone is Required").matches(/^01[0125][0-9]{8}$/ , "Phone Number is Invalid")
  })

  const Formik = useFormik({
    initialValues : {
      name : '',
      email : '',
      password : '',
      rePassword : '',
      phone : ''
    },
    onSubmit : handleRegister,
    validationSchema : validationSchema
  });

  async function handleRegister(values){
      setisLoading(true);

      let {data} = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup' , values).catch( (err) =>{
        setError( err.response.data.message );
        setisLoading(false)
      });

      setisLoading(false);

      console.log(data);

      if(data.message == 'success'){
        navigate('/login')
      }
  }

  return <>
    <div className='w-75 text-white'>
          <h2 className='py-3'>Register Now :</h2>

          {error ? <div className='alert alert-warning'> {error} </div> : ""}

          <form onSubmit={Formik.handleSubmit}>
              <label htmlFor="name">Name :</label>
              <input type="text" id='name' className='form-control my-2' value={Formik.values.name} onChange={Formik.handleChange} onBlur={Formik.handleBlur} />
              {Formik.errors.name && Formik.touched.name ? <div className='alert alert-danger'>{Formik.errors.name}</div> : ""}

              <label htmlFor="email">Email :</label>
              <input type="email" id='email' className='form-control my-2' value={Formik.values.email} onChange={Formik.handleChange} onBlur={Formik.handleBlur} />
              {Formik.errors.email && Formik.touched.email ? <div className='alert alert-danger'>{Formik.errors.email}</div> : ""}

              <label htmlFor="phone">Phone Number :</label>
              <input type="tel" id='phone' className='form-control my-2' value={Formik.values.phone} onChange={Formik.handleChange} onBlur={Formik.handleBlur} />
              {Formik.errors.phone && Formik.touched.phone ? <div className='alert alert-danger'>{Formik.errors.phone}</div> : ""}

              <label htmlFor="password">Password :</label>
              <input type="password" id='password' className='form-control my-2' value={Formik.values.password} onChange={Formik.handleChange} onBlur={Formik.handleBlur} />
              {Formik.errors.password && Formik.touched.password ? <div className='alert alert-danger'>{Formik.errors.password}</div> : ""}

              <label htmlFor="rePassword">RePassword :</label>
              <input type="password" id='rePassword' className='form-control my-2' value={Formik.values.rePassword} onChange={Formik.handleChange} onBlur={Formik.handleBlur} />
              {Formik.errors.rePassword && Formik.touched.rePassword ? <div className='alert alert-danger'>{Formik.errors.rePassword}</div> : ""}

              { isLoading ? <button type='button' className='btn btn-success my-2'><i className='fa-solid fa-spinner fa-spin-pulse text-white '></i></button> : <button type='submit' className='btn btn-success my-2'>Register</button>}
          
          </form>

        </div>
  </>
}
