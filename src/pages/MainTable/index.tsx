import cn from "classnames";
import { Link, useLoaderData } from "react-router-dom";
import { Button } from "@/components/button";
import { toPicture } from "@/helpers";
import styles from "./styles.module.scss";
import { FilterModal } from "./FilterModal";
import { useEffect, useState } from "react";

export const MainTable: React.FC = () => {
  const [showFilter, setShowFilter] = useState(false);
  const filteredProducts = useLoaderData() as any;

  const maxPrice = Math.max(...filteredProducts.map((i) => i.sellPrice));
  const [filters, setFilters] = useState({
    min: 0,
    max: maxPrice,
    showMin: 0,
    showMax: maxPrice,
  });
  const [finalProducts, setFinalProducts] = useState([...filteredProducts]);

  useEffect(() => {
    setFinalProducts((f) =>
      f.filter(
        (el) => el.stockPrice >= filters.min && el.stockPrice <= filters.max
      )
    );
  }, [filters.min, filters.max]);

  return (
    <div className={cn("container")}>
      <div className={styles.filterButton}>
        <Button className={styles.btn} onClick={() => setShowFilter(true)}>
          <img src={toPicture("filter")} alt="filter"></img>
        </Button>
      </div>
      <table className={cn("table table-hover", styles.mainTable)}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Тип товару</th>
            <th scope="col">Назва товару</th>
            <th scope="col">Закупівельна ціна</th>
            <th scope="col">Ціна</th>
            <th scope="col">К-сть на складах</th>
          </tr>
        </thead>

        <tbody>
          {finalProducts.length &&
            finalProducts?.map((item: any, idx: any) => {
              return (
                <tr key={idx}>
                  <th scope="row">{idx + 1}</th>
                  <td>
                    <img
                      src={toPicture(item.Types?.name || "")}
                      alt={item.Types?.name || ""}
                    />
                  </td>
                  <td>{`${item.manufacturer_name} ${item.name}`}</td>
                  <td>${item.sellPrice}</td>
                  <td>${item.stockPrice}</td>
                  <td>{item.Items[0]?.count || 0} шт</td>
                  <td>
                    <Link to={`/product/${item.id}`}>
                      <Button type="button">Деталі</Button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <FilterModal
        filters={filters}
        setFilters={setFilters}
        show={showFilter}
        onHide={() => setShowFilter(false)}
      />
    </div>
  );
};
