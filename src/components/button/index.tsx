import React from "react";
import styles from "./styles.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  styleType?: string;
}

export const Button: React.FC<Props> = ({
  children,
  ...props
}) => {
  return (
      <button className={styles.button} {...props}>
        {children}
      </button>
  );
};
