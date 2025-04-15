import React from "react";

import styles from "./note.module.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
const NotePlaceholder = ({ isEditMode = false }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>

      </div>
      <div className={styles.readme}>
        <div className={styles.line}></div>
      </div>
      <footer className={styles.footer}>
        <div className={styles.line}></div>
        <Icon icon={"material-symbols:delete"}/>
      </footer>
    </div>
  );
};

export default NotePlaceholder;
