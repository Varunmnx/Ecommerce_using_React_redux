import styles from "./cartitem.module.scss"
import React from 'react'
import { Link } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
export default function CartCard() {
  return (
    <div className={styles.CartIntro}>
    <Link to="/"> <AiOutlineLeft className={styles.GoBack}/></Link>
    <h1>CartItems </h1>
    <span className={styles.IntroPrice}>Prices</span>
  </div>
  )
}
