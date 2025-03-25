
import { useContext } from "react";
import { Appcontext } from "../Context/AppContext";
import Ccartd from "../Daata/Ccartd";
import {useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Hack from "./Hack";
export default function Ctpg(){
    const count = useSelector((state) => state.cards.value );

    const {c,pr,setpr} = useContext(Appcontext);

    /*const sum = pr.reduce((previous, current) => {
        return previous+ current;
      
    }, 0)*/
       let xxx = useNavigate();
    function pUch(){
        if(pr == "quntity > 0 " ){
          xxx("/Hack");
        }
    }
    return (
        <div className="buycart">
       <div className="cbdy">
         {
            c.map((i)=>{
                return <Ccartd {...i} i={i}></Ccartd>
            })
         }
         </div>

         <div className="cnav">
            <button onClick={pUch}>Buy Now</button>
            <span>{pr}</span>
         </div>
        </div>
    )
}