import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";

import { Button } from "@/components/button";

import styles from "./styles.module.scss";
import Range from "@/components/Range";

interface Props {
  show: boolean;
  onHide: () => void;
  filters: { min: number; max: number; showMax: number; showMin: number };
  setFilters: (obj: {
    min: number;
    max: number;
    showMax: number;
    showMin: number;
  }) => void;
}

export const FilterModal: React.FC<Props> = ({
  show,
  onHide,
  filters,
  setFilters,
}) => {
  let tempRange = {
    min: filters.min,
    max: filters.max,
    showMax: filters.showMax,
    showMin: filters.showMin,
  };
  const handleClick = () => {
    setFilters(tempRange);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Фільтрація ціни</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className={styles.price}>Ціна: </p>
        <Range
          min={tempRange.min}
          max={tempRange.showMax}
          onChange={({ min, max }) => {
            tempRange = {
              min,
              max,
              showMax: tempRange.showMax,
              showMin: filters.showMin,
            };
          }}
        />
      </Modal.Body>
      <Modal.Footer className={styles.buttonGroup}>
        <Button onClick={onHide}>Скасувати</Button>
        <Button
          onClick={() => {
            handleClick();
            onHide();
          }}
        >
          Ок
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
