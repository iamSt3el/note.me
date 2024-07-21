import React from "react";

import styles from "./bar.module.scss";

function ProgressBar(props) {
  const { progress } = props;
  return (
    <div className={styles.container}>
      <span style={{ width: `${progress}%`, height:"100%" }}></span>
    </div>
  );
}

export default ProgressBar;
