import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { sellProduct } from "../../api/req";
import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import styles from "./styles.module.scss";

export const ProductPage = () => {
  const productFetchData: any = useLoaderData();
  const product = productFetchData.product[0];
  const [isCountOpen, setIsCountOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isCountOpen) {
      const count = window.prompt("Введіть к-сть товарів для продажу: ");
      sellProduct(product.id, +(count || 0));
      setIsCountOpen(false);
    }
  }, [isCountOpen]);

  return (
    <Modal className={styles.infoModal}>
      <div className={styles.infoGroup}>
        <div className={styles.headerGroup}>
          <h2>{`${product.manufacturer_name} ${product.name}`}</h2>
          <div className={styles.priceGroup}>
            <span className={styles.priceItem}>
              <span className={styles.priceHeader}>Закупівля</span>
              <span>${product.stockPrice}</span>
            </span>
            <span className={styles.priceItem}>
              <span className={styles.priceHeader}>Продаж</span>
              <span>${product.sellPrice}</span>
            </span>
          </div>
        </div>

        <p>{product.description}</p>
      </div>

      <div className={styles.buttonGroup}>
        <Button>Закупити</Button>
        <Button
          onClick={() => {
            setIsCountOpen(true);
          }}
        >
          Продати
        </Button>
      </div>
    </Modal>
  );
};
