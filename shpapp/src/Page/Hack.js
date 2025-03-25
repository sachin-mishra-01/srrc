import { useNavigate } from "react-router-dom";

export default function Hnm(){
    let x = useNavigate();
    function gBk(){
      x("/cart");
    }
    return(
        <div className="hack">
            <h1>Ye topi apne baap ko pahnana</h1>
            <button onClick={gBk}>go back</button>
        </div>
    )
}