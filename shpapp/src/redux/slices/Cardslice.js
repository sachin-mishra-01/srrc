import { createSlice } from "@reduxjs/toolkit";








//const [l,setl] = useState([]);
export const Cardslice = createSlice({
    name:"cards",
    initialState : [] ,
    reducers: {
       
         data : (state) =>{
          state.value = 1;
          console.log("okkk");
         },

         
        }
    
})

export const {data} = Cardslice.actions;
export default Cardslice.reducer;