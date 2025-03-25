import { useContext } from "react";
import { Appcontext} from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Knpg(){
    const {e} =  useContext(Appcontext);
      const x = useNavigate();

      function gBk() {
        x(-1);
      }
    
    return(
        <div className='carddd'>
        <img src={e.image}></img>
        <hr></hr>
        <h5>{e.title}</h5>
        <div >for {e.category}</div>
        <div className='t'>price : {e.price} rs</div>

        <div className='t'>rating =  {e.rating.rate}/5</div>
        <div className='t'> users = {e.rating.count}+</div>

        <div>{e.description}</div>
        <div className='btn'>
        
         <button onClick={gBk}>Go back</button>
         </div>
       
        </div>
    )
}