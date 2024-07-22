import React, { useState } from "react";
import Left from "../login/sections/left";
import Form from "../login/sections/form";

import styles from "./register.module.scss";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "../../utils/mediaQuery";
import {API_URL} from "../../config/config"


function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px');


  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  async function register() {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.status === 200) {
      navigate("/login");
    } else {
      alert("failed");
    }
  }

  return (
    <main className={styles.container}>
      {!isMobile && <Left />}
      <Form
        action={"Register"}
        username={username}
        password={password}
        onUsernameChange={handleUsernameChange}
        onPasswordChange={handlePasswordChange}
        onButtonPressed={register}
      />
    </main>
  );
}

export default Register;
