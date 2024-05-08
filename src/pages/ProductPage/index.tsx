import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { supabase } from "../../api";
import Button from "react-bootstrap/Button";
import { Modal } from "../../components/modal";
import styles from "./styles.module.scss";
import { Database } from "../../api/database.types";
import { Chart } from "../../components/chart";

const getGraphInfo = async (
  modelId: string,
  type: "BuyItems" | "SellItems"
) => {
  const { data } = await supabase.from(type).select().eq("model_id", modelId);

  return data;
};

const fetchProductData = async (id: string) => {
  const { data } = await supabase.from("Models").select().eq("id", id);
  const sell = await getGraphInfo(id, "SellItems");
  const buy = await getGraphInfo(id, "BuyItems");

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
    sell: productFetchData.product.sell,
    buy: productFetchData.product.buy,
  };

  const [loading, setLoading] = useState(false);

  async function getItemsToSell(modelId: string, count: number) {
    return supabase.from("Items").select().eq("modelId", modelId).limit(count);
  }

  async function sellItems(
    payload: Database["public"]["Tables"]["BuyItems"]["Insert"][]
  ) {
    // TODO: Use trigger to delete items from Items table
    return Promise.all([
      supabase.from("BuyItems").insert(payload),
      supabase
        .from("Items")
        .delete({ count: "exact" })
        .eq("modelId", product.id)
        .limit(payload.length)
        .order("id"),
    ]);
  }

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

        return sellItems(payload);
      })
      .then(() => {
        alert("Success Loading");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className={styles.productPage}>
      <div className={styles.graphs}></div>

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
          <Button disabled={loading}>Закупити</Button>
          <Button disabled={loading} onClick={handleSellClick}>
            Продати
          </Button>
        </div>
      </Modal>
      <Modal>
        <Chart data={{ sell: product.sell, buy: product.buy }} />
      </Modal>
    </div>
  );
};
