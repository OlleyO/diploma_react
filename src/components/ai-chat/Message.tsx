import React from "react";
import cn from "classnames";

import styles from "./styles.module.scss";

interface Props {
  type: "reply" | "personal";
}

export const Message: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  type,
}) => {
  return <p className={cn([styles.message, styles[type]])}>{children}</p>;
};
