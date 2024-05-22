import React from "react";
import styles from "./styles.module.scss";
import cn from "classnames";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  styleType?: string;
  className?: string;
}

export const Button: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <button className={cn(styles.button, className)} {...props}>
      {children}
    </button>
  );
};
