import React from "react";
import styles from "./cartitem.module.scss";
import { useDispatch, } from "react-redux";
import {actions} from "../../store/store";

export default function Items({cart,updatecart,removefromcart,img}) {

  let dispatch = useDispatch()
  
  let add =(name,quantity,price,id)=>{
    dispatch(actions.add(
      {
        name:name,
        quantity:Number(quantity),
        price:price,
        id:id
      }
     )
    )
  } 

  let remove =(name,quantity,price,id)=>{
    dispatch(
      actions.remove({
        name:name,
        quantity:Number(quantity),
        price:price,
        id:id
      })
    )
  }

  return (
    <div className={styles.CartItem}>
      <h1>{cart.name}</h1>
      <div className={styles.checkout_cart_image}>
      <img src={img} alt="asset"  />
      </div>
      <div className={styles.Quantitybox}>
        <button className={styles.CartButton} onClick={()=>updatecart(cart.id,cart.quantity-1)}>-</button>
        <span>{cart.quantity}</span>
        <button className={styles.CartButton} onClick={()=>updatecart(cart.id,cart.quantity+1)}>+</button>
      </div>
      <span>${cart.line_total.formatted}</span>
    </div>
  );
}
