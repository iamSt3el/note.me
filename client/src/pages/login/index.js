import React, { useState } from "react";

import styles from "./login.module.scss";
import Left from "./sections/left";
import Form from "./sections/form";
import Loader from "../../components/shared/loader";
import { useAuth } from "../../components/contextProvider/AuthContext";
import useMediaQuery from "../../utils/mediaQuery";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { login } = useAuth();
  const isMobile = useMediaQuery('(max-width: 768px');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  async function handleLogin() {
    setProgress(0);
    try {
      if (username === "" || password === "") {
        alert("Enter Credentials");
        return;
      }
      const success = await login(username, password);
      if (success.success === false) {
        alert("Wrong credentials");

      }
    } catch (e) {
      console.error(e);
    }
  }

  if (isLoading) {
    return <Loader progress={progress} />;
  }
  return (
    <main className={styles.container}>
      {!isMobile && <Left />}
      <Form
        action={"Login"}
        username={username}
        password={password}
        onUsernameChange={handleUsernameChange}
        onPasswordChange={handlePasswordChange}
        onButtonPressed={handleLogin}
      />
    </main>
  );
}

export default Login;
