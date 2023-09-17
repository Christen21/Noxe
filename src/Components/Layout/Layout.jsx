import React from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';


export default function Layout({userData , setuserData}) {
  return <>
    <Navbar userData={userData} setuserData={setuserData}/>
      <div className="container">
        <Outlet></Outlet>
      </div>
    <Footer/>
  </>
}
