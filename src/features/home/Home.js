import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Home.module.css";

export function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeImgContainer}>
        <img
          className={styles.homeImg}
          src="https://images.unsplash.com/photo-1644377598632-78b99859d2ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=649&q=80"
          alt="home"
        />
      </div>
      <div className={styles.homeContent}>
        <p>test</p>
      </div>
    </div>
  );
}
