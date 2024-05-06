import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { supabase } from "../../api";
import { toPicture } from "../../helpers/pictures";
import cn from "classnames";

import styles from "./styles.module.scss";

interface Props {
  show: boolean;
  onHide: () => void;
}

interface Data {
  createdAt: string;
  id: string;
  location: string;
}

const getStorages = async () => {
  const { data } = await supabase.from("Storages").select();

  return data;
};

const sendData = async (data: any) => {
  await supabase.from("Items").insert(data);
};

export const BuyModal: React.FC<Props> = ({ show, onHide }) => {
  const [storages, setStorages] = useState<Data[] | null>(null);
  const [activeStorage, setActiveStorage] = useState(
    storages ? storages[0] : ""
  );
  const [req, setReq] = useState({
    provider: "",
    count: "",
    storage: activeStorage,
  });

  useEffect(() => {
    getStorages().then((data) => setStorages(data));
  }, []);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Закупівля товару</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Input
          value={req.provider}
          onChange={(e) => setReq((r) => ({ ...r, provider: e.target.value }))}
          placeholder="Постачальник"
        />
        <Input
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
        <Button
          onClick={() => {
            sendData(req);
            onHide();
          }}
        >
          Ок
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
