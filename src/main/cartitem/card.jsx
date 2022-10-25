import styles from "./cartitem.module.scss";
import { Link } from "react-router-dom";
import React from "react";

export default function Card({ name, id, url,details}) {
  return (
    <div className={styles.Card}>
      <h1 className={styles.Card_Name}>{name}</h1>

        <img className={styles.cardImage} src={url} alt="for Customers" />
      <div className={styles.Buttons}>
        <span>
          <Link to={{ pathname: `/Details/${id}` }} state={{ name:name,details:details }}>
            {" "}
            View Item{" "}
          </Link>
        </span>
      </div>
    </div>
  );
}
