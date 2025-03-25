import { useContext, useEffect, useState } from "react";
import { Appcontext } from "../Context/AppContext";
//import { Cardslice } from "../redux/slices/Cardslice";
import {useDispatch, useSelector } from 'react-redux';
import { data } from '../redux/slices/Cardslice';
export default function Cnpf({title,id,category,description,image,price,rating,i}){

   
   // const count = useSelector((state) => state.cards.value );
    const fun = useDispatch();


    let {pr,prr,setpr ,cartt,rcartt,c} = useContext(Appcontext);

 
let [n,setn] = useState({que:1});
console.log( "  ", n.que , " ok")


  //const r = price*n.que;
  //pr.push(price*n.que);
 //setpr(price*n.que);
 //let y = pr + n.que;
 
 //fun(data());
//setpr(pr);

useEffect(()=>{
  //cartt(i,n.que);
  let sum = 0;
  if(n.que>0){
   sum = c.reduce(

    (previousValue, currentValue, index) => previousValue + (currentValue.id == id ? currentValue.price * n.que :  currentValue.price ), 
   
    0);
    setpr(sum);
   }else{
    setpr("quntity > 0 ");
   }
   
     
},[n.que,c.length])

//let bb = ;
//setpr(pr + price*n.que);

function qTy(event){
 // cartt(i,n.que);
   // console.log(event.target.value);
    setn(data=>{

        const z = event.target;
        
         
 
     return{
     ...data, [z.name] :  z.value,
   }
   })

  
}

function rMv(){
rcartt(id);
}





return(
    <div className='cardboxx'>
    <img src={image}></img>
    <hr></hr>
    <h5>{title}</h5>
    <div >for {category}</div>
    <div className='t'>price : {price} rs</div>

    <div className='t'>rating =  {rating.rate}/5</div>
    <div className='t'> users = {rating.count}+</div>

    <div>{description}</div>
    <div className='btn'>
    <div>Quantity: 
    <input type="number" name="que" onChange={qTy} value={n.que} /></div>
     <button onClick={rMv} >Remove to card</button>
     </div>
   
    </div>
)  
} 
