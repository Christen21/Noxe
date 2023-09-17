import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({userData , setuserData}) {

  let navigate = useNavigate()

  function logOut(){
    localStorage.removeItem('userToken');
    setuserData(null);
    navigate('/login');
  }

  return <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid px-5">
        <Link className="navbar-brand" to='/'>Noxe</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          {userData ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to='/home'>Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to='/movies'>Movies</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to='/tvshows'>Tvshows</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to='/people'>People</Link>
            </li>
          </ul> : null}

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            
            <li className='text-white pt-2'>

              <i className='fa-brands fa-facebook me-3'></i>
              <i className='fa-brands fa-twitter me-3'></i>
              <i class="fa-brands fa-instagram me-3"></i>
              <i class="fa-solid fa-cloud me-3"></i>

            </li>

            {userData ? <li className="nav-item">
              <Link className="nav-link" onClick={logOut}>Logout</Link>
            </li> : <>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to='/login'>Login</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to='/register'>Register</Link>
            </li> </>}

          </ul>
        </div>
      </div>
    </nav>
  </>
}
