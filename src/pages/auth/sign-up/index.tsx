import React, { BaseSyntheticEvent, useState } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Input } from "@/components/input";
import { supabase } from "@/api";
import { createNotification } from "@/helpers";
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ email: "", password: "" });
  async function signUpNewUser() {
    const response = await supabase.auth.signUp({
      ...user,
    });

    if (response.error) {
      return Promise.reject(response.error);
    }

    return response;
  }

  function handleSubmit() {
    return signUpNewUser()
      .then(() => {
        createNotification("success", {
          title: "Успішна реєстрація",
          message: "",
        });

        navigate("/items/all", { replace: true });
      })
      .catch(() => createNotification());
  }

  return (
    <Container className={styles.loginModal} wrapperClassName={styles.wrapper}>
      <h1 className={styles.headerText}>Реєстрація</h1>
      <Input
        type="text"
        className={cn("form-control", styles.usernameInput)}
        placeholder="Пошта"
        value={user.email}
        onInput={(e: BaseSyntheticEvent) =>
          setUser({ ...user, email: e.target.value })
        }
      />

      <Input
        type="password"
        className={cn("form-control", styles.passwordInput)}
        placeholder="Пароль"
        value={user.password}
        onInput={(e: BaseSyntheticEvent) =>
          setUser({ ...user, password: e.target.value })
        }
      />

      <Link className={styles.link} to={"/auth/login"}>
        Вже зареєстровані? Увійти
      </Link>

      <Button type="button" onClick={handleSubmit}>
        Зареєструватись
      </Button>
    </Container>
  );
};
