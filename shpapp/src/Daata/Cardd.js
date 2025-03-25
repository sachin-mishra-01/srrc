//import Card from './Daata/Card'
import { useContext } from "react";
import { Appcontext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
export default function  Cardd({title,id,category,description,image,price,rating,i}) {
   
    const {cartt,sete} = useContext(Appcontext);
    const x = useNavigate();
 
   function cRd(){
    
    cartt(i);
   }

   function kNm(){
    sete(i);
   x("/Knmore");
   }

    return(
        <div className='card'>
        <img src={image}></img>
        <hr></hr>
        <h5>{title}</h5>
        <div >for {category}</div>
        <div className='t'>price : {price} rs</div>

        <div className='t'>rating = {rating.rate}/5</div>
        <div className='t'> users = {rating.count}+</div>
        <div className='btn'>
         <button onClick={kNm} >Know more</button>
         <button onClick={cRd}>Add to card</button>
         </div>
       
        </div>
    )
    
}