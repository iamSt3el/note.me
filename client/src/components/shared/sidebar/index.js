import React, { useState } from "react";
import styles from "./sidebar.module.scss";
import BrandLogo from "../brand";
import { Icon } from "@iconify/react/dist/iconify.js";
import sidebarItems from "../../../data/sidebar.json";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contextProvider/AuthContext";
import useMediaQuery from "../../../utils/mediaQuery";

function Sidebar() {
  const { logout } = useAuth();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <>
      <div className={`${styles.mobileMenu} ${isSidebarOpen ? styles.open : ''}`}>
        <div className={styles.icon} onClick={toggleSidebar}>
          <Icon icon={isSidebarOpen ? "material-symbols:close" : "material-symbols:menu"} />
        </div>
      </div>
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : styles.closed}`}>
        <BrandLogo logoOnly={true} className={styles.logo} type={"dark"} />
        <section>
          {sidebarItems.map((item, index) => {
            return (
              <article key={index} className={styles.item}>
                <Link to={item.path} onClick={isMobile ? toggleSidebar : undefined}>
                  <Icon
                    icon={item.icon}
                    color={item.id === "notes" ? "var(--light-grey)" : "var(--white)"}
                  />
                </Link>
              </article>
            );
          })}
        </section>
        <article className={styles.logout}>
          <Icon icon={"material-symbols:logout"} onClick={handleLogout} />
        </article>
      </aside>
    </>
  );
}

export default Sidebar;