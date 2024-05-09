import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { supabase } from "../../api";
import { Button } from "@/components/button";
import styles from "./styles.module.scss";
import { BuyModal } from "./buyModal";
import { SellModal } from "./sellModal";
import { Chart } from "@/components/chart";
import { Container } from "@/components/container";
const getGraphInfo = async (
  modelId: string,
  type: "BuyItems" | "SellItems",
) => {
  const { data } = await supabase.from(type).select().eq("model_id", modelId);

  return data;
};

const fetchProductData = async (id: string) => {
  const { data } = await supabase.from("Models").select().eq("id", id);
  const sell = await getGraphInfo(id, "BuyItems");
  const buy = await getGraphInfo(id, "SellItems");

  return {
    ...data,
    sell: sell,
    buy: buy,
  };
};

export async function loadProductData({ params }: any) {
  const product = await fetchProductData(params.id);
  return { product };
}

export const ProductPage = () => {
  const productFetchData: any = useLoaderData();
  const product = {
    ...productFetchData.product[0],
    sell: productFetchData.product.sell || [],
    buy: productFetchData.product.buy || [],
  };

  console.log(product);

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

      <Container>
        <Chart data={{ sell: product.sell, buy: product.buy }} />
      </Container>

      <SellModal
        show={show.sell}
        onHide={() => setShow((show) => ({ ...show, sell: false }))}
        product={product}
        setLoading={setLoading}
      />

      <BuyModal
        onHide={() => setShow((show) => ({ ...show, buy: false }))}
        show={show.buy}
      />
    </div>
  );
};
