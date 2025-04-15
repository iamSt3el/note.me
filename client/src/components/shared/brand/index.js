import React from "react";

import BrandLightImg from "../../../assets/brand-light.svg";
import BrandDarkImg from "../../../assets/brand-dark.svg";
import styles from "./brand.module.scss";

function BrandLogo(props) {
  const {logoOnly, className, type="light"} = props;
  return (
    <article className={`${styles.brand} ${className}`}>
      <img src={type==="light" ? BrandDarkImg:BrandLightImg} alt="brand-logo" />
      {!logoOnly ? (<h1>Note.<span>me</span></h1>) : null}
    </article>
  );
}

export default BrandLogo;
