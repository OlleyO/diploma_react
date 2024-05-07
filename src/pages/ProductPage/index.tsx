import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Button } from "../../components/button";
import { Modal as MyModal } from "../../components/modal";

import styles from "./styles.module.scss";
import { BuyModal } from "./buyModal";
import { getItemsToSell, sellItems } from "../../api/req";

export const ProductPage: React.FC = () => {
  const productFetchData: any = useLoaderData();
  const product = productFetchData.product[0];
  const [loading, setLoading] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);

  function handleSellClick() {
    const sellCount = Number(
      window.prompt("Введіть к-сть товарів для продажу: ")
    );

    if (!sellCount) return;

    setLoading(true);

    return getItemsToSell(product.id, sellCount)
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
  }

  return (
    <div className={styles.productPage}>
      <BuyModal show={showBuyModal} onHide={() => setShowBuyModal(false)} />
      <div className={styles.graphs}></div>

      <MyModal className={styles.infoModal}>
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
          <Button disabled={loading} onClick={() => setShowBuyModal(true)}>
            Закупити
          </Button>
          <Button disabled={loading} onClick={handleSellClick}>
            Продати
          </Button>
        </div>
      </MyModal>
    </div>
  );
};
