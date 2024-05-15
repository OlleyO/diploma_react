import React, { BaseSyntheticEvent, useState } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Input } from "@/components/input";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/api";
import { createNotification } from "@/helpers";

export const SignIn = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });

  async function loginUser() {
    const res = await supabase.auth.signInWithPassword(user);

    if (res.error) {
      return Promise.reject(res.error);
    }

    return res;
  }
  function handleSubmit() {
    return loginUser()
      .then(() => {
        createNotification("success", {
          title: "Успішно авторизовано",
          message: "",
        });

        navigate("/items/all", { replace: true });
      })
      .catch((err) => createNotification());
  }

  return (
    <Container className={styles.loginModal} wrapperClassName={styles.wrapper}>
      <h1 className={styles.headerText}>Авторизація</h1>
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

      <Link className={styles.link} to={"/auth/signUp"}>
        Ще не зареєстровані? Зареєструватись
      </Link>

      <Button type="button" onClick={handleSubmit}>
        Увійти
      </Button>
    </Container>
  );
};
