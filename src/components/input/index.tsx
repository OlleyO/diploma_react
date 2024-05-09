import React from 'react';
import styles from "./styles.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    dataQA?: string;
  }


export const Input: React.FC<Props> = ({...props}) => {
  return (
    <label className={styles.label}>
        <input
          type="text"
          className={"form-control"}
          {...props}
        />
      </label>
  )
}
