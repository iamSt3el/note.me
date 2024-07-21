import React from "react";

import styles from "./loader.module.scss";
import BrandLogo from "../brand/index";
import ProgressBar from "../../atoms/progress-bar/";
import { useState, useEffect } from 'react';


function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const animateProgress = (start, end, duration) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min((elapsed / duration) * (end - start) + start, end);
        setProgress(progress);
        if (progress < end) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    animateProgress(0, 100, 1000);
  }, []);

  return (
    <article className={styles.container}>
      <BrandLogo/>
      <ProgressBar progress={progress}/>
    </article>
  );
}

export default Loader;
