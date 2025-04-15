import React from "react";

import styles from "./form.module.scss";
import BrandLogo from "../../../../components/shared/brand/index";
import Input from "../../../../components/atoms/input/index";
import Button from "../../../../components/atoms/button/index";
import { Link, useLocation} from "react-router-dom";

function Form(props) {
  const { action, username, password, onUsernameChange, onPasswordChange, onButtonPressed} = props;
  const location = useLocation();

  return (
    <section className={styles["form-container"]}>
      <BrandLogo />

      <div className={styles.form}>
        <div className={styles.options}>
          <h2>{action}</h2>
        </div>
        <article className={styles.details}>
          <Input
            type={"email"}
            placeholder={"username"}
            value={username}
            onChange={onUsernameChange}
          />

          <Input
            type={"password"}
            placeholder={"password"}
            value={password}
            onChange={onPasswordChange}
          />

          <Button
            text={action}
            icon="material-symbols:login"
            className={styles.email}
            handleClick={onButtonPressed}
          />
          <div className={styles.register}>
            {location.pathname !== "/register" && (
              <p>
                New User ? <Link to="/register">Register</Link>
              </p>
            )}
            {location.pathname !== "/login" && (
              <p>
                Already have Account ? <Link to="/login">login</Link>
              </p>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}

export default Form;
