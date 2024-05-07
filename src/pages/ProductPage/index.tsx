import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Button } from "../../components/button";
import { Modal as MyModal } from "../../components/modal";

import styles from "./styles.module.scss";
import { BuyModal } from "./buyModal";
import { SellModal } from "./sellModal";

export const ProductPage: React.FC = () => {
  const productFetchData: any = useLoaderData();
  const product = productFetchData.product[0];
  const [show, setShow] = useState({
    sell: false,
    buy: false,
  });
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.productPage}>
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
          <Button
            disabled={loading}
            onClick={() => setShow((show) => ({ ...show, buy: false }))}
          >
            Закупити
          </Button>
          <Button
            disabled={loading}
            onClick={() => setShow((show) => ({ ...show, sell: false }))}
          >
            Продати
          </Button>
        </div>
      </MyModal>

      <SellModal
        show={show.sell}
        onHide={() => setShow((show) => ({ ...show, sell: false }))}
        product={product}
        setLoading={setLoading}
      />
      <BuyModal
        show={show.buy}
        onHide={() => setShow((show) => ({ ...show, buy: false }))}
      />
    </div>
  );
};
