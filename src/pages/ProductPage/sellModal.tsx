import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { getItemsToSell, sellItems } from "@/api/req";

import styles from "./styles.module.scss";
import { createNotification } from "@/helpers";
import { useRevalidator } from "react-router-dom";

interface Props {
  show: boolean;
  onHide: () => void;
  product: any;
  setLoading: (value: boolean) => void;
}

export const SellModal: React.FC<Props> = ({
  show,
  onHide,
  product,
  setLoading,
}) => {
  const revalidator = useRevalidator();
  const [sellCount, setSetCount] = useState<string>("");

  const handleSellClick = () => {
    if (!sellCount) return;

    setLoading(true);

    return getItemsToSell(product.id, Number(sellCount))
      .then(({ data }) => {
        if (!data?.length) return;

        const payload = data.map((i) => ({
          model_id: i.modelId,
        }));

        return sellItems(payload, product.id);
      })
      .then(() => {
        createNotification("success", {
          title: "Успішно продано",
          message: "",
        });
        revalidator.revalidate();
      })
      .catch((err) => createNotification("error"))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Продаж товару</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Input
          value={sellCount}
          onChange={(e) => setSetCount(e.target.value)}
          placeholder="К-сть товару для продажу"
        />
      </Modal.Body>
      <Modal.Footer className={styles.buttonGroup}>
        <Button onClick={onHide}>Скасувати</Button>
        <Button
          onClick={() => {
            handleSellClick();
            onHide();
          }}
        >
          Ок
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
