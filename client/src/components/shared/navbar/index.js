import React from "react";

import styles from "./navbar.module.scss";
import { useTheme } from "../../../components/contextProvider/ThemeContext";
import Greeting from "../../atoms/greeting";
import { useAuth } from "../../contextProvider/AuthContext";
import { HoverableIcon } from "../../../utils/HoverableIcon";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  return (
    <header className={styles.header}>
      <Greeting username={user.username} />

      <div className={styles.theme}>
        <HoverableIcon
          icon={
            theme === "dark"
              ? "material-symbols-light:clear-day"
              : "ph:moon-fill"
          }
          onClick={toggleTheme}
        />
      </div>
    </header>
  );
}

export default Navbar;
