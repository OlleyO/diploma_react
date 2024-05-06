import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { supabase } from "../../api";
import { Button } from "../../components/button";
import { Modal as MyModal } from "../../components/modal";

import { Database } from "../../api/database.types";
import styles from "./styles.module.scss";
import { BuyModal } from "./buyModal";

const fetchProductData = async (id: string) => {
  const { data } = await supabase.from("Models").select().eq("id", id);

  return data;
};

export async function loadProductData({ params }: any) {
  const product = await fetchProductData(params.id);
  return { product };
}

export const ProductPage: React.FC = () => {
  const productFetchData: any = useLoaderData();
  const product = productFetchData.product[0];
  const [loading, setLoading] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);

  async function getItemsToSell(modelId: string, count: number) {
    return supabase.from("Items").select().eq("modelId", modelId).limit(count);
  }

  async function sellItems(
    payload: Database["public"]["Tables"]["BuyItems"]["Insert"][]
  ) {
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
