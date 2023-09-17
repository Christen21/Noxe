import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from '../src/Components/Layout/Layout.jsx';
import Register from '../src/Components/Register/Register.jsx';
import Login from '../src/Components/Login/Login.jsx';
import Home from '../src/Components/Home/Home.jsx';
import Movies from '../src/Components/Movies/Movies.jsx';
import TvShows from '../src/Components/TvShows/TvShows.jsx';
import People from '../src/Components/People/People.jsx';
import NotFound from '../src/Components/NotFound/NotFound.jsx';
import ProtectedRoute from '../src/Components/ProtectedRoute/ProtectedRoute.jsx';
import ItemDetails from '../src/Components/ItemDetails/ItemDetails.jsx';
import jwtDecode from 'jwt-decode';
import { useState } from 'react';



function App() {

  const [userData, setuserData] = useState(null);

  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    setuserData(decodedToken);
    console.log(userData);
  }

let routers = createBrowserRouter([
  {path : '' , element : <Layout userData={userData} setuserData={setuserData}/> , children : [
    {index : true , element : <Register/>},
    {path : 'register' , element : <Register/>},
    {path : 'login' , element : <Login saveUserData={saveUserData}/>},
    {path : 'home' , element : <ProtectedRoute> <Home/> </ProtectedRoute>},
    {path : 'movies' , element : <ProtectedRoute> <Movies/> </ProtectedRoute>},
    {path : 'tvshows' , element : <ProtectedRoute> <TvShows/> </ProtectedRoute>},
    {path : 'people' , element : <ProtectedRoute> <People/> </ProtectedRoute>},
    {path : 'itemDetails/:id/:mediaType' , element : <ProtectedRoute> <ItemDetails/> </ProtectedRoute>},
    {path : '*' , element : <NotFound/>}
  ]
  }
]);
  return <>
    <RouterProvider router={routers}/>
  </>
}

export default App;
