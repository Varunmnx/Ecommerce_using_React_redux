import React, { Component } from "react";
import style from "./NoElement.module.scss";
import { Player } from "@lottiefiles/react-lottie-player";

export class NoElement extends Component {
  render() {
    return (
      <div className={style.NoElementContainer}>
        <h1>Not Available</h1>
        <Player
          autoplay
          loop
          src="https://assets1.lottiefiles.com/datafiles/HN7OcWNnoqje6iXIiZdWzKxvLIbfeCGTmvXmEm1h/data.json"
          style={{ height: "500px", width: "500px" }}
        >
        </Player>
      </div>
    );
  }
}

export default NoElement;
