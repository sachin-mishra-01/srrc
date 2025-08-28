import { createContext, useContext, useState, useEffect } from "react";



const AppContext = createContext();

// Hook to use context
export const useData = () => useContext(AppContext);

// Context provider
export const DataProvider = ({ children }) => {
  const [pfdata, setPfData] = useState(null);
  const [skdata, setSkData] = useState([]);
  const [chtdata, setChtData] = useState([]);
  const [un,setun] = useState(null);
  
  
    
     
    const fetchUser = async () => {
      try {
        
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/find/profile`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include", // send cookies
  body: JSON.stringify({ un:un  }), // send username in body
});


        const data = await res.json();
        
          if (!res.ok) {
      if (res.status === 404) {
        console.log("User not found");
        setPfData(null);
        return;
      }
      throw new Error("Failed to fetch");
    }
        if (res.ok) {
          setPfData(data.pfdata); // update profile data
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error(err);
      }
    };
   
    // in context (recommended) or in the page:



useEffect(() => {
    fetchUser();
  }, [un ]);

  const val = {
    fetchUser,
    pfdata,
    skdata,
    chtdata,
    setPfData,
    setSkData,
    setChtData,
    un,
    setun,
  };

  return <AppContext.Provider value={val}>{children}</AppContext.Provider>;
};

export default AppContext;
