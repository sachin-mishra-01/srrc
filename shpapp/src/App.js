import logo from './logo.svg';
import './App.css';
import Cardd from './Daata/Cardd'
import {useDispatch, useSelector } from 'react-redux';
import { data } from './redux/slices/Cardslice';
import {useEffect,useState} from 'react';
import { Route,Routes , NavLink} from 'react-router-dom';
import MainPage from './Page/MainPage';
import Home from './Page/Home';
import Cart from './Page/Cart';
import Knmore from './Page/Knmore';
import Hack from "./Page/Hack";


function App() {
  return (
    <div>
      <nav className='nav'>
       <h2>shopingcart</h2>
       <NavLink to="/"><h3>home</h3></NavLink>
       <NavLink to="/Cart"><h3> Your Cart </h3></NavLink>
      </nav>


      <Routes>
        <Route path='/' element={<MainPage/>}>
        <Route index element={<Home/>}></Route>
         <Route path="/Cart" element={<Cart/>}></Route>
         <Route path="/Knmore" element={<Knmore/>}></Route>
         <Route path="/Hack" element={<Hack/>}></Route>
        </Route>
        
      </Routes>
    </div>
  )
}

export default App;
