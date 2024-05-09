import React, { BaseSyntheticEvent, useState } from "react";
import cn from "classnames";
import { supabase } from "../../api";
import styles from "./styles.module.scss";
import { Button } from "../../components/button";
import { Container } from "../../components/container";
import { Input } from "../../components/input";

export const SignIn = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const login = async () => {};

  return (
    <Container>
      <h1 className={styles.headerText}>Sign In</h1>
      <Input
        type="text"
        className={cn("form-control", styles.usernameInput)}
        placeholder="username"
        value={user.username}
        onInput={(e: BaseSyntheticEvent) =>
          setUser({ ...user, username: e.target.value })
        }
      />

      <Input
        type="password"
        className={cn("form-control", styles.passwordInput)}
        placeholder="password"
        value={user.password}
        onInput={(e: BaseSyntheticEvent) =>
          setUser({ ...user, password: e.target.value })
        }
      />

      <Button type="button" onClick={login}>
        LOGIN
      </Button>
    </Container>
  );
};
