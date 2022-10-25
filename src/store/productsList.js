import { createSlice } from "@reduxjs/toolkit";
import { commerce } from "../main/data/commerce";


let productsList = createSlice({
    name:"productsList",
    initialState:{
        products:{},
        customerdata:{}
    },
    reducers:{
        fetchProducts(state,action){
           const {productsfetchedfromApi} = action.payload
           state.products = productsfetchedfromApi.data
        },
        setCustomerData(state,action){
            const customerdata = action.payload
            state.customerdata = customerdata
        }  
    }
})

export default productsList;
export const actions = productsList.actions;


export function fetchActionCreator(){
    return async function fetchThunk(dispatch,getState){
       let productsfetchedfromApi = await commerce.products.list();
       dispatch(actions.fetchProducts({
        productsfetchedfromApi: productsfetchedfromApi
       }))
    }
}