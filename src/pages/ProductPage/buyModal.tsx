import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { toPicture, createNotification } from "@/helpers";
import cn from "classnames";

import styles from "./styles.module.scss";
import { buyProducts, getProviders, getStorages } from "@/api/req";
import { Database } from "@/api/database.types";
import { useParams } from "react-router-dom";

interface Props {
  show: boolean;
  onHide: () => void;
}

interface Data {
  createdAt: string;
  id: string;
  location: string;
}

export const BuyModal: React.FC<Props> = ({ show, onHide }) => {
  const { id: modelId } = useParams();
  const [storages, setStorages] = useState<Data[] | null>(null);
  const [providers, setProviders] = useState<
    Database["public"]["Tables"]["Providers"]["Row"][]
  >([]);

  const [activeStorage, setActiveStorage] = useState(storages?.[0]?.id || "");
  const [req, setReq] = useState({
    provider: "",
    count: "",
    storage: activeStorage,
  });

  function handleSubmit() {
    const payload = Array.from({ length: +req.count }, () => {
      return {
        storageId: activeStorage,
        modelId,
        providerId: req.provider,
      };
    });

    buyProducts(payload)
      .then(
        createNotification("success", {
          title: "Закупка успішна",
          message: "",
        }),
      )
      .catch((err) => createNotification("error"))
      .finally(onHide);
  }

  useEffect(() => {
    getStorages().then((data) => setStorages(data));
    getProviders().then((data) => setProviders(data || []));
  }, []);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Закупівля товару</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Select
          className={styles.select}
          value={req.provider}
          onChange={(e) => setReq((r) => ({ ...r, provider: e.target.value }))}
        >
          <option>Постачальник</option>

          {providers.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </Form.Select>

        <Input
          type="number"
          min={1}
          value={req.count}
          onChange={(e) => setReq((r) => ({ ...r, count: e.target.value }))}
          placeholder="К-сть"
        />

        <div className={styles.storagesContainer}>
          {storages?.map((item) => (
            <div
              className={cn(styles.storageItem, {
                [styles.activeStorage]: activeStorage,
              })}
              key={item.id}
              onClick={() => setActiveStorage(item.id)}
            >
              <img src={`.${toPicture("storage")}`} />
              <p>{item.location}</p>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer className={styles.buttonGroup}>
        <Button onClick={onHide}>Скасувати</Button>
        <Button onClick={handleSubmit}>Ок</Button>
      </Modal.Footer>
    </Modal>
  );
};
