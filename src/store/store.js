// for future development


import { createSlice} from "@reduxjs/toolkit";
import { commerce } from "../main/data/commerce";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    cart:[],
    total:"",
    subdivisions:[]
  },
  reducers: {
    fetchcart(state,action){
         const {data} = action.payload 
         state.cart = data
         state.total = data.subtotal.raw
    },
    cartRefreshed(state,action){
      state.total = 0
      console.log(state.total)
    }
  },
});



export const actions = cartSlice.actions;
export default cartSlice
//action creator
export function fetchDatas(){
     //thunk function
      return async function toberunned(dispatch,getState){
         let cart = await commerce.cart.retrieve()           
          dispatch(actions.fetchcart({data:cart}))
      }
}