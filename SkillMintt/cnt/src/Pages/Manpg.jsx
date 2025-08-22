import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { Crac, Fp, Login } from "../Cmpt/Mainpg";
import { TypeAnimation } from "react-type-animation";
function Mnpg() {
  
const [cra , setcra] = useState(true);
const [fp , setfp] = useState(false);
  return (
    <div className='bg-zinc-900 min-h-screen w-full text-white flex max-xl:flex-col flex-row items-center  '>
    <div className="w-1/2 p-8 flex items-center justify-center flex-wrap ">
    <div className='w-3/4 h-3/4 flex flex-col gap-7 '>
        <TypeAnimation
  sequence={[ "Welcome to SkillMintt...", 3000,"",500 ]}
  wrapper="span"
  speed={70}
  repeat={Infinity}
  className="text-4xl max-xl:text-xl font-bold font-sans bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
/>
<p className="text-lg max-xl:text-md max-w-md text-center mb-8">
          Exchange your skills, sell digital products, or collaborate with
          others worldwide. Grow your network and unlock new opportunities.
        </p>
</div>


      
      
      </div>

   <div className="block max-xl:hidden w-px h-[550px] bg-white self-center"></div>
   <div className='w-1/2   flex items-center justify-center flex-wrap'>
    <div className='w-3/4 flex flex-col   items-center justify-center flex-wrap'>
    
     {cra ? (
      <div className='w-full h-full  '>
      
      <Crac/>

      <p>Already have and account ? {' '} <button className='text-blue-600 underline' onClick={()=> setcra(false)}> Login here</button></p>

      </div>
      

     )  : !fp? ( 

     <div className='w-full h-full '>
      <Login/>

      <p>Don't have an account ?  {' '} <button className='text-blue-600 underline' onClick={()=> setcra(true)}> Signup here</button></p>
      <p>Forgot Password ?  {' '} <button className='text-blue-600 underline' onClick={()=> setfp(true)}> verify here</button></p>
      </div>
      ) : (
         <div className='w-full h-full '>
      <Fp/>

      <p>Go back to   {' '} <button className='text-blue-600 underline' onClick={()=> setfp(false)}> Log in </button></p>
      </div>
      )}
     
    
    </div>
    </div>
    </div>
  )
}

export default Mnpg ;
