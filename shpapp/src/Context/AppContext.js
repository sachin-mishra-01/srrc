import { createContext,useEffect,useState } from "react";

 
export  const Appcontext= createContext('');
 

  export default function AppcontextProvider({children}){
    
    const url  = "https://fakestoreapi.com/products";
    const [l,setl] = useState([]);
    const [c,setc] = useState([]);
    const [e,sete] = useState([]);
    let [pr,setpr] = useState([]);
    //let [bu,setbu] = useState([]);
    
   let prr = 0;
  
  
   async function Getdata(){
    const data = await fetch(url);
    const d = await data.json();
    setl(d);
  
    }
              
   
    function cartt(p){
        console.log(p," pp");
        let dd = 0;
        for(let i = 0 ; i<c.length ; i++){
            if(c[i].id == p.id ){
                dd = 1;
                //bu.pop(i);
                //setbu(bu);
                //bu.push(c)
               /* if(ccc!=0){
                  c[i].price = c[i].price* ccc;
                }else{
                  c[i].price = c[i].price* 1;
                  setc(c);
                }*/
                
               
               
               
            }
        }
        if(dd == 0){
     c.push(p);
     //bu.push(p.price);
     const n = c;
     
     setc(n);
     console.log(c,"  cc");
        }
    }
  

    function D(i){
    
      // setpr(i);

     
    }
   
  

    function rcartt(j){
        console.log(j,"  ok");
        let k = [];
        //let xx = [];
        for(let i = 0 ; i<c.length ; i++){
            if(c[i].id != j){
                k.push(c[i]);
                //xx.push(c[i].price);
            }
        }

        setc(k);
        //setbu(xx);
       

    }
  
    let idarr =[];
 
  const value={
  Getdata,
  l,
  c,
  cartt,
  e,
  sete,
  idarr,
  rcartt,
   pr,
   setpr,
   prr,
   D,
   
  };


  return <Appcontext.Provider value={value}>
    {children}
  </Appcontext.Provider>;


 }
 
 

 //export  default AppcontextProvider;
 //export default Appcontext;


 


 