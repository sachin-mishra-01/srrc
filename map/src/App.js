import logo from './logo.svg';
import './App.css';
import './main.css';

import React, {useContext,useEffect, useState} from 'react';
function App() {

 
  let path = ["p1p3" , "p3p4","p4p10","p7p10","p2p7","p2p6","p6p12" , "p5p12","p5p11","p7p11","p7p8" , "p3p8" , "p3p9","p9p10" ];



  //let xxx = document.querySelector('.')
  const [ v , setv] = useState("p1");
  const[vv , setvv] = useState("p1");
  const [a , seta] = useState([]);
  const [dis , setdis] = useState(0);
  let m = 60/100;
  m = m.toFixed(2);
  let [tm,setm] = useState(0);
  let [thm , sethm] = useState(0);
  let [tthm , setthm] = useState(0);
  let [ttm , setmm] = useState(0);
  const [ u , setu] = useState([]);
  const [pr , setpr] = useState([]);

  useEffect(()=>{
    let cc = dis%10;
    cc = cc*m;
    cc = cc.toFixed(0);

    let ww = dis%50;
    ww = ww*m;
   ww = ww.toFixed(0);

    sethm(Math.floor(dis/50));
    setm(ww);

    setthm(Math.floor(dis/10));
    setmm(cc);


    //fuun();
    },[dis]);


 function x(){
  try{
    
    
let pathh = ["p1p3" , "p3p4","p4p10","p7p10","p2p7","p2p6","p6p12" , "p5p12","p5p11","p7p11","p7p8" , "p3p8" , "p3p9","p9p10" ];



    for(let i = 1 ; i<=12 ; i=i+1){
      //let ppp = `'#${a[i]}'`;
        //console.log("ok1kk"+ppp);
      let pp = document.querySelector(`#p${i}`);
      let ww = document.querySelector(`.p${i}1`);
      //let ww1 = document.querySelector(`.p${i}1`);
      //let ww2 = document.querySelector(`.p${i}1`);
      pp.setAttribute('style','  color : black ');
      ww.setAttribute('style','  background-color : red ' );
       
      //ww1.setAttribute('style','width:10px ');
      //ww2.setAttribute('style','height:10px ');


    }

    for(let i = 0 ; i<path.length ; i=i+1){
      //let ppp = `'#${a[i]}'`;
        //console.log("ok1kk"+ppp);
      let pp = document.querySelector("#"+path[i]);
      
      pp.setAttribute('style','background-color : black ; opacity:1 ');
   


    }


    //if(a.length>1){
    //let dir = 0;
    for(let i = 0 ; i<a.length ; i=i+2){
      let ww = document.querySelector(`.${a[i]}1`);
      let pp = document.querySelector(`#${a[i]}`);
      if(i!=0){
        let er = a[i-2];
        let br = a[i];
        let dd = "";
        let gg = "";
        console.log("st "+er+" ff  "+ br+ "->"+ typeof(er));
       if(er.length>br.length){
        //const found = array1.find((element) => element == br+er);
           dd = document.querySelector("#"+br+er);
           gg = br+er;
          dd.setAttribute('style','   background-color : green  ');
        }
        else if(er.length<br.length){
           dd = document.querySelector("#"+er+br);
           gg = er+br;
          dd.setAttribute('style','   background-color : green  ');
        }
        else{
          if(er>br){
             dd = document.querySelector("#"+br+er);
             gg = br+er;
            dd.setAttribute('style','   background-color : green ;  ');
          }
          else if(br>er){
             dd = document.querySelector("#"+er+br);
             gg = er+br;
            dd.setAttribute('style','   background-color : green  ');
          }
          
        }
        const found = pathh.find((element) => element == gg);
        console.log("found "+found);
        if(found.length>0){
    pathh = pathh.filter(item => item !== found);
        }
        
        for(let i = 0 ; i<pathh.length ; i=i+1){
      //let ppp = `'#${a[i]}'`;
        //console.log("ok1kk"+ppp);
      let pp = document.querySelector("#"+pathh[i]);
      
      pp.setAttribute('style',' opacity:0.3 ');
   


    }

      }
      
      pp.setAttribute('style',' color : blue  ; font-weight:700 ');
      ww.setAttribute('style','  background-color : blue ; width :15px ; height : 15px ');
      //let ww1 = document.querySelector(`.p${i}1`);
      //let ww2 = document.querySelector(`.p${i}1`);
      //ww1.setAttribute('style','width : 20px ');
      //ww2.setAttribute('style','height : 20px ');


    }
  }
 catch(e){
  console.log(e);
 }
    
  
  //}
  
  };
  
const fun = function( src){ 


  console.log("hello");
  let m = new Map();
  const graph={
    "p1":{"p3":50},
    "p2":{"p6":10,"p7":15},
    "p3":{"p4":20,"p8":15,"p9":18,"p1":50 },
    "p4":{"p3":20,"p10":15},
    "p5":{"p12":17,"p11":20},
    "p6":{"p12":12,"p2":10},
    "p7":{"p2":15,"p8":13,"p10":35,"p11":18},
    "p8":{"p3":15,"p7":13},
    "p9":{"p3":18,"p10":20 },
    "p10":{"p7":35,"p4":15,"p9":20 },
    "p11":{"p5":20,"p7":18 },
    "p12":{"p5":17,"p6":12 },




  }

  // dist = [10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000];
  
  m.set(src , 0);
  let s = [];
  s.push([src,0]);
  
let b = 0;
try{
while(s.length !== 0 ){ 
let n = s[0];
let mm= s[0][1];
//delete s[0];
let nn = 0;
s.splice(nn , 1);
s.sort();

console.log(n);
for (let  i in graph[ n[0]]){  
 
  if(m.has(i) == false){
    let r = graph[n[0]][i] + mm;
  console.log(i);
   m.set(i ,r);
   //setu(m);
   if(b == 0){
    pr.length = 0;
    b = 1;
   }
   pr.push([n[0] , i]);
   setpr(pr);
   s.push([i,r]);
   
   
   s.sort((a, b) => a[1] - b[1]);
   
   
   

  }
  else { 
    let r = m.get(n[0])+ graph[n[0]][i] ;
  
   
   
    if(r<m.get(i)){ 
     
   for(let k = 0 ; k<s.length ; k++){
    
    if(s[k][0] === i){
      
     s[k][1] = r;

     break;
    
   // 
    
    }
   }

   
   m.delete(i);
    
   m.set(i , r);
   for(let r = 0 ; r<pr.length ; r++){
    if(pr[r][1] == i){
      console.log(" hii  " + i);
      pr[r][0] = n[0];
      setpr(pr);
    }
   }
   //setu(m);
   s.sort((a, b) => a[1] - b[1]);
 

   
    
  }

  
  
}
}


}

}
catch(e){
console.log("error");
}

m.forEach((values, keys) => {
  console.log(" hpp " + values, keys);
 u.push([keys , values]);
 setu(u);
 if(keys == vv){
  //dis = values;
  setdis(values);
 }
});
}

//let fuun = function(){
let t = 0;
let tt = 0;
let s = v;
let d = vv;
if(s === d && tt === 0){
  a.length = 0;
  a.push(s);
  //setdis(0);
  tt++;
}else{
while(s !== d){
  console.log(s+" c   "+d);
  if(t == 0){
    a.length = 0;
 t++;
  }
 a.push(d);
 
 a.push(" <- ");
 //seta(a);
 
 for(let y = 0 ; y<pr.length ; y++){
  if(pr[y][1] == d){
    d = pr[y][0];
  console.log('e:->  '+d);
  break;
  }
 }
  
 t++;
 if(t == 100){
  break;
 }
}
a.push(s);

if(a.length>15){
  a.length = 0;
  //a.push("enter destination ");
  //setdis(0);
}
}
//}
//seta(a);

x();


useEffect(()=>{
fun(v);
//fuun();
},[v,vv]);

//fun("p1");

/*
var e = document.getElementById("src");
var value1 = e.value;
var texts = e.options[e.selectedIndex].text;

var e = document.getElementById("des");
var value2 = e.value;
var textd = e.options[e.selectedIndex].text;
 fun("p1" );

useEffect(() => {
  fun(value1 , value1);
}, [value1,value2]);

*/
  return (
    
  
    <div className="App ">
     

    
      <div className='header'>
      <div className='src'>
      <label for="src" className='srcc'>your source :  . </label>

<select value={v} onChange={e => setv(e.target.value)} name="src" id="src">
  <option value="p1">p1</option>
  <option value="p2">p2</option>
  <option value="p3">p3</option>
  <option value="p4">p4</option>
  <option value="p5">p5</option>
  <option value="p6">p6</option>
  <option value="p7">p7</option>
  <option value="p8">p8</option>
  <option value="p9">p9</option>
  <option value="p10">p10</option>
  <option value="p11">p11</option>
  <option value="p12">p12</option>
</select>
</div>


<div className='des'>
<label for="des" className='srcc'>your des :  . </label>

<select value={vv} onChange={e => setvv(e.target.value)} name="des" id="des">
  <option value="p1">p1</option>
  <option value="p2">p2</option>
  <option value="p3">p3</option>
  <option value="p4">p4</option>
  <option value="p5">p5</option>
  <option value="p6">p6</option>
  <option value="p7">p7</option>
  <option value="p8">p8</option>
  <option value="p9">p9</option>
  <option value="p10">p10</option>
  <option value="p11">p11</option>
  <option value="p12">p12</option>
</select>
</div>

      </div>

      <div className='cnt'>
      <div className='con'>

       <div className='pp' id="p1">
       <h4>p1</h4>
      <div className='p11'></div>
      </div>
      <line x1="50" y1="50" x2="350" y2="350" stroke="black"/>

      <div className='pp' id="p2">
       <h4>p2</h4>
      <div className='p21'></div>
      </div>

      <div className='pp' id="p3">
       <h4>p3</h4>
      <div className='p31'></div>
      </div>

      <div className='pp' id='p4'>
       <h4>p4</h4>
      <div className='p41'></div>
      </div>
        

      <div className='pp' id='p5'>
       <h4>p5</h4>
      <div className='p51'></div>
      </div>


      <div className='pp' id="p6">
       <h4>p6</h4>
      <div className='p61'></div>
      </div>



      <div className='pp' id="p7">
       <h4>p7</h4>
      <div className='p71'></div>
      </div>
         

      <div className='pp' id='p8'>
       <h4>p8</h4>
      <div className='p81'></div>
      </div>



      <div className='pp' id='p9'>
       <h4>p9</h4>
      <div className='p91'></div>
      </div>
        

      <div className='pp' id='p10'>
       <h4>p10</h4>
      <div className='p101'></div>
      </div>

      

      <div className='pp' id='p11'>
       <h4>p11</h4>
      <div className='p111'></div>
      </div>


      <div className='pp' id='p12'>
       <h4>p12</h4>
      <div className='p121'></div>
      </div>
      
      <div className='ctt'>
       <span className="pl" id='p1p3'>
      50 km
       </span>

       <span className="pl" id='p3p4'>
      20 km
       </span>

       <span className="pl" id='p4p10'>
      15 km
       </span>

      

       <span className="pl" id='p7p10'>
      35 km
       </span>

       <span className="pl" id='p2p7'>
      15 km
       </span>

       <span className="pl" id='p2p6'>
      10 km
       </span>

       <span className="pl" id='p6p12'>
      12 km
       </span>

       <span className="pl" id='p5p12'>
      17 km
       </span>

       <span className="pl" id='p5p11'>
      20 km
       </span>

       <span className="pl" id='p7p11'>
       18 km
       </span>

       <span className="pl" id='p7p8'>
      13 km
       </span>

       <span className="pl" id='p3p8'>
      15 km
       </span>

       <span className="pl" id='p3p9'>
      18 km
       </span>

       <span className="pl" id='p9p10'>
      20 km
       </span>
      </div>
      
      </div>


      </div>
      <div className='f'>
     <div className='ff'>
        <div>{   a }</div>
        <div> {" .   <=:  your path  "}  </div>
        </div>
        <div className='fff'>
        <div className='v'><div>{tthm+" hour " + ttm + " mint  <=: ." }</div><img src='https://img.icons8.com/?size=100&id=9807&format=png&color=000000' width="25px" height="30px" /></div>
        <div className='v'><div>{thm+" hour " + tm + " mint <=: ."}</div><img src='https://img.icons8.com/?size=100&id=12684&format=png&color=000000' width="25px" height="30px" /></div>
        </div>
</div>
      <div className='gg'></div>
        <div className='fp'>Total Distance = {"  "+dis+" Km "}</div>

        
    </div>

   
  );
}

export default App;
