import React from "react";
import { useRef, useEffect } from "react";
import styles from "./Detailed.module.scss";
import { useLocation } from "react-router-dom";
import { actions } from "../../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Detailed({addtocart}) {
  let Detailed = useLocation();
  let { name, details } = Detailed.state;
  let laplist = details.filter((e) => e.categories[0].name === name);
  {/* redux */}
  let cart = useSelector((state) => state.cart.items);
  let dispatch = useDispatch();



  laplist.forEach((e) => {
    e.description = e.description.replace("<p>", "");
    e.description = e.description.replace("</p>", "");
    e.description = e.description.replace("<h1>", "");
    e.description = e.description.replace("</h1>", "");
    e.description = e.description.replace("<h3>", "");
    e.description = e.description.replace("</h3>", "");
    e.name = e.name.replace("<h1>", "");
    e.name = e.name.replace("</h1>", "");
  });

  let top = useRef();

  useEffect(() => {
    top.current.scrollIntoView({ behavior: "smooth" });
  }, []);



  let add = (id, name, img, price) => {
    dispatch(
      actions.add({
        id:id,
        name:name,
        image:img,
        price:Number(price),
      })
    );
  };
  return (
  
    <>
      <div ref={top}></div> 
      
      <div className={styles.Detailed}>
        <Link to="/" className={styles.goBack}><AiOutlineLeft className={styles.goBack}/></Link>
        <div className={styles.Detailed_subWrapper}>
          
          {laplist.map((e) => (
            <div className={styles.cardContainer}>
              <div className={styles.Title_Des}>
                <span>{e.name}</span>
                <p>{e.description}</p>
              </div>
              <img src={e.image.url} />
              <button
                onClick={() =>
                  addtocart(e.id,1)
                } >
                add to cart
              </button>
            </div>
          ))}
        </div>
      </div> 
    </> 
  );
}
