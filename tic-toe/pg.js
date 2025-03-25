
let cp = document.querySelector('.ccpp');
let slval = document.querySelector('.slr');
let sld = document.querySelector('.sl');
//slval.value = 15;
let scc = document.querySelector('.sc');
let gnp = document.querySelector('.gp');
let slength = 10;
slval.value = slength;
sld.textContent = slength;
scc.setAttribute('style','width: 20px; height: 20px; border-radius: 100%;  background-color: white; box-shadow: 0px 0px 10px 5px  white; margin-right: 3%; ')
let ending = 0;
document.addEventListener('click',function(){
    sld.textContent= slval.value;
    ending = slval.value;
})


slval.addEventListener('input',function(){
   sld.textContent= slval.value;
     ending = slval.value;
   if(slval.value < 8){
    scc.setAttribute('style','width: 20px; height: 20px; border-radius: 100%;  background-color: crimson; box-shadow: 0px 0px 10px 5px  red; margin-right: 3%; ')
   }

   if(slval.value >= 8 && slval.value <15){
    scc.setAttribute('style','width: 20px; height: 20px; border-radius: 100%;  background-color: white; box-shadow: 0px 0px 10px 5px  white; margin-right: 3%; ')
   }

   if( slval.value >= 15){
    scc.setAttribute('style','width: 20px; height: 20px; border-radius: 100%;  background-color: green; box-shadow: 0px 0px 10px 5px  green; margin-right: 3%; ')
   }
})

let upcase = document.querySelector('#iul');
let lwcase = document.querySelector('#ill');
let numb = document.querySelector('#in');
let symbl = document.querySelector('#is');


function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }

let dis = document.querySelector('.pass');
dis.innerHTML = 'please  enter your variaton';



   
function chal(){
  cp.innerHTML = 'copy';
  dis.setAttribute('style','width: 70%; height: 70%; margin-left: 3%; background-color:rgb(57, 57, 96) ; color: white; overflow: scroll; overflow-y: auto; overflow-x: auto; border: 2px solid brown; display: flex;  align-items: center; margin-left: 3%;')
    let s = "";

    if(upcase.checked == false && lwcase.checked == false && numb.checked == false && symbl.checked == false ){
      s = 'please  enter your variaton';
      dis.innerHTML= s;
      dis.setAttribute('style','width: 70%; height: 70%; margin-left: 3%; background-color:rgb(57, 57, 96) ; color: red; overflow: scroll; overflow-y: auto; overflow-x: auto; border: 2px solid brown; display: flex;  align-items: center; margin-left: 3%;')
      
     
    }
    else{

for(let i = 1 ; i<=ending  ; i = i+0){
      
    let j = i;

    

    if(upcase.checked == false && lwcase.checked == false && numb.checked == false && symbl.checked == false ){
        dis.innerHTML = 'please  enter your variaton';
        console.log('okkk');
        break;
       
   }



    if(upcase.checked){
        if(i<=ending){
        
         
          let c = String.fromCharCode(getRandomInt(65, 91));
          
          s = s+c;
          
         i++;
        
        }
    }

    if(lwcase.checked){
        if(i<=ending){
        
         
          let c = String.fromCharCode(getRandomInt(97, 123));
          s = s+c;
         i++;
         console.log("ook");
        }
    }


    if(numb.checked){
        if(i<=ending){
        
         
          let c = String.fromCharCode(getRandomInt(48, 58));
          s = s+c;
         i++;
         
        }
    }

    if(symbl.checked){
        if(i<=ending){
        
         
          let c = String.fromCharCode(getRandomInt(33, 48));
          s = s+c;
         i++;
       
        }
    }
      

   

    if(i>ending){
        break;
    }

 
    if(i == j){
        i++;
    }

}
  


 
console.log(s);

dis.innerHTML= s;

    }


}


 async function cpy(){
  try{
  navigator.clipboard.writeText(dis.innerHTML);
 cp.innerHTML = 'copied';
  }
  catch(e){
    cp.innerHTML = 'faild';
  }
}
