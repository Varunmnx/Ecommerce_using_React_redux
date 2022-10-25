import React,{useEffect, useState} from 'react'
import styles from "./checkout.module.scss"
import Address from './address'
import Review from './review/review'
import { commerce } from '../../data/commerce'
import NoElement from '../../error/NoElement'

export default function CheckOut({cart,order,handleCaptureCheckout,emptyCart}) {
 const [step,setStep] = useState(0)
 const [token,setToken] = useState("")

 const generatetoken =async()=>{
  try{
 
    const t = await commerce.checkout.generateToken(cart.id,{ type:"cart" })

    setToken(t)

  }catch(error){
    

  }
}

 useEffect(()=>{
    generatetoken()
 },[])


 const stepHandler = () =>{
               setStep(step=>step+1)
              } 
 const gotoAddressPage =()=>{
           setStep(prevStep=>prevStep-1)
 
 }

 const Form =()=> step===0? token?<Address stephandler={stepHandler} checkouttoken={token}  step={step} />:<NoElement />:<Review  gotoAddressPage={gotoAddressPage} success={stepHandler} step={step} checkouttoken={token} handleCaptureCheckout={handleCaptureCheckout} emptyCart={emptyCart} />
 
  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",width:"100%"}}>
        <Form />
    </div>
  )
}
