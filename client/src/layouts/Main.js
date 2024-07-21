import React from "react";

import styles from "./layout.module.scss";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/shared/sidebar";
import Navbar from "../components/shared/navbar";

import { useTheme } from "../components/contextProvider/ThemeContext";
function Main() {
  const { theme } = useTheme();
  return (
    <main className={styles.container}>
      {/*Sidebar*/}
      <Sidebar />
      <div className={`${styles.main} ${theme}`}>
        {/*Navbar*/}
        <Navbar />
        <section className={styles.content}>
          <Outlet />
        </section>
      </div>
    </main>
  );
}

export default Main;
