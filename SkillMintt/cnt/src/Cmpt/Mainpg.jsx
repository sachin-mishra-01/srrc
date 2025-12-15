import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/AppContext.jsx";

function Crac() {
  const { setun } = useData();
  const [formData, setFormData] = useState({fname: "",uname: "",email: "",password: "",cpassword: "", otp:""});
  const [otp,setotp] = useState(false);
  const [loading, setLoading] = useState(false);

  
  const navigate = useNavigate();
  const hndchng = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (loading) return;
    
    if (formData.password !== formData.cpassword) {
      alert("Passwords do not match");
      return;
    }
    
    


   
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          fullname: formData.fname,
          username: formData.uname,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await res.json();

      if (res.ok) {
        // redirect to /:username
        setun(data.username);
        navigate(`/${data.username}`);
        otp?setotp(false):setotp(true);
      } else {
        alert(data.message || "Something went wrong");
      }

    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }finally {
      setLoading(false); 
    }

  

    
  };
    return (
        <form onSubmit={handleSubmit} className=" text-lg max-xl:text-md flex flex-col gap-3 justify-between items-center font-medium  w-[75%] h-full ">
        <label className="flex  justify-between w-full "> Full Name : <input className="text-black " type="text" name="fname"  placeholder=" Full name" value={formData.fname} onChange={hndchng} required/> </label>
       <label className="flex  justify-between w-full ">  User Name :  <input className="text-black "  type="text" name="uname" placeholder="username" value={formData.uname} onChange={hndchng} required/>  </label>
        <label className="flex  justify-between w-full ">email : <input className="text-black "  type="email" name="email" placeholder=" email" value={formData.email} onChange={hndchng} required /> </label>
       <label className="flex  justify-between w-full "> Password :  <input className="text-black "  type="password" name="password" placeholder="Password" value={formData.password} onChange={hndchng} required /> </label> 
       <label className="flex  justify-between w-full "> Confirm Password : <input className="text-black "  type="password" name="cpassword" placeholder="confirm Password" value={formData.cpassword} onChange={hndchng} required /> </label> 
       
         <button type="submit" disabled={loading} className={` w-[70%] bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white  rounded-lg shadow-lg hover:opacity-90 transition-all ${loading ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"} `} value="submit"> {loading ? "Please wait..." : "Sign In"} </button>

        
         </form>
         
    )



}

function Login() {
  const { setun } = useData();
   const [otp,setotp] = useState(false);
    const [login , setlogin] = useState('');
    const [password,setpassword] = useState('');
   const [loading, setLoading] = useState(false);
     const navigate = useNavigate();




    const hsubmt = async(e) => {
        e.preventDefault();
       if (loading) return;
        
       try {
          setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ login, password }),
      });

      const data = await res.json();

      if (res.ok) {
         setun(data.username);
        // Save token if you want, e.g. localStorage.setItem("token", data.token);
        // Redirect to /:username or home page
        navigate(`/${data.username}`);
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }finally {
      setLoading(false); 
    }
  
    }

    return (
      
        <form onSubmit={hsubmt} className=" text-lg max-xl:text-md flex flex-col gap-3 justify-between items-center font-medium  w-[75%] h-full ">
         
        <label  className="flex  justify-between w-full ">email or Username : <input className="text-black "  type="text" name="login" placeholder=" username or email" onChange={(e) => setlogin(e.target.value)}  required/> </label>
         
        <label  className="flex  justify-between w-full "> Password :  <input className="text-black "  type="password" name="password" placeholder=" Password" onChange={(e) => setpassword(e.target.value)} required /> </label>

        
        
           <button type="submit" disabled={loading} className={`  w-[70%] bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white  rounded-lg shadow-lg hover:opacity-90 transition-all ${loading ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"}`} value="submit"> {loading ? "Please wait..." : "Log In"} </button>
            
          
         </form>
        
        
    )

   

}

function Fp() {
  const { setun } = useData();   
  const navigate = useNavigate(); 

  const [login, setLogin] = useState("");        
  const [otp, setOtp] = useState("");            
  const [showOtp, setShowOtp] = useState(false); 
  const [timeLeft, setTimeLeft] = useState(0);   
  const [loading, setLoading] = useState(false);
  
  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time mm:ss
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Send OTP
  const handleSendOtp = async () => {
    if (!login) {
      alert("Enter your email or username");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/rotp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        alert("OTP sent to your email!");
        setShowOtp(true);
        setTimeLeft(120); // 2 minutes = 120 sec
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error sending OTP");
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/votp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",   
        body: JSON.stringify({ login, otp }),
      });

      const data = await res.json();
      
      setLoading(false);

      if (res.ok) {
        alert("OTP verified! Login success ✅");
        setun(data.username);
        navigate(`/${data.username}`);
      } else {
        alert(data.message || "Invalid OTP ❌");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error verifying OTP");
    }
  };

  return (
    <div className="flex flex-col gap-3 items-center w-[75%] text-lg font-medium">
      {/* username/email input - always visible */}
      <label className="flex justify-between w-full">
        Email or Username:
        <input
          className="text-black"
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
      </label>

      {/* send otp / resend otp */}
      {!showOtp && (
        <button
          onClick={handleSendOtp}
          disabled={loading}
          className="w-[70%] bg-blue-500 text-white rounded-lg p-2"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      )}

      {showOtp && (
        <>
          <label className="flex justify-between w-full">
            Enter OTP:
            <input
              className="text-black"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </label>

          <div className="flex justify-between w-full">
            {timeLeft > 0 ? (
              <p className="text-sm text-gray-500">
                Resend in {formatTime(timeLeft)}
              </p>
            ) : (
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="text-blue-600 underline"
              >
                Resend OTP
              </button>
            )}
          </div>

          <button
            onClick={handleVerifyOtp}
            disabled={loading}
            className="w-[70%] bg-green-500 text-white rounded-lg p-2"
          >
            {loading ? "Verifying..." : "Verify & Login"}
          </button>
        </>
      )}
    </div>
  );
}


export {Crac , Login, Fp};
