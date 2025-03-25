import {useDispatch, useSelector } from 'react-redux';
//import { data } from '../redux/slices/Cardslice';
import {useContext, useEffect,useState} from 'react';
import Cardd from '../Daata/Cardd';
import AppcontextProvider, { Appcontext } from '../Context/AppContext';
export default function Hmpg(){
 
  const {Getdata,l} = useContext(Appcontext);
              
  useEffect(()=>{
   Getdata();
   console.log("okh");
  },[])
  
  
  
    return (
      <div className="App">
      
  
      <div className="con">
  {
    l.map((i)=>{
  return < div className='cardbox'>
   <Cardd {...i} i = {i} ></Cardd>
   
  
  </div> 
    })
      
  }
      </div>


      <div></div>
        
      </div>
    );
}