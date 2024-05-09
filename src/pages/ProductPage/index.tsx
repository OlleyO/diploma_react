import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Button } from "../../components/button";
import { Container } from "../../components/container";

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

      <Container className={styles.infoModal}>
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
            onClick={() => setShow((show) => ({ sell: false, buy: true }))}
          >
            Закупити
          </Button>
          <Button
            disabled={loading}
            onClick={() => setShow((show) => ({ buy: false, sell: true }))}
          >
            Продати
          </Button>
        </div>
      </Container>

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
