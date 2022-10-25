import React from "react";
import styles from "./content.module.scss";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";

export default function HeaderBar({ cart, products }) {
  let location = useLocation();
  let [input, changeInput] = useState(false);
  let handleInput = () => {
    changeInput(!input);
  };

  const liststyle ={ display: input ? "block" : "none" }
  return (
    <>
      {location.pathname !== "/items" ? (
        <div className={styles.HeaderBar}>
          <div className={styles.SearchBar_container}>
            <h2 className={styles.Logo}>
              <Link to="/"> V N V</Link>
            </h2>
            <div className={styles.InputBox}>
              <div className={styles.boxwrapper}>
                <input
                  onClick={() => handleInput()}
                  type="text"
                  placeholder="Search..."
                />
                <div
                  className={
                    input
                      ? `${styles.sugessions}`
                      : `${styles.sugessions}${styles.appear}`
                  }
                >
                  {products?.map((e) => {
                    if (e.categories[0].name === "Laptop") {
                      return(<Link
                        to="/Details/:id"
                        state={{ name: "Laptop", details: products }}
                      >
                        <li style={liststyle}>
                          {e.name}{" "}
                        </li>{" "}
                      </Link>)
                    } else if (e.categories[0].name === "TV") {
                    return  (<Link
                        to="/Details/:id"
                        state={{ name: "TV", details: products }}
                      >
                        <li style={liststyle}>
                          {e.name}{" "}
                        </li>{" "}
                      </Link>)
                    } else if (e.categories[0].name === "Refridgerator") {
                     return( <Link
                        to="/Details/:id"
                        state={{ name: "Refridgerator", details: products }}
                      >
                        <li style={liststyle}>
                          {e.name}{" "}
                        </li>{" "}
                      </Link>)
                    } else if (e.categories[0].name === "Tablets") {
                     return( <Link
                        to="/Details/:id"
                        state={{ name: "Tablets", details: products }}
                      >
                        <li style={liststyle} >
                          {e.name}{" "}
                        </li>{" "}
                      </Link>)
                    }
                  })}
                </div>
              </div>
              <AiOutlineSearch className={styles.SearchBarLogo} />
            </div>
          </div>
          <div className={styles.CartContainer}>
            <Link to="/items">
              <AiOutlineShoppingCart className={styles.CartICon} />{" "}
              <span> {cart.total_items} </span>
            </Link>
          </div>
        </div>
      ) : (
        " "
      )}
    </>
  );
}
