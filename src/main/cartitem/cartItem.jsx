import React, { useEffect } from "react";
import styles from "./cartitem.module.scss";
import CartCard from "./cartCard";
import Items from "./Items";
import shoppingCartITems from "../data/cartdata";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import { useSelector, useDispatch } from "react-redux";
import { fetchDatas } from "../../store/store";

export default function CartItem({
  cart,
  updatecart,
  removefromcart,
  emptycart,
}) {
  let { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // const {  } = useSelector((state) => state.cart);

  let Navigate = useNavigate();

  shoppingCartITems.sort(() => Math.random() - 0.5);
  let HandleCheckout = () => {
    Navigate("/items/checkout");
  };
  useEffect(() => {
    dispatch(fetchDatas());
  }, [updatecart, removefromcart, emptycart]);

  return (
    <div className={styles.ItemsContainer}>
      <div className={styles.Items_List_Holder}>
        <CartCard />
        {cart.line_items?.map((e) => (
          <Items
            key={e.id}
            cart={e}
            total={e.totalPrice}
            updatecart={updatecart}
            removefromcart={removefromcart}
            img={e.image.url}
          />
        ))}
        {cart.line_items ? (
          cart.total_items > 0 ? (
            <div className={styles.Total}>Happy shopping</div>
          ) : (
            <div className={styles.Alert}>
              <Player
                autoplay
                loop
                src="https://assets3.lottiefiles.com/packages/lf20_pkzscvhb.json"
                style={{ height: "300px", width: "300px" }}
              ></Player>
            </div>
          )
        ) : (
          <div className={styles.Alert}>
            <Player
              autoplay
              loop
              src="https://assets3.lottiefiles.com/packages/lf20_pkzscvhb.json"
              style={{ height: "300px", width: "300px" }}
            ></Player>
          </div>
        )}
      </div>
      <div className={styles.sugessions}>
        <h1> Total : ${total}</h1>
        <div>
          <button className={styles.clear_cart} onClick={() => emptycart()}>
            clear cart
          </button>
          {total > 0 ? (
            <button
              className={styles.clear_cart}
              onClick={() => HandleCheckout()}
            >
              Check out
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
