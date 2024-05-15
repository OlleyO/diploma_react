import React from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  show?: boolean;
  wrapperClassName?: string;
}

export const Container: React.FC<Props> = ({
  children,
  show,
  className = "",
  wrapperClassName = "",
}) => {
  return (
    <div className={cn(styles.modalContainer, wrapperClassName)}>
      <div className={cn(styles.modal, className)}>{children}</div>
    </div>
  );
};
