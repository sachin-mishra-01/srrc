import { useState } from 'react'
import { Crac, Fp, Login } from "../Cmpt/Mainpg"
import { TypeAnimation } from "react-type-animation"
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";


function Mnpg() {
  const [cra, setcra] = useState(true)
  const [fp, setfp] = useState(false)


  return (
    <div className="bg-zinc-900 min-h-screen w-full text-white flex flex-row max-xl:flex-col items-center">


      <div className="w-1/2 p-8 flex items-center justify-center flex-wrap max-xl:w-full max-xl:pt-16 max-xl:pb-4">
        <div className="w-3/4 h-3/4 flex flex-col gap-7 max-xl:gap-3 max-xl:w-full">


          <div className="max-xl:mt-6">
            <TypeAnimation
              sequence={["Welcome to SkillMintt...", 3000, "", 500]}
              wrapper="span"
              speed={70}
              repeat={Infinity}
              className="
                text-4xl font-bold font-sans
                bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500
                bg-clip-text text-transparent
                max-xl:text-2xl
                max-xl:whitespace-nowrap
                max-xl:overflow-hidden
              "
            />
          </div>


          <p className="text-lg max-w-md text-center mb-8 max-xl:text-xs max-xl:mb-2">
            Exchange your skills, sell digital products, or collaborate with
            others worldwide. Grow your network and unlock new opportunities.
          </p>

        </div>
      </div>



      <div className="block w-px h-[550px] bg-white self-center max-xl:hidden"></div>



      <div className="w-1/2 flex items-center justify-center flex-wrap max-xl:w-full">
        <div className="w-3/4 flex flex-col items-center justify-center flex-wrap max-xl:w-full max-xl:px-4">


          <div
            className="
              w-full
              max-xl:bg-zinc-800
              max-xl:rounded-xl
              max-xl:p-3
              max-xl:text-[11px]
              max-xl:mb-8
              max-xl:mt-9

              max-xl:flex
              max-xl:flex-col
              max-xl:items-center

              max-xl:[&_label]:flex
              max-xl:[&_label]:flex-col
              max-xl:[&_label]:items-start
              max-xl:[&_label]:gap-1
              max-xl:[&_label]:mb-2
              max-xl:[&_label]:text-[11px]

              max-xl:[&_input]:w-full
              max-xl:[&_input]:px-2
              max-xl:[&_input]:py-1.5
              max-xl:[&_input]:text-[11px]
              max-xl:[&_input::placeholder]:text-[11px]
              max-xl:[&_input]:leading-tight
            "
          >


            {cra ? (
              <>
                <Crac />

                <p className="text-center text-xs mt-2">
                  Already have an account?{" "}

                  <button

                    className="text-blue-600 underline"
                    onClick={() => setcra(false)}
                  >
                    Login here
                  </button>


                </p>
              </>
            ) : !fp ? (
              <>
                <Login />

                <p className="text-center text-xs mt-2">
                  Don't have an account?{" "}
                  <button

                    className="text-blue-600 underline"
                    onClick={() => setcra(true)}
                  >
                    Signup here
                  </button>
                </p>

                <p className="text-center text-xs">
                  Forgot Password?{" "}

                  <button

                    className="text-blue-600 underline"
                    onClick={() => setfp(true)}
                  >
                    verify here
                  </button>
                </p>
              </>
            ) : (
              <>
                <Fp />

                <p className="text-center text-xs mt-2">
                  Go back to{" "}
                  <button
                    className="text-blue-600 underline"
                    onClick={() => setfp(false)}
                  >
                    Log in
                  </button>

                </p>


              </>
            )}

          </div>

        </div>


      </div>

    </div>
  )
}

export default Mnpg
