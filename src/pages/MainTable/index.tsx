import cn from "classnames";
import { Link, useLoaderData } from "react-router-dom";
import { Button } from "@/components/button";
import { toPicture } from "@/helpers";
import styles from "./styles.module.scss";

export const MainTable: React.FC = () => {
  const filteredProducts = useLoaderData() as any;

  return (
    <div className={cn("container")}>
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
          {filteredProducts.length &&
            filteredProducts?.map((item: any, idx: any) => {
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
    </div>
  );
};
