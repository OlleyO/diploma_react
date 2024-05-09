import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { getItemsToSell, sellItems } from "../../api/req";

import styles from "./styles.module.scss";
import { buyProducts, getStorages } from "../../api/req";

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
  const [sellCount, setSetCount] = useState<string>("");

  const handleSellClick = () => {
    if (!sellCount) return;

    setLoading(true);

    return getItemsToSell(product.id, Number(sellCount))
      .then(({ data }) => {
        if (!data?.length) return;

        const payload = data.map((i) => ({
          model_id: i.modelId,
          created_at: new Date().toISOString(),
        }));

        return sellItems(payload, product.id);
      })
      .then(() => {
        alert("Успішний продаж!");
      })
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
