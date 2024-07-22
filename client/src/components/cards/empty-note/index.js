import React from "react";

import styles from "./emptyNote.module.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

function EmptyNote() {
  return <article className={styles.container}>
    <p>Create new note</p>
    <Link to={"/create-note"} className={styles.icon}>
    <Icon icon={"ic:round-add"}/>
    </Link>
  </article>;
}

export default EmptyNote;
