import React, { useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";
import styles from "./success.module.scss"

export const Success = () => {
  let contentStyle = {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  let [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);

  const navigator = useNavigate()

  return (
    <div style={contentStyle}>
      {loading ? (
        <SyncLoader color={"#a2d2ff"} size={50} />
      ) : (
        <div className={styles.successcontainer}>
          <Player
            autoplay
            loop
            src="https://assets6.lottiefiles.com/private_files/lf30_i2pyppik.json"
            style={{ height: "300px", width: "300px" }}
          ></Player>
          <h1>Thank you shop again !</h1>
          <button onClick={()=>navigator("/")}>Shop Again 👾</button>
        </div>
      )}
    </div>
  );
};
